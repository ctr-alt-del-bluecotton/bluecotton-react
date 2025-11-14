import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import S from '../style';
import { useModal } from '../../../../components/modal';
import { getUserId } from '../../utils/getUserId';

const categoryMap = {
  life: '생활',
  health: '건강',
  study: '학습',
  social: '소셜',
  hobby: '취미',
  rookie: '루키',
};

const MyPostCommnetContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

    const fetchComments = async () => {
      try {
        setLoading(true);
        // userId가 없으면 API 호출하지 않음 (서버에서 id가 필수 파라미터일 수 있음)
        if (!userId) {
          setComments([]);
          setLoading(false);
          return;
        }
        
        const token = localStorage.getItem("accessToken");
        const url = `${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-post-comment?id=${userId}`;
        
        const response = await fetch(url, {
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
          method: "GET",
          credentials: "include"
        });
        
        if (!response.ok) {
          throw new Error('댓글 조회 실패');
        }
        
        const result = await response.json();
        console.log('댓글 응답:', result);
        
        if (result.data && Array.isArray(result.data)) {
          const formattedComments = result.data.map((item) => ({
            commentId: item.commentId,
            replyId: item.replyId,
            postId: item.postId,
            type: categoryMap[item.somCategory] || item.somCategory || '기타',
            title: item.postTitle || '',
            // 댓글인지 대댓글인지에 따라 내용과 날짜 선택
            content: item.replyId ? (item.postReplyContent || '') : (item.postCommentContent || ''),
            date: formatDate(item.replyId ? item.postReplyCreateAt : item.postCommentCreateAt),
            isReply: item.replyId !== null, // 대댓글 여부
          }));
          setComments(formattedComments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error('댓글 조회 오류:', error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [userId]);

  const handleDelete = async (commentId, replyId, isReply) => {
    try {
      let url;
      let deleteId;
      
      // 대댓글인 경우와 댓글인 경우 다른 엔드포인트 사용
      const token = localStorage.getItem("accessToken");
      if (isReply && replyId) {
        // 대댓글 삭제
        url = `${process.env.REACT_APP_BACKEND_URL}/private/my-page/delete-post-reply?id=${replyId}`;
        deleteId = replyId;
      } else {
        // 댓글 삭제
        url = `${process.env.REACT_APP_BACKEND_URL}/private/my-page/delete-post-comment?id=${commentId}`;
        deleteId = commentId;
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error(isReply ? '대댓글 삭제 실패' : '댓글 삭제 실패');
      }

      // 성공적으로 삭제되면 목록에서 해당 댓글/대댓글 제거
      setComments(prevComments => 
        prevComments.filter(comment => {
          if (isReply) {
            return comment.replyId !== deleteId;
          } else {
            return comment.commentId !== deleteId;
          }
        })
      );
    } catch (error) {
      console.error('삭제 오류:', error);
      openModal({
        title: "삭제 실패",
        message: `${isReply ? '대댓글' : '댓글'} 삭제에 실패했습니다.`,
        confirmText: "확인",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <S.ListHeader>댓글 단 글(0개)</S.ListHeader>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
      <S.ListHeader>댓글 단 글({comments.length}개)</S.ListHeader>
      
      {comments.length === 0 ? (
        <div>댓글 단 글이 없습니다.</div>
      ) : (
        <>
          <S.ListContainer>
            {comments.map((comment, index) => (
              <S.ListItem 
                key={`${comment.commentId}-${comment.replyId || 'comment'}-${index}`}
                onClick={() => navigate(`/main/post/read/${comment.postId}`)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ flex: 1 }}>
                  <S.ItemType>{comment.type}</S.ItemType>
                  <S.ItemTitle>
                    {comment.isReply ? ' ' : ''}{comment.title}
                  </S.ItemTitle>
                  {comment.content && (
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#666', 
                      marginTop: '8px',
                      marginBottom: '8px',
                      lineHeight: '1.5',
                      wordBreak: 'break-word'
                    }}>
                      {comment.content}
                    </div>
                  )}
                  <S.ItemDetails>
                    <span>{comment.isReply ? '대댓글' : '댓글'} · {comment.date}</span>
                  </S.ItemDetails>
                </div>
                <S.DeleteButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal({
                      title: "댓글 삭제",
                      message: `정말 이 ${comment.isReply ? '대댓글' : '댓글'}을 삭제하시겠습니까?`,
                      confirmText: "삭제",
                      cancelText: "취소",
                      onConfirm: () => handleDelete(comment.commentId, comment.replyId, comment.isReply),
                    });
                  }}
                >
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
        </>
      )}
    </div>
  );
};

export default MyPostCommnetContainer;
