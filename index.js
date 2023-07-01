//------ Dependencies
    import express from 'express';
    import morgan from "morgan";
    import cors from 'cors'
    import compression from 'compression'
    import { db_environment } from './src/config/env.js';
    
//------ Config
    const app = express()
    const PORT = process.env.PORT || 4000
    
//------ Middlewares
    app.use(cors({ origin:['https://lautarosilverii.tech']}))
    app.use(compression())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    if(db_environment === 'dev') app.use(morgan('dev'));
    
//------ Routes
    import { api_router } from './src/routes/api.routes.js'
    
    app.use('/api', api_router)

//------ Listen

    app.listen(PORT, ()=>{
        console.log('Server on in port ' + PORT);
    })
