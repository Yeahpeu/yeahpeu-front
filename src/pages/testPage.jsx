import EmblaCarousel from "../molecules/WishMolecules/Carousel/EmblaCarousel";
import ad1 from "../assets/ad/ad1.jpg";
import ad2 from "../assets/ad/ad2.jpg";
import ad3 from "../assets/ad/ad3.jpg";

import "../molecules/WishMolecules/Carousel/embla.css";

const TestPage = () => {
  const ads = [
    { src: ad1, alt: "광고 1" },
    { src: ad2, alt: "광고 2" },
    { src: ad3, alt: "광고 3" },
  ];

  const options = {
    loop: true,
  };

  return (
    <div>
      <div>
        <h1>TestPage</h1>
        <div className="flex mx-auto w-80">
          <EmblaCarousel slides={ads} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
