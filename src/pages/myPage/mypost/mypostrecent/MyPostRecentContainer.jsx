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

const MyPostRecentContainer = () => {
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
        // userId가 없으면 API 호출하지 않음
        if (!userId) {
          setPosts([]);
          setLoading(false);
          return;
        }
        
        const token = localStorage.getItem("accessToken");
        const url = `${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-post-recent?id=${userId}`;
        
        const response = await fetch(url, {
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
          method: "GET"
        });
        
        if (!response.ok) {
          throw new Error('최근 본 게시글 조회 실패');
        }
        
        const result = await response.json();
        console.log('최근 본 게시글 응답:', result);
        if (result.data?.[0]) {
          console.log('첫 번째 항목 전체 필드:', Object.keys(result.data[0]));
          console.log('첫 번째 항목 상세:', JSON.stringify(result.data[0], null, 2));
        }
        
        if (result.data && Array.isArray(result.data)) {
          const formattedPosts = result.data.map((post) => {
            const createAt =
              post.postRecentCreateAt || post.postCreateAt || post.createAt || post.date;
            const formattedDate = formatDate(createAt);
          
            return {
              // 최근 본 글 기록 ID (삭제용)
              id: post.id,
          
              // 실제 게시글 ID (이동용)
              postId: post.postId || post.post_id,  // 백엔드 필드명에 맞게
          
              type: categoryMap[post.somCategory] || post.somCategory || '기타',
              title: post.postTitle || post.title || '제목 없음',
              date: formattedDate || '조회일자 없음',
              createAt,
            };
          }); 
          // 최신순 정렬 (createAt 기준 내림차순)
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
        console.error('최근 본 게시글 조회 오류:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    try {
      // userId가 없으면 삭제할 수 없음
      if (!userId) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      const token = localStorage.getItem("accessToken");
      const url = `${process.env.REACT_APP_BACKEND_URL}/private/my-page/delete-post-recent?memberId=${userId}&postId=${postId}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '최근 본 게시글 삭제 실패');
      }

      // 성공적으로 삭제되면 목록에서 해당 게시글 제거
      setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));
    } catch (error) {
      console.error('최근 본 게시글 삭제 오류:', error);
      openModal({
        title: "삭제 실패",
        message: error.message || "최근 본 게시글 삭제에 실패했습니다.",
        confirmText: "확인",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <S.ListHeader>최근에 본 글(0개)</S.ListHeader>
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
      <S.ListHeader>최근에 본 글({posts.length}개)</S.ListHeader>
      
      {posts.length === 0 ? (
        <div>최근에 본 글이 없습니다.</div>
      ) : (
        <>
          <S.ListContainer>
            {paginatedPosts.map((post, index) => (
              <S.ListItem 
                key={post.id || index}
                onClick={() => navigate(`/main/post/read/${post.postId}`)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ flex: 1 }}>
                  <S.ItemType>{post.type || '기타'}</S.ItemType>
                  <S.ItemTitle>{post.title || '제목 없음'}</S.ItemTitle>
                  <S.ItemDetails>
                    <span>조회일: {post.date || '조회일자 없음'}</span>
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
                      onConfirm: () => handleDelete(post.postId),
                    });
                  }}
                >
                  기록삭제
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

export default MyPostRecentContainer;
