//---------- Services
import Writer_class from "../services/writers.service.js";

//---------- Utils
import cloudinary from "../config/cloudinary.js";


//--------- Controllers
const allData =async(req,res)=>{
    //---- Pagination
    const {
        page = 0,
        size = 6
    } = req.query
    const pagination = { 
        offset: +page * +size,
        limit: +size
    }

    const data = await Writer_class.getAllData(pagination)
    res.json(data)
}

const oneData =async(req,res)=>{
    const { id } = req.params
    const data = await Writer_class.getOneData(id)
    
    res.status(data.status).json(data)
}

const submitData = async(req,res)=>{
    try{
        const image = await cloudinary.upload(req.files.image[0].path,"Blog")

        const body = req.body
        const data = await Writer_class.addData(body, image.secure_url)
        res.status(data.status).json(data)
    }
    catch(error){
        res.status(500).json({
            error,
            status:500,
            message:"Ocurrio un error al subir la imagen"
        })
    }
}

const modifyData = async (req,res)=>{
    const { id } = req.params
    const body = req.body

    const data = await Writer_class.modifyData(id, body)
    res.status(data.status).json(data)
}

const removeData = async(req,res)=>{
    const data = await Writer_class.removeData(req.params.id)
    res.status(data.status).json(data) 
}


export default { 
    allData,  
    oneData,
    submitData,
    modifyData,
    removeData
}