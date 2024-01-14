import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoShareSocial } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoArchive } from "react-icons/go";

const Sidebar = () => {
  return (
    <div className="bg-[#111E25] h-screen w-[80px]">
      <div className="flex-col justify-between py-4">
        <div className="absolute flex flex-col space-y-8 left-5 top-32">
          <span className="tooltip tooltip-right cursor-pointer" data-tip="Coming soon">
            <IoHomeOutline className="text-white text-[30px]" />
          </span>
          <span className="tooltip tooltip-right cursor-pointer" data-tip="Coming soon">
            <IoSearchOutline className="text-white text-[30px]" />
          </span>
          <span className="tooltip tooltip-right cursor-pointer" data-tip="Coming soon">
            <GoArchive className="text-white text-[30px]" />
          </span>
          <span className="tooltip tooltip-right cursor-pointer" data-tip="Coming soon">
            <IoBookmarksOutline className="text-white text-[30px]" />
          </span>
          <span className="tooltip tooltip-right cursor-pointer" data-tip="Coming soon">
            <IoShareSocial className="text-white text-[30px]" />{" "}
          </span>
          <span className="tooltip tooltip-right cursor-pointer" data-tip="Coming soon">
            <IoSettingsOutline className="text-white text-[30px]" />{" "}
          </span>
        </div>
        <div className="absolute bottom-10 left-3">
          <img
            src="https://i.postimg.cc/RhDLrVcs/dpcircle.png"
            className="w-[40px] h-[40px] cursor-pointer"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
