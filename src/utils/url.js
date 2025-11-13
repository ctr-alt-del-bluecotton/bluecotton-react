export const resolveUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("/file/")) {
    return `${process.env.REACT_APP_BACKEND_URL}${encodeURI(url)}`;
  }
  return url;
};

