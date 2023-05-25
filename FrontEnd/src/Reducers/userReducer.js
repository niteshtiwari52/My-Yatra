import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "../Actions/Type";

const User = (state, action) => {
  if (typeof state === "undefined") {
    return {
      data: [{}],
      loading: false,
      error: {},
    };
  }

  switch (action.type) {
    case USER_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: {},
        data: [{}],
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        data: action.data,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: {},
      };
    default:
      return state;
  }
};
export default User;
