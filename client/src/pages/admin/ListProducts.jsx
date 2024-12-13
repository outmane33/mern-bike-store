import {
  Badge,
  Button,
  Modal,
  Pagination,
  Table,
  TextInput,
} from "flowbite-react";
import { FiEye } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  productStart,
  productSuccess,
  productFailure,
} from "../../redux/actions/productActions";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [paginationResult, setPaginationResult] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const getAllProducts = async (query) => {
    try {
      dispatch(productStart());
      const res = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(productSuccess(data.products));
        setPaginationResult(data.paginationResult);
      } else {
        dispatch(productFailure(data.message));
      }

      setProducts(data.products);
    } catch (error) {
      dispatch(productFailure(error));
    }
  };
  useEffect(() => {
    getAllProducts("/api/v1/product?limit=10");
  }, [location.pathname]);
  const onPageChange = (page) => {
    getAllProducts(`/api/v1/product?limit=10&page=${page}`);
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/product/${selectedProduct._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setProducts((prev) =>
          prev.filter((p) => p._id !== selectedProduct._id)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto p-10">
      <p className="text-2xl font-bold pb-10">Products List</p>
      <div className="flex flex-col">
        {/* limit & search & add */}
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex items-center gap-4 py-10">
            <p className="text-gray-500 text-sm">Showing</p>
            <select className="p-0 m-0 h-8 rounded-lg border-gray-500 outline-none ">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <p className="text-gray-500 text-sm">entries</p>
            <TextInput
              placeholder="Search..."
              rightIcon={IoIosSearch}
              className="w-[400px]"
            />
          </div>
          {/* right */}
          <div>
            <button className="bg-[#fecd06] flex-1 hover:bg-yellow-400 text-black px-6 py-3 rounded-md transition-colors duration-200 mr-2 font-semibold text-base">
              Add Product
            </button>
          </div>
        </div>
        {/* table */}
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Colors</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>quantity</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Sold</Table.HeadCell>
            <Table.HeadCell>Stcok</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products &&
              products.map((product) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={product._id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex gap-3 items-center">
                      <img
                        src={product.imageCover}
                        alt=""
                        className="w-14 h-14"
                      />
                      {product.title}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {product.colors ? product.colors.join(", ") : "N/A"}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {product.category}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {product.quantity}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    ${product.price}.00
                  </Table.Cell>

                  <Table.Cell className="font-semibold">
                    {product.sold}
                  </Table.Cell>
                  <Table.Cell>
                    {product.quantity > 10 && (
                      <Badge color="info" className="font-semibold">
                        In Stock
                      </Badge>
                    )}
                    {product.quantity <= 10 && (
                      <Badge color="warning" className="font-semibold">
                        only {product.quantity} left
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-5 text-lg">
                      <FiEye
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          navigate(`/product/${product.slug}`);
                        }}
                      />
                      <LuPencilLine
                        className="text-green-500 cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/update-product/${product._id}`)
                        }
                      />
                      <FiTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowModal(true);
                        }}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        {/* pagination */}
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={paginationResult.page ? paginationResult.page : 1}
            totalPages={paginationResult.pages ? paginationResult.pages : 1}
            onPageChange={onPageChange}
            previousLabel="Previous"
            nextLabel="Next"
            showIcons
          />
        </div>
        {/* delete modal */}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-200" />
              <h3 className="text-lg font-semibold text-gray-500">
                Are you sure you want to delete this product?
              </h3>
              <div className="mt-4 flex justify-center gap-6">
                <Button color="failure" onClick={handleDelete}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  {"No, Cancel"}{" "}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
