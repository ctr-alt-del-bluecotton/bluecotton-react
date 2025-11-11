import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../style';
import { useModal } from '../../../../components/modal';

const MyPostRecentContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: '건강',
      title: '2km 런닝 뛰기 챌린지',
      date: '2025.08.28',
    },
    {
      id: 2,
      type: '소셜',
      title: '전국 플로깅 대회',
      date: '2025.09.05',
    },
    {
      id: 3,
      type: '건강',
      title: '매일 스쿼트 50개 도전',
      date: '2025.09.10',
    },
    {
      id: 4,
      type: '학습',
      title: '언어 공부하기 챌린지',
      date: '2025.09.12',
    },
    {
      id: 5,
      type: '생활',
      title: '친환경 생활 실천 챌린지',
      date: '2025.09.15',
    },
    {
      id: 6,
      type: '소셜',
      title: '공원 조깅 모임',
      date: '2025.09.18',
    }
  ]);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:10000/my-page/delete-post-recent?id=${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('최근 본 게시글 삭제 실패');
      }

      // 성공적으로 삭제되면 목록에서 해당 게시글 제거
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('최근 본 게시글 삭제 오류:', error);
      openModal({
        title: "삭제 실패",
        message: "최근 본 게시글 삭제에 실패했습니다.",
        confirmText: "확인",
      });
    }
  };

  return (
    <div>
      <S.ListHeader>최근에 본 글(6개)</S.ListHeader>
      
      <S.ListContainer>
        {posts.map((post, index) => (
          <S.ListItem 
            key={index}
            onClick={() => navigate(`/main/post/read/${post.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ flex: 1 }}>
              <S.ItemType>{post.type}</S.ItemType>
              <S.ItemTitle>{post.title}</S.ItemTitle>
              <S.ItemDetails>
                <span>{post.date}</span>
              </S.ItemDetails>
            </div>
            <S.DeleteButton 
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  title: "기록 삭제",
                  message: "정말 이 기록을 삭제하시겠습니까?",
                  confirmText: "삭제",
                  cancelText: "취소",
                  onConfirm: () => handleDelete(post.id),
                });
              }}
            >
              기록삭제
            </S.DeleteButton>
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

export default MyPostRecentContainer;
