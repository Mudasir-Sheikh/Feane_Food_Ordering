import { useSelector, useDispatch } from "react-redux";
import {
  quantityDecrease,
  quantityIncrease,
  reset,
} from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Cart = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const [productState, setProductState] = useState([]);

  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    products: productState,
    method: 0,
  };

  useEffect(() => {
    const productTitles = cart.products.map((product) => {
      return {
        title: product.title,
        foodQuantity: product.foodQuantity,
        extras: product.extras,
      };
    });
    setProductState(productTitles);
  }, [cart.products]);

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure you want to create this order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );

          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order created successfully");
          }
        }
      } else {
        router.push("/auth/login");
        throw new Error("You must be logged in to create an order");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const quantityChange = (type, product) => {
    if (type === 0) {
      dispatch(quantityDecrease(product));
    }
    if (type === 1) {
      dispatch(quantityIncrease(product));
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)] bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="flex flex-1 p-10 overflow-x-auto">
          {cart.products.length > 0 ? (
            <div className="max-h-[40rem] overflow-auto w-full">
              <table className="w-full text-sm text-center text-gray-700 border border-gray-300 rounded-lg shadow-md">
                <thead className="text-xs text-gray-100 uppercase bg-gray-800">
                  <tr>
                    <th scope="col" className="py-4 px-4">
                      Product
                    </th>
                    <th scope="col" className="py-4 px-4">
                      Extras
                    </th>
                    <th scope="col" className="py-4 px-4">
                      Price
                    </th>
                    <th scope="col" className="py-4 px-4">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product) => (
                    <tr
                      className="transition-all bg-white border-b hover:bg-gray-200"
                      key={product._id}
                    >
                      <td className="py-4 px-4 font-medium whitespace-nowrap">
                        <span className="text-purple-600">{product.title}</span>
                      </td>
                      <td className="py-4 px-4 font-medium whitespace-nowrap">
                        {product.extras.length > 0
                          ? product.extras.map((item) => (
                              <span key={item._id}>
                                {item.text}
                                <br />
                              </span>
                            ))
                          : "No Extras"}
                      </td>
                      <td className="py-4 px-4 font-medium whitespace-nowrap">
                        ${product.price}
                      </td>
                      <td className="py-4 px-4 flex items-center justify-center">
                        <button
                          className="transition duration-200 hover:text-red-500"
                          onClick={() => quantityChange(0, product)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="mx-2">{product.foodQuantity}</span>
                        <button
                          className="transition duration-200 hover:text-green-500"
                          onClick={() => quantityChange(1, product)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold">Your cart is empty</h1>
              <button
                className="btn-primary mt-4"
                onClick={() => router.push("/menu")}
              >
                Go to menu
              </button>
            </div>
          )}
        </div>

        <div className="bg-secondary min-h-[calc(100vh_-_433px)] md:h-screen flex flex-col justify-center text-white p-8 rounded-lg shadow-md md:w-[250px] w-full md:text-start text-center">
          <h2 className="text-[40px] font-bold">Cart Total</h2>
          <div className="mt-6">
            <b>Subtotal: </b>${cart.total} <br />
            <b className="inline-block my-1">Discount: </b>$0.00 <br />
            <b>Total: </b>${cart.total}
          </div>

          <div className="mt-8">
            <button
              className="btn-primary mt-4 md:w-auto w-52 transition duration-200 hover:bg-purple-600"
              onClick={createOrder}
            >
              Checkout Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
