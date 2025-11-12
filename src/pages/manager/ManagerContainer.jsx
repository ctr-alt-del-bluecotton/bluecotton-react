import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

// 매니저 페이지 주소
export const MANAGER_PAGE_PATH = '/main/manager';

const ManagerContainer = () => {
  const navigate = useNavigate();
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

        {/* 빠른 작업 섹션 */}
        <S.QuickActionSection>
          <S.QuickActionTitle>빠른 작업</S.QuickActionTitle>
          <S.QuickActionGrid>
            <S.QuickActionCard onClick={() => navigate('/main/manager/users')}>
              <S.QuickActionIcon>👥</S.QuickActionIcon>
              <S.QuickActionLabel>사용자 관리</S.QuickActionLabel>
              <S.QuickActionDesc>전체 사용자 조회 및 관리</S.QuickActionDesc>
            </S.QuickActionCard>
            <S.QuickActionCard onClick={() => navigate('/main/manager/soms')}>
              <S.QuickActionIcon>🎯</S.QuickActionIcon>
              <S.QuickActionLabel>솜 관리</S.QuickActionLabel>
              <S.QuickActionDesc>솜 목록 및 상태 관리</S.QuickActionDesc>
            </S.QuickActionCard>
            <S.QuickActionCard onClick={() => navigate('/main/manager/posts')}>
              <S.QuickActionIcon>📝</S.QuickActionIcon>
              <S.QuickActionLabel>게시글 관리</S.QuickActionLabel>
              <S.QuickActionDesc>게시글 조회 및 삭제</S.QuickActionDesc>
            </S.QuickActionCard>
            <S.QuickActionCard onClick={() => navigate('/main/manager/orders')}>
              <S.QuickActionIcon>🛒</S.QuickActionIcon>
              <S.QuickActionLabel>주문 관리</S.QuickActionLabel>
              <S.QuickActionDesc>주문 및 상품 관리</S.QuickActionDesc>
            </S.QuickActionCard>
          </S.QuickActionGrid>
        </S.QuickActionSection>

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

              

      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default ManagerContainer;

