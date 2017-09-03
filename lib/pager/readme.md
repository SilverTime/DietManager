#分页组件pager使用文档
2016-01-19 by mooshroom

mail:<mooshroom@tansuyun.cn>

---
## 功能
在界面上构建一个栏试分页器
## 依赖
avalon.js 1.5+
## 使用方式

1. 引入依赖以及pager.js
2. 再插入点插入```<tsy:pager config="$opt"></tsy:pager>```
3. 编写配置参数，

实例：

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>分页组件实例</title>
    <script src="../../src/js/avalon.modern.1.5.min.js"></script>
</head>
<body ms-controller="pagerDemo">

第{{page}}页
<tsy:pager config="$opt"></tsy:pager>

<script>
    avalon.ready(function () {
        require(['../../lib/pager/pager'], function () {
            var vm=avalon.define({
                $id:'pagerDemo',
                ready: function () {
                    avalon.scan()
                },
                page:"",
                $opt:{
                    id:"pagerTest",
                    P:1,
                    N:12,
                    T:1500,
                    showPage:10,//显示多少页
                    getList: function (p) {
                        vm.page=p
                    }
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

参数名|说明|类型|默认值|必要性
----|----|----
id|所创建出的分页器的名字|number|pager|T
P|当前页码|number|1|
N|每页显示的条目数量|number|1|T
T|总共条目数|number|0|
showPage|分页按钮的最大个数|number|8|
getList|点击页码之后所触发的方法，用于调用接口获取列表内容|function||T|

## 其他注意事项
再获取到列表之后（调用接口后，后端返回数据触发回调函数）需要将获取到的T值（条目总数）和P值，赋值给分页器内的T和P，然后执行分页器内的build方法，这样才能保障分页的准确性，非常重要！