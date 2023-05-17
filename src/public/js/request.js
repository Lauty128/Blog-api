const domain_url = 'http://localhost:4000'

export async function getArticles(){
    try{
        const url = `${domain_url}/api/articles`
        const data = await fetch(url)
                        .then(res=> res.json()) 

        return data
    }
    catch(error){
        new Error("Ocurrio un error durante la operacion")
    }

}

export async function getBooks(){
    try{
        const url = `${domain_url}/api/books`
        const data = await fetch(url)
                        .then(res=> res.json()) 

        return data
    }
    catch(error){
        new Error("Ocurrio un error durante la operacion")
    }

}