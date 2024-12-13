import { FaTimes } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { Alert, FileInput } from "flowbite-react";

export default function AdminImagesModal({ isOpen, onClose, onImageSelect }) {
  const [uploadError, setUploadError] = useState(null);
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const getAllImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/product/upload/image", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setImages(data.images);
        setUploadError(null);
      } else {
        setUploadError(data.message || "Failed to fetch images");
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setUploadError("Failed to connect to the server");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getAllImages();
    }

    return () => {
      setImages([]);
      setUploadError(null);
    };
  }, [isOpen]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await fetch("/api/v1/product/upload/image", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (data.status === "success") {
        setLoading(false);
        setUploadError(null);
        setImages([data.image, ...images]);
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      setUploadError(error.message);
      setLoading(false);
    }
  };

  const handleSelectImage = (image) => {
    onImageSelect(image); // Send the selected image to parent
    onClose(); // Close the modal after selection
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-[90%] h-[90%] relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          <div className="flex gap-5 min-h-[600px] p-10 flex-wrap">
            <FileInput
              className="hidden"
              ref={ref}
              onChange={handleImageChange}
              accept="image/*"
            />
            <div
              className="w-[150px] h-[150px] border flex flex-col justify-center items-center gap-4 p-3 rounded-lg cursor-pointer"
              onClick={() => ref.current.click()}
            >
              <AiOutlineCloudUpload className="text-6xl text-black" />
              <p className="text-black text-sm text-center">
                {loading ? "Uploading..." : "Upload Image"}
              </p>
            </div>

            {images.length > 0
              ? images.map((image, index) => (
                  <div
                    className="w-[150px] h-[150px] border p-3 rounded-lg cursor-pointer hover:shadow-sm hover:border-yellow-300"
                    key={index}
                    onClick={() => handleSelectImage(image)}
                  >
                    <img
                      src={image.path}
                      alt={image.name || `Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              : null}
          </div>

          {uploadError && (
            <Alert
              color="failure"
              className="absolute bottom-0 left-0 w-full text-center flex justify-center items-center"
            >
              {uploadError}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
