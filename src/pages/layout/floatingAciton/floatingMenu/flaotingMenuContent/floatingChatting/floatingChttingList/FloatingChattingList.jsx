import React, { useEffect, useState } from 'react';
import S from './style';
import { useChatting } from '../../../../../../../context/ChattingContext';
import FloatingChattingContent from './floatingChattingCotent/FloatingChattingContent';



const FloatingChattingListContainer = () => {
    
    const { joinRooms, setChattingMenu, exitRoom, exitRoomModal } = useChatting();
    const [ isLoding, setIsLoding ] = useState(false);
    
    useEffect(() => {
        if(joinRooms?.length === 0) {
            setIsLoding(true)
        }
    },[isLoding, joinRooms])

    return (
        <S.chattingListWrap>
            { 
                joinRooms?.map((content, i) => (
                    <FloatingChattingContent key={i} content={content} setChattingMenu={setChattingMenu} exitRoom={exitRoom} exitRoomModal={exitRoomModal} />
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