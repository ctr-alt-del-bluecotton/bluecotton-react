import S from './style'
import { useFloatingAction } from '../../../../../../../../context/FloatingActionContext';

const FloatingSomWritePage1 = () => {
  const {
    open,
    setOpen,
    selected,
    setSelected,
    setFormData,
    register,
    setValue,
    watch,
    formState: { errors, touchedFields },
    somType, setSomType
  } = useFloatingAction();

  const valueWatch = watch();

  const somCategoryList = [
    {
      value: "study",
      label: "학습"
    },
    {
      value: "health",
      label: "건강"
    },
    {
      value: "social",
      label: "소셜"
    },
    {
      value: "hobbies",
      label: "취미"
    },
    {
      value: "life-style",
      label: "생활"
    },
    {
      value: "rookie",
      label: "루키"
    }
  ]

  const somTypeList = [
    {
      value: "solo",
      label: "솔로솜"
    },
    {
      value: "party",
      label: "파티솜"
    }
  ]

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        const address = data.roadAddress;
        setValue("somAddress", address,{shouldValidate:true});
      }
    }).open();
  };

  const handleSelect = (value, option) => {
    setSelected(option);
    setFormData(value)
    setValue("somCategory", value);
    setOpen(false);
  };

  return (
    <S.floatingFormWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>제목</S.floatingInputTitles>
        <S.floatingInputs placeholder='제목을 입력하세요' 
          {...register("somTitle",{
            required: true
          })}
          $isEmpty={!valueWatch.somTitle?.trim()}
          $isError={errors.somTitle?.type === "required"}
          $isTouched={touchedFields.somTitle}
        />
      </S.floatingInputWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>카테고리</S.floatingInputTitles>
        <input type="hidden" {...register("somCategory", { required: true })} />
        <S.floatingSomCategoryInputWrap>
          <S.floatingSomCategoryInputValue $isError={errors.somCategory?.type === "required"}
            $isTouched={touchedFields.somCategory} $hasValue={!!selected} open={open} onClick={() => setOpen(!open)}>
            {selected || "카테고리를 선택하세요"} 
            <S.floatingSomCategoryInputArrow open={open} />
          </S.floatingSomCategoryInputValue>

          <S.floatingSomCategoryOptionList open={open}>
            {somCategoryList.map(({value, label}, index) => (
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
      <S.floatingInputWrap>
        <S.floatingInputTitles>장소</S.floatingInputTitles>
        <S.floatingSomAddressInputWrap>
          <S.floatingInputs placeholder="주소 검색" readOnly
            {...register("somAddress",{
              required: true
            })}
            $isError={errors.somAddress?.type === "required"}
            $isTouched={touchedFields.somAddress}
          />
          <S.floatingSomAddressButton onClick={openPostcode}>주소 검색</S.floatingSomAddressButton>
        </S.floatingSomAddressInputWrap>
      </S.floatingInputWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>날짜</S.floatingInputTitles>
        <S.floatingSomDateSelectWrap>
          <S.floatingDateInputs type='datetime-local' placeholder='시작 날짜를 입력하세요' 
            {...register("somStartDate",{
              required: true
            })}
            $isError={errors.somStartDate?.type === "required"}
            $isTouched={touchedFields.somStartDate}
          />
          <S.floatingDateInputs type='datetime-local' placeholder='종료 날짜를 입력하세요'
            {...register("somEndDate",{
              required: true
            })}
            $isError={errors.somEndDate?.type === "required"}
            $isTouched={touchedFields.somEndDate}
          />
        </S.floatingSomDateSelectWrap>
      </S.floatingInputWrap>
      <S.floatingInputWrap>
        <S.floatingInputTitles>솜 종류</S.floatingInputTitles>
        <S.floatingSomTypeWrap>
          {somTypeList.map(({value, label}, index) => 
            <S.floatingSomTypeLabelWrap key={index}>
              <S.floatingSomTypeLabel htmlFor={value}>{label}</S.floatingSomTypeLabel>
              <S.floatingSomTypeRadio value={value} id={label} checked={somType[value]} onClick={() => setSomType({ solo: value === "solo", party: value === "party" })} type="radio" {...register("somType",{
              required: true
            })}/>
            </S.floatingSomTypeLabelWrap>
          )}
        </S.floatingSomTypeWrap>
      </S.floatingInputWrap>
    </S.floatingFormWrap>
  );
};

export default FloatingSomWritePage1;