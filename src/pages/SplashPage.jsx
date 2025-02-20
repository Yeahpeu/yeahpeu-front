import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coupleImg from "../assets/couple2.png";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 animate-fadeOut" />
      <div className="relative h-full flex flex-col justify-center items-center animate-fadeOut">
        <div>
          <img src={coupleImg} alt="CoupleImg" />
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
