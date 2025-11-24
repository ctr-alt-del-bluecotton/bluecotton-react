import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData, options } from "./FetchContext";
import { useModal } from "../components/modal";

const ChattingContext = createContext();

export const useChatting = () => useContext(ChattingContext);

export const ChattingProvider = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    const { openModal } = useModal();
    const memberId =  currentUser.id;
    const memberName = currentUser.memberName;

    const [joinRooms, setJoinRooms] = useState([]);
    const [chattingMenu, setChattingMenu] = useState({
        menu: "list",
        chatId: 0
    });

    const exitRoomModal = (id) => {
        openModal({
            title: "채팅방에서 퇴장합니다.",
            message: `퇴장하시겠습니까?`,
            cancelText: "취소",
            confirmText: "퇴장하기",
            onConfirm: () => { exitRoom(id) }
        });

        window.dispatchEvent(new CustomEvent("openExitRoomModal"));
    };
    const exitRoom = useCallback(async (id) => {
        await fetchData(`chat/delete-user`, options.deleteOption({
            memberEmail: currentUser.memberEmail,
            chatId: id
        })).then(async(res) => {
            const json = await res.json();
            window.dispatchEvent(new CustomEvent("refreshChatList"));
            return json;
        })
        
    },[currentUser.memberEmail])

    const getRooms = useCallback(async () => {
        const res = await fetchData(`chat/get-join-rooms/${memberId}`)
        const json = await res.json();
        setJoinRooms(json.data);
    }, [memberId]);

    useEffect(() => {
        getRooms();
        
        const handleRefresh = () => {
            getRooms();
        };
        
        window.addEventListener("refreshChatList", handleRefresh);
        return () => window.removeEventListener("refreshChatList", handleRefresh);
    }, [getRooms]);

    const value = {
        joinRooms,
        chattingMenu, setChattingMenu,
        memberId, memberName,
        exitRoom,
        exitRoomModal
    };

    return (
        <ChattingContext.Provider value={value}>
            {children}
        </ChattingContext.Provider>
    );
};
