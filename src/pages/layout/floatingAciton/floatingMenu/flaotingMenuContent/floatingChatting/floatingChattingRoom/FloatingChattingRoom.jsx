import React, { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useChatting } from '../../../../../../../context/ChattingContext';
import { fetchData } from '../../../../../../../context/FetchContext';
import S from './style';

const FloatingChattingRoom = () => {
  const { chattingMenu, memberId, memberName, setChattingMenu } = useChatting();
  const { chatId } = chattingMenu; 
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [chatRoomName, setChatRoomName] = useState("");
  const [joinedKey, setJoinedKey] = useState(`joined_${chatId}_${memberId}`);

  const chatBoxRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    setJoinedKey(`joined_${chatId}_${memberId}`)
  },[chatId, memberId])

  const scrollToBottom = useCallback(() => {
    const box = chatBoxRef.current;
    if (!box) return;
    box.scrollTop = box.scrollHeight;
  }, []);

  const loadMessages = useCallback(
    async (newOffset = 0) => {
      setIsLoading(true);

      const res = await fetchData(
        `chats/${chatId}/messages?offset=${newOffset}&limit=50`
      );
      const body = await res.json();
      const msgs = Array.isArray(body) ? body : body.data;

      // 채팅방 제목
      const roomRes = await fetchData(`chat/get-rooms/${chatId}`);
      const roomData = await roomRes.json();
      setChatRoomName(roomData.chatTitle);

      const box = chatBoxRef.current;

      if (newOffset === 0) {
        setChatList(msgs);
        setTimeout(scrollToBottom, 0);
      } else {
        const prevHeight = box.scrollHeight;

        setChatList((prev) => [...msgs, ...prev]);

        setTimeout(() => {
          const newHeight = box.scrollHeight;
          box.scrollTop = newHeight - prevHeight;
        }, 0);
      }

      setIsLoading(false);
    },
    [chatId, scrollToBottom]
  );

  /** 첫 로딩 */
  useEffect(() => {
    loadMessages(0);
  }, [chatId]);

  /** 무한 스크롤 */
  useEffect(() => {
    const box = chatBoxRef.current;
    if (!box) return;

    const handler = () => {
      if (box.scrollTop < 10 && !isLoading) {
        const newOffset = offset + 50;
        setOffset(newOffset);
        loadMessages(newOffset);
      }
    };

    box.addEventListener("scroll", handler);
    return () => box.removeEventListener("scroll", handler);
  }, [offset, isLoading, loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  /** WebSocket 연결 */
  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        const hasJoinedBefore = localStorage.getItem(joinedKey);

        if (!hasJoinedBefore) {
          client.publish({
            destination: '/pub/chat/send',
            body: JSON.stringify({
              chatId,
              chatMessageSenderId: memberId,
              chatMessageReceiverId: null,
              chatMessageContent: `${memberName}님이 입장하셨습니다.`,
              chatMessageType: 'JOIN'
            })
          });

          localStorage.setItem(joinedKey, "1");
        }

        client.subscribe(`/sub/chat/room/${chatId}`, (msg) => {
          const raw = JSON.parse(msg.body);
        
          // 메시지 표준화
          const normalized = {
            ...raw,
            memberName: raw.memberName ?? memberName,
            createdAt: raw.createdAt ?? new Date().toISOString()
          };
        
          setChatList((prev) => {
            // JOIN 중복 방지
            if (normalized.chatMessageType === "JOIN") {
              const exists = prev.some(
                (m) =>
                  m.chatMessageType === "JOIN" &&
                  m.chatMessageSenderId === normalized.chatMessageSenderId
              );
              if (exists) return prev;
            }
            return [...prev, normalized];
          });
        
          setTimeout(scrollToBottom, 0);
        });
        
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      stompClientRef.current?.deactivate();
      localStorage.removeItem(joinedKey);
    };
  }, [chatId, memberId, memberName, scrollToBottom, joinedKey]);

  /** 메시지 전송 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      stompClientRef.current?.publish({
        destination: '/pub/chat/send',
        body: JSON.stringify({
          chatId,
          chatMessageSenderId: memberId,
          chatMessageReceiverId: null,
          chatMessageContent: message,
          chatMessageType: 'MESSAGE'
        })
      });

      setMessage('');
      setTimeout(scrollToBottom, 0);
    }
  };
  
  const handleSend = (e) => {
    stompClientRef.current?.publish({
      destination: '/pub/chat/send',
      body: JSON.stringify({
        chatId,
        chatMessageSenderId: memberId,
        chatMessageReceiverId: null,
        chatMessageContent: message,
        memberName: memberName,
        chatMessageType: 'MESSAGE'
      })
    });

    setMessage('');
    setTimeout(scrollToBottom, 0)
  };

  return (
    <S.Container>
      <S.Header>
        <S.backButton onClick={() => setChattingMenu({ menu: "list", chatId: 0 })}>이전으로</S.backButton>
        <S.Title>{chatRoomName}</S.Title>
      </S.Header>

      <S.ChatBody ref={chatBoxRef}>
        {chatList?.map((chat, idx) => {

          const prev = chatList[idx - 1];

          const isUser = chat.chatMessageSenderId === memberId;

          // 이전 메시지가 MESSAGE 타입일 때만 같은 유저인지 확인
          const isPrevMessage =
            prev && prev.chatMessageType === "MESSAGE";

          const isSameUserWithPrev =
            isPrevMessage &&
            prev.chatMessageSenderId === chat.chatMessageSenderId;

          // 현재 메시지가 시스템 메시지인지
          const isSystem = chat.chatMessageType !== "MESSAGE";

          return (
            <S.ChatContent key={idx} isUser={isUser} isSystem={isSystem}>
              
              {/* 닉네임 출력 조건:
                  1) 내 메시지는 닉네임 X
                  2) 시스템 메시지는 닉네임 X
                  3) 이전 MESSAGE와 같은 유저면 닉네임 X
                  4) 그 외의 경우 닉네임 표시 */}
              {!isUser && !isSystem && !isSameUserWithPrev && (
                <S.chatSenderName>
                  {chat.memberName ?? "알 수 없음"}
                </S.chatSenderName>
              )}

              {/* 메시지 형태 */}
              {isSystem ? (
                <S.systemMessage>
                  {chat.chatMessageContent}
                </S.systemMessage>
              ) : (
                <S.Bubble isUser={isUser}>
                  {chat.chatMessageContent}
                </S.Bubble>
              )}
            </S.ChatContent>
          );
        })}

        {isLoading && (
          <S.Bubble isUser={false}>이전 메시지를 불러오는 중...</S.Bubble>
        )}
      </S.ChatBody>

      <S.InputArea>
        <S.Input
          type="text"
          placeholder="메시지를 입력하고 엔터를 누르세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <S.SendBtn onClick={handleSend}>
          {"전송"}
        </S.SendBtn>
      </S.InputArea>
    </S.Container>
  );
};

export default FloatingChattingRoom;
