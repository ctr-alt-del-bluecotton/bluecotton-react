import React, { useState, useRef } from 'react';
import {
  FormContainer,
  Title,
  Subtitle,
  FormSection,
  Label,
  Input,
  ButtonGroup,
  PrimaryButton,
  DateRow,
  Select,
  RadioGroup,
  RadioLabel,
  ImagePreview,
  HiddenFileInput,
  FileInfo,
  ActionButtons,
  SubmitButton,
  DeleteButton
} from './style';
import { useModal } from '../../../components/modal';

const MyInfoContainer = () => {
  const { openModal } = useModal();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    email: 'garlemy@naver.com',
    nickname: '브로콜리',
    phone: '010-8795-4379',
    birthYear: '2000',
    birthMonth: '10',
    birthDay: '21',
    gender: 'male',
    postcode: '08457',
    address1: '서울 관악구 인헌12나길 26',
    address2: '301호'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (50MB)
      if (file.size > 50 * 1024 * 1024) {
        openModal({
          title: "파일 크기 초과",
          message: "용량이 50.0M 이하 파일만 업로드 가능합니다.",
          confirmText: "확인",
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal({
      title: "회원 정보 수정",
      message: "회원정보가 수정되었습니다.",
      confirmText: "확인",
      onConfirm: () => {
        console.log('Form submitted:', formData);
        // 회원 정보 수정 로직 구현
      },
    });
  };

  const handleDeleteAccount = () => {
    openModal({
      title: "회원 탈퇴",
      message: "정말 회원을 탈퇴하시겠습니까? 탈퇴 후 모든 정보가 삭제되며 복구할 수 없습니다.",
      confirmText: "탈퇴",
      cancelText: "취소",
      // onConfirm: () => {
      //   // 회원 탈퇴 로직 구현
      // },
    });
  };

  return (
    <FormContainer>
      <Title>회원 정보를 수정하시겠어요?</Title>
      <Subtitle>회원 정보 수정 후 확인 버튼을 눌러주세요!</Subtitle>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <Label>ID (이메일)</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
        </FormSection>

        <FormSection>
          <Label>닉네임</Label>
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <Label>휴대전화</Label>
          <ButtonGroup>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </ButtonGroup>
        </FormSection>

        <FormSection>
          <Label>생년월일</Label>
          <DateRow>
            <Select name="birthYear" value={formData.birthYear} onChange={handleChange}>
              {Array.from({ length: 100 }, (_, i) => 2024 - i).map(year => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </Select>
            <Select name="birthMonth" value={formData.birthMonth} onChange={handleChange}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month.toString().padStart(2, '0')}>{month}월</option>
              ))}
            </Select>
            <Select name="birthDay" value={formData.birthDay} onChange={handleChange}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day.toString().padStart(2, '0')}>{day}일</option>
              ))}
            </Select>
          </DateRow>
        </FormSection>

        <FormSection>
          <Label>성별</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              남성
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              여성
            </RadioLabel>
          </RadioGroup>
        </FormSection>

        <FormSection>
          <Label>주소</Label>
          <div style={{ marginBottom: '8px' }}>
            <ButtonGroup>
              <Input
                type="text"
                name="postcode"
                value={formData.postcode}
                readOnly
                style={{ flex: 1 }}
              />
              <PrimaryButton type="button">우편번호 찾기</PrimaryButton>
            </ButtonGroup>
          </div>
          <Input
            type="text"
            name="address1"
            value={formData.address1}
            readOnly
            style={{ marginBottom: '8px' }}
          />
          <Input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <Label>프로필 이미지 설정</Label>
          <ImagePreview 
            onClick={handleImageClick}
            $hasImage={!!previewImage}
          >
            {previewImage ? (
              <img src={previewImage} alt="프로필 미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              '첨부'
            )}
          </ImagePreview>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <FileInfo>{selectedFile ? `선택된 파일: ${selectedFile.name}` : '선택된 파일 없음'}</FileInfo>
          <FileInfo>용량이 50.0M 이하 파일만 업로드 가능</FileInfo>
          {selectedFile && (
            <PrimaryButton type="button" onClick={() => {
              // 파일 저장 로직 구현
              console.log('파일 저장:', selectedFile);
            }}>저장</PrimaryButton>
          )}
        </FormSection>

        <ActionButtons>
          <SubmitButton type="submit">수정완료</SubmitButton>
          <DeleteButton type="button" onClick={handleDeleteAccount}>회원탈퇴</DeleteButton>
        </ActionButtons>
      </form>
    </FormContainer>
  );
};

export default MyInfoContainer;
