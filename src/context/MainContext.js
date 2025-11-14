import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import somIsLikeListDummy from "../pages/main/dummyData/somIsLikeDummy.json";
import { fetchData, options } from './FetchContext';
import { useSelector } from 'react-redux';

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
    const [ sortBy, setSortBy ] = useState("all");
    const [ somList, setSomList ] = useState([]);
    const [ maxPage, setMaxPage ] = useState(1);
    const [ pageNumber, setPageNumber ] = useState(1);
    const { currentUser, isLogin } = useSelector((state) => state.user);
    
    useEffect(() => {
        setPageNumber(1);
    }, [category]);

    useEffect(() => {
        const loadSomList = async () => {
            try {
                console.log(category)
                await fetchData(`som/category?somCategory=${category}&somType=${sortBy}&page=${pageNumber}&memberEmail=${currentUser.memberEmail}` ,options.getOption())
                .then(async (res) => {
                    const jsonData = await res.json();
                    console.log(jsonData)
                    const somListData = jsonData.data.somList;
                    const somMaxPage = jsonData.data.maxPage;
                    setSomList(somListData);
                    setMaxPage(somMaxPage);
                })
            } catch (error) {
                console.error("솜 리스트를 가져오는데 실패했습니다:", error);
            }
        };
        loadSomList();

        const handleRefresh = () => {
            loadSomList(); 
        };

        window.addEventListener("refreshSomList", handleRefresh);
        return () => window.removeEventListener("refreshSomList", handleRefresh);
    }, [category, sortBy, pageNumber]);

    const somLikeUpdate = async (somId, isLike) => {
        const res = await fetchData(`som/like?somId=${somId}&memberEmail=${currentUser.memberEmail}&isLike=${isLike}`,
            options.putOption()
        ).then((res) => res)
        .catch((res) => console.error(res))

        return res;
    }


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
        currentUser,
        isLogin,
        pageNumber,
        setPageNumber,
        categoryMap,
        formatDate,
        somLikeUpdate,
        maxPage, setMaxPage
    };

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
};
