import { RiSendPlane2Fill } from "react-icons/ri";
// import { FaMicrophone } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useConversation from "../hooks/useConversation";
import { RiArrowDownLine } from "react-icons/ri";

const ChatBox = () => {
  const { user, receiverEmail } = useAuth();
  const [conversations, conversationId, isLoading] = useConversation();
  const [goBottom, setGoBottom] = useState(true);
  const inputRef = useRef(null);
  const axiosPublic = useAxios();
  const sendTone = new Audio("/send.mp3");

  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    upgrade: false,
    withCredentials: true, // Send cookies with WebSocket connection
  });
  // const socket = io("https://swift-chat-server.onrender.com");

  // Handle go bottom icon while scrolling
  useEffect(() => {
    const msgContainer = document.getElementById("msgContainer");
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = msgContainer?.scrollTop || 0;

      // Check if the user has scrolled beyond 30 pixels
      if (scrollTop > 30) {
        setGoBottom(true);
      } else {
        setGoBottom(false);
      }

      // Check the scroll direction
      if (scrollTop > lastScrollTop) {
        // Scrolling down, hide the button
        setGoBottom(false);
      } else {
        // Scrolling up, show the button
        setGoBottom(true);
      }

      // Save the current scroll position
      lastScrollTop = scrollTop;
    };

    // Attach the event listener when the component mounts
    msgContainer?.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      msgContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    const msgContainer = document.getElementById("msgContainer");

    // Scroll to the bottom
    msgContainer?.scrollTo({
      top: msgContainer?.scrollHeight,
      behavior: "smooth", // You can use 'auto' for instant scroll
    });
  };

  // Recvive message and show to ui
  useEffect(() => {
    const ReciveTone = new Audio("/recive.mp3");
    const handleMessage = (data) => {
      // Check if the received message is meant for the current user also have to be their conversationId same
      if (
        user?.email === data?.receiverEmail &&
        conversationId === data.conversationId
      ) {
        ReciveTone.play();

        const div = document.createElement("div");
        div.innerHTML = `<div class="chat md:w-[600px] w-[345px] chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src=${data?.photo} />
          </div>
        </div>
        <div class="chat-header">${data?.name}</div>
        <div class="chat-bubble md:text-base text-sm">${data?.message}</div>
        <div class="chat-footer">
          <time class="text-xs">${data?.time}</time>
        </div>
      </div>`;

        const msgContainer = document.getElementById("msgContainer");
        msgContainer.appendChild(div);
        msgContainer?.scrollTo(20, msgContainer?.scrollHeight);
      } else {
        return;
      }
    };

    // Bind the event when the component mounts
    socket.on("message", handleMessage);

    // Clean up the event binding when the component unmounts
    return () => {
      socket.off("message", handleMessage);
    };
  }, [user?.email, socket, conversationId]);

  // Showing loader in ui
  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-sm text-center py-[20%]">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  // send mesage with socket.io
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

  // Handle typing and emit socket.io
  const handleTyping = () => {
    socket.emit("typing", {
      typing: `${user?.displayName} is typing...`,
      photo: user?.photoURL,
      receiverEmail,
      conversationId,
    });
  };

  // Handle typing and emit socket.io
  const handleType = () => {
    socket.emit("typing", {
      typing: ``,
      receiverEmail,
      conversationId,
    });
  };

  // show typing in ui
  socket.on("typingNotify", (data) => {
    const msgContainer = document.getElementById("msgContainer");
    if (user?.email === data?.receiverEmail) {
      // Remove existing typing messages
      const typingMessages = msgContainer?.querySelectorAll(".typing-message");
      typingMessages?.forEach((message) => message.remove());

      // Append the new typing message if there's content
      if (data?.typing) {
        const typingMessage = document.createElement("div");
        typingMessage.className =
          "chat flex md:w-[600px] w-[345px] chat-start typing-message";
        typingMessage.innerHTML = `
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src=${data?.photo} />
        </div>
      </div>
      <div class="chat-bubble md:text-base text-sm">${data?.typing}</div>
    `;
        msgContainer.appendChild(typingMessage);
        msgContainer?.scrollTo(20, msgContainer?.scrollHeight);
      }
    }
  });

  return (
    <>
      <div className="md:min-h-screen h-[calc(100vh-54px)] md:pt-8 pt-6 w-full relative">
        <div
          id="msgContainer"
          className="flex w-full flex-col pt-8 text-white h-[90%] pr-2 overflow-y-auto overflow-x-hidden pb-6 "
        >
          <div id="down" className="absolute left-[45%] z-10 top-[60%]">
            {" "}
            {goBottom && (
              <button onClick={scrollToBottom}>
                {" "}
                <RiArrowDownLine className="text-3xl text-[#c0c6cc]" />
              </button>
            )}
          </div>
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
