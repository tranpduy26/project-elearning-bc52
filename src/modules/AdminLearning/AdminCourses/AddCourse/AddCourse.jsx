import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as dayjs from "dayjs";
import { addCourse, updateCourse } from "../../../../apis/CourseAPI";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";

export default function AddCourse() {
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

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { dataCourse } = useParams();
  const { messenge, setMessage } = useState("");
  const { currentUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "GP13",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    },
    mode: "onTouched",
  });

  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setingPreview] = useState("");
  useEffect(() => {
    //Chạy vào useEffect callback khi giá tri hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setingPreview(evt.target.result);
    };
  }, [hinhAnh]);

  const { mutate: handleAddCourse } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("maKhoaHoc", values.maKhoaHoc);
      formData.append("biDanh", values.biDanh);
      formData.append("tenKhoaHoc", values.tenKhoaHoc);
      formData.append("moTa", values.moTa);
      formData.append("luotXem", values.luotXem);
      formData.append("danhGia", values.danhGia);
      formData.append("hinhAnh", values.hinhAnh);
      formData.append("maNhom", "GP13");
      formData.append("ngayTao", values.ngayTao);
      formData.append("maDanhMucKhoaHoc", values.maDanhMucKhoaHoc);
      formData.append("taiKhoanNguoiTao", currentUser.taiKhoan);

      return addCourse(formData);
    },
    onSuccess: () => {
      setMessage("The operation was successful!");
      reset();
      queryClient.invalidateQueries("courses-list");
      navigate("/admin/courses-list");
    },
    onError: (error) => {
      console.error(error);
      handleSnackbar("Add new failed course!", "error")();
    },
  });

  const onSubmit = (values) => {
    handleAddCourse(values);
  };

  return (
    <div className="px-5 text-white">
      <h1 className="text-white py-2">Add Course</h1>
      {messenge && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {messenge}
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
                <label className="form-label fw-bold fw-bold">
                  Date created
                </label>
                <input
                  className="form-control w-50"
                  type="date"
                  placeholder="Date created"
                  {...register(
                    "ngayTao",
                    {
                      setValueAs: (value) => {
                        return dayjs(value).format("DD/MM/YYYY");
                      },
                    },
                    {
                      required: {
                        value: true,
                        message: "Date cannot be empty",
                      },
                    }
                  )}
                />
                {errors.ngayTao && (
                  <p className="text-danger">{errors.ngayTao.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">Course ID</label>
                <input
                  className="form-control w-50"
                  placeholder="Course ID"
                  {...register("maKhoaHoc", {
                    required: {
                      value: true,
                      message: "Course ID cannot be empty",
                    },
                  })}
                />
                {errors.maKhoaHoc && (
                  <p className="text-danger">{errors.maKhoaHoc.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">Aliases</label>
                <input
                  className="form-control w-50"
                  placeholder="Aliases"
                  {...register("biDanh", {
                    required: {
                      value: true,
                      message: "Aliases cannot be empty",
                    },
                  })}
                />
                {errors.biDanh && (
                  <p className="text-danger">{errors.biDanh.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">
                  Course Name
                </label>
                <input
                  className="form-control w-50"
                  placeholder="Course Name"
                  {...register("tenKhoaHoc", {
                    required: {
                      value: true,
                      message: "Course Name cannot be empty",
                    },
                  })}
                />
                {errors.tenKhoaHoc && (
                  <p className="text-danger">{errors.tenKhoaHoc.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Course catalog</label>
                <select
                  name="maDanhMucKhoaHoc"
                  placeholder="Course catalog"
                  className="form-control w-50"
                  {...register("maDanhMucKhoaHoc")}
                >
                  <option value="">Course catalog</option>
                  <option value="BackEnd">Lập trình Backend</option>
                  <option value="Design">Thiết kế Web</option>
                  <option value="DiDong">Lập trình di động</option>
                  <option value="FrontEnd">Lập trình Front end</option>
                  <option value="FullStack">Lập trình Full Stack</option>
                  <option value="TuDuy">Tư duy lập trình</option>
                </select>
                {errors.maDanhMucKhoaHoc && (
                  <p className="text-danger">
                    {errors.maDanhMucKhoaHoc.message}
                  </p>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">View</label>
                <input
                  className="form-control w-50"
                  placeholder="View"
                  {...register("luotXem", {
                    required: {
                      value: true,
                      message: "View cannot be empty",
                    },
                  })}
                />
                {errors.luotXem && (
                  <p className="text-danger">{errors.luotXem.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">Rating</label>
                <input
                  className="form-control w-50"
                  placeholder="Rating"
                  {...register("danhGia", {
                    required: {
                      value: true,
                      message: "Rating cannot be empty",
                    },
                  })}
                />
                {errors.danhGia && (
                  <p className="text-danger">{errors.danhGia.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">Describe</label>
                <input
                  className="form-control w-50"
                  placeholder="Describe"
                  {...register("moTa", {
                    required: {
                      value: true,
                      message: "Describe cannot be empty",
                    },
                  })}
                />
                {errors.moTa && (
                  <p className="text-danger">{errors.moTa.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">
                  Course images
                </label>
                <input
                  className="form-control w-50"
                  type="file"
                  placeholder="Course images"
                  {...register("hinhAnh", {
                    required: {
                      value: true,
                      message: "Course images cannot be empty",
                    },
                  })}
                />
                {errors.hinhAnh && (
                  <p className="text-danger">{errors.hinhAnh.message}</p>
                )}
                {imgPreview && (
                  <div className="mb-3 d-inline">
                    <img
                      src={imgPreview}
                      alt="preview"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary fw-bold py-2 mt-2"
              >
                Add Course{" "}
              </button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
