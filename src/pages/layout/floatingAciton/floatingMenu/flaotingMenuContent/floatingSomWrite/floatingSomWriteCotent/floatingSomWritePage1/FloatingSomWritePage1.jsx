import S from './style'
import { useFloatingAction } from '../../../../../../../../context/FloatingActionContext';
import { useEffect } from 'react';

const FloatingSomWritePage1 = () => {
  const {
    open,
    setOpen,
    selected,
    setSelected,
    setFormData,
    register,
    setValue,
    isAllError,
    watch,
    formState: { errors, touchedFields },
    setSomType
  } = useFloatingAction();

  const valueWatch = watch();

  const somCategoryList = [
    { value: "study", label: "학습" },
    { value: "health", label: "건강" },
    { value: "social", label: "소셜" },
    { value: "hobby", label: "취미" },
    { value: "life", label: "생활" },
    { value: "rookie", label: "루키" }
  ];

  const somTypeList = [
    { value: "solo", label: "솔로솜" },
    { value: "party", label: "파티솜" }
  ];

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const address = data.roadAddress;
        setValue("somAddress", address, { shouldValidate: true });
      }
    }).open();
  };

  const handleSelect = (value, option) => {
    setSelected(option);
    setFormData(value);
    setValue("somCategory", value, { shouldValidate: true });
    setOpen(false);
  };


  /** 🔥 날짜 유틸 */
  const addMinutes = (date, minutes) => {
    if (!date || isNaN(date.getTime())) return null;
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + minutes);
    return d;
  };

  const addHours = (date, hours) => {
    if (!date || isNaN(date.getTime())) return null;
    const d = new Date(date);
    d.setHours(d.getHours() + hours);
    return d;
  };

  const parseLocalDateTime = (str) => {
    if (!str) return null;
    const [date, time] = str.split("T");
    if (!date || !time) return null;

    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);

    return new Date(year, month - 1, day, hour, minute);
  };

  const formatDateTimeLocal = (date) => {
    if (!date || isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };


  /** 🔥 시작 날짜 강제 보정 */
  useEffect(() => {
    const rawStart = valueWatch.somStartDate;
    if (!rawStart) return;

    const userStart = parseLocalDateTime(rawStart);
    if (!userStart) return;

    const minStart = addMinutes(new Date(), 10);
    if (userStart < minStart) {
      setValue("somStartDate", formatDateTimeLocal(minStart), { shouldValidate: true });
    }
  }, [valueWatch.somStartDate, setValue]);


  /** 🔥 종료 날짜 강제 보정 */
  useEffect(() => {
    const rawStart = valueWatch.somStartDate;
    const rawEnd = valueWatch.somEndDate;

    if (!rawStart || !rawEnd) return;

    const start = parseLocalDateTime(rawStart);
    const end = parseLocalDateTime(rawEnd);
    if (!start || !end) return;

    const minEnd = addHours(start, 1);

    if (end < minEnd) {
      setValue("somEndDate", formatDateTimeLocal(minEnd), { shouldValidate: true });
    }
  }, [valueWatch.somEndDate, valueWatch.somStartDate, setValue]);


  /** 🔥 min 값 계산 */
  const minStartDate = formatDateTimeLocal(addMinutes(new Date(), 10));

  const minEndDate = valueWatch.somStartDate
    ? formatDateTimeLocal(addHours(parseLocalDateTime(valueWatch.somStartDate), 1))
    : "";


  return (
    <S.floatingFormWrap>

      {/* 제목 */}
      <S.floatingInputWrap>
        <S.floatingInputTitles>제목</S.floatingInputTitles>
        <S.floatingInputs
          placeholder='제목을 입력하세요'
          {...register("somTitle", { required: true })}
          $isError={errors.somTitle && (touchedFields.somTitle || isAllError)}
        />
      </S.floatingInputWrap>

      {/* 카테고리 */}
      <S.floatingInputWrap>
        <S.floatingInputTitles>카테고리</S.floatingInputTitles>
        <input type="hidden" {...register("somCategory", { required: true })} />

        <S.floatingSomCategoryInputWrap>
          <S.floatingSomCategoryInputValue
            $isError={errors.somCategory && (touchedFields.somCategory || isAllError)}
            $hasValue={!!selected}
            open={open}
            onClick={() => setOpen(!open)}
          >
            {selected || "카테고리를 선택하세요"}
            <S.floatingSomCategoryInputArrow open={open} />
          </S.floatingSomCategoryInputValue>

          <S.floatingSomCategoryOptionList open={open}>
            {somCategoryList.map(({ value, label }, index) => (
              <S.floatingSomCategoryOption
                key={index}
                selected={label === selected}
                onClick={() => handleSelect(value, label)}
              >
                {label}
              </S.floatingSomCategoryOption>
            ))}
          </S.floatingSomCategoryOptionList>
        </S.floatingSomCategoryInputWrap>
      </S.floatingInputWrap>

      {/* 장소 */}
      <S.floatingInputWrap>
        <S.floatingInputTitles>장소</S.floatingInputTitles>
        <S.floatingSomAddressInputWrap>
          <S.floatingInputs
            placeholder="주소 검색"
            readOnly
            {...register("somAddress", { required: true })}
            $isError={errors.somAddress && (touchedFields.somAddress || isAllError)}
          />
          <S.floatingSomAddressButton onClick={openPostcode}>
            주소 검색
          </S.floatingSomAddressButton>
        </S.floatingSomAddressInputWrap>
      </S.floatingInputWrap>

      {/* 날짜 */}
      <S.floatingInputWrap>
        <S.floatingInputTitles>날짜</S.floatingInputTitles>
        <S.floatingSomDateSelectWrap>

          <S.floatingDateInputs
            type='datetime-local'
            {...register("somStartDate", { required: true })}
            $isError={errors.somStartDate && (touchedFields.somStartDate || isAllError)}
            min={minStartDate}
          />

          <S.floatingDateInputs
            type='datetime-local'
            {...register("somEndDate", { required: true })}
            $isError={errors.somEndDate && (touchedFields.somEndDate || isAllError)}
            min={minEndDate}
            disabled={!valueWatch.somStartDate}
          />

        </S.floatingSomDateSelectWrap>
      </S.floatingInputWrap>

      {/* 솜 종류 */}
      <S.floatingInputWrap>
        <S.floatingInputTitles>솜 종류</S.floatingInputTitles>

        <S.floatingSomTypeWrap>
          {somTypeList.map(({ value, label }, index) => (
            <S.floatingSomTypeLabelWrap key={index}>

              <S.floatingSomTypeLabel htmlFor={value}>
                {label}
              </S.floatingSomTypeLabel>

              <S.floatingSomTypeRadio
                id={value}
                value={value}
                type="radio"
                checked={valueWatch.somType === value}
                {...register("somType", { required: true })}
                onClick={() =>
                  setSomType({
                    solo: value === "solo",
                    party: value === "party"
                  })
                }
                $isError={errors.somType && (touchedFields.somType || isAllError)}
              />
            </S.floatingSomTypeLabelWrap>
          ))}
        </S.floatingSomTypeWrap>

      </S.floatingInputWrap>

    </S.floatingFormWrap>
  );
};

export default FloatingSomWritePage1;
