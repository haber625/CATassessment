## 基本语句

[TOC]

### 输入输出语句

+ alert(msg)：弹出警示框
+ console.log(msg)：浏览器控制台打印输出信息
+ prompt(info)：浏览器弹出输入框，用户可以输入



### 变量

本质是程序在内存中申请的一块用于存放数据的空间。

```js
//声明变量
var age;//名字叫age
//赋值
age = 10;
//输出结果
console.log(age);
var name = '名字';
console.log(name);
```

不声明直接赋值可以使用，但是是全局变量；

```js
name = 'myname';
```



### 规范

+ 区分大小写
+ 字母，数字，$，_
+ 不以数字开头
+ 驼峰命名：开头小写后面单词大写 
+ 一般不用name
+ temp临时变量



### 数据类型

JS是一种弱类型或者说动态语言，意味着不用提前声明变量类型，在程序运行过程中，类型会自动被确定。但是是可以变化的。

#### 简单数据类型

##### Number



##### Boolean：布尔值：true,false 等价于1,0



##### String

```js
转义符：
\n换行
\\斜杠\;同理' ""
\t tab缩进
\b blank空格

1、length属性测量字符串长度：
	console(str.length);
2、字符串拼接+：
	console('字符'+'拼接')//只要有字符串参与拼接，那么结果就是字符型
```



##### Undefined

```js
console.log(undefined + 1)=NaN
```



##### Null

```js
console.log(Null + 1)=1;
```

Number.MAX-VALUE  /   Number.MIN-VALUE

infinity    -infinity   

NaN = Not a Number

```js
console=(isNaN(12)）如果是数字，返回flase,否则返回teuw
```

#### 获取数据类型

```js
console.log(typeof var);
prompt取过来的值是字符型
数字蓝色 字符黑色 ...
```



#### 数据类型转换

<u>（转换为字符串，数字，布尔型）</u>



##### 转换为字符型

```js
var num = 10;
//1.
var str = num.toString();
//2.
console.log(String(num));
//3.常用
console.log('' + num);
```



##### 转换为数字型

```js
var age = prompt('请输入')；
//1.转换为整数
console.log(parseInt(age));//120px会直接去掉px
//2.小数型
console.log(parseFloat(age));
//3.强制转换
Number(age);
//4.隐式转换 - / *(+特殊，用作字符范围)
'12'-0
```



##### 转换为布尔值

```js
//1.Boolean()函数,空的否定的转换为flase
console.log(Boolean(age));
```



#### 编译型语言与解释性语言

编译型：执行前需编译；

解释型：解释一句，执行一句；



##### 标识符 关键字 保留字

标识符：取的名字

保留字：预留的关键字



##### alert输出带换行

1、\n要放引号里

2、用+连接

3、变量记得不要加引号

```js
alert('姓名：' + name + '\n' + '年龄：' + age + ' \n' + '性别：' + sex);

```



## 运算符

<u>（算数、递增递减、比较、逻辑、赋值）</u>



#### 算数：+ - * / % 

直接浮点运算精度低

```js
console.log(num == 3);
```



#### 递增递减

```js
num++ ++num 
```



#### 比较

```js
< > >= <= == != 

== 默认转换数据类型   字符型转换为数字型

!==        === (全等，要求数据和数据类型都一样)
```



#### 逻辑

&&    ||   ！

短路、中断：如果左边能确定结果，则不运算右边

```js
console.log(123 && 456);//表达1为真，则返回表达式2
console.log(0 && 456);//表达1为假，则返回表达式1
```

```js
console.log(123 || 456);//表达1为真，则返回表达式1
console.log(0 || 456);//表达1为假，则返回表达式2
```



#### 赋值运算符

=  +=   -=    *=   /=   %=



#### 优先级

> ()
>
> ++  --  ！ （一元）
>
> */+-
>
> < > >= <=
>
> == !=  !==    ===
>
> 先&&  后||
>
> =
>
> ，



+++

## JS流程控制-分支

<u>（if，switch，三元表达式）</u>

流程结构：顺序结构，分支结构，循环结构



#### 分支流程(if/switch)

```js
if (条件表达式) {
    //执行语句
}
```



#### 三元表达式（？ ：）

```js
条件表达式 ？ 返回值1 ：返回值2 ;
```



#### switch

```js
switch(表达式) {
    case 1:  ;break;//num 的值 和 case 的值是===相等
    case 2:  ;break;
    case 3:  ;break;
    case 4:  ;break;
    case 5:  ;break;
    default: 无匹配结果 ;break;
}
```



