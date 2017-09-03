# Tip提示组件
mooshroom  2015-6-16

email：<mooshroom@tansuyun.cn>

---
## 功能
1. 在页面上指定位置弹出一个提示框，
1. 可以对提示语进行配置
1. 可以控制提示的样式，持续时间
1. 也可以手动关闭对应的提示框
1. 可以有很多个提示框同时存在，使用不同的额名称分别调用

## 用法
在需要使用的地方编写DOM结构并且引入组件的JS文件，就搞定了，暂时还没有设计多余的配置，所以这里就不用传配置了。

关键部分的代码如下：
```html
<!--关键代码-->
<div ms-widget="tip,tip,$opt"></div>

<script>
    
    //引入组件，引入了就搞定了~
    require(["../../ui/tip/tip.js"],function(){ 
        avalon.scan()
    })

</script>
```
这样就创建了一个提示框组件了，提示组件的调用方法如下：
```javascript
// 开启提示
tip.on(message,type,time)
//message是你要提示出来的语句,需要传字符串，
//type是提示框的类型，1为默认提示框，0为错误提示框，默认为0
//time为提示框的持续时间，默认为15000毫秒

//关闭提示
tip.off(message,type)
//message是你要关闭的语句,需要传字符串，
//type是提示框的类型，1为默认提示框，0为错误提示框，默认为0
```
如果你需要同时有多个提示框例如：
```html
<div ms-widget="tip,tip1,$opt"></div>
<div ms-widget="tip,tip2,$opt"></div>
<div ms-widget="tip,tip3,$opt"></div>
```
要让第一个提示框弹出提示就需要调用```tip1.on()```

要让第二个提示框弹出提示就需要调用```tip2.on()```

要让第三个提示框弹出提示就需要调用```tip3.on()```

这里解释一下```ms-widget="tip,tip1,$opt"```，其中第一个参数*tip*代表这里是一个tip组件，调用tip组件作为原型。第二个参数*tip1*是实际构建出来的提示组件的视图模型VM，第三个是配置，所以，要让第一个提示框弹出提示就要调用```tip1.on()```也就是：**VM名+.on()**

---
demo的代码如下：
```html
<div ms-controller="tipDemo">
    
    <!--关键代码-->
    <div ms-widget="tip,tip,$opt"></div>

    <!--以下都是用户测试用的仪表盘-->
    <h2>提示框使用测试</h2>
    <div class="radio">
        <label>
            <input type="radio" name="optionsRadios"  value="1" checked ms-duplex-string="a">
            来一个普通的提示
        </label>
    </div>
    <div class="radio">
        <label>
            <input type="radio" name="optionsRadios"  value="0" ms-duplex-string="a">
            来一个错误提示
        </label>
    </div>
    要提示的内容：
    <input type="text" class="form-control" ms-duplex="text"/>
    存在的时间长度：
    <input type="number" class="form-control" ms-duplex="time"/>
    <br/>
    <button class="btn btn-primary" ms-click="tipOn">点击弹出提示</button>
    <button class="btn btn-default" ms-click="tipOff">点击关闭提示</button>
</div>
<script>
    
    //引入组件，引入了就搞定了~
    require(["../../ui/tip/tip.js"],function(){
        
        //配置父元素的VM
        var tipDemo=avalon.define({
            $id:"tipDemo",
            $opt:{},
            a:1,
            text:"",
            time:3000,
            tipOn:function(){
                tip.on(tipDemo.text,tipDemo.a,tipDemo.time)
            },
            tipOff:function(){
                tip.off(tipDemo.text,tipDemo.a,tipDemo.time)
            }
        })
        avalon.scan()
    })

</script>
```

## 扩展
你可以对提示组件的样式进行完全的重构，他的DOM结构如下：
```html
<!--提示框-->
<div class="tip" >
    
    <!--默认的提示框-->
    <div ms-repeat="tips" class="tip-info alive-loading">
        <span class="">{{el}}</span>
        <button type="button"  class="close " ms-click="close($index,1)">
            &times;
        </button>

    </div>

    <!--提示错误信息的-->
    <div ms-repeat="tipsError" class="tip-err alive-loading">
        <span class="">{{el}}</span>
        <button type="button" class="close " ms-click="close($index,0)">
            &times;
        </button>

    </div>
</div>
```

只要有ms-repeat="tip"以及{{el}}，其他的都可以随意修改。

其样式也可以随意修改。

食用愉快~