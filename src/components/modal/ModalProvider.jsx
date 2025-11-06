import React, { createContext, useState } from "react";
import ConfirmModal from "./ConfirmModal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(null);

  const openModal = (props) => {
    setModalState({
      ...props,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalState }}>
      {children}
      <ConfirmModal />
    </ModalContext.Provider>
  );
};
