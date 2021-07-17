// //封装ajax
// function ajax(options) {
//     var xhr = null;
//     var params = formsParams(options.data);
//     //创建对象
//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest()
//     } else {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     // 连接
//     if (options.type == "GET") {
//         xhr.open(options.type, options.url + "?" + params, options.async);
//         xhr.send(null)
//     } else if (options.type == "POST") {
//         xhr.open(options.type, options.url, options.async);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         xhr.send(params);
//     }
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             options.success(xhr.responseText);
//         }
//     }
//     function formsParams(data) {
//         var arr = [];
//         for (var prop in data) {
//             arr.push(prop + "=" + data[prop]);
//         }
//         return arr.join("&");
//     }
// }




let u_btn_1 = document.getElementsByClassName('u-btn-1')[0];
let u_btn_2 = document.getElementsByClassName('u-btn-2')[0];
let u_official_terms = document.getElementById('u-official-terms');
let remind = document.getElementsByClassName('remind')[0];
let Login_list = document.getElementsByClassName('login-list')[0];
//用户信息
let userInform = document.getElementsByClassName('userInform')[0];
let u_content = document.getElementsByClassName('u-content')[0];
let un_userInform = document.getElementsByClassName('un-userInform')[0];
// "其他登录方式"
let login_list = document.getElementsByClassName('login-list')[0];
//获取加载小圈圈
let loading = document.getElementsByClassName('loading')[0];
//获取头像
let headPic = document.getElementsByClassName('headPic')[0];
// 手机登录
let phone_login = document.getElementsByClassName('phone_login')[0];
let Logins = document.getElementsByClassName('Login')[0];
//获取手机号码、密码、按钮
let phoneNum = document.getElementsByClassName('phoneNum')[0];
let p_password = document.getElementsByClassName('p-password')[0];
let p_l_btn = document.getElementsByClassName('p-l-btn')[0];

//创建用户信息
let User = new Object();


// 关闭窗口
let loginClose = document.getElementsByClassName('close')[0];
loginClose.onclick = function () {
    Logins.style.display = "none";
    document.body.style.overflow = "scroll";

}

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
u_btn_1.addEventListener('click', remindBlock, false);
u_btn_2.onclick = remindBlock;




//点击登录 显示登录窗口
let login = document.getElementsByClassName('login')[0];
// let Login = document.getElementsByClassName('Login')[0];

//二维码登录(调接口)
let login_qrcode = document.getElementsByClassName('login-qrcode')[0];
let qr = document.getElementsByClassName('qr')[0];
login.onclick = function () {
    Logins.style.display = "block";
    document.body.style.overflow = "hidden";

    // 调接口  1.二维码键生成接口
    let xhr1 = new XMLHttpRequest;
    xhr1.open('GET', 'http://localhost:3000/login/qr/key');
    xhr1.send();

    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            if (xhr1.status >= 200 && xhr1.status < 300) {
            }
        }
    }

    // 2.二维码生成接口
    let xhr2 = new XMLHttpRequest;
    xhr2.open('GET', 'http://localhost:3000/login/qr/create?key=' + xhr1.response + '&&' + 'qrimg=1');
    xhr2.send();

    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
            if (xhr2.status >= 200 && xhr2.status < 300) {
                var xhr2Response = JSON.parse(xhr2.responseText)
                qr.style.backgroundImage = "url(' " + xhr2Response.data.qrimg + "  ')";
                qr.style.backgroundSize = "contain";
            }
        }
    }

    // 3.二维码检测扫码状态接口 
    let xhr3 = new XMLHttpRequest;
    xhr3.open('GET', 'http://localhost:3000/login/qr/check?key=' + xhr1.response);
    xhr3.send();

    xhr3.onreadystatechange = function () {
        if (xhr3.readyState == 4) {
            if (xhr3.status >= 200 && xhr3.status < 300) {
                console.log(xhr3.response);
            }
        }
    }

    // //检测登陆状态
    // let xhr4 = new XMLHttpRequest;
    // xhr4.open('GET', 'https://netease-cloud-music-api-murex-chi.vercel.app/login/status');
    // xhr4.send();

    // xhr4.onreadystatechange = function () {
    //     if (xhr4.readyState == 4) {
    //         if (xhr4.status >= 200 && xhr4.status < 300) {
    //             console.log(xhr4.response);
    //         }
    //     }
    // }


}

//二维码登录 切换至 其他登录
let otherbtn = document.getElementsByClassName('otherbtn')[0];
otherbtn.onclick = function () {
    login_qrcode.style.display = "none";
    login_list.style.display = "block";
}

//其他登陆方式 切换至 二维码登录
let backToQr = document.getElementsByClassName('backToQr')[0];
backToQr.addEventListener('click', function () {
    login_qrcode.style.display = "block";
    login_list.style.display = "none";
}, false)







