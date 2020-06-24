export function clearToken() {
  localStorage.removeItem("userId");
  localStorage.removeItem("accessToken");
}

export function getToken() {
  try {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    return { userId, accessToken };
  } catch (err) {
    clearToken();
    return null;
  }
}
