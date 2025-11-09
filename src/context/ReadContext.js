import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import readData from '../pages/main/dummyData/readDummys/readDummy.json';
import memberData from '../pages/main/dummyData/readDummys/joinMemberDummy.json';
import leaderData from '../pages/main/dummyData/readDummys/somLeaderDummy.json';
import reviewData from '../pages/main/dummyData/readDummys/somReviewDummy.json';
import { fetchData, options } from './FetchContext';

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

    useEffect(  () => {
        const loadReadData = async () => {
            setLoading(true);
            const backReadData = await fetchData(`som/read?somId=${id}`, options.getOption());
            const target = await backReadData.json();
            const readData = target.data;
            console.log(readData)

            
            // .find((som) => String(som.id) === String(id));
            setSomInfo(readData || {});
    
            const likeInfo = readData.somLike;
            setSomIsLike(likeInfo ? likeInfo.isLike : false);
    
            const leaderInfo = leaderData.find(({ somId }) => String(somId) === String(id));
            setSomLeader(leaderInfo || {});
    
            const contentData = readData.somContent
            setSomContent(contentData ? contentData.somContent : "");
    
            setSomMemberList(memberData.filter(({ somId }) => String(somId) === String(id)));
            
            setLoading(false);
        }

        loadReadData();
    }, [id]);

    useEffect(() => {
        if (somLeader.memberId) {
            setSomReviews(reviewData.filter(({ memberId }) => String(memberId) === String(somLeader.memberId)));
        }
    }, [somLeader]);
    
    const formatDate = (isoString) => {
        const date = new Date(isoString); // ISO 8601 문자열 → Date 객체로 변환
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    
    
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
        setSomIsLike,
        formatDate
    };

    return (
        <ReadContext.Provider value={value}>
            {children}
        </ReadContext.Provider>
    );
};
