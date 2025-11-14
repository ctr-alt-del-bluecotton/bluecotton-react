import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leaderData from '../pages/main/dummyData/readDummys/somLeaderDummy.json';
import reviewData from '../pages/main/dummyData/readDummys/somReviewDummy.json';
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

    const insertFetch = async () => {
        await fetchData('som/join', options.postOption({
            somId : id,
            memberId : currentUser.id
        }))
        .then((res) => {
            console.log(res);
            window.dispatchEvent(new CustomEvent("refreshSomList"));
        })
    }
    
    const somLikeUpdate = async (somId, isLike) => {
        const res = await fetchData(`som/like?somId=${somId}&memberEmail=${currentUser.memberEmail}&isLike=${isLike}`,
            options.putOption()
        ).then((res) => res)
        .catch((res) => console.error(res))

        return res;
    }

    const somJoinSoloSom = () => {
        openModal({
            title: "솔로 솜에는 참가 할 수 없습니다.",
            message: "귓솜말로 문의를 해보는건 어떨까요?",
            cancelText: "더 둘러보기",
            confirmText: "확인",
            onConfirm: () => { alert('귓솜말 연결 코드') }
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

        console.log(somMemberList.forEach((member) => console.log(member.id === currentUser.id)))
        if(somMemberList.filter((member) => member.id === currentUser.id)){
            openModal({
                title: "이미 해당 솜에 참가하고 있습니다.",
                message: "다른 솜을 둘러보러 가볼까요?",
                confirmText: "확인"
            });

        } else {
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
        const loadReadData = async () => {
            setLoading(true);
            await fetchData(`som/read?somId=${id}&memberEmail=${currentUser.memberEmail}`, options.getOption())
                .then(async (res) => {
                    const target = await res.json();
                    const readData = target.data;
                    console.log(readData)
        
                    // .find((som) => String(som.id) === String(id));
                    setSomInfo(readData || {});
            
                    const likeInfo = readData.somLike;
                    setSomIsLike(likeInfo ? likeInfo.isLike : false);
            
                    const leaderInfo = leaderData.find(({ somId }) => String(somId) === String(id));
                    setSomLeader(leaderInfo || {});
            
                    const contentData = readData.somContent
                    setSomContent(contentData ? contentData.somContent : "");
            
                    console.log("참여 멤버 데이터:", readData.somJoinList);
                    setSomMemberList(readData.somJoinList || []);
                    
                    setLoading(false);
                })
        }

        loadReadData();

        const handleRefresh = () => {
            loadReadData(); 
        };

        window.addEventListener("refreshSomList", handleRefresh);
        return () => window.removeEventListener("refreshSomList", handleRefresh);
    }, [id]);

    useEffect(() => {
        if (somLeader.memberId) {
            setSomReviews(reviewData.filter(({ memberId }) => String(memberId) === String(somLeader.memberId)));
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
        somJoinNotLogin
    };

    return (
        <ReadContext.Provider value={value}>
            {children}
        </ReadContext.Provider>
    );
};
