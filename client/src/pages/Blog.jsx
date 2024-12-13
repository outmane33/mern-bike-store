import { Breadcrumb } from "flowbite-react";
import { PiSealPercentLight } from "react-icons/pi";
import BlogCard from "../components/shared/BlogCard";
import TopSellingProductCard from "../components/shared/TopSellingProductCard";

export default function Blog() {
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
        <div className="relative z-20 flex flex-row lg:flex-row max-w-7xl h-[300px] mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
          <div className="flex-1 flex flex-col justify-between gap-2 py-5 ">
            <div></div>
            <div>
              <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item>
                  <p className="text-yellow-300 text-xs lg:text-sm">HOME</p>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <p className="text-gray-400 text-xs lg:text-sm">BLOG</p>
                </Breadcrumb.Item>
              </Breadcrumb>
              <p className="uppercase pt-3 text-4xl lg:text-6xl font-semibold leading-snug text-white">
                Archives
              </p>
            </div>
          </div>
          {/* right */}
          <div className="flex-1 flex justify-center"></div>
        </div>
      </div>
      {/* content */}
      <div className="flex max-w-7xl py-24 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10 ">
        {/* left */}
        <div className="flex-1 flex flex-col gap-10">
          {/* blog */}
          <BlogCard
            img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/article-image-4-768x512.webp"
            date="OnApril 9, 2024"
            category="Extreme"
            title="Odio Euismod Lacinia Quis Risus"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris augue neque gravida.…"
          />
          <BlogCard
            img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/article-image-3-768x512.webp"
            date="OnApril 9, 2024"
            category="Competition"
            title="Ullamcorper Dignissim Tincidunt"
            description="Posuere lorem ipsum dolor sit amet consectetur. Rhoncus mattis rhoncus urna neque. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Varius vel pharetra…"
          />
          <BlogCard
            img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/article-image-2-768x512.webp"
            date="OnApril 9, 2024"
            category="Extreme"
            title="Metus Aliquam Eleifend Posuere"
            description="Eget sit amet tellus cras adipiscing. Sit amet porttitor eget dolor morbi non arcu. Sem et tortor consequat id. Egestas purus viverra accumsan in nisl…"
          />
          <BlogCard
            img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/article-image-1-768x512.webp"
            date="OnApril 3, 2024"
            category="Uncategorized"
            title="Platea Dictumst Vestibulum Phoncus"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus…"
          />
        </div>
        {/* right */}
        <div className="hidden lg:block">
          {/* sale */}
          <div className="flex flex-col gap-2 w-[350px]">
            <div className="group bg-black text-white flex flex-col justify-between h-[500px] p-12 w-full relative overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/shop-sidebar-banner-image.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="relative z-10">
                <PiSealPercentLight className="text-6xl" />
              </div>
              <div className="relative z-10 flex flex-col gap-5">
                <p className="text-3xl font-bold max-w-5">Hot Summer Sale!</p>
                <button className="flex items-center self-start text-black gap-2 px-6 py-4 rounded-md font-semibold bg-white">
                  More Info
                </button>
              </div>
            </div>
          </div>
          {/* best selling products */}
          <div className="flex flex-col gap-2 mt-5 ">
            <p className="text-xl font-semibold text-[#212b28] mb-3">
              Best selling products
            </p>
            <div className="flex flex-col gap-4">
              {/* product */}
              <TopSellingProductCard
                img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/product-image-2.webp"
                title="Posuere Morbi"
                price="550"
              />
              <TopSellingProductCard
                img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/product-image-1.webp"
                title="Accumsan Nulla"
                price="400"
              />
              <TopSellingProductCard
                img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/product-image-3.webp"
                title="Tellus Pellentesque"
                price="350"
              />
              <TopSellingProductCard
                img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/product-image-4.webp"
                title="Sagittis Purus"
                price="450"
              />
              <TopSellingProductCard
                img="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/product-image-5.webp"
                title="Massa Placerat"
                price="750"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
