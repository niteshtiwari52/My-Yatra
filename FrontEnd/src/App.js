import "./App.css";
import Routing from "./Components/routing";
import { Provider } from "react-redux";
import Store from "./Store/store";
import Navbar from "./Components/navbar";
function App() {
  Store.subscribe(() => {
    localStorage.setItem("reduxStore", JSON.stringify(Store.getState()));
  });
  return (
    <Provider store={Store}>
      <>
        <Navbar />
        <Routing />
      </>
    </Provider>
  );
}

export default App;
