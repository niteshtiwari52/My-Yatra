const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorMidleware = require("./middleware/error");

// importing Db connection
const DbConnection = require("./databaseConnection");
// importing Routes
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

DbConnection();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "authorization");
  next();
});

const port = 4000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WeleCome To My-Yatra",
  });
});

// Routing or Endpoints
// u - user
// p - post
app.use("/api/users", userRouter);
app.use("/api/p", postRouter);

app.use(errorMidleware);
app.all("/", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Path Not Found",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Bad Request",
  });
});

app.listen(port, () => {
  console.log(`My-Yatra server Running successfully on port ${port}`);
});
