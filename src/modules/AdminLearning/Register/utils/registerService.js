import requester from "../../../../apis/api";
import { apiPath } from "../../../../apis/apiPath";

export const getUserListNotRegister = async (maKhoaHoc) => {
  return await requester({
    method: "POST",
    url: apiPath.GET_USER_LIST_NOT_REGISTER,
    data: maKhoaHoc,
  });
};

export const getUserListRegistered = async (maKhoaHoc) => {
  return await requester({
    method: "POST",
    url: apiPath.GET_USER_LIST_REGISTER,
    data: maKhoaHoc,
  });
};

export const getUserListApprove = async (maKhoaHoc) => {
  return await requester({
    method: "POST",
    url: apiPath.GET_USER_LIST_APPROVE,
    data: maKhoaHoc,
  });
};

export const confirmUserRegisterCourse = async (formData) => {
  return await requester({
    method: "POST",
    url: apiPath.CONFIRM_REGISTER_COURSE,
    data: formData,
  });
};

export const cancelCourseRegister = async (formData) => {
  return await requester({
    method: "POST",
    url: apiPath.CANCEL_REGISTER,
    data: formData,
  });
};

export const getCourseNotRegister = async (taiKhoan) => {
  return await requester({
    method: "POST",
    url: apiPath.GET_COURSE_NOT_REGISTER,
    data: taiKhoan,
  });
};

export const getCourseApproved = async (taiKhoan) => {
  return await requester({
    method: "POST",
    url: apiPath.GET_COURSE_LIST_APPROVED,
    data: taiKhoan,
  });
};

export const getCourseListWaitApprove = async (taiKhoan) => {
  return await requester({
    method: "POST",
    url: apiPath.GET_COURSE_LIST_WAIT_APPROVE,
    data: taiKhoan,
  });
};
