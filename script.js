const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

/* Song Title Array */
const songs = [
    'Ve Kamleya -Arijit Singh and Shreya Ghosal',
    'Mayi teri chunariya lehray -Arijit singh', 
    'Naina -Arijit Singh', 
    'Abhi mujh mein kahin -Sonu Nigam',
    'Bajlo chutir ghonta -Shilajit Majumdar',
    'Holud pakhi -Cactus',
    'Jaane kaise -KK',
    'Sei tumi -Ayub Bachchu',
    '10 hits - B Praak',
    'Ek Bat Batao -B. Praak',
    'Meri Ma -Shankar Mahadevan',
    'Chunriya -Falguni Pathak',
    'Tera Chera -Adnan Sami',
    'Wada Raha - Arnab and Shreya Ghosal',
    'Mone pore ruby roy -Arijit Singh',
    'Ki Kore Bolbo Tomay - Arijit Singh and Palak',
    'Maine Dil Se Kaha -KK',
    'Sau Dard -Sonu Nigam',
    'Khusi ke Pal -Arijit Singh and Shirley Setia',
    'Golemale Golemale Pirit Koiro Na -Shreya Ghosal',
    'Shuno Na -Shan',
    'Pehla Nasha -Udit Narayan and Sadhna Sargam',
    'Papa Kehta Hain -Udit Narayan'
];

// Function to get song index from URL parameter
function getSongIndexFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('songIndex'), 10);
}

// Keep track of songs
let songIndex;

// Load a song into the player
function loadSong(song) {
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    //cover.src = `./images/${song}.jpg`;
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

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
    updateURL();
});

nextBtn.addEventListener('click', () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    updateURL();
});

audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener('ended', () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    updateURL();
});

// Function to update the URL with the current song index
function updateURL() {
    const url = new URL(window.location);
    url.searchParams.set('songIndex', songIndex);
    window.history.pushState({}, '', url);
}

// Initialize player with URL parameter or random song
const songIndexFromURL = getSongIndexFromURL();
if (!isNaN(songIndexFromURL) && songIndexFromURL >= 0 && songIndexFromURL < songs.length) {
    songIndex = songIndexFromURL;
} else {
    songIndex = getRandomInt(songs.length);
}
loadSong(songs[songIndex]);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
