import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import {
  Container,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import style from "./LoginAdmin.module.css";
import { useAdminUserContext } from "../../../contexts/AdminContext/AdminContext"; // Thay đổi đường dẫn
import { signin } from "../../../apis/userAPI";
import { useUserContext } from "../../../contexts/UserContext/UserContext";

const signinSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string().required("Mật khẩu không được để trống"),
});

export default function LoginAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const { currentUser, handleSignin: onSiginSuccess } = useUserContext(); // Thay đổi tên hàm và context

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSigin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      onSiginSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSigin(values);
  };

  // adminUser khác null => admin đã đăng nhập => điều hướng về trang Admin
  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/admin"} replace />;
  }
  if (currentUser && currentUser?.maLoaiNguoiDung !== "GV") {
    return <Navigate to="/404" />;
  }

  return (
    <div className={style.background_loginAdmin}>
      <Container maxWidth="xs" className={style.modal_sign}>
        <div className={style.modalIn}>
          <AdminPanelSettingsIcon fontSize="large" color="error" />
          <h4>Hello Admin</h4>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.inputForm}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Tài khoản"
                    variant="outlined"
                    fullWidth
                    {...register("taiKhoan")}
                    error={!!errors.taiKhoan}
                    helperText={errors.taiKhoan?.message}
                  />
                </div>
                <div>
                  <TextField
                    {...register("matKhau")}
                    fullWidth
                    error={!!errors.matKhau}
                    helperText={errors.matKhau?.message}
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChangePassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isLoading}
                color="error"
              >
                Đăng nhập
              </Button>
              {error && <p>{error}</p>}
            </form>
          </Box>
        </div>
      </Container>
    </div>
  );
}
