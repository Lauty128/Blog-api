import { getArticles, getBooks } from "./request.js";
import { articlesList, loadBooks, ArticlesHandler } from "./generators.js";
import { newMessage } from "./utils.js";

//------------------ UPDATE PRIMARY DATA
async function handlerLastArticles(){
    if(localStorage.getItem('time') !== null){
        if((Math.round(new Date().getTime()/1000) - localStorage.getItem('time')) < (86400 * 3)){
            // one day is equivalent to 86.400 seconds, therefore the ecuation 86.400 * 3 is the same as 3 days
            // if 3 days have not passed, then the function ends
            return
        }
    }
    
    // if it doesn't exist or 3 days have passed, then the data 
    const articles = await getArticles()
    const books = await getBooks()
    localStorage.setItem('time', Math.round(new Date().getTime()/1000))
    localStorage.setItem('articles_data', JSON.stringify(articles))
    localStorage.setItem('books_data', JSON.stringify(books))
}

// The function is executed when the page is load
handlerLastArticles()

//-----------------------------------------------------------
//------------------------- HOME PAGE -----------------------
//-----------------------------------------------------------
if(location.pathname === '/'){
    //------- Articles Load
    const articles = (localStorage.getItem('articles_data'))
        ? JSON.parse(localStorage.getItem('articles_data'))
        : await getArticles()

    if(articles.status == 200){
        document.querySelector(".MainSection__articlesContainer").remove()
        const articlesContainer = document.querySelector(".MainSection__articles")
        articlesContainer.insertAdjacentElement('beforeend', articlesList(articles.data))
    }

    //------- Books Load
    loadBooks('.MainSection')
}

//---------------------------------------------------------------
//------------------------- ARTICLES PAGE -----------------------
//---------------------------------------------------------------
if(location.pathname === '/articulos'){
    //------- Books Load
    loadBooks('.ArticlesPage__main')
    // Search if there is a parameter in the url
    const pageParameter = new URLSearchParams(location.search).get('page')
    const page = (pageParameter && pageParameter >= 1)
                    ? pageParameter - 1
                    : 0

    // Create instance of the class and call to the function "create"
    const articlesHandler = new ArticlesHandler({page})
    articlesHandler.create()
    
    document.querySelector('.ArticlesPage__main').addEventListener('click', e=>{
        const { target } = e

        switch (target.getAttribute('id')) {
            case 'nextPageButton':
                articlesHandler.nextPage()
            break;
            case 'prevPageButton':
                articlesHandler.prevPage()
            break;
        }
    })
}

//----------------------------------------------------------------
//------------------------- CONTACTME PAGE -----------------------
//----------------------------------------------------------------
if(location.pathname === '/contacto'){
    // Regular expressions
    const expressions = {
        "name": /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{8,50}$/,
        "email": /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "linkedin": /^(https?:\/\/)?([a-z]+\.)?linkedin\.com\/in\/[a-z0-9_-]+\/?$/i,
        //"message": /^.[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-_,.\s\n]{50,}$/
        "message": /^.[\w.,-_()áéíóúÁÉÍÓÚüÜñÑ\s\n]{50,500}$/
    }

    //---- Functions
    const regularExpressionValidate = (value, exp) => exp.test(value)

    function validation_of_input(name, value){
        if((name === 'linkedin' && value.length > 0) || (name !== 'linkedin')) return regularExpressionValidate(value, expressions[name])
        return true
    }

    function validation_of_form(values){
        let inputs = ['name','email','linkedin','message'];
        let validates = [];
    
        inputs.forEach(name => validates.push(validation_of_input(name, values[name])) )
    
        return !validates.includes(false)
        // if this << inputs.includes(false) >> is true then the form is invalid 
        // Therefore the value is inverted
    }

    function inputHandler(target){
        const { name,value } = target

        if(!validation_of_input(name, value) && value.length > 0) target.classList.add('Form__input--error')
        else{ target.classList.remove('Form__input--error') }
    }

    //----------- Handler the inputs, when its value is changed
    document.querySelectorAll('.Form__input').forEach(input=>{
        input.addEventListener('keyup', e=> inputHandler(e.target))
    })

    //----------- Handler the submit form
    document.querySelector('.Form').addEventListener('submit', async e=>{
        e.preventDefault()
        const form = new FormData(e.target)
        const values = {
            name: form.get('name'),
            email: form.get('email'),
            linkedin: form.get('linkedin'),
            message: form.get('message')
        }

        if(validation_of_form(values)){
            //------ Style to simulate submit of the form
            document.querySelector(".Form__submit").classList.add("Form__submit--uploading")

            //------ Define values and send it
            const data = {
                service_id: 'service_9uivd2t',
                template_id: 'template_pedbl5e',
                user_id: '7W6DBOmDsZB4m10Pk',
                template_params: values
            };
            const submitData = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' }
            })

            //------- Load of message
            if(submitData.status == 200) newMessage({ message:"Mensaje enviado correctamente" })
            else newMessage({ type:false, message:"Ocurrio un error mientras se enviaban los datos" })

            document.querySelector(".Form__submit").classList.remove("Form__submit--uploading")
        }
    })
}