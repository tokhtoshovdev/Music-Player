let currentMusic = 0;

const music = document.querySelector("#audio");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play_btn");
const backwardBtn = document.querySelector(".backward-btn");
const forwardBtn = document.querySelector(".forwrard-btn");
const bars = document.querySelectorAll(".bar");

const audioList = document.querySelector(".audio_list");

function createAudioList() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.classList.add("song_item");
    li.innerHTML = `
    <h4>${song.id}</h4>
    <div class="img">
    <img class="song_img" src="${song.cover}" alt="" />
    </div>
    <div class="song_info">
    <h4>${song.name}</h4>
    <h4>${song.artist}</h4>
    </div>
    `;
    audioList.appendChild(li);
    li.addEventListener("click", () => {
      setMusic(index);
      playMusic();
    });
  });
}

const toggleMusic = () => {
  createAudioList();
  audioList.classList.toggle("hidden");
};

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
    bars.forEach((bar) => bar.classList.add("bar-item"));
  } else {
    music.pause();
    bars.forEach((bar) => bar.classList.remove("bar-item"));
  }

  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url("${song.cover}")`;
  currentTime.innerHTML = "00:00";

  music.onloadedmetadata = () => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  };
};

setMusic(currentMusic);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (min < 10) min = `0${min}`;
  if (sec < 10) sec = `0${sec}`;
  return `${min}:${sec}`;
};

setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);

  if (Math.floor(music.currentTime) === Math.floor(music.duration)) {
    playNext();
  }
}, 500);

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
    playBtn.classList.remove("pause");
    disk.classList.add("play");
  } else {
    music.pause();
    playBtn.classList.add("pause");
    disk.classList.remove("play");
  }
});

const playMusic = () => {
  music.play();
  playBtn.classList.remove("pause");
  disk.classList.add("play");
};

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

const playNext = () => {
  currentMusic = (currentMusic + 1) % songs.length;
  setMusic(currentMusic);
  playMusic();
};

const playPrevious = () => {
  currentMusic = (currentMusic - 1 + songs.length) % songs.length;
  setMusic(currentMusic);
  playMusic();
};

forwardBtn.addEventListener("click", playNext);
backwardBtn.addEventListener("click", playPrevious);
