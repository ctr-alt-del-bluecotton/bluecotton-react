import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData, options } from "./FetchContext";

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

    const exitRoom = useCallback(async (id) => {
        await fetchData(`chat/delete-user`, options.deleteOption({
            memberEmail: currentUser.memberEmail,
            chatId: id
        })).then(async(res) => {
            const json = await res.json();
            console.log(json)
            window.dispatchEvent(new CustomEvent("refreshChatList"));
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
        exitRoom
    };

    return (
        <ChattingContext.Provider value={value}>
            {children}
        </ChattingContext.Provider>
    );
};
