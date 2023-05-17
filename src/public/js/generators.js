import { parseTitle } from './utils.js'

//--------------- CARDS
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


//--------------- CONTAINERS/LISTS
export function booksList(books){
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