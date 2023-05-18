//------------------------ Dependencies
import { Router } from "express";

//------------------------ Controllers

//------------------------ Config
const router = Router()

//------------------------ Routes

router.get('/', (req,res)=>{
    res.render('pages/home', { title_head: "Blog | Inicio" })
})

router.get('/sobremi', (req,res)=>{
    res.render('pages/aboutMe', { title_head: "Blog | Sobre mi" })
})

router.get('/articulos', (req,res)=>{
    res.render('pages/articles', { title_head: "Blog | Articulos" })
})

router.get('/contacto', (req,res)=>{
    res.render('pages/contact', { title_head: "Blog | Contactame" })
})


export { router as pages_router }
