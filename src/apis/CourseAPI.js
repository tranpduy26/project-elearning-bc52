import fetcher from "./fetcher";

export async function getCourses() {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: {
        maNhom: "GP13",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function addCourse(course) {
  try {
    const response = await fetcher.post("/QuanLyKhoaHoc/ThemKhoaHoc", course);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function deleteCourse(idCourse) {
  try {
    const response = await fetcher.delete("/QuanLyKhoaHoc/XoaKhoaHoc", {
      params: {
        MaKhoaHoc: idCourse,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.content;
  }
}
export async function updateCourse(dataCourse) {
  try {
    const response = await fetcher.post(
      "/QuanLyKhoaHoc/CapNhatKhoaHoc",
      dataCourse
    );

    return response.data;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getCourseDetails(courseId) {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params: {
        MaKhoaHoc: courseId,
      },
    });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error.response?.data?.content;
  }
}
