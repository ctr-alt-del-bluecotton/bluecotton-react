import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, options } from './FetchContext';
import { useModal } from './../components/modal';
import { useSelector } from 'react-redux';

const ReadContext = createContext();

export const useRead = () => useContext(ReadContext);

export const ReadProvider = ({ children }) => {
    const nav = useNavigate();
    const { currentUser, isLogin } = useSelector((state) => state.user);
    const { id } = useParams();
    const { openModal } = useModal();
    const [somInfo, setSomInfo] = useState({});
    const [somLeader, setSomLeader] = useState({});
    const [somReviews, setSomReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [somContent, setSomContent] = useState('');
    const [infoMenuSelect, setInfoMenuSelect] = useState("info");
    const [somMemberList, setSomMemberList] = useState([]);
    const [somIsLike, setSomIsLike] = useState(false);
    const isLater = new Date(somInfo.somEndDate) > new Date();

    const somCategoryMap = {
        "study": "학습",
        "health": "건강",
        "social": "소셜",
        "hobby": "취미",
        "life": "생활",
        "rookie": "루키"
    }

    const somCategoryInfo = somCategoryMap[somInfo.somCategory];
    const isOver = new Date(somInfo.somEndDate) > new Date();

    const loadReadData = useCallback(async () => {
        setLoading(true);
        await fetchData(`som/read?somId=${id}&memberEmail=${currentUser.memberEmail}`, options.getOption())
            .then(async (res) => {
                const target = await res.json();
                const readData = target.data;
    
                // .find((som) => String(som.id) === String(id));
                setSomInfo(readData || {}); 
        
                const likeInfo = readData.somLike;
                setSomIsLike(likeInfo ? likeInfo.isLike : false);
    
                setSomLeader(readData.memberSomLeader || {});
        
                const contentData = readData.somContent
                setSomContent(contentData ? contentData.somContent : "");
                setSomMemberList(readData.somJoinList || []);
                
                setLoading(false);
            })
    },[currentUser.memberEmail, id])

    const wisperJoin = async (somTitle) => {
        await fetchData(`chat/join-room?somTitle=${somTitle}&memberEmail=${currentUser.memberEmail}`, options.getOption())
        .then((res) => {

        })
    }

    const insertFetch = async () => {
        await fetchData('som/join', options.postOption({
            somId : id,
            memberId : currentUser.id
        }))
        .then((res) => {
            window.dispatchEvent(new CustomEvent("refreshSomList"));
            // 참여 후 데이터 새로고침
            loadReadData();
        })
    }
    
    const somLikeUpdate = async (somId, isLike) => {
        const res = await fetchData(`som/like?somId=${somId}&memberEmail=${currentUser.memberEmail}&isLike=${isLike}`,
            options.putOption()
        ).then((res) => res)
        .catch((res) => console.error(res))

        return res;
    }

    const wisperSoloSom = (somTitle) => {
        openModal({
            title: "귓솜말을 시작합니다.",
            message: `해당 솜의 리더인 ${somInfo.memberSomLeader.memberName}(${somInfo.memberSomLeader.memberNickname})님에게 귓솜말을 겁니다.`,
            cancelText: "취소",
            confirmText: "귓솜말 걸기",
            onConfirm: () => { wisperJoin(somTitle) }
        });
    }

    const somJoinSoloSom = () => {
        openModal({
            title: "솔로 솜에는 참가 할 수 없습니다.",
            message: "귓솜말로 문의를 해보는건 어떨까요?",
            cancelText: "더 둘러보기"
        });
    }

    const somJoinNotLogin = () => {
        if (!isLogin) {
            openModal({
                title: "로그인이 필요한 서비스입니다.",
                message: "로그인을 해주세요.",
                cancelText: "더 둘러보기",
                confirmText: "확인", 
                onConfirm: () => { nav('/login') }
            });
        }
    }

    const somJoin = () => {
        // 현재 사용자가 이미 참여 중인지 확인
        const isAlreadyJoined = somMemberList && currentUser && somMemberList.some((member) => member.memberId === currentUser.id);
        
        if (isAlreadyJoined) {
            openModal({
                title: "이미 참여중",
                message: "이미 해당 솜에 참가하고 있습니다.",
                confirmText: "확인"
            });
        } else {
            // 참여 확인 모달 표시 후 참여 쿼리 실행
            openModal({
                title: "해당 솜에 참가합니다.",
                message: "참가하시겠습니까?",
                cancelText: "더 둘러보기",
                confirmText: "참가하기",
                onConfirm: () => { insertFetch() }
            });
        }
    }

    useEffect(() => {
        if (currentUser && currentUser.memberEmail) {
            loadReadData();
        }

        const handleRefresh = () => {
            if (currentUser && currentUser.memberEmail) {
                loadReadData(); 
            }
        };

        window.addEventListener("refreshSomList", handleRefresh);
        return () => window.removeEventListener("refreshSomList", handleRefresh);
    }, [id, currentUser, loadReadData]);

    useEffect(() => {
        if (somLeader.memberId) {
            setSomReviews(somLeader.somReviewList);
        }
    }, [somLeader]);
    
    const formatDate = (isoString) => {
        const date = new Date(isoString); // ISO 8601 문자열 → Date 객체로 변환
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    
    const value = {
        somInfo,
        somLeader,
        somReviews,
        somLikeUpdate,
        somCategoryInfo,
        loading,
        somContent,
        infoMenuSelect,
        insertFetch,
        setInfoMenuSelect,
        somMemberList,
        somJoinSoloSom,
        somJoin,
        somIsLike,
        setSomIsLike,
        formatDate,
        isLater,
        somJoinNotLogin,
        wisperSoloSom,
        isOver
    };

    return (
        <ReadContext.Provider value={value}>
            {children}
        </ReadContext.Provider>
    );
};
