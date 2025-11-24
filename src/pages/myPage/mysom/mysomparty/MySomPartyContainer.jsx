import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchData, options } from '../../../../context/FetchContext';
import { useModal } from '../../../../components/modal';
import Pagination from '../../components/Pagination';
import S from '../style';

const feedbackOptions = [
  '챌린지 난이도가 적당했어요',
  '챌린지 진행이 체계적이예요',
  '챌린지 구성이 알차고 재밌어요',
  '챌린지 목표가 명확해요',
  '챌린지가 유익하고 배울 점이 많아요',
  '미션 설명이 이해하기 쉬웠어요',
  '팀장이 참여자 의견을 잘 반영해요',
  '팀장의 피드백이 꼼꼼해요',
  '팀장이 응원과 칭찬을 많이 해줘요',
  '팀장이 질문에 잘 답해줘요',
  '팀장이 공지를 잘 올려요',
  '팀장이 활동기록을 잘 정리해요',
  '팀장이 이해하기 쉽게 설명해요',
  '팀장이 관심갖고 도와줘요',
  '챌린지 분위기가 긍정적이예요',
  '팀장이 힘이 되어줘요',
  '팀장이 꼼꼼하고 세심해요',
  '팀장이 재밌고 유쾌해요',
  '팀장이 소통이 잘돼요',
  '팀장이 사진/글을 정성껏 남겨줘요',
  '팀장이 규칙을 잘 안내해줘요',
];

const MySomPartyContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { currentUser } = useSelector((state) => state.user);
  const [activeFilter, setActiveFilter] = useState('scheduled');
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedSom, setSelectedSom] = useState(null); // 리뷰할 솜 정보 저장
  const [partySoms, setPartySoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewedSomIds, setReviewedSomIds] = useState([]); // 이미 리뷰한 챌린지 ID 목록
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수

  // 모달용 팀/소식지명 변수 -> teamLeaderName 으로 변경
  const teamLeaderName = 'zl존준서';

  const handleOptionClick = (idx) => {
    if(selected.includes(idx)) setSelected(selected.filter(i=>i!==idx));
    else if(selected.length < 3) setSelected([...selected, idx]);
    // 3개 이상 선택시 무시
  };

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
    const fetchPartySoms = async () => {
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
        
        // somType이 "party"인 데이터만 필터링 (대소문자 구분 없이)
        const partyData = allData.filter(som => {
          // som.id: 챌린지 ID
          // som.memberId: 사용자 ID
          // som.somType: "party" 또는 "solo"
          const somType = String(som.somType || '').toLowerCase();
          const isParty = somType === 'party';
          console.log(`챌린지 ID: ${som.id}, 사용자 ID: ${som.memberId}, 타입: ${som.somType}, 파티솜: ${isParty}`);
          return isParty;
        });
        
        console.log("필터링 후 파티솜 데이터:", partyData);
        console.log("파티솜 개수:", partyData.length);
        // 최신순 정렬 (somStartDate 기준 내림차순)
        const sortedPartyData = partyData.sort((a, b) => {
          const dateA = new Date(a.somStartDate || 0);
          const dateB = new Date(b.somStartDate || 0);
          return dateB - dateA; // 최신순 (내림차순)
        });
        setPartySoms(sortedPartyData);
      } catch (error) {
        console.error('솜 데이터 로딩 실패:', error);
        setPartySoms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartySoms();
  }, [currentUser]);

  // 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      if (!currentUser?.id) {
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-som-review?id=${currentUser.id}`, {
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
          method: "GET",
          credentials: "include"
        });

        if (!res.ok) {
          console.error('리뷰 데이터 조회 실패');
          return;
        }

        const result = await res.json();
        console.log("리뷰 데이터 응답:", result);
        
        // 이미 리뷰한 챌린지 ID 목록 추출 (somId)
        const reviewedIds = (result.data || [])
          .filter(review => review.somReviewIsChecked === true)
          .map(review => review.somId);
        
        console.log("이미 리뷰한 챌린지 ID 목록:", reviewedIds);
        setReviewedSomIds(reviewedIds);
      } catch (error) {
        console.error('리뷰 데이터 로딩 실패:', error);
        setReviewedSomIds([]);
      }
    };

    fetchReviews();
  }, [currentUser]);

  // 현재 시간 기준으로 데이터 분류
  const categorizeSoms = () => {
    const now = new Date();
    const scheduled = [];
    const progress = [];
    const completed = [];

    partySoms.forEach(som => {
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

  // ✅ 상태에 따라 버튼 라벨과 이동 경로 결정
  const getButtonLabel = () => {
    if (activeFilter === 'progress') return '인증하기';
    if (activeFilter === 'completed') return '리뷰하기';
    return null; // 진행예정일 경우 버튼 없음
  };

  const getButtonPath = () => {
    if (activeFilter === 'progress') return '/main/my-page/my-som-check';
    if (activeFilter === 'completed') return '/main/my-page/my-som-review';
    return null;
  };

  // 솜 삭제 (취소/탈퇴) 함수
  const handleDeleteSom = async (som) => {
    if (!currentUser?.id) {
      alert('사용자 정보를 불러오는데 실패했습니다.');
      return;
    }

    const actionText = activeFilter === 'scheduled' ? '취소' : '탈퇴';
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
            const partyData = allData.filter(som => {
              const somType = String(som.somType || '').toLowerCase();
              return somType === 'party';
            });
            setPartySoms(partyData);
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>
                  <S.ItemType>{categoryMap[som.somCategory] || som.somCategory}</S.ItemType>
                  <S.ItemTitle>{som.somTitle}</S.ItemTitle>
                  <S.ItemDetails>
                    <span>
                      {formatDate(som.somStartDate)} {formatTime(som.somStartDate)} ~ {formatDate(som.somEndDate)} {formatTime(som.somEndDate)}
                    </span>
                  </S.ItemDetails>
                </div>

                {/* ✅ 진행예정: 취소하기 버튼, 진행중: 인증하기 + 탈퇴하기, 진행완료: 리뷰하기 */}
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
                          navigate('/main/my-page/my-som-check', { state: { somData: som } });
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
                        탈퇴하기
                      </S.CancelButton>
                    </>
                  )}
                  
                  {activeFilter === 'completed' && (
                    <S.ActionButton 
                      $disabled={reviewedSomIds.includes(som.id)}
                      onClick={(e) => {
                        // 이미 리뷰한 챌린지는 클릭 불가
                        if (reviewedSomIds.includes(som.id)) {
                          e.stopPropagation();
                          return;
                        }
                        e.stopPropagation();
                        setSelectedSom(som); // 리뷰할 솜 정보 저장
                        setShowPopup(true);
                      }}
                    >
                      {reviewedSomIds.includes(som.id) ? '리뷰완료' : getButtonLabel()}
                    </S.ActionButton>
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

      {/* 팝업 모달 */}
      {showPopup && (
        <S.PopupModalOverlay>
          <S.PopupModal>
            <S.CloseButton onClick={()=>{
              setShowPopup(false);
              setSelected([]);
              setSelectedSom(null);
            }}>×</S.CloseButton>
            <S.PopupTitle>{teamLeaderName}팀장의 어떤 점이 좋았는지 선택해주세요! <span style={{fontSize:'14px',fontWeight:'normal',color:'#222'}}>(최대 3개, 복수선택가능)</span></S.PopupTitle>
            <div style={{fontSize:'13px',color:'#AAB6BF',margin:'0 0 8px'}}>설문은 익명으로 저장되며 더 나은 소식지를 위해 활용됩니다.</div>
            <S.OptionGrid>
              {feedbackOptions.map((option, i) => (
                <S.OptionBtn key={i} selected={selected.includes(i)} onClick={()=>handleOptionClick(i)}>
                  {option}
                </S.OptionBtn>
              ))}
            </S.OptionGrid>
            <S.PopupFooter>
              <S.ActionButton 
                type="button" 
                onClick={async () => {
                  if (selected.length === 0) {
                    alert('최소 1개 이상 선택해주세요.');
                    return;
                  }
                  
                  if (!selectedSom || !currentUser) {
                    alert('리뷰 정보를 불러오는데 실패했습니다.');
                    return;
                  }

                  try {
                    // 선택한 feedbackOptions를 문자열로 합치기
                    const somReviewContent = selected
                      .map(idx => feedbackOptions[idx])
                      .join(', ');

                    // API 요청 데이터 준비
                    const reviewData = {
                      somReviewIsChecked: true,
                      somReviewContent: somReviewContent,
                      memberId: currentUser.id,
                      somId: selectedSom.id,
                      somReviewIsCheckedYn: 'Y'
                    };

                    // API 호출
                    const token = localStorage.getItem("accessToken");
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/insert-som-review`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        ...(token && { "Authorization": `Bearer ${token}` })
                      },
                      credentials: "include",
                      body: JSON.stringify(reviewData)
                    });

                    if (!response.ok) {
                      const errorText = await response.text();
                      console.error('리뷰 등록 실패:', errorText);
                      alert('리뷰 등록에 실패했습니다.');
                      return;
                    }

                    const result = await response.json();
                    console.log('리뷰 등록 성공:', result);

                    // 성공 시 데이터 다시 불러오기
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
                      // somType이 "party"인 데이터만 필터링
                      const partyData = allData.filter(som => {
                        const somType = String(som.somType || '').toLowerCase();
                        return somType === 'party';
                      });
                      setPartySoms(partyData);
                    }

                    // 리뷰 데이터도 새로고침
                    const reviewRefreshRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-som-review?id=${currentUser.id}`, {
                      headers: { 
                        "Content-Type": "application/json",
                        ...(refreshToken && { "Authorization": `Bearer ${refreshToken}` })
                      },
                      method: "GET",
                      credentials: "include"
                    });

                    if (reviewRefreshRes.ok) {
                      const reviewRefreshResult = await reviewRefreshRes.json();
                      const reviewedIds = (reviewRefreshResult.data || [])
                        .filter(review => review.somReviewIsChecked === true)
                        .map(review => review.somId);
                      setReviewedSomIds(reviewedIds);
                    }

                    // 성공 시 팝업 닫기 및 선택 초기화
                    setShowPopup(false);
                    setSelected([]);
                    setSelectedSom(null);
                    
                    // 리뷰 완료 알림
                    openModal({
                      title: '리뷰 완료',
                      message: '리뷰를 완료했습니다.',
                      confirmText: '확인'
                    });
                  } catch (error) {
                    console.error('리뷰 등록 중 오류 발생:', error);
                    alert('리뷰 등록 중 오류가 발생했습니다.');
                  }
                }}
              >
                완료
              </S.ActionButton>
            </S.PopupFooter>
          </S.PopupModal>
        </S.PopupModalOverlay>
      )}
    </div>
  );
};

export default MySomPartyContainer;
