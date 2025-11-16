import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "./FetchContext";

const ChattingContext = createContext();

export const useChatting = () => useContext(ChattingContext);

export const ChattingProvider = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    const memberId =  currentUser.id;
    const memberName = currentUser.memberName;

    const [joinRooms, setJoinRooms] = useState([]);
    const [chattingMenu, setChattingMenu] = useState({
        menu: "list",
        chatId: 0
    });

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
        memberId, memberName
    };

    return (
        <ChattingContext.Provider value={value}>
            {children}
        </ChattingContext.Provider>
    );
};
