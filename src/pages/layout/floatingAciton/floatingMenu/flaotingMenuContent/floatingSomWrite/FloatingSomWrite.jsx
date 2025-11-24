import React from 'react';
import S from './style';
import FloatingSomWritePages from './floatingSomWriteCotent/FloatingSomWriteCotent';
import { useFloatingAction } from '../../../../../../context/FloatingActionContext';
import { fetchData, options } from '../../../../../../context/FetchContext';
import { useNavigate } from 'react-router-dom';

const FloatingSomWrite = () => {
  return <FloatingSomWriteInner />
};

const FloatingSomWriteInner = () => {
  const { somMenuPage, setSomMenuPage, handleSubmit, getValues, setIsAllError,
    uploadImageTempIds, setUploadImageTempIds, reset, currentUser, setValue, setSelected,
    setIsDisplayFloatingMenu, setIsReset, setIsFloatingSelect
   } = useFloatingAction();
  const nav = useNavigate();
   
  const contents = Object.keys(getValues()).filter((content) => content !== "somContent");

  const pageNext = (e) => {
    setIsAllError(true)
    for(const content of contents){
      if(!getValues()[content] || getValues()[content].trim() === ""){
        return;
      }
    }
    setSomMenuPage((prev) => ++prev)
  }

  const onSubmit = (inputData) => {
    const asyncSubmit = async (data) => {
      const emptyFields = Object.entries(data)
        .filter(([_, value]) => !value || value.trim() === "")
        .map(([key]) => key);
  
      if (emptyFields.length > 0) {
        return;
      }
      data.memberId = currentUser.id;
  
      const trimData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ])
      );

      await fetchData('som/register', options.postOption(trimData))
      .then(async (somRes) => {
        const somData = await somRes.json()
        if (uploadImageTempIds.length !== 0){
          await fetchData('som-image/update', options.putOption({ 
            somId : somData.data.id,
            somImageIds : uploadImageTempIds
          }))
        }

        const createChatData = {
          chatTitle: somData.data.somTitle,
          chatType: somData.data.somType === "solo" ? 'DM' : 'PUBLIC',
          chatMemberRole: 'OWNER',
          memberId: currentUser.id,
        }
        
        await fetchData('chat/create-rooms', options.postOption(createChatData))
        nav(`/main/som/read/${somData.data.id}`)
      })
    }
    asyncSubmit(inputData).then(() => {
      reset();
      setValue("somType", "solo");
      setUploadImageTempIds([]);
      setSomMenuPage(0);
      setIsDisplayFloatingMenu(false);
      setIsFloatingSelect(false);
      setIsReset((prev) => !prev)
      setIsAllError((prev) => !prev);
      setSelected("")
      window.scrollTo(0, 0);   
      window.dispatchEvent(new CustomEvent("refreshSomList"));
      window.dispatchEvent(new CustomEvent("refreshChatList"));
    })
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