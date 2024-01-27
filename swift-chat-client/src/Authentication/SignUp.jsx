import { useForm } from "react-hook-form";
import { useState } from "react";
import { TiMessages } from "react-icons/ti";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const imgUploadKey = import.meta.env.VITE_APP_IMGBBKEY;
const imageUpURI = `https://api.imgbb.com/1/upload?key=${imgUploadKey}`;
const SignUp = () => {
  const [isShow, setShow] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const closeModal = () => {
    document.getElementById("my_modal_4").showModal();
    document.getElementById("my_modal_3").close();
  };

  const onSubmit = async (data) => {
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;
    const imageFile = { image: data?.photourl[0] };
    const res = await axios.post(imageUpURI, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const image = res.data?.data?.display_url;

    signUp(email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: name,
          photoURL: image,
        }).then(() => {
          console.log("name and picture updated");
        });
        toast.success("SignUp Successfull 🎉");
        document.getElementById('my_modal_3').close()
        navigate('/inbox')
      })
      .catch((err) => toast.error(`${err.message.slice(17).replace(")", "")}`));
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mx-auto max-w-screen-xl  py-4 md:py-12 lg:px-8">
            <h1 className="text-2xl flex items-center gap-3 font-semibold pb-4 capitalize">
              Create an account <TiMessages />
            </h1>
            <div className="mx-auto max-w-md">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mb-0 space-y-4 rounded-lg  "
              >
                <div>
                  <label htmlFor="Name" className="sr-only">
                    Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="w-full rounded-lg border border-gray-200 p-3 pe-12 text-sm shadow-sm"
                      placeholder="Enter Name"
                    />
                    {errors.name?.type === "required" && (
                      <p role="alert" className="text-red-500 text-sm">
                        Name is required
                      </p>
                    )}

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mt-0 pt-0">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full rounded-lg border border-gray-200 p-3 pe-12 text-sm shadow-sm"
                      placeholder="Enter email"
                    />
                    {errors.email?.type === "required" && (
                      <p role="alert" className="text-red-500 text-sm">
                        Email is required
                      </p>
                    )}

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div></div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      {...register("password", { required: true })}
                      type={`${isShow ? "text" : "password"}`}
                      className="w-full border rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                      placeholder="Enter password"
                    />
                    {errors.password?.type === "required" && (
                      <p role="alert" className="text-red-500 text-sm">
                        Password is required
                      </p>
                    )}

                    <span
                      onClick={() => setShow(!isShow)}
                      className="absolute cursor-pointer inset-y-0 end-0 grid place-content-center px-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="md:flex gap-2 items-center">
                  <div className="flex-1">
                    <label htmlFor="password" className="sr-only">
                      Picture
                    </label>

                    <div className="relative">
                      <input
                        type="file"
                        {...register("photourl", { required: true })}
                        className="file-input w-full text-xs  focus:outline-none"
                      />{" "}
                      {errors.photourl?.type === "required" && (
                        <p role="alert" className="text-red-500 text-sm">
                          Photo is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="block w-full rounded-lg  bg-neutral px-5 py-3 text-sm font-medium text-white"
                >
                  Sign up
                </button>

                <p className="text-center text-sm flex text-gray-600">
                  Already have an account?
                  <button
                    onClick={closeModal}
                    className="underline ml-1 cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </form>
              <div className="md:max-w-[220px] max-w-[140px]"> </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SignUp;
