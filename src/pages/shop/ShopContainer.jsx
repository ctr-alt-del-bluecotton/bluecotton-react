import React, { useState, useMemo } from "react";
import S from "./style";
import ShopList from "./ShopList";
import ShopNumberSelect from "./shopNumberSelect/ShopNumberSelect";

const ShopContainer = () => {

  const [selected, setSelected] = useState("리뷰 많은 순");
  const options = ["신상품순", "리뷰 많은 순", "낮은 가격 순", "높은 가격 순", "판매순"];

  // 임의 데이터 18개
  const ALL_ITEMS = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        name: `상품 ${i + 1}`,
        imageUrl: `/assets/images/sample_${(i % 8) + 1}.png`,
        priceText: "10,000원",
        score: "4.8",
        reviewCount: 22,
        likeCount: 255,
        isNew: true,
        isBest: i % 2 === 0,
      })),
    []
  );

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 8;

  const pagedItems = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return ALL_ITEMS.slice(start, start + pageSize);
  }, [ALL_ITEMS, pageNumber]);

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
            <S.Label><S.Checkbox /> 의류</S.Label>
            <S.Label><S.Checkbox /> 키링</S.Label>
            <S.Label><S.Checkbox /> 가방</S.Label>
            <S.Label><S.Checkbox /> 문구</S.Label>
            <S.Label><S.Checkbox /> 리빙</S.Label>
            <S.Label><S.Checkbox /> 인형</S.Label>
            <S.Label><S.Checkbox /> 디지털</S.Label>
            <S.Label><S.Checkbox /> 여행</S.Label>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterTitle>상품 타입</S.FilterTitle>
            <S.Label><S.Checkbox /> NEW</S.Label>
            <S.Label><S.Checkbox /> BEST</S.Label>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterTitle>구매 타입</S.FilterTitle>
            <S.Label><S.Checkbox /> 캔디</S.Label>
            <S.Label><S.Checkbox /> 일반</S.Label>
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
              <S.Total>{ALL_ITEMS.length}개 제품</S.Total>
            </S.SortRight>
          </S.SortBar>

          <S.SortBottomLine />

          {/* 현재 페이지 8개 상품 보여줌 (마지막 페이지는 2개) */}
          <ShopList items={pagedItems} />
          <S.Pagination>
            <ShopNumberSelect
              shopList={ALL_ITEMS}
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
