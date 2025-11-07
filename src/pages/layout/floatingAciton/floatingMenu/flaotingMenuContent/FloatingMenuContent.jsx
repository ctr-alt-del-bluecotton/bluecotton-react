import React from 'react';
import FloatingSomWrite from './floatingSomWrite/FloatingSomWrite';
import S from './style';
import { useFloatingAction } from '../../../../../context/FloatingActionContext';

const FloatingMenuContent = () => {
  const { somMenuContent } = useFloatingAction();

  const contents = [
    {
      label: "chatBot",
      output: <div>챗봇 자리</div>
    },
    {
      label: "chatting",
      output: <div>채팅 자리</div>
    },
    {
      label: "somWrite",
      output: <FloatingSomWrite />
    },
  ]
  const displayContent = contents.find((content) => content.label === somMenuContent)?.output;


  return (
    <S.floatingContentContainer>
      {displayContent}
    </S.floatingContentContainer>
  );
};

export default FloatingMenuContent;