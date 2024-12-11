import { jwtDecode } from "jwt-decode";

const getToken = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId.toString()
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return null;
  }
};

export default getToken