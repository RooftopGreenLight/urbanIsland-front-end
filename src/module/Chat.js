import SockJS from "sockjs-client"
import { Client } from "stompjs"

// 서버 간 연결을 위해 WebSocket과 통신하는 Client 객체 생성
export const stompClient = new Client({
  brokerURL: `/ws/api/v1/chat`,
  connectHeaders: {
    login: "user",
    passcode: "password",
  },

  debug: function (log) {
    console.log(log)
  },

  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})

// Client 가 성공적으로 서버와 연결되었을 때 실행될 함수
// 재연결 시에도 실행되는 콜백 함수이며, subscribe도 이곳에서 진행.
stompClient.onConnect = function (roomId) {
  console.log("successfully connected!")
  stompClient.subscribe(`/queue/${roomId}`, msg => {
    const payload = JSON.parse(msg.body)
    console.log(payload.user, payload.message)
  })
}

// Client가 안전하게 접속을 끊었을 경우 실행될 함수.
// 통신 과정에서의 에러로 끊어진 경우에는 호출되지 않음.
stompClient.onDisconnect = function (frame) {
  console.log("successfully disconnected!")
}

// 통신 도중 Stomp 에러 발생 시 실행될 함수.
stompClient.onStompError = function (frame) {
  console.log("Broker reported error: " + frame.headers["message"])
  console.log("Additional details: " + frame.body)
}

// 클라이언트에서 메세지를 전송하기 위한 메소드
stompClient.sendMessage = function (msg) {
  stompClient.publish({ destination: "/app/inquiry/room", body: msg })
}

// Client 활성화
// client.activate()

// Client 비활성화 및 재연결 종료
// client.deactivate()
