import { RiSendPlane2Fill } from "react-icons/ri";
// import { FaMicrophone } from "react-icons/fa6";
import { useRef } from "react";
import { io } from "socket.io-client";
const ChatBox = () => {
  const inputRef = useRef(null);
  const socket = io("http://localhost:5000");

  const handleSend = () => {
    const msg = inputRef.current.value;
    if (msg === "") {
      return;
    }
    socket.emit("sendMsg", msg);
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat md:w-[600px] w-[290px] chat-end">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div class="chat-header">
      Obi-Wan Kenobi
      
    </div>
    <div class="chat-bubble">${msg}</div>
    <div class="chat-footer">
    <time class="text-xs">12:45 Am</time>
    </div>
  </div>`;
    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
    msgContainer.scrollTo(20, msgContainer.scrollHeight);
    inputRef.current.value = "";
  };

  socket.on("brodcast", (msg) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat md:w-[600px] w-[290px] chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div class="chat-header">
      Obi-Wan Kenobi
      <time class="text-xs opacity-50">12:45</time>
    </div>
    <div class="chat-bubble">${msg}</div>
    <div class="chat-footer">
    <time class="text-xs">12:45 Am</time>
    </div>
  </div>`;

    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
  });

  return (
    <div className="h-screen ml-4 w-full relative ">
      <div
        id="msgContainer"
        className="flex flex-col pt-8 text-white h-[90%] pr-4 fixed overflow-y-auto pb-6"
      ></div>

      <div className="lg:w-[530px] md:w-[300px] w-[240px]">
        <input
          type="text"
          ref={inputRef}
          placeholder="Write your message here . . ."
          className="input input-bordered md:input-md input-sm rounded-lg font-normal bg-[#2c3e50] text-white placeholder:font-light w-full absolute bottom-2 right-2 "
        />

        <span
          onClick={handleSend}
          className="bg-[#111E25] md:p-[14px] p-[6px] align-middle rounded-full absolute text-xl text-white bottom-2 md:-right-12 -right-8 cursor-pointer"
        >
          <RiSendPlane2Fill />
        </span>
      </div>
    </div>
  );
};

export default ChatBox;
