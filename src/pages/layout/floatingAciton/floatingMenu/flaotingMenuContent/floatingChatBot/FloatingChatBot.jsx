import React, { useState } from "react";
import S from "./style";

const ChatBotSimple = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! 블루코튼 챗봇 솜이에요!" },
    { sender: "bot", text: "무엇이 궁금하신가요?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const newMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat-bot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      console.log(" ChatBot 응답:", data);

      const botReply =
        data?.choices?.[0]?.message?.content ||
        "답변을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("ChatBot 오류:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "서버와 연결할 수 없습니다" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>챗봇 솜이</S.Title>
      </S.Header>

      <S.ChatBody>
        {messages.map((msg, i) => (
          <S.Bubble key={i} isUser={msg.sender === "user"}>
            {msg.text}
          </S.Bubble>
        ))}
        {loading && <S.Bubble isUser={false}>솜이가 생각 중이에요...</S.Bubble>}
      </S.ChatBody>

      <S.InputArea>
        <S.Input
          placeholder="궁금한 사항을 입력해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <S.SendBtn onClick={handleSend} disabled={loading}>
          {loading ? "..." : "전송"}
        </S.SendBtn>
      </S.InputArea>
    </S.Container>
  );
};

export default ChatBotSimple;
