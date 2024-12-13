export default function TopSellingProductCard(pros) {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={pros.img}
        alt=""
        className="w-20 h-16 transition-transform duration-300 hover:scale-110 cursor-pointer"
      />
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-base whitespace-nowrap">
          {pros.title}
        </p>
        <p className="text-sm text-gray-500">${pros.price}.00</p>
      </div>
    </div>
  );
}
