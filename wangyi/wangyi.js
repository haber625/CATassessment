//搜索栏点击后 value值为空
var inputSearch = document.getElementById('inputSearch');
console.log(inputSearch);
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

//点击登录 显示登录窗口
let login = document.getElementsByClassName('login')[0];
let Login = document.getElementsByClassName('Login')[0];
login.onclick = function () {
    Login.style.display = "block";
    document.body.style.overflow = "hidden";
}
// 窗口关闭按钮
let close = document.getElementsByClassName('close')[0];
close.onclick = function () {
    Login.style.display = "none";
    document.body.style.overflow = "scroll";
}
// 二维码登录
let login_qrcode = document.getElementsByClassName('login-qrcode')[0];
// 其他登录方式
let login_list = document.getElementsByClassName('login-list')[0];
//二维码登录 切换至 其他登录
let otherbtn = document.getElementsByClassName('otherbtn')[0];
otherbtn.onclick = function () {
    login_qrcode.style.display = "none";
    login_list.style.display = "block";
}