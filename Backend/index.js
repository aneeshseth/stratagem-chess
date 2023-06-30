const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const storage = new Multer.memoryStorage();
const userRoutes = require("./Routes/userRoutes");

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}!`);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", userRoutes);

cloudinary.config({
  cloud_name: "dhxeo4rvc",
  api_key: "893466947189135",
  api_secret: "d4PxfO7xK_WdQ1gqELCJ2JJB87E",
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  });
  return res;
}

const upload = Multer({
  storage,
});

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json({
      public_id: cldRes.public_id,
      ...cldRes,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});
