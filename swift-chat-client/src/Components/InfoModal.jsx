import useAuth from "../hooks/useAuth";

/* eslint-disable react/prop-types */
const InfoModal = () => {
  const { createConvo } = useAuth();
  return (
    <>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box bg-[#2C3E50] shadow-2xl max-w-sm">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          <div className="w-full mx-auto text-center ">
            <div className="avatar online">
              <div className="w-24 rounded-full">
                <img
                  src={createConvo?.photoURL}
                  className="ring ring-offset-base-100 ring-offset-2 object-cover "
                />
              </div>
            </div>

            <h1 className="text-lg text-white pt-4 ">{createConvo?.name}</h1>
            <h1 className="text-lg text-white pt-2">{createConvo?.email}</h1>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default InfoModal;
