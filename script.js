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
const songs = ['01.Kahi Door Jab Din-Shaukat Khan', '02.Yeh Shaam Mastani-V.Balsara', '03.Mere Meheboob-Dilip Roy', '04.Kis Liye Maine Pyaar Kiaa-Gautam Choudhury', '05.Pukarta Chala Hun Main-Shaukat Khan', '06.Phoolon Ke Rang Se-V.Balsara', '07.Maine Tere Liye-Dilip Roy', '08.Tere Bina Zindagi se-Gautam Choudhury', '09.Jane Woh Kaise-V.Balsara', '10 hits - B Praak', '10.Ye Jeevan Hai-Shaukat Khan', '11.Yeh Sama-Dilip Roy', '12.Sili Hawaa Choo Gayi-Gautam Choudhury', '13.Bhanware Ki Gunjan-Dilip Roy', '14.Gaata Rahe Mera Dil-V.Balsara', '15.Zindagi Kaisi Hain-Shaukat Khan', '16.Phir Wohi Raat Hain-Dilip Roy', '17.Manjilen Apni-Shaukat Khan', '18.Yeh Raat Bhegi-V.Balsara', '19.Chura Liya Hai Tumne-Gautam Choudhury', '20.Haan Pehli Baar-Shaukat Khan', '21.Zindagi Ka Safar-V.Balsara', '22.O Mere Dil Ke Chain-Gautam Choudhury', '23.Baharon Phool Barshao-Dilip Roy', '24.Musafir Hun Yaaron-Gautam Choudhury', '25.Aaja Re Pardesi-V.Balsara', '26.Chaudhvin Ka Chand-Shaukat Khan', '27.Kabhi Kabhi Mere Dil Me-Dilip Roy', '28.Kiska Rasta Dekhe-Gautam Choudhury', '29.Suhani Raat-V.Balsara', '30.Kyaa Nazaare-Gautam Choudhury', '31.Mai Shayar Badnam-Dilip Roy', '32.Kuchh Na Kho-Gautam Choudhury', '33.Pyaar Hua Ekrar Hua-V.Balsara', '34.Suhana Safar-Dilip Roy', '35.Chanda O Chanda-Gautam Choudhury', '36.Pal Pal Dil Ke Pass-Dilip Roy', '37.Dost Dost Na Raha-Shaukat Khan', '38.Kuch To Log-Dilip Roy', '39.Jeena Yahan Marna Yahan-V.Balsara', '40.Rahe Na Rahe Hum-Dilip Roy', 'Abhi mujh mein kahin -Sonu Nigam', 'Bajlo chutir ghonta -Shilajit Majumdar', 'Bangla Adhunik Gaan Shreya Ghoshal', 'Behati Hawa sa tha o -Shaan and Shantunu Moitra', 'Chookar mere manko - Kishore Kumar', 'Chunriya -Falguni Pathak', 'Ek Bat Batao -B. Praak', 'Evabeo Fire asa jay - Chandabindu', 'Golemale Golemale Pirit Koiro Na -Shreya Ghosal', 'Holud pakhi -Cactus', 'Jaane kaise -KK', 'Khereyiat -Arijit Singh', 'Khusi ke Pal -Arijit Singh and Shirley Setia', 'Ki Kore Bolbo Tomay - Arijit Singh and Palak', 'Likhe Jo Khat Tujhe Mohammed Rafi', 'Maine Dil Se Kaha -KK', 'Mayi teri chunariya lehray -Arijit singh', 'Meri Ma -Shankar Mahadevan', 'Mone pore ruby roy -Arijit Singh', 'Naina -Arijit Singh', 'Papa Kehta Hain -Udit Narayan', 'Pehla Nasha -Udit Narayan and Sadhna Sargam', 'Sau Dard -Sonu Nigam', 'Sei tumi Ayub Bachchu', 'Shuno Na -Shan', 'Tera Chera -Adnan Sami', 'Valolage - Mohiner Ghoragulo', 'Ve Kamleya -Arijit Singh and Shreya Ghosal', 'Wada Raha - Arnab and Shreya Ghosal', 'Woh Lamhe Woh Baatein Atif Aslam','ae-mere-watan-ke-logon-with-lyrics-lata-mangeshkar-live-in-concert-lata-mangeshkar-songs-128-ytshorts.savetube.me']

// Function to get song index from URL parameter
function getSongIndexFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('songIndex'), 10);
}

// Keep track of songs
let songIndex;

// Load a song into the player
function loadSong(song) {
    title.innerText = songIndex + " : " + song;
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
