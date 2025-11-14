import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";

export default function FindEmail() {
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const findEmail = async () => {
    if (!memberName.trim() || !memberPhone.trim()) {
      alert("이름과 전화번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/find-email?memberName=${memberName}&memberPhone=${memberPhone}`,
        { method: "POST" }
      );

      const json = await res.json();

      if (!json.data || !json.data.email) {
        alert("일치하는 회원 정보를 찾을 수 없습니다.");
        setEmail("");
        return;
      }

      setEmail(json.data.email);
    } catch (err) {
      console.error(err);
      alert("서버 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.BackgroundBox />

      <S.Box>
        <S.FormBox>
          <S.Logo>blue cotton</S.Logo>

          <S.Input
            placeholder="이름을 작성해주세요"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />

          <S.Input
            placeholder="전화번호 (예: 010-1234-5678)"
            value={memberPhone}
            maxLength={13}
            onChange={(e) => setMemberPhone(e.target.value)}
          />

          <S.MainButton onClick={findEmail} disabled={loading}>
            {loading ? "조회 중..." : "아이디 찾기"}
          </S.MainButton>

          {email && (
            <S.ResultBox>
              <p>가입된 이메일</p>
              <strong>{email}</strong>
            </S.ResultBox>
          )}
        </S.FormBox>

        <S.Divider />

        <S.BottomText>
          비밀번호를 찾고 계신가요?{" "}
          <Link to="/find-password">비밀번호 찾기</Link>
        </S.BottomText>

        <S.BottomText>
          <Link to="/login">로그인 페이지로 돌아가기</Link>
        </S.BottomText>
      </S.Box>
    </S.Container>
  );
}
