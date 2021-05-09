## Web APIs DOM（处理网页的接口）

[TOC]



+++



### 获取对象

<u>（ID，标签名，HTML5，特殊）</u>	

```js
var names = document.getElementByID/TagName/ClassName,querySelector(All)
//返回的是Element对象
console.dir() //打印返回的对象
```

##### 获取body,html

​	1.直接给body或html取个id.class，然后按上面获取

​	2.

```js
//获取body,返回的是对象
document.body
//html
document.documentElement
```



+++



### 事件基础

​	事件源.事件类型 事件处理程序

​	事件类型：onclick,onmouseover(鼠标经过)，onmouseout(离开)



+++



### 操作元素

 <u>（注意以下都是属性）</u>

##### 		改变元素内容：

+ innerText  :不识别标签     去除空格，换行

+ innerHTML：识别   不去除

  ##### 修改元素属性

  ```js
  names.src/href/id/alt/title = ""//直接改属性
  //获取属性（自定义属性）：
  div.getAttribute('id');//获取
  div.setAttribute('id',set);//改变
  div.removeAttribute('id');//移除
  ```

##### 		修改表单属性

​		.value	.type	.checked	.selected	.disabled(按钮禁用)

##### 		样式属性修改

```js
//行内style
div.style.backgroundColor=....
//会覆盖原本的类名，可以写多个类名
div.className='change first'
```



+++



### 节点操作

<u>（获取元素，逻辑性强但兼容性差）</u>

利用节点层次关系获取元素。

+ nodeType：元素1    属性2      文本3
+ nodeName
+ nodeValue



##### 父节点

<u>element</u>.parentNode	找不到父节点就返回空

##### 子节点

<u>element</u>.childNode(节点，空格换行也是节点)

实际开发:<u>element</u>.children(得到子元素节点，各浏览器支持)

<u>element</u>.firstChild(第一个子节点)

<u>element</u>.lastChild(最后一个子节点)

<u>element</u>.firstElementChild(第一个子元素节点)(i9以上支持)

##### 兄弟节点

<u>node</u>.nextSibling（下一个节点）

<u>node</u>.previousSibling（上一个节点）

<u>node</u>.nextElementSibling（下一个元素节点）（ie9以上）（只能封装一个兼容性的函数）

<u>node</u>.previousElementSibling（上一个元素节点）



##### 创造节点

```js
var li = document.creatElement('li');//创建了个节点
//2.添加节点
ul.appendChild(li);//添加在最后面
ul.insertBefore(li,ul.children[0]);//在指定袁旭前面添加
```

```ht
<ul></ul>
```

##### 删除节点

```js
//node.removeChild(child);
ul.removeChild(ul.children[0])
```



##### 三种动态创建元素区别

+ document.write

  ```js
  document.write('<div>123</div>');//会导致页面全部重绘,相当于重新绘制了一个新的文档
  div.innerHTML = ('<a>....') //创建元素,效率较慢（因为是拼接字符串）。可以用数组方式，效率最高。
  //先加入数组里，再把数组转换成字符串
  document.createElement('a') //创建节点
  var div = document.creatElement('div');
  docuemnt.body.appendChild( div );
  ```

  

+ element.HTML

+ document.html



+++

## 事件高级

注册事件，删除事件，DOM事件流，事件对象，阻止事件冒泡，事件委托（代理、委派），常用鼠标事件，常用键盘事件。



##### 注册事件（传统方式和方法监听注册方式）

+ 传统:

  + div.onclick = function(){}
  + 唯一性：只会执行最后一个

+ 方法监听注册方式：、

  + addEventListener()

  ```js
  eventTarget.addEventLister(type,listener,[useCapture])
  //type:click，mouseover，事件类型字符串
  //listener：事件处理函数
  //useCapture布尔值
  btns[1].addEventListener('click',function(){})//可叠加（ie9以上）
  ```

  + addEvent

    ```js
    btns[1].addEvent('onclick',function(){})//可叠加（ie9以前）（了解）
    ```

+ 注册事件兼容性解决问题：封装一个函数



##### 删除事件

```js
elelment.onclick = Null; //传统事件
element.removeEventLister('onclick',functionName(){});//
btns[1].detachEvent('click',functionName(){})//可叠加（ie9以上）
```



##### DOM事件流（从网页中接受事件的顺序）

捕获阶段--当前目标阶段--冒泡阶段

布尔值为true则为捕获阶段，false或者省略时为冒泡阶段。（两个阶段只能处于一个阶段）

有些事件没有冒泡：onblur,onfocus,onouseenter.onmouseleave



##### 事件对象

```js
div.onclick = function(event){};//event事件对象，可以当形参来看
//事件对象 时我们事件的一系列相关数据的集合，跟事件相关的：比如鼠标信息，键盘信息，
//事件对象可以自己命名：event，evt，e
//兼容性处理 e = e || windows.event
```

##### 事件对象的属性与方法：

```js
 console.log(event.target);//返回的是触发事件的对象
console.log(this); //返回的是绑定事件的对象（元素）
e.type

//阻止默认行为：防止跳转，链接
element.addEventLister('click',function(e){
    e.prventDefault();//方法
    e.returnValue;//属性，低版本浏览器
    return false;//没有兼容性问题，只是不会再执行return后面的代码，也只适用于传统的注册方式：a.onclick = function(e)
})

//阻止冒泡：在事件里面添加e.stopPropagation
son.addEventLister('click', function(e){
    alert('son');
    e.stopPropagation();//有兼容性问题
    e.cancleBubble = true;//另一种方法
})
```

##### 事件委托（代理，委派）

不是给每个子节点单独设置事件监听器，而是将事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点

##### 常用的鼠标事件

```js
document.addEventLister('contextmenu', function(e){
    e.preventDefault();//禁用右键菜单
})
document.addEventLister('selectstart', function(e){
    e.preventDefault();//禁止选中文字
})
```

##### 鼠标事件对象

```js
//获取鼠标的坐标
e.clientX;//在可视区的坐标，距离左上的距离
e.clientY;
e.pageX;//距离文档页面的坐标（ie9）
e.pageY;
e.screenX;//距离电脑屏幕
e.screenY;
```

##### 鼠标跟随事件

```js
//鼠标移动事件：mousemove
//在网页中移动，即给document注册事件
//原理：每次移动都获得新的坐标，把坐标作为图片的left 与 top 
document.addElventLister('mousemove', function(e){
    var x = e.pageX;
    var y = e.pageY;
    pic.style.left = x + 'px';
    pic.style.top = y + 'px';
})
```

##### 常用键盘事件

```js
//使用addEventLister不需要加on
onkeyup
onkeydown
onkeypress//不识别功能键
//执行顺序：down,press,up
```

##### 键盘事件对象

```js
e.keyCode
//keyup和keydown不区分大小写
//keypress区分大小写
```

