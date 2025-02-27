const audioPlayer=document.querySelector('.audio-player');
const audio = new Audio(
   
);
const tracks = [
    {
        src: "mp3/beyonce.mp3",
        cover: "img/lemonade.png",
        title: "Don't Hurt Yourself",
        artist: "Beyonce"     
       
    },
    {
        src: "mp3/Betsy_Mariya_YAnkovskaya_-_Sigma_Bojj_crispymilk_Remix_78957405.mp3",
        cover: "mp3/sigma.jpg",
        title: "Sigma Boy (Remix)",
        artist: "Noname"     
       
    },
    {
        
        src: "mp3/assets_audio_dontstartnow.mp3",
        cover: "img/dontstartnow.png",
        title: "Sigma boy",
        artist: "Zertix"  
    }
];

let currentTrackIndex=0;


const CoverImage= audioPlayer.querySelector(".cover-image");
const tracktitle= audioPlayer.querySelector(".name .track-title");
const trackartist= audioPlayer.querySelector(".name .track-artist");

function loadTrack(index){
    audio.src = tracks[index].src;
    CoverImage.src = tracks[index].cover;
    tracktitle.textContent = tracks[index].title;
    trackartist.textContent = tracks[index].artist;
    
    document.body.style.backgroundImage =  `url(${tracks[index].cover})`;
    

     // Обновляем длительность трека
audio.addEventListener(
    "loadeddata",
    () => {
      audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
        audio.duration
      );
      audio.volume = .75;
    },
    false
  );
}

  //turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, '0')}:${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    
  }
  
  
const playbtn= audioPlayer.querySelector(".controls .toggle-play")
const playIcon= audioPlayer.querySelector(".play-icon")
// Добавляем обработчик клика на кнопку Play/Pause
playbtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playIcon.src = "img/pause.png"; // Меняем изображение на паузу
    } else {
        audio.pause();
        playIcon.src = "img/play.png"; // Меняем изображение на плей
    }
});

const timeline= audioPlayer.querySelector(".timeline")
const progress= audioPlayer.querySelector(".progress")

audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    const currentTimeElement = audioPlayer.querySelector(".current")
    if(currentTimeElement){
        currentTimeElement.textContent=getTimeCodeFromNum(audio.currentTime)
    }
});

timeline.addEventListener("click",(event) =>{
    const timelineWidth=timeline.clientWidth;
    const clickx = event.offsetX; // Получаем X-координату клика
    const newTime=(clickx/ timelineWidth) * audio.duration;

    audio.currentTime=newTime;

} );
const btn_prev= audioPlayer.querySelector(".btn-prev")
const btn_next= audioPlayer.querySelector(".btn-next")

const prevIcon = btn_prev.querySelector("img");
const nextIcon = btn_next.querySelector("img");

prevIcon.src ="img/backward.png";
nextIcon.src = "img/forward.png";

btn_prev.addEventListener("click", () =>{
    if(currentTrackIndex === 0){
        currentTrackIndex = tracks.length -1;
    }
    else{
        currentTrackIndex = currentTrackIndex - 1;
    }
loadTrack(currentTrackIndex);
audio.play();
});

btn_next.addEventListener("click", () =>{
    if(currentTrackIndex === tracks.length -1){
        currentTrackIndex =0;
    }
    else{
    currentTrackIndex=currentTrackIndex + 1;
    }
    loadTrack(currentTrackIndex);
    audio.play();
});
// Инициализация первого трека
loadTrack(currentTrackIndex);
