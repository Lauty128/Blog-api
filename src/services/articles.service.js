//---- Models
import { Article } from '../models/article.model.js';

// creates the Model
class ArticleClass {
    constructor(){
        this.articles = Article
    }

    getAllData = async( filters={} )=>{
        try{
            const { count, rows } = await this.articles.findAndCountAll({...filters, order:[["createdAt", "DESC"]]}) 
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
                message:"Ocurrio un error mientras se solicitaban los datos", 
                error
            }
        }
        // obtains all the articles and returns them  
    }

    getOneData = async (where, filters={}) =>{
        try{
            const data = await this.articles.findOne({
                where,
                ...filters
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
    
    addData = async (body, image)=>{   // the image is separated because it is not in req.body
        try{
            await this.articles.sync()
            const data = await this.articles.create({
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

    modifyData = async (id, body) => {
        try{
            const data = await this.articles.update(body,{ 
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

    removeData = async(id)=>{
        try{
            const articles = await this.articles.destroy({
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
}

const Article_class = new ArticleClass()

export default Article_class
// exports the Model