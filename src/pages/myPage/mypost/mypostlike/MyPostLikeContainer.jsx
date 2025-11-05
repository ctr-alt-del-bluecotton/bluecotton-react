import React from 'react';
import S from '../style';

const MyPostLikeContainer = () => {
  const posts = [
    {
      type: '건강',
      title: '매일 물 2L 마시기 챌린지',
      date: '2025.09.01',
    },
    {
      type: '학습',
      title: '독서 30분 챌린지',
      date: '2025.09.03',
    },
    {
      type: '소셜',
      title: '전국 플로깅 대회',
      date: '2025.09.05',
    },
    {
      type: '취미',
      title: '사진 찍기 챌린지',
      date: '2025.09.07',
    },
    {
      type: '건강',
      title: '스쿼트 100회 도전',
      date: '2025.09.10',
    }
  ];

  return (
    <div>
      <S.ListHeader>좋아요(5개)</S.ListHeader>
      
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

export default MyPostLikeContainer;
