import React from "react";
import { Grid } from "./style";
import SomContent from "../somContent/SomContent";

const SomContentList = ({ somisLikeList, somList, pageNumber, setSomisLikeList }) => {
  const startIndex = (pageNumber - 1) * 9;
  const currentList = somList.slice(startIndex, startIndex + 9);

  return (
    <Grid>
      {currentList.map((content) => (
        <SomContent key={content.id} somisLikeList={somisLikeList} somisLike={somisLikeList.filter((list) => 
          String(list.somId) === String(content.id)
        )[0]
      } setSomisLikeList={setSomisLikeList} content={content} />
      ))}
    </Grid>
  );
};

export default SomContentList;
