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

      const h6 = document.querySelector(".coverband");
      h6.innerHTML = `${playlist.artist.name} · ${playlist.release_date} · ${start.length}`;
      console.log(start);

      const container = document.querySelector(".myrow");
      for (let i = 0; i < start.length; i++) {
        const div = document.createElement("div");
        div.classList.add("row", "align-items-center", "mydiv");

        const count = document.createElement("div");
        count.classList.add("col-auto", "count");
        count.innerText = i + 1;
        const single = start[i];
        const title = document.createElement("div");
        title.classList.add("col-7", "title");
        title.innerHTML = `
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <h6>${single.title_short}</h6> 
                  <p>${single.artist.name}</p>
                </div>
              </div>`;

        const rank = document.createElement("div");
        rank.classList.add("col-3", "rank");
        rank.innerText = single.rank;

        const time = document.createElement("div");
        time.classList.add("col-auto", "time");
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
        count.addEventListener("click", function () {
          playerText.innerHTML = "";
          // clearPreviousTrackInfo();
          const img = document.querySelector(".player-img");
          img.src = single.album.cover_medium;

          const playerTitle = document.createElement("h6");
          const playerArtist = document.createElement("p");
          playerArtist.innerText = single.artist.name;
          playerArtist.className = "text-white player-text";
          playerTitle.innerText = single.title;
          playerTitle.className = "text-white pt-2 myFontH6";
          playerText.appendChild(playerTitle);
          playerText.appendChild(playerArtist);
          fetch("https://deezerdevs-deezer.p.rapidapi.com/track/" + single.id, {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
              "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            },
          })
            .then((response) => response.json())
            .then((song) => {
              console.log(song);
              const music = new Audio(single.preview);
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
};
