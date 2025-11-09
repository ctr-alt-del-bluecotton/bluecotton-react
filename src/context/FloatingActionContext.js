import React, { createContext, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

const FloatingActionContext = createContext();

export const useFloatingAction = () => useContext(FloatingActionContext);

export const FloatingActionProvider = ({ children }) => {
    const [isFloatingSelect, setIsFloatingSelect] = useState(false);
    const [isDisplayFloatingMenu, setIsDisplayFloatingMenu] = useState(false);
    const [isHoverButtons, setIsHoverButtons] = useState([false, false, false]);
    const [somMenuPage, setSomMenuPage] = useState(0);
    const [somMenuContent, setSomMenuContent] = useState("somWrite");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [formData, setFormData] = useState("");
    const [somType, setSomType] = useState({
        solo : true,
        party: false
    });
    const formMethods = useForm({ mode: "onChange" });
    const [isAllError, setIsAllError] = useState(false);
    
    const somMenuSelect = (contentName) => {
        if (isDisplayFloatingMenu === false) {
            setIsDisplayFloatingMenu(true);
            if (contentName !== somMenuContent) {
                setSomMenuContent(contentName);
            }
        } else {
            if (contentName !== somMenuContent) {
                setSomMenuContent(contentName);
            } else {
                setIsDisplayFloatingMenu(false);
            }
        }
    };


    const value = {
        isFloatingSelect,
        setIsFloatingSelect,
        isDisplayFloatingMenu,
        setIsDisplayFloatingMenu,
        isHoverButtons,
        setIsHoverButtons,
        somMenuPage,
        setSomMenuPage,
        somMenuContent,
        setSomMenuContent,
        open,
        setOpen,
        selected,
        setSelected,
        formData,
        setFormData,
        ...formMethods,
        somMenuSelect,
        somType, setSomType,
        isAllError, setIsAllError
    };

    return (
        <FloatingActionContext.Provider value={value}>
            {children}
        </FloatingActionContext.Provider>
    );
};

export default FloatingActionContext;
