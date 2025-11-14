import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";

export default function FindPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    if (!email.trim()) return alert("이메일을 입력해주세요.");

    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/codes/email?toEmail=${email}`,{
        method: "POST",
        credentials: "include"
      });

      const json = await res.json();

      if (json.message.includes("성공")) {
        alert("인증번호가 이메일로 전송되었습니다.");
        setStep(2);
      } else {
        alert("이메일 전송 실패");
      }
    } catch {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!verifyCode.trim()) return alert("인증번호를 입력해주세요.");

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${verifyCode}`,
      { method: "POST", credentials: "include" }
    );

    const json = await res.json();

    if (json.data.verified) {
      alert("인증 성공!");
      setStep(3);
    } else {
      alert("인증번호가 틀립니다.");
    }
  };

  const resetPassword = async () => {
    if (!newPassword.trim())
      return alert("새 비밀번호를 입력해주세요.");

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/reset-password?memberEmail=${email}&newPassword=${newPassword}`,
      { method: "POST" }
    );

    const json = await res.json();
    console.log(json)
    if (json.message.includes("완료")) {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      window.location.href = "/login";
    } else {
      alert("비밀번호 변경 실패");
    }
  };

  return (
    <S.Container>
      <S.BackgroundBox />

      <S.Box>
        <S.FormBox>
          <S.Logo>blue cotton</S.Logo>

          {step === 1 && (
            <>
              <S.Input
                placeholder="가입한 이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <S.MainButton onClick={sendCode} disabled={loading}>
                {loading ? "전송 중..." : "인증번호 보내기"}
              </S.MainButton>
            </>
          )}

          {step === 2 && (
            <>
              <S.Input
                placeholder="인증번호 입력"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              <S.MainButton onClick={verify}>인증하기</S.MainButton>
            </>
          )}

          {step === 3 && (
            <>
              <S.Input
                type="password"
                placeholder="새 비밀번호 입력"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <S.MainButton onClick={resetPassword}>
                비밀번호 재설정
              </S.MainButton>
            </>
          )}
        </S.FormBox>

        <S.Divider />

        <S.BottomText>
            <Link to="/login">로그인 페이지로 돌아가기</Link>
        </S.BottomText>
      </S.Box>
    </S.Container>
  );
}
