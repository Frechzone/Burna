const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = [
  '01-I-Told-Them-ft-GZA',
  '02-Burna-Boy-Normal',
  '03-Burna-Boy-On-Form',
  '04-Burna-Boy-Sittin-On-Top-Of-The-World-REMIX-ft-21-Savage',
  '05-Burna-Boy-Tested-Approved-Trusted',
  '06-Burna-Boy-Cheat-On-Me-ft-Dave',
  '07-Burna-Boy-Virgil',
  '08-Burna-Boy-Big-7',
  '09-Burna-Boy-Dey-Play',
  '10-Burna-Boy-City-Boys',
  '11-Burna-Boy-Giza-ft-Seyi-Vibez',
  '12-Burna-Boy-12-Jewels-Ft-RZA',
  '13-Burna-Boy-If-I-m-Lying',
  '14-Burna-Boy-Thanks-Ft-J-Cole',
  '15-Burna-Boy-Talibans-II-ft-Byron-Messia-fixed-1',
];
let songIndex = 0;

if (localStorage.getItem('songIndex')) {
  songIndex = parseInt(localStorage.getItem('songIndex'));
}

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = 'images/burna.jpeg';
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

window.addEventListener('load', playSong);

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', () => {
  nextSong();
});

function saveSongIndex() {
  localStorage.setItem('songIndex', songIndex.toString());
}

window.addEventListener('beforeunload', saveSongIndex);
