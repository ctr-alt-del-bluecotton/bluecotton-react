import React from 'react';
import {
  ListHeader,
  ListContainer,
  ListItem,
  ItemType,
  ItemTitle,
  ItemDetails,
  Pagination,
  PageButton,
  PageNumber
} from '../style';

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
      <ListHeader>좋아요(5개)</ListHeader>
      
      <ListContainer>
        {posts.map((post, index) => (
          <ListItem key={index}>
            <div>
              <ItemType>{post.type}</ItemType>
              <ItemTitle>{post.title}</ItemTitle>
              <ItemDetails>
                <span>{post.date}</span>
              </ItemDetails>
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

export default MyPostLikeContainer;
