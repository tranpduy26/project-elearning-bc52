import fetcher from "./fetcher";

// apiSignin
export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// apiSignup
export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// getUserList
export async function getUserList() {
  try {
    const response = await fetcher.get(
      "/QuanLyNguoiDung/LayDanhSachNguoiDung",
      {
        params: {
          maNhom: "GP13",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// apiAddUser
export const apiAddUser = async (payload) => {
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// apiDeleteUser
export const apiDeleteUser = async (userId) => {
  try {
    const response = await fetcher.delete("/QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: userId,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// apiUpdateUser
export const apiUpdateUser = async () => {
  try {
    const response = await fetcher.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const apiGetUserDetail = async (userId) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThongTinNguoiDung", {
      params: {
        taiKhoan: userId,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data?.content;
  }
};
