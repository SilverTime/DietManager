# 弹出框组件pop使用文档
2016年-03-12 by Chrris

## 功能
* 弹出框
* 带有弹入弹出音效

## 依赖
avalon.js 1.5+

## 使用方式

1. 引入依赖以及pop.js
2. 再插入点插入
```   <tsy:pop config="$optpop"></tsy:pop>  ```
3. 编写配置参数，

```javascript

```

## 实例

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>弹出框组件实例</title>
    <script src="../../src/js/avalon.modern.1.5.min.js"></script>
</head>
<body ms-controller="popDemo">

<tsy:pop config="$optpop"></tsy:pop>
<button onclick="pop.open()">开启</button>
<script>
    avalon.ready(function () {
        require(['../../lib/pop/pop'], function () {
            var vm=avalon.define({
                $id:'popDemo',
                ready: function () {
                    avalon.scan()
                },
                $optpop:{
                    id:'pop',
                    width:"960",
                },
                openPop: function () {
                    require(["text!../../package.json"], function (json) {
                        pop.open(json)
                    })
                }
            })

            window[vm.$id]=vm
            vm.ready()
        })
    })
</script>
</body>
</html>
```


## 配置参数

参数名|说明|类型|必要性
----|----|----
id|所创建出的分页器的名字|number|1
width|弹出框宽度|number|0
openPop|自定义的函数，里面的require按照路径读取html文件或者其他文件，显示在弹出框中|function|1

* 注意页面中对必要的依赖项的路径配置和引入
