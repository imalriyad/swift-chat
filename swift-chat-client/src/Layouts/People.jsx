import { IoSearchOutline } from "react-icons/io5";

const People = () => {
  const peoples = [1];
  return (
    <div className="bg-[#111E25] max-h-screen overflow-y-auto overflow-x-hidden">
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
      <div className="space-y-4 ml-1 p-6 pl-2 pt-4 h-screen w-[300px]">
        {peoples.map((id) => (
          <div
            key={id}
            className="flex gap-3 bg-[#2c3e50] items-center px-4 py-2 rounded"
          >
            <img
              src="https://i.postimg.cc/RhDLrVcs/dpcircle.png"
              className="w-[40px] h-[40px] cursor-pointer"
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="text-white text-sm">Al Riyad</h1>
              <p className="text-gray-100 font-light text-xs">Heyy there!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
