const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
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

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    socket.to(roomId).broadcast.emit("user-connected");
  });
});

server.listen(3030);

// io.sokets.emit, socket.broadcast.emit 차이

// broadcast.emit에서 계속해서 오류가 생겼습니다. 이유는 socket.io의 버전 문제였습니다. 삭제한후 버전을 바꾸어서 해결했습니다.
