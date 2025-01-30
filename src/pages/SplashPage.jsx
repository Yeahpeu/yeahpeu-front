import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coupleImg from "../assets/couple.png";
import typoImg from "../assets/typo.png";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 bg-red-100 animate-fadeOut" />
      <div className="relative h-full flex flex-col justify-center items-center animate-fadeOut">
        <div className="w-[20rem]">
          <img src={coupleImg} alt="CoupleImg" />
        </div>
        <div>
          <img src={typoImg} alt="TypoImg" />
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
