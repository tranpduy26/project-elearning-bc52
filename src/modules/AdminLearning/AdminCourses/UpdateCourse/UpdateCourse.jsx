import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import { Container, Grid, TextField, Button, Switch } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import { getCourseDetails, updateCourse } from "../../../../apis/CourseAPI";

const updateMovieSchema = object({
  maKhoahoc: string().required("CourseID cannot be empty"),
  biDanh: string().required("Aliases cannot be empty"),
  tenKhoahoc: string().required("Course Name cannot be empty"),
  danhMucKhoaHoc: string().required("Aliases cannot be left blank"),
  moTa: string().required("Description cannot be empty"),
  luotXem: string().required("Dates cannot be left blank"),
  danhGia: string().required("Reviews cannot be empty"),
  hinhAnh: mixed().test("required", "Images cannot be blank", (value) => {
    return value !== undefined;
  }),
  ngayTao: string().required("date created cannot be empty"),
  maDanhMucKhoaHoc: string().required("course catalog cannot be empty"),
  taiKhoanNguoiTao: string().required("Creator account cannot be empty"),
});

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function UpdateCourse() {
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

  const { courseId } = useParams();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      maKhoahoc: "",
      biDanh: "",
      tenKhoahoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "GP13",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    },
    resolver: yupResolver(updateMovieSchema),
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

  const { data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseDetails(courseId),
  });

  useEffect(() => {
    console.log(course);
    if (course) {
      setingPreview(course.hinhAnh);
      setValue("tenKhoaHoc", course.tenKhoaHoc);
      setValue("maDanhMucKhoaHoc", course.maDanhMucKhoaHoc);
      setValue("luotXem", course.luotXem);
      setValue("danhGia", course.danhGia);
      setValue("moTa", course.moTa);
      setValue("hinhAnh", course.hinhAnh);
    }
  }, [course]);

  useEffect(() => {
    if (course) {
      if (course.hinhAnh) {
        setValue("hinhAnh", {
          originFileObj: {
            name: "default.png",
            url: course.hinhAnh,
          },
        });
      }
    }
  }, [course]);

  const { mutate: onUpdate } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("tenKhoaHoc", values.tenKhoaHoc);
      formData.append("maDanhMucKhoaHoc", values.maDanhMucKhoaHoc);
      formData.append("luotXem", values.luotXem);
      formData.append("danhGia", values.danhGia);
      formData.append("moTa", values.moTa);
      if (values.hinhAnh[0]) {
        formData.append("hinhAnh", values.hinhAnh[0]);
      }
      formData.append("maNhom", "GP13");

      return updateCourse(formData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onSuccess: () => {
      handleSnackbar("Successfully updated the course!", "success")();
      navigate("/admin/courses-list");
    },
    onError: () => {
      handleSnackbar("Course update failed!", "error")();
    },
  });

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <Container style={{ margin: "20px 0" }}>
        <h1 className="text-white py-2 text-center">Update Course</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6}>
              {imgPreview && (
                <div style={{ margin: "150px" }}>
                  <img src={imgPreview} width="100%" height="100%" />
                </div>
              )}
            </Grid>
            <Grid item xs={6}>
              <form
                onSubmit={handleSubmit(onUpdate)}
                className="border border-primary rounded-4 px-5 py-5 border-3 bg-white text-dark"
              >
                <div>
                  <h6>Creator: {course?.nguoiTao.taiKhoan}</h6>
                </div>

                <div>
                  <h6>Date created: {course?.ngayTao}</h6>
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    label="Course name"
                    variant="outlined"
                    {...register("tenKhoaHoc")}
                    helperText={errors.tenKhoaHoc?.message}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    label="Category"
                    variant="outlined"
                    {...register("danhMucKhoaHoc")}
                    helperText={errors.danhMucKhoaHoc?.message}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    label="View"
                    variant="outlined"
                    {...register("luotXem")}
                    helperText={errors.luotXem?.message}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    label="Rating"
                    variant="outlined"
                    {...register("danhGia")}
                    helperText={errors.danhGia?.message}
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <textarea
                    name="Describe"
                    cols="55"
                    rows="5"
                    placeholder="Describe"
                    {...register("moTa")}
                  ></textarea>
                  {errors.moTa && <p>{errors.moTa.message}</p>}
                </div>

                <div>
                  <input
                    placeholder="Image"
                    type="file"
                    {...register("hinhAnh")}
                  />
                  {errors && <p>{errors.hinhAnh?.message}</p>}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold py-2 mt-4"
                  >
                    Update Course
                  </button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
