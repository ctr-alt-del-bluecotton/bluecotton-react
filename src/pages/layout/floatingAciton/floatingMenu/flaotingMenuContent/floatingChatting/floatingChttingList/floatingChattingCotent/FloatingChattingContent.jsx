import React from 'react';
import S from './style';

const FloatingChattingContent = ({content, setChattingMenu}) => {
  return (
    <S.floatingChattingContent onClick={() => setChattingMenu({menu: "room", chatId: content.id}) }>
      <S.floatingChattingContentTitle>{content.chatTitle}</S.floatingChattingContentTitle>
      <S.floatingChattingContentType>{content.chatType == "PUBLIC" ? '파티솜' : '개인솜'}</S.floatingChattingContentType>
    </S.floatingChattingContent>
  );
};

export default FloatingChattingContent;