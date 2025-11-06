import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../style';

const MySomSoloContainer = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('scheduled');

  const challenges = [
    {
      type: '건강',
      title: '2km 런닝 뛰기 챌린지',
      date: '2025.09.01 ~ 2025.09.31',
      repeat: '[요일반복] [금]',
    },
    {
      type: '취미',
      title: '사진 찍기 챌린지',
      date: '2025.09.01 ~ 2025.09.31',
      repeat: '[요일반복] [금]',
    }
  ];

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

  return (
    <div>
      <S.FilterContainer>
        <S.FilterButton
          active={activeFilter === 'scheduled'}
          onClick={() => setActiveFilter('scheduled')}
        >
          진행예정 (2개)
        </S.FilterButton>
        <S.FilterButton
          active={activeFilter === 'progress'}
          onClick={() => setActiveFilter('progress')}
        >
          진행중 (2개)
        </S.FilterButton>
        <S.FilterButton
          active={activeFilter === 'completed'}
          onClick={() => setActiveFilter('completed')}
        >
          진행완료 (15개)
        </S.FilterButton>
      </S.FilterContainer>
      
      <S.ListContainer>
        {challenges.map((challenge, index) => (
          <S.ListItem key={index}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
              <div>
                <S.ItemType>{challenge.type}</S.ItemType>
                <S.ItemTitle>{challenge.title}</S.ItemTitle>
                <S.ItemDetails>
                  <span>{challenge.date} {challenge.repeat}</span>
                </S.ItemDetails>
              </div>

              {/* ✅ 진행예정은 버튼 숨김, 진행중만 표시 */}
              {getButtonLabel() && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.ActionButton onClick={() => navigate(getButtonPath())}>
                    {getButtonLabel()}
                  </S.ActionButton>
                  <S.CancelButton onClick={() => {
                    // 중단하기 로직 구현
                    console.log('챌린지 중단');
                  }}>
                    중단하기
                  </S.CancelButton>
                </div>
              )}
            </div>
          </S.ListItem>
        ))}
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
