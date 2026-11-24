const multer = require("multer");
const path = require("path");

const armazenamento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const sufixo = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, sufixo + path.extname(file.originalname));
  },
});

const uploadFoto = multer({
  storage: armazenamento,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeOk = file.mimetype === "image/jpeg" || file.mimetype === "image/png";
    const extOk = ext === ".jpeg" || ext === ".jpg" || ext === ".png";

    if (!mimeOk || !extOk) {
      return cb(new Error("Formato não suportado! Envie somente arquivos .jpeg ou .png."));
    }
    cb(null, true);
  },
});

module.exports = { uploadFoto };