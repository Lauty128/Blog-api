//------------------------ Dependencies
    import { Router } from "express";
    import upload from '../config/multer.js';

//------------------------ Controllers
    import Controller from '../controllers/articles.controllers.js';

//------------------------ Config
    const router = Router()

//------------------------ Middlewares
    router.use((req,res,next) => {
        if(req.headers.token !== process.env.TOKEN) return res.status(401).json({
            status:401,
            message:"No tienes los permisos necesarios"
        })

        next()
        // create authentication middleware for PUT, DELETE and POST requests
        // Use JWT for a secure authentication
    })

//------------------------ Routes
    //---- GET
        router.get("/", Controller.allData )
        router.get("/:id", Controller.oneData )
    
    //---- POST
        router.post("/", upload.single('image') , Controller.submitData )

    //---- DELETE
        router.delete("/:id", Controller.removeData )

    //---- PUT
        router.put("/:id", Controller.modifyData)


//------------------------ Export
export default router