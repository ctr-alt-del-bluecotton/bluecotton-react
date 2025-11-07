import React from "react";
import S from "./style";
import SomContentList from "../somContentList/SomContentList";
import PageNumberSelect from "../somNumberSelect/SomNumberSelect";

const MainContent = () => {
  return (
    <S.Wrapper>
      <SomContentList />
      <PageNumberSelect />
    </S.Wrapper>
  );
};

export default MainContent;
