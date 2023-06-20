import 'dotenv/config'

export const db_name = process.env.DB_NAME;
export const db_user = process.env.DB_USER;
export const db_password = process.env.DB_PASSWORD ;
export const db_host = process.env.DB_HOST;
export const db_url = process.env.DB_URL;
export const db_environment = process.env.NODE_DEV;

export const cloudinary_name = process.env.CLOUDINARY_NAME
export const cloudinary_key = process.env.CLOUDINARY_KEY
export const cloudinary_secret = process.env.CLOUDINARY_SECRET