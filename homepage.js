const music = new Audio();
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
      console.log(data);

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

  //ALBUM & PLAYER
  const arr = ["eminem", "acdc"];
  const randomQuery = arr[Math.floor(Math.random() * arr.length)];
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${randomQuery}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((album) => {
      const randomIndex = Math.floor(Math.random() * album.data.length);

      console.log(album.data[randomIndex]);
      const thisone = album.data[randomIndex];
      const img = document.querySelector(".album-img");
      const player = document.querySelector(".player-img");
      player.src = thisone.album.cover_small;
      img.src = thisone.album.cover_medium;

      const artistname = document.createElement("a");
      artistname.href = `./artist.html?singer=${thisone.artist.id}.`;
      artistname.innerText = thisone.artist.name;
      artistname.className = "text-decoration-none text-white";
      const playerText = document.getElementById("playerText");
      const playerTitle = document.createElement("h6");
      const playerArtist = document.createElement("p");
      playerArtist.innerText = thisone.artist.name;
      playerArtist.className = "text-white p-0 m-0 player-artist";
      playerTitle.innerText = thisone.title;
      playerTitle.className = "text-white p-0 m-0 player-title";

      const launchPhrase = document.createElement("p");
      launchPhrase.innerHTML = `Ascolta il nuovo singolo di ${thisone.artist.name}!`;
      const h6 = document.createElement("h6");
      h6.innerText = thisone.album.title;
      const h2 = document.createElement("h2");
      h2.innerText = thisone.title;

      const playBtn = document.createElement("button");
      playBtn.innerText = "Play";
      playBtn.className = "btn btn-success text-dark me-3 mb-3 rounded-5 play-album-btn fw-bold";
      playBtn.id = "playHeader";
      const saveBtn = document.createElement("button");
      saveBtn.innerText = "Salva";
      saveBtn.className = "btn btn-outline-light me-3 mb-3 rounded-5 save-album-btn fw-bold";
      const moreBtn = document.createElement("button");
      moreBtn.innerText = ". . .";
      moreBtn.className = "btn btn-secondary mb-3 rounded-5 more-album-btn fw-bold";

      const albumDetails = document.getElementById("albumDetails");
      const playerDiv = document.querySelector(".img-container");

      playerDiv.appendChild(player);
      playerText.appendChild(playerTitle);
      playerText.appendChild(playerArtist);

      albumDetails.appendChild(h6);
      albumDetails.appendChild(h2);
      albumDetails.appendChild(artistname);
      albumDetails.appendChild(launchPhrase);
      albumDetails.appendChild(playBtn);
      albumDetails.appendChild(saveBtn);
      albumDetails.appendChild(moreBtn);

      // PLAYER
      music.src = thisone.preview;

      //heart
      const heartBtn = document.getElementById("heartBtn");
      heartBtn.addEventListener("click", function () {
        if (heartBtn.className === "bi bi-heart") {
          heartBtn.className = "bi bi-heart-fill text-success";
        } else {
          heartBtn.className = "bi bi-heart";
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

      // play-pause
      const playPauseBtn = document.getElementById("playPauseBtn");
      const icon = document.getElementById("iconPlay");
      const playHeader = document.getElementById("playHeader");

      playPauseBtn.addEventListener("click", function () {
        if (icon.className === "bi-play-circle-fill text-white fs-3") {
          icon.className = "bi-pause-circle-fill text-white fs-3";
          music.play();
        } else {
          icon.className = "bi-play-circle-fill text-white fs-3";
          playHeader.innerText = "Play";
          music.pause();
        }
      });
      playHeader.addEventListener("click", function () {
        const icon = document.getElementById("iconPlay");
        if (icon.className === "bi-play-circle-fill text-white fs-3") {
          icon.className = "bi-pause-circle-fill text-white fs-3";
          playHeader.innerHTML = `<i class="bi bi-pause-fill"></i>`;
          music.play();
        } else {
          icon.className = "bi-play-circle-fill text-white fs-3";
          playHeader.innerText = "Play";
          music.pause();
        }
      });

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
    })
    .catch((error) => {
      console.log(error);
    });

  //GREETINGS
  function greetings() {
    let time = new Date().getHours();
    let text = "";
    if (time >= 0 && time < 12) {
      text = "Buongiorno";
    } else if (time >= 12 && time < 18) {
      text = "Buon pomeriggio";
    } else {
      text = "Buonasera";
    }
    document.getElementById("greetingTxt").innerHTML = text;
  }
  greetings();

  //HIDE-CONTENT
  const hideButton = document.getElementById("hideBtn");
  const content = document.getElementById("albumContainer");

  hideButton.addEventListener("click", function () {
    content.classList.add("d-lg-none");
  });

  //PLAYLIST
  const selectedplay = ["workout", "eminem", "pink", "happy", "sad", "chill"];

  const random = selectedplay[Math.floor(Math.random() * selectedplay.length)];
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + random, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((play) => {
      console.log(play);
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * play.data.length);
        console.log(play.data[randomIndex]);
        const song = play.data[randomIndex];
        const row = document.getElementById("cardContainer");

        const col = document.createElement("div");
        col.className = "col-lg-6 col-xl-3 p-0 m-1 playlist-container";
        row.appendChild(col);

        const divcard = document.createElement("div");
        divcard.className = "random-playlists d-flex align-items-center";
        col.appendChild(divcard);

        const divimg = document.createElement("div");
        divimg.className = "playlist-img";
        const img = document.createElement("img");
        img.src = song.album.cover_small;
        img.className = "card-img-left";
        divimg.appendChild(img);
        divcard.appendChild(divimg);

        const cardbody = document.createElement("div");
        cardbody.className = "playlist-txt ms-2";
        divcard.appendChild(cardbody);

        const title = document.createElement("a");
        title.innerText = song.album.title;
        title.href = `./album.html?song=${song.album.id}`;
        title.className = "text-decoration-none text-white";

        cardbody.appendChild(title);
      }
    });

  //CARD
  const selectedcard = ["jazz", "pop", "rock", "afro", "metal", "blues", "classic"];

  const randomcard = selectedcard[Math.floor(Math.random() * selectedcard.length)];
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + randomcard, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((play) => {
      console.log(play);
      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * play.data.length);
        console.log(play.data[randomIndex]);
        const song = play.data[randomIndex];
        const row = document.querySelector(".row-card");

        const col = document.createElement("div");
        col.className = "col-sm-12 col-md-12 col-lg-3 g-1 justify-content-center";
        row.appendChild(col);

        const divcard = document.createElement("div");
        divcard.className = "card";
        col.appendChild(divcard);

        const img = document.createElement("img");
        img.src = song.album.cover_medium;
        img.className = "card-img-top";
        divcard.appendChild(img);

        const cardbody = document.createElement("div");
        cardbody.className = "card-body text-white";
        divcard.appendChild(cardbody);

        const title = document.createElement("a");
        title.className = " card-title ";
        title.innerText = song.album.title;
        title.href = `./album.html?song=${song.album.id}`;

        cardbody.appendChild(title);

        // const text = document.createElement("p");
        // text.className = "card-text";
        // cardbody.appendChild(text);
      }
    });
};
//CERCA
const formdiv = document.querySelector(".formdiv");

const btnsearch = document.querySelector(".searchbtn");
const searchinput = document.querySelector(".searchinput");
const search = function () {
  const resultcard = document.querySelector(".resultcard");
  const pagefirst = document.querySelector(".pagefirst");
  if (formdiv.classList.contains("hide")) {
    formdiv.classList.remove("hide");

    pagefirst.classList.add("hide");
    resultcard.classList.remove("hide");
  } else {
    formdiv.classList.add("hide");

    pagefirst.classList.remove("hide");
    resultcard.classList.add("hide");
  }
};
const resultcard = document.querySelector(".resulcard");
// const reset = () => {
//   const btnreset = document.querySelector(".btnreset");
//   const row = document.querySelector(".rowcard");

//   btnreset.addEventListener("click", function () {
//     row.innerHTML = "";
//     searchinput.value = "";
//   });
// };
// reset();
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
      const row = document.querySelector(".rowcard");
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
            current.preview = "";
          });
        });
      }
    });
});
