# 总结

[TOC]

（创建 XMLHttpRequest对象——>打开请求地址，初始化数据——>发送请求数据——>监听回调函数状态——>收到服务器返回的应答结果。）

## 设置接口

```js
    <script src="http://code.jquery.com/jquery-latest.js"></script>
	let baseUrl = "http://www.rushmc.top/api/";//写在js文件里

```

onclick时执行函数

## 设置formdata对象

```js
//[设置formdata对象]post请求参数需要form-data对象,FormData对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据
let userInform = new FormData(); 

```

## 接收内容

```js
//接受输入的内容并且转换为字符串
userInform.append("username", document.getElementById('username').value);
```

## 建立XMLHttpRequest对象

```js
//建立请求对象
let xml_http = new XMLHttpRequest();
//IE5，IE6
var = new ActiveObject("mircrosoft.XMLHTTP");

//兼容
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

```

## 向服务器发送请求

```js
//初始化一个请求，创建一个新的http请求（请求方法，请求的URL地址/添加唯一ID，异步）
xml_http.open("POST", baseUrl + "register", true);
//将请求发送到服务器。
xmlhttp.send();
```

## 设置请求头

```js
//如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
xmlhttp.open("POST","ajax_test.asp",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Bill&lname=Gates");
```



## 发送请求

```js
//发送请求
xml_http.send(userInform);
```

## 

## URL-服务器上的文件

open() 方法的 *url* 参数是服务器上文件的地址：

```
xmlhttp.open("GET","ajax_test.asp",true);
```

该文件可以是任何类型的文件，比如 .txt 和 .xml，或者服务器脚本文件，比如 .asp 和 .php （在传回响应之前，能够在服务器上执行任务）。

## 服务器响应

如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。

| 属性         | 描述                       |
| :----------- | :------------------------- |
| responseText | 获得字符串形式的响应数据。 |
| responseXML  | 获得 XML 形式的响应数据。  |

```js
//服务器响应，onreadystatechange = function()主要告诉服务器数据返回后应该怎么处理
xml_http.onreadystatechange = function () {
	if (xml_http.readyState === 4 && xml_http.status === 200) { //4表示解析完毕,200为正常返回
     //将值转化为js对象，JSON.parse
     let users = JSON.parse(xml_http.responseText);
     if (users.code === 200) {
         console.log(users.msg)
     } else {
         console.log(users.msg)
     }
 }
}

```







#学习时笔记

```js
  //   建立请求对象实例
let http = new XMLHttpRequest();
http.open("GET", baseUrl + "dynamicState/select/" + value, true);
```

```js
 //     设置请求头
 http.setRequestHeader("Content-type", "application/json; charset=utf-8");
```

```js
//     get方法可以不用写send的参数,参数已经拼接在url上
http.send();
```

```js
//     onreadystatechange相当于一个事件，当服务器有响应的时候就会触发这个方法
http.onreadystatechange = function () {
```

```js
if (http.readyState === 4 && http.status === 200) {
  //             此时这个返回的数据是个字符串，我们需要调用JSON.parse方法把他转成js对象才能够操作
  let res = JSON.parse(http.responseText);
  //             成功对应做成功的业务逻辑，失败对应做失败的业务逻辑
  if (res.code === 200) {
    console.log(res);
  } else {
    console.log(res);
```



##异步与同步

+ 如果选择异步方式即Async为true（推荐的），那么XMLHttpRequest对象的readyState每次发生变化，都会触发onreadystatechange事件，可以通过readyState和status的值来判断进行到哪一阶段，结果如何。
+ 如果选择同步方式即Async为false（不推荐），那么就不用为onreadystatechange事件绑定什么处理函数，因为只有当成功或者获得结果的时候才会进行下一步操作，此时readyState必定为4。



## ajax跨域（一般通过CORS解决）

简单请求：1.请求方法是POST,GET，HEAD  

​					2.http头信息不超出以下字段：Accept,Accept-Language,Content-Language,Last-Event-ID,

​						Content-Type(multipart/formdata  text/plain  application/x-www-form-unlencoded)

+ No　＇Access－Control－Allow－Origin＇header　is　present　ｏｎ　ｔｈｅ　requested　resource

  404：服务器端后台接口没有循序OPTIONS请求

  ４０５：后台允许了OPTIONS，但配置文件中阻止了OPTIONS：后台关闭对应的安全配置。

  ２００．．．．．



## GET与POST

+ 传递数据的方式不同：get是直接把请求数据放在url的后面，是可见的，post的请求数据不会显示在url中，是不可见的。

+ 数据长度和数据类型的差异：get有数据长度的的限制，且数据类型只允许ASCII字符，post在这两方面都没有限制。
+ get使用较方便，适用于页面之间非敏感数据的简单传值，post使用较为安全，适用于向服务器发送密码、token等敏感数据。



## formdata与json

Content-Type 标头告诉客户端实际返回的内容的内容类型。

> application/json： JSON数据格式
>
> multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式

**different:**从前端传来的都是二进制数据,但是json已经序列化好了，而formdata还是需要进行处理.

**multipart/form-data**：既可以上传**文件**等二进制数据，也可以上传**表单键值对**，只是最后会转化为一条信息；

**application/json**： JSON数据格式，将数据进行序列化的一种方式，后端可以直接使用。



# 遇到的问题

+ 无法传入username,password等，都是undefined:

  要使用提供的参数来设置（username，password，name，phone）

+ 无论是使用原生的JavaScript，还是JQ，通过Ajax请求后端程序数据，返回的数据默认是字符串

+   xmlhttp.open("POST", baseUrl + "dynamicState/select/" + value, true);其中的地址 <u>baseUrl + "dynamicState/select/" + value</u>？：

  ajax请求中url的三种写法

  1.绝对路径

  2.相对路径

  > 如果请求路径以根路径开头（常见），则无论什么ajax在什么页面，该请求都是相对于服务器的根路径，最后的请求路径都是：http://localhost:8080 +  /request/ajaxtest（url地址)
  >
  > 如果请求不以根路径开头，则该请求路径是相对于当前html所在的路径的。
  >
  > > 假如请求在A页面（ .../webname/index.html）
  > >
  > > 假如请求在B页面（.../webname/test/test.html）
  > >
  > > 最终的请求路径是：http://localhost:8080/**webname/test**/request/ajaxtest。 因为test.html页面对应的路径是“/webname/test/”，所以将url要跟在test这一级下面。

  



