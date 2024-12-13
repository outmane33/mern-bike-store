import { Alert, Label, Spinner } from "flowbite-react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  loginFailure,
  loginSuccess,
  loginStart,
} from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginModal(pros) {
  const [signUp, setSignUp] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signUp) {
      if (!formData.userName || !formData.email || !formData.password) {
        dispatch(loginFailure("All fields are required"));
        return;
      }
      try {
        dispatch(loginStart());
        const res = await fetch("/api/v1/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.status === "success") {
          setFormData({ userName: "", email: "", password: "" });
          dispatch(loginSuccess(data.user));
          if (data.user.role === "admin") {
            navigate("/admin?tab=dashboard");
          }
          window.location.reload();
        } else {
          dispatch(loginFailure(data.message));
        }
      } catch (error) {
        dispatch(loginFailure(error));
      }
    } else {
      if (!formData.email || !formData.password) {
        dispatch(loginFailure("All fields are required"));
        return;
      }
      try {
        dispatch(loginStart());
        const res = await fetch("/api/v1/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.status === "success") {
          dispatch(loginSuccess(data.user));
          if (data.user.role === "admin") {
            navigate("/admin?tab=dashboard");
          } else {
            window.location.reload();
          }
        } else {
          dispatch(loginFailure(data.message));
        }
      } catch (error) {
        dispatch(loginFailure(error));
      }
    }
  };

  if (!pros.isOpenLogin) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={pros.onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] relative p-20">
          {/* Close button */}
          <button
            onClick={pros.onClose}
            className="absolute right-4 top-4 p-1 rounded-md hover:bg-gray-100 transition-colors z-10"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          {/* Content */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* UserName */}
            {signUp && (
              <div className="flex flex-col">
                <Label className="text-[#989d91] text-sm">User Name</Label>
                <input
                  type="text"
                  className="rounded-md border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                  id="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col">
              <Label className="text-[#989d91] text-sm">Email Address</Label>
              <input
                type="email"
                className="rounded-md border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <Label className="text-[#989d91] text-sm">Password</Label>
              <input
                type="password"
                className="rounded-md border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Sign up & forgot password */}
            <div className="flex justify-between">
              <Label
                className="text-[#989d91] text-sm cursor-pointer"
                onClick={() => setSignUp(!signUp)}
              >
                {signUp ? "Login" : "Sign Up"}
              </Label>
              <Label className="text-[#989d91] text-sm cursor-pointer">
                Forgot Password?
              </Label>
            </div>

            <button
              className="bg-[#fecd06] text-black hover:bg-yellow-400 w-full px-5 lg:px-10 py-3 lg:py-3 rounded-md text-base lg:text-lg transition-all duration-500"
              type="submit"
            >
              {loading ? (
                <Spinner className="text-black" />
              ) : signUp ? (
                "Sign Up"
              ) : (
                "Login"
              )}
            </button>
          </form>
          {error && (
            <Alert className="text-sm text-white font-semibold bg-[#e44b5f] mt-5">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
