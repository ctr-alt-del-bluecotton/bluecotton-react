import React from 'react';
import S from './style';
import FloatingButton from './floatingButton/FloatingButton';


const FloatingAction = () => {
    return (
        <S.floatingActionContainer>
            <S.floatingActionMenuWrap>

            </S.floatingActionMenuWrap>
            <FloatingButton />
        </S.floatingActionContainer>
    );
};

export default FloatingAction;