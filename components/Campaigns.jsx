import Image from "next/image";
import Title from "./ui/Title";
import { MdShoppingCart } from "react-icons/md";
import Slider from "react-slick"; // Import slider for mobile

const CampaignItem = ({ title, discount, imageUrl }) => {
  return (
    <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4 transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative md:w-44 md:h-44 w-36 h-36 after:content-[''] border-[5px] border-primary rounded-full overflow-hidden transition-transform transform hover:scale-110">
        <Image
          src={imageUrl}
          alt=""
          layout="fill"
          className="object-cover"
          priority
        />
      </div>
      <div className="text-white">
        <Title addClass="text-2xl">{title}</Title>
        <div className="font-dancing my-1">
          <span className="text-[40px]">{discount}%</span>
          <span className="text-sm inline-block ml-1">Off</span>
        </div>
        <button className="btn-primary flex items-center gap-x-2 transition-colors duration-200 hover:bg-primary-dark">
          Order Now <MdShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

const Campaigns = () => {
  const campaigns = [
    {
      title: "Tasty Thursdays",
      discount: 20,
      imageUrl: "/images/pasta.jpg",
    },
    {
      title: "Fabulous Fridays",
      discount: 25,
      imageUrl: "/images/colorful-round-tasty-pizza_1284-10219.avif",
    },
    {
      title: "Savory Saturdays",
      discount: 15,
      imageUrl: "/images/istockphoto-527368199-612x612.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoint as necessary
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col container mx-auto py-20 gap-6">
      {/* Mobile slider */}
      <div className="block md:hidden">
        <Slider {...settings}>
          {campaigns.map((campaign, index) => (
            <div key={index} className="flex justify-center">
              <CampaignItem 
                title={campaign.title} 
                discount={campaign.discount} 
                imageUrl={campaign.imageUrl} 
              />
            </div>
          ))}
        </Slider>
      </div>
      
      {/* Desktop view */}
      <div className="hidden md:flex justify-between gap-6 flex-wrap">
        {campaigns.map((campaign, index) => (
          <CampaignItem 
            key={index} 
            title={campaign.title} 
            discount={campaign.discount} 
            imageUrl={campaign.imageUrl} 
          />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
