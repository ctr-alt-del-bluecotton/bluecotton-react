import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import S from "./style";
import { useForm } from "react-hook-form";
import { useModal } from "../../components/modal/useModal";

const Login = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const handleSubmitForm = handleSubmit((data) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          openModal({
            title: "이메일 또는 비밀번호가 일치하지 않습니다.",
            confirmText: "확인",
          });
          throw new Error("로그인 실패");
        }
        return res.json();
      })
      .then((result) => {
        const accessToken = result.data && result.data.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          navigate("/main/som/all");
          window.location.reload();
        } else {
          openModal({
            title: "로그인 실패: accessToken이 없습니다.",
            confirmText: "확인",
          });
        }
      })
      .catch(() => {
        openModal({
          title: "아이디 또는 비밀번호를 다시 확인해주세요.",
          confirmText: "확인",
        });
      });
  });

  return (
    <S.LoginContainer>
      <S.BackgroundBox />

      <S.LoginBox>
        <S.LoginForm onSubmit={handleSubmitForm}>
          <S.Logo>blue cotton</S.Logo>

          <S.Input
            type="text"
            placeholder="이메일을 작성해주세요"
            $error={!!errors.memberEmail}
            {...register("memberEmail", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: emailRegex,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          />
          {errors.memberEmail && (
            <S.InputErrorMessage>{errors.memberEmail.message}</S.InputErrorMessage>
          )}

          <S.PasswordWrapper>
            <S.Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 작성해주세요"
              $error={!!errors.memberPassword}
              {...register("memberPassword", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: passwordRegex,
                  message: "영문 소문자 + 숫자 + 특수문자(!@#) 포함 8자 이상",
                },
              })}
            />

            <S.EyeIcon
              src={
                showPassword
                  ? "/assets/icons/eye.svg"
                  : "/assets/icons/visibility_off.svg"
              }
              alt="toggle password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </S.PasswordWrapper>

          {errors.memberPassword && (
            <S.InputErrorMessage>{errors.memberPassword.message}</S.InputErrorMessage>
          )}

          <S.LoginButton as="button" type="submit" disabled={isSubmitting}>
            로그인하기
          </S.LoginButton>
        </S.LoginForm>

        <S.Divider />

        <S.SocialButtons>
          <S.SocialButton to="http://localhost:10000/oauth2/authorization/kakao">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/kakao.png`}
              alt="kakao"
            />
            카카오로 로그인
          </S.SocialButton>

          <S.SocialButton to="http://localhost:10000/oauth2/authorization/google">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/google.png`}
              alt="google"
            />
            구글로 로그인
          </S.SocialButton>

          <S.SocialButton to="http://localhost:10000/oauth2/authorization/naver">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/naver.png`}
              alt="naver"
            />
            네이버로 로그인
          </S.SocialButton>
        </S.SocialButtons>

        <S.FindInfoBox>
          <Link to="/find-password">비밀번호를 잊으셨나요?</Link>
          <Link to="/find-email">ID를 잊으셨나요?</Link>
        </S.FindInfoBox>

        <S.SignUpText>
          계정이 없으신가요? <Link to="/sign-up">회원가입하러 가기</Link>
        </S.SignUpText>
      </S.LoginBox>
    </S.LoginContainer>
  );
};

export default Login;
