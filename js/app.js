let video;
let durationControl; 
let soundControl;
let intervalId;
const MAX_SOUND_VALUE = 10;
// документ полностью загружен
$().ready(function(){

    video = document.getElementById("player"); 
    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");  
    durationControl.addEventListener('mousedown', stopInterval);   
    // durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('mouseup', setVideoDuration); 

    durationControl.min = 0;
    durationControl.value = 0;    

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");    
    // soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('mouseup', changeSoundVolume); 

    // задаем максимальные и минимальные значения громокости

    soundControl.min = 0;
    soundControl.max = MAX_SOUND_VALUE;
    // присваиваем ползунку максимальное значение
    // soundControl.value = soundControl.max;

    //обрабатываем окончание видео
    video.addEventListener('ended', function () {
        document.querySelector(".video__player-img").classList.toggle("video__player-img--active");
        video.currentTime = 0;
    }, false);
});

/*
 Воспроизведение видео
*/
function playStop(){
    // показывает или скрывает белую кнопку play
    document.querySelector(".video__player-img").classList.toggle("video__player-img--active");  
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused){
        // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration, 1000/66);
        
    }else{
        // video.webkitExitFullscreen(); //выйти из полноэкранного режима
        // останавливаем видео
        stopInterval()
        
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration(){

    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);

    if (video.paused){
        video.play();
        document.getElementsByClassName("video__player-img")[0].classList.add("video__player-img--active");
    }
    
}


/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
    console.log(video.currentTime)
}


/*
    Управление звуком
*/
function soundOf(){    
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
        
        Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
        Хранится в перменной soundLevel
        */
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*MAX_SOUND_VALUE;
    }else{
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

/*
    Управление звуком видео
*/

function changeSoundVolume(){
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
         video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
   soundControl.value 0   1   2   3   4   5   6   7   8   9  10
        */
    video.volume = soundControl.value/MAX_SOUND_VALUE; 
    console.log(video.volume) 
}