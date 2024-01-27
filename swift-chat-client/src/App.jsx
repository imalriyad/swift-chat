import { useEffect } from "react";
import io from "socket.io-client";
import Sidebar from "./Layouts/Sidebar";
import People from "./Layouts/People";
import ChatBox from "./Layouts/ChatBox";
import useAuth from "./hooks/useAuth";

function App() {
  const { user } = useAuth();
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: "url(https://i.ibb.co/zZ0Z3CT/Desktop.webp)",

          objectFit: "cover",
        }}
        className="flex object-cover"
      >
        <div className="md:block hidden">
          <Sidebar></Sidebar>
        </div>
        <div className="md:block hidden">
          <People></People>
        </div>
        <div className="w-full relative">
          <div className="bg-[#2C3E50] z-10 absolute top-0 w-full flex gap-1 items-center">
            <div className="avatar online">
              <div className="md:w-[40px] w-[30px] h-[30px] m-2 cursor-pointer md:h-[40px] rounded-full">
                <img src={user?.photoURL} className="object-cover " />
              </div>
             
            </div>
           <span className="flex flex-col"> <h1 className="text-white">{user?.displayName}</h1>
            <p className="text-white text-xs">Online</p></span>
          </div>
          <ChatBox></ChatBox>
        </div>
      </div>
    </>
  );
}

export default App;
