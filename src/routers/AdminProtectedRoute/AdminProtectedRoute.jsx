import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAdminUserContext } from "../../contexts/AdminContext/AdminContext";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function AdminProtectedRoute({ children }) {
  const { currentUser, handleSignout } = useUserContext();
  const location = useLocation();

  if (!currentUser || currentUser.maLoaiNguoiDung !== "GV") {
    const url = `/404?redirectTo=${location.pathname}`;
    handleSignout();
    return <Navigate to={url} replace />;
  }
  if (!currentUser) {
    //user chưa đăng nhập => redirect về trang login
    const url = `/log-in-admin?redirectTo=${location.pathname}`;

    return <Navigate to={url} replace />;
  }

  return children || <Outlet />;
}
