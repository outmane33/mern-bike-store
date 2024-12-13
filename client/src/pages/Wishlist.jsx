import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cartSuccess, updateTotalPrice } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { wishlistCount } from "../redux/actions/userActions";

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserWishlist = async () => {
      try {
        const res = await fetch("/api/v1/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.wishList);
          dispatch(wishlistCount(data.count));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserWishlist();
  }, [location.pathname]);

  const handleAddToCard = async (product) => {
    try {
      const res = await fetch("/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(cartSuccess(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/v1/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        dispatch(wishlistCount(data.count));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full mx-auto">
      <div className="flex flex-col gap-10 max-w-7xl mx-3 md:mx-5 lg:mx-7 xl:mx-auto py-28">
        <p className=" text-3xl lg:text-4xl font-bold">Wishlist</p>
        {products.length > 0 ? (
          <table className="w-full max-w-9xl text-lg border-separate border-spacing-y-4">
            <thead className="text-gray-500">
              <tr>
                <th></th>
                <th></th>
                <th className="lg:px-20 whitespace-nowrap text-sm lg:text-base">
                  Product Name
                </th>
                <th className="lg:px-20 text-sm lg:text-base">Unit Price</th>
                <th className="px-20 hidden lg:block">Stock Status</th>
                <th className="lg:px-20 text-sm lg:text-base">Actions</th>
              </tr>
            </thead>
            <hr />
            <tbody>
              {products &&
                products.map((product) => (
                  <tr className="text-center border-b " key={product._id}>
                    <td className="text-center">
                      <IoMdClose
                        className="hover:text-red-600 cursor-pointer lg:text-base text-sm"
                        onClick={() => handleDelete(product._id)}
                      />
                    </td>
                    <td className="">
                      <img
                        src={product.imageCover}
                        alt=""
                        className="lg:w-20 w-16 h-16 lg:h-20 ml-5"
                      />
                    </td>
                    <td className="text-sm lg:text-base">{product.title}</td>
                    <td className="text-sm lg:text-base">
                      {product.price} MAD
                    </td>
                    <td className="hidden lg:block">
                      {product.quantity > 5
                        ? "In Stock"
                        : `Only ${product.quantity} left`}
                    </td>
                    <td>
                      <button
                        className="bg-[#fecd06] whitespace-nowrap flex-1 hover:bg-yellow-400 text-black lg:px-6 px-4 lg:py-3 py-2 rounded-md transition-colors duration-200 mr-2 font-semibold text-sm lg:text-base"
                        onClick={() => handleAddToCard(product)}
                      >
                        <span className="text-sm"> Add to Cart</span>
                      </button>
                    </td>
                  </tr>
                ))}
              <hr className="bg-gray-600" />
            </tbody>
          </table>
        ) : (
          <>
            <p className="text-5xl font-bold text-[#152421] text-center py-10">
              Oops! That page can’t be found.
            </p>
            <p className="text-center text-gray-700">
              It looks like nothing was found at this location. Maybe try to
              search for something else?
            </p>
          </>
        )}
      </div>
    </div>
  );
}
