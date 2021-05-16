//获取按钮上一首/下一首/暂停/进度条
let audioPlayer = document.getElementById('audioPlayer');
let former = document.getElementsByClassName('former')[0];
let next = document.getElementsByClassName('next')[0];
let btns_play = document.getElementsByClassName('btns-play')[0];
//歌曲库
let songs = [
    "3950546",//it's my life
    "18449193",//say hello
    "1338962014",//dancing with a stranger
    "569200212",//一荤一素
]

//暂停/继续播放
console.log(btns_play.style.backgroundPositionY);

btns_play.onclick = function () {
    if (btns_play.style.backgroundPositionY == "-204px") {
        audioPlayer.play();
        btns_play.style.backgroundPositionY = "-165px";
    }
    else {
        audioPlayer.pause();
        btns_play.style.backgroundPositionY = "-204px";
    }
}

console.log(audioPlayer.src);
audioPlayer.src = "https://music.163.com/song/media/outer/url?id=" + songs[1];
console.log(audioPlayer.src);
//播放上一首
//播放下一首
//进度条
//显示音乐播放的时间

