import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import S from '../style';

const MySomAuthContainer = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('pending');
  const [authData, setAuthData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Redux에서 사용자 id 가져오기
  const user = useSelector((state) => state.user);
  const userId = user?.currentUser?.id;

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchAuthData = async () => {
      // userId가 없으면 API 호출하지 않음
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-som-check?id=${userId}`, {
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
          method: "GET",
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error('인증 데이터를 불러오는데 실패했습니다.');
        }

        const result = await res.json();
        console.log("서버 응답:", result);

        // data 배열에서 데이터 가져오기
        const checkData = result.data || [];
        setAuthData(checkData);
      } catch (error) {
        console.error('인증 데이터 로딩 실패:', error);
        setAuthData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthData();
  }, [userId]);

  // somCheckIsChecked 값에 따라 데이터 분류
  const pendingData = authData.filter(item => !item.somCheckIsChecked);
  const completedData = authData.filter(item => item.somCheckIsChecked);

  // 현재 필터에 맞는 데이터 가져오기
  const getCurrentData = () => {
    return activeFilter === 'pending' ? pendingData : completedData;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  const currentData = getCurrentData();

  return (
    <div>
      
      <S.FilterContainer>
        <S.FilterButton
          $active={activeFilter === 'pending'}
          onClick={() => setActiveFilter('pending')}
        >
          인증대기 ({pendingData.length}개)
        </S.FilterButton>
        <S.FilterButton
          $active={activeFilter === 'completed'}
          onClick={() => setActiveFilter('completed')}
        >
          인증완료 ({completedData.length}개)
        </S.FilterButton>
      </S.FilterContainer>
      
      <S.ListContainer>
        {currentData.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#808080' }}>
            {activeFilter === 'pending' && '인증 대기 중인 항목이 없습니다.'}
            {activeFilter === 'completed' && '인증 완료된 항목이 없습니다.'}
          </div>
        ) : (
          currentData.map((item, index) => (
            <S.ListItem 
              key={index}
              onClick={() => {
                if (item.somId) {
                  navigate(`/main/som/read/${item.somId}`);
                }
              }}
              style={{ cursor: item.somId ? 'pointer' : 'default' }}
            >
              <div>
                <S.ItemType>
                  {item.somCheckIsChecked ? '인증 완료' : '인증 대기'}
                </S.ItemType>
                <S.ItemTitle>{item.somCheckContent || '인증 내용 없음'}</S.ItemTitle>
                <S.ItemDetails>
                  <span>
                    {item.somCheckIsChecked ? '✅ 인증이 완료되었습니다.' : '⏳ 인증 대기 중입니다.'}
                  </span>
                </S.ItemDetails>
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

export default MySomAuthContainer;
