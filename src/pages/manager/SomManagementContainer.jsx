import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

const SomManagementContainer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // 더미 데이터
  const soms = [
    { id: 1, title: '매일 운동하기', user: 'user1', type: 'solo', status: 'active', createDate: '2024-12-01', participants: 15 },
    { id: 2, title: '책 읽기 챌린지', user: 'user2', type: 'party', status: 'active', createDate: '2024-12-05', participants: 8 },
    { id: 3, title: '물 마시기', user: 'user3', type: 'solo', status: 'inactive', createDate: '2024-11-20', participants: 0 },
    { id: 4, title: '일기 쓰기', user: 'user4', type: 'party', status: 'active', createDate: '2024-12-08', participants: 12 },
    { id: 5, title: '명상하기', user: 'user5', type: 'solo', status: 'active', createDate: '2024-12-10', participants: 5 },
  ];

  const filteredSoms = soms.filter(som => {
    const matchesSearch = som.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         som.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || som.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (somId, newStatus) => {
    console.log(`솜 ${somId} 상태 변경: ${newStatus}`);
    // TODO: API 호출
  };

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate('/main/manager')}>← 뒤로가기</S.BackButton>
          <S.Title>솜 관리</S.Title>
          <S.Subtitle>전체 솜 목록 및 관리</S.Subtitle>
        </S.Header>

        <S.ContentSection>
          <S.FilterBar>
            <S.SearchInput
              type="text"
              placeholder="솜 제목 또는 사용자로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <S.FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">전체 유형</option>
              <option value="solo">솔로</option>
              <option value="party">파티</option>
            </S.FilterSelect>
          </S.FilterBar>

          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>ID</S.TableHeaderCell>
                <S.TableHeaderCell>제목</S.TableHeaderCell>
                <S.TableHeaderCell>생성자</S.TableHeaderCell>
                <S.TableHeaderCell>유형</S.TableHeaderCell>
                <S.TableHeaderCell>참여자 수</S.TableHeaderCell>
                <S.TableHeaderCell>상태</S.TableHeaderCell>
                <S.TableHeaderCell>생성일</S.TableHeaderCell>
                <S.TableHeaderCell>작업</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <tbody>
              {filteredSoms.map((som) => (
                <S.TableRow key={som.id}>
                  <S.TableCell>{som.id}</S.TableCell>
                  <S.TableCell>{som.title}</S.TableCell>
                  <S.TableCell>{som.user}</S.TableCell>
                  <S.TableCell>{som.type === 'solo' ? '솔로' : '파티'}</S.TableCell>
                  <S.TableCell>{som.participants}명</S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status={som.status}>
                      {som.status === 'active' ? '활성' : '비활성'}
                    </S.StatusBadge>
                  </S.TableCell>
                  <S.TableCell>{som.createDate}</S.TableCell>
                  <S.TableCell>
                    <S.ButtonGroup>
                      <S.Button
                        onClick={() => handleStatusChange(som.id, som.status === 'active' ? 'inactive' : 'active')}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        {som.status === 'active' ? '비활성화' : '활성화'}
                      </S.Button>
                      <S.SecondaryButton
                        onClick={() => console.log(`솜 ${som.id} 상세보기`)}
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
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default SomManagementContainer;

