import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { PiSealCheckThin } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { logout } from "../../redux/actions/authActions";

export default function AdminHeader() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/auth/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className="border-b">
      <Navbar.Toggle className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black" />
      <span></span>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img={FaRegCircleUser}
            rounded
            size="xs"
            className="text-[#1c2b26]"
          />
        }
      >
        <Dropdown.Header>
          <p className="font-semibold text-sm">Logged in as John Doe</p>
        </Dropdown.Header>
        <Dropdown.Item
          className="flex gap-2"
          onClick={() => navigate("/shop/acount")}
        >
          <FaUserCog className="text-lg" />
          Acount
        </Dropdown.Item>
        <Dropdown.Item className="flex gap-2" onClick={handleLogout}>
          <MdLogout className="text-lg" />
          Logout
        </Dropdown.Item>
      </Dropdown>

      <Navbar.Collapse className="md:hidden">
        <Navbar.Link as={"div"} active={path === "/admin/dashboard"}>
          <Link to="/admin/dashboard" className="flex gap-2 items-center">
            <MdOutlineDashboard /> Dashboard
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/admin/products"}>
          <Link to="/admin/products" className="flex gap-2 items-center">
            <RiShoppingCartLine /> Products
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/admin/orders"}>
          <Link to="/admin/orders" className="flex gap-2 items-center">
            <PiSealCheckThin /> Orders
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
