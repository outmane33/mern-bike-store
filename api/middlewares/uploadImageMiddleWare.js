const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  // file filter
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Not an image! Please upload only images.", 400), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return upload;
};

const uploadSigleImage = (fieldName) => multerOptions().single(fieldName);

const uploadMixImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);

module.exports = { uploadSigleImage, uploadMixImages };
