import { Accordion, Breadcrumb } from "flowbite-react";
import { GoArrowUpRight } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { MdOutlinePedalBike } from "react-icons/md";
import { BsPatchCheck } from "react-icons/bs";
import UserCard from "../components/shared/UserCard";

export default function About() {
  return (
    <div>
      {/* banner section */}
      <div className="w-full bg-black relative pt-24 lg:h-[85vh]">
        {/* Overlay */}
        <div
          className="absolute banner inset-0 opacity-45 z-10"
          style={{
            backgroundImage:
              "url('https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/05/background-pattern-2.svg')",
          }}
        ></div>

        {/* Main content */}
        <div className="relative z-20 flex flex-col sm:flex-row gap-10 py-10 max-w-7xl pt-20 pb-28 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          {/* left */}
          <div className="flex-1 flex flex-col gap-10">
            {/* title */}
            <div>
              <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item>
                  <p className="text-yellow-300">HOME</p>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <p className="text-gray-400">ABOUT</p>
                </Breadcrumb.Item>
              </Breadcrumb>
              <p className="uppercase lg:text-5xl text-4xl font-bold leading-relaxed lg:leading-snug text-white">
                Rediscover the World on Two Wheels
              </p>
            </div>

            {/* buttons */}
            <div className="flex gap-5">
              <button className="bg-yellow-300 text-black flex items-center gap-2 p-3 rounded-full text-2xl font-semibold">
                <IoPlay />
              </button>
              <p className="text-gray-300 text-base max-w-[300px]">
                Find out how our company was founded and grown{" "}
                <span className="text-yellow-300">– watch video.</span>
              </p>
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col gap-4 sm:gap-8 lg:gap-3 justify-center text-[17px] ">
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
        </div>
      </div>
      <div className="flex lg:mt-[-300px] flex-col lg:flex-row  gap-10 max-w-7xl mx-5 xl:mx-auto md:mx-10 lg:mx-auto  relative pt-16 lg:px-10">
        <img
          src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/about-page-hero-image-1.webp"
          alt=""
          className="w-full lg:w-[600px] lg:h-[500px] object-cover"
        />
        <div className="w-full flex flex-col sm:flex-row gap-10">
          <img
            src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/about-page-hero-image-2.webp"
            alt=""
            className="w-full h-[400px] lg:w-[600px] lg:h-[500px] object-cover"
          />
          <img
            src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/about-page-hero-image-3.webp"
            alt=""
            className="w-full h-[400px] lg:w-[600px] lg:h-[500px] object-top object-cover"
          />
        </div>
      </div>
      {/* Mission  section */}
      <div className=" max-w-7xl text-center lg:text-start  pt-24 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
        <p className="lg:text-4xl text-3xl  font-semibold">
          Our Mission To Achieve Our Ambitious Goals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 max-w-7xl pt-20 pb-28 mx-10 gap-14 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
        {/* box 1 */}
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row text-center md:text-start gap-5">
            <div>
              <div className="bg-[#ffcd05] text-black mx-auto lg:mx-0 rounded-full flex items-center justify-center  h-12 w-12 text-lg font-bold">
                1
              </div>
            </div>
            <div>
              <p className="md:text-xl text-lg font-semibold">
                Customer Focused Busines
              </p>
              <p className="md:text-base  text-gray-600">
                Purus gravida quis blandit turpis cursus in hac habitasse magna
                fringilla urna porttitor ullamcorper malesuada.
              </p>
            </div>
          </div>
        </div>
        {/* box 2 */}
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row text-center md:text-start gap-5">
            <div>
              <div className="bg-[#ffcd05] text-black mx-auto lg:mx-0 rounded-full flex items-center justify-center  h-12 w-12 text-lg font-bold">
                2
              </div>
            </div>
            <div>
              <p className="md:text-xl text-lg font-semibold">
                Break Market Competition
              </p>
              <p className="text-base text-gray-600">
                Sed faucibus turpis in eu mi bibendum neque egestas porttitor
                rhoncus dolor purus pellentesque dignissim.
              </p>
            </div>
          </div>
        </div>
        {/* box 3 */}
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row text-center md:text-start gap-5">
            <div>
              <div className="bg-[#ffcd05] text-black mx-auto lg:mx-0 rounded-full flex items-center justify-center  h-12 w-12 text-lg font-bold">
                3
              </div>
            </div>
            <div>
              <p className="md:text-xl text-lg font-semibold">
                Good Customer Relationship
              </p>
              <p className="text-base text-gray-600">
                Porta nibh venenatis cras sed felis habitant morbi tristique
                senectus et netus et malesuada ullamcorper malesuada.
              </p>
            </div>
          </div>
        </div>
        {/* box 4 */}
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row text-center md:text-start gap-5">
            <div>
              <div className="bg-[#ffcd05] text-black mx-auto lg:mx-0 rounded-full flex items-center justify-center  h-12 w-12 text-lg font-bold">
                4
              </div>
            </div>
            <div>
              <p className="md:text-xl text-lg font-semibold">
                Break Market Competition{" "}
              </p>
              <p className="text-base text-gray-600">
                Massa sed elementum tempus egestas ultrices neque ornare aenean
                euismod elementum scelerisque eleifend.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* third section */}
      <div className="w-full bg-black mb-10">
        <div className="flex flex-col lg:flex-row gap-10 py-10 max-w-7xl pt-20 pb-20 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          {/* left */}
          <div>
            <img
              src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/about-page-video-cover.webp"
              alt=""
            />
          </div>
          {/* right */}
          <div className="flex flex-col gap-10">
            <p className="text-4xl font-semibold text-white text-center lg:text-start">
              Rediscover the World on Two Wheels
            </p>
            <p className="text-white text-center lg:text-start">
              Penatibus lacus sed nullam sodales. Eleifend dictumst sit in ut
              egestas vestibulum urna massa cursus. Felis iaculis sit leo at
              facilisi tortor eget in eget.
            </p>
            <div className="flex flex-col md:flex-row text-center lg:text-start  gap-6 text-white">
              {/* box 1 */}
              <div className="flex flex-col gap-4">
                <BsPatchCheck className="text-4xl text-yellow-300 mx-auto lg:mx-0" />
                <p className="text-white font-bold text-xl">
                  Penatibus Lacus Varius
                </p>
                <p className="text-gray-300 line-clamp-2">
                  Eleifend dictumst sit in ut egestas vestibulum urna massa
                  cursus felis iaculis sit leoat.
                </p>
              </div>
              {/* box 2 */}
              <div className="flex flex-col gap-4">
                <div className="text-4xl text-yellow-300 mx-auto lg:mx-0">
                  <MdOutlinePedalBike className="text-4xl text-yellow-300 " />
                </div>
                <p className="text-white font-bold text-xl">
                  Vitae Consectetur
                </p>
                <p className="text-gray-300 line-clamp-2">
                  Malesuada faucibus quis auctor integer rhoncus nulla pharetra
                  consequat commodo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* feel charge section */}
      <div className="flex flex-col gap-4 max-w-7xl mx-auto  py-16 px-10">
        <p className="text-center text-3xl lg:text-4xl font-bold">Who We Are</p>
        <p className="text-center text-base max-w-[650px] mx-auto text-gray-500">
          Lorem ipsum dolor sit amet consectetur vitae consectetur pulvinar
          malesuada elit tellus facilisi suspendisse elit tortor ut tristique.
        </p>
      </div>
      {/* Team section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex-row gap-10 max-w-7xl pb-20 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
        <UserCard
          img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-1.webp"
          name="Michael Peterson"
        />
        <UserCard
          img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-2.webp"
          name="Nick Diego Garcia"
        />
        <UserCard
          img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-3.webp"
          name="Tom Emerald"
        />
        <UserCard
          img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-4.webp"
          name="Andrew Colins"
        />
        <UserCard
          img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-5.webp"
          name="Jackson Ortega"
        />
        <UserCard
          img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-6.webp"
          name="Max Williams"
        />
      </div>
      {/* Frequently section */}
      <div className="w-full bg-black ">
        <div className="flex flex-col lg:flex-row gap-10 max-w-7xl py-20 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          {/* left */}
          <div className="flex-1 text-white flex flex-col gap-10 items-start py-5">
            <p className="lg:text-4xl text-3xl font-semibold">
              Frequently Asked Questions
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Vitae consectetur pulvinar
              malesuada elit tellus facilisi suspendisse. Elit tortor ut
              tristique purus venenatis id amet.
            </p>
            <button className="bg-yellow-300 text-black self-start flex items-center  justify-center gap-2 px-6 py-4 rounded-md font-semibold">
              Learn More <GoArrowUpRight className="text-xl font-semibold " />
            </button>
          </div>
          {/* right */}
          <div className="max-w-2xl w-full flex-1  lg:mx-auto">
            <Accordion collapseAll id="panel" className="border-none">
              <Accordion.Panel className="bg-red-400 ">
                <Accordion.Title
                  id="title"
                  className="hover:bg-black text-yellow-400 "
                >
                  Can I order by telephone?
                </Accordion.Title>
                <Accordion.Content id="content">
                  <p className="mb-2 text-white">
                    Et adipiscing mattis egestas mi placerat duis congue id.
                    Scelerisque integer pulvinar justo sed egetpretium ipsum id
                    faucibus euismod empor sagittis facilisis tristique. Egestas
                    massa purus vel at consectetur convallis cras imperdiet.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title
                  id="title"
                  className="hover:bg-black text-yellow-400"
                >
                  Do you sell gift cards?
                </Accordion.Title>
                <Accordion.Content id="content">
                  <p className="mb-2  text-white">
                    Quisque egestas diam in arcu. Pretium vulputate sapien nec
                    sagittis aliquam. Magna fermentum iaculis eu non diam
                    phasellus vestibulum lorem sed. Viverra mauris in aliquam
                    sem fringilla ut morbi tincidunt augue.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title
                  id="title"
                  className="hover:bg-black text-yellow-400"
                >
                  Can I order catalog products online?
                </Accordion.Title>
                <Accordion.Content id="content">
                  <p className="mb-2 text-white">
                    Tempus iaculis urna id volutpat. Vestibulum lorem sed risus
                    ultricies tristique nulla aliquet enim. Sem fringilla ut
                    morbi tincidunt.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title
                  id="title"
                  className="hover:bg-black text-yellow-400"
                >
                  Who can answer my warranty questions?
                </Accordion.Title>
                <Accordion.Content id="content">
                  <p className="mb-2 text-white">
                    Urna cursus eget nunc scelerisque viverra mauris. Ut
                    pharetra sit amet aliquam id. Et odio pellentesque diam
                    volutpat commodo.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </div>
      {/* Quetions section */}
      <div
        className="w-full relative"
        style={{
          backgroundImage:
            "url('https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/about-page-contact-section-image.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 py-10 max-w-7xl  pt-20 pb-28 mx-10 gap-72 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
          <div className="bg-[#fecd06] py-[80px] px-[60px] max-w-[450px]  h-full  flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-black text-4xl font-semibold whitespace-nowrap">
                Have Questions?
              </p>
              <p className="text-black text-2xl font-semibold whitespace-nowrap">
                Feel Free to Contact Us!
              </p>
            </div>
            <p className="text-base text-black max-w-[280px]">
              Donec ultrices tincidunt arcu non sodales. Orci eu lobortis
              elementum nibh tellus molestie nunc. Fames ac turpis egestas
              maecenas pharetra convallis posuere morbi.
            </p>
            <button className="flex items-center self-start bg-black text-white gap-2 px-6 py-4 rounded-md font-semibold">
              Contact Info
              <GoArrowUpRight className="text-xl font-semibold" />
            </button>
          </div>
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
}
