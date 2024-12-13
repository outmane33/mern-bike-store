import { useLocation } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import ListProducts from "./ListProducts";
import Orders from "./Orders.JSX";
import Users from "./Users";
import AddUser from "./AddUser";

export default function AdminPage() {
  const location = useLocation();
  //extract query params
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");

  return (
    <div className="w-full min-h-screen flex">
      <div>
        <AdminSidebar />
      </div>
      {/* main content */}
      <div className="p-10 w-full">
        {(() => {
          switch (tab) {
            case "dashboard":
              return <Dashboard />;
            case "add-product":
              return <AddProduct />;
            case "products":
              return <ListProducts />;
            case "orders":
              return <Orders />;
            case "users":
              return <Users />;
            case "add-user":
              return <AddUser />;
            default:
              return <Dashboard />;
          }
        })()}
      </div>
    </div>
  );
}
