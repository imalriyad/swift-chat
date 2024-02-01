import { RiSendPlane2Fill } from "react-icons/ri";
// import { FaMicrophone } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useConversation from "../hooks/useConversation";
import Skeleton from "react-loading-skeleton";
import SkeletonMessage from "../Components/SkeletonMessage";


const ChatBox = () => {
  const { user, receiverEmail } = useAuth();
  const [conversations, isLoading] = useConversation();
  const inputRef = useRef(null);
  const axiosPublic = useAxios();
  const sendTone = new Audio("/send.mp3");

  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    upgrade: false,
    withCredentials: true,
  });

 const msgContainerRef = useRef();

 useEffect(() => {
   const msgContainer = msgContainerRef.current;
   if (msgContainer) {
     // Scroll to the bottom
     msgContainer.scrollTo({
       top: msgContainer.scrollHeight,
       behavior: "auto",
     });
   }
 }, []);


  const generateRoomId = (userId1, userId2) => {
    // Sort the user IDs to create a consistent room ID
    const sortedIds = [userId1, userId2].sort();
    return `${sortedIds[0]}-${sortedIds[1]}`;
  };

  const room = generateRoomId(user?.email, receiverEmail);

  // Join the new room
  socket.emit("joinRoom", room);

  // const socket = io("https://swift-chat-server.onrender.com");

  // Recvive message and show to ui
  useEffect(() => {
    const ReciveTone = new Audio("/recive.mp3");
    const handleMessage = (data) => {
      ReciveTone.play();
      const div = document.createElement("div");
      div.innerHTML = `<div class="chat md:w-[600px] w-[345px] chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="profile.png" src=${data?.photo} />
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
    };

    // Bind the event when the component mounts
    socket.on("message", handleMessage);

    // Clean up the event binding when the component unmounts
    return () => {
      socket.off("message", handleMessage);
    };
  }, [user?.email, socket]);

  // show typing in UI
  useEffect(() => {
    socket.on("typingNotify", (data) => {
      const msgContainer = document.getElementById("msgContainer");

      // Check if the notification is for the current conversation/room
      if (data?.room === room && data?.receiverEmail === user?.email) {
        // Remove existing typing messages
        const typingMessages =
          msgContainer?.querySelectorAll(".typing-message");
        typingMessages?.forEach((message) => message.remove());

        // Append the new typing message if there's content
        if (data?.typing) {
          const typingMessage = document.createElement("div");
          typingMessage.className = `chat flex md:w-[600px] w-[345px] chat-start typing-message`;
          typingMessage.innerHTML = `
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="profile.png" src=${data?.photo} />
            </div>
          </div>
          <div class="chat-bubble md:text-base text-sm">${data?.typing}</div>
        `;
          msgContainer.appendChild(typingMessage);
          msgContainer?.scrollTo(20, msgContainer?.scrollHeight);
        }
      }
    });
  }, [socket, room, user?.email]);

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
        <img alt="profile.png" src=${user?.photoURL} />
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

  // Example on the sender (typing user) side
  const handleTyping = () => {
    socket.emit("typing", {
      typing: `${user?.displayName} is typing...`,
      photo: user?.photoURL,
      room,
      receiverEmail,
    });
  };

  const handleStopTyping = () => {
    socket.emit("typing", {
      typing: "",
      room,
      receiverEmail,
    });
  };

  return (
    <>
      <div className="md:min-h-screen h-[calc(100vh-54px)] md:pt-8 pt-6 w-full relative">
        <div
          ref={msgContainerRef}
          id="msgContainer"
          className="flex w-full flex-col pt-8 text-white h-[90%] pr-2 overflow-y-auto overflow-x-hidden pb-6 "
        >
          <div className="w-full">
            {isLoading ? (
              <SkeletonMessage></SkeletonMessage>
            ) : (
              conversations?.map((message, idx) => (
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
                      <img alt="profile.png" src={message?.photo} />
                    </div>
                  </div>
                  <div className="chat-header">{message?.name}</div>
                  <div className="chat-bubble md:text-base text-sm">
                    {message?.message || <Skeleton />}
                  </div>
                  <div className="chat-footer">
                    <time className="text-xs">{message?.time}</time>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="w-full">
          <input
            type="text"
            ref={inputRef}
            id="input-box"
            onKeyPress={handleTyping}
            onFocus={handleTyping}
            onBlur={handleStopTyping}
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
