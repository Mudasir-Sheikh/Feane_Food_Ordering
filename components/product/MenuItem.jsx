import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const MenuItem = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const findCart = cart.products.find((item) => item._id === product._id);

  const addToCart = () => {
    dispatch(
      addProduct({
        ...product,
        extras: [],
        price: product.prices[0],
        quantity: 1,
        foodQuantity: 1,
      })
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative overflow-hidden">
      <div className="w-full h-[210px] flex justify-center items-center rounded-t-2xl overflow-hidden">
        <Link href={`/product/${product._id}`}>
          <div className="relative w-full h-full">
            <Image
              src={product.img}
              alt={product.title}
              layout="fill"
              objectFit="cover" // Ensure the image covers the area while preserving aspect ratio
              className="transition-transform duration-300 hover:scale-105" // Slight zoom effect on hover
            />
          </div>
        </Link>
      </div>
      <div className="p-5 text-gray-800">
        <h4 className="text-xl font-bold mb-1">{product.title}</h4> {/* Bold and larger title */}
        <p className="text-sm text-gray-600 mb-4">{product.desc}</p> {/* Lighter description */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-purple-600">${product.prices[0]}</span> {/* Emphasized price */}
          <button
            className={`btn-primary w-10 h-10 rounded-full p-0 grid place-content-center transition-colors duration-200 ${
              findCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
            }`}
            disabled={findCart}
            onClick={addToCart}
          >
            <RiShoppingCart2Fill className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
