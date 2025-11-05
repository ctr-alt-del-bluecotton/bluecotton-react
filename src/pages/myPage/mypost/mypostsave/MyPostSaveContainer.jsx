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
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../components/modal';



const MyPostSaveContainer = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const posts = [
    {
      id: 1,
      type: '취미',
      title: '초록색 패션 코디 챌린지',
      date: '2025.09.15',
    },
    {
      id: 2,
      type: '소셜',
      title: '친구들과 함께하는 산책',
      date: '2025.09.10',
    },
    {
      id: 3,
      type: '건강',
      title: '다이어트 습관 만들기',
      date: '2025.09.05',
    }
  ];

  const handleDelete = (id) => {
    console.log('삭제:', id);
    // 삭제 로직 구현
  };

  return (
    <div>
      <ListHeader>임시저장한 글(3개)</ListHeader>
      
      <ListContainer>
        {posts.map((post, index) => (
          <ListItem key={index}>
            <div>
              <ItemType>{post.type}</ItemType>
              <ItemTitle>{post.title}</ItemTitle>
              <ItemDetails>
                <span>저장일: {post.date}</span>
                <DeleteButton onClick={(e) => {
                  openModal({
                    title: "임시저장한 게시글이 사라집니다.",
                    message: "정말 게시글을 삭제제하시겠습니까?",
                    confirmText: "삭제",
                    cancelText: "취소",
                    // onConfirm: () => handleDelete(post.id), 
                    // 삭제 눌렀을때 TBL_POST_DRAFT 테이블에서 삭제되게 구현
                  });
                }}>
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

export default MyPostSaveContainer;
