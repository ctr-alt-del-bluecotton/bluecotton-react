// eslint-disable-next-line
import "@toast-ui/editor/dist/toastui-editor.css";
import React, { useEffect, useRef } from 'react';
import { Editor } from "@toast-ui/react-editor";
import S from './style';
import { useFloatingAction } from '../../../../../../../../context/FloatingActionContext';

const FloatingSomWritePage2 = () => {
  const { register, setValue, insertImageData, uploadImageToServer, isReset } = useFloatingAction();
  const editorRef = useRef();

  useEffect(() => {
    register("somContent", { required: true })
  }, [register])

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown('');
  }, [isReset])

  const handleEditorChange = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    setValue("somContent", content, { shouldValidate: true }); // ✅ form 내부 값에 등록
  };

  const handleImageUpload = async (blob, callback) => {
    try {
      const result = await uploadImageToServer(blob, "som");
      
      if (result && result.url) {
        const cleanUrl = result.url
        .replace(/\\/g, "")           // 백슬래시 제거
        .replace(/\s+/g, "%20")       // 공백 → %20
        .replace(/([^:]\/)\/+/g, "$1"); // 중복 슬래시 제거
        callback(cleanUrl, "image");
        await insertImageData(cleanUrl);
      } else {
        throw new Error("이미지 URL이 응답에 없음");
      }
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드에 실패했습니다.");
    }
};


  return (
    <S.floatingFormWrap>
      <S.editerWrap>
        <Editor 
          ref={editorRef}
          height='calc(100% - 65px)'
          initialEditType="markdown"
          placeholder="내용을 입력하세요..."
          onChange={handleEditorChange} // ✅ 미리보기 없는 글쓰기 모드
          hideModeSwitch={true}
          hooks={{
            addImageBlobHook: handleImageUpload, // ✅ 추가 포인트
          }}
          customHTMLSanitizer={(html) => html.replace(/%20/g, ' ')} // 공백 복원
        />
      </S.editerWrap>
      <input type="hidden" {...register("somContent", { required: true })} />
    </S.floatingFormWrap>
  );
};


export default FloatingSomWritePage2;