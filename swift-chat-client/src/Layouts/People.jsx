/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { IoSearchOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const People = () => {
  const {
    peoples,
    setConvo,
    setShowPeople,
    setReceiverEmail,
    setPeoples,
    setLoading,
    user,
  } = useAuth();

  const [searchText, setSearchText] = useState("");
  const axiosPublic = useAxios();
  const handleCreateConvo = (people) => {
    setConvo(people);
    const receiverEmail = people?.email;
    setReceiverEmail(receiverEmail);
    setShowPeople(false);
  };

  useEffect(() => {
    axiosPublic.get(`/user?name=${searchText}`).then((res) => {
      const users = res?.data.filter((people) => people?.email !== user?.email);
      setPeoples(users);
      setLoading(false);
    });
  }, [axiosPublic, searchText, setPeoples, setLoading, user]);

  const getSearchText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div
      className={`bg-[#111E25] max-h-screen overflow-y-auto overflow-x-hidden`}
    >
      <div className="p-6 pl-2 pb-0">
        <div className="relative">
          <input
            onChange={getSearchText}
            type="text"
            placeholder="Search here . . ."
            className="input bg-[#2c3e50] pl-10 text-white font-normal input-bordered input-sm w-full max-w-xs focus:outline-none "
          />
          <IoSearchOutline className="text-[22px] text-white absolute top-1 left-3" />
        </div>
        <h1 className="md:text-2xl text-lg text-white pt-4">Message</h1>
      </div>
      <div className="space-y-4 ml-1 p-6 pl-2 pt-4 overflow-y-auto lg:w-[300px] w-[260px]">
        {peoples.length <= 0 ? (
          <h1 className="text-white text-sm pt-4 text-center">
            {" "}
            Um, hi! There isn't a user with this name.
          </h1>
        ) : (
          peoples?.map((people) => (
            <div
              onClick={() => handleCreateConvo(people)}
              key={people?._id}
              className="flex gap-3 cursor-pointer bg-[#2c3e50] items-center px-4 py-2 rounded"
            >
              <img
                src={people?.photoURL}
                className="w-[35px] h-[35px] object-cover rounded-full cursor-pointer"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-white text-sm">{people?.name}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default People;
