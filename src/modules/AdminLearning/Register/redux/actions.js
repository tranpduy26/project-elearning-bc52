import {
  cancelCourseRegister,
  confirmUserRegisterCourse,
  getCourseApproved,
  getCourseListWaitApprove,
  getCourseNotRegister,
  getUserListApprove,
  getUserListNotRegister,
  getUserListRegistered,
} from "../utils/registerService";
import actions from "./type";

export const fetchUserListNotRegisterAction = (maKhoaHoc) => async (next) => {
  try {
    const res = await getUserListNotRegister(maKhoaHoc);
    next({ type: actions.SET_USER_NOT_REGISTER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserListRegisteredAction = (maKhoaHoc) => async (next) => {
  try {
    const res = await getUserListRegistered(maKhoaHoc);
    next({ type: actions.SET_USER_REGISTERED, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCourseListApprovedAction = (taiKhoan) => async (next) => {
  try {
    const res = await getCourseApproved(taiKhoan);
    next({ type: actions.SET_COURSE_APPROVED, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserListApproveAction = (maKhoaHoc) => async (next) => {
  try {
    const res = await getUserListApprove(maKhoaHoc);
    next({ type: actions.SET_USER_APPROVE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const confirmUserRegisterCourseAction = (formData) => async (next) => {
  try {
    await confirmUserRegisterCourse(formData);
    alert("Authentication successful! The user is enrolled in the course!");
    next(fetchUserListRegisteredAction(formData));
    next(fetchUserListApproveAction(formData));
    next(fetchCourseListWaitApproveAction(formData));
    next(fetchCourseListApprovedAction(formData));
  } catch (error) {
    console.log(error);
  }
};

export const cancelCourseRegisterAction = (formData) => async (next) => {
  try {
    await cancelCourseRegister(formData);
    alert("Unsubscribe successfully!");
    next(fetchUserListRegisteredAction(formData));
    next(fetchCourseListApprovedAction(formData));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCourseListNotRegisterAction = (taiKhoan) => async (next) => {
  try {
    const res = await getCourseNotRegister(taiKhoan);
    next({ type: actions.SET_COURSE_NOT_REGISTER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCourseListWaitApproveAction = (maKhoaHoc) => async (next) => {
  try {
    const res = await getCourseListWaitApprove(maKhoaHoc);
    next({ type: actions.SET_COURSE_WAIT_APPROVE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
