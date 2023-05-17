const specialCharacters = ['á','é','í','ó','ú',' ']
const replaceCharacters = {'á': "a",'é': "e",'í': "i",'ó': "o",'ú': "u",' ': "-" }

export function parseTitle(title){
    let newTitle = title
    specialCharacters.forEach(character=>{
        newTitle = newTitle.replaceAll(character, replaceCharacters[character])
    })
    return newTitle
}