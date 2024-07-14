import { useSelector } from "react-redux";
import Upload from "../../components/Upload";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

export default function UserSearchPage() {
  const accessToken = useSelector((state) => state.auths.accessToken);
  const location = useLocation();
  const role = useSelector((state) => state.auths.role);
  console.log(!accessToken);
  if(!accessToken){
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ prevPath: location.pathname }}
      />
    )
  }else {
    if(role === "admin"){
      return <Navigate to="/" replace />
    }else{
      return <Upload />
    }
  }
}
