import React, { useEffect, useState } from "react";
import S from "./style.js";
import { useParams } from "react-router-dom";
import { resolveUrl } from "../../../../utils/url.js";


const ShopInfo = () => {
  const [open, setOpen] = useState(true);


  const {id} = useParams();


  const [name, setName] = useState("");
  const [mainDesc, setMainDesc] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");


  // 메인 이미지 : 1장
  // 서브 이미지 : 여러장
  const [infoMainImage, setInfoMainImage] = useState("");
  const [infoSubImages, setInfoSubImages] = useState([]);

  
  useEffect(() => {

    const fetchProductInfo = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/shop/read/${id}/info`,{
        headers: { "Content-Type": "application/json" },
        method: "GET",
      }
    );


      if (!res.ok) {
        console.error("응답 에러:", res.status);
        return;
      }

      const body = await res.json(); 
      const data = body?.data;

      setName(data.productName || "");
      setMainDesc(data.productMainDescription || "");
      setSubDesc(data.productSubDescription || "");
      setWeight(data.productWeight || "");
      setSize(data.productSize || "");
      setMaterial(data.productMaterial || "");
      setInfoMainImage(data.productMainImageUrl || "");

        const subs = typeof data.productSubImageUrl === "string"
            ? data.productSubImageUrl.split(",").map((s) => s.trim()).filter(Boolean) : []

        setInfoSubImages(subs)
    }

    if(id) fetchProductInfo();

  },[id])


  return (
    <>
      <S.InfoTextWrap>
        <S.InfoKicker>{mainDesc}</S.InfoKicker>
        <S.InfoTitle>{name}</S.InfoTitle>
        {subDesc && <S.InfoDesc>{subDesc}</S.InfoDesc>}
      </S.InfoTextWrap>

      <S.InfoImage>          
        <img src={resolveUrl(infoMainImage)} alt="상품 상세 메인 이미지" />
      </S.InfoImage>

      {open && (
        <>
        {infoSubImages.map((src, i) => (
          <S.InfoImage key={i}>
            <img src={resolveUrl(src)} alt={`상품 서브 이미지 ${i + 1}`}/>
          </S.InfoImage>
        ))}

          {/* 상품 정보 */}
          <S.SpecSection>
            <S.SpecTitle>상품정보</S.SpecTitle>
            <S.SpecList>
              <S.SpecRow>
                <S.SpecLabel>무게:</S.SpecLabel>
                <S.SpecValue>{weight}</S.SpecValue>
              </S.SpecRow>
              <S.SpecRow>
                <S.SpecLabel>제품 크기:</S.SpecLabel>
                <S.SpecValue>{size}</S.SpecValue>
              </S.SpecRow>
              <S.SpecRow>
                <S.SpecLabel>재질:</S.SpecLabel>
                <S.SpecValue>{material}</S.SpecValue>
              </S.SpecRow>
            </S.SpecList>
          </S.SpecSection>

          {/* 유의사항 */}
          <S.CautionBox>
            <S.CautionTitle>유의사항</S.CautionTitle>
            <S.CautionText>
              {`이 제품은 완구가 아닙니다. 어린이나 유아 또는 애완동물이 제품을 빨거나 물어뜯지 않도록 주의하십시오.
              날카로운 제품과 본 제품을 같이 둘 경우 파손의 위험이 있습니다. 제품을 임의로 분해하거나 다른 목적으로 사용하지 마십시오.
              고온 다습한 곳에서의 제품 사용 또는 보관을 피하십시오. 제품이 물에 젖지 않게 주의하십시오.
              제품을 높은 곳에서 떨어뜨리거나 충격을 가하면 제품이 손상될 우려가 있습니다.
              용도 외 사용을 금합니다. 사용자 부주의로 인한 파손 및 불량은 당사에서 책임지지 않습니다.`}
            </S.CautionText>
          </S.CautionBox>

          {/* 판매자 정보 */}
          <S.SellerSection>
            <S.SellerTitle>판매자 정보</S.SellerTitle>
            <S.SellerList>
              <S.SellerRow>
                <S.SellerLabel>상호명</S.SellerLabel>
                <S.SellerValue>블루코튼 주식회사</S.SellerValue>
              </S.SellerRow>
              <S.SellerRow>
                <S.SellerLabel>사업자등록번호</S.SellerLabel>
                <S.SellerValue>541-1234-1234</S.SellerValue>
              </S.SellerRow>
              <S.SellerRow>
                <S.SellerLabel>통신판매업번호</S.SellerLabel>
                <S.SellerValue>2025-서울강남-1234</S.SellerValue>
              </S.SellerRow>
              <S.SellerRow>
                <S.SellerLabel>대표자</S.SellerLabel>
                <S.SellerValue>홍길동</S.SellerValue>
              </S.SellerRow>
              <S.SellerRow>
                <S.SellerLabel>고객센터</S.SellerLabel>
                <S.SellerValue>
                  1544-1234<br />
                  운영시간: 월–금 오전 9시–오후 6시 / 점심시간 오후 12시–오후 1시<br />
                  bluecotton1234@naver.com
                </S.SellerValue>
              </S.SellerRow>
            </S.SellerList>
          </S.SellerSection>
        </>
      )}

    <S.ToggleBox type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
      <S.ToggleText>{open ? "상세정보 접기" : "상세정보 더보기"}</S.ToggleText>
      <S.ToggleIcon src="/assets/icons/drop_down.svg" alt="접기/펴기 아이콘" $open={open}/>
    </S.ToggleBox>
    </>
  );
};

export default ShopInfo;
