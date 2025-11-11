import React, { useState } from 'react';
import S from '../style';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../components/modal';



const MyPostSaveContainer = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
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
  ]);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:10000/my-page/delete-post-save?id=${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('임시저장 게시글 삭제 실패');
      }

      // 성공적으로 삭제되면 목록에서 해당 게시글 제거
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('임시저장 게시글 삭제 오류:', error);
      openModal({
        title: "삭제 실패",
        message: "임시저장 게시글 삭제에 실패했습니다.",
        confirmText: "확인",
      });
    }
  };

  return (
    <div>
      <S.ListHeader>임시저장한 글(3개)</S.ListHeader>
      
      <S.ListContainer>
        {posts.map((post, index) => (
          <S.ListItem 
            key={index}
            onClick={() => navigate(`/main/post/write?draftId=${post.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ flex: 1 }}>
              <S.ItemType>{post.type}</S.ItemType>
              <S.ItemTitle>{post.title}</S.ItemTitle>
              <S.ItemDetails>
                <span>저장일: {post.date}</span>
              </S.ItemDetails>
            </div>
            <S.DeleteButton onClick={(e) => {
              e.stopPropagation();
              openModal({
                title: "임시저장한 게시글이 사라집니다.",
                message: "정말 게시글을 삭제제하시겠습니까?",
                confirmText: "삭제",
                cancelText: "취소",
                onConfirm: () => handleDelete(post.id),
              });
            }}>
              삭제
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

export default MyPostSaveContainer;
