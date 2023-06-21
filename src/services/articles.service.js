//---- Models
import { Article, Category } from '../models/article.model.js';
import { Writer } from '../models/writer.model.js';


const getAllData = async( filters={} )=>{
    //------------ Include
    const include = [ { model:Writer, attributes:['name','image'] },
                    { model:Category, attributes:['id','name'] } ]
    
    //------------ Service
    try{
        const { count, rows } = await Article.findAndCountAll({
            ...filters, 
            attributes:['id','title','image','imageContribution','createdAt'],
            include ,
            order:[["createdAt", "DESC"]]
        }) 
        const status = (count > 0) ? 200 : 204
        return {
            total:count,
            status, 
            data:rows
        }
    }
    catch(error){
        console.log(error);
        return { 
            status:500, 
            message:"Ocurrio un error mientras se solicitaban los datos", 
            error
        }
    }
    // obtains all the articles and returns them  
}

const getOneData = async (where) =>{
    //------------ Include
    const include = [ { model:Writer, attributes:['name','image'] },
                    { model:Category, attributes:['id','name'] } ]

    //------------ Service
    try{
        const data = await Article.findOne({
            where,
            include
        })

        if(!data) return { status:204, data:null, message:'No existe el articulo solicitado' }
        return { status:200, data }
    }
    catch(error){
        return { status:500, 
            message:"Ocurrio un error al solicitar el articulo", 
            error }
    }
    // obtains the article with the id passed by parameter and returns it  
}

const addData = async (body, image)=>{   // the image is separated because it is not in req.body
    try{
        await Article.sync()
        const data = await Article.create({
            ...body, image
        })
        return { 
            data , 
            message:"Articulo creado correctamente",
            status:201 
        }
    }
    catch(error){
        return{
            error,
            status:500,
            message:"Ocurrio un error mientras se creaba el articulo"
        }
    } 
}

const modifyData = async (id, body) => {
    try{
        const data = await Article.update(body,{ 
            where:{ id } 
        })
        return { 
            status:200,
            message:"Articulo actualizado correctamente",
            data 
        }
    }
    catch(error){
        return {
            status:500,
            message: "Ocurrio un error mientras se actualizaba el articulo"
        }
    }
}

const removeData = async(id)=>{
    try{
        const articles = await Article.destroy({
            where:{ id }
        })
        return {
            data:articles,
            status:200,
            message:"El Articulo a sido eliminado Correctamente"
        }
    }
    catch(err){
        return {
            message: "Ocurrio un error al eliminar el articulo",
            status:500,
            err
        }
    }
}

export default {
    getAllData,
    getOneData,
    addData,
    removeData,
    modifyData
}
// exports the Model