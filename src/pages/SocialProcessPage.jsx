import { useNavigate } from "react-router-dom";
import MyLoading from "../components/common/MyLoading";
import { useEffect } from "react";

const SocialProcessPage = () => {
  const navigate = useNavigate();
  //NOTE - 쿠키에 접근이 되는지 확인해봐야함
  console.log(document.cookie.includes("authToken"));

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const bearerToken = token ? `Bearer ${token}` : null;
  console.log(bearerToken);

  if (bearerToken) {
    document.cookie = `authToken=${bearerToken}; path=/`;
  }

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div>
      <MyLoading />
    </div>
  );
};

export default SocialProcessPage;