//手机登录按钮（调接口）
p_l_btn.onclick = function () {
    var phone = phoneNum.value;
    var password = p_password.value;
    loading.style.display = "block";

    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://localhost:3000/login/cellphone?' + 'phone=' + phone + '&' + 'password=' + password);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let User = JSON.parse(xhr.responseText)
                console.log(User);
                //登陆成功时
                if (User.code == 200) {
                    //返回页面滚动状态
                    Logins.style.display = "none";
                    document.body.style.overflow = "scroll";
                    //获取返回的信息
                    console.log(User.token);

                    //token储存在cookie中
                    // document.cookie = User.token;
                    // console.log(document.cookie);
                    // localStorage.setItem('token', User.token);

                    //更改下方右侧，显示个人信息
                    un_userInform.style.display = "none";
                    u_content.style.display = "block";
                    userInform.style.height = "165px";
                    //添加头像
                    headPic.innerHTML = "";
                    headPic.style.backgroundImage = "url(img/headPic.jpg)";
                    headPic.style.borderRadio = "20px";

                    //接口获取用户信息 
                    let xhr1 = new XMLHttpRequest;
                    xhr1.withCredentials = true;
                    xhr1.open('GET', 'http://localhost:3000/user/account');
                    // xhr1.setRequestHeader("Origin", "localhost:3000");
                    xhr1.setRequestHeader("token", User.token);
                    xhr1.send();
                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState == 4) {
                            if (xhr1.status >= 200 && xhr1.status < 300) {
                                console.log(xhr1.response);
                            }
                        }
                    }
                    //检测登陆状态
                    let xhr4 = new XMLHttpRequest;
                    xhr4.open('GET', 'http://localhost:3000/login/status');
                    xhr4.send();

                    xhr4.onreadystatechange = function () {
                        if (xhr4.readyState == 4) {
                            if (xhr4.status >= 200 && xhr4.status < 300) {
                                console.log(xhr4.response);
                            }
                        }
                    }
                }


                //登陆失败时:密码错误、手机号码错误
                var fail = document.getElementsByClassName('l-fail')[0];
                if (User.code != 200) {
                    fail.innerHTML = User.msg;
                    fail.style.display = "block";
                    setTimeout(function () {
                        fail.style.display = "none"
                    }, 2000)
                    loading.style.display = "none";
                }
                if (User.code = 400 && User.code != 200) {
                    fail.innerHTML = User.msg;
                    fail.style.height = "35px"
                    fail.style.display = "block";
                    setTimeout(function () {
                        fail.style.display = "none"
                    }, 2000)
                    loading.style.display = "none";
                }
            }
        }
    }
}

//手机登录界面 转回 其他方式登录 
let p_others = document.getElementsByClassName('p-others')[0];
p_others.onclick = function () {
    phone_login.style.display = "none";
    Login_list.style.display = "block";
    Logins.style.height = "372px"
}

//login-list页面 转移至 手机号码登陆 
u_btn_1.addEventListener('click', function () {
    if (u_official_terms.checked == true) {
        phone_login.style.display = "block";
        Logins.style.height = "310px"
    }
}, false)




//转移至邮箱登录 按钮
let e_transition = document.getElementsByClassName('e_transition')[0];
e_transition.addEventListener('click', function () {
    if (u_official_terms.checked == true) {
        Login_list.style.display = "none";
        email_login.style.display = "block";
        Logins.style.height = "310px";
    }
    //未勾选
    else {
        remind.style.display = "block";
        setTimeout(function () {
            remind.style.display = "none"
        }, 2000)
    }
})

//获取邮箱和密码
let email_login = document.getElementsByClassName('email_login')[0];
let e_l_btn = document.getElementsByClassName('e-l-btn')[0];
let emailNum = document.getElementsByClassName('emailNum')[0];
let e_password = document.getElementsByClassName('e-password')[0];

//邮箱登录按钮
e_l_btn.onclick = function () {
    var email = emailNum.value;
    var password = e_password.value;

    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://netease-cloud-music-api-murex-chi.vercel.app/login/cellphone?' + 'email=' + email + '&' + 'password=' + password);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let a = JSON.parse(xhr.responseText)
                console.log(a);
                //登陆失败时
                var fail = document.getElementsByClassName('l-fail')[0];
                if (a.code != 200) {
                    fail.innerHTML = a.msg;
                    fail.style.display = "block";
                    setTimeout(function () {
                        fail.style.display = "none"
                    }, 2000)
                }
                if (a.code = 400) {
                    fail.innerHTML = "请输入正确的邮箱号";
                    fail.style.height = "35px"
                    fail.style.display = "block";
                    setTimeout(function () {
                        fail.style.display = "none"
                    }, 2000)
                }
            }
        }
    }
}
//邮箱登录小窗口：返回其他方式登录
let e_others = document.getElementsByClassName('e-others')[0];
e_others.onclick = function () {
    email_login.style.display = "none";
    Login_list.style.display = "block";
    Logins.style.height = "372px";
}


//微信，qq，微博登录的提示窗口
let a_wx = document.getElementsByClassName('a-wx')[0];
let a_qq = document.getElementsByClassName('a-qq')[0];
let a_wb = document.getElementsByClassName('a-wb')[0];
let remindbox = function () {
    if (u_official_terms.checked == false) {
        remind.style.display = "block";
        setTimeout(function () {
            remind.style.display = "none"
        }, 2000)
    }
}


//封装 提示 和 跳转 的函数
let loginClick = function (obj) {
    obj.addEventListener('click', function () {
        if (u_official_terms.checked == true) {
            this.href = "https://music.163.com/api/sns/authorize?snsType=10&clientType=web2&callbackType=Login&forcelogin=true";
        }
        if (u_official_terms.checked == false) {
            this.href = "javascript:;";
        }
    }, false);
    obj.addEventListener('click', remindbox, false);
}
loginClick(a_wx);
loginClick(a_wb);
loginClick(a_qq);





