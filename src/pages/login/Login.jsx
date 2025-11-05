import React from "react";
import { Link, useNavigate } from "react-router-dom";
import S from "./style";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm({mode: "onChange"});

  const handleSubmitForm = handleSubmit(async (data) => {
    const {memberPasswordConfirm, ...member} = data;

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`,{
      headers: {
        "Content-Type" : "application/json"
      },
      method: "POST",
      body: JSON.stringify(member)
    })

    // 백앤드 연결시 활성화
    if(!res.ok){
      alert("이메일 또는 비밀번호가 일치하지 않습니다");
      return;
    }
    navigate("/main/som/all")
  })

  //  로그인 유효성검사
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <S.LoginContainer>
      
      {/* background */}
      <S.BackgroundBox />

        <S.LoginBox>
        {/* login box */}
          <S.LoginForm onSubmit={handleSubmitForm}>
            {/* logo */}
            <S.Logo>blue cotton</S.Logo>   

            {/* input */}
            <S.Input type="text" placeholder="이메일을 작성해주세요" name="memberEmail" 
            {...register("memberEmail", {
              required : true,
              pattern : {
                value : emailRegex
              }
            })}
            />
            {errors.memberEmail && (
              <S.InputErrorMessage>올바른 이메일을 입력해주세요</S.InputErrorMessage>
            )}            

            <S.Input type="password" placeholder="비밀번호를 작성해주세요" name="memberPassword"
            {...register("memberPassword", {
              required : true,
              pattern : {
                value : passwordRegex
              }
            })} 
            />

            {errors && errors?.memberPassword?.type === "required" && (
              <S.InputErrorMessage>비밀번호를 입력하세요.</S.InputErrorMessage>
            )}
            {errors && errors?.memberPassword?.type === "pattern" && (
              <S.InputErrorMessage>소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.</S.InputErrorMessage>
            )}   

            {/* login button */}
            <S.LoginButton as="button" type="submit" disabled={isSubmitting}>로그인하기</S.LoginButton>
          </S.LoginForm>

        <S.Divider />

        {/* social login */}
        <S.SocialButtons>
          {/* kakao */}
          <S.SocialButton to="http://localhost:10000/oauth2/authorization/kakao">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/kakao.png`}
              alt="kakao"
            />
            카카오로 로그인
          </S.SocialButton>

          {/* google */}          
          <S.SocialButton to="http://localhost:10000/oauth2/authorization/google">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/google.png`}
              alt="google"
            />
            구글로 로그인
          </S.SocialButton>
          
          {/* naver */}          
          <S.SocialButton to="http://localhost:10000/oauth2/authorization/naver">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/naver.png`}
              alt="naver"
            />
            네이버로 로그인
          </S.SocialButton>
        </S.SocialButtons>

        {/* find id/psw */}
        <S.FindInfoBox>
          <Link to="/find-password">비밀번호를 잊으셨나요?</Link>
          <Link to="/find-id">ID를 잊으셨나요?</Link>
        </S.FindInfoBox>

        {/* sign-up */}
        <S.SignUpText>
          계정이 없으신가요?{" "}
          <Link to="/sign-up">회원가입하러 가기</Link>
        </S.SignUpText>
      </S.LoginBox>
    </S.LoginContainer>
  );
};

export default Login;
