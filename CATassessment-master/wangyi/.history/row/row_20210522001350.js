
// 1.左右按键消失与显示
let b_left = document.getElementsByClassName('b_left');
let b_right = document.getElementsByClassName("b_right");
let r_cont = document.getElementsByClassName("r-cont");

r_cont[0].onmouseover = function () {
    b_left[0].style.display = "block";
    b_right[0].style.display = "block";
    flag = false;
}
r_cont[0].onmouseout = function () {
    b_left[0].style.display = "none";
    b_right[0].style.display = "none";
    flag = true;
}



//3.动态生成小圆点 + 点击移动
var r_ul = r_cont[0].querySelector('ul');
var r_ol = r_cont[0].querySelector('ol');
var row = document.getElementsByClassName('row')[0];
for (var i = 0; i < r_ul.children.length - 1; i++) {
    //创建一个li
    var li = document.createElement('li');
    // 自定义index下标
    li.index = i;
    //把li插入ol里面
    r_ol.appendChild(li);
    //小圆圈的排他思想，在生成时就添加onclick事件
    li.addEventListener('click', function () {
        //清除所有li
        for (var i = 0; i < r_ol.children.length; i++) {
            r_ol.children[i].className = "";
        }
        this.className = "current";
        // 点击时移动
        r_ul.style.transition = "1s";
        r_ul.style.left = (-730 * this.index) + 'px';
        //点击时背景改变
        var num = this.index + 1;
        row.style.backgroundImage = "url(row/img/" + num + ".jpg)";
    })
}
//把ol里第一个li设置类名为current
r_ol.children[0].className = "current";


//2.左右键点击
// 左键
b_left[0].onclick = function () {
    //获取left值
    var j = r_ul.style.left;
    //提取left值的数字
    var num = parseInt(j);
    //当num == 0 时
    if (num == 0) {
        r_ul.style.transition = "none";
        r_ul.style.left = -6570 + 'px';
        for (var i = 0; i < r_ol.children.length; i++) {
            r_ol.children[i].className = "";
            r_ol.children[r_ol.children.length - 1].className = "current";
        }
        row.style.backgroundImage = "url(row/img/" + r_ol.children.length + ".jpg)";
    }
    else {
        r_ul.style.transition = "1s";
        // left值减小一个1080px
        r_ul.style.left = (num + 730) + 'px';
        //小圆点跟随变化
        for (var i = 0; i < r_ol.children.length; i++) {
            r_ol.children[i].className = "";
            r_ol.children[-num / 730 - 1].className = "current";
        }
        //背景跟着改变
        var bg = -num / 730;
        row.style.backgroundImage = "url(row/img/" + bg + ".jpg)";
    }
}


// 右键
// var flag = true;
b_right[0].onclick = function () {
    //节流阀
    // if (flag) {
    // flag = false;//关闭回流阀
    //获取left值
    var j = r_ul.style.left;
    //提取left值的数字
    var num = parseInt(j);
    //当num == -9720 时
    if (num == -6570) {
        r_ul.style.transition = "none";
        r_ul.style.left = 0 + 'px';
        for (var i = 0; i < r_ol.children.length; i++) {
            r_ol.children[i].className = "";
            r_ol.children[0].className = "current";
        }
        row.style.backgroundImage = "url(row/img/" + 1 + ".jpg)";
    }
    else {
        //left值增加一个1080px
        r_ul.style.transition = "1s";
        r_ul.style.left = (num - 730) + 'px';
        //小圆点跟随变化
        for (var i = 0; i < r_ol.children.length; i++) {
            r_ol.children[i].className = "";
            r_ol.children[-num / 730 + 1].className = "current";
        }
        var bg = -num / 730 + 2;
        row.style.backgroundImage = "url(row/img/" + bg + ".jpg)";
    }
    // flag = true;//再打开节流阀
    // }
}

//4.轮播图自动播放
var timer = setInterval(function () {
    if (flag == true)
        b_right[0].click();
}, 2000)
