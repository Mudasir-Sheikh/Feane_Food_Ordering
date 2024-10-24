import Image from "next/image";

const CustomerItem = ({ imgSrc }) => {
  return (
    <div className="mt-5 mx-4">
      <div className="p-6 bg-secondary text-white rounded-[5px] shadow-md">
        <p>
          Feane was an absolute gem! The food was exquisite, the service impeccable, and the atmosphere was perfect for a special occasion. I highly recommend this restaurant to anyone looking for a truly memorable dining experience.
        </p>
        <div className="flex flex-col mt-4">
          <span className="text-lg font-semibold">Moana Michell</span>
          <span className="text-[15px]">magna aliqua</span>
        </div>
      </div>

      <div
        className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 flex justify-center items-center before:content-[''] before:absolute before:top-0 before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5"
      >
        <Image
          src={imgSrc}
          alt="Customer Image"
          layout="fill"
          objectFit="cover" // Changed to 'cover' for better image fitting
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default CustomerItem;
