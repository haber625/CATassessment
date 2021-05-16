//获取按钮上一首/下一首/暂停/进度条
let audioPlayer = document.getElementById('audioPlayer');
let former = document.getElementsByClassName('former')[0];
let next = document.getElementsByClassName('next')[0];
let btns_play = document.getElementsByClassName('btns-play')[0];
let currentTime = document.getElementsByClassName('currentTime')[0];
let totalTime = document.getElementsByClassName('totalTime')[0];
let musicPic = document.getElementsByClassName('musicPic')[0];
let loadingCir = document.getElementsByClassName('loadingCir')[0];
let play_lineCur = document.getElementsByClassName('play-lineCur')[0];
let timer1;

//歌曲库
let song = [
    "3950546",//it's my life
    "18449193",//say hello
    "1338962014",//dancing with a stranger
    "569200212",//一荤一素
]
let songs = [
    { songName: "it's my life", singer: "Bon Jovi", songId: "3950546", picUrl: "img/special_album/3950546.jpg" },
    { songName: "say hello", singer: "Rosie Thomas", songId: "18449193", picUrl: "img/special_album/18449193.jpg" },
    { songName: "dancing with a stranger", singer: "Sam Smith", songId: "1338962014", picUrl: "img/special_album/1338962014.jpg" },
    { songName: "一荤一素", singer: "毛不易", songId: "569200212", picUrl: "img/special_album/569200212.jpg" }
]



//初始化歌手名字 和 歌曲
let songName = document.getElementsByClassName('songName')[0];
let songSinger = document.getElementsByClassName('songSinger')[0];
songName.innerHTML = songs[0].songName;
songSinger.innerHTML = songs[0].singer;
musicPic.src = songs[0].picUrl;

// 封装进度条/动态歌曲时间
let playingLine = function () {
    clearInterval(timer1);
    //进度条
    let lenth = audioPlayer.duration;
    timer1 = setInterval(function () {
        cur = audioPlayer.currentTime;//获取当前的播放时间
        play_lineCur.style.width = "" + parseFloat(cur / lenth) * 493 + "px";
    }, 50)

    //歌曲时间
    var counting = setInterval(function () {
        cur = parseInt(audioPlayer.currentTime);//秒数
        var temp = cur;
        minute = parseInt(temp / 60);//分钟
        if (cur % 60 < 10) {
            currentTime.innerHTML = "" + minute + ":0" + cur % 60 + "";
        } else {
            currentTime.innerHTML = "" + minute + ":" + cur % 60 + "";
        }
    }, 1000);

    //总时间
    console.log(audioPlayer.duration);
    if (audioPlayer.duration < 60) {
        totalTime = audioPlayer;
    }
    else {
        total = parseInt(audioPlayer.duration);//秒数
        // var temp = total;
        minute = parseInt(total / 60);//分钟
        if (total % 60 < 10) {
            totalTime.innerHTML = "|" + minute + ":0" + total % 60 + "";
        } else {
            totalTime.innerHTML = "|   " + "" + minute + ":" + total % 60 + "";
        }
    }
    loadingCir.style.display = "none";
}




//点击 暂停/继续播放 按钮
btns_play.onclick = function playSong() {
    //歌曲播放
    if (btns_play.style.backgroundPositionY == "-204px") {
        loadingCir.style.display = "block";
        //歌曲播放
        audioPlayer.play();
        //按钮变化
        btns_play.style.backgroundPositionY = "-165px";
        //进度条启动
        playingLine();
    }
    else {
        //暂停歌曲
        audioPlayer.pause();
        //改变按钮
        btns_play.style.backgroundPositionY = "-204px";
    }
}



//播放下一首
next.onclick = function () {
    let now;
    timer1 = null;
    //获取当前歌曲的序列号
    for (var i = 0; i < song.length - 1; i++) {
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[i])
            now = i;
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[song.length - 1])
            now = -1;
    }

    // 歌曲信息更新
    audioPlayer.src = "https://music.163.com/song/media/outer/url?id=" + song[now + 1];

    audioPlayer.addEventListener("canplay", function () {
        audioPlayer.play();
        btns_play.style.backgroundPositionY = "-165px";
        songName.innerHTML = songs[now + 1].songName;
        songSinger.innerHTML = songs[now + 1].singer;
        //歌曲封面
        musicPic.src = songs[now + 1].picUrl;
        //播放按钮变化
        //playingline
        playingLine();
    })
}




//播放上一首
former.onclick = function () {
    let now;
    clearInterval(timer1)
    timer1 = null;
    //获取当前歌曲的序列号
    for (var i = 1; i < song.length; i++) {
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[i])
            now = i;
        if (audioPlayer.src == "https://music.163.com/song/media/outer/url?id=" + song[0])
            now = song.length;
    }
    // 歌曲信息更新
    audioPlayer.src = "https://music.163.com/song/media/outer/url?id=" + song[now - 1];

    audioPlayer.addEventListener("canplay", function () {
        audioPlayer.play();
        btns_play.style.backgroundPositionY = "-165px";
        songName.innerHTML = songs[now - 1].songName;
        songSinger.innerHTML = songs[now - 1].singer;
        //歌曲封面
        musicPic.src = songs[now - 1].picUrl;
        //播放按钮变化
        //playingline
        playingLine();
    })


    // audioPlayer.play();
    // btns_play.style.backgroundPositionY = "-165px";
    // songName.innerHTML = songs[now - 1].songName;
    // songSinger.innerHTML = songs[now - 1].singer;
    // playingLine();

}


//显示歌曲数量
let list = document.getElementsByClassName('list')[0];
list.innerHTML = song.length;