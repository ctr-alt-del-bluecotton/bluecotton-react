import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

const PostManagementContainer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // 더미 데이터 - 게시글
  const posts = [
    { id: 1, title: '오늘의 솜 인증', author: 'user1', category: '인증', status: 'active', views: 120, likes: 15, createDate: '2024-12-10' },
    { id: 2, title: '솜 챌린지 후기', author: 'user2', category: '후기', status: 'active', views: 85, likes: 10, createDate: '2024-12-09' },
    { id: 3, title: '부적절한 게시글', author: 'user3', category: '질문', status: 'reported', views: 45, likes: 2, createDate: '2024-12-08' },
    { id: 4, title: '솜 추천합니다', author: 'user4', category: '추천', status: 'active', views: 200, likes: 30, createDate: '2024-12-07' },
    { id: 5, title: '도움 요청', author: 'user5', category: '질문', status: 'active', views: 60, likes: 8, createDate: '2024-12-06' },
  ];

  // 더미 데이터 - 게시물 신고
  const postReports = [
    { id: 1, postId: 3, postTitle: '부적절한 게시글', reportedUser: 'user3', reporter: 'user001', reason: '부적절한 내용', reportDate: '2024-12-10', status: 'pending' },
    { id: 2, postId: 5, postTitle: '도움 요청', reportedUser: 'user5', reporter: 'user002', reason: '스팸', reportDate: '2024-12-09', status: 'pending' },
    { id: 3, postId: 1, postTitle: '오늘의 솜 인증', reportedUser: 'user1', reporter: 'user003', reason: '저작권 침해', reportDate: '2024-12-08', status: 'resolved' },
    { id: 4, postId: 2, postTitle: '솜 챌린지 후기', reportedUser: 'user2', reporter: 'user004', reason: '욕설/비방', reportDate: '2024-12-07', status: 'resolved' },
  ];

  // 더미 데이터 - 댓글 신고
  const commentReports = [
    { id: 1, commentId: 101, postId: 1, postTitle: '오늘의 솜 인증', commentContent: '부적절한 댓글 내용...', reportedUser: 'user10', reporter: 'user005', reason: '욕설/비방', reportDate: '2024-12-10', status: 'pending' },
    { id: 2, commentId: 102, postId: 2, postTitle: '솜 챌린지 후기', commentContent: '스팸 댓글입니다', reportedUser: 'user11', reporter: 'user006', reason: '스팸', reportDate: '2024-12-09', status: 'pending' },
    { id: 3, commentId: 103, postId: 3, postTitle: '부적절한 게시글', commentContent: '부적절한 내용', reportedUser: 'user12', reporter: 'user007', reason: '부적절한 내용', reportDate: '2024-12-08', status: 'resolved' },
  ];

  // 더미 데이터 - 대댓글 신고
  const replyReports = [
    { id: 1, replyId: 201, commentId: 101, postId: 1, postTitle: '오늘의 솜 인증', replyContent: '부적절한 대댓글...', reportedUser: 'user20', reporter: 'user008', reason: '욕설/비방', reportDate: '2024-12-10', status: 'pending' },
    { id: 2, replyId: 202, commentId: 102, postId: 2, postTitle: '솜 챌린지 후기', replyContent: '스팸 대댓글', reportedUser: 'user21', reporter: 'user009', reason: '스팸', reportDate: '2024-12-09', status: 'pending' },
    { id: 3, replyId: 203, commentId: 103, postId: 3, postTitle: '부적절한 게시글', replyContent: '부적절한 대댓글 내용', reportedUser: 'user22', reporter: 'user010', reason: '부적절한 내용', reportDate: '2024-12-08', status: 'resolved' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredPostReports = postReports.filter(report => {
    const matchesSearch = report.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredCommentReports = commentReports.filter(report => {
    const matchesSearch = report.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.commentContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredReplyReports = replyReports.filter(report => {
    const matchesSearch = report.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.replyContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id, type) => {
    console.log(`${type} ${id} 삭제`);
    // TODO: API 호출
  };

  const handleReportResolve = (id, type) => {
    console.log(`${type} 신고 ${id} 처리 완료`);
    // TODO: API 호출
  };

  const handleReportReject = (id, type) => {
    console.log(`${type} 신고 ${id} 기각`);
    // TODO: API 호출
  };

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate('/main/manager')}>← 뒤로가기</S.BackButton>
          <S.Title>게시글 관리</S.Title>
          <S.Subtitle>게시글 및 신고 관리</S.Subtitle>
        </S.Header>

        <S.TabContainer>
          <S.TabButton $active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
            게시글 관리
          </S.TabButton>
          <S.TabButton $active={activeTab === 'postReports'} onClick={() => setActiveTab('postReports')}>
            게시물 신고
          </S.TabButton>
          <S.TabButton $active={activeTab === 'commentReports'} onClick={() => setActiveTab('commentReports')}>
            댓글 신고
          </S.TabButton>
          <S.TabButton $active={activeTab === 'replyReports'} onClick={() => setActiveTab('replyReports')}>
            대댓글 신고
          </S.TabButton>
        </S.TabContainer>

        {activeTab === 'posts' && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="제목 또는 작성자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">전체 카테고리</option>
                <option value="인증">인증</option>
                <option value="후기">후기</option>
                <option value="질문">질문</option>
                <option value="추천">추천</option>
              </S.FilterSelect>
              <S.FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">전체 상태</option>
                <option value="active">활성</option>
                <option value="reported">신고됨</option>
              </S.FilterSelect>
            </S.FilterBar>

          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>ID</S.TableHeaderCell>
                <S.TableHeaderCell>제목</S.TableHeaderCell>
                <S.TableHeaderCell>작성자</S.TableHeaderCell>
                <S.TableHeaderCell>카테고리</S.TableHeaderCell>
                <S.TableHeaderCell>조회수</S.TableHeaderCell>
                <S.TableHeaderCell>좋아요</S.TableHeaderCell>
                <S.TableHeaderCell>상태</S.TableHeaderCell>
                <S.TableHeaderCell>작성일</S.TableHeaderCell>
                <S.TableHeaderCell>작업</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <tbody>
              {filteredPosts.map((post) => (
                <S.TableRow key={post.id}>
                  <S.TableCell>{post.id}</S.TableCell>
                  <S.TableCell>{post.title}</S.TableCell>
                  <S.TableCell>{post.author}</S.TableCell>
                  <S.TableCell>{post.category}</S.TableCell>
                  <S.TableCell>{post.views}</S.TableCell>
                  <S.TableCell>{post.likes}</S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status={post.status}>
                      {post.status === 'active' ? '활성' : '신고됨'}
                    </S.StatusBadge>
                  </S.TableCell>
                  <S.TableCell>{post.createDate}</S.TableCell>
                  <S.TableCell>
                    <S.ButtonGroup>
                      <S.Button
                        onClick={() => console.log(`게시글 ${post.id} 상세보기`)}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        상세
                      </S.Button>
                      <S.SecondaryButton
                        onClick={() => handleDelete(post.id, '게시글')}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        삭제
                      </S.SecondaryButton>
                    </S.ButtonGroup>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </S.ContentSection>
        )}

        {activeTab === 'postReports' && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="게시글 제목, 신고자, 피신고자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>게시글 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>게시글 제목</S.TableHeaderCell>
                  <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                  <S.TableHeaderCell>신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredPostReports.map((report) => (
                  <S.TableRow key={report.id}>
                    <S.TableCell>{report.id}</S.TableCell>
                    <S.TableCell>{report.postId}</S.TableCell>
                    <S.TableCell>{report.postTitle}</S.TableCell>
                    <S.TableCell>{report.reportedUser}</S.TableCell>
                    <S.TableCell>{report.reporter}</S.TableCell>
                    <S.TableCell>{report.reason}</S.TableCell>
                    <S.TableCell>{report.reportDate}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        {report.status === 'pending' ? '대기중' : '처리완료'}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() => handleReportResolve(report.id, '게시물')}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          disabled={report.status === 'resolved'}
                        >
                          처리
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleDelete(report.postId, '게시글')}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {activeTab === 'commentReports' && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="게시글 제목, 댓글 내용, 신고자, 피신고자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>댓글 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>게시글 제목</S.TableHeaderCell>
                  <S.TableHeaderCell>댓글 내용</S.TableHeaderCell>
                  <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                  <S.TableHeaderCell>신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredCommentReports.map((report) => (
                  <S.TableRow key={report.id}>
                    <S.TableCell>{report.id}</S.TableCell>
                    <S.TableCell>{report.commentId}</S.TableCell>
                    <S.TableCell>{report.postTitle}</S.TableCell>
                    <S.TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {report.commentContent}
                    </S.TableCell>
                    <S.TableCell>{report.reportedUser}</S.TableCell>
                    <S.TableCell>{report.reporter}</S.TableCell>
                    <S.TableCell>{report.reason}</S.TableCell>
                    <S.TableCell>{report.reportDate}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        {report.status === 'pending' ? '대기중' : '처리완료'}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() => handleReportResolve(report.id, '댓글')}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          disabled={report.status === 'resolved'}
                        >
                          처리
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleDelete(report.commentId, '댓글')}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {activeTab === 'replyReports' && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="게시글 제목, 대댓글 내용, 신고자, 피신고자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>대댓글 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>댓글 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>게시글 제목</S.TableHeaderCell>
                  <S.TableHeaderCell>대댓글 내용</S.TableHeaderCell>
                  <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                  <S.TableHeaderCell>신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredReplyReports.map((report) => (
                  <S.TableRow key={report.id}>
                    <S.TableCell>{report.id}</S.TableCell>
                    <S.TableCell>{report.replyId}</S.TableCell>
                    <S.TableCell>{report.commentId}</S.TableCell>
                    <S.TableCell>{report.postTitle}</S.TableCell>
                    <S.TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {report.replyContent}
                    </S.TableCell>
                    <S.TableCell>{report.reportedUser}</S.TableCell>
                    <S.TableCell>{report.reporter}</S.TableCell>
                    <S.TableCell>{report.reason}</S.TableCell>
                    <S.TableCell>{report.reportDate}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        {report.status === 'pending' ? '대기중' : '처리완료'}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() => handleReportResolve(report.id, '대댓글')}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          disabled={report.status === 'resolved'}
                        >
                          처리
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleDelete(report.replyId, '대댓글')}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default PostManagementContainer;

