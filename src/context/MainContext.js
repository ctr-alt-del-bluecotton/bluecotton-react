import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import somIsLikeListDummy from "../pages/main/dummyData/somIsLikeDummy.json";
import { fetchData, options } from './FetchContext';

const MainContext = createContext();

export const useMain = () => useContext(MainContext);


const categoryMap = {
    all: "전체",
    study: "학습",
    health: "건강",
    social: "소셜",
    hobbies: "취미",
    "life-style": "생활",
    rookie: "루키"
};

export const MainProvider = ({ children }) => {
    const { category } = useParams();
    const [sortBy, setSortBy] = useState("최신순");
    const [somList, setSomList] = useState([]);
    const [somisLikeList, setSomisLikeList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [ insertSom, setInsertSom ] = useState(false);
    
    useEffect(() => {
        setPageNumber(1);
    }, [category]);

    useEffect(() => {
        const loadSomList = async () => {
            try {
                console.log(category)
                // category가 없을 경우 'all'을 기본값으로 사용
                if (category === "all") {
                    const data = await fetchData('som/all' ,options.getOption())
                    const jsonData = await data.json();
                    setSomList(jsonData.data);
                } else {
                    const data = await fetchData(`som/category?somCategory=${category}` ,options.getOption())
                    const jsonData = await data.json();
                    setSomList(jsonData.data);
                }
            } catch (error) {
                console.error("솜 리스트를 가져오는데 실패했습니다:", error);
                // TODO: 사용자에게 에러를 알리는 UI 처리
            }
        };
        loadSomList();
    }, [category, sortBy, pageNumber, insertSom]);

    useEffect(() => {
        // 초기 좋아요 목록 설정
        setSomisLikeList(somIsLikeListDummy);
    }, []);

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
        category: category || 'all', // category가 undefined일 경우 'all'을 기본값으로
        sortBy,
        setSortBy,
        somList,
        somisLikeList,
        setInsertSom,
        setSomisLikeList,
        pageNumber,
        setPageNumber,
        categoryMap,
        formatDate
    };

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
};
