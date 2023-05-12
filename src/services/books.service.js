//---- Models
import { Book } from '../models/book.model.js'

// creates the Model
class BookClass {
    constructor(){
        this.books = Book
    }

    getAllData = async( filters={} )=>{
        try{
            const { count, rows } = await this.books.findAndCountAll({
                order:[["createdAt", "DESC"]],
                ...filters,
            }) 
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
                message:"Ocurrio un error mientras se solicitaban los objetos", 
                error
            }
        }
        // obtains all the articles and returns them  
    }

    getOneData = async (id, filters={}) =>{
        try{
            const data = await this.books.findOne({
                where:{ id },
                ...filters
            })

            if(!data) return { status:204, data:null, message:'No existe el objeto solicitado' }
            return { status:200, data }
        }
        catch(error){
            return { status:500, 
                message:"Ocurrio un error a la hora de solicitar el objeto", 
                error }
        }
        // obtains the article with the id passed by parameter and returns it  
    }
    
    addData = async (body)=>{   // the image is separated because it is not in req.body
        try{
            const data = await this.books.create(body)
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
            const data = await this.books.update(body,{ 
                where:{ id } 
            })
            return { 
                data,
                message:"El objeto se actualizo correctamente", 
                status:200,
            }
        }
        catch(error){
            return {
                status:500,
                message: "Ocurrio un error mientras se actualizaba el objeto"
            }
        }
    }

    removeData = async(id)=>{
        try{
            const articles = await this.books.deleteOne({ _id:id })
            return {
                data:articles,
                message:"El libro se elimino correctamente"
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

const Book_class = new BookClass()

export default Book_class
// exports the Model