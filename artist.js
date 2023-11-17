const music = new Audio();
const unselectd = () => {
  const titleselected = document.querySelector(".selected"); // torna il NODO dell'elemento con la classe, oppure null se non ne trova

  if (titleselected) {
    titleselected.classList.remove("selected"); // rimuovo la classe all'elemento trovato
  }
};
window.onload = () => {
  //PLAYLIST-LIST
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=podcasts", {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("playlistList");
      for (let i = 0; i < data.data.length; i++) {
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const playlist = document.createElement("li");
        playlist.innerText = data.data[randomIndex].title;

        list.appendChild(playlist);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const thisone = new URLSearchParams(window.location.search);
  const id = thisone.get("singer");
  console.log(id);
  fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/" + id, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((playlist) => {
      console.log(playlist);
      const div = document.querySelector(".divImgArtist");
      div.style.backgroundImage = `url("${playlist.picture_xl}")`;

      const h1 = document.querySelector(".covertitle");
      h1.innerText = playlist.name;
      h1.className = "ms-3 font-h1 fw-bold";

      const p = document.querySelector(".coverFan");
      p.innerText = playlist.nb_fan + " ascoltatori";
      p.className = "ms-3";

      //  IMMAGININA ARTISTA E HAI MESSO MI PIACE
      const divImgLike = document.querySelector(".divImgLike");

      // immaginina tonda con cuore in basso a dx
      const divRoundImg = document.createElement("div");
      divRoundImg.classList.add("col-auto", "divSize", "position-div");

      const imgRound = document.createElement("img");
      imgRound.classList.add("rounded-circle", "me-3", "round-img-position");
      imgRound.src = playlist.picture_small;

      divRoundImg.appendChild(imgRound);

      // cuore in basso a dx di img tonda
      // const heartRound = document.createElement("span");
      // heartRound.classList.add("position-heartRound");
      // heartRound.innerHTML = `<i class="bi bi-chat-heart-fill"></i>`;
      // heartRound.classList.add(
      //   "text-success",
      //   "positionHeart",
      //   "heart-r-position"
      // ); //crea classi position
      // imgRound.appendChild(heartRound);

      // testo "hai messo mi piace a artista"
      const divTextArtist = document.createElement("div");
      divTextArtist.classList.add("col-auto");
      divTextArtist.innerHTML = `<div class="d-flex ">
      <div class="d-flex flex-column ">
      <a class="a-round">
      <h6 class="my-1 text-white class-roud">Brani a cui hai messo Mi piace</h6>
      <p class="text-grey">di ${playlist.name}</p></a>
      </div>`;

      divImgLike.appendChild(divRoundImg);
      divImgLike.appendChild(divTextArtist);

      // const title = document.querySelector(".covertitle");
      // title.innerText = playlist.title;
      // const start = playlist.id;

      fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${playlist.id}/top?limit=10`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "9f2e653d6emsh429ab7e0a4b2267p1e793fjsnef3468047633",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((playlist) => {
          console.log(playlist);
          const start = playlist.data;
          console.log(start);

          for (let i = 0; i < start.length; i++) {
            // LISTA DI CANZONI
            // row della sezione playlist
            const divRow = document.createElement("div");
            divRow.classList.add(
              "row",
              "rowDiv",
              "d-flex",
              "track-div",
              "py-3",
              "titlecardsearch",
              "align-items-center"
            );

            // numerino della canzone
            const count = document.createElement("div");
            count.classList.add("col-auto", "colRow", "me-3");
            count.innerText = i + 1;

            //div immagine dell'album della canzone

            const divImgAlbum = document.createElement("div");
            divImgAlbum.classList.add("col-auto", "divSize");

            const imgAlbum = document.createElement("img");
            imgAlbum.classList.add("me-3");
            imgAlbum.src = start[i].album.cover_small;

            divImgAlbum.appendChild(imgAlbum);

            // titolo della canzone
            const title = document.createElement("div");
            title.classList.add("col-5", "title");
            title.innerHTML = `
            <div class="d-flex">
            <div class="d-flex flex-column">
              <h6>${start[i].title_short}</h6>
            </div>
            </div>`;
            const songtitle = start[i].title_short;

            // rank
            const rank = document.createElement("div");
            rank.classList.add("col-auto", "rank");
            rank.innerText = start[i].rank;

            // durata canzone
            const time = document.createElement("div");
            time.classList.add("col-auto", "time", "d-none", "d-lg-flex");
            const minutes = Math.floor(start[i].duration / 60);
            const seconds = start[i].duration % 60;
            if (seconds < 9) {
              time.innerHTML = `${minutes}:0${seconds}`;
            } else {
              time.innerHTML = `${minutes}:${seconds}`;
            }

            const divF = document.querySelector(".divF");

            // Parte della img piccola
            // const divImgSmall = document.createElement("div");
            // divImgSmall.className = "div-img-small";
            // divImgSmall.style.backgroundImage = `url("${start[i].album.cover_small}")`;

            // Tutti gli append
            divRow.appendChild(count);
            divRow.appendChild(divImgAlbum);
            divRow.appendChild(title);
            divRow.appendChild(rank);
            divRow.appendChild(time);
            divF.appendChild(divRow);

            //PLAYER

            const playPauseBtn = document.getElementById("playPauseBtn");
            const icon = document.getElementById("iconPlay");
            const playerText = document.getElementById("playerText");
            const playerTitle = document.createElement("h6");
            const playerArtist = document.createElement("p");
            const trackTime = document.getElementById("trackTime");

            title.addEventListener("click", function () {
              playerText.innerHTML = "";
              const img = document.querySelector(".player-img");
              img.src = start[i].album.cover_medium;

              const divSinger = document.createElement("div");
              divSinger.className = "bdf";

              playerArtist.innerText = start[i].artist.name;
              playerArtist.className = "text-white player-text";
              playerTitle.innerText = start[i].title;
              playerTitle.className = "text-white pt-2 myFontH6";
              playerText.appendChild(playerTitle);
              playerText.appendChild(playerArtist);
              unselectd();

              if (playerTitle.innerText === songtitle) {
                title.classList.add("selected");
              }
              trackTime.innerText = `${minutes}:${seconds}`;

              fetch("https://deezerdevs-deezer.p.rapidapi.com/track/" + start[i].id, {
                method: "GET",
                headers: {
                  "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
                  "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
                },
              })
                .then((response) => response.json())
                .then((song) => {
                  console.log(song);
                  music.src = start[i].preview;
                  playPauseBtn.addEventListener("click", function () {
                    if (icon.className === "bi-play-circle-fill text-white fs-3") {
                      icon.className = "bi-pause-circle-fill text-white fs-3";
                      music.play();
                    } else {
                      icon.className = "bi-play-circle-fill text-white fs-3";
                      music.pause();
                    }
                  });
                });
            });
          }
        });

      //PLAY RANDOM SONG - VERDE
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${playlist.id}/top?limit=10`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((playlist) => {
          const randomPlay = document.getElementById("randomPlay");
          let isPlaying = false;
          const tracks = playlist.data;
          const randomIndex = Math.floor(Math.random() * tracks.length);
          music.src = tracks[randomIndex].preview;
          const playPauseBtn = document.getElementById("playPauseBtn");
          const icon = document.getElementById("iconPlay");
          const playPauseGreen = document.getElementById("playPauseGreen");

          const img = document.querySelector(".player-img");
          const playerTitle = document.createElement("h6");
          const playerArtist = document.createElement("p");

          randomPlay.addEventListener("click", function () {
            if (!isPlaying) {
              icon.className = "bi-pause-circle-fill text-white fs-3";
              playPauseGreen.className = "bi bi-pause-circle-fill fs-2 green-play";
              music.play();
              isPlaying = true;
              //Player
              img.src = tracks[randomIndex].album.cover_medium;
              img.alt = "cover album";
              playerArtist.innerText = tracks[randomIndex].artist.name;
              playerArtist.className = "text-white player-text";
              playerTitle.innerText = tracks[randomIndex].title;
              playerTitle.className = "text-white pt-2 track-txt";
              playerText.appendChild(playerTitle);
              playerText.appendChild(playerArtist);
            } else {
              icon.className = "bi-play-circle-fill text-white fs-3";
              playPauseGreen.className = "bi bi-play-circle-fill fs-2 green-play";
              music.pause();
              isPlaying = false;
            }
            playPauseBtn.addEventListener("click", function () {
              if (icon.className === "bi-play-circle-fill text-white fs-3") {
                icon.className = "bi-pause-circle-fill text-white fs-3";
                playPauseGreen.className = "bi bi-pause-circle-fill fs-2 green-play";
                music.play();
              } else {
                icon.className = "bi-play-circle-fill text-white fs-3";
                playPauseGreen.className = "bi bi-play-circle-fill fs-2 green-play";
                music.pause();
              }
            });
          });
        });
      //PLAYER
      //heart
      const heartBtn = document.getElementById("heartBtn");
      heartBtn.addEventListener("click", function () {
        if (heartBtn.className === "bi bi-heart") {
          heartBtn.className = "bi bi-heart-fill text-success";
        } else {
          heartBtn.className = "bi bi-heart";
        }
      });
      //heart header
      const heartHeader = document.getElementById("heartHeader");
      heartHeader.addEventListener("click", function () {
        if (heartHeader.className === "bi bi-heart") {
          heartHeader.className = "bi bi-heart-fill text-success";
        } else {
          heartHeader.className = "bi bi-heart";
        }
      });
      // shuffle
      const shuffleBtn = document.getElementById("shuffleBtn");
      shuffleBtn.addEventListener("click", function () {
        if (shuffleBtn.className === "bi bi-shuffle") {
          shuffleBtn.className = "bi bi-shuffle text-success";
        } else {
          shuffleBtn.className = "bi bi-shuffle";
        }
      });
      //back
      const backBtn = document.getElementById("backBtn");
      backBtn.addEventListener("click", function () {});
      //skip
      const skipBtn = document.getElementById("skipBtn");
      skipBtn.addEventListener("click", function () {});
      //repeat
      const repeatBtn = document.getElementById("repeatBtn");
      repeatBtn.addEventListener("click", function () {
        if (repeatBtn.className === "bi bi-repeat") {
          repeatBtn.className = "bi bi-repeat text-success";
          music.loop = true;
        } else {
          repeatBtn.className = "bi bi-repeat";
          music.loop = false;
        }
      });
    });
};
//CERCA
const formdiv = document.querySelector(".formdiv");

