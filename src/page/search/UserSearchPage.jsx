import { useSelector } from "react-redux";
import Upload from "../../components/Upload";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

export default function UserSearchPage() {
  const accessToken = useSelector((state) => state.auths.accessToken);
  const location = useLocation();
  let role;
  if (accessToken) {
    role = jwtDecode(accessToken);
  }
  console.log(!accessToken);
  return !accessToken ? (
    <Navigate
      to="/auth/login"
      replace
      state={{ prevPath: location.pathname }}
    />
  ) : role === "admin" ? (
    <Navigate to="/" replace />
  ) : (
    <Upload />
  );
}
