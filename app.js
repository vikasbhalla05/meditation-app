const app = () => {
    // songs
    const songs = document.querySelector('.player .sound');
    // play
    const play = document.querySelector('.player img');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // sounds
    const sounds = document.querySelectorAll('.music-control button');
    // time display
    const timeDisplay = document.querySelector('.time-show');
    // time select
    const timeSelect = document.querySelectorAll('.time-control>button');
    //get the length of the outline
    const outlineLen = outline.getTotalLength();
    // duration
    let fakeduration = 600;
    // outline shape
    outline.style.strokeDasharray=outlineLen;
    outline.style.strokeDashoffset=outlineLen;

    // change sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function() {
            songs.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlayedSong(songs);
        });
    });

    //play sound
    play.addEventListener("click", ()=>{
        checkPlayedSong(songs);
    });

    // select sound
    timeSelect.forEach(timeChoice =>{
        timeChoice.addEventListener('click', function() {
            fakeduration = this.getAttribute('data-time');
            timeDisplay.textContent= `${Math.floor(fakeduration/60)}:${Math.floor(fakeduration%60)}`;
        });
    });

    //specific function to play n pause sounds
    const checkPlayedSong = songs =>{
        if(songs.paused){
            songs.play();
            video.play();
            play.src = "./svg/pause.svg";
        }
        else{
            songs.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    // we can animate the circle    
    songs.ontimeupdate = () =>{
        let currentTime = songs.currentTime;
        let elapsed = fakeduration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // animate circle
        let progress = outlineLen - (currentTime/fakeduration)*outlineLen;
        outline.style.strokeDashoffset = progress;
        // time update
        timeDisplay.textContent= `${minutes}:${seconds}`;

        // after the song ends
        if(currentTime>=fakeduration){
            songs.pause();
            songs.currentTime=0;
            play.src="./svg/play.svg";
            video.pause();
        }
    };

};

app();