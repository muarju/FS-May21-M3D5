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
<a href="album.html?id=${ spotify.id }">
<div class="col">
    <div class="card mb-3">
    <img src=${ spotify.img } alt="...">
    <div class="card-body">
        <h5 class="card-title text-truncate">${ spotify.title } </h5>
        <p ><small>Last updated </small></p>
    </div>
    </div>
</div>
</a>
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
    const albumTablec=''
    const albumTable = document.querySelector("#artist-table");
    albumList.forEach( (albumInfo, i) => {
        albumTablec +=`
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
    albumTable.innerHTML=albumTablec
  };


  
function artistTable(mydata) {
    const artistpageTable = document.querySelector("#artist-table1")
    const  artistTopTracks  = mydata
    console.log(artistTopTracks)
    let tr = ""
    artistTopTracks.forEach((items,i) => {
        tr += `<tr>
                <td>${ i+1 }</td>
                    <td>
                        <img src="${ items.images[2].url }" style="height: 40px;float: left;padding-right: 10px;">
                        <div class="song-title">${ items.name }</div>
                    </td>
                    <td>${items.rank }</td>
                    <td>${ songLength( items.duration ) }</td>
                </tr>
            `
    })
    artistpageTable.innerHTML = tr
  }



  
function new_releases(mydata) {
    const new_releasesSection = document.querySelector(".new-releases-cards")
    const  spotify  = mydata
    const  spotifyitem  = spotify.albums.items
    let cards = ""
    spotifyitem.forEach((items) => {
        cards += `
            <div class="col">
            <a href="album.html?id=${ items.id }">
                <div class="card mb-3">
                <img src=${ items.images[0].url } alt="...">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${ items.name } </h5>
                    <p ><small>Last updated </small></p>
                </div>
                </div>
                </a>
            </div>
            `
    })
    new_releasesSection.innerHTML = cards
  }

  
  function albumdetails(mydata) {
    const album_name = document.querySelector("#album_name")
    const artistname = document.querySelector("#artistname")
    const albumimage = document.querySelector("#album-image")

    const  spotifyAlbumDetails  = mydata
    album_name.innerHTML=spotifyAlbumDetails.name
    artistname.innerHTML=spotifyAlbumDetails.artists[0].name
    artistname.href=`artist.html?artistid=${spotifyAlbumDetails.artists[0].id}`
    albumimage.innerHTML=
    `<img src="${spotifyAlbumDetails.images[0].url}" class="img-fluid">`

  }

  function artistdetails(mydata) {
    const artistName = document.querySelector("#artistName")
    const followers= document.querySelector(".followers")
    const maincontentartist = document.querySelector("#main-content-artist")
    const  artistDetails  = mydata
    artistName.innerHTML=artistDetails.name
    followers.innerHTML=artistDetails.followers.total
    maincontentartist.style=`background-image: url(${artistDetails.images[0].url})`


  }


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

        fetch("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
            Authorization: "Bearer BQCVvewcQ30esNYbURaGQIvfXGbAR84UV1KseA2BB1OMfYfWDmWXaaqRfFGoMvf3mUKMHXpyROm6nggBvhwyGuniDrx_4OwqO-MYaZCnBypL5wJDebDH_kpCNCyxYVULyObO9DooptZXe7hFIskXpnW8ztcpZuEDi0Y",
        },
        })
        .then((data) => data.json())
        .then((mydata) => new_releases(mydata))
        .catch((error) => console.error(error))

        //album page id
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const albumid = urlParams.get('id')
        const artistid = urlParams.get('artistid')

        fetch("https://api.spotify.com/v1/albums/" +albumid , {
        headers: {
            Authorization: "Bearer BQCVvewcQ30esNYbURaGQIvfXGbAR84UV1KseA2BB1OMfYfWDmWXaaqRfFGoMvf3mUKMHXpyROm6nggBvhwyGuniDrx_4OwqO-MYaZCnBypL5wJDebDH_kpCNCyxYVULyObO9DooptZXe7hFIskXpnW8ztcpZuEDi0Y",
        },
        })
        .then((data) => data.json())
        .then((mydata) => albumdetails(mydata))
        .catch((error) => console.error(error))

        fetch("https://api.spotify.com/v1/artists/" +artistid , {
        headers: {
            Authorization: "Bearer BQCVvewcQ30esNYbURaGQIvfXGbAR84UV1KseA2BB1OMfYfWDmWXaaqRfFGoMvf3mUKMHXpyROm6nggBvhwyGuniDrx_4OwqO-MYaZCnBypL5wJDebDH_kpCNCyxYVULyObO9DooptZXe7hFIskXpnW8ztcpZuEDi0Y",
        },
        })
        .then((data) => data.json())
        .then((mydata) => artistdetails(mydata))
        .catch((error) => console.error(error))
        fetch("https://api.spotify.com/v1/artists/"+artistid+"/top-tracks?market=ES"  , {
            headers: {
                Authorization: "Bearer BQCVvewcQ30esNYbURaGQIvfXGbAR84UV1KseA2BB1OMfYfWDmWXaaqRfFGoMvf3mUKMHXpyROm6nggBvhwyGuniDrx_4OwqO-MYaZCnBypL5wJDebDH_kpCNCyxYVULyObO9DooptZXe7hFIskXpnW8ztcpZuEDi0Y",
            },
            })
            .then((data) => data.json())
            .then((mydata) => artistTable(mydata))
            .catch((error) => console.error(error))


  };