//------------------------ Dependencies
import { Router } from "express";

//------------------------ Controllers
import Controllers from "../controllers/pages.controllers.js";

//------------------------ Config
const router = Router()

//------------------------ Routes

router.get('/', Controllers.homePage)

router.get('/sobremi', Controllers.aboutMePage)

router.get('/contacto', Controllers.contactPage)

router.get('/articulos', Controllers.articlesPage)

router.get('/articulos/:title', Controllers.articlePage)



export { router as pages_router }
