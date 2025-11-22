// src/pages/manager/SomManagementContainer.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../components/modal/useModal";
import S from "./style";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const SomManagementContainer = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [somChecks, setSomChecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all | checked | unchecked
  const [selectedIds, setSelectedIds] = useState(new Set());

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const [sortOrder, setSortOrder] = useState("asc");

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 인증 목록 조회 (GET /admin/som/confirm)
  const fetchSomChecks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}/admin/som/confirm`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("인증 목록 조회 실패");
      }

      const json = await res.json(); // { message, data: [...] }
      const list = json.data || [];
      setSomChecks(list);
    } catch (e) {
      console.error(e);
      setError("솜 인증 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSomChecks();
  }, []);

  // 검색/필터 변경될 때 페이지 1로
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, somChecks]);

  // 🔹 Y/N 또는 boolean 둘 다 대응
  const isCheckedItem = (item) => {
    if (typeof item.somCheckIsChecked === "boolean") {
      return item.somCheckIsChecked;
    }
    if (typeof item.somCheckIsCheckedYn === "string") {
      return item.somCheckIsCheckedYn === "Y";
    }
    return false;
  };

  // 🔹 검색 + 필터링
  const filteredSomChecks = somChecks.filter((item) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      item.somTitle?.toLowerCase().includes(term) ||
      item.memberNickname?.toLowerCase().includes(term) ||
      item.somCheckContent?.toLowerCase().includes(term);

    const checked = isCheckedItem(item);

    const matchesFilter =
      filterType === "all"
        ? true
        : filterType === "checked"
        ? checked
        : !checked; // unchecked

    return matchesSearch && matchesFilter;
  });

  // 🔹 페이지네이션 계산 (filtered 기준)
  const totalPages = Math.ceil(filteredSomChecks.length / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSomChecks = filteredSomChecks.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 🔹 ID 정렬 토글
  const handleSortById = () => {
    const sorted = [...somChecks].sort((a, b) =>
      sortOrder === "asc" ? a.id - b.id : b.id - a.id
    );

    setSomChecks(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // 🔹 체크박스 단일 선택
  const handleSelect = (id, checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  // 🔹 단일 인증 처리 (PUT /admin/som/complete?id=1)
  const handleComplete = (id) => {
    openModal({
      title: "인증 처리",
      message: `해당 인증(ID: ${id})을 처리하시겠습니까?`,
      confirmText: "확인",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const url = `${BASE_URL}/admin/som/complete?id=${id}`;

          const res = await fetch(url, {
            method: "PUT",
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("단일 인증 처리 실패");
          }

          // 상태 업데이트 (해당 id만 Y로 변경)
          setSomChecks((prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    ...item,
                    somCheckIsChecked: true,
                    somCheckIsCheckedYn: "Y",
                  }
                : item
            )
          );

          // 선택 목록에서도 제거
          setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        } catch (e) {
          console.error(e);
          openModal({
            title: "오류",
            message: "인증 처리 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  // 🔹 다건 인증 처리 (PUT /admin/som/completes?somCheckIds=1&somCheckIds=2...)
  const handleBulkComplete = () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) {
      openModal({
        title: "알림",
        message: "선택된 인증이 없습니다.",
        confirmText: "확인",
      });
      return;
    }

    openModal({
      title: "다건 인증 처리",
      message: `선택한 ${ids.length}건을 모두 인증 처리하시겠습니까?`,
      confirmText: "확인",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          const params = new URLSearchParams();
          ids.forEach((id) => params.append("somCheckIds", id));

          const url = `${BASE_URL}/admin/som/completes?${params.toString()}`;

          const res = await fetch(url, {
            method: "PUT",
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("다건 인증 처리 실패");
          }

          // 상태 업데이트 (선택된 id들만 Y로 변경)
          setSomChecks((prev) =>
            prev.map((item) =>
              ids.includes(item.id)
                ? {
                    ...item,
                    somCheckIsChecked: true,
                    somCheckIsCheckedYn: "Y",
                  }
                : item
            )
          );

          // 선택 목록 초기화
          setSelectedIds(new Set());
        } catch (e) {
          console.error(e);
          openModal({
            title: "오류",
            message: "다건 인증 처리 중 오류가 발생했습니다.",
            confirmText: "확인",
          });
        }
      },
    });
  };

  // 🔹 상세 조회 (GET /admin/som/checks/{id}) + 모달 열기
  const openDetailModal = async (id) => {
    try {
      setIsDetailOpen(true);
      setDetailLoading(true);
      setDetailError(null);

      const res = await fetch(`${BASE_URL}/admin/som/checks/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("상세 조회 실패");
      }

      const json = await res.json(); // { message, data: {...} }
      setDetail(json.data);
    } catch (e) {
      console.error(e);
      setDetailError("상세 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
    setDetail(null);
    setDetailError(null);
  };

  if (loading) {
    return (
      <S.ManagerWrapper>
        <S.ManagerContainer>
          <p>로딩 중...</p>
        </S.ManagerContainer>
      </S.ManagerWrapper>
    );
  }

  if (error) {
    return (
      <S.ManagerWrapper>
        <S.ManagerContainer>
          <p>{error}</p>
        </S.ManagerContainer>
      </S.ManagerWrapper>
    );
  }

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate("/main/manager")}>
            ← 뒤로가기
          </S.BackButton>
          <S.Title>솜 인증 관리</S.Title>
          <S.Subtitle>사용자들의 솜 인증 내역을 확인하고 처리합니다.</S.Subtitle>
        </S.Header>

        <S.ContentSection>
          {/* 상단 검색/필터/다건 처리 */}
          <S.FilterBar>
            <S.SearchInput
              type="text"
              placeholder="솜 제목, 닉네임, 인증 내용으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <S.FilterSelect
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="unchecked">미인증</option>
              <option value="checked">인증 완료</option>
            </S.FilterSelect>

            <S.Button
              onClick={handleBulkComplete}
              disabled={selectedIds.size === 0}
            >
              선택 인증 처리
            </S.Button>
          </S.FilterBar>

          {/* 테이블 */}
          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>선택</S.TableHeaderCell>
                <S.TableHeaderCell
                  onClick={handleSortById}
                  style={{ cursor: "pointer" }}
                >
                  ID {sortOrder === "asc" ? "🔺" : "🔻"}
                </S.TableHeaderCell>
                <S.TableHeaderCell>솜 제목</S.TableHeaderCell>
                <S.TableHeaderCell>닉네임</S.TableHeaderCell>
                <S.TableHeaderCell>인증 내용</S.TableHeaderCell>
                <S.TableHeaderCell>상태</S.TableHeaderCell>
                <S.TableHeaderCell>작업</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>

            <tbody>
              {currentSomChecks.length === 0 ? (
                <S.TableRow>
                  <S.TableCell colSpan={7} style={{ textAlign: "center" }}>
                    조회된 인증 내역이 없습니다.
                  </S.TableCell>
                </S.TableRow>
              ) : (
                currentSomChecks.map((item, index) => {
                  const checked = isCheckedItem(item);
                  const isSelected = selectedIds.has(item.id);
                  const rowKey = item.id ?? `row-${index}`;

                  return (
                    <S.TableRow key={rowKey}>
                      <S.TableCell>
                        <input
                          type="checkbox"
                          disabled={checked}
                          checked={!checked && isSelected}
                          onChange={(e) =>
                            handleSelect(item.id, e.target.checked)
                          }
                        />
                      </S.TableCell>

                      <S.TableCell>{item.id}</S.TableCell>
                      <S.TableCell>{item.somTitle}</S.TableCell>
                      <S.TableCell>{item.memberNickname}</S.TableCell>
                      <S.TableCell>{item.somCheckContent}</S.TableCell>

                      <S.TableCell>
                        <S.StatusBadge
                          $status={checked ? "Y" : "N"}
                          style={{
                            backgroundColor: checked ? "#CCCCCC" : "#0015FF",
                            color: "#FFFFFF",
                          }}
                        >
                          {checked ? "인증 완료" : "미인증"}
                        </S.StatusBadge>
                      </S.TableCell>

                      <S.TableCell>
                        <S.ButtonGroup>
                          {!checked && (
                            <S.Button
                              onClick={() => handleComplete(item.id)}
                              style={{ padding: "6px 12px", fontSize: "12px" }}
                            >
                              인증 처리
                            </S.Button>
                          )}

                          <S.SecondaryButton
                            onClick={() => openDetailModal(item.id)}
                            style={{ padding: "3px 12px", fontSize: "12px" }}
                          >
                            상세
                          </S.SecondaryButton>
                        </S.ButtonGroup>
                      </S.TableCell>
                    </S.TableRow>
                  );
                })
              )}
            </tbody>
          </S.Table>

          {/* 🔹 UserManagement와 동일 스타일의 페이지네이션 */}
          {totalPages > 1 && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <S.SecondaryButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: "6px 10px",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                이전
              </S.SecondaryButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <S.SecondaryButton
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      padding: "6px 10px",
                      minWidth: "32px",
                      justifyContent: "center",
                      borderColor: "#E0E0E0",
                      backgroundColor:
                        page === currentPage ? "#0015FF" : "#FFFFFF",
                      color: page === currentPage ? "#FFFFFF" : "black",
                    }}
                  >
                    {page}
                  </S.SecondaryButton>
                )
              )}

              <S.SecondaryButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: "6px 10px",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                다음
              </S.SecondaryButton>
            </div>
          )}
        </S.ContentSection>
      </S.ManagerContainer>

      {/* 상세 모달 */}
      {isDetailOpen && (
        <S.ModalOverlay onClick={closeDetailModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>솜 인증 상세</S.ModalTitle>
              <S.ModalCloseButton onClick={closeDetailModal}>
                ✕
              </S.ModalCloseButton>
            </S.ModalHeader>

            {detailLoading && <p>상세 로딩 중...</p>}
            {detailError && <p>{detailError}</p>}

            {detail && !detailLoading && !detailError && (
              <>
                <S.DetailBox>
                  <p>
                    <strong>인증 ID:</strong> {detail.id}
                  </p>
                  <p>
                    <strong>닉네임:</strong> {detail.memberNickname}
                  </p>
                  <p>
                    <strong>솜 제목:</strong> {detail.somTitle}
                  </p>
                  <p>
                    <strong>인증 내용:</strong> {detail.somCheckContent}
                  </p>
                  <p>
                    <strong>상태:</strong>{" "}
                    {detail.somCheckIsChecked ? "인증 완료(Y)" : "미인증(N)"}
                  </p>
                </S.DetailBox>

                {detail.images && detail.images.length > 0 && (
                  <S.ImageGrid>
                    {detail.images.map((img, idx) => (
                      <S.ImageItem key={img.id ?? `img-${idx}`}>
                        <img
                          src={img.somCheckImagePath}
                          alt={img.somCheckImageName}
                          style={{ width: "100%", borderRadius: "8px" }}
                        />
                      </S.ImageItem>
                    ))}
                  </S.ImageGrid>
                )}
              </>
            )}
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.ManagerWrapper>
  );
};

export default SomManagementContainer;
