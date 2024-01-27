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

  const handleSend = () => {
    const msg = inputRef.current.value;
    if (msg === "") {
      return;
    }
    const newMessage = {
      msg,
      time: moment().format("lll"),
      name: user?.displayName,
      photo: user?.photoURL,
    };
    socket.emit("sendMsg", newMessage);
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat md:w-[600px] w-[290px] chat-end">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src=${user?.photoURL} />
      </div>
    </div>
    <div class="chat-header">
      ${user?.displayName}
    </div>
    <div class="chat-bubble md:text-base text-sm">${msg}</div>
    <div class="chat-footer">
    <time class="text-xs">${moment().format("lll")}</time>
    </div>
  </div>`;
    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
    msgContainer.scrollTo(20, msgContainer.scrollHeight);
    inputRef.current.value = "";
  };

  socket.on("brodcast", (data) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat md:w-[600px] w-[290px] chat-start">
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

  return (
    <>
      <div className="h-screen pt-4 w-full relative">
        <div
          id="msgContainer"
          className="flex flex-col pt-8 text-white h-[90%] pr-4 fixed overflow-y-auto pb-6"
        ></div>
        <div className="w-full">
          <input
            type="text"
            ref={inputRef}
            placeholder="Write your message here . . ."
            className="input input-bordered md:input-md input-sm rounded-lg font-normal bg-[#2c3e50] text-white placeholder:font-light w-[90%] absolute bottom-2"
          />

          <span
            onClick={handleSend}
            className="bg-[#111E25] md:p-[14px] p-[6px] align-middle rounded-full absolute text-xl text-white bottom-2 right-0 cursor-pointer"
          >
            <RiSendPlane2Fill />
          </span>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
