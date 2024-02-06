import { Link } from "react-router-dom";
import "../Components/error.css";
const ErrorPage = () => {
  return (
    <div>
      <h3 className="page-tittle">404 NOT FOUND</h3>

      <div className="main-container">
        <div className="image-box">
          <img
            src="https://i.postimg.cc/kg617VjF/Scarecrow.png"
            alt=""
            className="img"
          />
        </div>

        <div className="text-box">
          <h1 className="text-tittle">Oppss!</h1>
          <p className="text-description">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <Link to={"/"}>
            <button className="backHom">BACK TO HOMEPAGE</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
