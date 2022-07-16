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
const motifRouter = require("../routes/motif")

app.get("/", (req, res) =>
  res.send({
    message: "selamat datang",
  })
);
app.get("/speach", (req, res) =>{
  let msg = new SpeechSynthesisUtterance();
  msg.text = "Hello, Anbies Here!";
  window.speechSynthesis.speak(msg);
    res.send({
      message: "selamat datang",
      
    })
  }
);
app.use("/image", express.static("public/image"));

app.use("/auth",userRouter)
app.use("/motif",motifRouter)

module.exports = app;
