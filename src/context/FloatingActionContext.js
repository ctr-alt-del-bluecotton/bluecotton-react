import React, { createContext, useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchData, options } from './FetchContext';
import { useSelector } from 'react-redux';

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
    const [uploadImageTempIds, setUploadImageTempIds] = useState([]);
    const formMethods = useForm({ mode: "onChange" });
    const [isAllError, setIsAllError] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const { currentUser, isLogin } = useSelector((state) => state.user);
    
    useEffect(() => {
        console.log(uploadImageTempIds)
    }, [uploadImageTempIds])

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

    const uploadImageToServer = async (file, folder = 'som') => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        
        // ✅ 폴더 구조: som/2025/11/10
        const formData = new FormData();
        const folderPath = `${folder}/${year}/${month}/${day}`;
        formData.append('file', file);
        formData.append('folder', folderPath); // Blob 제거
        
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/file/upload-image`, {
            method: 'POST',
            body: formData,
        });
        
        if (!res.ok) throw new Error('이미지 업로드 실패');
        
        return await res.json();
    }

    const insertImageData = async (url = '') => {
        const imageData = {
            somImagePath: url,
            somImageName: url.split("/").reverse()[0]
        }
        const res = await fetchData(`som-image/insert`,
            options.postOption(imageData)
        )

        const resJson = await res.json();

        console.log(resJson);

        setUploadImageTempIds((prev) => [...prev, resJson.data.id])

        return resJson;
    }

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
        isReset, setIsReset,
        currentUser,
        setSomMenuContent,
        open,
        setOpen,
        isLogin,
        selected,
        setSelected,
        formData,
        insertImageData,
        setFormData,
        ...formMethods,
        somMenuSelect,
        somType, setSomType,
        isAllError, setIsAllError,
        uploadImageToServer,
        uploadImageTempIds, setUploadImageTempIds
    };

    return (
        <FloatingActionContext.Provider value={value}>
            {children}
        </FloatingActionContext.Provider>
    );
};

export default FloatingActionContext;
