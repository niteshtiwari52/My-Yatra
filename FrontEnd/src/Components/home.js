import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { demoAction } from "../Actions/DemoActions";
const Home = () => {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.Demo.data.data);
  const [value, setValue] = useState({
    id: "",
  });
  useEffect(() => {
    dispatch(demoAction(value.id));
  }, [dispatch, value]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue({ ...value, ["id"]: e.target.value });
  };
  const handleClick = () => {};
  return (
    <>
      <h1>This is Home</h1>
      <button onClick={handleClick}> Click to get data</button>
      <input placeholder="Enter Id" value={value.id} onChange={handleChange} />
      {Array.isArray(temp) && temp.length > 0 ? (
        <>
          {temp.map((data, i) => (
            <div style={{ border: "2px solid red" }}>
              <h3>Title :{data.title}</h3>
              <h3>user Id{data.content}</h3>
            </div>
          ))}
        </>
      ) : (
        <h1>Data Not Found</h1>
      )}
    </>
  );
};

export default Home;
