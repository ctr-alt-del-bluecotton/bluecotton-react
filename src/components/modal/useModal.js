import { createContext, useContext, useState, useCallback } from "react";
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(null);

  const openModal = useCallback((options) => {
    setModalState({
      ...options,
      isOpen: true,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(null);
  }, []);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
