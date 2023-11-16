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

      console.log(div);

      const h1 = document.querySelector(".covertitle");
      h1.innerText = playlist.name;
      h1.className = "ms-2";
      console.log(h1);

      const p = document.querySelector(".coverFan");
      p.innerText = "fan: " + playlist.nb_fan;
      p.className = "ms-2";
      console.log(p);

      // const title = document.querySelector(".covertitle");
      // title.innerText = playlist.title;
      // const start = playlist.id;

      fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/artist/${playlist.id}/top?limit=10`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "9f2e653d6emsh429ab7e0a4b2267p1e793fjsnef3468047633",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((playlist) => {
          console.log(playlist);
          const start = playlist.data;
          console.log(start);
          for (let i = 0; i < start.length; i++) {
            console.log(start);

            // row della sezione playlist
            const divRow = document.createElement("div");
            (divRow.className = "row"),
              "rowDiv",
              "d-flex",
              "align-items-center";

            // numerino della canzone
            const count = document.createElement("div");
            (count.className = "col-auto"), "colRow", "me-3";
            count.innerText = i + 1;

            //div immagine dell'album della canzone
            const divImgAlbum = document.createElement("div");
            (divImgAlbum.className = "col-auto"), "divSize";
            divImgAlbum.style.backgroundImage = `url("${start[i].album.cover_small}")`;
            console.log(divImgAlbum);

            // titolo della canzone
            const title = document.createElement("div");
            (title.className = "col-5"), "title";
            title.innerHTML = `
          <div class="d-flex">
            <div class="d-flex flex-column">
              <h6>${start[i].title_short}</h6>
            </div>
          </div>`;

            // rank
            const rank = document.createElement("div");
            rank.classList.add("col-auto", "rank");
            rank.innerText = start[i].rank;

            // durata canzone
            const time = document.createElement("div");
            time.classList.add("col-auto", "time");
            const minutes = Math.floor(start[i].duration / 60);
            const seconds = start[i].duration % 60;
            if (seconds < 9) {
              time.innerHTML = `${minutes}:0${seconds}`;
            } else {
              time.innerHTML = `${minutes}:${seconds}`;
            }

            const divF = document.querySelector(".divF");

            // Tutti gli append
            divRow.appendChild(count);
            divRow.appendChild(divImgAlbum);
            divRow.appendChild(title);
            divRow.appendChild(rank);
            divRow.appendChild(time);
            divF.appendChild(divRow);

            // div.appendChild(count);
            // div.appendChild(title);
            // div.appendChild(rank);
            // div.appendChild(time);

            // container.appendChild(div);

            //player

            const playPauseBtn = document.getElementById("playPauseBtn");
            const icon = document.getElementById("iconPlay");
            const playerText = document.getElementById("playerText");
            count.addEventListener("click", function () {
              playerText.innerHTML = "";
              // clearPreviousTrackInfo();
              const img = document.querySelector(".player-img");
              img.src = start[i].album.cover_medium;

              const divSinger = document.createElement("div");
              divSinger.className = "bdf";

              const playerTitle = document.createElement("h6");
              const playerArtist = document.createElement("p");
              playerArtist.innerText = start[i].artist.name;
              playerArtist.className = "text-white player-text";
              playerTitle.innerText = start[i].title;
              playerTitle.className = "text-white pt-2 myFontH6";
              playerText.appendChild(playerTitle);
              playerText.appendChild(playerArtist);
              fetch(
                "https://deezerdevs-deezer.p.rapidapi.com/track/" + start[i].id,
                {
                  method: "GET",
                  headers: {
                    "X-RapidAPI-Key":
                      "896303ca42msh72d44ba7c276bc9p18b3ebjsna034926b180e",
                    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
                  },
                }
              )
                .then((response) => response.json())
                .then((song) => {
                  console.log(song);
                  const music = new Audio(start[i].preview);
                  playPauseBtn.addEventListener("click", function () {
                    if (
                      icon.className === "bi-play-circle-fill text-white fs-3"
                    ) {
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
    });
};
