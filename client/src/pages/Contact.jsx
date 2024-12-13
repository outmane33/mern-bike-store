import { Breadcrumb, Label } from "flowbite-react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

export default function Contact() {
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
        <div className="relative z-20 flex flex-row lg:flex-row max-w-7xl  h-[300px] mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          <div className="flex-1 flex flex-col justify-between gap-2 py-5 ">
            <div className="flex-1"></div>
            <div className="flex flex-col">
              <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item>
                  <p className="text-yellow-300 text-xs lg:text-sm">HOME</p>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <p className="text-gray-400 text-xs lg:text-sm">CONTACT</p>
                </Breadcrumb.Item>
              </Breadcrumb>
              <p className="uppercase pt-3 text-4xl lg:text-6xl font-semibold leading-snug text-white whitespace-nowrap">
                Contact Us
              </p>
            </div>
          </div>
          {/* right */}
          <div className="flex-1 flex justify-center"></div>
        </div>
      </div>

      {/* contact info with form section */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-10 xl:mx-auto md:mx-10 lg:mx-auto ">
        {/* left */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 flex-1 py-24">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">Pharetra Etultrices</p>
            <p className="max-w-[500px] line-clamp-2 text-base text-gray-500">
              Purus gravida quis blandit turpis cursus in hac habitasse magna
              fringilla urna porttitor ullamcorper malesuada.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">Egestas Fringilla</p>
            <p className="max-w-[500px] line-clamp-2 text-base text-gray-500">
              Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus
              phasellus faucibus scelerisque eleifend.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">Quis Lipsum</p>
            <p className="max-w-[500px] line-clamp-2 text-base text-gray-500">
              Sed faucibus turpis in eu mi bibendum neque egestas. Urna
              porttitor rhoncus dolor purus non enim neque volutpat ac
              tincidunt.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">Follow Us</p>
            <div className="text-gray-600 flex gap-6 text-lg">
              <FaFacebook />
              <FaSquareXTwitter />
              <AiFillInstagram className="text-xl" />
            </div>
          </div>
        </div>

        {/* right - form */}
        <div className="flex-1">
          <div className="flex flex-col gap-4 bg-[#fecd06] lg:p-16 p-10 lg:mt-[-200px] relative z-[10]">
            {/* first name & last name  */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="firstName" className="text-base">
                  First Name
                </Label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  className="p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="lastName" className="text-base">
                  Last Name
                </Label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  className="p-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            {/* email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
            {/* Subject */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject" className="text-base">
                Subject
              </Label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
            {/* Your Message */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-base">
                Your Message
              </Label>
              <textarea
                id="message"
                cols="30"
                rows="10"
                placeholder="Your Message"
                className="p-3 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button className="bg-black text-white px-4 py-3 hover:bg-white hover:text-black transition-colors rounded-md">
              Submit Form
            </button>
          </div>
        </div>
      </div>
      {/* statics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 border p-10 my-10">
        {/* box 1 */}
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <p className="font-semibold text-2xl">10,000+</p>
          <p className="text-base text-gray-500">
            Applications download in the last 6 months from the release.
          </p>
        </div>
        {/* box 2 */}
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <p className="font-semibold text-2xl">87%</p>
          <p className="text-base text-gray-500">
            Successfully reduced emission level for the last months of
            operation.
          </p>
        </div>
        {/* box 3 */}
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <p className="font-semibold text-2xl">200+</p>
          <p className="text-base text-gray-500">
            Awesome reviews and feedback from clients all around the world.
          </p>
        </div>
      </div>

      {/* third section */}
      <div className="w-full bg-black">
        <div className="flex flex-col items-center lg:flex-row gap-10 py-10 max-w-7xl pt-20 pb-20 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          {/* left */}
          <div>
            <div className="w-[400px] h-[400px] sm:w-[450px] sm:h-[450px]  lg:w-[600px] lg:h-[600px] border"></div>
          </div>
          {/* right */}
          <div className="flex flex-col gap-10">
            <p className="text-4xl font-bold text-white">
              Provide Sustainable Electric Bikes For Everyone
            </p>
            <p className="text-white">
              Penatibus lacus sed nullam sodales. Eleifend dictumst sit in ut
              egestas vestibulum urna massa cursus. Felis iaculis sit leo at
              facilisi tortor eget in eget.
            </p>
            {/*  */}
            <div className="flex flex-col gap-3 justify-center text-[17px] ">
              <p className="text-gray-300 max-w-[400px] flex items-start gap-3 justify-start">
                <div className="flex items-center gap-2">
                  <FaRegCheckCircle />
                  Lacus nulla curabitur elitmi tempor
                </div>
              </p>
              <p className="text-gray-300 max-w-[400px] flex items-start gap-3 justify-start">
                <div className="flex items-center gap-2">
                  <FaRegCheckCircle />
                  Pellentesque cras aliquam consectetur
                </div>
              </p>
              <p className="text-gray-300 max-w-[400px] flex items-start gap-3 justify-start">
                <div className="flex items-center gap-2">
                  <FaRegCheckCircle />
                  Arcu ultricies nibh suspendisse facilisis
                </div>
              </p>
              <p className="text-gray-300 max-w-[400px] flex items-start gap-3 justify-start">
                <div className="flex items-center gap-2">
                  <FaRegCheckCircle />
                  Quis eleifend quam adipiscing vitae
                </div>
              </p>
            </div>
            {/* buttons */}
            <div className="flex gap-5">
              <button className="bg-yellow-300 text-black flex items-center gap-2 px-6 py-4 rounded-md font-semibold">
                Visit Shop <GoArrowUpRight className="text-xl font-semibold" />
              </button>
              <button className="flex items-center text-white gap-2 px-6 py-4 rounded-md font-semibold">
                Learn More <GoArrowUpRight className="text-xl font-semibold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
