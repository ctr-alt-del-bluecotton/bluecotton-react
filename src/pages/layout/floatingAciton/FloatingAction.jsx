import React, { useState } from 'react';
import S from './style';
import FloatingButton from './floatingButton/FloatingButton';
import FloatingMenu from './floatingMenu/FloatingMenu';


const FloatingAction = () => {
    const [isFloatingSelect, setIsFloatingSelect] = useState(false);
    const [isDisplayFloatingMenu, setIsDisplayFloatingMenu] = useState(false);
    const [isHoverButtons, setIsHoverButtons] = useState([false, false, false])
    const [somMenuPage, setSomMenuPage] = useState(0);
    const [somMenuContent, setSomMenuContent] = useState("somWrite");

    const contentList = ["chatBot", "chatting", "somWrite"]

    const somMenuSelect = (contentName) => {
        
        if(isDisplayFloatingMenu == false) {
            setIsDisplayFloatingMenu(true);
            if (contentName != somMenuContent) {
                setSomMenuContent(contentName)
            }
        } else {
            if (contentName != somMenuContent) {
                setSomMenuContent(contentName)
            } else {
                setIsDisplayFloatingMenu(false)
            }
        }
        
    }

    return (
        <S.floatingActionContainer>
            <S.floatingActionMenuWrap isDisplayFloatingMenu={isDisplayFloatingMenu}>
                <FloatingMenu 
                somMenuPage={somMenuPage}
                setSomMenuPage={setSomMenuPage}
                somMenuContent={somMenuContent}
                setSomMenuContent={setSomMenuContent}
                isDisplayFloatingMenu={isDisplayFloatingMenu} 
                setIsDisplayFloatingMenu={setIsDisplayFloatingMenu}
                />
            </S.floatingActionMenuWrap>
            <FloatingButton 
                isFloatingSelect={isFloatingSelect} 
                setIsFloatingSelect={setIsFloatingSelect}
                isHoverButtons={isHoverButtons} 
                setIsHoverButtons={setIsHoverButtons}
                isDisplayFloatingMenu={isDisplayFloatingMenu} 
                setIsDisplayFloatingMenu={setIsDisplayFloatingMenu}
                somMenuContent={somMenuContent}
                setSomMenuContent={setSomMenuContent}
                somMenuSelect={somMenuSelect}
                />
        </S.floatingActionContainer>
    );
};

export default FloatingAction;