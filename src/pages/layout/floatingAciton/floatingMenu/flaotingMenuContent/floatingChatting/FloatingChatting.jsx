import React from 'react';
import S from './style';
import { ChattingProvider, useChatting } from '../../../../../../context/ChattingContext';
import FloatingChattingList from './floatingChttingList/FloatingChattingList';
import FloatingChattingRoom from './floatingChattingRoom/FloatingChattingRoom';

const FloatingChatting = () => {
  return (
    <ChattingProvider>
      <FloatingChattingComponent />
    </ChattingProvider>
  )
}

const FloatingChattingComponent = () => {
  const { chattingMenu } = useChatting();

  return (
    <S.floatingChattingContainer>
      <S.floatingChatMenuWrap>
      <S.floatingTitle>채팅 솜</S.floatingTitle>
        {chattingMenu.menu === "list" && <FloatingChattingList />}
        {chattingMenu.menu === "room" && <FloatingChattingRoom />}
      </S.floatingChatMenuWrap>
    </S.floatingChattingContainer>
  );
};


export default FloatingChatting;