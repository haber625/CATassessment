# sass

[TOC]



## 变量

### scss

```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $slightBlue;
  color: $primary-color;
}
```

### css

编译后：

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```



## 嵌套

Sass使可以按照与HTML相同的视觉层次结构嵌套CSS选择器。注意，过度嵌套的规则会导致CSS资格过高，这可能难以维护，通常被认为是不好的做法。

### scss

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

### css

编译后：

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```



## Modules

不必将所有Sass都写在一个文件中。您可以根据需要将其拆分`@use`。该规则将另一个Sass文件作为*模块*加载，这意味着您可以在Sass文件中使用基于文件名的命名空间引用其变量，[mixins](https://sass-lang.com/guide#topic-6)和[函数](https://sass-lang.com/documentation/at-rules/function)。使用文件还将在编译输出中包含它生成的CSS！

### scss

```scss
// _base.scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

### css

编译后：

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

请注意，我们正在使用`@use 'base';`中`styles.scss`的文件。使用文件时，不需要包括文件扩展名。



## Mixins

### 说明

CSS中的某些内容编写起来有些繁琐，尤其是使用CSS3 和存在的许多供应商前缀时。使用mixin，您可以创建要在整个站点中重复使用的CSS声明组 。您甚至可以传递值以使混入更加灵活。mixin的很好用法是用于供应商前缀。

要创建一个mixin，您可以使用`@mixin`指令并为其命名。我们将其命名为mixin `transform`。我们还在`$property`括号内使用了变量 ，因此我们可以传递任何所需的变换。创建混入之后，您可以将其用作CSS 声明`@include`，以混入的名称开头。

### scss

```
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}
.box { @include transform(rotate(30deg)); }
```

### css

```
.box {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
```



## 扩展/继承

### 说明

+ 这是Sass最有用的功能之一。使用`@extend`使您可以将一组CSS属性从一个选择器共享到另一个选择器。它有助于使Sass保持非常干燥。在我们的示例中，我们将使用扩展，占位符类一起使用的另一个功能，为错误，警告和成功创建一系列简单的消息传递。占位符类是一种特殊的类，仅在扩展时才打印，并且可以帮助使编译后的CSS保持整洁。

+ 什么上面的代码的作用是告诉`.message`，`.success`，`.error`，和`.warning`做人一样`%message-shared`。这意味着任何地方`%message-shared`显示出来，`.message`，`.success`，`.error`，和 `.warning`也会这样做的。魔术发生在生成的CSS中，这些类中的每个类将获得与相同的CSS属性`%message-shared`。这有助于您避免在HTML 元素上编写多个类名。

+ 除了Sass中的占位符类之外，您还可以扩展大多数简单的CSS选择器，但是使用占位符是确保不扩展嵌套在样式中其他位置的类的最简单方法，这可能会导致CSS中的意外选择器 。

+ 请注意，不会生成CSS in `%equal-heights`，因为`%equal-heights`它不会被扩展。

### scss

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```



## Operators

### 说明

在CSS中进行数学运算非常有帮助。萨斯拥有标准的数学运算符，例如屈指可数`+`，`-`，`*`，`/`，和`%`。在我们的示例中，我们将做一些简单的数学运算来计算`aside` ＆的 宽度`article`。

我们创建了一个非常简单的基于960px的流体网格。Sass中的操作使我们可以做一些事情，例如获取像素值并将其转换为百分比而没有太多麻烦。

### SCSS 

```scss
.container {
  width: 100%;
}

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

### css

```css
.container {
  width: 100%;
}

article[role="main"] {
  float: left;
  width: 62.5%;
}

aside[role="complementary"] {
  float: right;
  width: 31.25%;
}
```