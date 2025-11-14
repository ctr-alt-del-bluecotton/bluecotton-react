import React from "react";
import S from "./style";
import { useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

const HeaderCategory = () => {

    const {pathname} = useLocation();

    const isPostActive = pathname === '/main/post/all' || pathname.startsWith("/main/post/");
    const isSomActive = pathname === '/main/som/all' || pathname.startsWith("/main/som/");
    const isMyPageActive = pathname === '/main/ny-page/my-som/auth' || pathname.startsWith("/main/my-page");
    const isMapPageActive = pathname === '/main/map' || pathname.startsWith("/main/map");

    const isHiddenSearchBar = isMyPageActive || isMapPageActive;

    return (
        <S.Wrapper>
            <S.Container>
                <S.CategoryBar>
                    <S.CategoryLink to="/main/som/all" className={isSomActive ? "active" : ""}>홈</S.CategoryLink>
                    <S.CategoryLink to="/main/map">주변 솜</S.CategoryLink>
                    <S.CategoryLink to="/main/post/all" className={isPostActive ? "active" :""}>오늘의 솜</S.CategoryLink>
                    <S.CategoryLink to="/main/shop">블루코튼 샵</S.CategoryLink>
                </S.CategoryBar>
                {!isHiddenSearchBar && <SearchBar />}
            </S.Container>
        </S.Wrapper>

    );
};

export default HeaderCategory;