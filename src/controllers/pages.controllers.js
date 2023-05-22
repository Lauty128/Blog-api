//------------------------ Services
import Showdown from "showdown";

//------------------------ Services
import Article_class from "../services/articles.service.js";

//------------------------ Models
import { Writer } from "../models/writer.model.js";

//------------------------ Utils
import Utils from '../utils/utils.js'


//------------------------ Controllers
const homePage = (req,res)=>{
    res.render('pages/home', { title_head: "Blog | Inicio" })
}

const aboutMePage = (req,res)=>{
    res.render('pages/aboutMe', { title_head: "Blog | Sobre mi" })
}

const contactPage = (req,res)=>{
    res.render('pages/contact', { title_head: "Blog | Contactame" })
}

const articlesPage = (req,res)=>{
    res.render('pages/articles', { title_head: "Blog | Articulos" })
}

const articlePage = async(req,res)=>{
    //-------------- Get article data
    const title = req.params.title.replace(/-/g, ' ')
    const where = {title} 
    const filters = {include:{ model:Writer, attributes:['name','image'] }}
    const data = await Article_class.getOneData(where, filters)

    //---------------
    if(data.status == 200){
        const converter = new Showdown.Converter({ tables:true })
        const content = converter.makeHtml(data.data.content)
        const date = new Date(data.data.createdAt).toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
        const imageContribution = data.data.imageContribution !== '' 
            ? {
                name: Utils.get_imageOwner(data.data.imageContribution),
                url: data.data.imageContribution
            }
            : ''

        const article = {
            ...data.data.dataValues,
            content,
            createdAt: date,
            imageContribution
        }
        console.log(article.id);
        return res.render('pages/article', { title_head: title, article })
    }
    
    res.status(404).render('pages/article', { title_head: title, article:null })
}

export default {
    homePage,
    aboutMePage,
    contactPage,
    articlesPage,
    articlePage
}