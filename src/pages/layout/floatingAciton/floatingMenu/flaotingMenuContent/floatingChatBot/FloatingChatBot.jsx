import React, { useState, useEffect, useRef } from "react";
import S from "./style";

const ChatBotSimple = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
          { sender: "bot", text: "안녕하세요! 블루코튼 챗봇 솜이에요 🐻‍❄️" },
          { sender: "bot", text: "무엇이 궁금하신가요?" },
        ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ⭐ scroll reference 추가
  const scrollRef = useRef(null);

  const suggestedQuestions = [
    "여기는 뭐하는 곳이야?",
    "블루코튼이 뭐야?",
    "어떻게 이용하는 거야?",
    "솜 챌린지는 뭐야?",
    "상품은 어떻게 구매해?"
  ];

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // ⭐ 메시지가 추가될 때 자동 스크롤
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (message) => {
    const text = message || input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat-bot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const botReply =
        data?.choices?.[0]?.message?.content ||
        "답변을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "서버와 연결할 수 없습니다" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedClick = (text) => {
    if (loading) return;
    handleSend(text);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>챗봇 솜이</S.Title>
      </S.Header>

      <S.SuggestArea>
        {suggestedQuestions.map((q, idx) => (
          <S.SuggestBtn key={idx} onClick={() => handleSuggestedClick(q)}>
            {q}
          </S.SuggestBtn>
        ))}
      </S.SuggestArea>

      <S.ChatBody>
        {messages.map((msg, i) => (
          <S.Bubble key={i} isUser={msg.sender === "user"}>
            {msg.text}
          </S.Bubble>
        ))}

        {loading && <S.Bubble isUser={false}>솜이가 생각 중이에요...</S.Bubble>}

        {/* ⭐ 스크롤 이동 기준점 */}
        <div ref={scrollRef} />
      </S.ChatBody>

      <S.InputArea>
        <S.Input
          placeholder="궁금한 사항을 입력해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <S.SendBtn onClick={() => handleSend()} disabled={loading}>
          {loading ? "..." : "전송"}
        </S.SendBtn>
      </S.InputArea>
    </S.Container>
  );
};

export default ChatBotSimple;
