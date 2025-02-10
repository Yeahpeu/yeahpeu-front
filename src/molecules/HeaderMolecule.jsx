import coupleImg from "../assets/couple.png";

const HeaderMolecule = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full p-5 top-0 left-0 bg-white relative">
        <img src={coupleImg} alt="Yeahpeu Image" className="w-16 h-16" />
      </div>
    </>
  );
};

export default HeaderMolecule;
