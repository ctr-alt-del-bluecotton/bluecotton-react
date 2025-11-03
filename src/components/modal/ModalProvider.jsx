import React, { createContext, useState } from "react";
import ConfirmModal from "./ConfirmModal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState(null);

  const openModal = (props) => setModalProps(props);
  const closeModal = () => setModalProps(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalProps && <ConfirmModal {...modalProps} onClose={closeModal} />}
    </ModalContext.Provider>
  );
};
