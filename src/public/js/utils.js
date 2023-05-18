const specialCharacters = ['á','é','í','ó','ú',' ']
const replaceCharacters = {'á': "a",'é': "e",'í': "i",'ó': "o",'ú': "u",' ': "-" }

export function parseTitle(title){
    let newTitle = title
    specialCharacters.forEach(character=>{
        newTitle = newTitle.replaceAll(character, replaceCharacters[character])
    })
    return newTitle
}

export function newMessage({ message, type=true }){
    const cardType = type ? 'MessageCard--ok' : 'MessageCard--error';

    document.querySelector(".MessageCard").classList.add(cardType)
    document.querySelector(".MessageCard").classList.add("MessageCard--active")
    document.querySelector(".MessageCard__message").textContent = message

    setTimeout(()=>{
        document.querySelector(".MessageCard").classList.remove("MessageCard--active")
    }, 2500)
    
    setTimeout(()=>{
        document.querySelector(".MessageCard").classList.remove("MessageCard--ok")
        document.querySelector(".MessageCard").classList.remove("MessageCard--error")
    }, 2900)
}