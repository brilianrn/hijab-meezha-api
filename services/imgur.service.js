const fs = require("fs");
const imgur = require("imgur");
const multer = require("multer");
const path = require("path");

const UploadImage = async (file) => {
  const url = await imgur.uploadFile(`./assets/images/upload/${file.filename}`);
  console.log(url, " ----- URL");
  fs.unlinkSync(`./assets/images/upload/${file.filename}`);
  return url?.data?.link;
};

const Storage = multer.diskStorage({
  destination: "./assets/images/upload",
  filename: (_, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports = { UploadImage, Storage };
