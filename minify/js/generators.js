import { getArticles, getBooks } from './request.js'
import { parseTitle } from './utils.js'

//-------------------------- CARDS
function articleCard(article){
    //---- Variables
    const url = parseTitle(article.title)

    //---- Elements
    const container = document.createElement('div')
    const imageContainer = document.createElement('div')
    const imageContainerA = document.createElement('a')
    const image = document.createElement('img')
    const textContainer = document.createElement('div')
    const infoContainer = document.createElement('div')
    const date = document.createElement('span')
    const category = document.createElement('span')
    const writer = document.createElement('span')
    const title = document.createElement('h2')
    const titleA = document.createElement('a')

    //---- Classes
    container.classList.add("Article")
    imageContainer.classList.add('Article__imageContainer')
    textContainer.classList.add("Article__text")
    infoContainer.classList.add("Article__info")
    date.classList.add("Article__date")
    category.classList.add("Article__category")
    writer.classList.add("Article__createdBy")
    title.classList.add("Article__title")
    
    //---- Attributes
    container.setAttribute('data-aos-duration', '1000')
    container.setAttribute('data-aos-duration', 'zoom')
    container.setAttribute('data-aos-once', 'true')
    imageContainerA.setAttribute('href', `/articles/${url}`)
    titleA.setAttribute('href', `/articles/${url}`)
    image.setAttribute('title', article.title)
    title.setAttribute('title', article.title)
    
    //---- Content
    image.src = article.image
    date.textContent = new Date(article.createdAt).toLocaleDateString('es-es', { year: 'numeric', month: 'short', day: 'numeric' })
    category.textContent = article.category
    writer.textContent = article.writer.name
    titleA.textContent = article.title

    //---- Append
    imageContainerA.appendChild(image)
    imageContainer.appendChild(imageContainerA)
    infoContainer.appendChild(date)
    infoContainer.appendChild(category)
    title.appendChild(titleA)
    textContainer.appendChild(infoContainer)
    textContainer.appendChild(title)
    textContainer.appendChild(writer)
    container.appendChild(imageContainer)
    container.appendChild(textContainer)

    return container
}

function bookCard(book){
    //---- Elements
    const iframe = document.createElement('iframe')

    //---- Attributes
    iframe.setAttribute('sandbox', 'allow-popups allow-scripts allow-modals allow-forms allow-same-origin')
    iframe.setAttribute('scrolling','no')
    iframe.setAttribute('frameborder','0')
    iframe.setAttribute('src', book.src)

    return iframe
}


//---------------------------- CONTAINERS/LISTS
function booksList(books){
    //---- Elements
    const fragment = document.createDocumentFragment()
    const h2 = document.createElement('h2')
    const container = document.createElement('div')

    //---- Config
    container.classList.add('LastBooks')
    h2.classList.add('MainSection__h2')
    h2.classList.add('LastBooks__h2')

    //---- Content
    h2.textContent = 'ULTIMOS LIBROS LEIDOS'

    //---- Create Cards
    books.forEach(book=>{
        fragment.appendChild(bookCard(book))
    })
    
    //---- Append
    container.appendChild(h2)
    container.appendChild(fragment)

    return container
}

export function articlesList(articles){
    //---- Elements
    const fragment = document.createDocumentFragment()
    const container = document.createElement('div')

    //---- Config
    container.classList.add('ArticlesPage__articlesContainer')

    //---- Create Cards
    articles.forEach(article=>{
        fragment.appendChild(articleCard(article))
    })

    //---- Append
    container.appendChild(fragment)

    return container
}

export async function loadBooks(container){
    const books = (localStorage.getItem('books_data'))
        ? JSON.parse(localStorage.getItem('books_data'))
        : await getBooks()

    if(books.status == 200){
        document.querySelector(".LastBooks").remove()
        document.querySelector(container)
            .insertAdjacentElement('beforeend', booksList(books.data))
    }
}

//------------------------------- HANDLER ARTICLES PAGINATION

export class ArticlesHandler{
    constructor({page=0, size=4}){
        this.page = page
        this.total; //= total
        this.size = size
        this.isPrevPage; //= (page > 1)
        this.isNextPage; //= (page * size) < total
        this.articles; //= articles 
    }

    async create(){
        const data = await getArticles(this.page, this.size)
        if(data.status == 200){
            this.total = data.total
            this.articles = data.data
            this.calculatePaginationButtons()
            this.printData()
        }
    }

    calculatePaginationButtons(){
        this.isPrevPage = (this.page >= 1)
        this.isNextPage = ((this.page + 1) * this.size) < this.total
        console.log((this.page + 1) * this.size);
    }

    nextPage(){
        this.page++
        history.pushState({ page: this.page + 1}, "", `?page=${this.page + 1}`)
        this.create()
    }

    prevPage(){
        this.page--
        history.pushState({ page: this.page + 1 }, "", `?page=${this.page + 1}`)
        this.create()
    }

    printData(){
        if(this.articles.length > 0){
            //------ Create Title
            const h2 = document.createElement('h2')
            h2.classList.add('ArticlesPage__h2')
            h2.textContent = 'ARTICULOS'

            //------ Work in DOM
            document.querySelector(".ArticlesPage__articlesContainer").remove()
            const articlesContainer = document.querySelector(".ArticlesPage__main")
            articlesContainer.insertAdjacentElement('afterbegin', articlesList(this.articles))

            // Insert pagination buttons
            document.querySelector(".ArticlesPage__articlesContainer")
                .insertAdjacentElement('beforeend', this.printPagination())
        }
    }

    printPagination(){
        if(document.querySelector('.ArticlesPage__paginaion')) document.querySelector('.ArticlesPage__paginaion').remove()
        //---- Elements
        const container = document.createElement('div')
        const number = document.createElement('span')
        const arrowLeft = document.createElement('span')
        const arrowRight = document.createElement('span')

        //---- Classes&Attributes
        container.classList.add('ArticlesPage__pagination')
        arrowLeft.setAttribute('id', 'prevPageButton')
        arrowRight.setAttribute('id', 'nextPageButton')

        //---- Content
        number.textContent = this.page + 1
        arrowLeft.innerHTML = '<svg width="30px" height="30px" stroke-width="1.7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M15 6l-6 6 6 6" stroke="#000000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        arrowRight.innerHTML = '<svg width="30px" height="30px" stroke-width="1.7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9 6l6 6-6 6" stroke="#000000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>'

        //---- Append
        if(this.isPrevPage) container.appendChild(arrowLeft)
        container.appendChild(number)
        if(this.isNextPage) container.appendChild(arrowRight)

        return container
    }

    printError(){

    }

}