const multer = require("multer");

module.exports = multer({
    dest: "tmp/",
    fileFilter: (req, file, cb) => {
      if (
        !(
          file.mimetype.includes("image/png") ||
          file.mimetype.includes("image/jpg") ||
          file.mimetype.includes("image/jpeg")
        )
      ) {
        cb(new Error("Mauvais format de fichier"));
      }
      cb(null, true);
    },
    limits: {
      fileSize: 3 * 1024 * 1024
    }
  });