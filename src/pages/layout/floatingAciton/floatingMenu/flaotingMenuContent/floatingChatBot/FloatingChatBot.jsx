import React, { useState } from "react";
import S from "./style";

const ChatBotSimple = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! 블루코튼 챗봇 솜이에요 🐻‍❄️" },
    { sender: "bot", text: "무엇이 궁금하신가요?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { sender: "user", text: input };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <S.Container>
      {/* ✅ 헤더 (X와 같은 높이, 타이틀 중앙정렬) */}
      <S.Header>
        <S.Title>챗봇 솜이</S.Title>
      </S.Header>

      {/* ✅ 대화 영역 */}
      <S.ChatBody>
        {messages.map((msg, i) => (
          <S.Bubble key={i} isUser={msg.sender === "user"}>
            {msg.text}
          </S.Bubble>
        ))}
      </S.ChatBody>

      {/* ✅ 입력 영역 */}
      <S.InputArea>
        <S.Input
          placeholder="궁금한 사항을 입력해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <S.SendBtn onClick={handleSend}>📩</S.SendBtn>
      </S.InputArea>
    </S.Container>
  );
};

export default ChatBotSimple;
