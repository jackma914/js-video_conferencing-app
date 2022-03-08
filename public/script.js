const socket = io("/");
const videoGrid = document.getElementById("video-grid");

//HTML 문서에서, Document.createElement() 메서드는 지정한 tagName의 HTML 요소를 만들어 반환합니다.
const myVideo = document.createElement("video");
myVideo.muted = true;

let myVideoStream;

//1. navigator.mediaDevices
//  읽기 전용 속성은 카메라, 마이크, 화면 공유와 같이 현재 연결된 미디어 입력 장치에 접근할 수 있는 MediaDevices 객체를 반환합니다.
//2. MediaDevices 인터페이스의 getUserMedia() 메서드는 사용자에게 미디어 입력 장치 사용 권한을 요청하며,
// 사용자가 수락하면 요청한 미디어 종류의 트랙을 포함한 MediaStream(en - US)을 반환합니다.
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    //받아온 MediaStream을 myVideoStream에 넣어주고, addVideoStream 함수에 인자로 myVicdoe와 MediaStream값을 보내줍니다.
    addVideoStream(myVideo, stream);
  });

socket.emit("join-room");

const addVideoStream = (video, stream) => {
  // !important 받아온 stream을 video.srcObject에 넣어주면 실시간으로 영상을 볼수 있습니다.
  video.srcObject = stream;

  //   미디어의 메타 데이터가 로드되었을 때를 나타낸다.
  // 메타 데이터는 우리가 유용하게 사용할 수 있는 동영상의 재생시간과 같은 것을 의미한다.
  // 미디어가 로드되기 전에, 먼저 메타 데이터를 뽑아와서 활용할 수 있다.
  video.addEventListener("loadedmetadata", () => {
    //이벤트가 작동하면 video를 싱행합니다.
    video.play();
  });

  // append를 이용해 video를 element를 추가해줍니다.
  videoGrid.append(video);
};
