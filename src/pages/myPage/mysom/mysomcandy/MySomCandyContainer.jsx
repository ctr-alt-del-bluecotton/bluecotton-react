import React from 'react';
import {
  ContentTitle,
  ContentSubtitle,
  SummaryContainer,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  CandyTable,
  CandyTableHeader,
  TableCell,
  TableRow
} from '../style';

const MySomCandyContainer = () => {
  return (
    <div>
      <ContentTitle>캔디 현황이 궁금하세요?</ContentTitle>
      <ContentSubtitle>캔디 현황을 확인할 수 있어요.</ContentSubtitle>
      
      <SummaryContainer>
        <SummaryCard>
          <SummaryLabel>적립 캔디솜</SummaryLabel>
          <SummaryValue>2,500 솜</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>사용 캔디솜</SummaryLabel>
          <SummaryValue>0 솜</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>잔여 캔디솜</SummaryLabel>
          <SummaryValue>2,500 솜</SummaryValue>
        </SummaryCard>
      </SummaryContainer>

      <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
        캔디솜 사용 내역
      </div>

      <CandyTable>
        <thead>
          <tr>
            <CandyTableHeader>구분</CandyTableHeader>
            <CandyTableHeader>날짜</CandyTableHeader>
            <CandyTableHeader>캔디</CandyTableHeader>
            <CandyTableHeader>솜</CandyTableHeader>
            <CandyTableHeader>내역</CandyTableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableCell>적립</TableCell>
            <TableCell>2025.09.19</TableCell>
            <TableCell style={{ color: '#F83BAA' }}>+100</TableCell>
            <TableCell style={{ color: '#0051FF' }}>솔로</TableCell>
            <TableCell>2km 런닝 뛰기 챌린지!! 인증 (+100 캔디)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>적립</TableCell>
            <TableCell>2025.09.19</TableCell>
            <TableCell style={{ color: '#F83BAA' }}>+500</TableCell>
            <TableCell style={{ color: '#0051FF' }}>파티</TableCell>
            <TableCell>다같이 플로깅!!! 인증 (+500 캔디)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>적립</TableCell>
            <TableCell>2025.09.19</TableCell>
            <TableCell style={{ color: '#F83BAA' }}>+500</TableCell>
            <TableCell style={{ color: '#0051FF' }}>파티</TableCell>
            <TableCell>스터디그룹 코딩!!! 인증 (+500 캔디)</TableCell>
          </TableRow>
        </tbody>
      </CandyTable>

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
