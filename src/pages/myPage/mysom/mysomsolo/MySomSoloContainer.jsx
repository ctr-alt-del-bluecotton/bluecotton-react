import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from '../style';

const MySomSoloContainer = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [activeFilter, setActiveFilter] = useState('scheduled');
  const [soloSoms, setSoloSoms] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log("전체 데이터:", result.data);
        console.log("데이터 개수:", result.data?.length);

        // somType이 "solo"인 데이터만 필터링 (대소문자 구분 없이)
        const allData = result.data || [];
        console.log("필터링 전 데이터:", allData);
        const soloData = allData.filter(som => {
          const somType = som.somType?.toLowerCase();
          console.log(`som.id: ${som.id}, somType: ${som.somType}, 소문자: ${somType}`);
          return somType === 'solo';
        });
        console.log("필터링 후 솔로솜 데이터:", soloData);
        console.log("솔로솜 개수:", soloData.length);
        setSoloSoms(soloData);
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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  const currentData = getCurrentData();

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

                {/* ✅ 진행예정은 버튼 숨김, 진행중만 표시 */}
                {getButtonLabel() && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        // 중단하기 로직 구현
                        console.log('챌린지 중단');
                      }}
                    >
                      중단하기
                    </S.CancelButton>
                  </div>
                )}
              </div>
            </S.ListItem>
          ))
        )}
      </S.ListContainer>

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton disabled={false}>다음 &gt;</S.PageButton>
      </S.Pagination>
    </div>
  );
};

export default MySomSoloContainer;
