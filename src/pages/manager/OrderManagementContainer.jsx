// src/pages/manager/order/OrderManagementContainer.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./style";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { useModal } from "../../components/modal/useModal";

const API = process.env.REACT_APP_BACKEND_URL || "";
const fmt = (n) =>
  Number(n || 0).toLocaleString("ko-KR", { maximumFractionDigits: 0 });

const DashboardContent = ({ orders = [], products = [] }) => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [horizon, setHorizon] = useState(7);
  const [loadingRevenue, setLoadingRevenue] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState(null);

  const totalOrders = orders.length;
  const totalSales = useMemo(
    () => orders.reduce((sum, o) => sum + (o.total || 0), 0),
    [orders]
  );
  const activeProducts = useMemo(() => products.length, [products]);

  const historyChartData = useMemo(
    () =>
      dailyRevenue.map((d) => ({
        date: d.date,
        displayDate: d.date?.slice(5) || d.date,
        revenue: d.revenue,
      })),
    [dailyRevenue]
  );

  const forecastChartData = useMemo(
    () =>
      forecast.map((d) => ({
        date: d.date,
        displayDate: d.date?.slice(5) || d.date,
        revenue: d.revenue,
      })),
    [forecast]
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoadingRevenue(true);
        setLoadingForecast(true);
        setError(null);

        const url = new URL(`${API}/api/admin/revenue/forecast`);
        url.searchParams.set("horizon", horizon);

        const res = await fetch(url.toString(), {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const body = await res.json();
        const data = body?.data ?? body;

        if (!data || !Array.isArray(data.history)) {
          throw new Error("백엔드 API가 history 데이터를 반환하지 않았습니다.");
        }

        setDailyRevenue(
          data.history.map((d) => ({
            date: d.date,
            revenue: Number(d.revenue ?? d.totalRevenue ?? d.amount ?? 0),
          }))
        );

        const forecastArray = Array.isArray(data.forecast) ? data.forecast : [];
        setForecast(
          forecastArray.map((d) => ({
            date: d.date,
            revenue: Number(d.predictRevenue ?? d.revenue ?? d.amount ?? 0),
          }))
        );
      } catch (e) {
        console.error("[DashboardContent] Dashboard Data Error:", e);
        setError(`데이터 로드 실패: ${e.message}`);
        setDailyRevenue([]);
        setForecast([]);
      } finally {
        setLoadingRevenue(false);
        setLoadingForecast(false);
      }
    };

    fetchDashboardData();
  }, [horizon]);

  return (
    <S.DashboardWrapper>
      <S.SectionTitle>관리자 대시보드</S.SectionTitle>

      <S.SummaryGrid>
        <S.SummaryCard>
          <S.SummaryLabel>총 주문 수</S.SummaryLabel>
          <S.SummaryValue style={{ color: "#333", fontSize: "24px" }}>
            {fmt(totalOrders)}건
          </S.SummaryValue>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryLabel>총 매출 (주문 기준)</S.SummaryLabel>
          <S.SummaryValue style={{ color: "#333", fontSize: "24px" }}>
            {fmt(totalSales)}원
          </S.SummaryValue>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryLabel>상품 개수</S.SummaryLabel>
          <S.SummaryValue style={{ color: "#333", fontSize: "24px" }}>
            {fmt(activeProducts)}개
          </S.SummaryValue>
        </S.SummaryCard>
      </S.SummaryGrid>

      {error && <S.ErrorBox>에러: {error}</S.ErrorBox>}

      <S.ChartGrid>
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>일별 매출 (결제 기준)</S.ChartTitle>
          </S.ChartHeader>

          {loadingRevenue || loadingForecast ? (
            <S.EmptyState>데이터를 불러오는 중...</S.EmptyState>
          ) : dailyRevenue.length === 0 ? (
            <S.EmptyState>표시할 매출 데이터가 없습니다. (DB 확인)</S.EmptyState>
          ) : (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyChartData}>
                  <CartesianGrid strokeDasharray="3 10" />
                  <XAxis dataKey="displayDate" />
                  <YAxis tickFormatter={(v) => fmt(v)} width={80} />
                  <Tooltip
                    formatter={(value) => `${fmt(value)}원`}
                    labelFormatter={(label) => `날짜: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#726EF0"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    animationDuration={3500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </S.ChartCard>

        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>매출 예측</S.ChartTitle>
            <S.HorizonButtons>
              {[7, 30, 365].map((h) => (
                <S.HorizonButton
                  key={h}
                  $active={horizon === h}
                  onClick={() => setHorizon(h)}
                >
                  {h === 7 ? "7일" : h === 30 ? "30일" : "1년"}
                </S.HorizonButton>
              ))}
            </S.HorizonButtons>
          </S.ChartHeader>

          {loadingRevenue || loadingForecast ? (
            <S.EmptyState>예측 데이터를 불러오는 중...</S.EmptyState>
          ) : forecast.length === 0 ? (
            <S.EmptyState>표시할 예측 데이터가 없습니다. (API 응답 확인)</S.EmptyState>
          ) : (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="displayDate" />
                  <YAxis tickFormatter={(v) => fmt(v)} width={80} />
                  <Tooltip
                    formatter={(value) => `${fmt(value)}원`}
                    labelFormatter={(label) => `예측 날짜: ${label}`}
                  />
                  <Bar dataKey="revenue" fill="#726EF0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </S.ChartCard>
      </S.ChartGrid>
    </S.DashboardWrapper>
  );
};

const CATEGORY_OPTIONS = [
  { value: "CLOTHING", label: "옷" },
  { value: "KEYRING", label: "키링" },
  { value: "BAG", label: "가방" },
  { value: "STATIONERY", label: "문구" },
  { value: "LIVING", label: "리빙" },
  { value: "DOLL", label: "인형" },
  { value: "DIGITAL", label: "디지털" },
  { value: "TRAVEL", label: "여행" },
];

const PURCHASE_TYPE_OPTIONS = [
  { value: "CASH", label: "일반 결제" },
  { value: "CANDY", label: "캔디 결제" },
];

const PRODUCT_TYPE_OPTIONS = [
  { value: "NEW", label: "NEW" },
  { value: "BEST", label: "BEST" },
  { value: "DEFAULT", label: "DEFAULT" },
];

const ProductCreateModal = ({ onClose, onCreated }) => {
  const [submitting, setSubmitting] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingSub, setUploadingSub] = useState(false);
  const { openModal } = useModal();

  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productStock: "",
    productCategory: CATEGORY_OPTIONS[0].value,
    productType: PRODUCT_TYPE_OPTIONS[0].value,
    productPurchaseType: PURCHASE_TYPE_OPTIONS[0].value,
    productMainDescription: "",
    productSubDescription: "",
    productWeight: "",
    productMaterial: "",
    productSize: "",
    productMainImagePath: "",
    productMainImageName: "",
    productSubImagePath: "",
    productSubImageName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (type === "MAIN") setUploadingMain(true);
      if (type === "SUB") setUploadingSub(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${API}/admin/products/upload-image?type=${type}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("이미지 업로드 실패:", text);
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      const data = body?.data ?? body;

      if (!data?.productImagePath || !data?.productImageName) {
        throw new Error("이미지 업로드 응답 형식이 올바르지 않습니다.");
      }

      setForm((prev) => {
        if (type === "MAIN") {
          return {
            ...prev,
            productMainImagePath: data.productImagePath,
            productMainImageName: data.productImageName,
          };
        } else {
          return {
            ...prev,
            productSubImagePath: data.productImagePath,
            productSubImageName: data.productImageName,
          };
        }
      });

      openModal({
        title: "이미지 업로드",
        message:
          type === "MAIN"
            ? "대표 이미지가 업로드되었습니다."
            : "서브 이미지가 업로드되었습니다.",
        confirmText: "확인",
      });
    } catch (e) {
      console.error("[ProductCreateModal] 이미지 업로드 오류:", e);
      openModal({
        title: "오류",
        message: "이미지 업로드에 실패했습니다.",
        confirmText: "확인",
      });
    } finally {
      if (type === "MAIN") setUploadingMain(false);
      if (type === "SUB") setUploadingSub(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productName || !form.productPrice || !form.productStock) {
      openModal({
        title: "알림",
        message: "상품명, 가격, 재고는 필수입니다.",
        confirmText: "확인",
      });
      return;
    }

    try {
      setSubmitting(true);

      const product = {
        productName: form.productName,
        productPrice: Number(form.productPrice),
        productStock: Number(form.productStock),
        productCategory: form.productCategory,
        productType: form.productType,
        productPurchaseType: form.productPurchaseType,
        productMainDescription: form.productMainDescription,
        productSubDescription: form.productSubDescription,
        productWeight: form.productWeight,
        productMaterial: form.productMaterial,
        productSize: form.productSize,
      };

      const images = [];
      if (form.productMainImagePath && form.productMainImageName) {
        images.push({
          productImagePath: form.productMainImagePath,
          productImageName: form.productMainImageName,
          productImageType: "MAIN",
        });
      }
      if (form.productSubImagePath && form.productSubImageName) {
        images.push({
          productImagePath: form.productSubImagePath,
          productImageName: form.productSubImageName,
          productImageType: "SUB",
        });
      }

      const payload = {
        product,
        images,
      };

      const res = await fetch(`${API}/admin/products/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("상품 등록 실패:", text);
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      console.log("상품 등록 성공:", body);

      openModal({
        title: "완료",
        message: "상품이 등록되었습니다.",
        confirmText: "확인",
        onConfirm: () => {
          if (onCreated) onCreated();
          onClose();
        },
      });
    } catch (e) {
      console.error("[ProductCreateModal] 상품 등록 오류:", e);
      openModal({
        title: "오류",
        message: "상품 등록에 실패했습니다.",
        confirmText: "확인",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "24px 28px",
          width: "640px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          .product-modal-field {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 14px;
          }
          .product-modal-label {
            font-size: 13px;
            font-weight: 600;
            color: #333;
          }
          .product-modal-input,
          .product-modal-select,
          .product-modal-textarea {
            width: 100%;
            padding: 10px 12px;
            border-radius: 8px;
            border: 1px solid #E0E0E0;
            font-size: 13px;
            outline: none;
          }
          .product-modal-input::placeholder,
          .product-modal-textarea::placeholder {
            color: #BDBDBD;
          }
          .product-modal-input:focus,
          .product-modal-select:focus,
          .product-modal-textarea:focus {
            border-color: #0015FF;
            box-shadow: 0 0 0 1px rgba(0,21,255,0.08);
          }
          .product-modal-textarea {
            resize: vertical;
            min-height: 70px;
          }
          .product-modal-hint {
            font-size: 11px;
            color: #888;
          }
          .product-modal-upload-result {
            font-size: 11px;
            color: #4CAF50;
          }
        `}</style>

        <h2 style={{ fontSize: "20px", marginBottom: "4px" }}>상품 등록</h2>
        <p style={{ fontSize: "12px", color: "#777", marginBottom: "18px" }}>
          블루코튼 샵에 신규 상품을 등록합니다.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="product-modal-field">
            <label className="product-modal-label">상품명</label>
            <input
              className="product-modal-input"
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="상품명을 입력하세요"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">가격 (원)</label>
            <input
              className="product-modal-input"
              type="number"
              name="productPrice"
              value={form.productPrice}
              onChange={handleChange}
              placeholder="예) 12000"
              min="0"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">재고 (개)</label>
            <input
              className="product-modal-input"
              type="number"
              name="productStock"
              value={form.productStock}
              onChange={handleChange}
              placeholder="예) 100"
              min="0"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">카테고리</label>
            <select
              className="product-modal-select"
              name="productCategory"
              value={form.productCategory}
              onChange={handleChange}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">상품 타입</label>
            <select
              className="product-modal-select"
              name="productType"
              value={form.productType}
              onChange={handleChange}
            >
              {PRODUCT_TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">상품 구매 타입</label>
            <select
              className="product-modal-select"
              name="productPurchaseType"
              value={form.productPurchaseType}
              onChange={handleChange}
            >
              {PURCHASE_TYPE_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">무게</label>
            <input
              className="product-modal-input"
              type="text"
              name="productWeight"
              value={form.productWeight}
              onChange={handleChange}
              placeholder="예) 300g"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">소재</label>
            <input
              className="product-modal-input"
              type="text"
              name="productMaterial"
              value={form.productMaterial}
              onChange={handleChange}
              placeholder="예) Cotton 100%"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">사이즈</label>
            <input
              className="product-modal-input"
              type="text"
              name="productSize"
              value={form.productSize}
              onChange={handleChange}
              placeholder="예) 25cm"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">메인 설명</label>
            <textarea
              className="product-modal-textarea"
              name="productMainDescription"
              value={form.productMainDescription}
              onChange={handleChange}
              placeholder="상품의 주요 설명을 입력하세요"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">서브 설명</label>
            <textarea
              className="product-modal-textarea"
              name="productSubDescription"
              value={form.productSubDescription}
              onChange={handleChange}
              placeholder="추가 설명을 입력하세요"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">대표 이미지 (MAIN)</label>
            <input
              className="product-modal-input"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "MAIN")}
              disabled={uploadingMain}
            />
            <span className="product-modal-hint">
              C:\bluecotton\image\MAIN 쪽으로 저장되는 업로드 API에 연결됩니다.
            </span>
            {form.productMainImageName && (
              <span className="product-modal-upload-result">
                업로드됨: {form.productMainImageName}
              </span>
            )}
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">서브 이미지 (SUB)</label>
            <input
              className="product-modal-input"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "SUB")}
              disabled={uploadingSub}
            />
            <span className="product-modal-hint">
              C:\bluecotton\image\SUB 쪽으로 저장되는 업로드 API에 연결됩니다.
            </span>
            {form.productSubImageName && (
              <span className="product-modal-upload-result">
                업로드됨: {form.productSubImageName}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "18px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid #E0E0E0",
                backgroundColor: "#fff",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#0015FF",
                color: "#fff",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {submitting ? "등록 중..." : "상품 등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductEditModal = ({ product, onClose, onUpdated }) => {
  const [submitting, setSubmitting] = useState(false);
  const { openModal } = useModal();

  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productStock: "",
    productCategory: CATEGORY_OPTIONS[0].value,
    productType: PRODUCT_TYPE_OPTIONS[0].value,
    productPurchaseType: PURCHASE_TYPE_OPTIONS[0].value,
    productMainDescription: "",
    productSubDescription: "",
    productWeight: "",
    productMaterial: "",
    productSize: "",
  });

  useEffect(() => {
    if (!product) return;
    setForm({
      productName: product.productName || "",
      productPrice:
        product.productPrice !== undefined && product.productPrice !== null
          ? String(product.productPrice)
          : "",
      productStock:
        product.productStock !== undefined && product.productStock !== null
          ? String(product.productStock)
          : "",
      productCategory: product.productCategory || CATEGORY_OPTIONS[0].value,
      productType: product.productType || PRODUCT_TYPE_OPTIONS[0].value,
      productPurchaseType:
        product.productPurchaseType || PURCHASE_TYPE_OPTIONS[0].value,
      productMainDescription: product.productMainDescription || "",
      productSubDescription: product.productSubDescription || "",
      productWeight: product.productWeight || "",
      productMaterial: product.productMaterial || "",
      productSize: product.productSize || "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productName || !form.productPrice || !form.productStock) {
      openModal({
        title: "알림",
        message: "상품명, 가격, 재고는 필수입니다.",
        confirmText: "확인",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        productName: form.productName,
        productPrice: Number(form.productPrice),
        productStock: Number(form.productStock),
        productCategory: form.productCategory,
        productType: form.productType,
        productPurchaseType: form.productPurchaseType,
        productMainDescription: form.productMainDescription,
        productSubDescription: form.productSubDescription,
        productWeight: form.productWeight,
        productMaterial: form.productMaterial,
        productSize: form.productSize,
      };

      const res = await fetch(`${API}/admin/products/update/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("상품 수정 실패:", text);
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      console.log("상품 수정 성공:", body);

      openModal({
        title: "완료",
        message: "상품 정보가 수정되었습니다.",
        confirmText: "확인",
        onConfirm: () => {
          if (onUpdated) onUpdated();
          onClose();
        },
      });
    } catch (e) {
      console.error("[ProductEditModal] 상품 수정 오류:", e);
      openModal({
        title: "오류",
        message: "상품 수정에 실패했습니다.",
        confirmText: "확인",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "24px 28px",
          width: "640px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          .product-modal-field {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 14px;
          }
          .product-modal-label {
            font-size: 13px;
            font-weight: 600;
            color: #333;
          }
          .product-modal-input,
          .product-modal-select,
          .product-modal-textarea {
            width: 100%;
            padding: 10px 12px;
            border-radius: 8px;
            border: 1px solid #E0E0E0;
            font-size: 13px;
            outline: none;
          }
          .product-modal-input::placeholder,
          .product-modal-textarea::placeholder {
            color: #BDBDBD;
          }
          .product-modal-input:focus,
          .product-modal-select:focus,
          .product-modal-textarea:focus {
            border-color: #0015FF;
            box-shadow: 0 0 0 1px rgba(0,21,255,0.08);
          }
          .product-modal-textarea {
            resize: vertical;
            min-height: 70px;
          }
        `}</style>

        <h2 style={{ fontSize: "20px", marginBottom: "4px" }}>상품 수정</h2>
        <p style={{ fontSize: "12px", color: "#777", marginBottom: "18px" }}>
          선택한 상품의 정보를 수정합니다.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="product-modal-field">
            <label className="product-modal-label">상품명</label>
            <input
              className="product-modal-input"
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="상품명을 입력하세요"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">가격 (원)</label>
            <input
              className="product-modal-input"
              type="number"
              name="productPrice"
              value={form.productPrice}
              onChange={handleChange}
              placeholder="예) 12000"
              min="0"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">재고 (개)</label>
            <input
              className="product-modal-input"
              type="number"
              name="productStock"
              value={form.productStock}
              onChange={handleChange}
              placeholder="예) 100"
              min="0"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">카테고리</label>
            <select
              className="product-modal-select"
              name="productCategory"
              value={form.productCategory}
              onChange={handleChange}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">상품 타입</label>
            <select
              className="product-modal-select"
              name="productType"
              value={form.productType}
              onChange={handleChange}
            >
              {PRODUCT_TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">상품 구매 타입</label>
            <select
              className="product-modal-select"
              name="productPurchaseType"
              value={form.productPurchaseType}
              onChange={handleChange}
            >
              {PURCHASE_TYPE_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">무게</label>
            <input
              className="product-modal-input"
              type="text"
              name="productWeight"
              value={form.productWeight}
              onChange={handleChange}
              placeholder="예) 300g"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">소재</label>
            <input
              className="product-modal-input"
              type="text"
              name="productMaterial"
              value={form.productMaterial}
              onChange={handleChange}
              placeholder="예) Cotton 100%"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">사이즈</label>
            <input
              className="product-modal-input"
              type="text"
              name="productSize"
              value={form.productSize}
              onChange={handleChange}
              placeholder="예) 25cm"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">메인 설명</label>
            <textarea
              className="product-modal-textarea"
              name="productMainDescription"
              value={form.productMainDescription}
              onChange={handleChange}
              placeholder="상품의 주요 설명을 입력하세요"
            />
          </div>

          <div className="product-modal-field">
            <label className="product-modal-label">서브 설명</label>
            <textarea
              className="product-modal-textarea"
              name="productSubDescription"
              value={form.productSubDescription}
              onChange={handleChange}
              placeholder="추가 설명을 입력하세요"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "18px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid #E0E0E0",
                backgroundColor: "#fff",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#0015FF",
                color: "#fff",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {submitting ? "수정 중..." : "상품 수정"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OrderManagementContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState("all");
  const [reviewStatusFilter, setReviewStatusFilter] = useState("all");
  const [deliveryData, setDeliveryData] = useState([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [deliveryError, setDeliveryError] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);
  const [detailItems, setDetailItems] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const reviewReports = [
    {
      id: 1,
      reviewId: 101,
      orderId: 3,
      orderNumber: "ORD-000003",
      product: "블루코튼 캡",
      reviewContent: "부적절한 리뷰 내용입니다...",
      rating: 1,
      reportedUser: "user3",
      reporter: "user100",
      reason: "허위 리뷰",
      reportDate: "2024-12-10",
      status: "pending",
    },
    {
      id: 2,
      reviewId: 102,
      orderId: 2,
      orderNumber: "ORD-000002",
      product: "블루코튼 후드",
      reviewContent: "욕설이 포함된 리뷰",
      rating: 2,
      reportedUser: "user2",
      reporter: "user101",
      reason: "욕설/비방",
      reportDate: "2024-12-09",
      status: "pending",
    },
    {
      id: 3,
      reviewId: 103,
      orderId: 1,
      orderNumber: "ORD-000001",
      product: "블루코튼 티셔츠",
      reviewContent: "스팸 리뷰",
      rating: 5,
      reportedUser: "user1",
      reporter: "user102",
      reason: "스팸",
      reportDate: "2024-12-08",
      status: "resolved",
    },
  ];

  const formatDate = (value) => {
    if (!value) return "-";
    const str = String(value);
    if (str.length >= 10) return str.slice(0, 10);
    return str;
  };

  const toOrderStatusKey = (deliveryStatus) => {
    switch (deliveryStatus) {
      case "READY":
        return "pending";
      case "SHIPPING":
        return "shipped";
      case "COMPLETED":
        return "delivered";
      case "CANCELLED":
        return "cancelled";
      default:
        return "pending";
    }
  };

  const toDeliveryStatusKey = (deliveryStatus) => {
    switch (deliveryStatus) {
      case "READY":
        return "preparing";
      case "SHIPPING":
        return "shipped";
      case "COMPLETED":
        return "delivered";
      case "CANCELLED":
        return "cancelled";
      default:
        return "preparing";
    }
  };

  const safeTime = (value) => {
    if (!value || value === "-") return 0;
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? 0 : t;
  };

  const paginate = (list) => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return list.slice(indexOfFirst, indexOfLast);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    searchTerm,
    orderStatusFilter,
    deliveryStatusFilter,
    reviewStatusFilter,
    sortOrder,
  ]);

  const fetchDeliveries = async () => {
    try {
      setLoadingDeliveries(true);
      setDeliveryError(null);

      const res = await fetch(`${API}/admin/deliveries/lists`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Delivery list HTTP error:", res.status);
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      const list = body?.data || [];

      console.log("[OrderManagement] Delivery List:", list);
      setDeliveryData(list);
    } catch (e) {
      console.error("[OrderManagement] 배송/주문 목록 조회 실패:", e);
      setDeliveryError("배송/주문 목록을 불러오는 데 실패했습니다.");
      setDeliveryData([]);
    } finally {
      setLoadingDeliveries(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      setProductsError(null);

      const res = await fetch(`${API}/admin/products/list`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      const list = body?.data ?? body ?? [];

      setProducts(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("[OrderManagement] 상품 목록 조회 실패:", e);
      setProductsError("상품 목록을 불러오는 데 실패했습니다.");
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
    fetchProducts();
  }, []);

  const orders = useMemo(() => {
    return (deliveryData || []).map((d) => {
      const items = d.adminOrderItemDTOList || [];
      const quantity = items.reduce(
        (sum, item) => sum + (item.orderQuantity || 0),
        0
      );
      const productNames = items.map((item) => item.productName).join(", ");

      return {
        id: d.orderId,
        deliveryId: d.id,
        orderNumber: `ORD-${String(d.orderId).padStart(6, "0")}`,
        user: d.memberNickname,
        product: productNames || "-",
        quantity,
        total: d.paymentPrice ?? 0,
        status: toOrderStatusKey(d.deliveryStatus),
        orderDate: formatDate(d.paymentCreateAt),
      };
    });
  }, [deliveryData]);

  const deliveries = useMemo(() => {
    return (deliveryData || []).map((d) => {
      const items = d.adminOrderItemDTOList || [];
      const productNames = items.map((item) => item.productName).join(", ");

      return {
        id: d.id,
        orderId: d.orderId,
        orderNumber: `ORD-${String(d.orderId).padStart(6, "0")}`,
        user: d.memberNickname,
        product: productNames || "-",
        productPurchaseType: d.productPurchaseType,
        address: d.deliveryAddress,
        deliveryRequest: d.deliveryRequest,
        paymentDate: formatDate(d.paymentCreateAt),
        status: toDeliveryStatusKey(d.deliveryStatus),
      };
    });
  }, [deliveryData]);

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(term) ||
      order.user.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term);
    const matchesFilter =
      orderStatusFilter === "all" || order.status === orderStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredProducts = products.filter((product) =>
    (product.productName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredDeliveries = deliveries.filter((delivery) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      delivery.orderNumber.toLowerCase().includes(term) ||
      delivery.user.toLowerCase().includes(term) ||
      delivery.product.toLowerCase().includes(term) ||
      (delivery.productPurchaseType &&
        delivery.productPurchaseType.toLowerCase().includes(term)) ||
      (delivery.deliveryRequest &&
        delivery.deliveryRequest.toLowerCase().includes(term));
    const matchesFilter =
      deliveryStatusFilter === "all" ||
      delivery.status === deliveryStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredReviewReports = reviewReports.filter((report) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      report.orderNumber.toLowerCase().includes(term) ||
      report.product.toLowerCase().includes(term) ||
      report.reviewContent.toLowerCase().includes(term) ||
      report.reportedUser.toLowerCase().includes(term) ||
      report.reporter.toLowerCase().includes(term);
    const matchesFilter =
      reviewStatusFilter === "all" || report.status === reviewStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedOrders = useMemo(() => {
    const arr = [...filteredOrders];
    arr.sort((a, b) => {
      const diff = safeTime(a.orderDate) - safeTime(b.orderDate);
      return sortOrder === "asc" ? diff : -diff;
    });
    return arr;
  }, [filteredOrders, sortOrder]);

  const sortedDeliveries = useMemo(() => {
    const arr = [...filteredDeliveries];
    arr.sort((a, b) => {
      const diff = safeTime(a.paymentDate) - safeTime(b.paymentDate);
      return sortOrder === "asc" ? diff : -diff;
    });
    return arr;
  }, [filteredDeliveries, sortOrder]);

  const sortedReviewReports = useMemo(() => {
    const arr = [...filteredReviewReports];
    arr.sort((a, b) => {
      const diff = safeTime(a.reportDate) - safeTime(b.reportDate);
      return sortOrder === "asc" ? diff : -diff;
    });
    return arr;
  }, [filteredReviewReports, sortOrder]);

  const pageOrders = paginate(sortedOrders);
  const pageDeliveries = paginate(sortedDeliveries);
  const pageReviewReports = paginate(sortedReviewReports);

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #0015FF",
            backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff",
            cursor: currentPage === 1 ? "default" : "pointer",
            fontSize: "12px",
          }}
        >
          이전
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setCurrentPage(p)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              backgroundColor: currentPage === p ? "#726EF0" : "#fff",
              color: currentPage === p ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            backgroundColor:
              currentPage === totalPages ? "#f5f5f5" : "#fff",
            cursor: currentPage === totalPages ? "default" : "pointer",
            fontSize: "12px",
          }}
        >
          다음
        </button>
      </div>
    );
  };

  const changeDeliveryStatus = async (deliveryId, statusEnum) => {
    try {
      const url = new URL(`${API}/admin/deliveries/status/${deliveryId}`);
      url.searchParams.set("status", statusEnum);

      const res = await fetch(url.toString(), {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("changeDeliveryStatus HTTP error:", res.status);
        throw new Error(`HTTP ${res.status}`);
      }

      await fetchDeliveries();
    } catch (e) {
      console.error("배송 상태 변경 실패:", e);
      openModal({
        title: "오류",
        message: "배송 상태 변경에 실패했습니다.",
        confirmText: "확인",
      });
    }
  };

  const handleAddProduct = () => {
    setProductModalOpen(true);
  };

  const handleDeliveryStatusChange = (deliveryId, nextStatusEnum) => {
    changeDeliveryStatus(deliveryId, nextStatusEnum);
  };

  const handleReviewReportResolve = (reportId) => {
    console.log(`리뷰 신고 ${reportId} 처리 완료`);
  };

  const handleReviewDelete = (reviewId) => {
    console.log(`리뷰 ${reviewId} 삭제`);
  };

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleProductDelete = (productId) => {
    openModal({
      title: "상품 삭제",
      message: "정말 이 상품을 삭제하시겠습니까?",
      confirmText: "삭제",
      onConfirm: async () => {
        try {
          const res = await fetch(`${API}/admin/products/delete/${productId}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("상품 삭제 실패:", text);
            throw new Error(`HTTP ${res.status}`);
          }

          const body = await res.json();
          console.log("상품 삭제 성공:", body);

          await fetchProducts();

          openModal({
            title: "완료",
            message: "상품이 삭제되었습니다.",
            confirmText: "확인",
          });
        } catch (e) {
          console.error("[OrderManagement] 상품 삭제 오류:", e);
          openModal({
            title: "오류",
            message: "상품 삭제에 실패했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  const openOrderDetail = async (order) => {
    try {
      setDetailOpen(true);
      setDetailOrder(order);
      setDetailItems([]);
      setDetailError(null);
      setDetailLoading(true);

      const res = await fetch(
        `${API}/admin/deliveries/items/${order.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const body = await res.json();
      const items = body?.data ?? body ?? [];

      setDetailItems(Array.isArray(items) ? items : []);
    } catch (e) {
      console.error("[OrderManagement] 주문 상세 조회 실패:", e);
      setDetailError("주문 상품 목록을 불러오는 데 실패했습니다.");
      setDetailItems([]);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeOrderDetail = () => {
    setDetailOpen(false);
    setDetailOrder(null);
    setDetailItems([]);
    setDetailError(null);
  };

  const getItemPrice = (item) =>
    item.orderPrice ?? item.paymentPrice ?? item.productPrice ?? 0;

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate("/main/manager")}>
            ← 뒤로가기
          </S.BackButton>
          <S.Title>관리자 센터</S.Title>
          <S.Subtitle>
            {activeTab === "dashboard"
              ? "운영 현황 대시보드"
              : "주문 및 상품 관리"}
          </S.Subtitle>
        </S.Header>

        <S.TabContainer>
          <S.TabButton
            $active={activeTab === "dashboard"}
            onClick={() => {
              setActiveTab("dashboard");
              setSearchTerm("");
              setOrderStatusFilter("all");
              setDeliveryStatusFilter("all");
              setReviewStatusFilter("all");
            }}
          >
            대시보드
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "orders"}
            onClick={() => {
              setActiveTab("orders");
              setSearchTerm("");
              setOrderStatusFilter("all");
            }}
          >
            주문 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "deliveries"}
            onClick={() => {
              setActiveTab("deliveries");
              setSearchTerm("");
              setDeliveryStatusFilter("all");
            }}
          >
            배송 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "products"}
            onClick={() => {
              setActiveTab("products");
              setSearchTerm("");
            }}
          >
            상품 등록/관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "reviewReports"}
            onClick={() => {
              setActiveTab("reviewReports");
              setSearchTerm("");
              setReviewStatusFilter("all");
            }}
          >
            리뷰 신고
          </S.TabButton>
        </S.TabContainer>

        {activeTab === "dashboard" && (
          <DashboardContent orders={orders} products={products} />
        )}

        {(activeTab === "orders" || activeTab === "deliveries") && (
          <>
            {loadingDeliveries && (
              <S.EmptyState>주문/배송 데이터를 불러오는 중...</S.EmptyState>
            )}
            {deliveryError && <S.ErrorBox>{deliveryError}</S.ErrorBox>}
          </>
        )}

        {activeTab === "orders" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 사용자, 상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">준비중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
              </S.FilterSelect>
              <button
                type="button"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={{
                  marginLeft: "8px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {sortOrder === "asc" ? "오래된순" : "최신순"}
              </button>
            </S.FilterBar>

            {pageOrders.length === 0 &&
              !loadingDeliveries &&
              !deliveryError && (
                <S.EmptyState>표시할 주문이 없습니다.</S.EmptyState>
              )}

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>사용자</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>수량</S.TableHeaderCell>
                  <S.TableHeaderCell>총액</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>주문일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {pageOrders.map((order) => (
                  <S.TableRow key={`${order.id}-${order.deliveryId}`}>
                    <S.TableCell>{order.orderNumber}</S.TableCell>
                    <S.TableCell>{order.user}</S.TableCell>
                    <S.TableCell>{order.product}</S.TableCell>
                    <S.TableCell>{order.quantity}</S.TableCell>
                    <S.TableCell>
                      {order.total.toLocaleString()}원
                    </S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={order.status}>
                        {order.status === "pending"
                          ? "대기중"
                          : order.status === "shipped"
                          ? "배송중"
                          : order.status === "delivered"
                          ? "배송완료"
                          : "취소됨"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>{order.orderDate}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.SecondaryButton
                          onClick={() => openOrderDetail(order)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          상세
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>

            {renderPagination(sortedOrders.length)}
          </S.ContentSection>
        )}

        {activeTab === "deliveries" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 사용자, 상품명, 구매 타입, 요청사항으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={deliveryStatusFilter}
                onChange={(e) => setDeliveryStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="preparing">준비중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
              </S.FilterSelect>
              <button
                type="button"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={{
                  marginLeft: "8px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {sortOrder === "asc" ? "오래된순" : "최신순"}
              </button>
            </S.FilterBar>

            {pageDeliveries.length === 0 &&
              !loadingDeliveries &&
              !deliveryError && (
                <S.EmptyState>표시할 배송 정보가 없습니다.</S.EmptyState>
              )}

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>배송 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>사용자</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>상품 구매 타입</S.TableHeaderCell>
                  <S.TableHeaderCell>배송 주소</S.TableHeaderCell>
                  <S.TableHeaderCell>배송 요청사항</S.TableHeaderCell>
                  <S.TableHeaderCell>결제일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {pageDeliveries.map((delivery) => (
                  <S.TableRow key={delivery.id}>
                    <S.TableCell>{delivery.id}</S.TableCell>
                    <S.TableCell>{delivery.orderNumber}</S.TableCell>
                    <S.TableCell>{delivery.user}</S.TableCell>
                    <S.TableCell>{delivery.product}</S.TableCell>
                    <S.TableCell>
                      {delivery.productPurchaseType || "-"}
                    </S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {delivery.address}
                    </S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {delivery.deliveryRequest || "-"}
                    </S.TableCell>
                    <S.TableCell>{delivery.paymentDate || "-"}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={delivery.status}>
                        {delivery.status === "preparing"
                          ? "준비중"
                          : delivery.status === "shipped"
                          ? "배송중"
                          : delivery.status === "delivered"
                          ? "배송완료"
                          : "취소됨"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        {delivery.status === "preparing" && (
                          <S.Button
                            onClick={() =>
                              handleDeliveryStatusChange(
                                delivery.id,
                                "SHIPPING"
                              )
                            }
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            배송시작
                          </S.Button>
                        )}
                        {delivery.status === "shipped" && (
                          <S.Button
                            onClick={() =>
                              handleDeliveryStatusChange(
                                delivery.id,
                                "COMPLETED"
                              )
                            }
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            배송완료
                          </S.Button>
                        )}
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>

            {renderPagination(sortedDeliveries.length)}
          </S.ContentSection>
        )}

        {activeTab === "products" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.Button
                onClick={handleAddProduct}
                style={{ marginLeft: "12px", marginTop: "15px" }}
              >
                + 상품 등록
              </S.Button>
            </S.FilterBar>

            {loadingProducts && (
              <S.EmptyState>상품 목록을 불러오는 중...</S.EmptyState>
            )}
            {productsError && <S.ErrorBox>{productsError}</S.ErrorBox>}
            {!loadingProducts &&
              !productsError &&
              filteredProducts.length === 0 && (
                <S.EmptyState>표시할 상품이 없습니다.</S.EmptyState>
              )}

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>ID</S.TableHeaderCell>
                  <S.TableHeaderCell>상품명</S.TableHeaderCell>
                  <S.TableHeaderCell>가격</S.TableHeaderCell>
                  <S.TableHeaderCell>재고</S.TableHeaderCell>
                  <S.TableHeaderCell>카테고리</S.TableHeaderCell>
                  <S.TableHeaderCell>구매 타입</S.TableHeaderCell>
                  <S.TableHeaderCell>상품 타입</S.TableHeaderCell>
                  <S.TableHeaderCell>사이즈</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredProducts.map((product) => (
                  <S.TableRow key={product.id}>
                    <S.TableCell>{product.id}</S.TableCell>
                    <S.TableCell>{product.productName}</S.TableCell>
                    <S.TableCell>
                      {product.productPrice?.toLocaleString()}원
                    </S.TableCell>
                    <S.TableCell>{product.productStock}개</S.TableCell>
                    <S.TableCell>{product.productCategory}</S.TableCell>
                    <S.TableCell>{product.productPurchaseType}</S.TableCell>
                    <S.TableCell>{product.productType}</S.TableCell>
                    <S.TableCell>{product.productSize || "-"}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() => handleProductEdit(product)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          수정
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleProductDelete(product.id)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {activeTab === "reviewReports" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 상품명, 리뷰 내용, 신고자, 피신고자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={reviewStatusFilter}
                onChange={(e) => setReviewStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
              <button
                type="button"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={{
                  marginLeft: "8px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {sortOrder === "asc" ? "오래된순" : "최신순"}
              </button>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>리뷰 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>리뷰 내용</S.TableHeaderCell>
                  <S.TableHeaderCell>평점</S.TableHeaderCell>
                  <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                  <S.TableHeaderCell>신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {pageReviewReports.map((report) => (
                  <S.TableRow key={report.id}>
                    <S.TableCell>{report.id}</S.TableCell>
                    <S.TableCell>{report.reviewId}</S.TableCell>
                    <S.TableCell>{report.orderNumber}</S.TableCell>
                    <S.TableCell>{report.product}</S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {report.reviewContent}
                    </S.TableCell>
                    <S.TableCell>{"⭐".repeat(report.rating)}</S.TableCell>
                    <S.TableCell>{report.reportedUser}</S.TableCell>
                    <S.TableCell>{report.reporter}</S.TableCell>
                    <S.TableCell>{report.reason}</S.TableCell>
                    <S.TableCell>{report.reportDate}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        {report.status === "pending" ? "대기중" : "처리완료"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() => handleReviewReportResolve(report.id)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                          disabled={report.status === "resolved"}
                        >
                          처리
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleReviewDelete(report.reviewId)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>

            {renderPagination(sortedReviewReports.length)}
          </S.ContentSection>
        )}

        {detailOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={closeOrderDetail}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                width: "600px",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: "8px", fontSize: "20px" }}>
                주문 상세
              </h3>
              {detailOrder && (
                <p style={{ marginBottom: "12px", color: "#666" }}>
                  주문번호: <b>{detailOrder.orderNumber}</b> / 사용자:{" "}
                  <b>{detailOrder.user}</b>
                </p>
              )}

              {detailLoading && (
                <S.EmptyState>주문 상품을 불러오는 중...</S.EmptyState>
              )}
              {detailError && <S.ErrorBox>{detailError}</S.ErrorBox>}

              {!detailLoading && !detailError && detailItems.length === 0 && (
                <S.EmptyState>주문 상품이 없습니다.</S.EmptyState>
              )}

              {!detailLoading && !detailError && detailItems.length > 0 && (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "8px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #eee",
                          padding: "8px 4px",
                        }}
                      >
                        상품명
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          borderBottom: "1px solid #eee",
                          padding: "8px 4px",
                        }}
                      >
                        수량
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          borderBottom: "1px solid #eee",
                          padding: "8px 4px",
                        }}
                      >
                        금액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailItems.map((item) => (
                      <tr
                        key={item.id ?? `${item.productId}-${item.orderId}`}
                      >
                        <td
                          style={{
                            padding: "8px 4px",
                            borderBottom: "1px solid #f5f5f5",
                          }}
                        >
                          {item.productName ?? "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px 4px",
                            textAlign: "right",
                            borderBottom: "1px solid #f5f5f5",
                          }}
                        >
                          {item.orderQuantity ?? 0}
                        </td>
                        <td
                          style={{
                            padding: "8px 4px",
                            textAlign: "right",
                            borderBottom: "1px solid #f5f5f5",
                          }}
                        >
                          {fmt(getItemPrice(item))}원
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <button
                  onClick={closeOrderDetail}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0015FF",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {productModalOpen && (
          <ProductCreateModal
            onClose={() => setProductModalOpen(false)}
            onCreated={fetchProducts}
          />
        )}

        {editModalOpen && selectedProduct && (
          <ProductEditModal
            product={selectedProduct}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedProduct(null);
            }}
            onUpdated={fetchProducts}
          />
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default OrderManagementContainer;
