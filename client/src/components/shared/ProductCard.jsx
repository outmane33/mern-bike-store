import { RiShoppingBagLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  cartSuccess,
  updateCartCount,
  updateTotalPrice,
} from "../../redux/actions/cartActions";
import { wishlistCount } from "../../redux/actions/userActions";
import { FaTimes } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import LoginModal from "./LoginModal";
// for carousel
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard(pros) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleColor = (color) => {
    switch (color) {
      case "Beige":
        return "#D2B48C";
      case "Blue":
        return "#0790ba";
      case "Gray":
        return "#c8c9c9";
      case "Green":
        return "#6fa802";
      case "Orange":
        return "#ff8412";
      case "White":
        return "#f4f4f4";
      case "Yellow":
        return "#f9cd0c";
      default:
        return "black";
    }
  };
  const handleAddToCard = async () => {
    if (!user) {
      setIsOpenLogin(true);
      return;
    }
    try {
      const res = await fetch("/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: pros.product._id,
          quantity: quantity,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(cartSuccess(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));
        dispatch(updateCartCount(data.numberOfItems));
        setQuantity(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //check if product is in wishlist
  const isProductInWishlist = products.some((p) => p._id === pros.product._id);

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserWishlist();
  }, [location.pathname]);

  const handleWishlist = async () => {
    if (!user) {
      setIsOpenLogin(true);
      return;
    }
    if (isProductInWishlist) {
      try {
        const res = await fetch(`/api/v1/wishlist/${pros.product._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.status === "success") {
          // Refresh the wishlist after successful toggle
          getUserWishlist();
          //incerement wishlist count
          dispatch(wishlistCount(data.wishList.length));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch("/api/v1/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: pros.product._id }),
        });

        const data = await res.json();
        if (data.status === "success") {
          // Refresh the wishlist after successful toggle
          getUserWishlist();
          dispatch(wishlistCount(data.wishList.length));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleIncerementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // show product details
  const Modal = ({ isOpen, onClose, title, children }) => {
    // for carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const allImages = [pros.product.imageCover, ...(pros.product.images || [])];

    const slideVariants = {
      enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
      return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
      setDirection(newDirection);
      const isLastSlide = currentIndex === allImages.length - 1;
      const isFirstSlide = currentIndex === 0;
      let newIndex;

      if (newDirection > 0) {
        newIndex = isLastSlide ? 0 : currentIndex + 1;
      } else {
        newIndex = isFirstSlide ? allImages.length - 1 : currentIndex - 1;
      }
      setCurrentIndex(newIndex);
    };

    const goToSlide = (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    };
    if (!isOpen) return null;
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[1200px] relative ">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="flex flex-col md:flex-row min-h-[600px] ">
              {/* Left side - Image */}
              {/* <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
                <img
                  src={pros.product.imageCover}
                  alt="Product"
                  className="max-w-full h-auto object-contain"
                />
              </div> */}

              <div className="w-full h-full ">
                {/* Main Carousel */}
                <div className="relative h-[800px] w-[600px] overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                        }
                      }}
                      className="absolute w-full h-full"
                    >
                      <img
                        src={allImages[currentIndex]}
                        alt={`Product view ${currentIndex + 1}`}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <motion.div
                    className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 hover:bg-black/50 p-2 rounded-full transition-all"
                    onClick={() => paginate(-1)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 hover:bg-black/50 p-2 rounded-full transition-all"
                    onClick={() => paginate(1)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, index) => (
                      <motion.button
                        key={`dot-${index}`}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-white scale-125"
                            : "bg-white/50"
                        }`}
                        onClick={() => goToSlide(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Details */}
              <div className="w-full p-8 flex flex-col gap-2">
                <h2 className="text-3xl font-bold mb-4 text-[#162321]">
                  {title}
                </h2>
                <div className="text-base text-gray-600 mb-6">
                  ${pros.product.price}.00
                </div>

                <p className="text-gray-600 mb-6">
                  {pros.product.small_description
                    ? pros.product.small_description.split("<br/>")[0]
                      ? pros.product.small_description.split("<br/>")[0]
                      : ""
                    : ""}
                </p>
                <p className="text-gray-600 mb-6">
                  {pros.product.small_description
                    ? pros.product.small_description.split("<br/>")[1]
                      ? pros.product.small_description.split("<br/>")[1]
                      : ""
                    : ""}
                </p>

                {/* colors */}
                <div className="flex flex-row gap-2 justify-start pt-5">
                  {pros.product.colors
                    ? pros.product.colors.map((color, index) => (
                        <div
                          className="flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-fit transition-all duration-200"
                          key={color}
                          onClick={() => {
                            goToSlide(index);
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full  bg-[${handleColor(
                              color
                            )}] outline outline-1 outline-gray-300 outline-offset-2 group-hover:outline-2 transition-all duration-200`}
                          ></div>
                        </div>
                      ))
                    : ""}
                </div>

                {!user ? (
                  ""
                ) : (
                  <>
                    {/* Quantity and Add to Cart */}
                    <div className="flex gap-2 items-center border-b pb-5">
                      {/* quantity */}
                      <div className="flex items-center text-lg gap-2 border border-[#fecd06] px-4 py-2   rounded-md w-fit">
                        <p
                          className="hover:bg-[#fecd06] flex items-center justify-center  rounded-md px-3 py-1 hover:text-white cursor-pointer transition-all duration-300"
                          onClick={handleIncerementQuantity}
                        >
                          +
                        </p>
                        <p className="text-gray-600" id="quantity">
                          {quantity}
                        </p>

                        <p
                          className="hover:bg-[#fecd06] flex-1 rounded-md px-4 py-1 hover:text-white cursor-pointer"
                          onClick={handleDecrementQuantity}
                        >
                          -
                        </p>
                      </div>
                      <button
                        className="bg-[#fecd06] w-full whitespace-nowrap  hover:bg-yellow-400 text-white px-14 py-4 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
                        onClick={handleAddToCard}
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className=" text-gray-600 mt-4 border-b pb-5">
                      <button
                        className="flex items-center gap-2"
                        onClick={handleWishlist}
                      >
                        <FaRegHeart
                          className={`${isProductInWishlist && "hidden"}`}
                        />{" "}
                        <FaHeart
                          className={`text-[#fecd06] ${
                            !isProductInWishlist && "hidden"
                          }`}
                        />{" "}
                        <p
                          className={`text-sm ${
                            isProductInWishlist
                              ? "text-[#fecd06]"
                              : "text-gray-500"
                          }`}
                        >
                          Wishlist
                        </p>
                      </button>
                    </div>
                  </>
                )}
                {/* category */}
                <div className="pt-4">
                  <p className="text-gray-600 font-bold text-sm">
                    CATEGORY:{" "}
                    <span
                      className="text-gray-400  hover:text-[#264c4f] cursor-pointer uppercase font-semibold transition-all duration-200 "
                      onClick={() =>
                        navigate(
                          `/shop/product-category/${pros.product.category}`
                        )
                      }
                    >
                      {pros.product.category}
                    </span>
                  </p>
                </div>

                <button
                  className="w-full mt-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200"
                  onClick={() => {
                    navigate(`/product/${pros.product.slug}`);
                  }}
                >
                  Go to product page
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full group flex flex-col overflow-hidden justify-center items-center relative cursor-pointer">
        <img
          src={pros.product.imageCover}
          alt=""
          className="group-hover:scale-110 transition-all duration-300"
          onClick={() => {
            navigate(`/product/${pros.product.slug}`);
          }}
        />
        <div className="w-[90%] text-lg text-gray-500 py-3 bg-white absolute bottom-[-70px] group-hover:bottom-2 transition-all duration-300 flex items-center justify-center gap-8 ">
          <RiShoppingBagLine
            className="hover:text-[#fecd06] cursor-pointer"
            onClick={handleAddToCard}
          />
          <span onClick={handleWishlist}>
            <IoIosHeartEmpty
              className={`hover:text-[#fecd06] cursor-pointer  ${
                isProductInWishlist && "hidden"
              }`}
            />
            <FaHeart
              className={`text-base text-[#fecd06] ${
                !isProductInWishlist && "hidden"
              }`}
            />
          </span>
          <FiEye
            className="hover:text-[#fecd06] cursor-pointer"
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>
      {/* colors */}
      <div className="flex flex-row gap-2 justify-center pt-5">
        {/* color */}
        {pros.product.colors
          ? pros.product.colors.map((color) => (
              <div
                className="flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-fit transition-all duration-200"
                key={color}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[${handleColor(
                    color
                  )}] outline outline-1 outline-gray-300 outline-offset-2 group-hover:outline-2 transition-all duration-200`}
                ></div>
              </div>
            ))
          : ""}
      </div>
      <p className="text-center font-semibold text-lg">{pros.product.title}</p>
      <p className="text-center text-gray-600">${pros.product.price}.00</p>
      {/* moadl */}
      <div className="p-4">
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={pros.product.title}
        />
      </div>
      {/* Login moadl */}
      {!user && (
        <div className="p-4">
          <LoginModal
            isOpenLogin={isOpenLogin}
            onClose={() => setIsOpenLogin(false)}
            title={"title"}
          />
        </div>
      )}
    </div>
  );
}
