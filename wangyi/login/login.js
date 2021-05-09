let u_btn_1 = document.getElementsByClassName('u-btn-1')[0];
let u_btn_2 = document.getElementsByClassName('u-btn-2')[0];
let u_official_terms = document.getElementById('u-official-terms');
let remind = document.getElementsByClassName('remind')[0];
let Login_list = document.getElementsByClassName('login-list')[0];

//remind框框的函数
function remindBlock() {
    //已勾选
    if (u_official_terms.checked == true) {
        Login_list.style.display = "none";
    }
    //未勾选
    else {
        remind.style.display = "block";
        setTimeout(function () {
            remind.style.display = "none"
        }, 2000)
    }
}
// 提醒条款的勾选
u_btn_1.onclick = remindBlock;
u_btn_2.onclick = remindBlock;

// 手机登录
let phone_login = document.getElementsByClassName('phone_login')[0];
let Logins = document.getElementsByClassName('Login')[0];
//获取手机号码、密码、按钮
let phoneNum = document.getElementsByClassName('phoneNum')[0];
let p_password = document.getElementsByClassName('p-password')[0];
let p_l_btn = document.getElementsByClassName('p-l-btn')[0];
//调整高度
if (phone_login.style.display == "block") {
    Logins.style.height = "310px";
}
//登录按钮
let phone = phoneNum.value;
let password = p_password.value;
p_l_btn.onclick = function () {
    var phone = phoneNum.value;
    var password = p_password.value;

    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://netease-cloud-music-api-murex-chi.vercel.app/login/cellphone?' + 'phone=' + phone + '&' + 'password=' + password);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let a = JSON.parse(xhr.responseText)
                console.log(a);
            }
        }
    }

}