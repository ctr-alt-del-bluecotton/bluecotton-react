import React from "react";
import { Grid } from "./style";
import SomContent from "../somContent/SomContent";
import { useMain } from "../../../context/MainContext";

const SomContentList = () => {
  const { somList, somisLikeList } = useMain();
  console.log(somList)

  return (
    <Grid>
      {somList?.map((content) => (
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
