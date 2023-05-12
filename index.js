//------ Dependencies
    import express from 'express';
    import morgan from "morgan";
    import cors from 'cors'
    
    //------ Database
    import { sequelize } from './src/config/sequelize.js';
    
    //------ Config
    const app = express()
    const PORT = process.env.PORT || 4000
    
    //------ Middlewares
    app.use(cors({ origin:true }))
    app.use(morgan('dev'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    
    
//------ Routes
    import router_articles from './src/routes/articles.routes.js';
    import router_writers from './src/routes/writers.routes.js';
    import router_books from './src/routes/books.routes.js';
    
    app.use("/api/articles" , router_articles)
    app.use("/api/writers" , router_writers)
    app.use("/api/books" , router_books)

//------ Listen

app.listen(PORT, ()=>{
    console.log('Server on in port ' + PORT);
})
