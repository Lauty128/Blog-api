//------------------------ Dependencies
    import { Router } from "express";

//------------------------ Controllers
    import Controller from '../controllers/books.controllers.js';

//------------------------ Config
    const router = Router()

//------------------------ Middlewares

    // create authentication middleware for PUT, DELETE and POST requests

//------------------------ Routes
    //---- GET
        router.get("/", Controller.allData )

    //---- POST
        router.post("/", Controller.submitData)

    //---- DELETE
        router.delete("/:id", Controller.removeData )
    
    //---- PUT
        router.put("/:id", Controller.modifyData )



//------------------------ Export
    export default router