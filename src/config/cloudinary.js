//---- Dependencias
import cloudinary from "cloudinary";

import { cloudinary_key,cloudinary_name,cloudinary_secret } from './env.js';

cloudinary.config({ 
    cloud_name: cloudinary_name, 
    api_key: cloudinary_key, 
    api_secret: cloudinary_secret
});


//------ Functions
const upload = (file, folder="") => {
    return new Promise((resolve, reject) => {
        try{
            cloudinary.v2.uploader.upload(file, { folder })
                .then(response=> resolve(response) )
        }
        catch(err){ reject({
            err,
            msg:"Ocurrio un error durante la subida de una imagen"
        }) }
    }) 
}

export default {
    upload
}