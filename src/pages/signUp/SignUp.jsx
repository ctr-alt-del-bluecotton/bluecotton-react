import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../components/modal/useModal";
import { useForm } from "react-hook-form";
import S from "./style";

const SignUp = () => {
  const [gender,setGender] = useState("");
  const navigate = useNavigate();
  const {openModal} = useModal();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors, isSubmitting}
  } = useForm({mode: "onChange"});

  const handleSubmitForm = handleSubmit(async (data) => {
    const {memberPasswordConfirm, ...member} = data;

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/member/register`, {
      headers: {
        "Content-Type" : "application/json"
      },
      method: "POST",
      body: JSON.stringify(member)
    })
    if (!res.ok) {
      const errorData = await res.json();
      openModal({
      title: "이미 존재하는 이메일입니다",
      confirmText: "확인",
      });
      return;
    }
    openModal({
      title: "회원가입이 완료되었습니다.",
      confirmText: "완료",
      onConfirm: () => navigate("/login"),
    });
  })

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        const address = data.roadAddress;
        setValue("memberAddress", address,{shouldValidate:true});
      }
    }).open();
  };
  
  

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <S.SignUpContainer>
      {/* background */}
      <S.BackgroundBox />

      {/* sign-up box */}
      <S.SignUpBox>
        <S.SignUpForm onSubmit={handleSubmitForm}>
          {/* logo */}
          <S.Logo>blue cotton</S.Logo>

          {/* input */}
          <S.Input type="text" placeholder="이름을 작성해주세요" name="memberName" 
            {...register("memberName", {
              required : true,
            })}          
          />
          {errors.memberName?.type === "required" && (
            <S.InputErrorMessage>이름을 입력하세요.</S.InputErrorMessage>
          )}          
          <S.Input type="text" placeholder="닉네임을 작성해주세요(최대 8 글자)" name="memberNickname" maxLength={8}
          {...register("memberNickname", {
            required : true,
            maxLength: {
              value: 8,
            }
          })}                    
          />
          {errors.memberNickName?.type === "required" && (
            <S.InputErrorMessage>닉네임을 입력하세요.</S.InputErrorMessage>
          )}                
          <S.Input type="text" placeholder="이메일을 작성해주세요" name="memberEmail" 
          {...register("memberEmail", {
            required : true,
            pattern : {
              value : emailRegex
            }
          })} 
          />
          {errors.memberEmail?.type === "required" && (
            <S.InputErrorMessage>이메일을 입력하세요.</S.InputErrorMessage>
          )}

          {errors.memberEmail?.type === "pattern" && (
            <S.InputErrorMessage>올바른 이메일 형식을 입력해주세요.</S.InputErrorMessage>
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
          <S.Input type="password" placeholder="비밀번호 확인" name="memberPasswordCheck" 
          {...register("memberPasswordConfirm", {
            required : true,
            validate : {
              matchPassword : (memberPasswordConfirm) => {
                const { memberPassword } = getValues();
                return memberPassword === memberPasswordConfirm
              }
            }
          })}          
          />
          {errors && errors?.memberPasswordConfirm?.type === "matchPassword" && (
            <S.InputErrorMessage>비밀번호가 일치하지 않습니다.</S.InputErrorMessage>
          )}

          {/* address */}
          <S.AddressBox>
            <S.AddressInput placeholder="주소 검색" readOnly
            {...register("memberAddress",{
              required: true
            })}
            />
            <S.SmallButton type="button" onClick={openPostcode}>검색</S.SmallButton>
          </S.AddressBox>
          {errors && errors?.memberAddress?.type === "required" && (
            <S.InputErrorMessage>주소를 입력해주세요.</S.InputErrorMessage>
          )}
          <S.GenderSelectBox>
            <S.GenderOption selected={gender === "남"}
              onClick={() => {
                setGender("남");
                setValue("memberGender", "남", { shouldValidate: true }); 
              }}
            >
              남
            </S.GenderOption>

            <S.GenderOption selected={gender === "여"}
              onClick={() => {
                setGender("여");
                setValue("memberGender", "여", { shouldValidate: true });
              }}
            >
              여
            </S.GenderOption>
          </S.GenderSelectBox>

          <input type="hidden" {...register("memberGender", { required: true })} />
          {errors.memberGender && <S.InputErrorMessage>성별을 선택해주세요</S.InputErrorMessage>} 

          {/* birth */}
          <S.DateInputBox>
            <S.DateInput
              type="date"
              {...register("memberBirth", { required: true })} // ✅ 올바른 name
            />
            <S.SmallButton type="button">확인</S.SmallButton>
          </S.DateInputBox>
          {errors.memberBirth && <S.InputErrorMessage>생년월일을 선택해주세요</S.InputErrorMessage>}

          {/* sign-up button */}
          <S.SignUpButton as="button" type="submit" disabled={isSubmitting}>회원가입 완료</S.SignUpButton>

        </S.SignUpForm>

        {/* divider */}
        <S.Divider />

        {/* login */}
        <S.LoginText>
          계정이 있으신가요?{" "}
          <Link to="/login">로그인하러 가기</Link>
        </S.LoginText>
      </S.SignUpBox>
    </S.SignUpContainer>
  );
};

export default SignUp;
