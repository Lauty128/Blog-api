function optimizedUrl(url){
    let urlArray = url.split("/upload")
    // divides the url into two parts
    return urlArray[0] + "/upload/f_auto,q_auto" + urlArray[1]
    // returns the converted url. This url
}

export default{
    optimizedUrl
}