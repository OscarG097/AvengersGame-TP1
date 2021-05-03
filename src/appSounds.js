const uploadTheme = function(soundIndex) {
    const avengersTheme = document.createElement("audio");
    avengersTheme.src = soundIndex;
    avengersTheme.setAttribute("preload", "auto");
    avengersTheme.setAttribute("controls", "none");
    //Saca el display de la pantalla
    avengersTheme.style.display = "none";
    document.body.appendChild(avengersTheme);
    return avengersTheme;
};

const avengersTheme = uploadTheme("sounds/AvengersTheme.wav");

function playAvengers() {
    if (!avengersTheme.paused && !avengersTheme.ended) {
        avengersTheme.pause();
        play.value = '\u25BA';
        document.body.style.backgroundColor = '#fff';
    } else {
        avengersTheme.play();
        play.value = '||';
        document.body.style.backgroundColor = 'grey';
    }
}


function startAvengers() {
    play.addEventListener('click', playAvengers);

}

window.addEventListener('load', startAvengers, false);