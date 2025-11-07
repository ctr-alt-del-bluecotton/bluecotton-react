// eslint-disable-next-line
import "@toast-ui/editor/dist/toastui-editor.css";
import React, { useEffect, useRef } from 'react';
import { Editor } from "@toast-ui/react-editor";
import S from './style';
import { useFloatingAction } from '../../../../../../../../context/FloatingActionContext';

const FloatingSomWritePage2 = () => {
  const { register, setValue } = useFloatingAction();
  const editorRef = useRef();

  useEffect(() => {
    register("somContent", { required: true })
  }, [register])

  const handleEditorChange = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    console.log("Editor content:", content); // 디버깅용 로그 추가
    setValue("somContent", content, { shouldValidate: true }); // ✅ form 내부 값에 등록
  };

  return (
    <S.floatingFormWrap>
      <S.editerWrap>
        <Editor 
          ref={editorRef}
          initialEditType="markdown"
          placeholder="내용을 입력하세요..."
          onChange={handleEditorChange} // ✅ 미리보기 없는 글쓰기 모드
          hideModeSwitch={true}
        />
      </S.editerWrap>
      <input type="hidden" {...register("somContent", { required: true })} />
    </S.floatingFormWrap>
  );
};


export default FloatingSomWritePage2;