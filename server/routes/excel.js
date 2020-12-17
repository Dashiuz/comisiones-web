if (typeof require !== "undefined") XLSX = require("xlsx");
const express = require("express");
const router = express.Router({ strict: true });
const mongoose = require("mongoose");
const { ErrorHandler } = require("../middleware/errorHandler");
const auth = require("../middleware/auth");
const excelModel = require("../schemas/excel");
const multer = require("multer");
const fs = require("fs");
const dbscripts = require("../middleware/dbScripts");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**UPLOAD EXCEL FILE AND SAVE IT INTO THE DATABASE */
router.post(
  `/uploadFile`,
  auth.VerifyToken,
  upload.single("file"),
  (req, res, next) => {
    try {
      console.log("FILE: ", req.file);

      const path = `${req.file.destination}${req.file.originalname}`;

      let workbook = XLSX.readFile(path);

      let sheet = workbook.SheetNames[0];

      let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

      let operators = sheetData.map((item) => {
        let operador = item.Teleoperador;
        if (operador !== undefined) {
          return operador.toLowerCase().trim();
        }
      });

      let uniqueOperators = [...new Set(operators)];

      uniqueOperators.forEach(async (item) => {
        const chk = await dbscripts.checkUser(item);
        if (chk === false) {
          dbscripts.saveUser(item);
        }
      });

      // if (req.file !== undefined) {
      //   upload(req, res, (err) => {
      //     if (err instanceof multer.MulterError) {
      //       throw new ErrorHandler(500, err);
      //     } else if (err) {
      //       throw new ErrorHandler(400, err);
      //     }

      //     console.log("ARCHIVO: ", req.file);

      //     return res.status(200).send({
      //       status: 200,
      //       success: true,
      //       msg: "Su Archivo se ha subido satisfactoriamente",
      //       data: req.file,
      //     });
      //   });
      // } else {
      //   throw new ErrorHandler(
      //     400,
      //     "No se ha podido leer de manera correcta el archivo que está tratando de subir"
      //   );
      // }
    } catch (ex) {
      console.log(ex);
      throw new ErrorHandler(500, ex);
    }
  }
);

module.exports = router;
