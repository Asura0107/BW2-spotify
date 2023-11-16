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
  const id = thisone.get("song");
  console.log(id);
  fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + id, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((playlist) => {
      console.log(playlist);
      const img = document.querySelector(".coverimg");
      img.src = playlist.cover_medium;

      const title = document.querySelector(".covertitle");
      title.innerText = playlist.title;
      const start = playlist.tracks.data;

      const link = document.createElement("a");
      link.href = `./artist.html?singer=${playlist.artist.id}.`;
      link.innerText = playlist.artist.name;
      link.className = "text-decoration-none text-white me-1";

      const date = document.createElement("p");
      date.innerText = playlist.release_date;
      date.className = "me-1";

      const length = document.createElement("p");
      length.innerText = start.length + " brani";
      length.className = "me-1";

      const dot = document.createElement("p");
      dot.innerText = "·";
      dot.className = "me-1 d-none d-lg-flex";

      const seconddot = document.createElement("p");
      seconddot.innerText = "·";
      seconddot.className = "me-1 d-none d-lg-flex";

      const divband = document.querySelector(".coverband");
      divband.appendChild(link);
      divband.appendChild(seconddot);
      divband.appendChild(date);
      divband.appendChild(dot);
      divband.appendChild(length);

      console.log(start);

      const container = document.querySelector(".row-container");
      for (let i = 0; i < start.length; i++) {
        const div = document.createElement("div");
        div.classList.add("row", "align-items-center", "track-div");

        const count = document.createElement("div");
        count.classList.add("col-auto", "count", "d-none", "d-lg-flex");
        count.innerText = i + 1;
        const single = start[i];
        const title = document.createElement("div");
        title.classList.add("col-7", "title", "mb-3", "ms-3");
        title.innerHTML = `
          <div class="d-flex">
            <div class="d-flex flex-column track-txt">
            <h6 id="${single.title_short}">${single.title_short}</h6> 
              <p>${single.artist.name}</p>
            </div>
          </div>`;

        const rank = document.createElement("div");
        rank.classList.add("col-3", "rank", "d-none", "d-lg-flex");
        rank.innerText = single.rank;

        const time = document.createElement("div");
        time.classList.add("col-auto", "time", "d-none", "d-lg-flex");
        const minutes = Math.floor(single.duration / 60);
        const seconds = single.duration % 60;
        if (seconds < 9) {
          time.innerHTML = `${minutes}:0${seconds}`;
        } else {
          time.innerHTML = `${minutes}:${seconds}`;
        }
        div.appendChild(count);
        div.appendChild(title);
        div.appendChild(rank);
        div.appendChild(time);

        container.appendChild(div);

        //player
        const playPauseBtn = document.getElementById("playPauseBtn");
        const icon = document.getElementById("iconPlay");
        const playerText = document.getElementById("playerText");
        const playerTitle = document.createElement("h6");
        const playerArtist = document.createElement("p");
        const trackTime = document.getElementById("trackTime");

        title.addEventListener("click", function () {
          playerText.innerHTML = "";
          const img = document.querySelector(".player-img");
          img.src = single.album.cover_medium;

          playerArtist.innerText = single.artist.name;
          playerArtist.className = "text-white player-text";
          playerTitle.innerText = single.title;
          playerTitle.className = "text-white pt-2 track-txt";
          playerText.appendChild(playerTitle);
          playerText.appendChild(playerArtist);
          trackTime.innerText = `${minutes}:${seconds}`;
          fetch("https://deezerdevs-deezer.p.rapidapi.com/track/" + single.id, {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
              "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            },
          })
            .then((response) => response.json())
            .then((song) => {
              console.log(song);
              const music = new Audio(single.preview);
              // let titleh6 = document.getElementById(`${single.title_short}`);
              playPauseBtn.addEventListener("click", function () {
                if (icon.className === "bi-play-circle-fill text-white fs-3") {
                  icon.className = "bi-pause-circle-fill text-white fs-3";
                  music.play();
                  // titleh6.classList.add("selected");
                } else {
                  icon.className = "bi-play-circle-fill text-white fs-3";
                  music.pause();
                  // titleh6.classList.remove("selected");
                }
              });
            });
        });
      }
    });
  //PLAY RANDOM SONG - VERDE
  fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + id, {
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
      const tracks = playlist.tracks.data;
      const randomIndex = Math.floor(Math.random() * tracks.length);
      const music = new Audio(tracks[randomIndex].preview);
      const playPauseBtn = document.getElementById("playPauseBtn");
      const icon = document.getElementById("iconPlay");
      const playPauseGreen = document.getElementById("playPauseGreen");

      const img = document.querySelector(".player-img");
      const playerTitle = document.createElement("h6");
      const playerArtist = document.createElement("p");

      randomPlay.addEventListener("click", function () {
        if (!isPlaying) {
          playerText.innerHTML = "";
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
};
