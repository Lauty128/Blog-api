import { getArticles, getBooks } from "./request.js";
import { articlesList, booksList } from "./generators.js";

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
    const books = (localStorage.getItem('books_data'))
        ? JSON.parse(localStorage.getItem('books_data'))
        : await getBooks()

    if(books.status == 200){
        document.querySelector(".LastBooks").remove()
        document.querySelector('.MainSection')
            .insertAdjacentElement('beforeend', booksList(books.data))
    }
}

//-----------------------------------------------------------
//------------------------- ARTICLES PAGE -----------------------
//-----------------------------------------------------------
if(location.pathname === '/articulos'){
    //------- Articles Load
    const articles = await getArticles()

    if(articles.status == 200){
        document.querySelector(".ArticlesPage__articlesContainer").remove()
        const mainContainer = document.querySelector(".ArticlesPage__main")
        mainContainer.insertAdjacentElement('afterbegin', articlesList(articles.data))
    }

    //------- Books Load
    const books = (localStorage.getItem('books_data'))
        ? JSON.parse(localStorage.getItem('books_data'))
        : await getBooks()

    if(books.status == 200){
        document.querySelector(".LastBooks").remove()
        document.querySelector('.ArticlesPage__main')
            .insertAdjacentElement('beforeend', booksList(books.data))
    }
}