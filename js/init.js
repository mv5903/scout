window.onload = () => {
    preloadImages()
    let container = document.querySelector('.container')
    cards.forEach(newCard => {
        let theCard = document.createElement('img')
        theCard.setAttribute('src', photoToLink(newCard))
        theCard.className = 'card'
        container.append(theCard)
    })
}

var progressBar = 0

let preloadImages = async () => {
    const preloadImage = src => 
    new Promise(r => {
        const image = new Image()
        image.onload = r
        image.onerror = r
        image.src = src
    })
    
    await Promise.all(cards.map(card => {
        let imageLink = photoToLink(card)
        preloadImage(imageLink).then(() => {
            progressBar++
            setProgressBar(progressBar)
            if (progressBar == 45) {
                document.querySelector('.loading-container').remove()
                document.querySelector('.container').style.visibility = 'visible'
            }
        })
    }))  
}

let setProgressBar = value => {
    let val = Math.floor(value / 45 * 100)
    label = document.querySelector('label').textContent = val + '% Complete'
    document.querySelector('#file').value = val
}