import React, { useState } from 'react';
import S from './style';
import FloatingButton from './floatingButton/FloatingButton';
import FloatingMenu from './floatingMenu/FloatingMenu';


const FloatingAction = () => {
    const [isFloatingSelect, setIsFloatingSelect] = useState(false);
    const [isDisplayFloatingMenu, setIsDisplayFloatingMenu] = useState(false);
    const [isHoverButtons, setIsHoverButtons] = useState([false, false, false])

    return (
        <S.floatingActionContainer>
            <S.floatingActionMenuWrap isDisplayFloatingMenu={isDisplayFloatingMenu}>
                <FloatingMenu 
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
                setIsDisplayFloatingMenu={setIsDisplayFloatingMenu}/>
        </S.floatingActionContainer>
    );
};

export default FloatingAction;