import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishes } from "../../api/wishAPI";
import MyWishSmallCard from "../../components/Cards/MyWishSmallCard";
import WishIconMolecule from "./WishIconMolecule";
import { useWishStore } from "../../stores/wishStore";
import EmblaCarousel from "./Carousel/EmblaCarousel";
import ad1 from "../../assets/ad/ad1.jpg";
import ad2 from "../../assets/ad/ad2.jpg";
import ad3 from "../../assets/ad/ad3.jpg";
import ad4 from "../../assets/ad/ad4.jpg";

const WishMainMolecule = () => {
  const { data } = useWishes(3);
  const navigate = useNavigate();
  const { selectedCategory, setCategory } = useWishStore();
  const ads = [
    { src: ad1, alt: "광고 1" },
    { src: ad2, alt: "광고 2" },
    { src: ad3, alt: "광고 3" },
    { src: ad4, alt: "광고 4" },
  ];
  const options = {
    loop: true,
  };

  const imageUrls = data?.wishItemEntities?.map((item) => item.imageUrl) || [];
  const total = data?.total || 0;

  useEffect(() => {
    if (!selectedCategory) {
      setCategory(null);
    }
  }, [setCategory, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      navigate(
        `/shop/search?query=${encodeURIComponent(
          selectedCategory.items[0]
        )}&page=1`
      );
    }
  }, [selectedCategory, navigate]);

  return (
    <div className="mt-4 h-full">
      <div className="mb-6">
        <EmblaCarousel slides={ads} options={options} />
        <WishIconMolecule />
      </div>
      <MyWishSmallCard images={imageUrls} total={total} />
    </div>
  );
};

export default WishMainMolecule;
