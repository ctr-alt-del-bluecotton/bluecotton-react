import React from 'react';
import FloatingSomWrite from './floatingSomWrite/FloatingSomWrite';
import S from './style';

const FloatingMenuContent = ({
  somMenuPage ,setSomMenuPage,
  somMenuContent, setSomMenuContent
}) => {

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
      output: <FloatingSomWrite 
        somMenuPage={somMenuPage} setSomMenuPage={setSomMenuPage}/>
    },
  ]
  const displayContent = contents.filter((content) => content.label == somMenuContent)[0].output


  return (
    <S.floatingContentContainer>
      {displayContent}
    </S.floatingContentContainer>
  );
};

export default FloatingMenuContent;