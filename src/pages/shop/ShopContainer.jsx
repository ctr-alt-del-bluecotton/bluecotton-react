import React, { useState, useMemo, useEffect } from "react";
import S from "./style";
import ShopList from "./ShopList";
import ShopNumberSelect from "./shopNumberSelect/ShopNumberSelect";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ShopContainer = () => {

    const { currentUser, isLogin } = useSelector((state) => state.user);
      const memberId = currentUser.id;
    
    const [searchParams] = useSearchParams();  
    const keyword = (searchParams.get("q") || "").trim();

    const [categories, setCategories] = useState({
        clothing: false,
        keyring: false,
        bag: false,
        stationery: false,
        living: false,
        doll: false,
        digital: false,
        travel: false,
    });

    const [productTypes, setProductTypes] = useState({
        new: false,
        best: false,
    });

    const [purchaseTypes, setPurchaseTypes] = useState({
        candy: false,
        cash: false,
    });

    const [selected, setSelected] = useState("신상품순");
    const options = ["신상품순", "리뷰 많은 순", "낮은 가격 순", "높은 가격 순", "판매순"];
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 8;


    useEffect(() => {

        const fetchFilterProduct = async () => {

            const filterParams = {};

            Object.keys(categories).forEach(key => {
                if (categories[key]) {
                    // 'clothing' -> 'CLOTHING' (DB ENUM 값)
                    filterParams[key] = key.toUpperCase();
                }
            });


            if (productTypes.new) filterParams.newType = 'NEW';
            if (productTypes.best) filterParams.best = 'BEST';

            // 구매 타입:
            Object.keys(purchaseTypes).forEach(key => {
                if (purchaseTypes[key]) {

                    filterParams[key] = key.toUpperCase();
                }
            });

            filterParams.order = selected;
            filterParams.memberId = memberId;

            if(keyword) {
                filterParams.q = keyword;
            }

            console.log("필터링한 데이터 :", filterParams);


            //fetch
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/shop/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(filterParams),
                });

                if (!response.ok) {
                    throw new Error(`HTTP 에러! 상태: ${response.status}`);
                }

                const json = await response.json();
                setProducts(json.data || []); 
                setPageNumber(1); 

            } catch (error) {
                console.error("상품 조회 실패:", error);

            }
        };

        fetchFilterProduct(); 

    }, [categories, productTypes, purchaseTypes, selected, memberId, isLogin, keyword]); 

    

    const displayItems = useMemo(() => {

        return products.map((p) => ({
            id: p.id,
            name: p.productName,
            imageUrl: p.productImageUrl,
            priceText: `${Number(p.productPrice).toLocaleString()}${p.productPurchaseType === "CANDY" ? "캔디" : "원"}`,
            score: (p.productAvgRating ?? 0).toFixed(1),
            reviewCount: p.productReviewCount ?? 0,
            likeCount: p.productLikeCount ?? 0,
            isNew: String(p.productType).includes("NEW"),
            isBest: String(p.productType).includes("BEST"),
            isLiked: p.isLiked
        }));
    }, [products]);

    const pagedItems = useMemo(() => {
        const start = (pageNumber - 1) * pageSize;
        return displayItems.slice(start, start + pageSize);
    }, [displayItems, pageNumber]);

    return (
        <S.Page>
            <S.Banner>
                <S.BannerTextBox>
                    <S.BannerTitle>신제품</S.BannerTitle>
                    <S.BannerDesc>지금 많은 사랑을 받고 있는 제품들을 만나보세요!</S.BannerDesc>
                </S.BannerTextBox>
            </S.Banner>

            <S.Container>
                <S.LeftFilter>

                    <S.FilterGroup>
                        <S.CatagoryTopBar />
                        <S.FilterTitle>카테고리</S.FilterTitle>
                        {/* setCategories */}
                        <S.Label><S.Checkbox checked={categories.clothing} onChange={() => setCategories(prev => ({...prev, clothing: !prev.clothing}))} /> 의류</S.Label>
                        <S.Label><S.Checkbox checked={categories.keyring} onChange={() => setCategories(prev => ({...prev, keyring: !prev.keyring}))}/> 키링</S.Label>
                        <S.Label><S.Checkbox checked={categories.bag} onChange={() => setCategories(prev => ({...prev, bag: !prev.bag}))}/> 가방</S.Label>
                        <S.Label><S.Checkbox checked={categories.stationery} onChange={() => setCategories(prev => ({...prev, stationery: !prev.stationery}))}/> 문구</S.Label>
                        <S.Label><S.Checkbox checked={categories.living} onChange={() => setCategories(prev => ({...prev, living: !prev.living}))}/> 리빙</S.Label>
                        <S.Label><S.Checkbox checked={categories.doll} onChange={() => setCategories(prev => ({...prev, doll: !prev.doll}))}/> 인형</S.Label>
                        <S.Label><S.Checkbox checked={categories.digital} onChange={() => setCategories(prev => ({...prev, digital: !prev.digital}))}/> 디지털</S.Label>
                        <S.Label><S.Checkbox checked={categories.travel} onChange={() => setCategories(prev => ({...prev, travel: !prev.travel}))}/> 여행</S.Label>
                    </S.FilterGroup>

                    <S.FilterGroup>
                        <S.FilterTitle>상품 타입</S.FilterTitle>
                        {/* setProductTypes */}
                        <S.Label><S.Checkbox checked={productTypes.new} onChange={() => setProductTypes(prev => ({...prev, new: !prev.new}))}/> NEW</S.Label>
                        <S.Label><S.Checkbox checked={productTypes.best} onChange={() => setProductTypes(prev => ({...prev, best: !prev.best}))}/> BEST</S.Label>
                    </S.FilterGroup>

                    <S.FilterGroup>
                        <S.FilterTitle>구매 타입</S.FilterTitle>
                        {/* setPurchaseTypes */}
                        <S.Label><S.Checkbox checked={purchaseTypes.candy} onChange={() => setPurchaseTypes(prev => ({...prev, candy: !prev.candy}))}/> 캔디</S.Label>
                        <S.Label><S.Checkbox checked={purchaseTypes.cash} onChange={() => setPurchaseTypes(prev => ({...prev, cash: !prev.cash}))}/> 일반</S.Label>
                    </S.FilterGroup>
                </S.LeftFilter>

                <S.Main>
                    <S.SortTopLine />

                    <S.SortBar>
                        <S.SortSelect
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                            aria-label="정렬 선택"
                        >
                            {options.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </S.SortSelect>

                        <S.SortRight>
                            <span>전체</span>
                            <span>›</span>
                            <S.Total>{displayItems.length}개 제품</S.Total>
                        </S.SortRight>
                    </S.SortBar>

                    <S.SortBottomLine />

                    <ShopList items={pagedItems} />
                    <S.Pagination>
                        <ShopNumberSelect
                            shopList={displayItems}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                    </S.Pagination>
                </S.Main>
            </S.Container>
        </S.Page>
    );
};

export default ShopContainer;