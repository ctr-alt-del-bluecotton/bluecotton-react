import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useChatting } from '../../../../../../../context/ChattingContext';
import { fetchData } from '../../../../../../../context/FetchContext';
import S from './style';


const FloatingChattingRoom = () => {
  const { chattingMenu, memberId, memberName } = useChatting();
  const { chatId } = chattingMenu;

  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [chatRoomName, setChatRoomName] = useState("");

  const chatBoxRef = useRef(null);
  const stompClientRef = useRef(null);

  /** JOIN 중복 방지용 키 */
  const joinedKey = `joined_${chatId}_${memberId}`;
  const hasJoinedBefore = localStorage.getItem(joinedKey);

  /** 자동 스크롤 함수 */
  const scrollToBottom = () => {
    const box = chatBoxRef.current;
    if (!box) return;
    box.scrollTop = box.scrollHeight;
  };

  /** 메시지 불러오기 */
  const loadMessages = async (newOffset = 0) => {
    setIsLoading(true);

    const res = await fetchData(
      `chats/${chatId}/messages?offset=${newOffset}&limit=50`
    );
    const datas = await res.json();
    const msgs = Array.isArray(datas) ? datas : datas.data;

    const box = chatBoxRef.current;

    await fetchData(
      `chat/get-rooms/${chatId}`
    ).then( async (res) => { const data = await res.json();
      
      setChatRoomName(data.chatTitle)
      
     });

    // setChatRoomName(res.json().chatTitle)

    if (newOffset === 0) {
      // 최초 로드 → 최신 메시지 50개
      setChatList(msgs);
      setTimeout(() => scrollToBottom(), 0);
    } else {
      // 과거 메시지 로드 → scroll 유지
      const prevHeight = box.scrollHeight;

      setChatList(prev => [...msgs, ...prev]);

      setTimeout(() => {
        const newHeight = box.scrollHeight;
        box.scrollTop = newHeight - prevHeight;
      }, 0);
    }

    setIsLoading(false);
  };

  /** 첫 로딩 */
  useEffect(() => {
    loadMessages(0);
  }, []);

  /** 무한 스크롤: 위로 올리면 더 불러오기 */
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

    box.addEventListener('scroll', handler);
    return () => box.removeEventListener('scroll', handler);
  }, [offset, isLoading]);

  /** WebSocket 연결 */
  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log('WS 연결됨');

        // JOIN 메시지 — 최초 1회만
        const joinedKey = `joined_${chatId}_${memberId}`;
        const hasJoinedBefore = localStorage.getItem(joinedKey);

        if (!hasJoinedBefore) {
          client.publish({
            destination: '/pub/chat/send',
            body: JSON.stringify({
              chatId,
              chatMessageSenderId: memberId,
              chatMessageReceiverId: null,
              chatMessageContent: `${memberName}님이 입장하셨습니다.`,
              chatMessageType: 'JOIN',
            })
          });

          localStorage.setItem(joinedKey, "1");
        }

        // 구독
        client.subscribe(`/sub/chat/room/${chatId}`, (msg) => {
          const body = JSON.parse(msg.body);

          setChatList(prev => {
            // JOIN 중복 방지
            if (body.chatMessageType === "JOIN") {
              const exists = prev.some(
                m =>
                  m.chatMessageType === "JOIN" &&
                  m.chatMessageSenderId === body.chatMessageSenderId
              );
              if (exists) return prev;
            }

            return [...prev, body];
          });

          setTimeout(() => scrollToBottom(), 0);
        });
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      stompClientRef.current?.deactivate();
      localStorage.removeItem(joinedKey);
    };
  }, [chatId, memberId, memberName]);

  /** 메시지 전송 */
  const handleKeyDown = e => {
    if (e.key === 'Enter' && message.trim()) {
      stompClientRef.current?.publish({
        destination: '/pub/chat/send',
        body: JSON.stringify({
          chatId,
          chatMessageSenderId: memberId,
          chatMessageReceiverId: null,
          chatMessageContent: message,
          chatMessageType: 'MESSAGE',
        })
      });

      setMessage('');
      setTimeout(() => scrollToBottom(), 0);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{chatRoomName}</S.Title>
      </S.Header>

      <S.ChatBody ref={chatBoxRef}>
        {chatList.map((chat, idx) => chat.chatMessageType == "MESSAGE" ? (
          <S.ChatContent>
            <S.chatSenderName isUser={chat.chatMessageSenderId == memberId}>{chat.chatMessageSenderId}</S.chatSenderName>
            <S.Bubble key={idx} isUser={chat.chatMessageSenderId == memberId}>
              {chat.chatMessageContent}
            </S.Bubble>
          </S.ChatContent>
        ) : <S.systemMessage>{chat.chatMessageContent}</S.systemMessage>)}

        {isLoading && (
          <S.Bubble isUser={false}>
            이전 메시지를 불러오는 중...
          </S.Bubble>
        )}
      </S.ChatBody>

      <S.InputArea>
        <S.Input
          type="text"
          placeholder="메시지를 입력하고 엔터를 누르세요"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </S.InputArea>
    </S.Container>
  );
};

export default FloatingChattingRoom;
