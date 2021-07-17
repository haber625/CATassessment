//1.用户详情存储在了sessionstroage里
// 2.音乐播放用的是本地的id，放了四首歌，可以播放、暂停、上下一首、自动切歌
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
            success(JSON.parse(xhr.responseText));//回调函数
        }
    }
}



//搜索栏点击后 value值为空
var inputSearch = document.getElementById('inputSearch');
inputSearch.onclick = function () {
    if (inputSearch.value == "音乐/视频/电台/用户")
        inputSearch.value = "";
}
inputSearch.onblur = function () {
    if (inputSearch.value == "") {
        inputSearch.value = "音乐/视频/电台/用户";
    }
}

//封装消失函数
let disappear = function (obj) {
    obj.style.display = "none";
}

//下方登录按钮
let userInform_login = document.getElementsByClassName('userInform-login')[0];
// userInform_login.onclick = function () {
//     Logins.style.display = "block";
//     document.body.style.overflow = "hidden";
// }
// 窗口关闭按钮
let close = document.getElementsByClassName('close')[0];
close.onclick = function () {
    Login.style.display = "none";
    document.body.style.overflow = "scroll";
}



//底部播放条
let player = document.getElementsByClassName('player')[0];
player.onmouseover = function () {
    player.style.bottom = "0";
}
player.onmouseout = function () {
    player.style.bottom = "-40px";
}


//底部轮播条锁定
let lock = document.getElementsByClassName('lock')[0];
lock.onclick = function () {
    if (lock.style.backgroundPosition == "-80px -376px") {
        lock.style.backgroundPosition = "-100px -374px";
        player.style.bottom = "0px";
        player.onmouseout = function () { }
    }
    else {
        lock.style.backgroundPosition = "-80px -376px"
        player.onmouseout = function () {
            player.style.bottom = "-40px";
        }
    }
}


