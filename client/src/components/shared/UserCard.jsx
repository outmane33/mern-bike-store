import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

export default function UserCard(pros) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <img src={pros.img} alt="" />
      <p className="text-xl font-semibold">{pros.name}</p>
      <div className="text-gray-600 flex gap-6 text-lg">
        <FaFacebook />
        <FaSquareXTwitter />
        <AiFillInstagram className="text-xl" />
      </div>
    </div>
  );
}
