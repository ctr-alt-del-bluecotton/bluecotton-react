import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./style";

const UserManagementContainer = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [members, setMembers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedMember, setSelectedMember] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMembers = members.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(members.length / itemsPerPage);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortById = () => {
  const sorted = [...members].sort((a, b) => {
    
    return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
  });

  setMembers(sorted);

  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};


  const loadMembers = async (type = "all", term = "") => {
    try {
      setLoading(true);
      setError(null);

      const BASE_URL = process.env.REACT_APP_BACKEND_URL;

      let url = `${BASE_URL}/admin/members/all`;
      const params = new URLSearchParams();

      if (type === "social" && term) {
        url = `${BASE_URL}/admin/members/social`;
        params.append("memberSocialProvider", term);
      } else if (type === "rank" && term) {
        url = `${BASE_URL}/admin/members/rank`;
        params.append("memberRank", term);
      } else if (type === "candy" && term) {
        url = `${BASE_URL}/admin/members/candy`;
        params.append("memberCandy", term);
      } else {
        url = `${BASE_URL}/admin/members/all`;
      }

      const finalUrl =
        params.toString().length > 0 ? `${url}?${params.toString()}` : url;

      const res = await fetch(finalUrl);

      if (!res.ok) {
        throw new Error("서버 오류 발생");
      }

      const result = await res.json();
      const list = result.data || [];

      const mapped = list.map((m) => ({
        id: m.id,
        email: m.memberEmail,
        nickname: m.memberNickname,
        rank: m.memberRank,
        address: m.memberAddress,
        social: m.memberSocialProvider || m.memberProvider || null,
        candy: m.memberCandy,
      }));

      setMembers(mapped);
      setCurrentPage(1); 
    } catch (err) {
      console.error(err);
      setError("사용자 목록 불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers("all", "");
  }, []);

  const handleShowDetail = (member) => {
    setSelectedMember(member);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedMember(null);
  };

  const getPlaceholder = () => {
    switch (filterType) {
      case "rank":
        return "등급으로 검색 (예: rookie, silver...)";
      case "candy":
        return "캔디로 검색 (예: 100, 500...)";
      case "social":
        return "소셜 로그인 (예: KAKAO, GOOGLE...)";
      case "all":
      default:
        return "이메일 또는 닉네임으로 검색 (전체 조회)";
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const handleSearch = () => {
    loadMembers(filterType, searchTerm);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate("/main/manager")}>
            ← 뒤로가기
          </S.BackButton>
          <S.Title>사용자 관리</S.Title>
          <S.Subtitle>전체 사용자 목록 및 관리</S.Subtitle>
        </S.Header>

        <S.ContentSection>
          {loading && <p>사용자 목록을 불러오는 중입니다...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <S.FilterBar>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                marginRight: "8px",
                fontSize: "14px",
                border: "1px solid #0015FF", 
                cursor: "pointer",
              }}
            >
              <option value="all">전체</option>
              <option value="rank">등급</option>
              <option value="candy">캔디</option>
              <option value="social">소셜 로그인</option>
            </select>

            <S.SearchInput
              type="text"
              placeholder={getPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown} 
            />
            <S.SecondaryButton
              style={{ marginLeft: "8px", padding: "7px 18px", marginTop: "12px" }}
              onClick={handleSearch} 
            >
              검색
            </S.SecondaryButton>
          </S.FilterBar>
          <S.Table>
            <S.TableHeader onClick={handleSortById}>
              <S.TableRow>
                <S.TableHeaderCell>ID {sortOrder === "asc" ? "🔺" : "🔻"}</S.TableHeaderCell>
                <S.TableHeaderCell>이메일</S.TableHeaderCell>
                <S.TableHeaderCell>소셜 로그인</S.TableHeaderCell>
                <S.TableHeaderCell>닉네임</S.TableHeaderCell>
                <S.TableHeaderCell>등급</S.TableHeaderCell>
                <S.TableHeaderCell>캔디</S.TableHeaderCell>
                <S.TableHeaderCell>주소</S.TableHeaderCell>
                <S.TableHeaderCell>관리</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <tbody>
              {currentMembers.map((m) => (
                <S.TableRow key={m.id}>
                  <S.TableCell style={{ textAlign: "center" }}>{m.id}</S.TableCell>
                  <S.TableCell style={{ textAlign: "center" }}>
                    {m.email}
                  </S.TableCell>
                  <S.TableCell style={{ textAlign: "center" }}>
                    {m.social || "없음"}
                  </S.TableCell>
                  <S.TableCell style={{ textAlign: "center" }}>
                    {m.nickname}
                  </S.TableCell>
                  <S.TableCell style={{ textAlign: "center" }}>
                    {m.rank}
                  </S.TableCell>
                  <S.TableCell style={{ textAlign: "center" }}>
                    {m.candy ?? 0}
                  </S.TableCell>
                  <S.TableCell style={{ textAlign: "center" }}>
                    {m.address}
                  </S.TableCell>
                  <S.TableCell>
                      <S.SecondaryButton
                        onClick={() => handleShowDetail(m)}
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        상세
                      </S.SecondaryButton>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
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
        {isDetailOpen && selectedMember && (
          <S.ModalOverlay onClick={handleCloseDetail}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <S.ModalHeader>
                <S.DetailTitle>사용자 상세 정보</S.DetailTitle>
                <S.ModalClose onClick={handleCloseDetail}>×</S.ModalClose>
              </S.ModalHeader>

              <S.ModalBody>
                <S.DetailGrid>
                  <S.DetailRow>
                    <S.DetailLabel>ID</S.DetailLabel>
                    <S.DetailValue>{selectedMember.id}</S.DetailValue>
                  </S.DetailRow>

                  <S.DetailRow>
                    <S.DetailLabel>이메일</S.DetailLabel>
                    <S.DetailValue>{selectedMember.email}</S.DetailValue>
                  </S.DetailRow>

                  <S.DetailRow>
                    <S.DetailLabel>소셜 로그인</S.DetailLabel>
                    <S.DetailValue>
                      {selectedMember.social || "없음"}
                    </S.DetailValue>
                  </S.DetailRow>

                  <S.DetailRow>
                    <S.DetailLabel>닉네임</S.DetailLabel>
                    <S.DetailValue>{selectedMember.nickname}</S.DetailValue>
                  </S.DetailRow>

                  <S.DetailRow>
                    <S.DetailLabel>등급</S.DetailLabel>
                    <S.DetailValue>{selectedMember.rank}</S.DetailValue>
                  </S.DetailRow>

                  <S.DetailRow>
                    <S.DetailLabel>캔디</S.DetailLabel>
                    <S.DetailValue>{selectedMember.candy ?? 0}</S.DetailValue>
                  </S.DetailRow>

                  <S.DetailRow>
                    <S.DetailLabel>주소</S.DetailLabel>
                    <S.DetailValue>
                      {selectedMember.address || "-"}
                    </S.DetailValue>
                  </S.DetailRow>
                </S.DetailGrid>
              </S.ModalBody>
            </S.ModalContent>
          </S.ModalOverlay>
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default UserManagementContainer;
