import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  apiDeleteUser,
  apiGetUserDetail,
  apiUpdateUser,
  getUserList,
} from "../../../../apis/userAPI";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterOutlined } from "@ant-design/icons";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { NavLink } from "react-router-dom";

export default function UserList() {
  // Snackbar
  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = (message, variant) => () => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  // List of users
  const [users, setUsers] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: userList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getUserList,
    refetchOnWindowFocus: true,
  });

  // Pagination
  const [currentPage, setCurentPage] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleChangePage = (evt, newPage) => {
    setCurentPage(newPage);
  };

  const handleChangeItemsPerPage = (evt) => {
    setItemsPerPage(evt.target.value);
    setCurentPage(0);
  };

  // Delete user
  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (userId) => apiDeleteUser(userId),
    onSuccess: () => {
      handleSnackbar("Delete the Success user!", "success")();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      handleSnackbar("Delete failed user!", "error")();
    },
  });

  // Update user
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);

  const handleClose = () => setOpenModal(false);

  const handleModalUpdate = (userId) => {
    handleOpen();
    handleUpdateUser(userId);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDt: "",
      maLoaiNguoiDung: "",
      maNhom: "GP13",
      email: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const { userId } = useParams();

  const { data: userDetail } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => apiGetUserDetail(userId),
  });
  // chưa lấy được giá data từng user

  useEffect(() => {
    console.log(userDetail);
    // Đặt giá trị cho các trường từ dữ liệu phim đã có
    if (userDetail) {
      setValue("taiKhoan", userDetail.taiKhoan);
      setValue("matKhau", userDetail.matKhau);
      setValue("hoTen", userDetail.hoTen);
      setValue("email", userDetail.email);
      setValue("soDT", userDetail.soDt);
      setValue("maNhom", "GP13");
      setValue("maLoaiNguoiDung", userDetail.maLoaiNguoiDung);
    }
  }, [userDetail]);

  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("taiKhoan", values.taiKhoan);
      formData.append("matKhau", values.matKhau);
      formData.append("hoTen", values.hoTen);
      formData.append("soDt", values.soDt);
      formData.append("maLoaiNguoiDung", values.maLoaiNguoiDung);
      formData.append("maNhom", "GP13");
      formData.append("email", values.email);

      return apiUpdateUser(values);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user", userId]);
    },
    onSuccess: () => {
      handleSnackbar("Updated user successfully!", "success")();
      navigate("/admin/users-list");
    },
    onError: (error) => {
      console.log(error);
      handleSnackbar("User update failed!", "error")();
    },
  });

  const onSubmit = (values) => {
    handleUpdateUser(values);
  };

  // Search user
  const [searchUser, setSearchUser] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = (evt) => {
    setSearchUser(evt.target.value);
  };

  useEffect(() => {
    return () =>
      clearTimeout(
        setTimeout(() => {
          setUserData(searchUser);
        }, 300)
      );
  }, [searchUser]);

  return (
    <div>
      <div style={{ margin: "0 0 0 10px" }}>
        <SearchIcon
          sx={{
            color: "white",
            marginLeft: 2,
            marginRight: 1,
            fontSize: "30px",
          }}
        />
        <InputBase
          sx={{
            color: "black",
            backgroundColor: "white",
            marginTop: 2,
            width: "50vh",
            borderRadius: 2,
          }}
          onChange={handleSearch}
          value={searchUser}
          placeholder="Search for users..."
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <h1 className="text-white py-2 text-center">User List</h1>

      <Paper
        sx={{
          width: "98%",
          overflow: "hidden",
          marginLeft: 2,
          borderRadius: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell style={{ textAlign: "center" }}>User Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .filter((value) => {
                  return searchUser.toLowerCase() === ""
                    ? value
                    : value.taiKhoan.toLowerCase().includes(searchUser);
                })
                .slice(
                  currentPage * itemsPerPage,
                  currentPage * itemsPerPage + itemsPerPage
                )
                .map((user, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={user.taiKhoan}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.taiKhoan}</TableCell>
                    <TableCell>{user.hoTen}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.soDt}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {user.maLoaiNguoiDung}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleModalUpdate(user.taiKhoan)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteUser(user.taiKhoan)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <NavLink
                        to={`/admin/register/course-list/${user.taiKhoan}`}
                        className="bg-black text-white ml-2 p-2 rounded"
                      >
                        <FilterOutlined />
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeItemsPerPage}
          component="div"
          count={userList.length}
          rowsPerPage={itemsPerPage}
          page={currentPage}
        />
      </Paper>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Update User Information
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="  px-5 py-5 border-3 bg-white text-dark"
          >
            <div className="mb-3">
              <label className="form-label fw-bold fw-bold">Account</label>
              <input
                className="form-control "
                placeholder="Account"
                {...register("taiKhoan", {
                  required: {
                    value: true,
                    message: "Account cannot be empty",
                  },
                })}
              />
              {errors.taiKhoan && (
                <p className="text-danger">{errors.taiKhoan.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
                placeholder="Password"
                autoComplete="current-password"
                className="form-control"
                type="password"
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Password cannot be empty",
                  },
                })}
              />

              {errors.matKhau && (
                <p className="text-danger">{errors.matKhau.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold fw-bold">Name</label>
              <input
                placeholder="Name"
                className="form-control"
                {...register("hoTen", {
                  required: {
                    value: true,
                    message: "Name cannot be empty",
                  },
                })}
              />

              {errors.hoTen && (
                <p className="text-danger">{errors.hoTen.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                placeholder="Email"
                autoComplete="current-password"
                className="form-control "
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email cannot be empty",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Email invalidate",
                  },
                })}
              />

              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Phone</label>
              <input
                placeholder="Phone"
                className="form-control "
                type="number"
                {...register("soDt", {
                  required: {
                    value: true,
                    message: "Phone cannot be empty",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Phone invalidate",
                  },

                  maxLength: 11,
                })}
              />

              {errors.soDt && (
                <p className="text-danger">{errors.soDt.message}</p>
              )}
              {errors.soDt?.type === "maxLength" && (
                <p className="text-danger">Maximum 11 characters</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">User type</label>
              <select
                name="maLoaiNguoiDung"
                placeholder="User type"
                className="form-control "
                {...register("maLoaiNguoiDung")}
              >
                <option value="">User type</option>
                <option value="GV">Ministry</option>
                <option value="HV">Student</option>
              </select>
            </div>
            {errors.maLoaiNguoiDung && (
              <p className="text-danger">{errors.maLoaiNguoiDung.message}</p>
            )}
            <button type="submit" className="btn btn-primary fw-bold py-2 mt-2">
              Update User
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
