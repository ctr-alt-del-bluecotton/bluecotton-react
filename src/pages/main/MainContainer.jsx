import React from "react";
import S from "./style";
import MainCategory from "./maincategory/MainCategory";
import MainContent from "./maincontent/MainContent";
import { MainProvider } from "../../context/MainContext";

const MainComponent = () => {
  return (
    <S.Container>
      <S.Wrap>
        <S.BennerImageArea>
          <S.BennerImage src="../../../assets/images/main_benner_image.png" alt="배너 이미지"/>
        </S.BennerImageArea>
        <MainCategory/>
        <MainContent/>
      </S.Wrap>
    </S.Container>
  )
}

const MainContainer = () => {
  return (
    <MainProvider>
      <MainComponent />
    </MainProvider>
  );
};

export default MainContainer;
