import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const location = useLocation();
  const [order, setOrder] = useState({});
  const { orderId } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await fetch(`/api/v1/order/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setOrder(data.order);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [location.pathname]);

  return (
    <div>
      <div className="overflow-x-auto px-10  flex flex-col gap-10 pt-10">
        <p className="text-2xl font-bold pb-10">Orders Details</p>
        {/* main content */}
        <div className="flex gap-10">
          {/* left */}
          <div className="flex-1 flex flex-col gap-10">
            {/* top */}
            <div className="bg-white rounded-lg">
              <Table hoverable>
                <Table.Body>
                  {order &&
                    order.cartItems &&
                    order.cartItems.map((item) => (
                      <Table.Row key={item._id}>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                item.product.imageCover &&
                                item.product.imageCover
                              }
                              alt=""
                              className="w-12 h-12"
                            />
                            <div>
                              <p className="text-sm font-bold">
                                {item.product.title && item.product.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.product.category && item.product.category}
                              </p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            <p>Quantity</p>
                            <p>{item.quantity && item.quantity}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            <p>Price</p>
                            <p>
                              ${item.product.price && item.product.price}.00
                            </p>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
            {/* bottom */}
            <div className="bg-white">
              <Table>
                <Table.Head>
                  <Table.HeadCell>
                    <p>Cart Totals</p>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <p>Price</p>
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Subtotal:</Table.Cell>
                    <Table.Cell>
                      <p className="font-bold">$70.13</p>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Shipping:</Table.Cell>
                    <Table.Cell>
                      <p className="font-bold">$10.00</p>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Tax (GST):</Table.Cell>
                    <Table.Cell>
                      <p className="font-bold">$5.00</p>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <p className="font-bold text-[#264c4f]">Total price:</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="font-bold text-red-600">$90.58</p>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
          {/* right */}

          <div className="w-[400px] flex flex-col gap-3 ">
            {/* sammary */}
            <div className="bg-white shadow-md rounded-lg px-16 py-5">
              <h2 className="text-sm font-bold mb-4">Summary</h2>
              <div className="space-y-2 text-gray ">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Order ID</span>
                  <span className="font-medium">{order._id && order._id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Date</span>
                  <span className="font-medium">
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between ">
                  <span className="text-sm">Total</span>
                  <span className="font-medium text-red-500">
                    ${order.totalOrderPrice && order.totalOrderPrice}.00
                  </span>
                </div>
              </div>
            </div>
            {/*  shipping  */}
            <div className="bg-white shadow-md rounded-lg px-16 py-5">
              <h2 className="text-sm font-bold mb-4">Shipping Address</h2>
              <p className="text-gray-500 text-sm">
                {order.shippingAdress && order.shippingAdress.details}
              </p>
            </div>
            {/* payment */}
            <div className="bg-white shadow-md rounded-lg px-16 py-5">
              <h2 className="text-sm font-bold mb-4">Payment Method</h2>
              <p className="text-gray-500 text-sm">
                {order.paymentMethodType && order.paymentMethodType === "cash"
                  ? "Cash (COD)"
                  : "Card Strip"}
              </p>
            </div>
            {/* shipping */}
            <div className="bg-white flex flex-col  shadow-md rounded-lg px-16 py-5">
              <p className="text-sm font-bold mb-4">
                Expected Date Of Delivery
              </p>
              <p className="text-sm font-bold text-green-500">20 Nov 2023</p>
            </div>
          </div>
        </div>

        {/* tracking info */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-16">
          <h2 className="text-lg font-bold mb-4">Detail</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Your items is on the way. Tracking information will be available
            within 24 hours.
          </p>
          <div className="relative flex items-center justify-between py-4">
            <div className="absolute inset-x-0 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col items-center space-y-2 w-1/4">
              <div className="bg-[#264c4f] text-white rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm font-semibold pt-10">
                Receiving orders
              </p>
              <p className="text-gray-600 text-sm">05:43 AM</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/4">
              <div className="bg-[#264c4f] text-white rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm  font-semibold pt-10">
                Order processing
              </p>
              <p className="text-gray-600 text-sm">01:21 PM</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/4">
              <div className="bg-[#264c4f] text-white rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm  font-semibold pt-10">
                Being delivered
              </p>
              <p className="text-gray-600 text-sm">Processing</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/4">
              <div className="bg-gray-300 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm  font-semibold pt-10">
                Delivered
              </p>
              <p className="text-gray-600 text-sm">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
