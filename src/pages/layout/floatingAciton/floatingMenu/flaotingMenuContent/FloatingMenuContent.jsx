import React from 'react';
import FloatingSomWrite from './floatingSomWrite/FloatingSomWrite';
import S from './style';
import { useFloatingAction } from '../../../../../context/FloatingActionContext';
import FloatingChatBot from './floatingChatBot/FloatingChatBot';
import FloatingChatting from './floatingChatting/FloatingChatting';

const FloatingMenuContent = () => {
  const { somMenuContent } = useFloatingAction();

  const contents = [
    {
      label: "chatBot",
      output: <FloatingChatBot />
    },
    {
      label: "chatting",
      output: <FloatingChatting />
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