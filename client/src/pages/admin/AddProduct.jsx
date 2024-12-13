import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Alert, Label, Select } from "flowbite-react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdminImagesModal from "../../components/admin/AdminImagesModal";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    priceAfterDiscount: "",
    quantity: "",
    small_description: "",
    description: "",
    category: "",
    colors: [],
    images: [],
    imageCover: "",
  });
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [imageCover, setImageCover] = useState({ name: "", path: "" });
  const [productImages, setProductImages] = useState([]);
  const location = useLocation();
  const { productId } = useParams();

  const handleImageSelect = (image) => {
    try {
      switch (imageIndex) {
        case 0:
          setImageCover({ name: image.name, path: image.path });
          setFormData({ ...formData, imageCover: image.name });
          break;
        case 1:
        case 2:
        case 3:
          setProductImages((prevImages) => {
            // Create a copy of the previous images
            const updatedImages = [...prevImages];

            // Calculate the correct index (subtract 1 since imageIndex starts at 1)
            const correctIndex = imageIndex - 1;

            // Ensure the array has enough elements
            while (updatedImages.length < correctIndex + 1) {
              updatedImages.push({ name: "", path: "" });
            }

            // Check for duplicates
            const isDuplicate = updatedImages.some(
              (existingImage) => existingImage.path === image.path
            );

            if (isDuplicate) {
              console.warn(`Image ${image.name} is already selected`);
              return prevImages;
            }

            // Replace or add the image
            updatedImages[correctIndex] = image;

            setFormData({
              ...formData,
              images: updatedImages.map((image) => image.name),
            });

            return updatedImages;
          });
          break;
        default:
          console.warn(`Invalid image index: ${imageIndex}`);
          break;
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveImage = (index) => {
    setProductImages((prevImages) => {
      // Create a copy of the previous images
      const updatedImages = [...prevImages];

      // Calculate the correct index (subtract 1 since imageIndex starts at 1)
      const correctIndex = index - 1;

      // Remove the image at the correct index
      updatedImages.splice(correctIndex, 1);

      setFormData({
        ...formData,
        images: updatedImages.map((image) => image.name),
      });

      return updatedImages;
    });
  };

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/v1/product/${productId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (data.status === "success") {
            setFormData(data.product);
            setImageCover({
              name: data.product.imageCover,
              path: `http://localhost:8000/products/${data.product.imageCover}`,
            });
            setProductImages(
              data.product.images.map((image) => ({
                name: image,
                path: `http://localhost:8000/products/${image}`,
              }))
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchProduct();
    }
    const getAllCategories = async () => {
      try {
        const res = await fetch("/api/v1/product/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setCategories(data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getAllColors = async () => {
      try {
        const res = await fetch("/api/v1/product/colors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setColors(data.colors);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllColors();
    getAllCategories();
  }, [location.pathname]);
  const handleAddProduct = async () => {
    if (
      !formData.title ||
      !formData.small_description ||
      !formData.quantity ||
      !formData.priceAfterDiscount ||
      !formData.price ||
      !formData.imageCover ||
      formData.imageCover === "" ||
      !formData.category
    ) {
      setError("All fields are required");
      return;
    }
    if (productId) {
      try {
        const res = await fetch(`/api/v1/product/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.status === "success") {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch("/api/v1/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.status === "success") {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="px-10 pt-5">
        <p className="text-2xl font-bold">
          {productId ? "Edit" : "Add"} Product
        </p>
      </div>
      <div className="flex gap-10 p-10">
        {/* left */}
        <div className="flex-1 bg-white  rounded-3xl p-6">
          <form className="flex flex-col gap-5">
            {/* title */}
            <div className="flex gap-5 w-full ">
              <div className="flex flex-col flex-1">
                <Label
                  htmlFor="default-search"
                  className="text-[#989d91] text-lg"
                >
                  Product Title
                </Label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={formData.title && formData.title}
                  className="rounded-md border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex gap-3">
              {/* category */}
              <div className="flex flex-1 flex-col">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Category
                </Label>
                <Select
                  id="keyword"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="rounded-md border-[3px] border-gray-100 w-full focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                >
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))}
                </Select>
              </div>
              {/* color */}
              <div className="flex flex-1 flex-col">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Color
                </Label>
                <Select
                  id="keyword"
                  name="colors"
                  onChange={handleChange}
                  className="rounded-md border-[3px] border-gray-100 w-full  focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                >
                  {colors.length > 0 &&
                    colors.map((color) => (
                      <option value={color} key={color}>
                        {color}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
            {/* price */}
            <div className="flex gap-3">
              {/* Price */}
              <div className="flex flex-col flex-1">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Price
                </Label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={formData.price && formData.price}
                  className="rounded-md  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                />
              </div>
              {/* Price after discount */}
              <div className="flex flex-col flex-1">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Price after discount
                </Label>
                <input
                  type="number"
                  onChange={handleChange}
                  value={
                    (formData.priceAfterDiscount &&
                      formData.priceAfterDiscount) ||
                    0
                  }
                  name="priceAfterDiscount"
                  className="rounded-md  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                />
              </div>
              {/* Total in stock */}
              <div className="flex flex-col flex-1">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Total in stock
                </Label>
                <input
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  value={formData.quantity && formData.quantity}
                  className="rounded-md  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#fecd06] focus:border-[3px] transition-colors duration-200"
                />
              </div>
            </div>
          </form>
        </div>
        {/* right */}
        <div className="flex-1 bg-white  rounded-3xl p-6">
          {/* upload images */}
          <div className="flex  gap-3">
            {/* images */}
            <div className="flex flex-col gap-5">
              {/* image 1 */}

              {productImages[0] && productImages[0].name !== "" ? (
                <div
                  className="w-[150px] h-[150px] border  p-3 rounded-lg cursor-pointer relative"
                  onClick={() => {
                    setImageIndex(1);
                  }}
                >
                  <img
                    src={productImages[0].path}
                    alt=""
                    className="w-full h-full"
                  />
                  <IoClose
                    className="absolute top-2 left-2 text-2xl hover:text-red-600"
                    onClick={() => {
                      handleRemoveImage(1);
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-[150px] h-[150px] border flex flex-col justify-center items-center gap-4 p-3 rounded-lg cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setImageIndex(1);
                  }}
                >
                  <AiOutlineCloudUpload className="text-6xl text-black" />
                  <p className="text-black text-sm text-center">
                    click to upload image
                  </p>
                </div>
              )}

              {/* image 2 */}
              {productImages[1] && productImages[1].name !== "" ? (
                <div
                  className="w-[150px] h-[150px] border  p-3 rounded-lg cursor-pointer relative"
                  onClick={() => {
                    setImageIndex(2);
                  }}
                >
                  <img
                    src={productImages[1].path}
                    alt=""
                    className="w-full h-full"
                  />
                  <IoClose
                    className="absolute top-2 left-2 text-2xl hover:text-red-600"
                    onClick={() => {
                      handleRemoveImage(2);
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-[150px] h-[150px] border flex flex-col justify-center items-center gap-4 p-3 rounded-lg cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setImageIndex(2);
                  }}
                >
                  <AiOutlineCloudUpload className="text-6xl text-black" />
                  <p className="text-black text-sm text-center">
                    click to upload image
                  </p>
                </div>
              )}
              {/* image 3 */}
              {productImages[2] && productImages[2].name !== "" ? (
                <div
                  className="w-[150px] h-[150px] border  p-3 rounded-lg cursor-pointer relative"
                  onClick={() => {
                    setImageIndex(3);
                  }}
                >
                  <img
                    src={productImages[2].path}
                    alt=""
                    className="w-full h-full"
                  />
                  <IoClose
                    className="absolute top-2 left-2 text-2xl hover:text-red-600"
                    onClick={() => {
                      handleRemoveImage(3);
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-[150px] h-[150px] border flex flex-col justify-center items-center gap-4 p-3 rounded-lg cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setImageIndex(3);
                  }}
                >
                  <AiOutlineCloudUpload className="text-6xl text-black" />
                  <p className="text-black text-sm text-center">
                    click to upload image
                  </p>
                </div>
              )}
            </div>
            {/* image Cover */}
            <div>
              {imageCover.name !== "" ? (
                <div className="w-[500px] h-[500px] border  p-3 rounded-lg cursor-pointer relative">
                  <img src={imageCover.path} alt="" className="w-full h-full" />
                  <IoClose
                    className="absolute top-2 left-2 text-2xl hover:text-red-600"
                    onClick={() => {
                      setImageCover({ name: "", path: "" });
                      setFormData({ ...formData, imageCover: "" });
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-[500px] h-[500px] border flex flex-col justify-center items-center gap-4 p-3 rounded-lg cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setImageIndex(0);
                  }}
                >
                  <AiOutlineCloudUpload className="text-6xl text-black" />
                  <p className="text-black text-sm text-center">
                    click to upload image
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="gap-10 bg-white px-10 pt-5 mx-10 rounded-xl">
        <div className="flex flex-col gap-7">
          <Label className="text-[#989d91] text-lg" htmlFor="default-search">
            Description
          </Label>

          <ReactQuill
            theme="snow"
            className="h-72 mb-12"
            name="small_description"
            onChange={(value) => {
              setFormData({
                ...formData,
                small_description: value,
              });
            }}
            // value={formData.small_description && formData.small_description}
          />
          <button
            className="bg-[#fecd06] flex-1 hover:bg-yellow-400 text-black px-6 py-3 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
            onClick={handleAddProduct}
          >
            {productId ? "Edit" : "Add"} Product
          </button>
        </div>
        {error && <Alert color="failure">{error}</Alert>}
      </div>
      {/* show images modal */}
      <AdminImagesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Images"}
        onImageSelect={handleImageSelect}
      />
    </>
  );
}
