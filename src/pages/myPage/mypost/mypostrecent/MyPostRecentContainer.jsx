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

const MyPostRecentContainer = () => {
  const posts = [
    {
      type: '건강',
      title: '2km 런닝 뛰기 챌린지',
      date: '2025.08.28',
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
      title: '언어 공부하기 챌린지',
      date: '2025.09.12',
    },
    {
      type: '생활',
      title: '친환경 생활 실천 챌린지',
      date: '2025.09.15',
    },
    {
      type: '소셜',
      title: '공원 조깅 모임',
      date: '2025.09.18',
    }
  ];

  return (
    <div>
      <ListHeader>최근에 본 글(6개)</ListHeader>
      
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

export default MyPostRecentContainer;
