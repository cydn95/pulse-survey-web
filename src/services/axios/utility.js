export function clearToken() {
  localStorage.removeItem("accessToken");
}

export function getToken() {
  try {
    const accessToken = localStorage.getItem("accessToken");

    return { accessToken };

  } catch (err) {
    clearToken();
    return null;
  }
}