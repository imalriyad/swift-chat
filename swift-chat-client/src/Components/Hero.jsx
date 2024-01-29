import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Login from "../Authentication/Login";

const Hero = () => {
  const { user } = useAuth();
  const handaleModal = (event) => {
    event.preventDefault();
    document.getElementById("my_modal_4").showModal();
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://i.ibb.co/NySknjr/undraw-Work-chat-re-qes4.png"
            className="w-[280px] mx-auto md:w-[400px] "
          />
          <div>
            <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold">
              SwiftChat- Chatting Application
            </h1>
            <p className="py-6">
              Elevating Communication in the Digital Age: Empowering Users with
              a Platform Where Every Word Sparks Meaningful Dialogues and Forges
              Lasting Connections.
            </p>
            <a
              className="rounded-md bg-[#2C3E50] px-5 py-2.5 text-sm text-white shadow"
              href="/"
            >
              {user ? (
                <Link to={"/inbox"}>Get Started</Link>
              ) : (
                <button onClick={handaleModal}>Get Started</button>
              )}
            </a>
          </div>
        </div>
      </div>
      <Login></Login>
    </div>
  );
};

export default Hero;
