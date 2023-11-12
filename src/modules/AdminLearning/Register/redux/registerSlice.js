import actions from "./type";
import produce from "immer";

const initialState = {
  userNotRegister: [],
  userRegistered: [],
  userApprove: [],
  courseNotRegister: [],
  courseApproved: [],
  courseWaitApprove: [],
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actions.SET_USER_NOT_REGISTER:
        draft.userNotRegister = payload;
        break;

      case actions.SET_USER_REGISTERED:
        draft.userRegistered = payload;
        break;

      case actions.SET_USER_APPROVE:
        draft.userApprove = payload;
        break;

      case actions.SET_COURSE_NOT_REGISTER:
        draft.courseNotRegister = payload;
        break;

      case actions.SET_COURSE_APPROVED:
        draft.courseApproved = payload;
        break;

      case actions.SET_COURSE_WAIT_APPROVE:
        draft.courseWaitApprove = payload;
        break;

      default:
        break;
    }
  });
};

export default reducer;
