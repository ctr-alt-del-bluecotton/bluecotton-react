import React, { createContext, useState, useContext, useEffect } from 'react';
import { matchPath, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchData, options } from './FetchContext';
import { useSelector } from 'react-redux';
import { useModal } from '../components/modal';

const MainContext = createContext();

export const useMain = () => useContext(MainContext);


const categoryMap = {
    all: "전체",
    study: "학습",
    health: "건강",
    social: "소셜",
    hobby: "취미",
    life: "생활",
    rookie: "루키"
};


export const MainProvider = ({ children }) => {
    const { category } = useParams();
    const nav = useNavigate();
    const { openModal } = useModal();
    const [ sortBy, setSortBy ] = useState("all");
    const [ somList, setSomList ] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [ maxPage, setMaxPage ] = useState(1);
    const [ pageNumber, setPageNumber ] = useState(1);
    const { currentUser, isLogin } = useSelector((state) => state.user);
    const location = useLocation();
    const isRead = matchPath("/main/som/read/:id", location.pathname);
    
    const params = new URLSearchParams();
    const keyword = (searchParams.get("q") || "").trim();

    useEffect(() => {
        if (isRead) return;
    
        const next = new URLSearchParams(searchParams);
        let changed = false;
    
        // if ((searchParams.get("page") || "1") !== "1") {
        //   next.set("page", "1");
        //   changed = true;
        // }
    
        if (changed) setSearchParams(next, { replace: true });
    
        // eslint-disable-next-line
      }, [category, sortBy, keyword]);

    useEffect(() => {
        setPageNumber(1);
    }, [category]);

    useEffect(() => {
        const loadSomList = async () => {
            try {

                if (keyword) params.set("q", keyword);

                await fetchData(`som/category?somCategory=${category}&somType=${sortBy}&page=${pageNumber}&memberEmail=${currentUser.memberEmail}&somKeyword=${keyword}` ,options.getOption())
                .then(async (res) => {
                    const jsonData = await res.json(); 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, sortBy, pageNumber, keyword]);

    const somLikeUpdate = async (somId, isLike) => {
        const res = await fetchData(`som/like?somId=${somId}&memberEmail=${currentUser.memberEmail}&isLike=${isLike}`,
            options.putOption()
        ).then((res) => res)
        .catch((res) => console.error(res))

        return res;
    }

    const somJoinNotLogin = () => {
        if (!isLogin) {
            openModal({
                title: "로그인이 필요한 서비스입니다.",
                message: "로그인을 해주세요.",
                cancelText: "더 둘러보기",
                confirmText: "확인", 
                onConfirm: () => { nav('/login') }
            });
        }
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
        maxPage, setMaxPage,
        somJoinNotLogin
    };

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
};
