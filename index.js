//------ Dependencies
    import express from 'express';
    import morgan from "morgan";
    import cors from 'cors'
    import expressEjsLayouts from 'express-ejs-layouts';
    import path from 'path';
    import * as url from 'url';
    
    //------ Config
    const app = express()
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const PORT = process.env.PORT || 4000

    //------ Template Engine
    app.set('view engine', 'ejs');
    app.set('views', './src/views')
    
    //------ Middlewares
    app.use(cors({ origin:['https://lautarosilverii.tech'] }))
    app.use(morgan('dev'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(expressEjsLayouts)  // Layouts for ejs
    app.use(express.static(path.join(__dirname, 'src/public'))) // Public folder config
    
    
//------ Routes
    import { api_router } from './src/routes/api.routes.js'
    import { pages_router } from './src/routes/pages.routes.js'
    
    app.use('/api', api_router)
    app.use('/', pages_router)

//------ Listen

app.listen(PORT, ()=>{
    console.log('Server on in port ' + PORT);
})
