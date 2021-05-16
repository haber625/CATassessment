let audioPlayer = document.getElementById('audioPlayer');
//获取按钮上一首/下一首/暂停/进度条
let former = document.getElementsByClassName('former')[0];
let next = document.getElementsByClassName('next')[0];
let btns_play = document.getElementsByClassName('btns-play')[0];
//播放上一首
former.onclick = function () {
    audioPlayer.play();
}
//暂停播放
//播放下一首
//进度条
//显示音乐播放的时间
let songs = [
    "3950546",//it's my life
    "18449193",//say hello
    "1338962014",//dancing with a stranger
    "569200212",//一荤一素
]
