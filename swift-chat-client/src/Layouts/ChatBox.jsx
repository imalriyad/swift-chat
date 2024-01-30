import { RiSendPlane2Fill } from "react-icons/ri";
// import { FaMicrophone } from "react-icons/fa6";
import { useRef } from "react";
import { io } from "socket.io-client";
import moment from "moment";
import useAuth from "../hooks/useAuth";
const ChatBox = () => {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const socket = io("http://localhost:5000");
  // const socket = io("https://swift-chat-server.onrender.com");

  socket.emit("connection", {
    name: user?.displayName,
  });

  socket.on("connection", (data) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat md:w-[600px] w-[345px] chat-start">
    <div class="chat-bubble md:text-base text-sm">${data}</div>
  </div>`;

    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
  });

  const handleSend = () => {
    const msg = inputRef.current.value;
    if (msg === "") {
      return;
    }
    const newMessage = {
      msg,
      time: moment().format("h:mm A, MMM D"),
      name: user?.displayName,
      photo: user?.photoURL,
      sender: "alriyadx@example.com",
      receiver: "imalriyad@gmail.com",
    };
    socket.emit("sendMsg", newMessage);
    const div = document.createElement("div");

    div.innerHTML = `<div class="chat chat-end ">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src=${user?.photoURL} />
      </div>
    </div>
    <div class="chat-header">
      ${user?.displayName}
    </div>
    <div class="cha
    t-bubble md:text-base text-sm">${msg}</div>
    <div class="chat-footer">
    <time class="text-xs">${moment().format("h:mm A, MMM D")}</time>
    </div>
  </div>`;
    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
    msgContainer.scrollTo(20, msgContainer.scrollHeight);
    inputRef.current.value = "";
  };

  socket.on("broadcast", (data) => {
    console.log(data);
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat md:w-[600px] w-[345px] chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src=${data?.photo} />
      </div>
    </div>
    <div class="chat-header">
      ${data?.name}
    </div>
    <div class="chat-bubble md:text-base text-sm">${data?.msg}</div>
    <div class="chat-footer">
    <time class="text-xs">${data?.time}</time> </div>
  </div>`;

    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
  });

  const handleTyping = () => {
    socket.emit("typing", {
      typing: `${user?.displayName} is typing...`,
      photo: user?.photoURL,
    });
  };
  const handleType = () => {
    socket.emit("typing", {
      typing: ``,
    });
  };

  socket.on("typing", (data) => {
    const msgContainer = document.getElementById("msgContainer");
    msgContainer.innerHTML = "";

    // Append the new typing message
    const typingMessage = document.createElement("div");

    typingMessage.innerHTML = `<div class="chat ${
      data?.typing === "" ? "hidden" : "flex"
    } md:w-[600px] w-[345px] chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src=${data?.photo} />
      </div>
    </div>
    <div class="chat-bubble md:text-base text-sm">${data?.typing}</div>
  </div>`;

    msgContainer.appendChild(typingMessage);
  });

  return (
    <>
      <div className="md:min-h-screen h-[calc(100vh-54px)] md:pt-8 pt-6 w-full relative">
        <div
          id="msgContainer"
          className="flex flex-col pt-8 text-white h-[90%] pr-2 overflow-y-auto overflow-x-hidden pb-6 absolute right-0"
        ></div>
        <div className="w-full">
          <input
            type="text"
            ref={inputRef}
            id="input-box"
            onKeyPress={handleTyping}
            onFocus={handleTyping}
            onBlur={handleType}
            placeholder="Write your message here . . ."
            className="p-2 pl-4 focus:outline-none rounded-lg font-normal bg-[#2c3e50] text-white placeholder:font-light xl:w-[95%] md:w-[90%] w-[83%] absolute bottom-2"
          />

          <span
            onClick={handleSend}
            className="align-middle bg-[#2c3e50] p-3 rounded-full absolute text-xl text-white bottom-2 right-2 cursor-pointer"
          >
            <RiSendPlane2Fill />
          </span>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
