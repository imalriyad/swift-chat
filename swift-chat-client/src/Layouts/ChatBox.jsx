import { RiSendPlane2Fill } from "react-icons/ri";
// import { FaMicrophone } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useConversation from "../hooks/useConversation";

const ChatBox = () => {
  const { user, receiverEmail } = useAuth();
  const [conversations,,isLoading] = useConversation();
  const inputRef = useRef(null);
  const axiosPublic = useAxios();
  const sendTone = new Audio("/send.mp3");
  const ReciveTone = new Audio("/recive.mp3");
  const socket = io("http://localhost:5000");
  // const socket = io("https://swift-chat-server.onrender.com");

  useEffect(() => {
    const msgContainer = document.getElementById("msgContainer");
    msgContainer?.scrollTo(20, msgContainer?.scrollHeight);
  }, []);

  if (isLoading) {
    return (
      <div className="w-12 my-[20%] h-12 mx-auto border-4 border-dashed border-black rounded-full animate-spin border-mainColor"></div>
    );
  }

  socket.on("connection", (data) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat md:w-[600px] w-[345px] chat-start">
    <div class="chat-bubble md:text-base text-sm">${data}</div>
  </div>`;
    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
  });

  const handleSend = () => {
    const message = inputRef.current.value;
    if (message === "") {
      return;
    }
    const newMessage = {
      time: moment().format("h:mm A, MMM D"),
      senderEmail: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
      receiverEmail,
      message,
    };
    socket.emit("sendMessage", newMessage);
    axiosPublic.post("/save-message", newMessage).then(() => {
      sendTone.play();
    });

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
    <div class="chat-bubble md:text-base text-sm">${message}</div>
    <div class="chat-footer">
    <time class="text-xs">${moment().format("h:mm A, MMM D")}</time>
    </div>
  </div>`;
    const msgContainer = document.getElementById("msgContainer");
    msgContainer.appendChild(div);
    msgContainer?.scrollTo(20, msgContainer?.scrollHeight);
    inputRef.current.value = "";
  };

  socket.on("message", (data) => {
    if (user?.email === data?.receiverEmail) {
      ReciveTone.play();
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
    <div class="chat-bubble md:text-base text-sm">${data?.message}</div>
    <div class="chat-footer">
    <time class="text-xs">${data?.time}</time> </div>
  </div>`;
      const msgContainer = document.getElementById("msgContainer");
      msgContainer.appendChild(div);
    } else {
      return;
    }
  });

  const handleTyping = () => {
    socket.emit("typing", {
      typing: `${user?.displayName} is typing...`,
      photo: user?.photoURL,
      receiverEmail,
    });
  };

  const handleType = () => {
    socket.emit("typing", {
      typing: ``,
      receiverEmail,
    });
  };

  socket.on("typing", (data) => {
    if (user?.email === data?.receiverEmail) {
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
    } else {
      return;
    }
  });

  return (
    <>
      <div className="md:min-h-screen h-[calc(100vh-54px)] md:pt-8 pt-6 w-full relative">
        <div
          id="msgContainer"
          className="flex w-full flex-col pt-8 text-white h-[90%] pr-2 overflow-y-auto overflow-x-hidden pb-6 "
        >
          <div className="w-full">
            {conversations?.map((message, idx) => (
              <div
                key={idx}
                className={`chat pl-2 ${
                  user?.email === message?.senderEmail
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={message?.photo}
                    />
                  </div>
                </div>
                <div className="chat-header">{message?.name}</div>
                <div className="chat-bubble md:text-base text-sm">
                  {message?.message}
                </div>
                <div className="chat-footer">
                  <time className="text-xs">{message?.time}</time>
                </div>
              </div>
            ))}
          </div>
        </div>
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
