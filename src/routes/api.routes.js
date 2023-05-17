//------------------------ Dependencies
    import { Router } from "express";
    import upload from '../config/multer.js';

//------------------------ Controllers
    import Articles_Controller from '../controllers/articles.controllers.js';
    import Writers_Controller from '../controllers/writers.controllers.js';
    import Books_Controller from '../controllers/books.controllers.js';

//------------------------ Config
    const router = Router()

//------------------------ Middlewares


//-----------------------------------------------
//------------------------ Routes ---------------
//-----------------------------------------------

//-------------------------- ARTICLES
    //---- GET
        router.get("/articles", Articles_Controller.allData )
        router.get("/articles/:id", Articles_Controller.oneData )
    
    //---- POST
        router.post("/articles", upload.single('image') , Articles_Controller.submitData )

    //---- DELETE
        router.delete("/articles/:id", Articles_Controller.removeData )

    //---- PUT
        router.put("/articles/:id", Articles_Controller.modifyData)

//-------------------------- BOOKS
    //---- GET
    router.get("/books", Books_Controller.allData )

    //---- POST
        router.post("/books", Books_Controller.submitData)

    //---- DELETE
        router.delete("/books/:id", Books_Controller.removeData )
    
    //---- PUT
        router.put("/books/:id", Books_Controller.modifyData )

//-------------------------- WRITERS
    //---- GET
        router.get("/writers", Writers_Controller.allData )
        router.get("/writers/:id", Writers_Controller.oneData )

    //---- DELETE
        router.delete("/writers/:id", Writers_Controller.removeData )
    
    //---- POST
        router.post("/writers", upload.single('image') , Writers_Controller.submitData )


//------------------------ Export
export { router as api_router }