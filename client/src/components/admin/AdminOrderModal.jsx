import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { FaRegUserCircle } from "react-icons/fa";

const AdminOrderModal = (pros) => {
  const [updateForm, setUpdateForm] = useState({
    orderPayment: false,
    orderStatus: "Pending",
  });

  // Update form when pros.selectedOrder changes
  useEffect(() => {
    if (pros.selectedOrder) {
      setUpdateForm({
        orderPayment: pros.selectedOrder.isPaid,
        orderStatus: pros.selectedOrder.orderStatus,
      });
    }
  }, [pros.selectedOrder]);

  const handleUpdateOrder = async () => {
    try {
      const res = await fetch(
        `/api/v1/order/${pros.selectedOrder._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateForm),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        pros.onClose();
        pros.setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === pros.selectedOrder._id ? data.order : order
          )
        );
        setUpdateForm({
          orderPayment: false,
          orderStatus: "Pending",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={pros.isOpen} onClose={pros.onClose} size="md">
      <Modal.Header>
        <button
          onClick={pros.onClose}
          className="absolute right-4 top-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {" "}
        </button>
      </Modal.Header>
      <div className="">
        <div className="p-16 flex flex-col gap-6">
          {/* user */}
          <div className="flex gap-3 items-center">
            <FaRegUserCircle className="text-lg" />
            <p>{pros.selectedOrder?.user.userName}</p>
          </div>
          {/* order id */}
          <div className="flex gap-3 justify-between items-center">
            <p>Order ID:</p>
            <p>{pros.selectedOrder?._id}</p>
          </div>
          {/* order price */}
          <div className="flex gap-3 justify-between items-center">
            <p>Order Price:</p>
            <p>${pros.selectedOrder?.totalOrderPrice}.00</p>
          </div>
          {/* order update */}
          <div className="flex gap-3 justify-between items-center">
            <p>Update Date:</p>
            <p>
              {pros.selectedOrder &&
                new Date(pros.selectedOrder.updatedAt).toLocaleDateString()}
            </p>
          </div>
          {/* order Payment */}
          <div className="flex gap-3 items-center justify-between">
            <p>Order Payment:</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
              onChange={(e) =>
                setUpdateForm((prevForm) => ({
                  ...prevForm,
                  orderPayment: e.target.value === "Payed" ? true : false,
                }))
              }
              value={updateForm.orderPayment ? "Payed" : "Not Payed"}
            >
              <option value="Payed">Payed</option>
              <option value="Not Payed">Not Payed</option>
            </select>
          </div>
          {/* Order Status */}
          <div className="flex gap-3 items-center justify-between">
            <p>Order Status:</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
              onChange={(e) =>
                setUpdateForm((prevForm) => ({
                  ...prevForm,
                  orderStatus: e.target.value,
                }))
              }
              value={updateForm.orderStatus}
            >
              <option value="Pending">Pending</option>
              <option value="In Process">In Process</option>
              <option value="In Shipping">In Shipping</option>
              <option value="Delivered">Delivered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          {/* update */}
          <button
            className="bg-[#fecd06] flex-1 hover:bg-yellow-400 text-black px-6 py-3 rounded-md transition-colors duration-200 mr-2  text-base"
            onClick={handleUpdateOrder}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminOrderModal;
