#上传组件 uploader.js说明文档
2015年5月19日

---

## 功能
* 实现文件和图片的上传

## 依赖
avalon.js 1.5+

cache.js

## 使用方式

* demo页面中：

配置apiURL
1. 引入依赖以及uploader.js
2. 再插入点插入
```javascript
<tsy:uploader config="$opt"></tsy:uploader>```
3. 编写配置参数，

```
$id:"",
$opt:{
   id:""
   },

```

## 实例

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>上传组件</title>
    <script src="../../src/js/avalon.modern.1.5.min.js"></script>
    <script src="../../plugins/cache/cache.js"></script>
</head>
<body ms-controller="starTest">

<tsy:uploader config="$opt"></tsy:uploader>

</body>
<script>
    var apiURL = 'http://picc.weixin.tansuyun.cn/index.php?i=';
    avalon.ready(function () {
        require(['../../lib/uploader/uploader.js'], function () {
            var vm=avalon.define({
                $id:"starTest",
                $opt:{
                    id:"uptest"
                },

            })
            avalon.scan()
        })
    })
</script>

</html>
```


## 配置参数(uploader.js中)

参数名|说明|类型|必要性
----|
boxID|最外面的div的ID|string|必要
label|上传按钮的名称|string|必要
tip|下方提示信息的内容|string|可选

* 注意页面中对必要的依赖项的路径配置和引入
