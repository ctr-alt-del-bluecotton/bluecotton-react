import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../components/modal/useModal";
import { useForm } from "react-hook-form";
import S from "./style";
import { openPostcode } from "../../commons/address";

const SignUp = () => {
  const [gender, setGender] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const handleSubmitForm = handleSubmit(async (data) => {
    const { memberPasswordConfirm, ...member } = data;

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/member/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      }
    );

    if (!res.ok) {
      const error = await res.json();

      openModal({
        title: error.message,
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

  const goNext = async (fields) => {
    const valid = await trigger(fields);
    if (valid) setStep(step + 1);
  };

  const goPrev = () => setStep(step - 1);

  const formatPhone = (value) => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length < 4) return numbers;
    if (numbers.length < 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <S.SignUpContainer>
      <S.BackgroundBox />

      <S.SignUpBox>
        <S.SignUpForm onSubmit={handleSubmitForm}>
          <S.Logo>blue cotton</S.Logo>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <S.InputGroup>
                <S.InputLabel>이름</S.InputLabel>
                <S.Input
                  placeholder="이름을 입력해주세요"
                  $error={!!errors.memberName}
                  {...register("memberName", {
                    required: "이름을 입력해주세요.",
                  })}
                />
                {errors.memberName && (
                  <S.ErrorText>{errors.memberName.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>닉네임</S.InputLabel>
                <S.Input
                  placeholder="닉네임을 입력해주세요(최대 8 글자)"
                  maxLength={8}
                  $error={!!errors.memberNickname}
                  {...register("memberNickname", {
                    required: "닉네임을 입력해주세요.",
                    maxLength: {
                      value: 8,
                      message: "닉네임은 8글자 이하로 입력해주세요.",
                    },
                  })}
                />
                {errors.memberNickname && (
                  <S.ErrorText>{errors.memberNickname.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>이메일</S.InputLabel>
                <S.Input
                  placeholder="이메일을 입력해주세요"
                  $error={!!errors.memberEmail}
                  {...register("memberEmail", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: emailRegex,
                      message: "올바른 이메일 형식이 아닙니다. example@example.com",
                    },
                  })}
                />
                {errors.memberEmail && (
                  <S.ErrorText>{errors.memberEmail.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>전화번호</S.InputLabel>
                <S.Input
                  placeholder="010-0000-0000"
                  maxLength={13}
                  $error={!!errors.memberPhone}
                  {...register("memberPhone", {
                    required: "전화번호를 입력해주세요.",
                    pattern: {
                      value: /^01[0-9]-\d{3,4}-\d{4}$/,
                      message: "올바른 전화번호 형식이 아닙니다.",
                    },
                  })}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setValue("memberPhone", formatted, { shouldValidate: true });
                  }}
                />
                {errors.memberPhone && (
                  <S.ErrorText>{errors.memberPhone.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>비밀번호</S.InputLabel>

                <S.PasswordWrapper>
                  <S.Input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 작성해주세요"
                    $error={!!errors.memberPassword}
                    {...register("memberPassword", {
                      required: "비밀번호를 입력해주세요.",
                      pattern: {
                        value: passwordRegex,
                        message:
                          "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
                      },
                      onChange: () => trigger("memberPasswordConfirm"),
                    })}
                  />
                  <S.EyeIcon
                    src={
                      showPassword
                        ? "/assets/icons/eye.svg"
                        : "/assets/icons/visibility_off.svg"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </S.PasswordWrapper>

                {errors.memberPassword && (
                  <S.ErrorText>{errors.memberPassword.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup style={{ marginBottom: "28px" }}>
                <S.InputLabel>비밀번호 확인</S.InputLabel>

                <S.PasswordWrapper>
                  <S.Input
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력해주세요"
                    $error={!!errors.memberPasswordConfirm}
                    {...register("memberPasswordConfirm", {
                      required: "비밀번호를 다시 입력해주세요.",
                      validate: (check) =>
                        check === getValues("memberPassword") ||
                        "비밀번호가 일치하지 않습니다.",
                    })}
                  />
                  <S.EyeIcon
                    src={
                      showPasswordConfirm
                        ? "/assets/icons/eye.svg"
                        : "/assets/icons/visibility_off.svg"
                    }
                    onClick={() =>
                      setShowPasswordConfirm(!showPasswordConfirm)
                    }
                  />
                </S.PasswordWrapper>

                {errors.memberPasswordConfirm && (
                  <S.ErrorText>
                    {errors.memberPasswordConfirm.message}
                  </S.ErrorText>
                )}
              </S.InputGroup>

              <S.SignUpButton
                as="button"
                type="button"
                onClick={() =>
                  goNext([
                    "memberName",
                    "memberNickname",
                    "memberEmail",
                    "memberPhone",
                    "memberPassword",
                    "memberPasswordConfirm",
                  ])
                }
              >
                다음
              </S.SignUpButton>
            </>
          )}

          {step === 2 && (
            <>
              <S.InputGroup>
                <S.InputLabel>주소</S.InputLabel>
                <S.AddressBox>
                  <S.AddressInput
                    readOnly
                    placeholder="주소 검색"
                    $error={!!errors.memberAddress}
                    {...register("memberAddress", {
                      required: "주소를 입력해주세요.",
                    })}
                  />
                  <S.SmallButton
                    type="button"
                    onClick={() =>
                      openPostcode(({ address, postcode }) => {
                        setValue("memberAddress", address, {
                          shouldValidate: true,
                        });
                        setValue("memberPostcode", postcode, {
                          shouldValidate: true,
                        });
                      })
                    }
                  >
                    검색
                  </S.SmallButton>
                </S.AddressBox>

                {errors.memberAddress && (
                  <S.ErrorText>{errors.memberAddress.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>상세주소</S.InputLabel>
                <S.Input
                  placeholder="상세주소 입력"
                  $error={!!errors.memberDetailAddress}
                  {...register("memberDetailAddress", {
                    required: "상세주소를 입력해주세요.",
                  })}
                />
                {errors.memberDetailAddress && (
                  <S.ErrorText>
                    {errors.memberDetailAddress.message}
                  </S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>우편번호</S.InputLabel>
                <S.Input
                  readOnly
                  placeholder="우편번호"
                  $error={!!errors.memberPostcode}
                  {...register("memberPostcode", {
                    required: "우편번호를 입력해주세요.",
                  })}
                />
                {errors.memberPostcode && (
                  <S.ErrorText>{errors.memberPostcode.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>성별</S.InputLabel>
                <S.GenderSelectBox>
                  <S.GenderOption
                    selected={gender === "남"}
                    $error={!!errors.memberGender}
                    onClick={() => {
                      setGender("남");
                      setValue("memberGender", "남", { shouldValidate: true });
                    }}
                  >
                    남
                  </S.GenderOption>

                  <S.GenderOption
                    selected={gender === "여"}
                    $error={!!errors.memberGender}
                    onClick={() => {
                      setGender("여");
                      setValue("memberGender", "여", { shouldValidate: true });
                    }}
                  >
                    여
                  </S.GenderOption>
                </S.GenderSelectBox>

                {errors.memberGender && (
                  <S.ErrorText>{errors.memberGender.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.InputGroup style={{ marginBottom: "28px" }}>
                <S.InputLabel>생년월일</S.InputLabel>
                <S.DateInputBox>
                  <S.DateInput
                    $error={!!errors.memberBirth}
                    {...register("memberBirth", {
                      required: "생년월일을 선택해주세요.",
                    })}
                  />
                </S.DateInputBox>

                {errors.memberBirth && (
                  <S.ErrorText>{errors.memberBirth.message}</S.ErrorText>
                )}
              </S.InputGroup>

              <S.ButtonRow>
                <S.SmallButton type="button" onClick={goPrev}>
                  이전
                </S.SmallButton>
                <S.SignUpButton
                  as="button"
                  type="button"
                  onClick={() =>
                    goNext([
                      "memberAddress",
                      "memberDetailAddress",
                      "memberPostcode",
                      "memberGender",
                      "memberBirth",
                    ])
                  }
                >
                  다음
                </S.SignUpButton>
              </S.ButtonRow>
            </>
          )}

          {step === 3 && (
            <>
              <S.AgreeTitle>개인정보 이용 및 처리 동의</S.AgreeTitle>

              <S.AgreeBox>
                <p>서비스 운영 및 회원 관리 목적</p>
                <p>개인정보는 탈퇴 후 즉시 삭제됩니다.</p>

                <label>
                  <input
                    type="checkbox"
                    {...register("agree", { required: true })}
                  />
                  동의합니다
                </label>

                {errors.agree && (
                  <S.ErrorText>필수 항목입니다.</S.ErrorText>
                )}
              </S.AgreeBox>

              <S.ButtonRow>
                <S.SmallButton type="button" onClick={goPrev}>
                  이전
                </S.SmallButton>

                <S.SignUpButton
                  as="button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  회원가입 완료
                </S.SignUpButton>
              </S.ButtonRow>
            </>
          )}
        </S.SignUpForm>

        <S.Divider />

        <S.LoginText>
          계정이 있으신가요?{" "}
          <Link to="/login">로그인하러 가기</Link>
        </S.LoginText>
      </S.SignUpBox>
    </S.SignUpContainer>
  );
};

export default SignUp;