const btnsearch = document.querySelector(".searchbtn");
const searchinput = document.querySelector(".searchinput");
const search = function () {
  const searchResultCard = document.querySelector(".searchResultCard");
  const pagefirst = document.querySelector(".pagefirst");
  const hideuser = document.querySelector(".hideuser");
  const divImgArtist = document.querySelector(".divImgArtist");
  const divColorHide = document.querySelector(".divColorHide");
  if (formdiv.classList.contains("hide")) {
    formdiv.classList.remove("hide");
    divColorHide.classList.remove("hide");
    divImgArtist.classList.add("hide");
    pagefirst.classList.add("hide");
    hideuser.classList.add("hide");
    searchResultCard.classList.remove("hide");
  } else {
    formdiv.classList.add("hide");
    hideuser.classList.remove("hide");
    divImgArtist.classList.remove("hide");

    pagefirst.classList.remove("hide");
    searchResultCard.classList.add("hide");
    divColorHide.classList.add("hide");
  }
};
// const resultcard = document.querySelector(".resulcard");
// const row = document.querySelector(".rowcard");

const searchform = document.querySelector(".searchform");
searchform.addEventListener("submit", (event) => {
  event.preventDefault();
  const param = searchinput.value;
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + param, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((play) => {
      const row = document.querySelector(".RowsearchResultCard");
      row.innerHTML = "";
      searchinput.value = "";
      for (let i = 0; i < play.data.length; i++) {
        console.log(play.data[i]);

        const song = play.data[i];

        const col = document.createElement("div");
        col.className = "col-3 text-truncate gy-3";
        row.appendChild(col);

        const divcard = document.createElement("div");
        divcard.className = "card";
        divcard.classList.add("headerbrother");

        col.appendChild(divcard);

        const img = document.createElement("img");
        img.src = song.album.cover_medium;
        img.className = "card-img-top";
        divcard.appendChild(img);

        const cardbody = document.createElement("div");
        cardbody.className = "card-body text-white";
        divcard.appendChild(cardbody);

        const title = document.createElement("h5");
        title.className = "card-title titlecardsearch";
        title.innerText = song.title;
        cardbody.appendChild(title);

        const text = document.createElement("a");
        text.className = "card-text";
        text.innerText = song.album.title;
        text.href = `./album.html?song=${song.album.id}`;

        cardbody.appendChild(text);
        //player

        const playPauseBtn = document.getElementById("playPauseBtn");
        const icon = document.getElementById("iconPlay");
        const playerText = document.getElementById("playerText");
        const playerTitle = document.createElement("h6");
        const playerArtist = document.createElement("p");
        title.addEventListener("click", function () {
          playerText.innerHTML = "";
          music.src = song.preview;
          // const music2 = new Audio(song.preview);

          // clearPreviousTrackInfo();
          const img = document.querySelector(".player-img");
          img.src = song.album.cover_medium;

          playerArtist.innerText = song.artist.name;
          playerArtist.className = "text-white player-text";
          playerTitle.innerText = song.title;
          playerTitle.className = "text-white pt-2 track-txt";
          playerText.appendChild(playerTitle);
          playerText.appendChild(playerArtist);

          let isPlaying = false;
          playPauseBtn.addEventListener("click", function () {
            if (!isPlaying) {
              icon.className = "bi-pause-circle-fill text-white fs-3";
              music.play();
              isPlaying = true;
            } else {
              icon.className = "bi-play-circle-fill text-white fs-3";
              music.pause();
              isPlaying = false;
            }
          });
        });
      }
    });
});
