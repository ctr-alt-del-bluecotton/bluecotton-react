import React from 'react';
import { useSelector } from 'react-redux';
import S from '../style';

const MySomCandyContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const memberCandy = currentUser?.memberCandy || 0;
  
  // 숫자 포맷팅 함수 (천 단위 콤마)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <S.SummaryContainer>
        <S.SummaryCard>
          <S.SummaryLabel>적립 캔디솜</S.SummaryLabel>
          <S.SummaryValue>{formatNumber(memberCandy)} 솜</S.SummaryValue>
        </S.SummaryCard>
        <S.SummaryCard>
          <S.SummaryLabel>사용 캔디솜</S.SummaryLabel>
          <S.SummaryValue>0 솜</S.SummaryValue>
        </S.SummaryCard>
        <S.SummaryCard>
          <S.SummaryLabel>잔여 캔디솜</S.SummaryLabel>
          <S.SummaryValue>{formatNumber(memberCandy)} 솜</S.SummaryValue>
        </S.SummaryCard>
      </S.SummaryContainer>

      <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
        캔디솜 사용 내역
      </div>

      <S.CandyTable>
        <thead>
          <tr>
            <S.CandyTableHeader>구분</S.CandyTableHeader>
            <S.CandyTableHeader>날짜</S.CandyTableHeader>
            <S.CandyTableHeader>캔디</S.CandyTableHeader>
            <S.CandyTableHeader>솜</S.CandyTableHeader>
            <S.CandyTableHeader>내역</S.CandyTableHeader>
          </tr>
        </thead>
        <tbody>
          <S.TableRow>
            <S.TableCell>적립</S.TableCell>
            <S.TableCell>2025.09.19</S.TableCell>
            <S.TableCell style={{ color: '#F83BAA' }}>+100</S.TableCell>
            <S.TableCell style={{ color: '#0051FF' }}>솔로</S.TableCell>
            <S.TableCell>2km 런닝 뛰기 챌린지!! 인증 (+100 캔디)</S.TableCell>
          </S.TableRow>
          <S.TableRow>
            <S.TableCell>적립</S.TableCell>
            <S.TableCell>2025.09.19</S.TableCell>
            <S.TableCell style={{ color: '#F83BAA' }}>+500</S.TableCell>
            <S.TableCell style={{ color: '#0051FF' }}>파티</S.TableCell>
            <S.TableCell>다같이 플로깅!!! 인증 (+500 캔디)</S.TableCell>
          </S.TableRow>
          <S.TableRow>
            <S.TableCell>적립</S.TableCell>
            <S.TableCell>2025.09.19</S.TableCell>
            <S.TableCell style={{ color: '#F83BAA' }}>+500</S.TableCell>
            <S.TableCell style={{ color: '#0051FF' }}>파티</S.TableCell>
            <S.TableCell>스터디그룹 코딩!!! 인증 (+500 캔디)</S.TableCell>
          </S.TableRow>
        </tbody>
      </S.CandyTable>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px', fontSize: '16px' }}>
        <button style={{ border: 'none', background: 'none', color: '#BDBDBD', cursor: 'not-allowed' }}>
          &lt; 이전
        </button>
        <span style={{ fontWeight: '700', color: '#0051FF' }}>1</span>
        <button style={{ border: 'none', background: 'none', color: '#111111', cursor: 'pointer' }}>
          다음 &gt;
        </button>
      </div>
    </div>
  );
};

export default MySomCandyContainer;
