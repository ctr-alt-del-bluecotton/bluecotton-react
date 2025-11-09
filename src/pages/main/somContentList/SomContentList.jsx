import React from "react";
import { Grid } from "./style";
import SomContent from "../somContent/SomContent";
import { useMain } from "../../../context/MainContext";

const SomContentList = () => {
  const { somList, pageNumber, somisLikeList } = useMain();
  console.log(somList)
  const startIndex = (pageNumber - 1) * 9;
  const currentList = somList.length > 9 ? somList : somList?.slice(startIndex, startIndex + 9) ;

  return (
    <Grid>
      {currentList.map((content) => (
        <SomContent 
          key={content.id} 
          content={content} 
          somisLike={somisLikeList.find((list) => String(list.somId) === String(content.id))} 
        />
      ))}
    </Grid>
  );
};

export default SomContentList;
