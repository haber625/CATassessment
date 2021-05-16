## XML

xml 可拓展标记语言

xml 用来存储和传输数据   都是自定义标签

html用于呈现数据  都是预定义标签

## JSON

比xml要灵活







## AJAX特点

### 优点

不需要刷新页面就可以更新页面里面的内容

### 缺点

无法后退，没有浏览记录

存在跨域问题（例如从a.com到b.com去请求一些数据就是跨域）

对爬虫不友好



## http协议

可理解为规则，规定了请求与响应时所需要遵循的规则



### 请求报文

报文的内容有行、头、空行、体

行可以理解为报文整体的传输方式还有传输结果的状态。

头可以理解为对于报文里体的内容作一些描述。

体可以理解为请求和传输中真正传递着的内容。

#### 行

POST/GET：请求参数

/s?ie=utf-8：传递过去服务器的参数

HTTP/1.1：所遵循的HTTP协议版本

#### 头

Host：

cookie：

content-type：

user-agent：

（格式都是名字冒号空格加值）

#### 空行

空行是固定的，一定会有

#### 体

内容可有可无

当是GET型时，里面是空的；

而当是POST型时，是可以有内容，不为空的





### 响应报文

也是行、头、空行、体这四部分

#### 行

HTTP/1.1（遵循的协议）

200：表示响应的状态码，还有404 403 500...

OK：表示响应状态字符串，和状态码是对应的

#### 头

（这里是对响应体的内容做一些描述）

content-type:  text/html;

content-length: 2048

content-encoding: gzip

#### 体

```html
<head>
</head>
<body>
    <h1>
        内容
    </h1>
</body>
```

里面是返回回来的内容，浏览器会将响应内容提取出来，再通过渲染呈现在网页中中



### 在chrome浏览器中查看请求和响应报文

#### GET请求

（即请求报文的体是空的）

1、查看network，刷新后network里会呈现发过去服务器的请求

2、点击其中一个请求，可以看到

general  响应和请求报文里的常看内容

response headers 响应头，可以看响应报文中的响应行和头

request headers  请求头，可以看请求报文中的请求行和头

qurey string parameters(查询字符串参数)   是将请求报文里行里面的参数解析，以后便于调节一些参数，查看参数是否成功地传递了过去

3、响应体在response里

4、preview是预览，是对响应体解析之后页面的一个预览

#### POST请求

例子：登录，先打开network，然后点击登录之后就会发送请求，实时显示到network里

1、form data是对请求体里面的内容的解析

而不再GET请求对url参数的解析qurey string parameters





## experss框架

```js
// 引入express
const { response } = require('express');
const express = require('express');
const { request } = require('http');

//2.创建应用对象
const app = express();

///3.创建路由规则
//get方法，request,response是形参，可以任意命名；
//request是对请求报文的一个封装，response也是
app.get('/', (request, response) => {
    //设置一个简单的响应,这里是响应报文
    response.send('HELLO EXPRESS')

})

//4.监听端口启动服务，这里代表监听成功
app.listen(8000, () => {
    console.log("服务已启动，8000端口监听中");
})
```

### 端口

端口可以理解成一个服务窗口，只能服务于一个请求，所以想要请求这个端口时，需要将正在使用的上一个关闭。

关闭方法：ctrl+c



## ajax封装

```js

function ajax(options){
    var xhr = null;
    var params = formsParams(options.data);
    //创建对象
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 连接
    if(options.type == "GET"){
        xhr.open(options.type,options.url + "?"+ params,options.async);
        xhr.send(null)
    } else if(options.type == "POST"){
        xhr.open(options.type,options.url,options.async);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            options.success(xhr.responseText);
        }
    }
    function formsParams(data){
        var arr = [];
        for(var prop in data){
            arr.push(prop + "=" + data[prop]);
        }
        return arr.join("&");
    }
 
}
 
ajax({
    url : "a.php",  // url---->地址
    type : "POST",   // type ---> 请求方式
    async : true,   // async----> 同步：false，异步：true 
    data : {        //传入信息
        name : "张三",
        age : 18
    },
    success : function(data){   //返回接受信息
        console.log(data);
    }
})

```

