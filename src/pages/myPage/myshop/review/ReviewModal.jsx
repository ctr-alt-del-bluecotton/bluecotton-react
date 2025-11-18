import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import { useSelector } from "react-redux";

const ReviewModal = ({
  open,
  onClose,
  product = {
    id: 1,
    name: "솜이 인형",
    imageUrl: "/assets/images/shop_review_som_doll1.png",
  },
  mode = "create", // 'create' | 'edit'
  initial = null,  // 수정 시 기존 리뷰 데이터
  onSubmit,
}) => {
  const [imagePath, setImagePath] = useState("");
  const [imageName, setImageName] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const memberId = currentUser?.id;

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);



  useEffect(() => {


    if (mode === "edit" && initial) {
      setRating(initial.rating ?? 0);
      setContent(initial.content ?? "");
      setFiles(initial.files ?? []);
    } else if (mode === "create") {
      setRating(5);
      setContent("");
      setFiles([]);
      setImagePath("");
      setImageName("");
    }
  }, [open, mode, initial]);

  if (!open) return null;

  // 이미지 서버 업로드
  const uploadImageToServer = async (file, folder = "shop") => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formData = new FormData();
    const folderPath = `${folder}/${year}/${month}/${day}`;
    formData.append("file", file);
    formData.append("folder", folderPath);

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/file/upload-image`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("이미지 업로드 실패");

    return await res.json();
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const onChangeFiles = async (e) => {
    const picked = Array.from(e.target.files || []);
    const next = [...files, ...picked].slice(0, 5);

    if (picked.length === 0) return;

    try {
      const result = await uploadImageToServer(picked[0], "shop_review");
      const data = result?.data ?? result;

      let ip = "";
      let iname = "";

      if (data && data.imagePath) ip = data.imagePath;
      else if (data && data.path) ip = data.path;

      if (data && data.imageName) iname = data.imageName;
      else if (data && data.name) iname = data.name;

      // url만 내려오는 경우 처리
      if ((!ip || !iname) && data && data.url) {
        const parts = data.url.split("/");
        iname = parts[parts.length - 1];
        parts.pop();
        ip = parts.join("/") + "/";
      }

      setImagePath(ip);
      setImageName(iname);
      setFiles(next);
    } finally {
      e.target.value = "";
    }
  };

  const labelText = [
    "",
    "별로예요",
    "그저 그래요",
    "보통이에요",
    "좋아요!",
    "최고예요!",
  ][rating];

  const primaryText = mode === "edit" ? "수정하기" : "등록";
  const titleText = mode === "edit" ? "리뷰 수정" : "리뷰 작성";

  const handleSubmit = () => {
    const payload = {
      memberId,
      productId: product.id,
      rating,
      content,
      imagePath,
      imageName,
    };

    // 신규 작성
    if (mode === "create") {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );
    }

    else {
      const reviewId = initial?.id; 

      if (!reviewId) {
        console.error("[ReviewModal] reviewId 없음", initial);
        return;
      }

      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/review/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );
    }


    onSubmit?.({ productId: product.id, rating, content, files });
    onClose?.();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Dialog onClick={(e) => e.stopPropagation()}>
        <S.Inner>
          <S.Title>{titleText}</S.Title>

          <S.CloseIconButton onClick={onClose}>
            <img src="/assets/icons/close.svg" alt="닫기" />
          </S.CloseIconButton>

          <S.ProductInfoBox>
            <S.ProductThumb src={product.imageUrl} alt={product.name} />
            <S.ProductName>{product.name}</S.ProductName>
          </S.ProductInfoBox>

          <S.Question>상품은 만족하셨나요?</S.Question>

          <S.StarRow>
            {[1, 2, 3, 4, 5].map((n) => (
              <S.StarImg
                key={n}
                src="/assets/icons/review.svg"
                alt={`${n}점`}
                onClick={() => setRating(n)}
                $active={n <= rating}
              />
            ))}
          </S.StarRow>

          <S.StarLabel>{labelText}</S.StarLabel>

          <S.FileBox>
            <S.FileText>
              {files.length === 0
                ? "선택한 파일이 없습니다"
                : files.map((f) => f.name || "이미지").join(", ")}
            </S.FileText>
            <S.FileButton type="button" onClick={openFilePicker}>
              + 이미지 추가
            </S.FileButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onChangeFiles}
            />
          </S.FileBox>

          <S.FileHint>※최대 5장의 이미지를 첨부할 수 있어요.</S.FileHint>

          <S.TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="리뷰를 작성해 주세요"
            maxLength={300}
          />
          <S.Counter>{content.length}/300</S.Counter>
        </S.Inner>

        <S.ButtonRow>
          <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
          <S.PrimaryButton onClick={handleSubmit}>
            {primaryText}
          </S.PrimaryButton>
        </S.ButtonRow>
      </S.Dialog>
    </S.Overlay>
  );
};

export default ReviewModal;
