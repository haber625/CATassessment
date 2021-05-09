# BOM 浏览器

[TOC]

## Window对象模型

与浏览器窗口进行交互

window:浏览器的顶级对象

变量会变成window的属性

函数会变成window的方法

> document
>
> location
>
> navigation
>
> screen
>
> history



#### 页面加载事件

```js
window.onload = function(){}//当页面全部加载完，包括图片、css、flash、之后在执行函数，只能写一个，会以最后一个为准
window.addEventLister('load',function(){});//能写多个
```

#### 窗口加载时间

```js
document.addEventLister('DOMContentLoaded',function(){})//加载完文档时可执行。避免网页图片过多
```

#### 调整窗口大小

```js
window.onresize = function(){}
window.addEventLister("resize",function(){
    if(window.innerWidth <= 800)
});//只要窗口变化，就会触发里面的函数

```

## 定时器之setTimeout()

```js
//window.setTimeout(调用函数，或者函数名延迟时间,单位为毫秒);
setTimeout(function(){},2000);
//var time1 = setTimeout,可以取个名字
```

#### 回调函数

```js
//onclick,setTimeout....+ function都属于回调函数
//5秒后关闭函数：
setTimeout(function(){
    pic.style.display = none;
},5000)
```

#### 停止定时器

```js
btn.addEventLister('click',function(){
    clearTimeout(timeID);
})
```



#### 定时器之setInterval()

```js
setInterval(function(){},5000);//不同的是会反复调用
cleatInterval(timeID);
```

#### 倒计时

```js
//得到当前时间以及输入时间的总毫秒数，从而计算时间差
//setInterval(function(),1000)每隔一秒调用一次函数
//在开启定时器之前，先调用一次函数，防止第一次刷新页面有空白
```

## this指向

```js
//全局作用域内或者普通函数内，this指向全局对象window
//方法中谁调用，this指向谁
var o = {
    sayhi: function(){
        console.log(this);//this指向o这个对象
    }
}
//构造函数中this指向构造函数的实例
function Fun(){
    console.log(this);//这里指向的是fun这个实例对象
}
var fun = new Fun();
```

## JS执行机制

js特点：单线程

#### 同步与异步

同步：上一步代码执行完了再执行下一步代码

异步：同时执行多个代码

同步任务：都在主线程上执行，形成一个执行栈

异步任务：JS的异步是通过回调函数实现的，放到任务队列

> 异步任务
>
> 普通事件：click，resize
>
> 资源加载：load，error
>
> 定时器：setInterval，setTimeout

1.先执行执行栈中的同步任务

2.异步任务（回调函数）放入任务队列中

3.一旦所有执行栈中的同步任务执行完毕，系统会按次序读取任务队列中的异步任务，然后被读取的异步任务结束等待状态，进入执行栈，开始执行

#### 事件循环

主线程不断地重复获得任务，执行任务，在获取任务，在执行的过程

## Location对象

用于获取或设置窗体对象，并且解析URL

> location.href:整个地址
>
> location.host主机、域名
>
> location.port返回端口号
>
> location.pathname返回路径
>
> location.search返回参数
>
> location.hash返回片段 #后面内容，常见于链、锚点

#### location.href

```js
location.href = 'www.baidu.com';
location.href得到的是当前页面的URL
```

#### 获取URL参数

数据在不同页面的传递

```html
<form action="index.html">//form默认get提交，不是post
    <input type="text" name="uname">
    <input type="submit" value="登录">
</form>
```

```js
concole.log(location.search);//打印参数：?uname=ANDY
//1.先去掉？ substr('起始的位置'，截取的字符);
var params = location.search.substr(1);
//利用=分割 键 和 值  split( '=')
var arr = params.split('=')//得到的是["uname","ANDY"]
//把数据写入
div.innerHTML = arr[1];
```

#### location对象的方法

> location.assign()	跟href一样可以跳转页面,可以后退
>
> location.replace()	替换当前页面，因为不记录历史，所以并不能后退页面
>
> location.reload()	重新加载页面，相当于刷新按钮或者f5 如果参数为true 强制刷新 ctrl+f5

## navigation对象

navigation对象包含有关浏览器的信息，它有很多属性，常用userAgent

```js
if((navigator.userAgent.math(/(phone|pad|pod....)/i))){
    window.location.href = "";//手机
}
else {
    window.location.href = "";//电脑

}
```

## historoy对象

window对象给我们提供了一个history对象，与浏览器历史记录进行交互。该对象包含用户（在浏览窗口中）访问过的URL

#### history对象方法

> back()	可以后退功能
>
> forward()	前进功能
>
> go(参数)	前进后退功能 参数如果是1，前进一个页面；如果是-1，后退一个页面