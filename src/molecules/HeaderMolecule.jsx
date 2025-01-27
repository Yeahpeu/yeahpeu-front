import coupleImg from "../assets/couple.png"; // 이미지 파일을 import

const HeaderMolecule = () => {
  return (
    <div className="w-full top-0 left-0 bg-white">
      <img src={coupleImg} alt="Yeahpeu Image" className="mx-auto w-20 h-20" />
    </div>
  );
};

export default HeaderMolecule;
