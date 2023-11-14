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

  //ALBUM
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

      const artistname = document.createElement("p");
      artistname.innerText = thisone.artist.name;
      const playerText = document.getElementById("playerText");
      const playerTitle = document.createElement("h6");
      const playerArtist = document.createElement("p");
      playerArtist.innerText = thisone.artist.name;
      playerArtist.className = "text-white player-text";
      playerTitle.innerText = thisone.title;
      playerTitle.className = "text-white pt-2";

      const launchPhrase = document.createElement("p");
      launchPhrase.innerHTML = `Ascolta il nuovo singolo di ${thisone.artist.name}!`;
      const h6 = document.createElement("h6");
      h6.innerText = thisone.album.title;
      const h2 = document.createElement("h2");
      h2.innerText = thisone.title;

      const albumDetails = document.getElementById("albumDetails");
      const playerDiv = document.querySelector(".img-container");

      playerDiv.appendChild(player);
      playerText.appendChild(playerTitle);
      playerText.appendChild(playerArtist);
      albumDetails.appendChild(h6);
      albumDetails.appendChild(h2);
      albumDetails.appendChild(artistname);
      albumDetails.appendChild(launchPhrase);
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
};
