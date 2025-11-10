import React, { useState } from 'react';
import S from './style';

// 매니저 페이지 주소
export const MANAGER_PAGE_PATH = '/main/manager';

const ManagerContainer = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // 더미 데이터
  const stats = [
    { title: '전체 사용자', value: '1,234', change: '+12%' },
    { title: '활성 솜', value: '56', change: '+5%' },
    { title: '게시글', value: '890', change: '+23%' },
    { title: '주문 건수', value: '345', change: '+8%' },
  ];

  const recentActivities = [
    { id: 1, type: '사용자', action: '신규 가입', user: 'user123', time: '2분 전' },
    { id: 2, type: '솜', action: '새 솜 생성', user: 'user456', time: '15분 전' },
    { id: 3, type: '게시글', action: '새 게시글 작성', user: 'user789', time: '30분 전' },
    { id: 4, type: '주문', action: '주문 완료', user: 'user012', time: '1시간 전' },
  ];

  const reports = [
    { id: 1, type: '게시글', reason: '부적절한 내용', reporter: 'user001', reported: 'user002', time: '1시간 전', status: 'pending' },
    { id: 2, type: '댓글', reason: '욕설/비방', reporter: 'user003', reported: 'user004', time: '3시간 전', status: 'pending' },
    { id: 3, type: '사용자', reason: '스팸 계정', reporter: 'user005', reported: 'user006', time: '5시간 전', status: 'active' },
    { id: 4, type: '게시글', reason: '저작권 침해', reporter: 'user007', reported: 'user008', time: '1일 전', status: 'active' },
  ];

  const certifications = [
    { id: 1, user: 'user101', somTitle: '매일 운동하기', type: '이미지', time: '10분 전', status: 'pending' },
    { id: 2, user: 'user102', somTitle: '책 읽기 챌린지', type: '이미지', time: '30분 전', status: 'active' },
    { id: 3, user: 'user103', somTitle: '물 마시기', type: '텍스트', time: '1시간 전', status: 'active' },
    { id: 4, user: 'user104', somTitle: '일기 쓰기', type: '이미지', time: '2시간 전', status: 'pending' },
  ];

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.Title>관리자 페이지</S.Title>
          <S.Subtitle>시스템 관리 및 모니터링</S.Subtitle>
        </S.Header>

        {/* 통계 섹션 */}
        <S.ContentSection>
          <S.SectionTitle>통계 현황</S.SectionTitle>
          <S.GridContainer>
            {stats.map((stat, index) => (
              <S.Card key={index}>
                <S.CardTitle>{stat.title}</S.CardTitle>
                <S.CardContent style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>
                  {stat.value}
                </S.CardContent>
                <S.CardContent style={{ color: '#0051FF' }}>
                  {stat.change}
                </S.CardContent>
              </S.Card>
            ))}
          </S.GridContainer>
        </S.ContentSection>

        {/* 최근 활동 섹션 */}
        <S.ContentSection>
          <S.SectionTitle>최근 활동</S.SectionTitle>
          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>유형</S.TableHeaderCell>
                <S.TableHeaderCell>작업</S.TableHeaderCell>
                <S.TableHeaderCell>사용자</S.TableHeaderCell>
                <S.TableHeaderCell>시간</S.TableHeaderCell>
                <S.TableHeaderCell>상태</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <tbody>
              {recentActivities.map((activity) => (
                <S.TableRow key={activity.id}>
                  <S.TableCell>{activity.type}</S.TableCell>
                  <S.TableCell>{activity.action}</S.TableCell>
                  <S.TableCell>{activity.user}</S.TableCell>
                  <S.TableCell>{activity.time}</S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status="active">활성</S.StatusBadge>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </S.ContentSection>

        {/* 신고내용 관리 섹션 */}
        <S.ContentSection>
          <S.SectionTitle>신고내용 관리</S.SectionTitle>
          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>유형</S.TableHeaderCell>
                <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                <S.TableHeaderCell>신고자</S.TableHeaderCell>
                <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                <S.TableHeaderCell>신고 시간</S.TableHeaderCell>
                <S.TableHeaderCell>처리 상태</S.TableHeaderCell>
                <S.TableHeaderCell>작업</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <tbody>
              {reports.map((report) => (
                <S.TableRow key={report.id}>
                  <S.TableCell>{report.type}</S.TableCell>
                  <S.TableCell>{report.reason}</S.TableCell>
                  <S.TableCell>{report.reporter}</S.TableCell>
                  <S.TableCell>{report.reported}</S.TableCell>
                  <S.TableCell>{report.time}</S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status={report.status}>
                      {report.status === 'pending' ? '대기중' : '처리완료'}
                    </S.StatusBadge>
                  </S.TableCell>
                  <S.TableCell>
                    <S.Button style={{ padding: '6px 12px', fontSize: '12px' }}>처리</S.Button>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </S.ContentSection>

        {/* 인증내역 관리 섹션 */}
        <S.ContentSection>
          <S.SectionTitle>인증내역 관리</S.SectionTitle>
          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>사용자</S.TableHeaderCell>
                <S.TableHeaderCell>솜 제목</S.TableHeaderCell>
                <S.TableHeaderCell>인증 유형</S.TableHeaderCell>
                <S.TableHeaderCell>인증 시간</S.TableHeaderCell>
                <S.TableHeaderCell>상태</S.TableHeaderCell>
                <S.TableHeaderCell>작업</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <tbody>
              {certifications.map((cert) => (
                <S.TableRow key={cert.id}>
                  <S.TableCell>{cert.user}</S.TableCell>
                  <S.TableCell>{cert.somTitle}</S.TableCell>
                  <S.TableCell>{cert.type}</S.TableCell>
                  <S.TableCell>{cert.time}</S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status={cert.status}>
                      {cert.status === 'pending' ? '검토중' : '승인됨'}
                    </S.StatusBadge>
                  </S.TableCell>
                  <S.TableCell>
                    <S.Button style={{ padding: '6px 12px', fontSize: '12px', marginRight: '8px' }}>승인</S.Button>
                    <S.SecondaryButton style={{ padding: '6px 12px', fontSize: '12px' }}>거부</S.SecondaryButton>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </S.ContentSection>

        {/* 액션 버튼 섹션 */}
        <S.ContentSection>
          <S.SectionTitle>빠른 작업</S.SectionTitle>
          <S.ButtonGroup>
            <S.Button>사용자 관리</S.Button>
            <S.Button>솜 관리</S.Button>
            <S.Button>상품 등록</S.Button>
            <S.SecondaryButton>게시글 관리</S.SecondaryButton>
            <S.SecondaryButton>주문 관리</S.SecondaryButton>
          </S.ButtonGroup>
        </S.ContentSection>
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default ManagerContainer;

