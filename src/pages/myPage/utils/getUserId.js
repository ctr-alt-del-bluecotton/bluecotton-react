// 사용자 ID 가져오기 함수
export const getUserId = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;
  
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/members/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      // 토큰 만료 시 refresh 시도
      const refreshResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ accessToken })
      });
      
      if (!refreshResponse.ok) return null;
      
      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      
      const retryResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/members/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${newAccessToken}`
        }
      });
      
      if (!retryResponse.ok) return null;
      const retryData = await retryResponse.json();
      return retryData.data?.id ? String(retryData.data.id) : null;
    }
    
    const data = await response.json();
    return data.data?.id ? String(data.data.id) : null;
  } catch (error) {
    console.error("사용자 ID 가져오기 실패:", error);
    return null;
  }
};

