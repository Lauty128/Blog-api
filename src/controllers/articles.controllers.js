//--------- Services
import Services from "../services/articles.service.js";

//--------- Utils
import cloudinary from "../config/cloudinary.js";
import { createPassword } from "../utils/password.js";


//--------- Controllers
const allData =async(req,res)=>{
    //---- Pagination
    const {
        category = null,
        page = 0,
        size = 4
    } = req.query
    const pagination = { 
        offset: (+page) * (+size),
        limit: +size
    }
    const where = (category !== null) ? { category_id:category } : { } 
    const data = await Services.getAllData({...pagination, where })
    res.json(data)
}

const oneData =async(req,res)=>{
    const regexId = /^[a-zA-Z0-9]{24}$/
    const regex_space = /-/g;

    const param = req.params.id
    const where = regexId.test(param) ? { id:param } : { title:param.replace(regex_space, ' ') }

    const data = await Services.getOneData(where)
    
    res.json(data)
}

const submitData = async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    try{
        const image = await cloudinary.upload(req.file.path,"Blog")

        const body = req.body
        const data = await Services.addData({ ...body, id:createPassword(24) }, image.secure_url)
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

    const data = await Services.modifyData(id, body)
    res.status(data.status).json(data)
}

const removeData = async(req,res)=>{
    const data = await Services.removeData(req.params.id)
    res.status(data.status).json(data) 
}


export default { 
    allData,  
    oneData,
    submitData,
    modifyData,
    removeData
}