const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userRouter = require("../routes/auth")

app.get("/", (req, res) =>
  res.send({
    message: "selamat datang",
  })
);

app.use("/auth",userRouter)

module.exports = app;
