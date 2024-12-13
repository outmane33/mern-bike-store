import { Sidebar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowSmRight, HiChartPie } from "react-icons/hi";
import { GiJigsawBox } from "react-icons/gi";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

export default function AdminSidebar() {
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
    <Sidebar className="hidden md:block">
      <Sidebar.Logo>
        <div className="flex items-center text-2xl text-black italic font-semibold">
          <AiFillThunderbolt />
          <p className="font-semibold">Bike</p>
        </div>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={"div"} icon={HiChartPie} label="outmane">
            <Link to="/admin?tab=dashboard">Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Collapse icon={FaBasketShopping} label="Products">
            <Sidebar.Item as={"div"}>
              <Link to="/admin?tab=add-product">Add Product</Link>
            </Sidebar.Item>
            <Sidebar.Item as={"div"}>
              <Link to="/admin?tab=products">Product List</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={GiJigsawBox} label="Orders">
            <Sidebar.Item as={"div"}>
              <Link to="/admin?tab=orders">Order List</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={FaUsers} label="Users">
            <Sidebar.Item as={"div"}>
              <Link to="/admin?tab=users">All Users</Link>
            </Sidebar.Item>
            <Sidebar.Item as={"div"}>
              <Link to="/admin?tab=add-user">Add New User</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            as={"div"}
            icon={HiArrowSmRight}
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