#### 循环

```js
for(var i = 1; i<100; i+++){}
```



#### 断点调试

Sourses设置断点





## 数组

```js
var name['', '', '' ]//可以是任何类型,逗号分隔
var arr = new Arrary();//利用new关键字
数组名.length//数组长度
```



#### 新增数组元素

```js
var arr = ['''']
arr.length = 5;
```

```js
function 函数名(){
    prompt
}//封装了一段代码，不执行
函数名();//调用，此时才执行
```

+ 若实参多于形参：多出的形参不参与
+ 实参少于形参：多出的形参定义为undefined

```js
console.log(函数名());//return返回值
return num1,num2;//只返回最后一个
return [a,b,c];//通过数组返回多个数
没有return ,返回undefined;
```



#### arguements(存储了所有实参，伪数组)

+ 具有数组length属性
+ 按照索引方式存储[0][1]
+ 没有真正数组的一些方法

```js
//函数声明
//1,命名函数
function arr(){
    
} 
//匿名函数
var fun = function(){//fun是变量名，也可以传递参数
    
}
```



+++

## 作用域

（es6以前）：

+ 全局作用域：
+ 局部作用域：在函数内部

（es6）：才有块级作用域，花括号内的变量，现阶段话括号内的变量可以看作全局变量。

#### 变量

+ 全局变量
+ 局部变量：在函数内部没有声明而直接赋值的变量也是全局变量

+ 全局变量：浏览器关闭才会销毁；局部变量在函数执行完后便销毁，效率高。

#### 作用域链

+ 内部函数可以访问外部函数的变量
+ 就近原则

+++

#### 预解析

JS解析器：首先预解析，而后执行代码

JS引擎会把js里所有的var与function提升到当前作用于的最前面

+ 变量预解析：只提升声明，不提升赋值；var arr = 10；
+ 函数预解析：只提升声明，不调用函数

+++

## 对象

（对象由属性，方法(行为、动词)组成）

#### 字面量创建对象

```js
var obj = {
    uname: '',
    age: 18,
    say: function(){
        console.log(hi~)
    }
}//调用comsole.log(obj.uname);
   // comsole.log(obj['uname']);
    //obj.say();别忘记加小括号；
```

#### newObject创建对象

```js
var obj = new Object();
obj.uname = 'haber';
obj.major = 'computer';
obj.age = 18;
```

#### 利用构造函数创建对象

（因为前两种方法一次只能创建一个对象）

```js
function 构造函数名(){  //函数名首字母要大写
    this.属性 = 值;
    this.方法 = function(){}
}

function Stu(uname,age,sex){
    this.unane = uname;
    this.age = age;
    this.sex = sex;
}
var Stu1 = new Stu('haber',18,'女');//调用函数
var Stu1 = new Stu('lihua',19,'男');
```

#### 遍历对象

for...in 遍历对象

```js
//for(变量 in 对象){}
for (var k in Stu){
    console.log(k);//k 变量输出 得到的是 属性名
    console.log(Stu[k]);
}
```



## 内置对象



#### Math对象

math数学对象，不是一个构造函数，所以不需要new来调用，而是直接使用里面的属性与方法

```js
console.log(Math.PI);//圆周率
console.log(Math.max(11,22,33,44));//里面只能是数字，否则结果为NaN，没有参数的情况下返回-infinity
Math.floor()//向下取整
Math.ceil()//向上取整
Math.round//四舍五入
Math.abs()//绝对值
```

#### 封装自己的数学对象

```js
var mtMath = {
    PI:4.141592653,
    max:function(){
        var max = arguments[0];
        for(var i=1;i<arguments.length;i++){
            if(arguments[i]>max){
                max = arguments[i];
            }
        }
        return max;
    }
}
```

#### 随机数方法random()

```js
Math.random()//返回一个随机的小数[0,1)
function getRandom(min,max){
    Math.floor(Math.radom()*(max-min + 1))+ min;//两个数之间的随机整数
}
```

##### 随机点名

```js
var arr = ['lihua','limin','zhangsan','lisi'];
console.log(arr[getRandom(0,arr.length - 1)])
```



#### data对象

构造data对象，通过构造一个函数来构造，没有参数时返回的是当下的时间

```js
var data1 = new Data();
```

而有参数时，可以在参数里写日期，有字符型的表达与数字型的

```js
var data2 = new Data('2021-5-9 14:04:10');//这是字符型的
var data3 = new Data(2021, 5, 01);//数字型，但是返回的会是2021年6月1号
```

