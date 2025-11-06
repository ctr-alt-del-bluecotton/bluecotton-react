import React, { useState } from 'react';
import S from '../style';

const MySomAuthContainer = () => {
  const [activeFilter, setActiveFilter] = useState('pending');

  const challenges = [
    {
      type: '건강',
      title: '2km 런닝 뛰기 챌린지',
      date: '2025.09.01 ~ 2025.09.07',
      repeat: '[요일반복] [금]',
    },
    {
      type: '학습',
      title: '독서 30분 챌린지',
      date: '2025.09.01 ~ 2025.09.07',
      repeat: '[요일반복] [금]',
    }
  ];

  return (
    <div>
      
      <S.FilterContainer>
        <S.FilterButton
          active={activeFilter === 'pending'}
          onClick={() => setActiveFilter('pending')}
        >
          인증대기 (2개)
        </S.FilterButton>
        <S.FilterButton
          active={activeFilter === 'completed'}
          onClick={() => setActiveFilter('completed')}
        >
          인증완료 (5개)
        </S.FilterButton>
      </S.FilterContainer>
      
      <S.ListContainer>
        {challenges.map((challenge, index) => (
          <S.ListItem key={index}>
            <div>
              <S.ItemType>{challenge.type}</S.ItemType>
              <S.ItemTitle>{challenge.title}</S.ItemTitle>
              <S.ItemDetails>
                <span>{challenge.date} {challenge.repeat}</span>
              </S.ItemDetails>
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

export default MySomAuthContainer;
