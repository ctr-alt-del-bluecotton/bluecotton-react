import React from 'react';
import S from './style';
import FloatingSomWritePages from './floatingSomWriteCotent/FloatingSomWriteCotent';
import { useFloatingAction } from '../../../../../../context/FloatingActionContext';
import { fetchData, options } from '../../../../../../context/FetchContext';

const FloatingSomWrite = () => {
  const { somMenuPage, setSomMenuPage, handleSubmit, getValues, setIsAllError  } = useFloatingAction();

  const contents = Object.keys(getValues()).filter((content) => content !== "somContent");

  // const isContent = (contentName) => {
  //   if (getValues() == {}) {
  //       return false;
  //   } else {
  //       if(getValues()[contentName] === null) {
  //           return false;
  //       }
  //   }
  //   return true;

  // }

  const pageNext = (e) => {
    setIsAllError(true)
    for(const content of contents){
      if(!getValues()[content] || getValues()[content].trim() === ""){
        
        return;
      }
    }
    setSomMenuPage((prev) => ++prev)
  }

  


  function onSubmit(data) {
    console.log(data)
    const emptyFields = Object.entries(data)
      .filter(([_, value]) => !value || value.trim() === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      // 페이지 분류 로직 (입력 필드별 페이지 지정)
      const pageMapping = {
        somTitle: 1,
        somCategory: 1,
        somAddress: 1,
        somStartDate: 1,
        somEndDate: 1,
        somCount: 1,
        somContent: 2,
      };

      const firstInvalid = emptyFields[0];
      const targetPage = pageMapping[firstInvalid] || 1;
      setSomMenuPage(targetPage);
      return;
    }
    data.memberId = 1;

    const trimData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    // ✅ 백엔드로 전송
    console.log("전송 데이터:", data);
    fetchData('som/register', options.postOption(trimData))
  };
  
  const beforeButton = <S.floatingMenuButton onClick={() => setSomMenuPage((prev) => --prev)}>이전</S.floatingMenuButton>;
  const nextButton = <S.floatingMenuButton onClick={() => pageNext()}>다음</S.floatingMenuButton>;
  const sumbitButton = <S.floatingMenuButton onClick={handleSubmit(onSubmit)}>완료</S.floatingMenuButton>;
  const visibleButton = <S.floatingMenuButtonVisible>이전</S.floatingMenuButtonVisible>
  const buttonList = [
    <S.floatingMenuButtonWrap>
        {visibleButton}
        {nextButton}
    </S.floatingMenuButtonWrap>, 
    <S.floatingMenuButtonWrap>
        {beforeButton}
        {sumbitButton}
    </S.floatingMenuButtonWrap>]
  const buttonGroup = buttonList[somMenuPage];


  return (
    <S.floatingMenuWrap>
      <S.floatingFormWrap onSubmit={handleSubmit(onSubmit)}>
        <S.floatingTitle>솜 작성</S.floatingTitle>
        <S.floatingPageWrap>
          <FloatingSomWritePages />
        </S.floatingPageWrap>

        <S.floatingMenuButtonWrap>
          {buttonGroup}
        </S.floatingMenuButtonWrap>

      </S.floatingFormWrap>
    </S.floatingMenuWrap>

  );
};

export default FloatingSomWrite;