import multer from "multer";

const upload = multer( {
    storage: multer.diskStorage({}),
    limits: { fileSize: 3000000 }
  } )

export default upload
