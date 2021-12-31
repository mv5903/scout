var cards = [
    {
        top: 2,
        bottom: 1,
        isTopSide: false
    }, 
    {
        top: 3,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 3,
        bottom: 1,
        isTopSide: false
    }, 
    {
        top: 4,
        bottom: 3,
        isTopSide: false
    },
    {
        top: 4,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 4,
        bottom: 1,
        isTopSide: false
    },
    {
        top: 5,
        bottom: 4,
        isTopSide: false
    },
    {
        top: 5,
        bottom: 3,
        isTopSide: false
    },
    {
        top: 5,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 5,
        bottom: 1,
        isTopSide: false
    },
    {
        top: 6,
        bottom: 5,
        isTopSide: false
    },
    {
        top: 6,
        bottom: 4,
        isTopSide: false
    },
    {
        top: 6,
        bottom: 3,
        isTopSide: false
    },
    {
        top: 6,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 6,
        bottom: 1,
        isTopSide: false
    },
    {
        top: 7,
        bottom: 6,
        isTopSide: false
    },
    {
        top: 7,
        bottom: 5,
        isTopSide: false
    },
    {
        top: 7,
        bottom: 4,
        isTopSide: false
    },
    {
        top: 7,
        bottom: 3,
        isTopSide: false
    },
    {
        top: 7,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 7,
        bottom: 1,
        isTopSide: false
    },
    {
        top: 8,
        bottom: 7,
        isTopSide: false
    },
    {
        top: 8,
        bottom: 6,
        isTopSide: false
    },
    {
        top: 8,
        bottom: 5,
        isTopSide: false
    },
    {
        top: 8,
        bottom: 4,
        isTopSide: false
    },
    {
        top: 8,
        bottom: 3,
        isTopSide: false
    },
    {
        top: 8,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 8,
        bottom: 1,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 8,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 7,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 6,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 5,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 4,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 3,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 9,
        bottom: 1,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 9,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 8,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 7,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 6,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 5,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 4,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 3,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 2,
        isTopSide: false
    },
    {
        top: 10,
        bottom: 1,
        isTopSide: false
    },
]

function shuffle(cards) {
    var j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
        cards[j].isTopSide = Math.random() < .5
    }
    return cards;
}

module.exports = { cards, shuffle }