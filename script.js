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
      img.src = thisone.album.cover_medium;

      const artistname = document.createElement("p");
      artistname.innerText = thisone.artist.name;

      const launchPhrase = document.createElement("p");
      launchPhrase.innerHTML = `Ascolta il nuovo singolo di ${thisone.artist.name}!`;
      const h6 = document.createElement("h6");
      h6.innerText = thisone.album.title;
      const h2 = document.createElement("h2");
      h2.innerText = thisone.title;

      const albumDetails = document.getElementById("albumDetails");

      albumDetails.appendChild(h6);
      albumDetails.appendChild(h2);
      albumDetails.appendChild(artistname);
      albumDetails.appendChild(launchPhrase);
    })
    .catch((error) => {
      console.log(error);
    });
};
