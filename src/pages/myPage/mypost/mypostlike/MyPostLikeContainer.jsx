import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import S from '../style';
import { useModal } from '../../../../components/modal';
import Pagination from '../../components/Pagination';
import { getUserId } from '../../utils/getUserId';

const categoryMap = {
  life: '생활',
  health: '건강',
  study: '학습',
  social: '소셜',
  hobby: '취미',
  rookie: '루키',
};

const MyPostLikeContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10;
  
  // 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const urlId = searchParams.get('id');
      if (urlId) {
        setUserId(urlId);
      } else {
        const id = await getUserId();
        setUserId(id);
      }
    };
    fetchUserId();
  }, [searchParams]);

  useEffect(() => {
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };

    const fetchPosts = async () => {
      try {
        setLoading(true);
        // userId가 없으면 API 호출하지 않음 (서버에서 id가 필수 파라미터일 수 있음)
        if (!userId) {
          setPosts([]);
          setLoading(false);
          return;
        }
        
        const token = localStorage.getItem("accessToken");
        const url = `${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-post-like?id=${userId}`;
        
        const response = await fetch(url, {
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
          method: "GET",
          credentials: "include"
        });
        
        if (!response.ok) {
          throw new Error('좋아요 게시글 조회 실패');
        }
        
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          const formattedPosts = result.data.map((post) => ({
            id: post.id,
            type: categoryMap[post.somCategory] || post.somCategory,
            title: post.postTitle,
            date: formatDate(post.postCreateAt),
            createAt: post.postCreateAt, // 정렬용 원본 날짜 저장
          }));
          // 최신순 정렬 (postCreateAt 기준 내림차순)
          const sortedPosts = formattedPosts.sort((a, b) => {
            const dateA = a.createAt ? new Date(a.createAt) : new Date(0);
            const dateB = b.createAt ? new Date(b.createAt) : new Date(0);
            return dateB - dateA; // 최신순 (내림차순)
          });
          setPosts(sortedPosts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('좋아요 게시글 조회 오류:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/delete-post-like?id=${postId}`, {
        method: 'DELETE',
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('좋아요 취소 실패');
      }

      // 성공적으로 삭제되면 목록에서 해당 게시글 제거
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('좋아요 취소 오류:', error);
      openModal({
        title: "취소 실패",
        message: "좋아요 취소에 실패했습니다.",
        confirmText: "확인",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <S.ListHeader>좋아요(0개)</S.ListHeader>
        <div>로딩 중...</div>
      </div>
    );
  }

  // 페이지네이션된 데이터 계산
  const totalPages = Math.max(1, Math.ceil(posts.length / itemsPerPage));
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <div>
      <S.ListHeader>좋아요({posts.length}개)</S.ListHeader>
      
      {posts.length === 0 ? (
        <div>좋아요한 글이 없습니다.</div>
      ) : (
        <>
          <S.ListContainer>
            {paginatedPosts.map((post, index) => (
              <S.ListItem 
                key={post.id || index}
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
                      title: "좋아요 취소",
                      message: "정말 좋아요를 취소하시겠습니까?",
                      confirmText: "확인",
                      cancelText: "닫기",
                      onConfirm: () => handleDelete(post.id),
                    });
                  }}
                >
                  삭제
                </S.DeleteButton>
              </S.ListItem>
            ))}
          </S.ListContainer>

          <Pagination 
            totalPages={totalPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </>
      )}
    </div>
  );
};

export default MyPostLikeContainer;
