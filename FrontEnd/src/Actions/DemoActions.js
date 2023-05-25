import { dataBegin, dataSuccess, dataFailure } from "./ActionCreater";
import axios from "axios";
export const demoAction = (id) => {
  return (dispatch) => {
    dispatch(dataBegin());

    if (id === "" || id === undefined || id === null) {
      axios
        .get(`http://localhost:4000/api/posts/`)
        .then((result) => {
          console.log(result);
          dispatch(dataSuccess(result.data));
        })
        .catch((err) => {
          dispatch(dataFailure(err));
        });
    } else {
      axios
        .get(`http://localhost:3000/api/posts/${id}`)
        .then((result) => {
          dispatch(dataSuccess([result.data]));
        })
        .catch((err) => {
          dispatch(dataFailure(err));
        });
    }
  };
};
