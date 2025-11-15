import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "./FetchContext";

const ChattingContext = createContext();

export const useChatting = () => useContext(ChattingContext);

export const ChattingProvider = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    const memberId = currentUser.id;
    const memberName = currentUser.memberName;

    const [joinRooms, setJoinRooms] = useState([]);
    const [chattingMenu, setChattingMenu] = useState({
        menu: "list",
        chatId: 0
    });

    const getRooms = async () => {
        const res = await fetchData(`chat/get-join-rooms/${memberId}`)
        const json = await res.json();
        console.log(json)
        setJoinRooms(json.data);
    };

    useEffect(() => {
        getRooms();
        
        const handleRefresh = () => {
            getRooms();
        };
        
        window.addEventListener("refreshChatList", handleRefresh);
        return () => window.removeEventListener("refreshChatList", handleRefresh);
    }, []);

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
