import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To MY-Yatra Server.....",
  });
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT} https://localhost:4000`);
});
