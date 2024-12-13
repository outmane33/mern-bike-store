import {
  Alert,
  Breadcrumb,
  Button,
  Label,
  Modal,
  Rating,
} from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Tabs } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import moment from "moment";
import { AiFillInstagram } from "react-icons/ai";
import ProductCard from "../components/shared/ProductCard";
import { IoIosHeartEmpty } from "react-icons/io";
// for carousel
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { wishlistCount } from "../redux/actions/userActions";

export default function Product() {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [formComment, setFormComment] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const loggedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/v1/product/slug/${slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setProduct(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [location.pathname]);

  // Separate useEffect for comments that depends on product
  useEffect(() => {
    const getComments = async () => {
      if (!product?._id) return; // Don't fetch if no product ID

      try {
        const res = await fetch(`/api/v1/comment?product=${product._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getRelatedProducts = async () => {
      try {
        const res = await fetch(
          `/api/v1/product?category[in]=${product.category}&limit=4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.status === "success") {
          setRelatedProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRelatedProducts();
    getComments();
  }, [product]); // This will run whenever product changes
  // const dispatch = useDispatch();
  const handleAddToCard = async () => {
    try {
      const res = await fetch("/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity: quantity }),
      });
      const data = await res.json();
      if (data.status === "success") {
        //   dispatch(cartSuccess(data.cart.cartItems));
        //   dispatch(updateTotalPrice(data.cart.totalCartPrice));
        //   dispatch(updateCartCount(data.numberOfItems));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    if (isProductInWishlist) {
      try {
        const res = await fetch(`/api/v1/wishlist/${product._id}`, {
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
          body: JSON.stringify({ productId: product._id }),
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

  const handleChange = (e) => {
    setFormComment({
      ...formComment,
      [e.target.id]: e.target.value,
      productId: product._id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formComment.content || !formComment.title) {
      setError("All fields are required");
      return;
    }
    if (!loggedUser) {
      setError("You must be logged in to comment");
      return;
    }

    try {
      const res = await fetch("/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formComment),
      });
      const data = await res.json();
      if (data.status === "success") {
        setComments([...comments, data.comment]);
        setFormComment({ title: "", content: "" });
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleLike = async (commentId) => {
    if (!loggedUser) {
      navigate("/sign-in");
      return;
    }

    try {
      const res = await fetch(`/api/v1/comment/like/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.comment.likes,
                  numberOfLikes: data.comment.numberOfLikes,
                }
              : comment
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/comment/${selectedComment._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setComments(comments.filter((c) => c._id !== selectedComment._id));
        setSelectedComment(null);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
  //check if product is in wishlist
  const isProductInWishlist = products.some((p) => p._id === product._id);
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

  // for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const allImages = [product.imageCover, ...(product.images || [])];

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

  return (
    <div className="w-full py-28">
      {/* imng & little description section */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto md:mx-10">
        {/* left */}
        <div className="flex-1 lg:mx-0 flex flex-col">
          <div className="flex-1 mx-5 lg:mx-0 flex flex-col">
            {/* Main Carousel */}
            <div className="relative  sm:w-full h-[300px] sm:h-[468px] lg:w-[625px]  xl:h-80 2xl:h-96 overflow-hidden">
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

            {/* Thumbnails */}
            <div className="w-full flex gap-2 pt-5 pl-2 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <motion.div
                  key={`thumb-${index}`}
                  className={`min-w-[113px] w-[113px] h-[113px] rounded cursor-pointer ${
                    currentIndex === index
                      ? "border-2 border-blue-500"
                      : "border border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    currentIndex === index ? { scale: 1.05 } : { scale: 1 }
                  }
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 flex gap-8 pl-10 pt-4 flex-col ">
          <Breadcrumb
            aria-label="Default breadcrumb example"
            className="text-[#234e54]"
          >
            <Breadcrumb.Item href="#">
              <p className="text-[#fecd06] text-xs ">HOME</p>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-white">
              <p className="text-[#fecd06] text-xs">SHOP</p>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-white">
              <p className="text-[#fecd06] text-xs uppercase">
                {product.category}
              </p>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-white">
              <p className="text-[#234e54] text-xs uppercase">
                {product.title ? product.title : "undefinded"}
              </p>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex flex-col gap-4">
            <p className="text-3xl font-bold">
              {product.title ? product.title : "undefinded"}
            </p>
            <p className="text-xl font-bold text-[#162320]">
              ${product.price ? product.price : "undefinded"}.00
            </p>
          </div>
          <p className="text-gray-500">
            {product.small_description
              ? product.small_description.split("<br/>")[0]
                ? product.small_description.split("<br/>")[0]
                : ""
              : ""}
          </p>
          <p className="text-gray-500">
            {product.small_description
              ? product.small_description.split("<br/>")[1]
                ? product.small_description.split("<br/>")[1]
                : ""
              : ""}
          </p>
          <hr />
          <div className="flex flex-col gap-2">
            <p>Color</p>
            {/* colors */}
            <div className="flex flex-row gap-2 justify-start pt-5">
              {product.colors
                ? product.colors.map((color, index) => (
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
          </div>
          <div className="flex gap-2 items-center">
            {/* quantity */}
            <div className="flex items-center text-lg gap-2 border border-[#fecd06] px-6 py-2   rounded-md w-fit">
              <p
                className="hover:bg-[#fecd06] flex items-center justify-center  rounded-md px-3 py-1 hover:text-white cursor-pointer transition-all duration-200 "
                onClick={handleIncerementQuantity}
              >
                +
              </p>
              <p className="text-gray-600" id="quantity">
                {quantity}
              </p>

              <p
                className="hover:bg-[#fecd06] rounded-md px-4 py-1 hover:text-white cursor-pointer transition-all duration-200"
                onClick={handleDecrementQuantity}
              >
                -
              </p>
            </div>
            <button
              className="bg-[#fecd06] w-full lg:w-fit whitespace-nowrap flex-1 hover:bg-yellow-400 text-black px-14 py-4 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
              onClick={handleAddToCard}
            >
              Add to Cart
            </button>
          </div>
          <div
            className="flex gap-2 items-center  font-semibold cursor-pointer"
            onClick={handleWishlist}
          >
            <span>
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
            <p
              className={`text-sm ${
                isProductInWishlist ? "text-[#fecd06]" : "text-gray-500"
              }`}
            >
              Wishlist
            </p>
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex gap-2 text-sm">
                <strong className="text-[#46585a] ">CATEGORY:</strong>
                <p className="text-gray-500 uppercase">{product.category}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <strong className="text-[#46585a] ">SKU:</strong>
                <p className="text-gray-500 uppercase">{product.sku}</p>
              </div>
            </div>
            <div className="text-gray-600 flex gap-4 text-lg">
              <FaFacebook />
              <FaSquareXTwitter />
              <AiFillInstagram className="text-xl" />
            </div>
          </div>
        </div>
      </div>
      {/* product details */}
      <div className=" flex pt-16 items-center justify-center max-w-7xl mx-auto ">
        <div className="flex justify-center w-full">
          <Tabs variant="default" className="flex  items-center justify-center">
            <Tabs.Item active title="DESCRIPTION" id="mytab">
              <div className="w-full flex flex-col text-[17px] gap-6 text-gray-600 px-4 md:px-6 lg:px-8 text-start md:text-left">
                <p>
                  Sit amet nulla facilisi morbi tempus iaculis. Phasellus
                  vestibulum lorem sed risus ultricies tristique. Urna neque
                  viverra justo nec ultrices dui sapien eget mi. Dignissim
                  sodales ut eu sem integer vitae justo.
                </p>
                <p>
                  Porttitor lacus luctus accumsan tortor posuere ac ut. Amet
                  luctus venenatis lectus magna fringilla urna. At erat
                  pellentesque adipiscing commodo elit at imperdiet dui.
                </p>
                <p>
                  Quis varius quam quisque id. Facilisis gravida neque convallis
                  a cras semper auctor neque vitae. Proin sagittis nisl rhoncus
                  mattis rhoncus urna neque viverra. Dolor magna eget est lorem
                  ipsum. Integer quis auctor elit sed vulputate mi sit amet
                  mauris. Egestas egestas fringilla phasellus faucibus
                  scelerisque eleifend donec pretium. Duis ut diam quam nulla.
                  Aliquet lectus proin nibh nisl condimentum id venenatis.
                  Mauris nunc congue nisi vitae suscipit.
                </p>
                <p>
                  Augue interdum velit euismod in pellentesque massa placerat
                  duis. Porttitor massa id neque aliquam vestibulum morbi
                  blandit cursus risus.
                </p>
              </div>
            </Tabs.Item>

            <Tabs.Item title="ADDITIONAL INFORMATION" className="w-full">
              <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] w-[300px]">
                <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                  <tbody>
                    {/* First Row */}
                    <tr className="border-b border-gray-100  hover:bg-gray-50 700 transition-colors">
                      <td className="py-4 px-6 lg:text-lg text-base font-medium text-[#212012] dark:text-white">
                        Colors
                      </td>
                      <td className="py-4 px-6 text-base text-gray-600 dark:text-gray-500">
                        {product.colors
                          ? product.colors.map((color) => color).join(", ")
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tabs.Item>
            <Tabs.Item title={`SHIPING & DELIVERY`}>
              <div className="lg:w-[1300px] md:w-[800px]  w-[450px] flex flex-col lg:flex-row py-6 gap-14 lg:gap-20">
                {/* left */}
                <div className="flex flex-col md:flex-row gap-5 flex-1">
                  <img
                    src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/05/shipping-image-1-768x1024.webp"
                    alt=""
                    className="w-full h-[560px] lg:w-[322px] lg:h-[430px]"
                  />
                  <img
                    src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/05/shipping-image-2-768x1024.webp"
                    alt=""
                    className="w-full h-[560px] lg:w-[322px] lg:h-[430px]"
                  />
                </div>
                {/* right */}
                <div className="flex-1 flex flex-col gap-6 ">
                  <p className="font-semibold text-lg">
                    Cum sociis natoque penatibus
                  </p>
                  <p className="text-[16px] text-gray-700">
                    Purus in mollis nunc sed id semper risus. Velit laoreet id
                    donec ultrices. Tellus pellentesque eu tincidunt tortor. Cum
                    sociis natoque penatibus et. Vitae elementum curabitur vitae
                    nunc sed velit. Nulla pellentesque dignissim enim sit amet
                    venenatis urna cursus eget.
                  </p>
                  <p className="font-semibold text-lg">
                    Mattis enim ut tellus elementum
                  </p>
                  <p className="text-[16px] text-gray-700">
                    Dolor morbi non arcu risus quis. Quisque non tellus orci ac
                    auctor augue mauris augue. Ipsum a arcu cursus vitae congue
                    mauris rhoncus aenean.
                  </p>
                  <ul className="list-disc list-inside text-[16px] text-gray-700 ml-5">
                    <li>Cum sociis natoque penatibus et</li>
                    <li>Aliquam eleifend mi in nulla posuere</li>
                    <li>Ullamcorper malesuada proin libero</li>
                    <li>Purus in mollis nunc sed id</li>
                  </ul>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title={`REVIEWS (${comments.length})`}>
              <div className="lg:w-[1250px] md:w-[800px]  w-[450px] flex flex-col lg:flex-row py-6 gap-14 lg:gap-20">
                {/* left */}
                <div className="flex flex-col gap-5 flex-1">
                  <p className="text-[#212012] font-semibold lg:text-2xl text-xl">
                    Reviews
                  </p>
                  <p className="text-gray-500 text-sm lg:text-base">
                    There are no reviews yet.
                  </p>
                  {/* reviews */}
                  {comments &&
                    comments.map((comment) => (
                      <div className="flex gap-3" key={comment._id}>
                        {/* left */}
                        <img
                          src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/user-avatar-150x150.jpg"
                          alt=""
                          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                        />
                        {/* right */}
                        <div className="flex-1 flex flex-col gap-4">
                          {/* name & rating */}
                          <div className="flex justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <p className="font-bold lg:text-base text-sm">
                                {comment.user.userName}
                              </p>
                              <p className="text-gray-500 lg:text-sm text-xs">
                                – {moment(comment.createdAt).fromNow()}
                              </p>
                            </div>
                            <Rating>
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star filled={false} />
                            </Rating>
                          </div>
                          {/* title */}
                          <div>
                            <p className="font-bold lg:text-base text-sm">
                              {comment.title}
                            </p>
                          </div>
                          {/* review */}
                          <div>
                            <p className="text-gray-700 lg:text-[15px] text-[14px]">
                              {comment.content}
                            </p>
                          </div>
                          <hr />
                          {/* likes */}
                          <div className="flex items-center gap-5">
                            <button
                              className={`text-gray-400 hover:text-blue-500 ${
                                loggedUser &&
                                comment.likes.includes(loggedUser._id)
                                  ? "!text-blue-500"
                                  : "text-gray-400"
                              }`}
                              onClick={() => {
                                handleLike(comment._id);
                              }}
                            >
                              <FaThumbsUp className="text-base" />
                            </button>
                            <p className="text-gray-400 text-sm">
                              {comment.numberOfLikes > 0 &&
                                comment.numberOfLikes +
                                  " " +
                                  (comment.numberOfLikes > 1
                                    ? "likes"
                                    : "like")}
                            </p>
                            {loggedUser &&
                              (loggedUser._id === comment.user._id ||
                                loggedUser.role === "admin") && (
                                <>
                                  <button
                                    className="text-gray-400 hover:text-red-500 text-sm"
                                    onClick={() => {
                                      setShowModal(true);
                                      setSelectedComment(comment);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* right */}
                <div className="flex-1 flex flex-col gap-6">
                  {comments.length === 0 && (
                    <p className="text-[#212012] font-semibold lg:text-lg text-base">
                      Be the first to review “{product.title}”
                    </p>
                  )}

                  <div className="flex gap-2">
                    <p className="text-xs text-[#465550] font-semibold">
                      YOUR RATING *
                    </p>
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                  </div>
                  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <Label
                        className="text-[#989d91] lg:text-lg text-base"
                        htmlFor="default-search"
                      >
                        Review Title
                      </Label>
                      <input
                        type="text"
                        id="title"
                        onChange={handleChange}
                        value={formComment.title}
                        className="!rounded-md border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label
                        className="text-[#989d91] lg:text-lg text-base"
                        htmlFor="default-search"
                      >
                        Your Review
                      </Label>

                      <textarea
                        className="w-full border-[3px] border-gray-100 rounded-md p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200 resize-none"
                        rows={4}
                        id="content"
                        value={formComment.content}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      className="bg-[#fecd06] text-black hover:bg-yellow-400 lg:px-10 px-8 py-3 rounded-md w-fit text-base font-semibold"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                  {error && (
                    <Alert className="text-sm text-white font-semibold bg-[#e44b5f]">
                      {error}
                    </Alert>
                  )}
                </div>
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
      {/* Related products */}
      <div className="hidden lg:flex flex-col pt-16 max-w-7xl mx-auto gap-10">
        {/* products */}
        <p className="text-xl font-semibold">Related products</p>
        <div className="grid grid-cols-4 gap-10 w-full">
          {relatedProducts &&
            relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-200" />
            <h3 className="text-lg font-semibold text-gray-500">
              Are you sure you want to delete this comment?
            </h3>
            <div className="mt-4 flex justify-center gap-6">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                {"No, Cancel"}{" "}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
