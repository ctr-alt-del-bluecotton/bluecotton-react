import React from 'react';
import S from './style';

const FloatingChattingContent = ({content, setChattingMenu, exitRoom, exitRoomModal}) => {
  return (
    <S.floatingChattingContentContainer>
      <S.floatingChattingContent onClick={() => setChattingMenu({menu: "room", chatId: content.id}) }>
        <S.floatingChattingContentTitle>{content.chatTitle}</S.floatingChattingContentTitle>
        <S.floatingChattingContentType>{content.chatType === "PUBLIC" ? '파티솜' : '개인솜'}</S.floatingChattingContentType>
      </S.floatingChattingContent>
      <S.floatingChattingExitButton onClick={() => exitRoomModal(content.id)}>퇴장</S.floatingChattingExitButton>
    </S.floatingChattingContentContainer>
  );
};

export default FloatingChattingContent;