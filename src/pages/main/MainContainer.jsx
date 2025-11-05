import React, { useEffect, useState } from "react";
import S from "./style";
import MainCategory from "./maincategory/MainCategory";
import MainContent from "./maincontent/MainContent";
import { fetchSomList } from "./api/somAPI";
import { useParams } from "react-router-dom";
import somIsLikeList from "./dummyData/somIsLikeDummy.json";


const MainContainer = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("최신순");
  const [somList, setSomList] = useState([]);
  const [somisLikeList, setSomisLikeList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const categoryMap = {
    all: "전체",
    study: "학습",
    health: "건강",
    social: "소셜",
    hobby: "취미",
    life: "생활",
    rookie: "루키"
  }
  
  useEffect(() => {
    setPageNumber(1);
  }, [category]);
  
  
  useEffect(() => {
    const loadSomList = async () => {
      const data = await fetchSomList(categoryMap[category], sortBy, pageNumber);
      setSomList(data);
    };
    loadSomList();
  }, [category, sortBy, pageNumber]);
  
  useEffect(() => {
    setSomisLikeList(somIsLikeList);
  }, [somList])
  
  return (
    <S.Container>
      <S.Wrap>
        <S.BennerImageArea>
          <S.BennerImage src="../../../assets/images/main_benner_image.png" alt="배너 이미지"/>
        </S.BennerImageArea>
        <MainCategory
          category={category}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <MainContent
          somList={somList}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          somisLikeList={somisLikeList}
          setSomisLikeList={setSomisLikeList}
        />
      </S.Wrap>
    </S.Container>
  );
};

export default MainContainer;
