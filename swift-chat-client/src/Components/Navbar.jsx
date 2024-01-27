import { useState } from "react";
import SignUp from "../Authentication/SignUp";
import Login from "../Authentication/Login";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const menuLinks = (
    <>
      <li className="hover:border-b border-[#2C3E50]">
        <a className="text-gray-500 transition " href="/">
          Features
        </a>
      </li>

      <li className="hover:border-b border-[#2C3E50]">
        <a className="text-gray-500 transition " href="/">
          Desktop app
        </a>
      </li>
      <li className="hover:border-b border-[#2C3E50]">
        <a className="text-gray-500 transition " href="/">
          Privacy & safety
        </a>
      </li>
      <li className="hover:border-b border-[#2C3E50]">
        <a className="text-gray-500 transition " href="/">
          For developers
        </a>
      </li>
    </>
  );
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <img
                src="https://i.ibb.co/414WytQ/swiftchat.png"
                alt=""
                className="md:w-[200px] w-[120px]"
              />
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">{menuLinks}</ul>
              </nav>

              <div className="flex items-center gap-4">
                {user?.photoURL ? (
                  <div className="avatar online">
                    <div className="w-[40px] cursor-pointer h-[40px] rounded-full">
                      <img src={user?.photoURL} className="object-cover"/>
                    </div>
                  </div>
                ) : (
                  <div className="sm:flex sm:gap-4">
                    <p
                      onClick={() =>
                        document.getElementById("my_modal_4").showModal()
                      }
                      className="rounded-md bg-[#2C3E50] px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer "
                    >
                      Login
                    </p>

                    <div className="hidden sm:flex">
                      <p
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                        className="rounded-md cursor-pointer bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#2C3E50]"
                      >
                        Register
                      </p>
                    </div>
                  </div>
                )}

                <div className="block md:hidden">
                  <button
                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-14 right-4 bg-white border rounded-md list-none shadow-md space-y-3 p-8 z-10">
                      {menuLinks}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SignUp></SignUp>
      <Login></Login>
    </div>
  );
};

export default Navbar;
