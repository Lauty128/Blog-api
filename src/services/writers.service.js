//---- Models
import { Writer } from "../models/writer.model.js"

// creates the Model
class WriterClass {
    constructor(){
        this.writers = Writer
    }

    getAllData = async( filters={} )=>{
        try{
            const { count, rows } = await this.writers.findAndCountAll(filters) 
            const status = (count > 0) ? 200 : 204
            return {
                total:count,
                status, 
                data:rows
            }
        }
        catch(error){
            return { 
                status:500, 
                message:"Ocurrio un error mientras se solicitaban los articulos", 
                error
            }
        }
        // obtains all the articles and returns them  
    }

    getOneData = async (id, filters={}) =>{
        try{
            const data = await this.writers.findOne({
                where:{ id },
                ...filters
            })

            if(!data) return { status:204, data:null, message:'No existe el articulo solicitado' }
            return { status:200, data }
        }
        catch(error){
            return { status:500, 
                message:"Ocurrio un error a la hora de solicitar el aticulo", 
                error }
        }
        // obtains the article with the id passed by parameter and returns it  
    }
    
    addData = async (body, image)=>{   // the image is separated because it is not in req.body
        try{
            const data = await this.articles.create({
                ...body, image
            })
            return { 
                data , 
                message:"Objeto creado correctamente",
                status:201 
            }
        }
        catch(error){
            return{
                error,
                status:500,
                message:"Ocurrio un error mientras se creaba el objeto"
            }
        } 
    }

    modifyData = async (id, body) => {
        try{
            const data = await this.writers.update(body,{ 
                where:{ id } 
            })
            return { status:200,data }
        }
        catch(error){
            return {
                status:500,
                message: "Ocurrio un error mientras se actualizaba el articulo"
            }
        }
    }

    removeData = async(id)=>{
        try{
            const articles = await this.writers.deleteOne({ _id:id })
            return {
                data:articles,
                message:"El Articulo a sido eliminado Correctamente"
            }
        }
        catch(err){
            return {
                message: "Ocurrio un error",
                err
            }
        }
    }
}

const Writer_class = new WriterClass()

export default Writer_class
// exports the Model