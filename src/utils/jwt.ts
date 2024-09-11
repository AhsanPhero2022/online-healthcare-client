import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token provided:", error);
    return null;
  }
};
