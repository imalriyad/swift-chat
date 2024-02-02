import { useState } from "react";

import Sidebar from "./Layouts/Sidebar";
import People from "./Layouts/People";
import ChatBox from "./Layouts/ChatBox";
import useAuth from "./hooks/useAuth";
import { GoArrowLeft } from "react-icons/go";
import { IoMdInformationCircleOutline } from "react-icons/io";
import InfoModal from "./Components/InfoModal";

function App() {
  const { setShowPeople, showPeople, createConvo } = useAuth();
  const [showPeopleSM, setShowPeopleSM] = useState(false);

  const handleMenu = () => {
    setShowPeople(true);
    setShowPeopleSM(true);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url(https://i.ibb.co/zZ0Z3CT/Desktop.webp)",

          objectFit: "cover",
        }}
        className="flex w-full object-cover"
      >
        <div className={`hidden ${showPeopleSM ? "hidden" : ""}`}>
          <People></People>
        </div>
        {showPeople ? (
          <>
            <Sidebar></Sidebar>
            <People></People>
          </>
        ) : (
          <div className="w-full relative">
            <div className="bg-[#2C3E50] shadow-2xl z-10 md:pt-0 p-1 absolute top-0 w-full flex gap-1 items-center">
              <GoArrowLeft
                onClick={handleMenu}
                className="text-white cursor-pointer text-2xl font-bold ml-2"
              />
              <div className="avatar online">
                <div className="md:w-[40px] w-[30px] h-[30px] m-2 cursor-pointer md:h-[40px] rounded-full">
                  <img src={createConvo?.photoURL} className="object-cover " />
                </div>
              </div>
              <span className="flex flex-col">
                {" "}
                <h1 className="text-white">{createConvo?.name}</h1>
                <p className="text-white text-xs">Online</p>
              </span>
              <IoMdInformationCircleOutline
                onClick={() =>
                  document?.getElementById("my_modal_5")?.showModal()
                }
                className="text-white absolute right-5 cursor-pointer text-2xl font-bold "
              />
              ;
            </div>
            <ChatBox></ChatBox>
          </div>
        )}
      </div>
      <InfoModal></InfoModal>
    </>
  );
}

export default App;
