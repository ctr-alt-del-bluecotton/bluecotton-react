// AddressForm.jsx
import React, { useEffect, useRef, useState } from "react";
import * as S from "./style";

export default function AddressForm({
  defaultValues = {},
  onSubmit,
  onCancel,
  submitText = "저장하기",
}) {
  const [values, setValues] = useState({
    id: undefined,
    name: "",
    phone: "",
    addr1: "",
    addr2: "",
    isDefault: false,
    ...defaultValues,
  });

  const loadedRef = useRef(false);

  useEffect(() => {
    if (window.daum?.Postcode) {
      loadedRef.current = true;
      return;
    }
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => { loadedRef.current = true; };
    document.head.appendChild(script);
  }, []);

  const searchPostcode = () => {
    if (!loadedRef.current || !window.daum?.Postcode) {
      alert("주소 검색 스크립트가 아직 로드되지 않았어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        setValues((v) => ({
          ...v,
          addr1: data.roadAddress || data.address,
        }));
      },
    }).open();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.phone || !values.addr1) {
      alert("이름, 휴대폰번호, 주소는 필수입니다.");
      return;
    }
    onSubmit(values);
  };

  return (
    <S.Form >

      <S.Field>
        <S.Label htmlFor="name">이름</S.Label>
        <S.Input
          id="name"
          name="name"
          placeholder="이름을 입력하세요"
          value={values.name}
          onChange={handleChange}
        />
      </S.Field>

      <S.Field>
        <S.Label htmlFor="phone">휴대폰번호</S.Label>
        <S.Input
          id="phone"
          name="phone"
          placeholder="010-1234-1234"
          value={values.phone}
          onChange={handleChange}
        />
      </S.Field>

      <S.Field>
        <S.Label>주소</S.Label>

        <S.ZipRow>
          <S.InputOther
            name="addr1"
            placeholder="주소"
            value={values.addr1}
            onChange={handleChange}
          />
          <S.SearchBtn type="button" onClick={searchPostcode}>
            주소검색
          </S.SearchBtn>
        </S.ZipRow>
      </S.Field>

      <S.CheckRow htmlFor="isDefault">
        <input
          type="checkbox"
          id="isDefault"
          name="isDefault"
          checked={!!values.isDefault}
          onChange={handleChange}
        />
        <label htmlFor="isDefault">기본 배송지로 설정</label>
      </S.CheckRow>

      <S.ButtonRow>
        <S.GhostButton type="button" onClick={onCancel}>
          취소
        </S.GhostButton>
        <S.PrimaryButton type="submit">{submitText}</S.PrimaryButton>
      </S.ButtonRow>
    </S.Form>
  );
}
