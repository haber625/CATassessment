//获取按钮上一首/下一首/暂停/进度条
let audioPlayer = document.getElementById('audioPlayer');
let former = document.getElementsByClassName('former')[0];
let next = document.getElementsByClassName('next')[0];
let btns_play = document.getElementsByClassName('btns-play')[0];
//歌曲库
let song = [
    "3950546",//it's my life
    "18449193",//say hello
    "1338962014",//dancing with a stranger
    "569200212",//一荤一素
]
let songs = [
    { songName: "it's my life", singer: "sdsds", songId: "3950546" },
    { songName: "say hello", singer: "ewewew", songId: "18449193" },
    { songName: "dancing with a stranger", singer: "sanm", songId: "1338962014" },
    { songName: "一荤一素", singer: "毛不易", songId: "569200212" }
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

//播放下一首
next.onclick = function () {
    let now;
    for (var i = 0; i < song.length - 1; i++) {
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[i])
            now = i;
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[song.length - 1])
            now = -1;
    }
    audioPlayer.src = "https://music.163.com/song/media/outer/url?id=" + song[now + 1];
    audioPlayer.play();
}
//播放上一首
former.onclick = function () {
    let now;
    for (var i = 1; i < song.length; i++) {
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[i])
            now = i;
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[0])
            now = song.length;
    }
    audioPlayer.src = "https://music.163.com/song/media/outer/url?id=" + song[now - 1];
    audioPlayer.play();
}

//显示歌手名字
let songName = document.getElementsByClassName('songName')[0];
//进度条
//显示音乐播放的时间

