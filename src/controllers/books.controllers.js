//---------- Services
import Book_class from "../services/books.service.js";


//--------- Controllers
const allData =async(req,res)=>{
    //---- Pagination
    const {
        page = 0,
        size = 4
    } = req.query
    const pagination = { 
        offset: +page * +size,
        limit: +size
    }

    const data = await Book_class.getAllData(pagination)
    res.json(data)
}

const oneData =async(req,res)=>{
    const { id } = req.params
    const book = await Book_class.getOneData(id)
        
    res.status(book.status).json(book)
}

const submitData = async(req,res)=>{
    const body = req.body
    const data = await Book_class.addData(body)

    res.status(data.status).json(data)
}

const modifyData = async (req,res)=>{
    const { id } = req.params
    const body = req.body

    const data = await Book_class.modifyData(id, body)
    res.status(data.status).json(data)
}

const removeData = async(req,res)=>{
    const data = await Book_class.removeData(req.params.id)
    res.status(data.status).json(data) 
}


export default { 
    allData,  
    oneData,
    submitData,
    modifyData,
    removeData
}