import google from "../assets/google_signup.png";
import long from "../assets/google_long.png";
import { useSocialLogin } from "../api/authAPI";

const SocialMoleCule = () => {
  const handleSocialLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_BASE_URL + "oauth2/authorization/google";
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
