// src/pages/manager/user/UserManagementContainer.jsx (예시 경로)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

const UserManagementContainer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // ✅ 모달 상태
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 더미 데이터
  const users = [
    { id: 1, email: 'user1@example.com', nickname: '사용자1', rank: 'Silver', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-12-10' },
    { id: 2, email: 'user2@example.com', nickname: '사용자2', rank: 'Gold', status: 'active', joinDate: '2024-02-20', lastLogin: '2024-12-09' },
    { id: 3, email: 'user3@example.com', nickname: '사용자3', rank: 'Rookie', status: 'suspended', joinDate: '2024-03-10', lastLogin: '2024-11-20' },
    { id: 4, email: 'user4@example.com', nickname: '사용자4', rank: 'Diamond', status: 'active', joinDate: '2024-01-05', lastLogin: '2024-12-11' },
    { id: 5, email: 'user5@example.com', nickname: '사용자5', rank: 'Master', status: 'active', joinDate: '2023-12-01', lastLogin: '2024-12-11' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (userId, newStatus) => {
    console.log(`사용자 ${userId} 상태 변경: ${newStatus}`);
    // TODO: API 호출
  };

  // ✅ 상세 모달 열기
  const handleShowDetail = (user) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  // ✅ 상세 모달 닫기
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedUser(null);
  };

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate('/main/manager')}>← 뒤로가기</S.BackButton>
          <S.Title>사용자 관리</S.Title>
          <S.Subtitle>전체 사용자 목록 및 관리</S.Subtitle>
        </S.Header>

        <S.ContentSection>
          {/* 필터 영역 */}
          <S.FilterBar>
            <S.SearchInput
              type="text"
              placeholder="이메일 또는 닉네임으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <S.FilterSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">전체 상태</option>
              <option value="active">활성</option>
              <option value="suspended">정지</option>
            </S.FilterSelect>
          </S.FilterBar>

          {/* 테이블 */}
          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>ID</S.TableHeaderCell>
                <S.TableHeaderCell>이메일</S.TableHeaderCell>
                <S.TableHeaderCell>닉네임</S.TableHeaderCell>
                <S.TableHeaderCell>등급</S.TableHeaderCell>
                <S.TableHeaderCell>상태</S.TableHeaderCell>
                <S.TableHeaderCell>가입일</S.TableHeaderCell>
                <S.TableHeaderCell>최근 로그인</S.TableHeaderCell>
                <S.TableHeaderCell>작업</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <tbody>
              {filteredUsers.map((user) => (
                <S.TableRow key={user.id}>
                  <S.TableCell>{user.id}</S.TableCell>
                  <S.TableCell>{user.email}</S.TableCell>
                  <S.TableCell>{user.nickname}</S.TableCell>
                  <S.TableCell>{user.rank}</S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status={user.status}>
                      {user.status === 'active' ? '활성' : '정지'}
                    </S.StatusBadge>
                  </S.TableCell>
                  <S.TableCell>{user.joinDate}</S.TableCell>
                  <S.TableCell>{user.lastLogin}</S.TableCell>
                  <S.TableCell>
                    <S.ButtonGroup>
                      <S.Button
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.status === 'active' ? 'suspended' : 'active'
                          )
                        }
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        {user.status === 'active' ? '정지' : '해제'}
                      </S.Button>
                      <S.SecondaryButton
                        onClick={() => handleShowDetail(user)} // ✅ 모달 오픈
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        상세
                      </S.SecondaryButton>
                    </S.ButtonGroup>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </S.ContentSection>

        {/* ✅ 상세 정보 모달 */}
        {isDetailOpen && selectedUser && (
          <S.ModalOverlay onClick={handleCloseDetail}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <S.ModalHeader>
                <S.DetailTitle>사용자 상세 정보</S.DetailTitle>
                <S.ModalClose onClick={handleCloseDetail}>×</S.ModalClose>
              </S.ModalHeader>

              <S.ModalBody>
                <S.DetailGrid>
                  <S.DetailRow>
                    <S.DetailLabel>ID</S.DetailLabel>
                    <S.DetailValue>{selectedUser.id}</S.DetailValue>
                  </S.DetailRow>
                  <S.DetailRow>
                    <S.DetailLabel>이메일</S.DetailLabel>
                    <S.DetailValue>{selectedUser.email}</S.DetailValue>
                  </S.DetailRow>
                  <S.DetailRow>
                    <S.DetailLabel>닉네임</S.DetailLabel>
                    <S.DetailValue>{selectedUser.nickname}</S.DetailValue>
                  </S.DetailRow>
                  <S.DetailRow>
                    <S.DetailLabel>등급</S.DetailLabel>
                    <S.DetailValue>{selectedUser.rank}</S.DetailValue>
                  </S.DetailRow>
                  <S.DetailRow>
                    <S.DetailLabel>상태</S.DetailLabel>
                    <S.DetailValue>
                      {selectedUser.status === 'active' ? '활성' : '정지'}
                    </S.DetailValue>
                  </S.DetailRow>
                  <S.DetailRow>
                    <S.DetailLabel>가입일</S.DetailLabel>
                    <S.DetailValue>{selectedUser.joinDate}</S.DetailValue>
                  </S.DetailRow>
                  <S.DetailRow>
                    <S.DetailLabel>최근 로그인</S.DetailLabel>
                    <S.DetailValue>{selectedUser.lastLogin}</S.DetailValue>
                  </S.DetailRow>
                </S.DetailGrid>
              </S.ModalBody>
            </S.ModalContent>
          </S.ModalOverlay>
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default UserManagementContainer;
