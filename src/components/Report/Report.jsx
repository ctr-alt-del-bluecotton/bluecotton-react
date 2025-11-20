import React, { useState } from "react";
import S from "./style";
import { useModal } from "../../components/modal";
import { useSelector } from "react-redux";

/*
 props:
 - target: { type: 'comment'|'reply', id: number } 이런 식으로 어떤 걸 신고 중인지
 - onClose: 신고 모달 닫기(setShowReportModal(false) 같은거)
*/

const Report = ({ target, onClose }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customText, setCustomText] = useState("");
  const { openModal } = useModal(); // 전역 확인 모달
  const { currentUser } = useSelector((state) => state.user); 
  const memberId = currentUser.id;                          

  // 등록 버튼 눌렀을 때
  const handleSubmit = async () => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem("accessToken");

    const finalReason =
      selectedReason === "기타" ? customText.trim() : selectedReason;

    if (!finalReason) {
      return openModal({
        title: "신고 사유를 작성해주세요.",
        confirmText: "확인",
      });
    }

    let url = "";
    let body = {};

    /** 신고 타입에 따라 fetch URL, body 자동 변경 */
    if (target.type === "post") {
      url = `${BASE_URL}/private/post/report/post`;
      body = {
        postReportContent: finalReason,
        postId: target.id,
      };
    } else if (target.type === "comment") {
      url = `${BASE_URL}/private/post/report/comment`;
      body = {
        postCommentReportContent: finalReason,
        postCommentId: target.id,
      };
    } else if (target.type === "reply") {
      url = `${BASE_URL}/private/post/report/reply`;
      body = {
        postReplyReportContent: finalReason,
        postReplyId: target.id,
      };
    }  else if (target.type === "shopComment") {
      url = `${BASE_URL}/private/shop/read/review/report`;
      body = {
        productReviewReportContent: finalReason, 
        memberId,              
        productReviewId: target.id,  
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.status === 409) {
        const errData = await response.json();
        return openModal({
          title: "이미 신고한 항목입니다",
          message: errData?.message,
          confirmText: "확인",
        });
      }      

      if (!response.ok) throw new Error("신고 실패");

      openModal({
        title: "신고가 접수되었습니다.",
        message: "관리자가 확인 후 조치할 예정입니다.",
        confirmText: "확인",
        onConfirm: () => onClose(),
      });
    } catch (err) {
      console.error(err);
      openModal({
        title: "오류",
        message: "신고 처리 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  return (
    <S.Backdrop
      onClick={() => {
        onClose();
      }}
    >
      <S.Container
        onClick={(e) => {
          e.stopPropagation(); // 모달 안쪽 클릭 시 닫히지 않게
        }}
      >
        {/* 헤더 */}
        <S.Header>
          <h2>신고하기</h2>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.Header>

        {/* 라디오 목록 */}
        <S.Body>
          {/* 영리목적 / 홍보성 */}
          <S.RadioRow>
            <input
              type="radio"
              name="reportReason"
              value="영리목적 / 홍보성"
              checked={selectedReason === "영리목적 / 홍보성"}
              onChange={(e) => setSelectedReason(e.target.value)}
            />
            <span>영리목적 / 홍보성</span>
          </S.RadioRow>

          {/* 개인정보 노출 */}
          <S.RadioRow>
            <input
              type="radio"
              name="reportReason"
              value="개인정보 노출"
              checked={selectedReason === "개인정보 노출"}
              onChange={(e) => setSelectedReason(e.target.value)}
            />
            <span>개인정보 노출</span>
          </S.RadioRow>

          {/* 욕설 / 인신공격 */}
          <S.RadioRow>
            <input
              type="radio"
              name="reportReason"
              value="욕설 / 인신공격"
              checked={selectedReason === "욕설 / 인신공격"}
              onChange={(e) => setSelectedReason(e.target.value)}
            />
            <span>욕설 / 인신공격</span>
          </S.RadioRow>

          {/* 같은 내용 도배 */}
          <S.RadioRow>
            <input
              type="radio"
              name="reportReason"
              value="같은 내용 도배"
              checked={selectedReason === "같은 내용 도배"}
              onChange={(e) => setSelectedReason(e.target.value)}
            />
            <span>같은 내용 도배</span>
          </S.RadioRow>

          {/* 기타 */}
          <S.OtherBlock>
            <S.OtherHeaderRow
              onClick={() => {
                setSelectedReason("기타");
              }}
            >
              <input
                type="radio"
                name="reportReason"
                value="기타"
                checked={selectedReason === "기타"}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <span className="label-text">기타</span>
            </S.OtherHeaderRow>

            {selectedReason === "기타" && (
              <S.OtherContent>
                <S.TextareaWrap>
                  <S.Textarea
                    placeholder="ex) 부적절한 닉네임"
                    maxLength={300}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                  />
                  <S.Count>{customText.length}/300</S.Count>
                </S.TextareaWrap>
              </S.OtherContent>
            )}
          </S.OtherBlock>
        </S.Body>

        {/* 하단 버튼 */}
        <S.Footer>
          <S.Button className="cancel" onClick={onClose}>
            닫기
          </S.Button>
          <S.Button className="submit" onClick={handleSubmit}>
            등록
          </S.Button>
        </S.Footer>
      </S.Container>
    </S.Backdrop>
  );
};

export default Report;
