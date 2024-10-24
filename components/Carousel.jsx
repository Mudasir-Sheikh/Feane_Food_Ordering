import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 30000,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className="h-screen w-full container mx-auto -mt-[88px]">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero-bg.jpg"
            
            alt="Background"
            layout="fill"
            priority
            objectFit="cover"
          />
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <div className="mt-48 text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-6xl font-serif">Welcome to Feane</Title>
            <p className="text-lg sm:w-2/5 w-full text-center">
              Experience exquisite dining at Feane, where modern elegance meets culinary artistry. Our menu offers a selection of dishes crafted with the finest ingredients, delivering unforgettable flavors. Immerse yourself in our sophisticated ambiance and exceptional service.
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
        <div>
          <div className="relative text-white top-48 flex flex-col items-start gap-y-8">
            <Title addClass="text-6xl font-serif">Join Us at Feane</Title>
            <p className="text-lg sm:w-2/5 w-full text-center">
              Discover a culinary journey at Feane, where every dish is a masterpiece. Our menu features innovative creations and classic favorites, all prepared to perfection. Enjoy an extraordinary dining experience with us.
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
