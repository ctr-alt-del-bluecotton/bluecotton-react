import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../components/modal/useModal";
import { useForm } from "react-hook-form";
import S from "./style";
import { openPostcode } from "../../commons/address";

const SignUp = () => {
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { openModal } = useModal();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const handleSubmitForm = handleSubmit(async (data) => {
    const { memberPasswordConfirm, ...member } = data;

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/member/register`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(member),
      }
    );

    if (!res.ok) {
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
  });

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <S.SignUpContainer>
      <S.BackgroundBox />

      <S.SignUpBox>
        <S.SignUpForm onSubmit={handleSubmitForm}>
          <S.Logo>blue cotton</S.Logo>

          <S.Input
            placeholder="이름을 작성해주세요"
            $error={!!errors.memberName}
            {...register("memberName", { required: true })}
          />

          <S.Input
            placeholder="닉네임을 작성해주세요(최대 8 글자)"
            maxLength={8}
            $error={!!errors.memberNickname}
            {...register("memberNickname", { required: true })}
          />

          <S.Input
            placeholder="이메일을 작성해주세요"
            $error={!!errors.memberEmail}
            {...register("memberEmail", {
              required: true,
              pattern: emailRegex,
            })}
          />

          <S.Input
            placeholder="전화번호 (예: 010-1234-5678)"
            maxLength={13}
            $error={!!errors.memberPhone}
            {...register("memberPhone", {
              required: true,
              pattern: /^01[0-9]-\d{3,4}-\d{4}$/,
            })}
          />

          <S.Input
            type="password"
            placeholder="비밀번호를 작성해주세요"
            $error={!!errors.memberPassword}
            {...register("memberPassword", {
              required: true,
              pattern: passwordRegex,
            })}
          />

          <S.Input
            type="password"
            placeholder="비밀번호 확인"
            $error={!!errors.memberPasswordConfirm}
            {...register("memberPasswordConfirm", {
              required: true,
              validate: (value) =>
                value === getValues("memberPassword"),
            })}
          />

          <S.AddressBox>
            <S.AddressInput
              readOnly
              placeholder="주소 검색"
              $error={!!errors.memberAddress}
              {...register("memberAddress", { required: true })}
            />
            <S.SmallButton
              type="button"
              onClick={() =>
                openPostcode(({ address, postcode }) => {
                  setValue("memberAddress", address);
                  setValue("memberPostcode", postcode);
                })
              }
            >
              검색
            </S.SmallButton>
          </S.AddressBox>

          <S.Input
            placeholder="상세주소를 입력해주세요"
            $error={!!errors.memberDetailAddress}
            {...register("memberDetailAddress", { required: true })}
          />

          <S.Input
            readOnly
            placeholder="우편번호 (자동 입력)"
            $error={!!errors.memberPostcode}
            {...register("memberPostcode", { required: true })}
          />

          <S.GenderSelectBox>
            <S.GenderOption
              selected={gender === "남"}
              $error={!!errors.memberGender}
              onClick={() => {
                setGender("남");
                setValue("memberGender", "남", { shouldValidate: true }); // ⭐ 수정
              }}
            >
              남
            </S.GenderOption>

            <S.GenderOption
              selected={gender === "여"}
              $error={!!errors.memberGender}
              onClick={() => {
                setGender("여");
                setValue("memberGender", "여", { shouldValidate: true }); // ⭐ 수정
              }}
            >
              여
            </S.GenderOption>
          </S.GenderSelectBox>


          <S.DateInputBox>
            <S.DateInput
              $error={!!errors.memberBirth}
              {...register("memberBirth", { required: true })}
            />
            <S.SmallButton type="button">확인</S.SmallButton>
          </S.DateInputBox>

          <S.SignUpButton as="button" type="submit" disabled={isSubmitting}>
            회원가입 완료
          </S.SignUpButton>
        </S.SignUpForm>

        <S.Divider />

        <S.LoginText>
          계정이 있으신가요? <Link to="/login">로그인하러 가기</Link>
        </S.LoginText>
      </S.SignUpBox>
    </S.SignUpContainer>
  );
};

export default SignUp;
