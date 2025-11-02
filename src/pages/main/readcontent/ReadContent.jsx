import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SomReadContent from './somReadContent/SomReadContent';
import SomReadInfo from './somReadInfo/SomReadInfo';
import S from './style'
import readData from '../dummyData/readDummys/readDummy.json';
import memberData from '../dummyData/readDummys/joinMemberDummy.json'
import leaderData from '../dummyData/readDummys/somLeaderDummy.json'
import reviewData from '../dummyData/readDummys/somReviewDummy.json'
import isLikeData from '../dummyData/somIsLikeDummy.json'
import somContentData from '../dummyData/readDummys/somContentDummy.json'

const ReadContent = () => {

  const [somInfoList, setSomInfoList] = useState([]);
  const [somInfo, setSomInfo] = useState({});
  const [somLeader, setSomLeader] = useState({});
  const [somReviews, setSomReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [somContent, setSomContent] = useState();
  const [infoMenuSelect, setInfoMenuSelect] = useState("info");
  const [somMemberList , setSomMemberList] = useState([]);
  const [somIsLike, setSomIsLike] = useState([]);
  const {id} = useParams();
    
  //   useEffect(() => {
  //   const loadData = async () => {
  //     const response = await fetch(`../dummyData/readDummys/readDummy.json`);
  //     const post = await response.json();
  //     setSomInfoList(post);
  //     setLoading(true);
  //   };

  //   loadData().catch(console.error);
  // }, []);

  useEffect(() => {
    setSomInfoList(readData);
    setLoading(true);
  }, []);

  // ✅ 데이터가 로드된 이후에만 somInfo 설정
  useEffect(() => {
    if (loading && somInfoList.length > 0 && id) {
      const target = somInfoList.find((som) => String(som.id) === String(id));
      setSomInfo(target || null);
      setSomIsLike(isLikeData.find(({somId}) => String(somId) === String(id)).isLike);
      setSomReviews(reviewData.filter(({memberId}) => String(memberId) === String(somLeader.memberId)));
      setSomLeader(leaderData.find(({somId}) => String(somId) === String(id)));
      setSomContent(somContentData.find(({somId}) => String(somId) === String(id)).somContent);  
      setSomMemberList(memberData.filter(({somId}) => String(somId) === String(id)));
    }
  }, [loading, somInfoList, id]); 

  console.log(somReviews);

  return ( loading ? 
    <S.somReadContainer>
      <S.somReadWrap>
        <SomReadContent 
          infoMenuSelect={infoMenuSelect} 
          setInfoMenuSelect={setInfoMenuSelect} 
          somInfo={somInfo}
          somMemberList = {somMemberList}
          somLeader={somLeader}
          somReviews={somReviews}
          somContent={somContent}/>
        <S.somInfoSticky>
          <SomReadInfo 
          somInfo={somInfo} 
          somIsLike={somIsLike}
          setSomIsLike={setSomIsLike}/>
        </S.somInfoSticky>
      </S.somReadWrap>
    </S.somReadContainer> : <p>로딩 중</p>
  );
};

export default ReadContent;