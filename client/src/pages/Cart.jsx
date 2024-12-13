import { FiTrash } from "react-icons/fi";
import { useEffect } from "react";
import {
  cartStart,
  cartSuccess,
  cartFailure,
  cartUpdateQuantity,
  removeFromCart,
  removeFromCartStart,
  removeFromCartFailure,
  updateTotalPrice,
} from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cart);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const fetchCartData = async () => {
    try {
      dispatch(cartStart());
      const res = await fetch("/api/v1/cart", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(cartSuccess(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));
      } else {
        dispatch(cartFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(cartFailure(error.message));
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [location.pathname, dispatch]);

  const handleQuantity = async (id, quantity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/v1/cart/updateQuantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity }),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(cartUpdateQuantity(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));
      }
    } catch (error) {
      console.error("Quantity update error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleIncrementQuantity = (id, quantity) => {
    if (!isLoading) handleQuantity(id, quantity + 1);
  };
  const handleDecrementQuantity = (id, quantity) => {
    if (!isLoading && quantity > 1) handleQuantity(id, quantity - 1);
  };
  const handleRemoveFromCart = async (id) => {
    try {
      setIsLoading(true);
      dispatch(removeFromCartStart());

      const res = await fetch(`/api/v1/cart/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "success") {
        // Update the Redux store with the new cart items
        dispatch(removeFromCart(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));

        // Optionally fetch the latest cart data to ensure consistency
        await fetchCartData();
      } else {
        dispatch(removeFromCartFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(removeFromCartFailure(error.message));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-10 py-10 max-w-7xl mx-5 xl:mx-auto">
      <p className=" text-3xl lg:text-4xl font-bold">Cart</p>
      <div className="w-full flex flex-col lg:flex-row items-center ">
        {/* left */}
        <div className="flex-1">
          <div className="max-w-3xl mx-auto p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-lg py-4 font-medium text-gray-700">
                    <p className="">Product</p>
                  </th>
                  <th className="text-left text-lg py-4 font-medium text-gray-700">
                    <p className="hidden lg:block">Quantity</p>
                  </th>
                  <th className="text-right text-lg py-4 font-medium text-gray-700">
                    <p className="hidden lg:block">Subtotal</p>
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {/* First Product Row */}
                {cartItems &&
                  cartItems.map((item) => (
                    <tr className="border-b " key={item._id}>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded">
                            <img
                              src={item.product.imageCover}
                              alt="Product"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {item.product.title}
                            </h3>
                            <p className="text-gray-600">
                              ${item.product.price}.00
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        {/* quantity */}
                        <div className="flex gap-2 w-fit px-2 items-center justify-center  border border-[#fecd06]  py-[7px] rounded-md">
                          <p
                            className="hover:bg-[#fecd06] rounded-md px-2 hover:text-white cursor-pointer transition-all duration-300"
                            onClick={() =>
                              handleIncrementQuantity(item._id, item.quantity)
                            }
                          >
                            +
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.quantity}
                          </p>
                          <p
                            className="hover:bg-[#fecd06] rounded-md px-2 hover:text-white cursor-pointer transition-all duration-300"
                            onClick={() =>
                              handleDecrementQuantity(item._id, item.quantity)
                            }
                          >
                            -
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-right font-medium text-gray-800">
                        ${item.product.price * item.quantity}.00
                      </td>
                      <td className="py-4 pl-4">
                        <button className="text-gray-400 hover:text-[#fecd06]">
                          <FiTrash
                            size={20}
                            onClick={() => handleRemoveFromCart(item._id)}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Coupon Section */}
            <div className="mt-6 lg:flex-row flex flex-col gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="rounded-md lg:border-[3px] border-[1px] border-gray-100  px-6 lg:py-4 py-1 focus:outline-none focus:ring-0 focus:border-[#fecd06] lg:focus:border-[3px] focus:border-[1px] transition-colors duration-200"
              />
              <button className="bg-[#fecd06] whitespace-nowrap hover:bg-yellow-400 text-white px-6 py-1 lg:py-4 rounded-md transition-colors duration-500 mr-2 font-semibold text-sm lg:text-base">
                Apply coupon
              </button>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="lg:flex-1/2 mx-10">
          {/* Cart Totals */}
          <div className="mt-8 max-w-md ml-auto">
            <div className="bg-white rounded-3xl shadow-sm border px-16 py-6 flex flex-col gap-8 ">
              <h2 className="text-base lg:text-lg font-bold lg:font-medium mb-4">
                Cart totals
              </h2>

              <div className="flex justify-between items-center pb-3 ">
                <span className="text-gray-800 lg:font-bold text-base">
                  Subtotal
                </span>
                <span className="font-medium text-gray-600">
                  ${totalPrice}.00
                </span>
              </div>
              <hr />
              <div className="flex justify-between items-center pb-3">
                <span className="text-gray-800 lg:font-bold text-base">
                  Total
                </span>
                <span className="font-medium">${totalPrice}.00</span>
              </div>

              <div className="py-3 text-base lg:text-base text-gray-600 whitespace-nowrap">
                Congratulations! You got free shipping 🎉
              </div>

              <button className="bg-[#fecd06] whitespace-nowrap hover:bg-yellow-400 text-white px-6 py-4 rounded-md transition-all duration-500 mr-2 font-semibold text-base">
                <Link to={"/checkout"} className="w-full">
                  Proceed to checkout
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
