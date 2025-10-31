import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ContentTitle,
  ContentSubtitle,
  FilterContainer,
  FilterButton,
  ListContainer,
  ListItem,
  ItemType,
  ItemTitle,
  ItemDetails,
  Pagination,
  PageButton,
  PageNumber,
  ActionButton
} from '../style';

const MySomSoloContainer = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('scheduled');

  const challenges = [
    {
      type: '솔로',
      title: '2km 런닝 뛰기 챌린지!!',
      date: '2025.09.01 ~ 2025.09.31',
      repeat: '[요일반복] [금]',
      progress: '4회/4회'
    },
    {
      type: '솔로',
      title: '2km 런닝 뛰기 챌린지!!',
      date: '2025.09.01 ~ 2025.09.31',
      repeat: '[요일반복] [금]',
      progress: '4회/4회'
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
      <ContentTitle>솔로 솜 현황이 궁금하세요?</ContentTitle>
      <ContentSubtitle>솔로 솜 현황을 확인할 수 있어요.</ContentSubtitle>
      
      <FilterContainer>
        <FilterButton
          active={activeFilter === 'scheduled'}
          onClick={() => setActiveFilter('scheduled')}
        >
          진행예정 (2개)
        </FilterButton>
        <FilterButton
          active={activeFilter === 'progress'}
          onClick={() => setActiveFilter('progress')}
        >
          진행중 (2개)
        </FilterButton>
        <FilterButton
          active={activeFilter === 'completed'}
          onClick={() => setActiveFilter('completed')}
        >
          진행완료 (15개)
        </FilterButton>
      </FilterContainer>
      
      <ListContainer>
        {challenges.map((challenge, index) => (
          <ListItem key={index}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
              <div>
                <ItemType>{challenge.type}</ItemType>
                <ItemTitle>{challenge.title}</ItemTitle>
                <ItemDetails>
                  <span>{challenge.date}</span>
                  <span>{challenge.repeat} {challenge.progress}</span>
                </ItemDetails>
              </div>

              {/* ✅ 진행예정은 버튼 숨김, 진행중만 표시 */}
              {getButtonLabel() && (
                <ActionButton onClick={() => navigate(getButtonPath())}>
                  {getButtonLabel()}
                </ActionButton>
              )}
            </div>
          </ListItem>
        ))}
      </ListContainer>

      <Pagination>
        <PageButton disabled>&lt; 이전</PageButton>
        <PageNumber>1</PageNumber>
        <PageButton disabled={false}>다음 &gt;</PageButton>
      </Pagination>
    </div>
  );
};

export default MySomSoloContainer;
