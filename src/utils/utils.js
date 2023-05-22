function optimizedUrl(url){
    let urlArray = url.split("/upload")
    // divides the url into two parts
    return urlArray[0] + "/upload/f_auto,q_auto" + urlArray[1]
    // returns the converted url. This url
}

const get_imageOwner = (url)=>{
    if(url.includes("unsplash.com")){
      const newUrl = url.split("/@")
      return newUrl[1]
    }
    
    if(url.includes("pixabay.com")){
      const newUrl = url.split("/users/")
      return newUrl[1].split("-")[0]
    }

    if(url.includes("pexels.com")){
      const newUrl = url.split("/")
      return newUrl[1].slice(1, -1)
    }
}

export default{
    optimizedUrl,
    get_imageOwner
}