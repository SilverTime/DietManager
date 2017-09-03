# find组件使用说明
---

mooshroom@tansuyun.cn 2016.08.17

## 调用方式

1. 引入find.js
2. 在需要构建组件的地方插入标签：
```html
<tsy:find config="$opt1"></tsy:find>
 ```
3. 传入配置

## 配置
配置项有2个必传参数：
1. callback  选中列表项后的回调函数
2. target     要进行动态查询的对象名称

例如：

```javascript
$opt1: {
    callback: function (res) {
        alert(res.Title)
    },
    target:"Community"
},
 ```
如果是区域搜索，则传入target为Community，注意首字母大写，如果是收件人查询，则传入Receiver。
## 列表模版
对不同的对象进行搜索，因为对象字段的不同，需要编写不同的列表模版，将编写好的模版列表以target的值同样的名称保存与find文件夹内。

例如：
1. Community.html
```html
<!--列表-->
<div class="l-s-i" ms-repeat="list"
     ms-class="now-active:active==$index"
     ms-click="select($index)" ms-on-hover="hover($index)">
    {{el.Title}}
</div>
<div>
    <a style="cursor: pointer" ms-click="add">没有找到？新加一个</a>
</div>

 ```
2. Receiver.html
```html
<table class="table" style="margin-bottom: 0px">
    <thead>
    <tr>
        <td>
            电话号码
        </td>
        <td>
            名称
        </td>
    </tr>
    </thead>
    <tbody>
    <tr class="l-s-i"
        ms-repeat-el="list" ms-class="now-active:active==$index"
        ms-click="select($index)" ms-on-hover="hover($index)">
        <td>
            {{el.Phone}}
        </td>
        <td>
                    <span ms-repeat-el="el.Names">
                        <span ms-if="$index>0">、</span>
                        {{al.Name}}
                    </span>
        </td>
    </tr>
    </tbody>
</table>

 ```

现已编写好区域搜索的和收件人搜索的列表模版，其他的模版编写参照这两个来写