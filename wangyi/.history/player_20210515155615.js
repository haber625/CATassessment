//获取按钮上一首/下一首/暂停/进度条
let audioPlayer = document.getElementById('audioPlayer');
let former = document.getElementsByClassName('former')[0];
let next = document.getElementsByClassName('next')[0];
let btns_play = document.getElementsByClassName('btns-play')[0];
let currentTime = document.getElementsByClassName('currentTime')[0];
let totalTime = document.getElementsByClassName('totalTime')[0];


//歌曲库
let song = [
    "3950546",//it's my life
    "18449193",//say hello
    "1338962014",//dancing with a stranger
    "569200212",//一荤一素
]
let songs = [
    { songName: "it's my life", singer: "Bon Jovi", songId: "3950546" },
    { songName: "say hello", singer: "Rosie Thomas", songId: "18449193" },
    { songName: "dancing with a stranger", singer: "Sam Smith", songId: "1338962014" },
    { songName: "一荤一素", singer: "毛不易", songId: "569200212" }
]



//显示歌手名字 和 歌曲
let songName = document.getElementsByClassName('songName')[0];
let songSinger = document.getElementsByClassName('songSinger')[0];
songName.innerHTML = songs[0].songName;
songSinger.innerHTML = songs[0].singer;



//暂停/继续播放
console.log(btns_play.style.backgroundPositionY);

btns_play.onclick = function () {
    if (btns_play.style.backgroundPositionY == "-204px") {
        audioPlayer.play();
        btns_play.style.backgroundPositionY = "-165px";
        //进度条
        let play_lineCur = document.getElementsByClassName('play-lineCur')[0];
        let lenth = audioPlayer.duration;
        timer1 = setInterval(function () {
            cur = audioPlayer.currentTime;//获取当前的播放时间
            play_lineCur.style.width = "" + parseFloat(cur / lenth) * 300 + "px";
            currentTime.innerHTML = cur + " < i class="totalTime" >|" + audioPlayer.duration + " </ >";
        }, 50)
        //歌曲时间
    }
    else {
        audioPlayer.pause();
        btns_play.style.backgroundPositionY = "-204px";
    }
}



//播放下一首
next.onclick = function () {
    let now;
    //获取当前歌曲的序列号
    for (var i = 0; i < song.length - 1; i++) {
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[i])
            now = i;
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[song.length - 1])
            now = -1;
    }

    // 歌曲信息更新
    audioPlayer.src = "https://music.163.com/song/media/outer/url?id=" + song[now + 1];
    audioPlayer.play();
    songName.innerHTML = songs[now + 1].songName;
    songSinger.innerHTML = songs[now + 1].singer;
}




//播放上一首
former.onclick = function () {
    let now;
    //获取当前歌曲的序列号
    for (var i = 1; i < song.length; i++) {
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[i])
            now = i;
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[0])
            now = song.length;
    }
    // 歌曲信息更新
    audioPlayer.src = "https://music.163.com/song/media/outer/url?id=" + song[now - 1];
    audioPlayer.play();
    songName.innerHTML = songs[now - 1].songName;
    songSinger.innerHTML = songs[now - 1].singer;
}


//显示音乐播放的时间
console.log(audioPlayer.currentTime);
console.log(audioPlayer.duration);

//显示歌曲数量
let list = document.getElementsByClassName('list')[0];
list.innerHTML = song.length;