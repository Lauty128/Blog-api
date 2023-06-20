//--------- Services
import Article_class from "../services/articles.service.js";

//----- Models
import { Writer } from "../models/writer.model.js";

//--------- Utils
import cloudinary from "../config/cloudinary.js";


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
    const writer = { include:{ model:Writer, attributes:['name','image'] } } 
    const data = await Article_class.getAllData({...writer, ...pagination, where })
    res.json(data)
}

const oneData =async(req,res)=>{
    const regexId = /^[a-zA-Z0-9]{24}$/
    const regex_space = /-/g;

    const param = req.params.id
    const where = regexId.test(param) ? { id:param } : { title:param.replace(regex_space, ' ') }

    const filters = {include:{ model:Writer, attributes:['name','image'] }}
    const data = await Article_class.getOneData(where, filters)
    
    res.json(data)
}

const submitData = async(req,res)=>{
    try{
        const image = await cloudinary.upload(req.file.path,"Blog")

        const body = req.body
        const data = await Article_class.addData(body, image.secure_url)
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

    const data = await Article_class.modifyData(id, body)
    res.status(data.status).json(data)
}

const removeData = async(req,res)=>{
    const data = await Article_class.removeData(req.params.id)
    res.status(data.status).json(data) 
}


export default { 
    allData,  
    oneData,
    submitData,
    modifyData,
    removeData
}