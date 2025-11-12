import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #757575;
  margin-bottom: 32px;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ChallengeInfoBox = styled.div`
  background-color: #F9F9F9;
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 32px;
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const ChallengeType = styled.div`
  font-size: 14px;
  color: #0051FF;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ChallengeTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 12px;
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ChallengeDetails = styled.div`
  font-size: 14px;
  color: #757575;
  line-height: 1.6;
`;

const UploadSection = styled.div`
  margin-bottom: 32px;
`;

const UploadContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const PreviewBox = styled.div`
  width: 300px;
  min-height: 300px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: 250px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PreviewPlaceholder = styled.div`
  color: #BDBDBD;
  text-align: center;
  font-size: 14px;
`;

const UploadControls = styled.div`
  flex: 1;
`;

const SectionLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 12px;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background-color: #0051FF;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #003DB8;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  font-size: 14px;
  color: #757575;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: white;
  color: #111111;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #F9F9F9;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 32px;
`;

const ContentTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 12px;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  border: 1px solid #E0E0E0;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  background-color: #F9F9F9;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    gap: 4px;
    padding: 4px;
  }
`;

const ToolbarButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #E0E0E0;
  }
  
  img {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 0 0 6px 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #0051FF;
  }
  
  &::placeholder {
    color: #BDBDBD;
  }
  
  @media (max-width: 480px) {
    min-height: 200px;
    padding: 12px;
    font-size: 14px;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #BDBDBD;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #0051FF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
  
  &:hover {
    background-color: #0040D0;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 480px) {
    padding: 14px;
    font-size: 14px;
  }
`;

  const MySomCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fileCount, setFileCount] = useState(0);
  const [textLength, setTextLength] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [somData, setSomData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 카테고리 매핑
  const categoryMap = {
    study: '학습',
    health: '건강',
    social: '소셜',
    hobby: '취미',
    'life-style': '생활',
    life: '생활',
    rookie: '루키'
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 시간 포맷팅 함수 (시:분)
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 챌린지 정보 가져오기
  useEffect(() => {
    const loadSomData = async () => {
      try {
        setLoading(true);
        
        // location state에서 챌린지 데이터 가져오기
        const stateData = location.state?.somData;
        
        if (stateData) {
          setSomData(stateData);
        } else {
          // state가 없으면 URL 파라미터나 쿼리에서 ID를 가져와서 API 호출
          const searchParams = new URLSearchParams(location.search);
          const somId = searchParams.get('id');
          
          if (somId) {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-page/read-som?id=${somId}`, {
              headers: { "Content-Type": "application/json" },
              method: "GET",
              credentials: "include"
            });

            if (res.ok) {
              const result = await res.json();
              setSomData(result.data);
            }
          }
        }
      } catch (error) {
        console.error('챌린지 정보 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSomData();
  }, [location]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setFileCount(files.length);
    
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAddFile = () => {
    document.getElementById('file-upload').click();
  };

  const handleDeleteFile = () => {
    setSelectedFiles([]);
    setFileCount(0);
    setPreviewUrl(null);
    document.getElementById('file-upload').value = '';
  };

  const handleTextChange = (e) => {
    setTextLength(e.target.value.length);
  };

  const handleSubmit = () => {
    // 인증 등록 로직
    console.log('인증 등록');
  };

  if (loading) {
    return (
      <Container>
        <div>로딩 중...</div>
      </Container>
    );
  }

  if (!somData) {
    return (
      <Container>
        <Title>오늘의 인증을 남겨보세요!</Title>
        <Subtitle>챌린지 정보를 불러올 수 없습니다.</Subtitle>
      </Container>
    );
  }

  const somType = somData.somType === 'solo' ? '솔로' : somData.somType === 'party' ? '파티' : '기타';
  const challengeTitle = somData.somTitle || '제목 없음';
  const startDate = formatDate(somData.somStartDate);
  const endDate = formatDate(somData.somEndDate);
  const startTime = formatTime(somData.somStartDate);
  const endTime = formatTime(somData.somEndDate);

  return (
    <Container>
      <Title>오늘의 인증을 남겨보세요!</Title>
      <Subtitle>나의 {somType}솜 여정을 기록해보세요</Subtitle>

      <ChallengeInfoBox>
        <ChallengeType>{categoryMap[somData.somCategory] || somData.somCategory || '기타'}</ChallengeType>
        <ChallengeTitle>{challengeTitle}</ChallengeTitle>
        <ChallengeDetails>
          <div>{startDate} {startTime} ~ {endDate} {endTime}</div>
          {somData.somRepeat && <div>{somData.somRepeat}</div>}
        </ChallengeDetails>
      </ChallengeInfoBox>

      <UploadSection>
        <SectionLabel>오늘의 인증 사진</SectionLabel>
        <UploadContainer>
          <PreviewBox>
            {previewUrl ? (
              <PreviewImage src={previewUrl} alt="미리보기" />
            ) : (
              <PreviewPlaceholder>
                이미지를 업로드해주세요
              </PreviewPlaceholder>
            )}
          </PreviewBox>
          <UploadControls>
            <FileInputLabel htmlFor="file-upload">파일 선택</FileInputLabel>
            <FileInput
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <div style={{ fontSize: '14px', color: '#BDBDBD', marginBottom: '8px' }}>
              {fileCount > 0 ? `${fileCount}개 파일 선택됨` : '선택된 파일 없음'}
            </div>
            <FileInfo>용량이 50.0M 이하 파일만 업로드 가능</FileInfo>
            <ButtonGroup>
              <ActionButton onClick={handleAddFile}>+ 파일 추가</ActionButton>
              <ActionButton onClick={handleDeleteFile}>- 파일 삭제</ActionButton>
            </ButtonGroup>
          </UploadControls>
        </UploadContainer>
      </UploadSection>

      <ContentSection>
        <ContentTitle>인증 내용 {challengeTitle}</ContentTitle>
        <Toolbar>
          <ToolbarButton title="H1">H1</ToolbarButton>
          <ToolbarButton title="H2">H2</ToolbarButton>
          <ToolbarButton title="H3">H3</ToolbarButton>
          <ToolbarButton title="H4">H4</ToolbarButton>
          <ToolbarButton title="굵게">B</ToolbarButton>
          <ToolbarButton title="기울임">I</ToolbarButton>
          <ToolbarButton title="취소선">S</ToolbarButton>
          <ToolbarButton title="왼쪽 정렬">≡</ToolbarButton>
          <ToolbarButton title="인용">"</ToolbarButton>
          <ToolbarButton title="링크">🔗</ToolbarButton>
          <ToolbarButton title="이미지">🖼</ToolbarButton>
          <ToolbarButton title="코드">&lt;/&gt;</ToolbarButton>
        </Toolbar>
        <TextArea
          placeholder="솜을 하면서 어떤 점을 느끼셨나요? 도전하는 동안 가장 기억에 남는 순간을 적어주세요"
          maxLength={1000}
          onChange={handleTextChange}
        />
        <CharCount>{textLength}/1000</CharCount>
      </ContentSection>

      <SubmitButton onClick={handleSubmit}>
        등록
      </SubmitButton>
    </Container>
  );
};

export default MySomCheck;

