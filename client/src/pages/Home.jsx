import { GoArrowUpRight } from "react-icons/go";
import { PiFlowerTulipLight } from "react-icons/pi";
import { LuShieldCheck } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { PiGitlabLogoSimple } from "react-icons/pi";
import { MdOutlinePedalBike } from "react-icons/md";
import { PiMountains } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";
import { FiGift } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  productFailure,
  productStart,
  productSuccess,
} from "../redux/actions/productActions";
import { useEffect } from "react";
import ProductCard from "../components/shared/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllProducts = async (query) => {
    try {
      dispatch(productStart());
      const res = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(productSuccess(data.products));
      } else {
        dispatch(productFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(productFailure(error));
    }
  };

  useEffect(() => {
    getAllProducts(`/api/v1/product?limit=6`);
  }, [location.pathname]);
  return (
    <div>
      {/* banner section */}
      <div className="w-full bg-black relative">
        {/* Overlay */}
        <div
          className="absolute banner inset-0 opacity-45 z-10"
          style={{
            backgroundImage:
              "url('https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/05/background-pattern-2.svg')",
          }}
        ></div>

        {/* Main content */}
        <div className="relative z-20 flex flex-col lg:flex-row gap-10 py-10 max-w-7xl pt-20 pb-28 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          {/* left */}
          <div className="flex-1 flex flex-col gap-10">
            {/* title */}
            <p className="uppercase text-center lg:text-left text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug text-white">
              Bringing You Places That Cars Never Saw
            </p>
            {/* buttons */}
            <div className="flex gap-5 justify-center lg:justify-start">
              <button
                className="bg-yellow-300 text-black flex items-center gap-2 px-6 py-4 rounded-md font-semibold"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                Visit Shop <GoArrowUpRight className="text-xl font-semibold" />
              </button>
              <button className="flex items-center text-white gap-2 px-6 py-4 rounded-md font-semibold">
                Learn More <GoArrowUpRight className="text-xl font-semibold" />
              </button>
            </div>
            {/* statistics */}
            <div className="flex gap-5 flex-wrap justify-center lg:justify-start text-center lg:text-left text-white">
              <div>
                <p className="text-4xl font-bold">250K</p>
                <p className="text-base">Worldwide Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold">300</p>
                <p className="text-base">Awesome Reviews</p>
              </div>
              <div>
                <p className="text-4xl font-bold">32</p>
                <p className="text-base">Worldwide Shops</p>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex-1 justify-center hidden lg:flex">
            <p className="text-gray-500 max-w-[400px]">
              Lacus nulla curabitur elit mi tempor habitasse non urna ultrices
              in pretium amet et sem. Rutrum amet nisl amet massa pellentesque
              cras aliquam at consectetur pulvinar malesuada aliquam.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row z-20 gap-10 max-w-7xl mx-4 xl:mx-auto md:mx-10 lg:mx-auto  relative pt-16 lg:px-10">
        {/* left */}
        <img
          src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/home-under-hero-image.webp"
          alt=""
          className="lg:w-[45%] w-[100%] sm:w-[50%]  object-cover"
        />
        {/* right */}
        <img
          src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/home-hero-image.webp"
          alt=""
          className="lg:absolute right-0 bottom-0 lg:w-[45%] w-[100%] sm:w-[50%] h-[320px] lg:h-[750px] object-cover"
        />
      </div>

      {/* info section */}
      <div className="w-full bg-black relative my-16">
        {/* boxs icons */}
        <div className="flex z-20 flex-col sm:flex-row  gap-10 max-w-7xl mx-10 xl:mx-auto md:mx-10 lg:mx-auto  relative pt-16 lg:px-10">
          {/* box */}
          <div className="flex gap-6  flex-col lg:flex-row justify-center items-center text-center lg:text-left">
            <PiFlowerTulipLight className="text-[#fecd06] lg:text-7xl text-5xl" />
            <div>
              <p className="font-semibold text-white text-2xl">Eco Friendly</p>
              <p className="text-gray-500">
                Elit tortor ut tristique eupurus venenatis id amet in
                pellentesque aliquet lacus.
              </p>
            </div>
          </div>
          {/* box */}
          <div className="flex gap-6  flex-col lg:flex-row justify-center items-center text-center lg:text-left">
            <LuShieldCheck className="text-[#fecd06] lg:text-7xl text-5xl" />
            <div>
              <p className="font-semibold text-white text-2xl">
                3 Years Warranty
              </p>
              <p className="text-gray-500">
                Vitae consectetur pulvinar malesuada elit tellus facilisi
                suspendisse tomtorut.
              </p>
            </div>
          </div>
          {/* box */}
          <div className="flex gap-6  flex-col lg:flex-row justify-center items-center text-center lg:text-left">
            <BsBoxSeam className="text-[#fecd06] lg:text-7xl text-5xl" />
            <div>
              <p className="font-semibold text-white text-2xl">Fast Delivery</p>
              <p className="text-gray-500">
                Malesuada faucibus quis auctor integer rhoncus nulla pharetra
                consequat.
              </p>
            </div>
          </div>
        </div>
        {/* boxs images */}
        <div className="flex z-20 flex-col sm:flex-row  gap-10 max-w-7xl mx-10 xl:mx-auto md:mx-10 lg:mx-auto  relative py-16 lg:px-10">
          {/* box image */}
          <div className="relative w-full sm:h-[300px] max-w-lg overflow-hidden rounded-lg group cursor-pointer">
            {/* Placeholder image with hover effect */}
            <img
              src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/05/category-image-1.webp"
              alt="City Bike"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Text content */}
            <div className="absolute left-0 bottom-0 p-5 text-white">
              <p className="font-bold text-lg mb-2">City Bikes</p>
              <p className="text-base text-gray-100 hidden lg:block">
                Quam Vulputate dignissim suspendisse in est ante adipiscing
              </p>
            </div>
          </div>
          {/* box image */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-lg group cursor-pointer">
            {/* Placeholder image with hover effect */}
            <img
              src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/05/category-image-3.webp"
              alt="City Bike"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Text content */}
            <div className="absolute left-0 bottom-0 p-5 text-white">
              <p className="font-bold text-lg mb-2">Road Bikes</p>
              <p className="text-base text-gray-100 hidden lg:block">
                Condimentum mattis pellentesque id nibh tortor id aliquet
                lectus.{" "}
              </p>
            </div>
          </div>
          {/* box image */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-lg group cursor-pointer">
            {/* Placeholder image with hover effect */}
            <img
              src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/05/category-image-2.webp"
              alt="City Bike"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Text content */}
            <div className="absolute left-0 bottom-0 p-5 text-white">
              <p className="font-bold text-lg mb-2">Mountain Bikes</p>
              <p className="text-base text-gray-100 hidden lg:block">
                Malesuada fames ac turpis egestas maecenas pharetra convallis
                posuere.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* feel charge section */}
      <div className="flex flex-col gap-4 max-w-7xl mx-auto  py-16 px-10">
        <p className="text-center lg:text-4xl text-3xl font-bold">
          Feel the Charge of Change
        </p>
        <p className="text-center text-base max-w-[650px] mx-auto">
          Lorem ipsum dolor sit amet consectetur vitae consectetur pulvinar
          malesuada elit tellus facilisi suspendisse elit tortor ut tristique.
        </p>
      </div>
      {/* products section */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto  py-16 px-10">
        {/*product card  */}
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {/* visit store section */}
      <div className=" gap-4 max-w-7xl mx-auto  mb-16 px-10">
        <button
          className="bg-yellow-300 text-black flex items-center mx-auto justify-center gap-2 px-6 py-4 rounded-md font-semibold"
          onClick={() => {
            navigate("/shop");
          }}
        >
          Visit Shop <GoArrowUpRight className="text-xl font-semibold " />
        </button>
      </div>

      {/* Can you hear the road callin */}
      <div className="w-full bg-black relative">
        <div className="relative z-20 flex flex-col lg:flex-row  py-10 max-w-7xl pt-20 pb-28 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          <div className="flex flex-col lg:flex-row bg-red-400">
            {/* left */}
            <div className="flex-1 flex flex-col">
              {/* top */}
              <div className="bg-[#fecd06] p-10 flex flex-col gap-8 flex-1">
                <p className="text-black text-2xl font-semibold">
                  Can you hear the road calling?
                </p>
                <p className="text-base text-gray-600">
                  Consectetur lorem donec massa sapien. Diam vulputate ut
                  pharetra sit amet aliquam id diam.
                </p>
                <button className="flex items-center self-start bg-black text-white gap-2 px-6 py-4 rounded-md font-semibold">
                  Learn More{" "}
                  <GoArrowUpRight className="text-xl font-semibold" />
                </button>
              </div>
              {/* bottom */}
              <div className="flex flex-col  relative flex-1">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/home-cta-iamge-2.webp"
                  alt=""
                  className="lg:w-[400px] h-full md:h-[300px] lg:h-full object-cover"
                />
                <div className="bg-white lg:right-[-150px] top-0 p-10 lg:max-w-[400px] h-full lg:absolute flex flex-col justify-center gap-5">
                  <p className="text-black text-2xl font-semibold">
                    A new era of adventures
                  </p>
                  <p className="text-base text-gray-600">
                    Auctor elit sed vulputate mi sit amet mauris commodo.
                  </p>
                  <button
                    className="flex items-center self-start bg-black text-white gap-2 px-6 py-4 rounded-md font-semibold"
                    onClick={() => navigate("/shop")}
                  >
                    Shop Now
                    <GoArrowUpRight className="text-xl font-semibold" />
                  </button>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="flex-1">
              <img
                src="	https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/home-cta-iamge-1.webp"
                alt=""
                className="lg:w-full lg:h-full md:h-[300px] md:w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* image section */}
      <div
        className="w-full h-[600px] flex justify-center items-center relative"
        style={{
          backgroundImage: `url("https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/testimonials-background.webp")`,
        }}
      >
        <div className="relative h-full flex items-center justify-center px-4 md:px-8 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Quote Text */}
            <blockquote className="mb-8">
              <p className="text-white text-lg md:text-2xl lg:text-3xl italic font-light leading-relaxed">
                Duis tincidunt sed in massa justo ac vestibulum senectus
                vulputate pulvinar risus consequat lacus vestibulum arcu. Amet
                nulla nibh feugiat purus sodales egestas risus adipiscing justo.
                Varius sit mauris purus dignissim dis sed. In nibh tempor leo
                rhoncusmet.
              </p>
            </blockquote>

            {/* Quote Attribution */}
            <div className="inline-flex items-center justify-center">
              {/* Attribution text */}
              <cite className="text-white text-xl ml-6">Natalie Ritchie</cite>
            </div>
          </div>
        </div>
        <div className="absolute z-1 top-[25%] lg:right-[45%] text-[300px] text-[#cdad34] opacity-60">
          <FaQuoteLeft />
        </div>
      </div>
      {/* benners section */}
      <div className="flex flex-col lg:flex-row py-10 max-w-7xl pt-20 pb-28 mx-10  xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
        {/* one */}
        <div className="bg-black text-white flex flex-col justify-between  lg:items-start items-center text-center lg:text-start lg:h-[500px] h-[300px] p-12">
          <PiGitlabLogoSimple className="lg:text-6xl text-4xl md:self-start" />
          <div className="flex flex-col md:flex-row lg:flex-col md:justify-between md:w-full gap-4">
            <p className="lg:text-3xl text-2xl max-w-[150px] lg:max-w-[250px] font-semibold">
              Ride Green, Live Clean
            </p>
            <button className="flex items-center mx-auto md:mx-0 lg:mx-0 lg:text-start text-black gap-2 px-6 py-4 rounded-md font-semibold bg-[#fecd06]">
              Learn More
              <GoArrowUpRight className="text-xl font-semibold text-black" />
            </button>
          </div>
        </div>
        {/* two */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3">
          {/* image 1 */}
          <div className="lg:h-[500px] relative group overflow-hidden h-[400px]">
            <img
              src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/article-image-4-1024x683.webp"
              alt=""
              className="h-[500px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
            <div className="absolute bottom-0 m-5 left-0 text-white z-10 flex flex-col gap-2">
              <p className="text-xl sm:text-base lg:text-xl font-semibold">
                Odio Euismod Lacinia Quis Risus
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed…
              </p>
            </div>
          </div>
          {/* image 2 */}
          <div className="lg:h-[500px] relative group overflow-hidden h-[400px]">
            <img
              src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/article-image-3-1024x683.webp"
              alt=""
              className="h-[500px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
            <div className="absolute bottom-0 m-5 left-0 text-white z-10 flex flex-col gap-2">
              <p className="text-xl sm:text-base lg:text-xl font-semibold">
                Ullamcorper Dignissim Tincidunt
              </p>
              <p>
                Posuere lorem ipsum dolor sit amet consectetur. Rhoncus mattis…
              </p>
            </div>
          </div>
          {/* image 3 */}
          <div className="lg:h-[500px] relative group overflow-hidden h-[400px]">
            <img
              src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/article-image-2-1024x683.webp"
              alt=""
              className="h-[500px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
            <div className="absolute bottom-0 m-5 left-0 text-white z-10 flex flex-col gap-2">
              <p className="text-xl sm:text-base lg:text-xl font-semibold">
                Metus Aliquam Eleifend Posuere
              </p>
              <p>Eget sit amet tellus cras adipiscing. Sit amet porttitor…</p>
            </div>
          </div>
        </div>
      </div>
      {/* learn more */}
      <div className="grid grid-cols-1: md:grid-cols-2 lg:grid-cols-2 py-10 max-w-7xl pt-20 pb-28 mx-10 gap-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
        {/* box 1 */}
        <div className="flex flex-col gap-4">
          <div className="flex lg:flex-row flex-col gap-5 text-center lg:text-start">
            <div className="bg-black text-white flex items-center justify-center h-14 w-14 text-2xl mx-auto lg:mx-0">
              <MdOutlinePedalBike />
            </div>
            <div>
              <p className="text-xl font-semibold">
                Malesuada bibendum pellentesque
              </p>
              <p className="text-base text-gray-600 hidden lg:block">
                Sed adipiscing diam donec adipiscing tristique risus
              </p>
            </div>
          </div>
          <p className="text-[17px] text-gray-600 text-center lg:text-start">
            Vitae aliquet nec ullamcorper sit amet risus nullam. Pharetra diam
            sit amet nisl. Magna etiam tempor orci eu lobortis elementum nibh.
            Dis parturient montes nascetur ridiculus mus mauris.
          </p>
          <button className="flex items-center justify-center lg:justify-start text-black hover:text-[#fecd05] gap-2 pr-6 py-4 rounded-md font-semibold">
            Learn More <GoArrowUpRight className="text-xl font-semibold" />
          </button>
        </div>
        {/* box 2 */}
        <div className="flex flex-col gap-4">
          <div className="flex lg:flex-row flex-col gap-5 text-center lg:text-start">
            <div className="bg-black text-white flex items-center justify-center h-14 w-14 text-2xl mx-auto lg:mx-0">
              <PiMountains />
            </div>
            <div>
              <p className="text-xl font-semibold">
                Quis ipsum suspendisse ultrices
              </p>
              <p className="text-base text-gray-600 hidden lg:block">
                Sed adipiscing diam donec adipiscing tristique risus
              </p>
            </div>
          </div>
          <p className="text-[17px] text-gray-600 text-center lg:text-start">
            Lectus magna fringilla urna porttitor rhoncus dolor purus non enim.
            Viverra suspendisse potenti nullam ac tortor vitae purus faucibus
            eugiat in ante metus dictum at tempor commodo.
          </p>
          <button className="flex items-center justify-center lg:justify-start text-black hover:text-[#fecd05] gap-2 pr-6 py-4 rounded-md font-semibold">
            Learn More <GoArrowUpRight className="text-xl font-semibold" />
          </button>
        </div>
        {/* box 3 */}
        <div className="flex flex-col gap-4">
          <div className="flex lg:flex-row flex-col gap-5 text-center lg:text-start">
            <div className="bg-black text-white flex items-center justify-center h-14 w-14 text-2xl mx-auto lg:mx-0">
              <BsPatchCheck />
            </div>
            <div>
              <p className="text-xl font-semibold">
                Massa sed elementum tempus
              </p>
              <p className="text-base text-gray-600 hidden lg:block">
                Mattis vulputate enim nulla aliquet porttitor lacus
              </p>
            </div>
          </div>
          <p className="text-[17px] text-gray-600 text-center lg:text-start">
            Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus
            egestas fringilla phasellus faucibus scelerisque eleifend donec
            pretium libero nunc consequat interdum lorem dolor sed viverra ipsum
            nunc aliquet.
          </p>
          <button className="flex items-center justify-center lg:justify-start text-black hover:text-[#fecd05] gap-2 pr-6 py-4 rounded-md font-semibold">
            Learn More <GoArrowUpRight className="text-xl font-semibold" />
          </button>
        </div>
        {/* box 4 */}
        <div className="flex flex-col gap-4">
          <div className="flex lg:flex-row flex-col gap-5 text-center lg:text-start">
            <div className="bg-black text-white flex items-center justify-center h-14 w-14 text-2xl mx-auto lg:mx-0">
              <FiGift />
            </div>
            <div>
              <p className="text-xl font-semibold">
                Ullamcorper velit sed ullamcorper morbi
              </p>
              <p className="text-base text-gray-600 hidden lg:block">
                Pellentesque habitant morbi tristique senectus et netus.
              </p>
            </div>
          </div>
          <p className="text-[17px] text-gray-600 text-center lg:text-start">
            Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
            vehicula sit amet facilisis magna etiam tempor orci eu lobortis
            elementum massa tincidunt dui ut ornare lectus sit amet est
            placerat.
          </p>
          <button className="flex items-center justify-center lg:justify-start text-black hover:text-[#fecd05] gap-2 pr-6 py-4 rounded-md font-semibold">
            Learn More <GoArrowUpRight className="text-xl font-semibold" />
          </button>
        </div>
      </div>
      {/* Quetions section */}
      <div
        className="w-full relative"
        style={{
          backgroundImage:
            "url('https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/home-contact-section-image.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 py-10 max-w-7xl  pt-20 pb-28 mx-10 gap-72 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
          <div className="hidden lg:block"></div>

          <div className="bg-[#fecd06] py-[80px] px-[60px] max-w-[450px]  h-full  flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-black text-4xl font-semibold whitespace-nowrap">
                Have Questions?
              </p>
              <p className="text-black text-2xl font-semibold whitespace-nowrap">
                Feel Free to Contact Us!
              </p>
            </div>
            <p className="text-base text-black">
              Donec ultrices tincidunt arcu non sodales. Orci eu lobortis
              elementum nibh tellus molestie nunc. Fames ac turpis egestas
              maecenas pharetra convallis posuere morbi.
            </p>
            <button
              className="flex items-center self-start bg-black text-white gap-2 px-6 py-4 rounded-md font-semibold"
              onClick={() => navigate("/contact")}
            >
              Contact Info
              <GoArrowUpRight className="text-xl font-semibold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
