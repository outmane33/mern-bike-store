import { FaTimes } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

export default function AdminUserModal(pros) {
  console.log(pros.user);
  if (!pros.isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={pros.onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] relative ">
          {/* Close button */}
          <button
            onClick={pros.onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="  ">
            <div className="p-16 flex flex-col gap-6">
              {/* user */}
              <div className="flex gap-3 w-full items-center">
                <FaRegUserCircle className="text-lg" />
                <p>{pros.user ? pros.user.userName : "anonymous"}</p>
              </div>
              {/* user id*/}
              <div className="flex gap-3 justify-between items-center">
                <p>Id:</p>
                <p>{pros.user ? pros.user._id : "anonymous"}</p>
              </div>
              {/* user email*/}
              <div className="flex gap-3 justify-between items-center">
                <p>Email:</p>
                <p>{pros.user ? pros.user.email : "anonymous"}</p>
              </div>
              {/* user role*/}
              <div className="flex gap-3 justify-between items-center">
                <p>Role:</p>
                <p>{pros.user ? pros.user.role : "anonymous"}</p>
              </div>
              {/* user createdAt*/}
              <div className="flex gap-3 justify-between items-center">
                <p>createdAt:</p>
                <p>
                  {pros.user
                    ? new Date(pros.user.createdAt).toLocaleDateString()
                    : "anonymous"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
