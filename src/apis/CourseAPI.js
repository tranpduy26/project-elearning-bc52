import fetcher from "./fetcher";

export async function getCourses() {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: {
        maNhom: "GP01",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function addCourse(course) {
  try {
    const response = await fetcher.post("/QuanLyKhoaHoc/ThemKhoaHoc", course);
    return response.data?.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function deleteCourse(idCourse) {
  try {
    const response = await fetcher.delete("/QuanLyKhoaHoc/XoaKhoaHoc", {
      params: {
        maKhoaHoc: idCourse,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
export async function updateCourse(dataCourse) {
  try {
    const response = await fetcher.put(
      "/QuanLyKhoaHoc/CapNhatKhoaHoc",
      dataCourse
    );

    return response.data?.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getCourseDetails(courseId) {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params: {
        maKhoaHoc: courseId,
      },
    });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error.response?.data?.content;
  }
}

export async function getCategoryCourses() {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function uploadImageCourses(idCourse, formData) {
  try {
    const response = await fetcher.post(
      `/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc/${idCourse}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
