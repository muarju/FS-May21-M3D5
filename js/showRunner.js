import { spotifyDataLarge } from './data/spotifyDataLarge.js'
import { displayCards, filterData,songLength } from './function.js';

//! ------------------------------------< Good Morning Section >-------------------------------------------
const cardGoodMorning = spotify => `<div class="col">
                                    <div class="card mb-3">
                                    <div class="row no-gutters">
                                        <div class="col-3">
                                        <img src=${ spotify.img } alt="..." style="width:100%; height:auto">
                                        </div>
                                        <div class="col-9">
                                        <div class="card-body" style="padding:5px">
                                            <h5 class="card-title text-truncate" style="font-size:15px">${ spotify.title }</h5>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                    `

//displayCards(".morning-cards", goodMorningData, cardGoodMorning )


displayCards(

    ".morning-cards"                        ,
    filterData( "goodMorning", spotifyDataLarge ),
    cardGoodMorning 
) 
//* END -- Good Morning Section
//! ------------------------------------< Card for the next sections >-------------------------------------
const card = spotify =>`

<div class="col">
    <div class="card mb-3">
    <img src=${ spotify.img } alt="...">
    <div class="card-body">
        <h5 class="card-title text-truncate">${ spotify.title } </h5>
        <p ><small>Last updated </small></p>
    </div>
    </div>
</div>
`

//! ------------------------------------< Recently played Section >----------------------------------------

displayCards(

    ".recently-played-cards"                        ,
    filterData( "recentlyPlayed", spotifyDataLarge ),
    card
)
//* END -- Recently played Section
//! ------------------------------------< Shows to try Section >-------------------------------------------
    
displayCards(

    ".show-to-try" ,
    filterData( "showToTry", spotifyDataLarge ),
    card
)
//* END -- Shows to try Section


/*Code for artist populer release cards */
displayCards(

    ".popular-releases" ,
    filterData( "showToTry", spotifyDataLarge ),
    card
)
//* END -- Shows to try Section


/*
add code for album page
*/

const albums = (albumList) => {

    const albumTable = document.querySelector("#album-table");
    albumList.forEach( (albumInfo, i) => {
        albumTable.innerHTML +=`
        <tr>
            <td>${ i+1 }</td>
            <td>
                <div class="song-title">${ albumInfo.title }</div>
                <div class="album-name">${ albumInfo.artist.name }</div>
            </td>
            <td>${ songLength( albumInfo.duration ) }</td>
        </tr>
        `
    });
  };

/* code for artist page */
const artistData = (albumList) => {

    const albumTable = document.querySelector("#artist-table");
    albumList.forEach( (albumInfo, i) => {
        albumTable.innerHTML +=`
        <tr>
            <td>${ i+1 }</td>
            <td>
                <img src="https://api.deezer.com/artist/412/image" style="height: 40px;float: left;padding-right: 10px;">
                <div class="song-title">${ albumInfo.title_short }</div>
            </td>
            <td>${albumInfo.rank }</td>
            <td>${ songLength( albumInfo.duration ) }</td>
        </tr>
        `
    });
  };

  window.onload = function () {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=Bohemian Rhapsody (The Original Soundtrack)")
      .then(response => response.json())
      .then((data) => data.data)
      .then(albums)
      .catch(console.log);


      fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50")
      .then(response => response.json())
      .then((data) => data.data)
      .then(artistData)
      .catch(console.log);
  };