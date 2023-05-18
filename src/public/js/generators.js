import{getArticles as t}from"./request.js";import{parseTitle as e}from"./utils.js";function articleCard(t){let a=e(t.title),i=document.createElement("div"),s=document.createElement("div"),r=document.createElement("a"),n=document.createElement("img"),l=document.createElement("div"),o=document.createElement("div"),c=document.createElement("span"),d=document.createElement("span"),p=document.createElement("span"),h=document.createElement("h2"),g=document.createElement("a");return i.classList.add("Article"),s.classList.add("Article__imageContainer"),l.classList.add("Article__text"),o.classList.add("Article__info"),c.classList.add("Article__date"),d.classList.add("Article__category"),p.classList.add("Article__createdBy"),h.classList.add("Article__title"),i.setAttribute("data-aos-duration","1000"),i.setAttribute("data-aos-duration","zoom"),i.setAttribute("data-aos-once","true"),r.setAttribute("href",`/articles/${a}`),g.setAttribute("href",`/articles/${a}`),n.setAttribute("title",t.title),h.setAttribute("title",t.title),n.src=t.image,c.textContent=new Date(t.createdAt).toLocaleDateString("es-es",{year:"numeric",month:"short",day:"numeric"}),d.textContent=t.category,p.textContent=t.writer.name,g.textContent=t.title,r.appendChild(n),s.appendChild(r),o.appendChild(c),o.appendChild(d),h.appendChild(g),l.appendChild(o),l.appendChild(h),l.appendChild(p),i.appendChild(s),i.appendChild(l),i}function bookCard(t){let e=document.createElement("iframe");return e.setAttribute("sandbox","allow-popups allow-scripts allow-modals allow-forms allow-same-origin"),e.setAttribute("scrolling","no"),e.setAttribute("frameborder","0"),e.setAttribute("src",t.src),e}function booksList(t){let e=document.createDocumentFragment(),a=document.createElement("h2"),i=document.createElement("div");return i.classList.add("LastBooks"),a.classList.add("MainSection__h2"),a.classList.add("LastBooks__h2"),a.textContent="ULTIMOS LIBROS LEIDOS",t.forEach(t=>{e.appendChild(bookCard(t))}),i.appendChild(a),i.appendChild(e),i}export function articlesList(t){let e=document.createDocumentFragment(),a=document.createElement("div");return a.classList.add("ArticlesPage__articlesContainer"),t.forEach(t=>{e.appendChild(articleCard(t))}),a.appendChild(e),a}export async function loadBooks(t){let e=localStorage.getItem("books_data")?JSON.parse(localStorage.getItem("books_data")):await getBooks();200==e.status&&(document.querySelector(".LastBooks").remove(),document.querySelector(t).insertAdjacentElement("beforeend",booksList(e.data)))}export class ArticlesHandler{constructor({page:t=0,size:e=4}){this.page=t,this.total,this.size=e,this.isPrevPage,this.isNextPage,this.articles}async create(){let e=await t({page:this.page,size:this.size});200==e.status&&(this.total=e.total,this.articles=e.data,this.calculatePaginationButtons(),this.printData())}calculatePaginationButtons(){this.isPrevPage=this.page>=1,this.isNextPage=(this.page+1)*this.size<this.total,console.log((this.page+1)*this.size)}nextPage(){this.page++,history.pushState({page:this.page+1},"",`?page=${this.page+1}`),this.create()}prevPage(){this.page--,history.pushState({page:this.page+1},"",`?page=${this.page+1}`),this.create()}printData(){if(this.articles.length>0){let t=document.createElement("h2");t.classList.add("ArticlesPage__h2"),t.textContent="ARTICULOS",document.querySelector(".ArticlesPage__articlesContainer").remove();let e=document.querySelector(".ArticlesPage__main");e.insertAdjacentElement("afterbegin",articlesList(this.articles)),document.querySelector(".ArticlesPage__articlesContainer").insertAdjacentElement("beforeend",this.printPagination())}}printPagination(){document.querySelector(".ArticlesPage__paginaion")&&document.querySelector(".ArticlesPage__paginaion").remove();let t=document.createElement("div"),e=document.createElement("span"),a=document.createElement("span"),i=document.createElement("span");return t.classList.add("ArticlesPage__pagination"),a.setAttribute("id","prevPageButton"),i.setAttribute("id","nextPageButton"),e.textContent=this.page+1,a.innerHTML='<svg width="30px" height="30px" stroke-width="1.7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M15 6l-6 6 6 6" stroke="#000000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>',i.innerHTML='<svg width="30px" height="30px" stroke-width="1.7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9 6l6 6-6 6" stroke="#000000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>',this.isPrevPage&&t.appendChild(a),t.appendChild(e),this.isNextPage&&t.appendChild(i),t}printError(){}}