import { Breadcrumb } from "flowbite-react";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function BlogCard(pros) {
  return (
    <div className="flex flex-col md:flex-row gap-5 group">
      {/* left */}
      <div className="overflow-hidden w-full md:w-[350px] h-[350px]">
        <img
          src={pros.img}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* right */}
      <div className="flex flex-1 flex-col justify-center gap-5">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item>
            <p className="text-xs text-gray-700 uppercase">{pros.date}</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <p className="text-xs text-gray-700">
              IN{" "}
              <span className="hover:text-yellow-300 cursor-pointer">
                {pros.category}
              </span>
            </p>
          </Breadcrumb.Item>
        </Breadcrumb>
        <p className="text-xl font-bold">{pros.title}</p>
        <p className="text-gray-500 line-clamp-3">{pros.description}</p>
        <button className="text-black px-4 py-2 self-start flex gap-3 items-center bg-[#fecd06] hover:bg-yellow-300 font-semibold">
          <p>Read More</p>
          <FaLongArrowAltRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}
