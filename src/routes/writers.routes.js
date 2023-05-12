//------------------------ Dependencies
    import { Router } from "express";
    import upload from '../config/multer.js';

//------------------------ Controllers
    import Controller from '../controllers/writers.controllers.js';

//------------------------ Config
    const router = Router()

//------------------------ Middlewares

    // create authentication middleware for PUT, DELETE and POST requests

//------------------------ Routes
    //---- GET
        router.get("/", Controller.allData )
        router.get("/:id", Controller.oneData )

    //---- DELETE
        router.delete("/:id", Controller.removeData )
        
    //---- POST
        router.post("/", upload.single('image') , Controller.submitData )


//------------------------ Export
    export default router