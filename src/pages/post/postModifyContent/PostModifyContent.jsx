import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import { useModal } from "../../../components/modal";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const MAX_LENGTH = 1000;

const categoryMap = {
  study: "학습",
  health: "건강",
  social: "소셜",
  hobby: "취미",
  life: "생활",
  rookie: "루키",
};

const PostModifyContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const editorRef = useRef();

  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [joinedCategories, setJoinedCategories] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 로그인 체크
  useEffect(() => {
    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요한 기능입니다",
        message: "게시글 수정은 로그인 후 이용 가능합니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/post/all"),
      });
    }
  }, [isLogin, currentUser, navigate, openModal]);

  // 🔥 이미지 업로드 (Markdown 기반)
  const handleImageUpload = async (blob, callback) => {
    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;

      const form = new FormData();
      const now = new Date();
      const folder = `post/${now.getFullYear()}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;

      form.append("file", blob);
      form.append("folder", folder);

      const uploadRes = await fetch(`${BASE_URL}/file/upload-image`, {
        method: "POST",
        body: form,
      });

      if (!uploadRes.ok) throw new Error("이미지 서버 업로드 실패");

      const uploadJson = await uploadRes.json();
      const imgUrl = uploadJson.url;

      // 📌 Markdown 모드 공식 콜백 방식
      callback(imgUrl, "image");

    } catch (err) {
      console.error(err);
      callback(URL.createObjectURL(blob), "image");
    }
  };

  // 🔥 기존 게시글 불러오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BACKEND_URL;

        const res = await fetch(`${BASE_URL}/private/post/modify/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) throw new Error(res.status);

        const result = await res.json();
        const post = result.data;

        setTitle(post.postTitle || "");
        setCategory(post.somId?.toString() || "");

        // 에디터 초기 세팅
        setTimeout(() => {
          if (editorRef.current) {
            const ins = editorRef.current.getInstance();
            ins.setMarkdown(post.postContent || "");
            setCharCount(ins.getMarkdown().trim().length);
          }
        }, 150);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
        openModal({
          title: "게시글 불러오기 실패",
          message: "문제가 발생했습니다.",
          confirmText: "확인",
          onConfirm: () => navigate("/main/post/all"),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id, navigate, openModal]);

  // 🔥 참여 중 솜 목록 (카테고리)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BACKEND_URL;

        const res = await fetch(`${BASE_URL}/private/post/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) throw new Error("카테고리 불러오기 실패");

        const data = await res.json();
        setJoinedCategories(data);
      } catch (err) {
        console.error("카테고리 목록 불러오기 실패", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔥 글자 수 카운트
  useEffect(() => {
    const ins = editorRef.current?.getInstance();
    if (!ins) return;

    const handleChange = () => {
      const text = ins.getMarkdown();
      const len = text.trim().length;

      if (len > MAX_LENGTH) {
        ins.setMarkdown(text.substring(0, MAX_LENGTH));
        setCharCount(MAX_LENGTH);
      } else {
        setCharCount(len);
      }
    };

    ins.on("change", handleChange);
    return () => ins.off("change", handleChange);
  }, []);

  // 🔥 수정 저장
  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = editorRef.current.getInstance().getMarkdown().trim();

    if (!title.trim()) {
      return openModal({ title: "제목을 입력해주세요", confirmText: "확인" });
    }
    if (!content.trim()) {
      return openModal({ title: "내용을 입력해주세요", confirmText: "확인" });
    }

    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;

      const res = await fetch(`${BASE_URL}/private/post/modify/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          postTitle: title,
          somId: parseInt(category),
          postContent: content, // ← Markdown 저장
          memberId: currentUser.id,
        }),
      });

      const result = await res.json();

      openModal({
        title: "수정 완료",
        message: result.message || "게시글이 수정되었습니다.",
        confirmText: "확인",
        onConfirm: () => navigate(`/main/post/read/${id}`),
      });
    } catch (err) {
      console.error("수정 실패", err);
      openModal({ title: "수정 실패", confirmText: "확인" });
    }
  };

  const handleCancel = () =>
    openModal({
      title: "수정 취소",
      message: "작성 중인 내용이 사라집니다.",
      confirmText: "이동",
      cancelText: "취소",
      onConfirm: () => navigate("/main/post/all"),
    });

  if (loading) return <S.Container>로딩 중...</S.Container>;

  return (
    <S.Container>
      <S.PageTitle>오늘의 솜 수정</S.PageTitle>

      <S.Form onSubmit={handleSubmit}>
        <S.FormRow>
          <label>제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.FormRow>

        <S.FormRow>
          <label>카테고리</label>
          <select value={category} disabled>
            {joinedCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {categoryMap[cat.somCategory] || cat.somCategory}
                {" - "}
                {cat.somTitle}
                {" (도전 " + cat.somDayDiff + "일차)"}
              </option>
            ))}
          </select>
        </S.FormRow>

        <S.FormGroup>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
            placeholder="수정할 내용을 자유롭게 입력해주세요"
            useCommandShortcut={true}
            hooks={{ addImageBlobHook: handleImageUpload }}
          />
          <div className="char-count">{charCount}/{MAX_LENGTH}</div>
        </S.FormGroup>

        <S.ButtonBox>
          <button type="button" className="cancel" onClick={handleCancel}>
            취소
          </button>
          <button type="submit" className="submit">
            수정 완료
          </button>
        </S.ButtonBox>
      </S.Form>
    </S.Container>
  );
};

export default PostModifyContent;
