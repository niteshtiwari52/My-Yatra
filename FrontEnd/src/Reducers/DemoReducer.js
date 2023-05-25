import { DATA_LOADING, DATA_SUCCESS, DATA_FAILURE } from "../Actions/Type";

const Demo = (state, action) => {
  if (typeof state === "undefined") {
    return {
      data: [{}],
      loading: false,
      error: {},
    };
  }

  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: {},
        data: [{}],
      };
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        data: action.data,
      };
    case DATA_FAILURE:
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
export default Demo;
