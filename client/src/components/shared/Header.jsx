import { Avatar, Drawer, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { wishlistCount } from "../../redux/actions/userActions";
import { logout } from "../../redux/actions/authActions";
import { FiTrash } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import LoginModal from "./LoginModal";
import {
  cartStart,
  cartSuccess,
  cartFailure,
  updateTotalPrice,
  updateCartCount,
  cartUpdateQuantity,
  removeFromCartStart,
  removeFromCart,
  removeFromCartFailure,
} from "../../redux/actions/cartActions";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const mywishlistCount = useSelector((state) => state.user.wishlistCount);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);
  const handleMobileClose = () => setIsOpenToggle(false);

  const fetchCartData = async () => {
    console.log(user);
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
        dispatch(updateCartCount(data.numberOfItems));
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

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/auth/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(logout());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          dispatch(wishlistCount(data.wishList.length));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserWishlist();
  }, [location.pathname]);

  return (
    <>
      <Navbar className="bg-black">
        <div className="flex items-center text-2xl text-white italic font-semibold">
          <AiFillThunderbolt />
          <p className="font-semibold">Bike</p>
        </div>
        <Navbar.Collapse className="hidden md:flex ">
          <Navbar.Link href="/">
            <span className="text-white hover:text-[#fecd06] w-[70px] py-5 block text-center uppercase font-semibold hover:border-b hover:border-yellow-400 transition-all duration-300 border-b border-transparent">
              Home
            </span>
          </Navbar.Link>
          <Navbar.Link className="text-white hover:text-[#fecd06]" href="/shop">
            <span className="text-white hover:text-[#fecd06] w-[70px] py-5 block text-center uppercase font-semibold hover:border-b hover:border-yellow-400 transition-all duration-300">
              Shop
            </span>
          </Navbar.Link>
          <Navbar.Link
            className="text-white hover:text-[#fecd06]"
            href="/about"
          >
            <span className="text-white hover:text-[#fecd06] w-[70px] py-5 block text-center uppercase font-semibold hover:border-b hover:border-yellow-400 transition-all duration-300">
              About
            </span>
          </Navbar.Link>
          <Navbar.Link className="text-white hover:text-[#fecd06]" href="/blog">
            <span className="text-white hover:text-[#fecd06] w-[70px] py-5 block text-center uppercase font-semibold hover:border-b hover:border-yellow-400 transition-all duration-300">
              Blog
            </span>
          </Navbar.Link>
          <Navbar.Link
            className="text-white hover:text-[#fecd06]"
            href="/contact"
          >
            <span className="text-white hover:text-[#fecd06] w-[70px] py-5 block text-center uppercase font-semibold hover:border-b hover:border-yellow-400 transition-all duration-300">
              Contact
            </span>
          </Navbar.Link>
        </Navbar.Collapse>
        <div className="gap-4 text-lg hidden md:flex">
          {/* user */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={FaRegCircleUser}
                rounded
                size="xss"
                className="text-white hover:text-[#fecd06] hidden md:block"
                onClick={() => setIsOpenLogin(true)}
              />
            }
          >
            {user ? (
              <>
                <Dropdown.Header>
                  <p className="font-semibold text-sm">
                    {user.userName ? `Logged in as ${user.userName}` : ""}
                  </p>
                </Dropdown.Header>
                <Dropdown.Item
                  className="flex gap-2"
                  onClick={() => navigate("/shop/acount")}
                >
                  <FaUserCog className="text-lg" />
                  Acount
                </Dropdown.Item>
                <Dropdown.Item className="flex gap-2" onClick={handleLogout}>
                  <MdLogout className="text-lg" />
                  Logout
                </Dropdown.Item>
              </>
            ) : (
              ""
            )}
          </Dropdown>
          {/* wishlist */}
          <button
            className=" py-2 px-2 rounded-lg "
            disabled={isLoading}
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <Link to="/shop/wishlist" className="relative ">
              <FaRegHeart className="text-lg hover:text-[#fecd06] text-white" />
              <span
                className={`absolute top-[-5px] right-[-10px] text-xs bg-[#fecd06] text-black font-semibold rounded-full w-4 h-4 flex items-center justify-center ${
                  mywishlistCount <= 0 && "hidden"
                }`}
              >
                {mywishlistCount}
              </span>
            </Link>
          </button>
          {/* cart */}
          <button className=" py-2 px-2 rounded-lg " disabled={isLoading}>
            <Link className="relative">
              <RiShoppingBag4Line
                className="text-xl hover:text-[#fecd06] text-white"
                onClick={() => setIsOpen(true)}
              />
              <span
                className={`absolute top-[-5px] right-[-10px] text-xs bg-[#fecd06] text-black font-semibold rounded-full w-4 h-4 flex items-center justify-center ${
                  cartCount <= 0 && "hidden"
                }`}
              >
                {cartCount}
              </span>
            </Link>
          </button>
        </div>
        <Navbar.Toggle onClick={() => setIsOpenToggle(!isOpenToggle)} />
      </Navbar>
      {/* cart drawer */}
      <Drawer
        className="w-[400px] md:w-[500px] "
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <Drawer.Header title="Shopping Cart" titleIcon={() => <></>} />
        <Drawer.Items className="h-full">
          <div className="flex flex-col justify-between h-modal">
            <div className="flex flex-1 flex-col gap-6">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-10 px-5">
                    {/* image */}
                    <img
                      src={item.product.imageCover}
                      alt=""
                      className="w-20 h-20"
                    />
                    {/* content */}
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="font-semibold text-lg cursor-pointer hover:text-[#fecd06]">
                        {item.product.title}
                      </p>
                      <div className="flex items-center gap-8">
                        {/* quantity */}
                        <div className="flex gap-2 border border-[#fecd06] px-2 py-[6px] rounded-md">
                          <p
                            className="hover:bg-[#fecd06] flex items-center justify-center rounded-md px-2 hover:text-white cursor-pointer transition-all duration-300"
                            onClick={() =>
                              handleIncrementQuantity(item._id, item.quantity)
                            }
                          >
                            +
                          </p>
                          <p className="text-gray-600">{item.quantity}</p>
                          <p
                            className="hover:bg-[#fecd06] rounded-md flex items-center justify-center px-2 hover:text-white cursor-pointer transition-all duration-300"
                            onClick={() =>
                              handleDecrementQuantity(item._id, item.quantity)
                            }
                          >
                            -
                          </p>
                        </div>
                        <p>${item.product.price}.00</p>
                      </div>
                    </div>
                    {/* remove */}
                    <div>
                      <FiTrash
                        className="text-lg cursor-pointer hover:text-[#fecd06] transition-all duration-300"
                        onClick={() => handleRemoveFromCart(item._id)}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="">
              <hr />
              <div className="flex w-full justify-between py-5">
                <p className="text-sm text-[#264c4f] font-semibold">
                  SUBTOTAL:
                </p>
                <p className="text-sm text-[#264c4f] font-semibold">
                  {totalPrice} MAD
                </p>
              </div>

              <div className="flex">
                <button
                  className="bg-[#fecd06] flex-1 hover:bg-yellow-400 text-black px-6 py-4 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
                  onClick={() => {
                    navigate("/cart");
                    setIsOpen(false);
                  }}
                >
                  View Cart
                </button>
                <button
                  className="bg-[#fecd06] flex-1 hover:bg-yellow-400 text-black px-6 py-4 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
                  onClick={() => {
                    navigate("/checkout");
                    setIsOpen(false);
                  }}
                >
                  Checout
                </button>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      {/* mobile drawer */}
      <Drawer
        open={isOpenToggle}
        onClose={handleMobileClose}
        position="right"
        className="w-full bg-[#12151a]"
      >
        <Drawer.Header />
        <Drawer.Items>
          <div className="w-full min-h-screen flex flex-col gap-20 items-center justify-center">
            <div className="flex items-center text-4xl text-white">
              <AiFillThunderbolt />
              <p className="font-semibold ">Bike</p>
            </div>
            <div className="text-white flex flex-col items-center gap-4 text-xl font-bold">
              <Link className="hover:text-[#f0b641]" to={"/"}>
                Home
              </Link>
              <Link className="hover:text-[#f0b641]" to={"/shop"}>
                Shop
              </Link>
              <Link className="hover:text-[#f0b641]" to={"/about"}>
                About
              </Link>
              <Link className="hover:text-[#f0b641]" to={"/blog"}>
                Blog
              </Link>
              <Link className="hover:text-[#f0b641]" to={"/contact"}>
                Contact
              </Link>
            </div>
            <div className="text-white flex gap-6 text-lg">
              <FaFacebook />
              <FaSquareXTwitter />
              <AiFillInstagram className="text-xl" />
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      {/* Login moadl */}
      {!user && (
        <LoginModal
          isOpenLogin={isOpenLogin}
          onClose={() => setIsOpenLogin(false)}
          title={"title"}
        />
      )}
    </>
  );
}
