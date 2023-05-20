//------------------------ Services
import Article_class from "../services/articles.service.js";

//------------------------ Models
import { Writer } from "../models/writer.model.js";

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
    const where = {title:req.params.title.replace(/-/g, ' ')} 
    const filters = {include:{ model:Writer, attributes:['name','image'] }}

    const data = await Article_class.getOneData(where, filters)
    console.log(data);
    //res.render('pages/article', { title_head: data.title })
    res.send('hola')
}

export default {
    homePage,
    aboutMePage,
    contactPage,
    articlesPage,
    articlePage
}