import React from "react";
import ReactDOM from "react-dom";
import S from "./style";
import { useModal } from "./useModal";

const ConfirmModal = () => {
  const { modalState, closeModal } = useModal();

  if (!modalState?.isOpen) return null;

  const handleConfirm = () => {
    modalState.onConfirm?.();
    closeModal();
  };

  const handleCancel = () => {
    modalState.onCancel?.();
    closeModal();
  };

  return ReactDOM.createPortal(
    <S.ModalBackdrop>
      <S.ModalBox>
        {modalState.title && <h3>{modalState.title}</h3>}
        {modalState.message && <p>{modalState.message}</p>}

        <div className="button-row">
          {modalState.cancelText && (
            <button className="cancel" onClick={handleCancel}>
              {modalState.cancelText}
            </button>
          )}
          <button className="confirm" onClick={handleConfirm}>
            {modalState.confirmText || "확인"}
          </button>
        </div>
      </S.ModalBox>
    </S.ModalBackdrop>,
    document.body
  );
};

export default ConfirmModal;
