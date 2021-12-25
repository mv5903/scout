function photoToLink(card) {
    let cardNumbers = card.top + '' + card.bottom
    if (!testRange(cardNumbers)) {
        console.error("Incorrect Card Specified. Be sure the card is in the appropriate range!")
        return null
    }
    return 'https://www.mattvandenberg.com/images/scout/' + cardNumbers + '.PNG'
}

function testRange(card) {
    var isValidCard = false

    isValidCard = 
    (card == 21) ||
    (card >= 31 && card <= 32) ||
    (card >= 41 && card <= 43) ||
    (card >= 51 && card <= 54) ||
    (card >= 61 && card <= 65) ||
    (card >= 71 && card <= 76) ||
    (card >= 81 && card <= 87) || 
    (card >= 91 && card <= 98) ||
    (card >= 101 && card <= 109)

    return isValidCard || card == 'back'
}