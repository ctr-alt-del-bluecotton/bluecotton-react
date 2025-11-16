import React from "react";
import { Grid } from "./style";
import SomContent from "../somContent/SomContent";
import { useMain } from "../../../context/MainContext";

const SomContentList = () => {
  const { somList } = useMain();

  return (
    <Grid>
      {somList?.map((content) => (
        <SomContent 
          key={content.id} 
          content={content} 
        />
      ))}
    </Grid>
  );
};

export default SomContentList;
