# ���������popʹ���ĵ�
2016��-03-12 by Chrris

## ����
* ������
* ���е��뵯����Ч

## ����
avalon.js 1.5+

## ʹ�÷�ʽ

1. ���������Լ�pop.js
2. �ٲ�������
```   <tsy:pop config="$optpop"></tsy:pop>  ```
3. ��д���ò�����

```javascript

```

## ʵ��

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>���������ʵ��</title>
    <script src="../../src/js/avalon.modern.1.5.min.js"></script>
</head>
<body ms-controller="popDemo">

<tsy:pop config="$optpop"></tsy:pop>
<button onclick="pop.open()">����</button>
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


## ���ò���

������|˵��|����|��Ҫ��
----|----|----
id|���������ķ�ҳ��������|number|1
width|��������|number|0
openPop|�Զ���ĺ����������require����·����ȡhtml�ļ����������ļ�����ʾ�ڵ�������|function|1

* ע��ҳ���жԱ�Ҫ���������·�����ú�����
