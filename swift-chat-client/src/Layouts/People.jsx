/* eslint-disable react/prop-types */

import { IoSearchOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const People = () => {
  const { peoples, setConvo, setShowPeople, setReceiverEmail } = useAuth();

  const handleCreateConvo = (people) => {
    setConvo(people);
    const receiverEmail = people?.email
    setReceiverEmail(receiverEmail);
    setShowPeople(false);
  };



  return (
    <div
      className={`bg-[#111E25] max-h-screen overflow-y-auto overflow-x-hidden`}
    >
      <div className="p-6 pl-2 pb-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here . . ."
            className="input bg-[#2c3e50] pl-10 text-white font-normal input-bordered input-sm w-full max-w-xs focus:outline-none "
          />
          <IoSearchOutline className="text-[22px] text-white absolute top-1 left-3" />
        </div>
        <h1 className="text-2xl text-white pt-4">Message</h1>
      </div>
      <div className="space-y-4 ml-1 p-6 pl-2 pt-4 h-screen lg:w-[300px] w-[260px]">
        {peoples?.map((people) => (
          <div
            onClick={() => handleCreateConvo(people)}
            key={people?._id}
            className="flex gap-3 cursor-pointer bg-[#2c3e50] items-center px-4 py-2 rounded"
          >
            <img
              src={people?.photoURL}
              className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="text-white text-sm">{people?.name}</h1>
              <p className="text-gray-100 font-light text-xs">Heyy there!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
