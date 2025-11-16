import React, { useState } from 'react';
import S from './style';
import { ChattingProvider, useChatting } from '../../../../../../../context/ChattingContext';
import FloatingChattingContent from './floatingChattingCotent/FloatingChattingContent';



const FloatingChattingListContainer = () => {
    
    const { joinRooms, setChattingMenu } = useChatting();
    const [ isLoding, setIsLoding ] = useState(false);
    
    useState(() => {
        if(joinRooms?.length == 0) {
            setIsLoding(true)
        }
    },[isLoding, joinRooms])

    return (
        <S.chattingListWrap>
            { joinRooms?.map((content, i) => (
                    <FloatingChattingContent key={i} content={content} setChattingMenu={setChattingMenu} />
                ))
            }
        </S.chattingListWrap>
    );
};

const FloatingChattingList = () => {
    return (
            <FloatingChattingListContainer />
    )
}

export default FloatingChattingList;