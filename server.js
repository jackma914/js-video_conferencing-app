const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");

//정적으로 public폴더의 파일을 불러옵니다.
app.use(express.static("public"));

// ejs 설치 및 뷰 엔진 설정
app.set("view engine", "ejs");

// uuid를 이용해 id 생성
app.get("/", (req, res) => {
  res.redirect(`${uuidv4()}`);
});

// id를 room.ejs에 전달
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(3030);
