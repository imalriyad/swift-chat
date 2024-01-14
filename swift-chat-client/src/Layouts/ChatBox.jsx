import { RiSendPlane2Fill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa6";
import { useRef } from "react";

const ChatBox = () => {
  const inputRef = useRef(null);
  const handleSend = () => {
    const msg = inputRef.current.value;
   alert(msg)
  };
  return (
    <div className="h-screen ml-4 w-full relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Write your message here . . ."
        className="input input-bordered rounded-lg font-normal bg-[#2c3e50] text-white  placeholder:font-light w-full absolute bottom-2 right-2 "
      />

      {inputRef === null? (
        <span className="bg-[#111E25] p-[14px] align-middle rounded-full absolute text-xl text-white bottom-2 -right-12 cursor-pointer">
          <FaMicrophone />
        </span>
      ) : (
        <span
          onClick={handleSend}
          className="bg-[#111E25] p-[14px] align-middle rounded-full absolute text-xl text-white bottom-2 -right-12 cursor-pointer"
        >
          <RiSendPlane2Fill />
        </span>
      )}
    </div>
  );
};

export default ChatBox;
