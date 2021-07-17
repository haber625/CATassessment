//封装ajax 
function get(url, data, success) {
    var xhr = new XMLHttpRequest;
    if (data) {
        url += '?' + data;
    }
    xhr.open('get', url);
    if (sessionStorage.getItem('userToken')) {
        xhr.setRequestHeader("token", sessionStorage.getItem('userToken'));
    }
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            success(JSON.parse(xhr.responseText));
        }
    }
}
//解析歌词
var oLRC = {
    ti: "", //歌曲名
    ar: "", //演唱者
    al: "", //专辑名
    by: "", //歌词制作人
    offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
    ms: [] //歌词数组{t:时间,c:歌词}
};

function createLrcObj(lrc) {
    if (lrc.length == 0) return;
    var lrcs = lrc.split('\n');//用回车拆分成数组
    for (var i in lrcs) {//遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
        var s = t.split(":");//分离:前后文字
        if (isNaN(parseInt(s[0]))) { //不是数值
            for (var i in oLRC) {
                if (i != "ms" && i == s[0].toLowerCase()) {
                    oLRC[i] = s[1];
                }
            }
        } else { //是数值
            var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
            var start = 0;
            for (var k in arr) {
                start += arr[k].length; //计算歌词位置
            }
            var content = lrcs[i].substring(start);//获取歌词内容
            for (var k in arr) {
                var t = arr[k].substring(1, arr[k].length - 1);//取[]间的内容
                var s = t.split(":");//分离:前后文字
                oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
                    t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
                    c: content
                });
            }
        }
    }
    oLRC.ms.sort(function (a, b) {//按时间顺序排序
        return a.t - b.t;
    });

    for (var i in oLRC) { //查看解析结果
        console.log(i, ":", oLRC[i]);
    }
}
//显示歌词
function showLRC() {
    var s = "";
    for (var i in oLRC.ms) {//遍历ms数组，把歌词加入列表
        s += '<li>' + oLRC.ms[i].c + '</li>';
    }
    lyrics.innerHTML = s;
}


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
let lyrics = document.getElementsByClassName('lyrics')[0];
let lyrics_songlist = document.getElementsByClassName('lyrics_songlist')[0];
//显示歌曲数量
let list = document.getElementsByClassName('list')[0];
// list.innerHTML = song.length;



//初始化歌手名字 和 歌曲
let songName = document.getElementsByClassName('songName')[0];
let songSinger = document.getElementsByClassName('songSinger')[0];


//热门推荐
let h_songs = document.getElementsByClassName('h-songs')[0];
let h_song = h_songs.children;
//获取热门歌单
get('http://localhost:3000/playlist/hot', '', function () {
})
//获取歌单详情
// 获取热门歌单中的华语歌单的8首歌曲
let hotList = new Array;
get('http://localhost:3000/playlist/detail?id=5001', '', function (data) {
    for (var i = 0; i < 8; i++) {
        hotList[i] = data.privileges[i].id;
    }
})


//飙升榜单
let song_rise = document.getElementsByClassName('song-rise');
//获取榜单
get('http://localhost:3000/toplist', '', function (data) {
})
//获取飙升榜单
get('http://localhost:3000/playlist/detail?id=19723756', '', function (data) {
    for (var i = 0; i < 10; i++) {
        let a = i;
        //更新歌名
        song_rise[i].innerHTML = data.playlist.tracks[i].name;
        //自定义属性song_id存储id
        song_rise[i].song_id = data.playlist.tracks[i].id;
    }
    //初始化歌曲信息
    get('http://localhost:3000/song/url', 'id=' + song_toplist[0].song_id, function (data) {
        audioPlayer.src = data.data[0].url;
    })
    //获取歌曲详情
    get('http://localhost:3000/song/detail', 'ids=' + song_toplist[0].song_id, function (data) {
        console.log(data);
        musicPic.src = data.songs[0].al.picUrl;
        songName.innerHTML = data.songs[0].name;
        songSinger.innerHTML = data.songs[0].ar[0].name;
    })
    //获取歌词
    get('http://localhost:3000/lyric', 'id=' + song_toplist[0].song_id, function (data) {
        lyrics.innerHTML = data.lrc.lyric;
        var text = createLrcObj(JSON.stringify(data.lrc.lyric))
        showLRC();
        console.log(data.lrc.lyric);
    })
})

//新歌榜单
let song_new = document.getElementsByClassName('song-new');
//获取新歌榜单
get('http://localhost:3000/playlist/detail?id=3779629', '', function (data) {
    for (var i = 0; i < 10; i++) {
        let a = i;
        //更新歌名
        song_new[i].innerHTML = data.playlist.tracks[i].name;
        //自定义属性song_id存储id
        song_new[i].song_id = data.playlist.tracks[i].id;
    }
})

