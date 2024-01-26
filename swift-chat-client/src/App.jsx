import { useEffect } from "react";
import io from "socket.io-client";
import Sidebar from "./Layouts/Sidebar";
import People from "./Layouts/People";
import ChatBox from "./Layouts/ChatBox";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);
   
  return (
    <>
      <div style={{
        backgroundImage:'url(https://i.ibb.co/zZ0Z3CT/Desktop.webp)',
    
        objectFit:'cover'
      }} className="flex object-cover">
        <div className="lg:block hidden">
          <Sidebar></Sidebar>
        </div>
        <div className="lg:block hidden">
          <People></People>
        </div>
        <div >
          <ChatBox></ChatBox>
        </div>
        {/* <div className="xl:w-[67%] lg:w-[54%] w-[80%]">
          <ChatBox></ChatBox>
        </div> */}
      </div>
    </>
  );
}

export default App;
