import React, { useState } from "react";
import S from "./style";
import { useModal } from "../../components/modal";

/*
 props:
 - target: { type: 'comment'|'reply', id: number } 이런 식으로 어떤 걸 신고 중인지
 - onClose: 신고 모달 닫기(setShowReportModal(false) 같은거)
*/

const Report = ({ target, onClose }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customText, setCustomText] = useState("");
  const { openModal } = useModal(); // 전역 확인 모달

  // 등록 버튼 눌렀을 때
  const handleSubmit = () => {
    const finalReason =
      selectedReason === "기타" ? customText.trim() : selectedReason;

    // 아무 것도 안 적었을 때
    if (!finalReason) {
      openModal({
        title: "신고 사유를 작성해주세요.",
        confirmText: "확인",
        onConfirm: () => {},
      });
      return;
    }

    // 실제 서버 신고 API 자리 (지금은 console.log)
    console.log("🚨 신고 전송됨", {
      target,
      reason: finalReason,
    });

    // 신고 완료 안내 모달 (확인 1개짜리)
    openModal({
      title: "신고가 접수되었습니다.",
      message: "관리자가 확인 후 필요한 조치를 취할 예정입니다.",
      confirmText: "확인",
      onConfirm: () => {
        // 확인 누르면 신고 모달 닫힘
        onClose();
      },
    });
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
