import React from 'react';
import S from '../style';

const MyPostCommnetContainer = () => {
  const posts = [
    {
      type: '건강',
      title: '2km 런닝 뛰기 챌린지',
      date: '2025.08.30',
    },
    {
      type: '소셜',
      title: '전국 플로깅 대회',
      date: '2025.09.05',
    },
    {
      type: '건강',
      title: '매일 스쿼트 50개 도전',
      date: '2025.09.10',
    },
    {
      type: '학습',
      title: '공부 시간 기록 챌린지',
      date: '2025.09.15',
    }
  ];

  return (
    <div>
      <S.ListHeader>댓글 단 글(4개)</S.ListHeader>
      
      <S.ListContainer>
        {posts.map((post, index) => (
          <S.ListItem key={index}>
            <div>
              <S.ItemType>{post.type}</S.ItemType>
              <S.ItemTitle>{post.title}</S.ItemTitle>
              <S.ItemDetails>
                <span>{post.date}</span>
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

export default MyPostCommnetContainer;
