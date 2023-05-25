import {
  userLoginBegin,
  userLoginSuccess,
  userLoginFailure,
} from "./ActionCreater";
import axios from "axios";

export const userAction = (email, password) => {
  return async (dispatch) => {
    dispatch(userLoginBegin());

    const config = { headers: { "Content-type": "application/json" } };
    await axios
      .post(
        "http://localhost:4000/api/users/login",
        { email, password },
        config
      )
      .then((result) => {
        console.log(result);
        dispatch(userLoginSuccess(result.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(userLoginFailure(err));
      });
  };
};
