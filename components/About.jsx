import Image from "next/image";
import Title from "./ui/Title";

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
        <div className="flex justify-center">
          <div className="relative sm:w-[445px] sm:h-[600px] flex justify-center w-[300px] h-[450px]">
            <Image 
              src="/images/about-img.png" 
              alt="About Us" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg shadow-lg" 
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <Title addClass="text-[40px] font-serif">We Are Feane</Title>
          <p className="my-5 text-lg text-center">
            At Feane, dining is an experience, not just a meal. Our passion for culinary excellence drives us to create unforgettable moments with exquisite cuisine and impeccable service. Our talented chefs use only the finest ingredients, crafting a diverse menu of classic favorites and innovative creations.
          </p>
          <p className="my-5 text-lg text-center">
            We believe in sustainability and source our ingredients locally whenever possible. This commitment not only enhances the flavor of our dishes but also supports local farmers and producers. Join us as we strive to elevate your dining experience in a warm and welcoming atmosphere.
          </p>
          <div className="flex justify-center">
            <button className="btn-primary">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
