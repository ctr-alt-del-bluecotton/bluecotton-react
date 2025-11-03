import React from "react";
import CategoryStyle from "./stylecategory";
import { useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

const HeaderCategory = () => {

    const {pathname} = useLocation();

    const isPostActive = pathname === '/main/post/all' || pathname.startsWith("/main/post/");
    const isSomActive = pathname === '/main/som/all' || pathname.startsWith("/main/som/");
    const isMyPageActive = pathname === '/main/ny-page/my-som/auth' || pathname.startsWith("/main/my-page");

    return (
        <CategoryStyle.Wrapper>
            <CategoryStyle.Container>
                <CategoryStyle.CategoryBar>
                    <CategoryStyle.CategoryLink to="/main/som/all" className={isSomActive ? "active" : ""}>홈</CategoryStyle.CategoryLink>
                    <CategoryStyle.CategoryLink to="/main/map">주변 솜</CategoryStyle.CategoryLink>
                    <CategoryStyle.CategoryLink to="/main/post/all" className={isPostActive ? "active" :""}>오늘의 솜</CategoryStyle.CategoryLink>
                    <CategoryStyle.CategoryLink to="/main/shop">블루코튼 샵</CategoryStyle.CategoryLink>
                    <CategoryStyle.CategoryLink to="/main/my-page/my-som/auth" className={isMyPageActive ? "active" : ""}>마이페이지</CategoryStyle.CategoryLink>
                </CategoryStyle.CategoryBar>
                <SearchBar />
            </CategoryStyle.Container>
        </CategoryStyle.Wrapper>

    );
};

export default HeaderCategory;