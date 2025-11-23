// src/pages/manager/ManagerContainer.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

export const MANAGER_PAGE_PATH = '/main/manager';
const API = process.env.REACT_APP_BACKEND_URL || '';

const ManagerContainer = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState([
    { title: '전체 사용자', value: '-', change: '' },
    { title: '활성 솜', value: '-', change: '' },
    { title: '게시글', value: '-', change: '' },
    { title: '주문 건수', value: '-', change: '' },
  ]);

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/admin/dashboard/overview`);
      if (!res.ok) {
        throw new Error(`대시보드 조회 실패: ${res.status}`);
      }

      const body = await res.json();
      const data = body.data || {};

      const {
        totalUsers = 0,
        activeSoms = 0,
        totalPosts = 0,
        totalOrders = 0,
        userChangeRate,
        somChangeRate,
        postChangeRate,
        orderChangeRate,
        recentActivities: activities = [],
      } = data;

      setStats([
        {
          title: '전체 사용자',
          value: totalUsers.toLocaleString('ko-KR'),
          change: userChangeRate != null ? `${userChangeRate}%` : '',
        },
        {
          title: '활성 솜',
          value: activeSoms.toLocaleString('ko-KR'),
          change: somChangeRate != null ? `${somChangeRate}%` : '',
        },
        {
          title: '게시글',
          value: totalPosts.toLocaleString('ko-KR'),
          change: postChangeRate != null ? `${postChangeRate}%` : '',
        },
        {
          title: '주문 건수',
          value: totalOrders.toLocaleString('ko-KR'),
          change: orderChangeRate != null ? `${orderChangeRate}%` : '',
        },
      ]);

      setRecentActivities(activities);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadgeProps = (status) => {
    const s = (status || '').toString().toUpperCase();

    if (s === 'Y' || s === 'ACTIVE') {
      return { $status: 'active', label: '활성' };
    }
    if (s === 'N' || s === 'INACTIVE') {
      return { $status: 'blocked', label: '비활성' };
    }
    return { $status: 'pending', label: '대기' };
  };

  const formatUser = (user) => {
    if (!user) return '알 수 없음';
    return user;
  };

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.Title>관리자 페이지</S.Title>
          <S.Subtitle>시스템 관리 및 모니터링</S.Subtitle>
        </S.Header>

      
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

       
        <S.ContentSection>
          <S.SectionTitle>통계 현황</S.SectionTitle>
          {loading && <div>통계를 불러오는 중입니다...</div>}
          {error && <div style={{ color: 'red' }}>에러: {error}</div>}
          {!loading && !error && (
            <S.GridContainer>
              {stats.map((stat, index) => (
                <S.Card key={index}>
                  <S.CardTitle>{stat.title}</S.CardTitle>
                  <S.CardContent style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>
                    {stat.value}개
                  </S.CardContent>
                  {stat.change && (
                    <S.CardContent style={{ color: '#0051FF' }}>
                      {stat.change}
                    </S.CardContent>
                  )}
                </S.Card>
              ))}
            </S.GridContainer>
          )}
        </S.ContentSection>
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default ManagerContainer;
