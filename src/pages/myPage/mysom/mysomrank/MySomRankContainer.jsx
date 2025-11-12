import React from 'react';
import { useSelector } from 'react-redux';
import S from '../style';

const MySomRankContainer = () => {
  // Redux에서 사용자 정보 가져오기
  const user = useSelector((state) => state.user);
  const currentUser = user?.currentUser || {};
  
  // Redux 정보 콘솔 출력
  console.log('Redux User 정보:', user);
  console.log('Redux CurrentUser 정보:', currentUser);

  // 등급별 아이콘 설정
  const rankConfig = {
    rookie: { letter: 'R', color: '#00C853' },
    silver: { letter: 'S', color: '#B0BEC5' },
    gold: { letter: 'G', color: '#DAB24C' },
    diamond: { letter: 'D', color: '#00E5FF' },
    master: { letter: 'M', color: '#FF1744' }
  };

  // 사용자 이름 (닉네임 우선, 없으면 이름)
  const userName = currentUser?.memberNickname || currentUser?.memberName || '회원';
  
  // 등급 정보 (실제 API에서 가져와야 할 정보)
  const userRank = currentUser?.memberRank || 'Silver';
  const userSom = currentUser?.memberCandy || 0;

  // 다음 등급까지 필요한 솜 계산
  const getNextRankRequirement = (currentRank, currentSom) => {
    const rankRequirements = {
      rookie: { next: 'Silver', required: 10 },
      silver: { next: 'Gold', required: 50 },
      gold: { next: 'Diamond', required: 100 },
      diamond: { next: 'Master', required: 200 },
      master: { next: null, required: 0 }
    };
    
    const requirement = rankRequirements[currentRank.toLowerCase()] || rankRequirements.silver;
    if (requirement.next) {
      const needed = requirement.required - currentSom;
      return { next: requirement.next, needed: needed > 0 ? needed : 0 };
    }
    return null;
  };

  const nextRankInfo = getNextRankRequirement(userRank, userSom);

  return (
    <div>
      <S.StatusBox>
        <S.StatusText>
          <S.StatusTitle>회원 등급 현황입니다.</S.StatusTitle>
          <S.StatusValue>{userName} 님의 등급은 {userRank} 입니다.</S.StatusValue>
          <S.StatusLabel>현재 기준 {userSom}솜</S.StatusLabel>
        </S.StatusText>
        {nextRankInfo && (
          <S.RequirementBox>
            {nextRankInfo.next} 등급이 되려면, {nextRankInfo.needed} 솜이 필요해요.
          </S.RequirementBox>
        )}
      </S.StatusBox>

      <S.RankTableHeader>회원 레벨 기준</S.RankTableHeader>
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
              <S.RankIcon $bgColor={rankConfig.rookie.color}>{rankConfig.rookie.letter}</S.RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Silver</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>10솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>10%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>5%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <S.RankIcon $bgColor={rankConfig.silver.color}>{rankConfig.silver.letter}</S.RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Gold</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>50솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>20%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>10%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <S.RankIcon $bgColor={rankConfig.gold.color}>{rankConfig.gold.letter}</S.RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Diamond</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>100솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>30%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>15%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <S.RankIcon $bgColor={rankConfig.diamond.color}>{rankConfig.diamond.letter}</S.RankIcon>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>Master</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>200솜</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>50%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>25%</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #E0E0E0' }}>
              <S.RankIcon $bgColor={rankConfig.master.color}>{rankConfig.master.letter}</S.RankIcon>
            </td>
          </tr>
        </tbody>
      </table>

      <S.InfoSection>
        <S.InfoTitle>솜 적립 방법</S.InfoTitle>
        <S.InfoList>
          <li>솔로 솜을 실천하고 사진 인증을 해주세요.</li>
          <li>파티 솜을 실천하고 사진 인증을 해주세요.</li>
          <li>이벤트에 참여하여 보너스 캔디를 받아보세요.</li>
        </S.InfoList>
      </S.InfoSection>

      <S.InfoSection>
        <S.InfoTitle>캔디 사용 방법</S.InfoTitle>
        <S.BulletList>
          <li>블루코튼 샵에서 다양한 굿즈들을 구매 할 수 있어요.</li>
        </S.BulletList>
      </S.InfoSection>
    </div>
  );
};

export default MySomRankContainer;