//原创榜单
let song_original = document.getElementsByClassName('song-original');
//获取原创榜单
get('http://localhost:3000/playlist/detail?id=2884035', '', function (data) {
    for (var i = 0; i < 10; i++) {
        let a = i;
        //更新歌名
        song_original[i].innerHTML = data.playlist.tracks[i].name;
        //自定义属性song_id存储id
        song_original[i].song_id = data.playlist.tracks[i].id;
    }
})


let song_toplist = document.getElementsByClassName('song-toplist');
//根据

// id获取url
for (var i = 0; i < 30; i++) {
    song_toplist[i].addEventListener('click', function () {
        //通过id获取url
        get('http://localhost:3000/song/url', 'id=' + this.song_id, function (data) {
            //把url赋予给audio.src
            audioPlayer.src = data.data[0].url;
            //防止获取的时间是NAN
            audioPlayer.addEventListener("canplay", function () {
                audioPlayer.pause()
                btns_play.click()
            })
        })
        //更新化歌曲信息
        //获取歌曲详情
        get('http://localhost:3000/song/detail', 'ids=' + this.song_id, function (data) {
            musicPic.src = data.songs[0].al.picUrl;
            songName.innerHTML = data.songs[0].name;
            songSinger.innerHTML = data.songs[0].ar[0].name;
        })
        //获取歌词
        get('http://localhost:3000/lyric', 'id=' + this.song_id, function (data) {
            lyrics.innerHTML = data.lrc.lyric;
        })
    })
}


//点击显示歌词
list.onclick = function () {
    if (lyrics_songlist.style.display == "block") {
        lyrics_songlist.style.display = "none"
    }
    else {
        lyrics_songlist.style.display = "block";
    }
}

// 封装进度条/动态歌曲时间
let playingLine = function () {
    clearInterval(timer1);
    //进度条
    let lenth = audioPlayer.duration;
    timer1 = setInterval(function () {
        cur = audioPlayer.currentTime;//获取当前的播放时间
        play_lineCur.style.width = "" + parseFloat(cur / lenth) * 493 + "px";
        if (cur == lenth) {
            next.click();
        }
    }, 50)

    //点击进度条改变歌曲时间
    let play_line_content = document.getElementsByClassName('play-line-content')[0];
    //未播放的部分
    play_line_content.addEventListener('click', function (event) {
        var left = getAbsLeft(play_line_content);//进度条到页面左边的距离
        var xLeft = event.clientX;//鼠标点击时到页面左侧的距离
        var distance = xLeft - left;//鼠标点击时到进度条左侧的距离
        audioPlayer.currentTime = distance / 493 * audioPlayer.duration;//改变播放时间
    })
    //已播放的部分
    play_lineCur.addEventListener('click', function (event) {
        var left = getAbsLeft(play_lineCur);//进度条到页面左边的距离
        var xLeft = event.clientX;//鼠标点击时到页面左侧的距离
        var distance = xLeft - left;//鼠标点击时到进度条左侧的距离
        audioPlayer.currentTime = distance / 493 * audioPlayer.duration;//改变播放时间
    })

    //拖动小圆圈改变播放时间
    let line_cir = document.getElementsByClassName('line-cir')[0];
    line_cir.onmousedown = function () {
        //先停止播放音乐
        audioPlayer.pause();
        var cirLeft = line_cir.offsetLeft;//小圆圈到进度条左侧的距离，从-9开始

        document.onmousemove = function (event) {
            var left = getAbsLeft(play_lineCur);//进度条到页面左边的距离
            var xLeft = event.pageX;//鼠标点击时到页面左侧的距离
            var distance = xLeft - left;//鼠标点击时到进度条左侧的距离
            audioPlayer.currentTime = distance / 493 * audioPlayer.duration;//改变播放时间
        }
        document.onmouseup = function () {
            console.log("aaa");
            //继续播放音乐
            audioPlayer.play();
            btns_play.style.backgroundPositionY = "-165px";
            document.onmousemove = null;
        }
    }

    //获取到页面最左边的距离
    function getAbsLeft(obj) {
        var l = obj.offsetLeft;
        while (obj.offsetParent != null) {
            obj = obj.offsetParent;
            l += obj.offsetLeft;
        }
        return l;
    }
    //阻止默认拖拽事件
    document.ondragstart = function () {
        return false;
    }



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
    if (audioPlayer.paused) {
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
}








// 获取歌曲地址
// get('http://localhost:3000/song/url?id=108418', '', function () {
// })
//获取歌曲详情
// get('http://localhost:3000/song/detail?ids=108418', '', function () {
// })
//获取歌词
// get('http://localhost:3000/lyric?id=108418', '', function () {
// })
