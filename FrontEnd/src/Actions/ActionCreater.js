import { DATA_FAILURE, DATA_LOADING, DATA_SUCCESS } from "./Type";
import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "./Type";

export const dataBegin = () => ({
  type: DATA_LOADING,
});

export const dataSuccess = (data) => ({
  type: DATA_SUCCESS,
  data,
});

export const dataFailure = (error) => ({
  type: DATA_FAILURE,
  error,
});

export const userLoginBegin = () => ({
  type: USER_LOGIN_LOADING,
});

export const userLoginSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  data,
});

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  error,
});
