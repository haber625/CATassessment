let audioPlayer = document.getElementById('audioPlayer');
console.log(audioPlayer);
let former = document.getElementsByClassName('former')[0];
console.log(former);
former.onclick = function () {
    audioPlayer.play();
}
let songs = [
    "3950546",//it's my life
    "18449193",//say hello
    "1338962014",//dancing with a stranger
    "569200212",//一荤一素
]
