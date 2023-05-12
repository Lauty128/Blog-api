//------------------------ Dependencies
import { Router } from "express";

//------------------------ Controllers

//------------------------ Config
const router = Router()

//------------------------ Routes

router.get('/', (req,res)=>{
    res.send('Pagina principal')
})

export { router as pages_router }
