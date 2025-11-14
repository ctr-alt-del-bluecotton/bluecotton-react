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
  const [uploadedImagePath, setUploadedImagePath] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState(null);

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
    pictureName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!memberId) return;
    
    // 서버에서 사용자 정보 가져오기
    const fetchMemberInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/read-member?id=${memberId}`, {
            headers: { 
              "Content-Type": "application/json",
              ...(token && { "Authorization": `Bearer ${token}` })
            },
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
            address2: memberVO.memberDetailAddress || memberVO.memberAddressDetail || '',
            picturePath: memberVO.memberPicturePath || '',
            pictureName: memberVO.memberPictureName || ''
          });

          // 서버에서 받아온 프로필 이미지가 있으면 미리보기 설정
          // memberPicturePath는 이미 전체 URL (https://image-server.ideaflow.co.kr/uploads/mypage_profile/2025/11/12/)
          if (memberVO.memberPicturePath && memberVO.memberPictureName) {
            // memberPicturePath가 이미 전체 URL이므로 그대로 사용
            const imageUrl = memberVO.memberPicturePath.endsWith('/') 
              ? `${memberVO.memberPicturePath}${memberVO.memberPictureName}`
              : `${memberVO.memberPicturePath}/${memberVO.memberPictureName}`;
            console.log("[DEBUG] 서버에서 받아온 이미지 URL:", imageUrl);
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
    try {
      const result = await uploadImageToServer(file ,"mypage_profile");
      console.log("[DEBUG] Image uploaded - 전체 응답:", result);

      // 응답 데이터 추출 (다양한 형식 지원)
      let data = null;
      if (result?.data) {
        data = result.data;
      } else if (result?.url) {
        data = result.url;
      } else if (typeof result === 'string') {
        data = result;
      } else {
        data = result;
      }
      
      console.log("[DEBUG] 파싱된 데이터:", data);

      // 이미지 경로와 파일명 추출
      // memberPicturePath: https://image-server.ideaflow.co.kr/uploads/mypage_profile/2025/11/12/
      // memberPictureName: 파일명.png
      let imagePath = '';
      let imageName = '';
      let fullImageUrl = '';

      // 1. 객체 형태로 imagePath와 imageName이 분리되어 있는 경우
      if (data && typeof data === 'object' && data.imagePath) {
        imagePath = data.imagePath;
        imageName = data.imageName || '';
        console.log("[DEBUG] 객체 형태 - imagePath:", imagePath, "imageName:", imageName);
      } 
      // 2. 객체 형태로 path와 name이 있는 경우
      else if (data && typeof data === 'object' && data.path) {
        imagePath = data.path;
        imageName = data.name || '';
        console.log("[DEBUG] 객체 형태 - path:", imagePath, "name:", imageName);
      }
      // 3. 객체 형태로 url이 있는 경우
      else if (data && typeof data === 'object' && data.url) {
        fullImageUrl = data.url;
        console.log("[DEBUG] 객체 형태 - url:", fullImageUrl);
      }
      // 4. 문자열로 전체 URL이 반환된 경우
      else if (typeof data === 'string' && data.startsWith('http')) {
        fullImageUrl = data;
        console.log("[DEBUG] 문자열 URL:", fullImageUrl);
      }
      // 5. 문자열이지만 상대 경로인 경우
      else if (typeof data === 'string') {
        // 상대 경로를 전체 URL로 변환
        if (data.startsWith('/')) {
          fullImageUrl = `https://image-server.ideaflow.co.kr${data}`;
        } else {
          fullImageUrl = `https://image-server.ideaflow.co.kr/uploads/mypage_profile/${data}`;
        }
        console.log("[DEBUG] 상대 경로를 전체 URL로 변환:", fullImageUrl);
      }

      // fullImageUrl이 있으면 파싱해서 경로와 파일명 분리
      if (fullImageUrl) {
        const urlParts = fullImageUrl.split('/');
        imageName = urlParts[urlParts.length - 1];
        urlParts.pop();
        // 경로만 추출 (끝에 / 포함)
        imagePath = urlParts.join('/') + '/';
        console.log("[DEBUG] URL 파싱 결과 - imagePath:", imagePath, "imageName:", imageName);
      }

      // 최종 경로와 파일명이 있는 경우에만 저장
      if (imagePath && imageName) {
        console.log("[DEBUG] 최종 저장 - imagePath:", imagePath, "imageName:", imageName);
        setUploadedImagePath(imagePath);
        setUploadedImageName(imageName);
        // formData에도 즉시 반영
        setFormData((prev) => ({
          ...prev,
          picturePath: imagePath,
          pictureName: imageName
        }));
      } else {
        console.warn("[DEBUG] 경로 또는 파일명이 없습니다. imagePath:", imagePath, "imageName:", imageName);
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      openModal({
        title: '업로드 실패',
        message: '이미지 업로드에 실패했습니다.',
        confirmText: '확인'
      });
    }
  };

  // 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 생년월일을 하나의 날짜로 합치기
      let memberBirth = null;
      if (formData.birthYear && formData.birthMonth && formData.birthDay) {
        memberBirth = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;
      }

      // 성별 변환 (male -> 남, female -> 여)
      let memberGender = '';
      if (formData.gender === 'male') {
        memberGender = '남';
      } else if (formData.gender === 'female') {
        memberGender = '여';
      }

      // 이미지 경로 설정 (새로 업로드한 이미지가 있으면 사용, 없으면 기존 값 사용)
      const finalPicturePath = uploadedImagePath || formData.picturePath || '';
      const finalPictureName = uploadedImageName || formData.pictureName || '';
      
      console.log("[DEBUG] 제출 시 이미지 경로 - finalPicturePath:", finalPicturePath, "finalPictureName:", finalPictureName);
      console.log("[DEBUG] uploadedImagePath:", uploadedImagePath, "uploadedImageName:", uploadedImageName);
      console.log("[DEBUG] formData.picturePath:", formData.picturePath, "formData.pictureName:", formData.pictureName);

      // 비밀번호 유효성 검사
      if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
        if (!formData.currentPassword) {
          openModal({
            title: '입력 오류',
            message: '현재 비밀번호를 입력해주세요.',
            confirmText: '확인'
          });
          return;
        }
        if (!formData.newPassword) {
          openModal({
            title: '입력 오류',
            message: '새 비밀번호를 입력해주세요.',
            confirmText: '확인'
          });
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          openModal({
            title: '입력 오류',
            message: '새 비밀번호가 일치하지 않습니다.',
            confirmText: '확인'
          });
          return;
        }
        if (!passwordRegex.test(formData.newPassword)) {
          openModal({
            title: '입력 오류',
            message: '비밀번호는 8자 이상, 영문/숫자/특수문자(!@#)를 포함해야 합니다.',
            confirmText: '확인'
          });
          return;
        }
      }

      // API 요청 데이터 구성
      const updateData = {
        id: parseInt(memberId),
        memberEmail: formData.email,
        memberNickname: formData.nickname,
        memberPhone: formData.phone,
        memberAddress: formData.address1,
        memberDetailAddress: formData.address2,
        memberPostcode: formData.postcode,
        memberGender: memberGender,
        memberBirth: memberBirth,
      };

      // 이미지 경로가 있는 경우에만 포함
      if (finalPicturePath && finalPictureName) {
        updateData.memberPicturePath = finalPicturePath;
        updateData.memberPictureName = finalPictureName;
        console.log('[DEBUG] 이미지 경로 포함 - memberPicturePath:', finalPicturePath, 'memberPictureName:', finalPictureName);
      } else if (finalPicturePath) {
        // 경로만 있는 경우
        updateData.memberPicturePath = finalPicturePath;
        console.log('[DEBUG] 이미지 경로만 포함 - memberPicturePath:', finalPicturePath);
      } else {
        console.log('[DEBUG] 이미지 경로 없음 - 업로드되지 않았거나 기존 값 없음');
      }

      // 비밀번호 변경이 있는 경우에만 포함
      if (formData.newPassword && formData.currentPassword) {
        updateData.memberPassword = formData.newPassword;
        // 현재 비밀번호 확인을 위한 필드 (API 스펙에 따라 조정 필요)
        updateData.currentPassword = formData.currentPassword;
      }

      console.log('[DEBUG] 최종 업데이트 데이터:', JSON.stringify(updateData, null, 2));

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        openModal({
          title: '오류',
          message: '로그인이 필요합니다.',
          confirmText: '확인'
        });
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/my-page/update-member`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '회원 정보 수정에 실패했습니다.');
      }

      const result = await response.json();
      console.log('업데이트 성공:', result);

      openModal({
        title: '회원 정보 수정',
        message: '회원정보가 수정되었습니다.',
        confirmText: '확인',
        onConfirm: () => {
          // 페이지 새로고침 또는 데이터 다시 불러오기
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('회원 정보 수정 오류:', error);
      openModal({
        title: '오류',
        message: error.message || '회원 정보 수정에 실패했습니다.',
        confirmText: '확인'
      });
    }
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
          <S.Label>비밀번호 변경</S.Label>
          <S.Input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="현재 비밀번호"
            style={{ marginBottom: '12px' }}
          />
          <S.Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="새 비밀번호 (8자 이상, 영문/숫자/특수문자 포함)"
            style={{ marginBottom: '12px' }}
          />
          <S.Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="새 비밀번호 확인"
          />
          {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
            <S.FileInfo style={{ color: '#F44336', marginTop: '8px' }}>
              비밀번호가 일치하지 않습니다.
            </S.FileInfo>
          )}
          {formData.newPassword && !passwordRegex.test(formData.newPassword) && (
            <S.FileInfo style={{ color: '#F44336', marginTop: '8px' }}>
              비밀번호는 8자 이상, 영문/숫자/특수문자(!@#)를 포함해야 합니다.
            </S.FileInfo>
          )}
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
