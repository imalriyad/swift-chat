/* eslint-disable react/prop-types */
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoShareSocial } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoArchive } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoMdLogOut } from "react-icons/io";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogut = () => {
    logout()
      .then(() => {
        toast.success("Successfully Logout!");
        navigate("/");
      })
      .catch((error) =>
        toast.error(`${error.message.slice(22).replace(")", "")}`)
      );
  };
  return (
    <div
      className={`bg-[#111E25] h-screen lg:w-[80px] w-[60px]`}
    >
      <div className="flex-col justify-between py-4">
        <div className="absolute flex flex-col space-y-8 left-5 top-32">
          <Link to="/" className=" cursor-pointer">
            <IoHomeOutline className="text-white md:text-[30px] text-[20px]" />
          </Link>
          <span
            className="tooltip tooltip-right cursor-pointer"
            data-tip="Coming soon"
          >
            <IoSearchOutline className="text-white md:text-[30px] text-[20px]" />
          </span>
          <span
            className="tooltip tooltip-right cursor-pointer"
            data-tip="Coming soon"
          >
            <GoArchive className="text-white md:text-[30px] text-[20px]" />
          </span>
          <span
            className="tooltip tooltip-right cursor-pointer"
            data-tip="Coming soon"
          >
            <IoBookmarksOutline className="text-white md:text-[30px] text-[20px]" />
          </span>
          <span
            className="tooltip tooltip-right cursor-pointer"
            data-tip="Coming soon"
          >
            <IoShareSocial className="text-white md:text-[30px] text-[20px]" />{" "}
          </span>
          <span
            className="tooltip tooltip-right cursor-pointer"
            data-tip="Coming soon"
          >
            <IoSettingsOutline className="text-white md:text-[30px] text-[20px]" />{" "}
          </span>
        </div>

        <div className="dropdown dropdown-top absolute bottom-10 left-3">
          <div tabIndex={0} role="" className=" m-1">
            <div className="">
              <div className="avatar online">
                <div className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] cursor-pointer  rounded-full">
                  <img src={user?.photoURL} className="object-cover" />
                </div>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-1 shadow bg-[#2C3E50] text-center rounded-lg w-24"
          >
            <li className="text-white">
              <p onClick={handleLogut} className="flex gap-1">
                Logout <IoMdLogOut className="text-lg" />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
