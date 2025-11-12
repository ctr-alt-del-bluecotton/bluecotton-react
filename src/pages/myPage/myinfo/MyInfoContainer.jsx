import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../../components/modal';
import { openPostcode } from '../../../commons/address';
import { useForm } from 'react-hook-form';
import { getUserId } from '../utils/getUserId';
import S from './style';

const MyInfoContainer = () => {
  const { openModal } = useModal();
  const fileInputRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [memberId, setMemberId] = useState(null);
  
  // URL 쿼리 파라미터에서 id 가져오기, 없으면 사용자 ID 가져오기
  useEffect(() => {
    const fetchMemberId = async () => {
      const urlId = searchParams.get('id');
      if (urlId) {
        setMemberId(urlId);
      } else {
        const id = await getUserId();
        setMemberId(id || '1');
      }
    };
    fetchMemberId();
  }, [searchParams]);

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // LoginForm을 위한 react-hook-form 설정
  const {
    register,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting }
  } = useForm({ mode: "onChange" });

  // 이메일/비밀번호 유효성 검사
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;


  // ✅ 한 곳에서만 관리
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    phone: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
    postcode: '',
    address1: '',
    address2: '',
    picturePath: '',
    pictureName: ''
  });

  useEffect(() => {
    if (!memberId) return;
    
    // 서버에서 사용자 정보 가져오기
    const fetchMemberInfo = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-page/read-member?id=${memberId}`, {
            headers: { "Content-Type": "application/json" },
            method: "GET"
          });
    
          if (!res.ok) {
            throw new Error('회원 정보를 불러오는데 실패했습니다.');
          }
    
          const result = await res.json();
          console.log("서버 응답:", result);
    
          const memberVO = result.data;
    
          if (!memberVO) {
            console.warn("회원 정보가 존재하지 않습니다.");
            return;
          }
    
          // ✅ 생년월일 변환
          let birthYear = '';
          let birthMonth = '';
          let birthDay = '';
    
          if (memberVO.memberBirth) {
            const birthDate = new Date(memberVO.memberBirth);
            if (!isNaN(birthDate.getTime())) {
              birthYear = birthDate.getFullYear().toString();
              birthMonth = (birthDate.getMonth() + 1).toString().padStart(2, '0');
              birthDay = birthDate.getDate().toString().padStart(2, '0');
            }
          }
    
          // ✅ 성별 변환
          let gender = '';
          const memberGender = memberVO.memberGender;
          
          if (memberGender) {
            const genderUpper = String(memberGender).toUpperCase();
            const genderLower = String(memberGender).toLowerCase();
            
            if (genderUpper === 'M' || genderLower === '남' || genderUpper === 'MALE') {
              gender = 'male';
            } else if (genderUpper === 'F' || genderLower === '여' || genderUpper === 'FEMALE') {
              gender = 'female';
            }
          }

          // ✅ formData에 서버 데이터 세팅
          setFormData({
            email: memberVO.memberEmail || '',
            nickname: memberVO.memberNickName || memberVO.memberNickname || '',
            phone: memberVO.memberPhone || '',
            birthYear,
            birthMonth,
            birthDay,
            gender,
            postcode: memberVO.memberPostcode || '',
            address1: memberVO.memberAddress || '',
            address2: memberVO.memberAddressDetail || '',
            picturePath: memberVO.memberPicturePath || '',
            pictureName: memberVO.memberPictureName || ''
          });

          // 서버에서 받아온 프로필 이미지가 있으면 미리보기 설정
          if (memberVO.memberPicturePath && memberVO.memberPictureName) {
            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}${memberVO.memberPicturePath}${memberVO.memberPictureName}`;
            setPreviewImage(imageUrl);
          }
    
        } catch (error) {
          console.error('회원 정보 조회 오류:', error);
          openModal({
            title: "오류",
            message: "회원 정보를 불러오는데 실패했습니다.",
            confirmText: "확인"
          });
        }
      };
    
      fetchMemberInfo();
  }, [openModal, memberId]);

  // 우편번호 찾기 버튼 클릭 핸들러
  const handleOpenPostcode = () => {
    openPostcode(({ address, postcode }) => {
      setFormData((prev) => ({
        ...prev,
        postcode: postcode || '',
        address1: address || ''
      }));
    });
  };
  // ✅ 인풋 공통 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImageToServer = async (file, folder = 'shop') => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    

    const formData = new FormData();
    const folderPath = `${folder}/${year}/${month}/${day}`;
    formData.append('file', file);
    formData.append('folder', folderPath); 
    
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/file/upload-image`, {
        method: 'POST',
        body: formData,
    });

    return await res.json();
  }

  // 이미지 업로드
  const handleImageClick = () => fileInputRef.current?.click();
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      openModal({
        title: '파일 크기 초과',
        message: '용량이 20.0M 이하 파일만 업로드 가능합니다.',
        confirmText: '확인'
      });

      return;
    }
    const result = await uploadImageToServer(file ,"mypage_profile");
    console.log("[DEBUG] Image uploaded:", result);

    const data = result?.url ?? result;
    console.log(data)

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    openModal({
      title: '회원 정보 수정',
      message: '회원정보가 수정되었습니다.',
      confirmText: '확인',
      onConfirm: () => {
        console.log('Form submitted:', formData);
        // TODO: PUT/PATCH로 formData 전송 로직
      }
    });
  };

  const handleDeleteAccount = () => {
    openModal({
      title: '회원 탈퇴',
      message:
        '정말 회원을 탈퇴하시겠습니까? 탈퇴 후 모든 정보가 삭제되며 복구할 수 없습니다.',
      confirmText: '탈퇴',
      cancelText: '취소'
      // onConfirm: () => { ... }
    });
  };

  
  const currentYear = new Date().getFullYear();

  return (
    <S.FormContainer>
      <S.Title>회원 정보를 수정하시겠어요?</S.Title>
      <S.Subtitle>회원 정보 수정 후 확인 버튼을 눌러주세요!</S.Subtitle>

      <form onSubmit={handleSubmit}>
        <S.FormSection>
          <S.Label>ID (이메일)</S.Label>
          <S.Input
            type="email"  
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
        </S.FormSection>

        <S.FormSection>
          <S.Label>닉네임</S.Label>
          <S.Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </S.FormSection>

        <S.FormSection>
          <S.Label>휴대전화</S.Label>
          <S.ButtonGroup>
            <S.Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </S.ButtonGroup>
        </S.FormSection>

        <S.FormSection>
          <S.Label>생년월일</S.Label>
          <S.DateRow>
            <S.Select name="birthYear" value={formData.birthYear} onChange={handleChange}>
              <option value="">년도</option>
              {Array.from({ length: 100 }, (_, i) => currentYear - i).map((year) => (
                <option key={year} value={String(year)}>{year}년</option>
              ))}
            </S.Select>
            <S.Select name="birthMonth" value={formData.birthMonth} onChange={handleChange}>
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={String(m).padStart(2, '0')}>{m}월</option>
              ))}
            </S.Select>
            <S.Select name="birthDay" value={formData.birthDay} onChange={handleChange}>
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={String(d).padStart(2, '0')}>{d}일</option>
              ))}
            </S.Select>
          </S.DateRow>
        </S.FormSection>

        <S.FormSection>
          <S.Label>성별</S.Label>
          <S.RadioGroup>
            <S.RadioLabel>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              남
            </S.RadioLabel>
            <S.RadioLabel>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              여
            </S.RadioLabel>
          </S.RadioGroup>
        </S.FormSection>

        <S.FormSection>
          <S.Label>주소</S.Label>
          <div style={{ marginBottom: '8px' }}>
            <S.ButtonGroup>
              <S.Input
                type="text"
                name="postcode"
                value={formData.postcode}
                readOnly
                placeholder="우편번호"
                style={{ flex: 1 }}
              />
              <S.PrimaryButton type="button" onClick={handleOpenPostcode}>
                우편번호 찾기
              </S.PrimaryButton>
            </S.ButtonGroup>
          </div>
          <S.Input
            type="text"
            name="address1"
            value={formData.address1}
            readOnly
            placeholder="주소"
            style={{ marginBottom: '8px' }}
          />
          <S.Input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="상세주소"
          />
        </S.FormSection>

        <S.FormSection>
          <S.Label>프로필 이미지 설정</S.Label>
          <S.ImagePreview onClick={handleImageClick} $hasImage={!!previewImage}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="프로필 미리보기"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              '첨부'
            )}
          </S.ImagePreview>
          <S.HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <S.FileInfo>{selectedFile ? `선택된 파일: ${selectedFile.name}` : '선택된 파일 없음'}</S.FileInfo>
          <S.FileInfo>용량이 50.0M 이하 파일만 업로드 가능</S.FileInfo>
          {selectedFile && (
            <S.PrimaryButton
              type="button"
              onClick={() => {
                console.log('파일 저장:', selectedFile);
                // TODO: 파일 업로드 로직
              }}
            >
              저장
            </S.PrimaryButton>
          )}
        </S.FormSection>

        <S.ActionButtons>
          <S.SubmitButton type="submit">수정완료</S.SubmitButton>
          <S.DeleteButton type="button" onClick={handleDeleteAccount}>
            회원탈퇴
          </S.DeleteButton>
        </S.ActionButtons>
      </form>
    </S.FormContainer>
  );
};

export default MyInfoContainer;
