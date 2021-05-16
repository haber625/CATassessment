let audioPlayer = document.getElementById('audioPlayer');
//获取按钮上一首/下一首/暂停/进度条
let former = document.getElementsByClassName('former')[0];
let next = document.getElementsByClassName('next')[0];
let btns_play = document.getElementsByClassName('btns-play')[0];
//播放上一首
//暂停/继续播放
console.log(btns_play.style.backgroundPositionY);

btns_play.onclick = function () {
    if (btns_play.style.backgroundPositionY == "-204px") {
        console.log(1);
        audioPlayer.play();
        btns_play.style.backgroundPositionY = "-165px";
    }
    if (btns_play.style.backgroundPositionY == "-165px") {
        console.log(2);
        audioPlayer.pause();
        btns_play.style.backgroundPositionY = "-204px";
    }
}
// audioPlayer.addEventListener("playing", function () {
//     console.log("playing");
// })
// audioPlayer.addEventListener("pause", function () {
//     console.log("pause");
// })

//播放下一首
//进度条
//显示音乐播放的时间
let songs = [
    "3950546",//it's my life
    "18449193",//say hello
    "1338962014",//dancing with a stranger
    "569200212",//一荤一素
]

