import React from 'react';
import {
  ContentTitle,
  ContentSubtitle,
  StatusBox,
  StatusText,
  StatusTitle,
  StatusValue,
  StatusLabel,
  RequirementBox,
  RankTableHeader,
  InfoSection,
  InfoTitle,
  InfoList,
  BulletList,
  RankIcon
} from '../style';

const MySomRankContainer = () => {
  // 등급별 아이콘 설정
  const rankConfig = {
    rookie: { letter: 'r', color: '#00C853' },
    silver: { letter: 's', color: '#B0BEC5' },
    gold: { letter: 'g', color: '#DAB24C' },
    diamond: { letter: 'd', color: '#00E5FF' },
    master: { letter: 'm', color: '#FF1744' }
  };

  return (
    <div>
      <ContentTitle>솜 등급 현황이 궁금하세요?</ContentTitle>
      <ContentSubtitle>솜 등급 현황을 확인할 수 있어요.</ContentSubtitle>
      
      <StatusBox>
        <StatusText>
          <StatusTitle>회원 등급 현황입니다.</StatusTitle>
          <StatusValue>zl존준서 님의 등급은 Silver 입니다.</StatusValue>
          <StatusLabel>현재 기준 6솜</StatusLabel>
        </StatusText>
        <RequirementBox>
          Gold 등급이 되려면, 4 솜이 필요해요.
        </RequirementBox>
      </StatusBox>

      <RankTableHeader>회원 레벨 기준</RankTableHeader>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
        <thead>
          <tr style={{ backgroundColor: '#F9F9F9' }}>
            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>솜등급</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>필요솜</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>솔로 보너스</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>파티 보너스</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E0E0E0', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>프로필 아이콘</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Rookie</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>0솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>0%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>0%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <RankIcon $bgColor={rankConfig.rookie.color}>{rankConfig.rookie.letter}</RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Silver</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>10솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>10%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>5%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <RankIcon $bgColor={rankConfig.silver.color}>{rankConfig.silver.letter}</RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Gold</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>50솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>20%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>10%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <RankIcon $bgColor={rankConfig.gold.color}>{rankConfig.gold.letter}</RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Diamond</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>100솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>30%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>15%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <RankIcon $bgColor={rankConfig.diamond.color}>{rankConfig.diamond.letter}</RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Master</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>200솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>50%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>25%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <RankIcon $bgColor={rankConfig.master.color}>{rankConfig.master.letter}</RankIcon>
            </td>
          </tr>
        </tbody>
      </table>

      <InfoSection>
        <InfoTitle>솜 적립 방법</InfoTitle>
        <InfoList>
          <li>솔로 솜을 실천하고 사진 인증을 해주세요.</li>
          <li>파티 솜을 실천하고 사진 인증을 해주세요.</li>
          <li>이벤트에 참여하여 보너스 캔디를 받아보세요.</li>
        </InfoList>
      </InfoSection>

      <InfoSection>
        <InfoTitle>캔디 사용 방법</InfoTitle>
        <BulletList>
          <li>블루코튼 샵에서 다양한 굿즈들을 구매 할 수 있어요.</li>
        </BulletList>
      </InfoSection>
    </div>
  );
};

export default MySomRankContainer;
