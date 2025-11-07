import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchSomList } from "../pages/main/api/somAPI";
import somIsLikeListDummy from "../pages/main/dummyData/somIsLikeDummy.json";

const MainContext = createContext();

export const useMain = () => useContext(MainContext);

const categoryMap = {
    all: "전체",
    study: "학습",
    health: "건강",
    social: "소셜",
    hobby: "취미",
    "life-style": "생활",
    rookie: "루키"
};

export const MainProvider = ({ children }) => {
    const { category } = useParams();
    const [sortBy, setSortBy] = useState("최신순");
    const [somList, setSomList] = useState([]);
    const [somisLikeList, setSomisLikeList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        setPageNumber(1);
    }, [category]);

    useEffect(() => {
        const loadSomList = async () => {
            try {
                // category가 없을 경우 'all'을 기본값으로 사용
                const currentCategory = categoryMap[category] || categoryMap.all;
                const data = await fetchSomList(currentCategory, sortBy, pageNumber);
                setSomList(data);
            } catch (error) {
                console.error("솜 리스트를 가져오는데 실패했습니다:", error);
                // TODO: 사용자에게 에러를 알리는 UI 처리
            }
        };
        loadSomList();
    }, [category, sortBy, pageNumber]);

    useEffect(() => {
        // 초기 좋아요 목록 설정
        setSomisLikeList(somIsLikeListDummy);
    }, []);

    const value = {
        category: category || 'all', // category가 undefined일 경우 'all'을 기본값으로
        sortBy,
        setSortBy,
        somList,
        somisLikeList,
        setSomisLikeList,
        pageNumber,
        setPageNumber,
        categoryMap
    };

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
};
