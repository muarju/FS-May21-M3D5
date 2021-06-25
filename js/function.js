const songLength = duration =>{ 

    const secondsWithZero = (duration%60).toString().length < 2 ? "0" + (duration%60) : (duration%60)
    return `${Math.floor( duration/60)}:${ secondsWithZero }`
}
const filterData = ( data, dataList ) => dataList.filter( spotifyData => spotifyData.tag === data ) 

const displayCards = ( selector, spotifyData, card) => {

    const htmlEl = document.querySelector( selector )

    if(htmlEl) {
        htmlEl.innerHTML = ""
        
        spotifyData.forEach( spotify => htmlEl.innerHTML += card( spotify ))
    }
}

export { displayCards, filterData, songLength }
