// IntroShopProductList.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShopList from "../shop/ShopList"; // 🔹 경로는 실제 구조에 맞게 수정!
                                         // 예: "../../shop/ShopList"

const IntroShopProductList = () => {
  const { currentUser, isLogin } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const params = new URLSearchParams();

        // ✅ 첫 페이지, 4개만 (인트로니까 살짝만)
        params.set("page", "0");
        params.set("size", "4");
        // 상품 정렬 기준 있으면 같이 사용 (신상품순, 인기순 등)
        params.set("sort", "LATEST");

        // 캔디샵이니까 CANDY 타입만 조회하고 싶으면 (백엔드에 해당 조건이 있을 때)
        // params.set("purchaseType", "CANDY");

        const endpoint = `${baseUrl}/main/shop/all?${params.toString()}`;
        // ⬆️ 이 부분은 실제 ShopContainer에서 쓰는 목록 API랑
        // **똑같이 맞춰주는 게 가장 좋아!** (path만 니 프로젝트에 맞게 수정)

        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();

        // 🔧 백엔드 응답 형식에 따라 조정
        // 예: result.data.products 또는 result.data.items 등
        const raw = result.data?.products || result.data?.items || result.data || [];

        // ShopList가 기대하는 형태로 살짝 가공 (필드명 맞춰주기)
        const mapped = raw.map((p) => {
          const purchaseType = p.productPurchaseType || p.purchaseType || "CASH";
          const rawPrice = p.productPrice ?? p.price ?? 0;
          const priceNumber = Number(rawPrice) || 0;
          const priceText = `${priceNumber.toLocaleString()}${
            purchaseType === "CANDY" ? "캔디" : "원"
          }`;

          const typeStr = String(p.productType ?? p.type ?? "");
          const isNew = typeStr.includes("NEW");
          const isBest = typeStr.includes("BEST");

          const score = Number(p.productAvgRating ?? p.score ?? 0).toFixed(1);
          const reviewCount = Number(p.productReviewCount ?? p.reviewCount ?? 0);
          const likeCount = Number(p.productLikeCount ?? p.likeCount ?? 0);

          return {
            ...p,
            // ShopList 내부에서 혼용해서 써도 안전하도록 양쪽 다 넣어줌
            productImageUrl: p.productImageUrl || p.imageUrl,
            imageUrl: p.productImageUrl || p.imageUrl,

            productName: p.productName || p.name,
            name: p.productName || p.name,

            productPrice: rawPrice,
            priceText,
            productPurchaseType: purchaseType,
            purchaseType,

            productType: p.productType || p.type,
            isNew,
            isBest,

            productAvgRating: p.productAvgRating ?? score,
            productReviewCount: reviewCount,
            productLikeCount: likeCount,

            score,
            reviewCount,
            likeCount,
          };
        });

        setItems(mapped);
      } catch (err) {
        console.error("인트로 캔디샵 상품 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>상품 불러오는 중...</p>;
  }

  if (items.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "24px 0" }}>
        아직 등록된 상품이 없어요.
      </p>
    );
  }

  return (
    <div
      style={{
        maxHeight: "480px", // 인트로 높이에 맞춰서 적당히 자르기
        overflow: "hidden",
      }}
    >
      <ShopList items={items} />
    </div>
  );
};

export default IntroShopProductList;
