import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../../../../components/modal';
import Pagination from '../../components/Pagination';
import S from '../style';

const MySomSoloContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { currentUser } = useSelector((state) => state.user);
  const [activeFilter, setActiveFilter] = useState('scheduled');
  const [soloSoms, setSoloSoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10;

  // 카테고리 매핑
  const categoryMap = {
    study: '학습',
    health: '건강',
    social: '소셜',
    hobby: '취미',
    'life-style': '생활',
    life: '생활',
    rookie: '루키'
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 시간 포맷팅 함수 (시:분)
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchSoloSoms = async () => {
      // currentUser가 없으면 API 호출하지 않음
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-som?id=${currentUser.id}`, {
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
          method: "GET",
          credentials: "include"
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('API 에러 응답:', errorText);
          throw new Error(`솜 데이터를 불러오는데 실패했습니다. (${res.status})`);
        }

        const result = await res.json();
        console.log("서버 응답:", result);
        
        // 서버 응답 구조: id는 챌린지 ID, memberId는 사용자 ID
        const allData = result.data || [];
        console.log("전체 솜 데이터:", allData);
        
        // somType이 "solo"인 데이터만 필터링 (대소문자 구분 없이)
        const soloData = allData.filter(som => {
          // som.id: 챌린지 ID
          // som.memberId: 사용자 ID
          // som.somType: "party" 또는 "solo"
          const somType = String(som.somType || '').toLowerCase();
          const isSolo = somType === 'solo';
          console.log(`챌린지 ID: ${som.id}, 사용자 ID: ${som.memberId}, 타입: ${som.somType}, 솔로솜: ${isSolo}`);
          return isSolo;
        });
        
        console.log("필터링 후 솔로솜 데이터:", soloData);
        console.log("솔로솜 개수:", soloData.length);
        // 최신순 정렬 (somStartDate 기준 내림차순)
        const sortedSoloData = soloData.sort((a, b) => {
          const dateA = new Date(a.somStartDate || 0);
          const dateB = new Date(b.somStartDate || 0);
          return dateB - dateA; // 최신순 (내림차순)
        });
        setSoloSoms(sortedSoloData);
      } catch (error) {
        console.error('솜 데이터 로딩 실패:', error);
        setSoloSoms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSoloSoms();
  }, [currentUser]);

  // 현재 시간 기준으로 데이터 분류
  const categorizeSoms = () => {
    const now = new Date();
    const scheduled = [];
    const progress = [];
    const completed = [];

    soloSoms.forEach(som => {
      const startDate = new Date(som.somStartDate);
      const endDate = new Date(som.somEndDate);

      if (startDate > now) {
        // 진행예정: 시작 시간이 현재보다 미래
        scheduled.push(som);
      } else if (endDate >= now && startDate <= now) {
        // 진행중: 현재 시간이 시작과 종료 사이
        progress.push(som);
      } else {
        // 진행완료: 종료 시간이 현재보다 과거
        completed.push(som);
      }
    });

    return { scheduled, progress, completed };
  };

  const { scheduled, progress, completed } = categorizeSoms();

  // 현재 필터에 맞는 데이터 가져오기
  const getCurrentData = () => {
    switch (activeFilter) {
      case 'scheduled':
        return scheduled;
      case 'progress':
        return progress;
      case 'completed':
        return completed;
      default:
        return [];
    }
  };

  // 필터 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setPageNumber(1);
  }, [activeFilter]);

  // 페이지네이션된 데이터 계산
  const allCurrentData = getCurrentData();
  const totalPages = Math.max(1, Math.ceil(allCurrentData.length / itemsPerPage));
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allCurrentData.slice(startIndex, endIndex);

  // ✅ 상태에 따라 버튼 라벨 결정
  const getButtonLabel = () => {
    if (activeFilter === 'progress') return '인증하기';
    // 진행완료일 때는 버튼 표시 안 함
    return null;
  };

  // ✅ 상태에 따라 이동 경로 결정
  const getButtonPath = () => {
    if (activeFilter === 'progress') return '/main/my-page/my-som-check';
    return null;
  };

  // 솜 삭제 (취소/중단) 함수
  const handleDeleteSom = async (som) => {
    if (!currentUser?.id) {
      alert('사용자 정보를 불러오는데 실패했습니다.');
      return;
    }

    const actionText = activeFilter === 'scheduled' ? '취소' : '중단';
    const confirmMessage = `정말로 이 챌린지를 ${actionText}하시겠습니까?`;

    // 확인 모달 띄우기
    openModal({
      title: `${actionText} 확인`,
      message: confirmMessage,
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/private/my-page/delete-som?memberId=${currentUser.id}&somId=${som.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` })
              },
              credentials: "include"
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error('솜 삭제 실패:', errorText);
            openModal({
              title: `${actionText} 실패`,
              message: `${actionText}에 실패했습니다.`,
              confirmText: '확인'
            });
            return;
          }

          // 성공 시 데이터 새로고침
          const refreshToken = localStorage.getItem("accessToken");
          const refreshRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-som?id=${currentUser.id}`, {
            headers: { 
              "Content-Type": "application/json",
              ...(refreshToken && { "Authorization": `Bearer ${refreshToken}` })
            },
            method: "GET",
            credentials: "include"
          });

          if (refreshRes.ok) {
            const refreshResult = await refreshRes.json();
            const allData = refreshResult.data || [];
            const soloData = allData.filter(som => {
              const somType = String(som.somType || '').toLowerCase();
              return somType === 'solo';
            });
            setSoloSoms(soloData);
          }

          // 성공 알림
          openModal({
            title: `${actionText} 완료`,
            message: `챌린지가 ${actionText}되었습니다.`,
            confirmText: '확인'
          });
        } catch (error) {
          console.error('솜 삭제 중 오류 발생:', error);
          openModal({
            title: '오류 발생',
            message: `${actionText} 중 오류가 발생했습니다.`,
            confirmText: '확인'
          });
        }
      }
    });
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <S.FilterContainer>
        <S.FilterButton
          $active={activeFilter === 'scheduled'}
          onClick={() => setActiveFilter('scheduled')}
        >
          진행예정 ({scheduled.length}개)
        </S.FilterButton>
        <S.FilterButton
          $active={activeFilter === 'progress'}
          onClick={() => setActiveFilter('progress')}
        >
          진행중 ({progress.length}개)
        </S.FilterButton>
        <S.FilterButton
          $active={activeFilter === 'completed'}
          onClick={() => setActiveFilter('completed')}
        >
          진행완료 ({completed.length}개)
        </S.FilterButton>
      </S.FilterContainer>
      
      <S.ListContainer>
        {currentData.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#808080' }}>
            {activeFilter === 'scheduled' && '진행예정인 솜이 없습니다.'}
            {activeFilter === 'progress' && '진행중인 솜이 없습니다.'}
            {activeFilter === 'completed' && '진행완료된 솜이 없습니다.'}
          </div>
        ) : (
          currentData.map((som) => (
            <S.ListItem 
              key={som.id}
              onClick={() => navigate(`/main/som/read/${som.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}>
                <div>
                  <S.ItemType>{categoryMap[som.somCategory] || som.somCategory}</S.ItemType>
                  <S.ItemTitle>{som.somTitle}</S.ItemTitle>
                  <S.ItemDetails>
                    <span>
                      {formatDate(som.somStartDate)} {formatTime(som.somStartDate)} ~ {formatDate(som.somEndDate)} {formatTime(som.somEndDate)}
                    </span>
                  </S.ItemDetails>
                </div>

                {/* ✅ 진행예정: 취소하기 버튼, 진행중: 인증하기 + 중단하기 */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {activeFilter === 'scheduled' && (
                    <S.CancelButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSom(som);
                      }}
                    >
                      취소하기
                    </S.CancelButton>
                  )}
                  
                  {activeFilter === 'progress' && (
                    <>
                      <S.ActionButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(getButtonPath(), { state: { somData: som } });
                        }}
                      >
                        {getButtonLabel()}
                      </S.ActionButton>
                      <S.CancelButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSom(som);
                        }}
                      >
                        중단하기
                      </S.CancelButton>
                    </>
                  )}
                </div>
              </div>
            </S.ListItem>
          ))
        )}
      </S.ListContainer>

      <Pagination 
        totalPages={totalPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default MySomSoloContainer;
