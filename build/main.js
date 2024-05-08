import { io } from "./_snowpack/pkg/socket.io-client.js";

const socket = io("https://chat-online-87v7.onrender.com/");

const chat = document.getElementById("chat");
const sendMessageBtn = document.getElementById("send-message");
const messageInput = document.getElementById("message-input");
const nicknameInfo = document.getElementById("nickname-info");
let nickname = "unknown";

sendMessageBtn.addEventListener("click", () => {
    emitMessage();
});
window.addEventListener("keydown", (e) => {
    if(e.key == 'Enter') {
        emitMessage();
    }
});

function sendMessage(message) {
    chat.innerHTML += `<div class='message'>${message}</div>`;
    chat.scrollTo(0, chat.scrollHeight);
}

function emitMessage() {
    socket.emit("messageSend", messageInput.value, nickname);

    sendMessage("<b>You:</b> "+messageInput.value);
    messageInput.value = '';
}

socket.on("connect", () => {
    nickname = prompt("Podaj swój nickname");
    if(nickname == null)
        nickname = 'Anonymous';

    nicknameInfo.innerHTML = `You are <b><i>${nickname}</i></b>.`;
    sendMessage("You have connected to the chat.");
    socket.emit("userJoin", nickname);
});

socket.on("disconnect", () => {
    socket.emit("userDisconnect", nickname);
});

socket.on("userJoin", (nickname) => {
    sendMessage(`<i>${nickname}</i> has joined to the room.`);
});

socket.on("userDisconnect", (nickname) => {
    sendMessage(`<i>${nickname}</i> left the room.`);
})

socket.on("messageSend", (message, nickname) => {
    sendMessage(`<b>${nickname}: </b> ${message}`);
});