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
      oncomplete: function(data) {
        const address = data.roadAddress;
        setValue("somAddress", address, { shouldValidate:true });
      }
    }).open();
  };

  const handleSelect = (value, option) => {
    setSelected(option);
    setFormData(value);
    setValue("somCategory", value, { shouldValidate: true });
    setOpen(false);
  };

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
  
  const formatDateTimeLocal = (date) => {
    if (!date || isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 16);
  };
  

  useEffect(() => {
    const now = new Date();
    const minStart = addMinutes(now, 10);
  
    const rawStart = valueWatch.somStartDate;
    if (!rawStart) return;
  
    const userStart = new Date(rawStart);
    if (isNaN(userStart.getTime())) return;
  
    if (userStart < minStart) {
      setValue("somStartDate", formatDateTimeLocal(minStart), {
        shouldValidate: true,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueWatch.somStartDate]);
  

  useEffect(() => {
    const rawStart = valueWatch.somStartDate;
    const rawEnd = valueWatch.somEndDate;
  
    if (!rawStart || !rawEnd) return;
  
    const start = new Date(rawStart);
    const end = new Date(rawEnd);
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;
  
    const minEnd = addHours(start, 1);
  
    if (end < minEnd) {
      setValue("somEndDate", formatDateTimeLocal(minEnd), {
        shouldValidate: true,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueWatch.somEndDate, valueWatch.somStartDate]);
  

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
            min={formatDateTimeLocal(addMinutes(new Date(), 10))}
          />

          <S.floatingDateInputs
            type='datetime-local'
            {...register("somEndDate", { required: true })}
            $isError={errors.somEndDate && (touchedFields.somEndDate || isAllError)}
            min={formatDateTimeLocal(addHours(new Date(valueWatch.somStartDate), 1))}
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