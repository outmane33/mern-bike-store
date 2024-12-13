import { AiFillThunderbolt } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="w-full bg-black text-white">
      <div className="flex flex-col md:flex-row  max-w-7xl pt-20 pb-10 mx-10 gap-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
        {/* left */}
        <div className="flex flex-col flex-1 gap-6 ">
          {/* logo */}
          <div className="flex items-center text-3xl">
            <AiFillThunderbolt />
            <p className="font-semibold">Bike</p>
          </div>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex gap-6">
            {/* left */}
            <div className="flex items-center gap-4">
              <FiPhoneCall className="lg:text-4xl text-3xl text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm lg:text-base">Phone:</p>
                <p className="whitespace-nowrap">578-393-4937</p>
              </div>
            </div>
            {/* right */}
            <div className="flex items-center gap-4">
              <MdOutlineAlternateEmail className="lg:text-4xl text-3xl text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm lg:text-base">Email:</p>
                <p className="whitespace-nowrap">email@business.com</p>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col flex-1 gap-6 ">
          {/* logo */}
          <div className="flex items-center lg:text-3xl text-xl">
            <p className="font-semibold">Newsletter</p>
          </div>
          <p className="text-gray-400">
            Faucibus scelerisque eleifend donec pretium vulputate. Malesuada
            bibendum arcu vitae elementum curabitur.
          </p>
          <div className="flex gap-6">
            <div className="w-full max-w-xl bg-black p-4">
              <form className="flex gap-2">
                <div className="relative flex flex-col  md:flex-row items-center max-w-2xl w-full  gap-3 md:gap-0 ">
                  <input
                    type="email"
                    placeholder="Your email *"
                    required
                    className="w-full bg-transparent border border-teal-800/30 rounded-md md:py-6 py-4 px-8 text-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#f7cc1e] focus:ring-1 focus:ring-[#f7cc1e] text-md"
                  />
                  <button
                    type="submit"
                    className="md:absolute w-full md:w-fit right-1 bg-[#f7cc1e] hover:bg-yellow-400 text-black px-6 md:py-4 py-3 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black text-white border-t border-gray-800 pt-10">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 max-w-7xl pb-28 mx-10 gap-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 whitespace-nowrap ">
          <Link>Home</Link>
          <Link>Shop</Link>
          <Link>About</Link>
          <Link>Blog</Link>
          <Link>Contact</Link>
          <Link>Site Map</Link>
          <Link>Privacy Policy</Link>
          <Link>Terms of Use</Link>
        </div>
        <div className="flex flex-col items-center  md:flex-row md:justify-between max-w-7xl pb-28 mx-10 gap-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
          <div className="text-gray-600 flex gap-6 text-lg">
            <FaFacebook />
            <FaSquareXTwitter />
            <AiFillInstagram className="text-xl" />
          </div>
          <p className="text-gray-600 text-center">
            Copyright © 2024 - WordPress Theme by CreativeThemes
          </p>
        </div>
      </div>
    </div>
  );
}
