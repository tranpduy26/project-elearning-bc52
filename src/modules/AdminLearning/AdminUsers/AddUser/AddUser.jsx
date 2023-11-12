import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddUser } from "../../../../apis/userAPI";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Label } from "@mui/icons-material";

export default function AddUser() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [alertMessenge, setAlertMessenge] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      maNhom: "GP13",
    },
    mode: "onTouched",
  });

  const { mutate: handleAddUser } = useMutation({
    mutationFn: (values) => apiAddUser(values),
    onSuccess: () => {
      setAlertMessenge("Users added successfully!");
      reset();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/admin/users-list");
    },
  });

  const onSubmit = (values) => {
    handleAddUser(values);
  };

  return (
    <div className="px-5 text-white">
      <h1 className="text-white py-2">Add User</h1>
      {alertMessenge && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Update</AlertTitle>
            {alertMessenge}
          </Alert>
        </Stack>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary rounded-4 px-5 py-5 border-3 bg-white text-dark"
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="mb-3">
                <label className="form-label fw-bold ">Account</label>
                <input
                  className="form-control w-50"
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
                  className="form-control w-50"
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
                <label className="form-label fw-bold ">Name</label>
                <input
                  className="form-control w-50"
                  placeholder="Name"
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
                <label className="form-label fw-bold ">Email</label>
                <input
                  className="form-control w-50"
                  placeholder="Email"
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
            </Grid>
            <Grid item xs={6}>
              <div className="mb-3">
                <label className="form-label fw-bold">Phone</label>
                <input
                  className="form-control w-50"
                  placeholder="Phone"
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
                  <p className="text-danger">Exceed 11 numbers</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">User type</label>
                <select
                  name="maLoaiNguoiDung"
                  placeholder="User type"
                  className="form-control w-50"
                  {...register("maLoaiNguoiDung")}
                >
                  <option value="">User type</option>
                  <option value="GV">Ministry</option>
                  <option value="HV">Student</option>
                </select>
                {errors.maLoaiNguoiDung && (
                  <p className="text-danger">
                    {errors.maLoaiNguoiDung.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary fw-bold py-2 mt-2"
              >
                Add User
              </button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
