import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function OnlyUserPrivateRoute() {
  const user = useSelector((state) => state.auth.user);
  return user && user.role === "user" ? <Outlet /> : "";
}
