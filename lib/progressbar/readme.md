# 进度条组件
Twilbeter  2015-10-17

email：<1554136322@qq.com>

---
## 功能
1. 在页面上显示一个进度条
1. 控制进度的开始
1. 控制进度的暂停
1. 控进度条完成到100%
1. 可以重置进度条为最初状态

## 用法
在需要使用的地方编写DOM结构并且引入组件的JS文件，暂时没有设计多余的配置。

关键部分的代码如下：
```html
<!--关键代码-->
<div ms-widget="progressbar,progressbar,$opt"></div>

<script>

    //引入组件
    require(["../../ui/progressbar/progressbar.js"],function(){
            avalon.scan();
    });


</script>
```
这样就创建了一个进度条组件了，组件的调用方法如下：
```javascript
// 开启
progressbar.startT();

//暂停
progressbar.pauseT();

//成功
progressbar.endT();

//重置
progressbar.resetT();

```

---
demo的代码如下：
```html
<div ms-controller="ptest">
    <div class="content" ms-controller="ptest">
        <div ms-widget="progressbar,progressbar,$opt"></div>
        <h2>测试</h2>
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button ms-click="startp">开始/继续</button>
        <button ms-click="pausep">暂停</button>
        <button ms-click="endp">成功</button>
        <button ms-click="resetp">重置</button>
    </div>
</div>
<script>
    //引入组件
    require(["../../ui/progressbar/progressbar.js"],function(){
        //父元素VM
        var ptest = avalon.define({
            $id:"ptest",
            $opt:{},
            startp:function(){
                progressbar.startT();
            },
            pausep:function(){
                progressbar.pauseT();
            },
            endp:function(){
                progressbar.endT();
            },
            resetp:function(){
                progressbar.resetT();
            }
        });
        avalon.scan();
    });
</script>
```

## 扩展
你可以对滚动条组件的样式进行完全的重构，他的DOM结构如下：
```html
<!--滚动条-->
<div class="progressbar">
    <div class="barprog" ms-duplex="present" ms-css-width="{{present}}%"></div>
</div>
```
progressbar为灰色进度条样式，barprog为蓝色子进度条样式。
ms-duplex="present"以及ms-css-width="{{present}}%"不能修改，其他的及样式可以修改。