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
  PageNumber,
  DeleteButton
} from '../style';
import { useModal } from '../../../../components/modal';

const MyPostWriteContainer = () => {
  const { openModal } = useModal();
  const posts = [
    {
      id: 1,
      type: '건강',
      title: '2km 런닝 뛰기 챌린지',
      date: '2025.08.25',
    },
    {
      id: 2,
      type: '학습',
      title: '매일 영어 단어 10개 외우기',
      date: '2025.08.28',
    },
    {
      id: 3,
      type: '취미',
      title: '그림 그리기 챌린지',
      date: '2025.09.01',
    },
    {
      id: 4,
      type: '생활',
      title: '친환경 생활 실천 챌린지',
      date: '2025.09.03',
    },
    {
      id: 5,
      type: '소셜',
      title: '가족과 대화 나누기',
      date: '2025.09.05',
    },
    {
      id: 6,
      type: '건강',
      title: '스트레칭 10분씩 하기',
      date: '2025.09.07',
    },
    {
      id: 7,
      type: '학습',
      title: '온라인 강의 듣기',
      date: '2025.09.10',
    },
    {
      id: 8,
      type: '취미',
      title: '요리 레시피 도전하기',
      date: '2025.09.12',
    }
  ];

  const handleDelete = (id) => {
    console.log('삭제:', id);
    // 삭제 로직 구현
  };

  return (
    <div>
      <ListHeader>작성글(8개)</ListHeader>
      
      <ListContainer>
        {posts.map((post, index) => (
          <ListItem key={index}>
            <div>
              <ItemType>{post.type}</ItemType>
              <ItemTitle>{post.title}</ItemTitle>
              <ItemDetails>
                <span>{post.date}</span>
                <DeleteButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal({
                      title: "게시글 삭제",
                      message: "정말 게시글을 삭제하시겠습니까?",
                      confirmText: "삭제",
                      cancelText: "취소",
                      onConfirm: () => handleDelete(post.id),
                    });
                  }}
                >
                  삭제
                </DeleteButton>
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

export default MyPostWriteContainer;
