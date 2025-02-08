import { useNavigate } from "react-router-dom";
import { useWishes } from "../../api/wishAPI";
import MyWishSmallCard from "../../components/Cards/MyWishSmallCard";
import WishInfoMolecule from "./WishInfoMolecule";

const WishMainMolecule = () => {
  const { data } = useWishes(3);
  const navigate = useNavigate();

  const imageUrls = data?.wishItemEntities?.map((item) => item.imageUrl) || [];
  const total = data?.total || 0;

  return (
    <div className="mt-4 h-full">
      <div className="h-[40vh] mb-4">
        <WishInfoMolecule
          onItemClick={(item) =>
            navigate(`/shop/search?query=${encodeURIComponent(item)}&page=1`)
          }
        />
      </div>
      <MyWishSmallCard images={imageUrls} total={total} />
    </div>
  );
};

export default WishMainMolecule;
