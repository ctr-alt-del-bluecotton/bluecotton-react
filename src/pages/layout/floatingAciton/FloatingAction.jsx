import React, { useState } from 'react';
import S from './style';
import FloatingButton from './floatingButton/FloatingButton';


const FloatingAction = () => {
    const [isFloatingSelect, setIsFloatingSelect] = useState(false);
    return (
        <S.floatingActionContainer>
            <S.floatingActionMenuWrap>

            </S.floatingActionMenuWrap>
            <FloatingButton isFloatingSelect={isFloatingSelect} setIsFloatingSelect={setIsFloatingSelect}/>
        </S.floatingActionContainer>
    );
};

export default FloatingAction;