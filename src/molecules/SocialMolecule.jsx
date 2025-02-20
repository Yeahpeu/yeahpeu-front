import long from "../assets/google_long.png";
import { Navigate } from "react-router-dom";

// import { useSocialLogin } from "../api/authAPI";

const SocialMoleCule = () => {
  const handleSocialLogin = () => {
    //window.location.href = "http://localhost:8080/oauth2/authorization/google";
    window.location.href = "https://yeahpeu.site/oauth2/authorization/google";
  };
  return (
    <div>
      {/* <button>
        <img src={google} className="w-10  h-10" />
      </button> */}
      <button onClick={handleSocialLogin}>
        <img src={long} className="  h-10" />
      </button>
    </div>
  );
};

export default SocialMoleCule;
