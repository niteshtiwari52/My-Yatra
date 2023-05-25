import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";

const persistedState = localStorage.getItem("reduxStore")
  ? JSON.parse(localStorage.getItem("reduxStore"))
  : {};
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__({})
    : compose;

// if devtools no present
// const composeEnhancers = compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const Store = createStore(rootReducer, persistedState, enhancer);
export default Store;
