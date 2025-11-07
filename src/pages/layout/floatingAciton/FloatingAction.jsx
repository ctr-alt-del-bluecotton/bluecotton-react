import React from 'react';
import S from './style';
import FloatingButton from './floatingButton/FloatingButton';
import FloatingMenu from './floatingMenu/FloatingMenu';
import { FloatingActionProvider, useFloatingAction } from '../../../context/FloatingActionContext';

const FloatingActionContent = () => {
    const { isDisplayFloatingMenu } = useFloatingAction();
    
    return (
        <S.floatingActionContainer>
            <S.floatingActionMenuWrap isDisplayFloatingMenu={isDisplayFloatingMenu}>
                <FloatingMenu />
            </S.floatingActionMenuWrap>
            <FloatingButton />
        </S.floatingActionContainer>
    );
}

const FloatingAction = () => {
    return (
        <FloatingActionProvider>
            <FloatingActionContent />
        </FloatingActionProvider>
    );
};

export default FloatingAction;