import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import readData from '../pages/main/dummyData/readDummys/readDummy.json';
import memberData from '../pages/main/dummyData/readDummys/joinMemberDummy.json';
import leaderData from '../pages/main/dummyData/readDummys/somLeaderDummy.json';
import reviewData from '../pages/main/dummyData/readDummys/somReviewDummy.json';
import isLikeData from '../pages/main/dummyData/somIsLikeDummy.json';
import somContentData from '../pages/main/dummyData/readDummys/somContentDummy.json';

const ReadContext = createContext();

export const useRead = () => useContext(ReadContext);

export const ReadProvider = ({ children }) => {
    const [somInfo, setSomInfo] = useState({});
    const [somLeader, setSomLeader] = useState({});
    const [somReviews, setSomReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [somContent, setSomContent] = useState('');
    const [infoMenuSelect, setInfoMenuSelect] = useState("info");
    const [somMemberList, setSomMemberList] = useState([]);
    const [somIsLike, setSomIsLike] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        const target = readData.find((som) => String(som.id) === String(id));
        setSomInfo(target || {});

        const likeInfo = isLikeData.find(({ somId }) => String(somId) === String(id));
        setSomIsLike(likeInfo ? likeInfo.isLike : false);

        const leaderInfo = leaderData.find(({ somId }) => String(somId) === String(id));
        setSomLeader(leaderInfo || {});

        const contentData = somContentData.find(({ somId }) => String(somId) === String(id));
        setSomContent(contentData ? contentData.somContent : "");

        setSomMemberList(memberData.filter(({ somId }) => String(somId) === String(id)));
        
        setLoading(false);
    }, [id]);

    useEffect(() => {
        if (somLeader.memberId) {
            setSomReviews(reviewData.filter(({ memberId }) => String(memberId) === String(somLeader.memberId)));
        }
    }, [somLeader]);

    const value = {
        somInfo,
        somLeader,
        somReviews,
        loading,
        somContent,
        infoMenuSelect,
        setInfoMenuSelect,
        somMemberList,
        somIsLike,
        setSomIsLike
    };

    return (
        <ReadContext.Provider value={value}>
            {children}
        </ReadContext.Provider>
    );
};
