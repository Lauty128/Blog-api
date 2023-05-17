import { getArticles, getBooks } from "./request.js";
import { articlesList, loadBooks, ArticlesHandler } from "./generators.js";

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

//-----------------------------------------------------------
//------------------------- ARTICLES PAGE -----------------------
//-----------------------------------------------------------
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