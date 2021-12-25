window.onload = () => {
    let container = document.querySelector('.container')
    cards.forEach(newCard => {
        let theCard = document.createElement('img')
        let params = '' + newCard.top + newCard.bottom
        theCard.setAttribute('src', photoToLink(params))
        theCard.className = 'card'
        container.append(theCard)
    })
}