#��ҳ���pagerʹ���ĵ�
2016-01-19 by mooshroom

mail:<mooshroom@tansuyun.cn>

---
## ����
�ڽ����Ϲ���һ�����Է�ҳ��
## ����
avalon.js 1.5+
## ʹ�÷�ʽ

1. ���������Լ�pager.js
2. �ٲ�������```<tsy:pager config="$opt"></tsy:pager>```
3. ��д���ò�����

ʵ����

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>��ҳ���ʵ��</title>
    <script src="../../src/js/avalon.modern.1.5.min.js"></script>
</head>
<body ms-controller="pagerDemo">

��{{page}}ҳ
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
                    showPage:10,//��ʾ����ҳ
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

## ���ò���

������|˵��|����|Ĭ��ֵ|��Ҫ��
----|----|----
id|���������ķ�ҳ��������|number|pager|T
P|��ǰҳ��|number|1|
N|ÿҳ��ʾ����Ŀ����|number|1|T
T|�ܹ���Ŀ��|number|0|
showPage|��ҳ��ť��������|number|8|
getList|���ҳ��֮���������ķ��������ڵ��ýӿڻ�ȡ�б�����|function||T|

## ����ע������
�ٻ�ȡ���б�֮�󣨵��ýӿں󣬺�˷������ݴ����ص���������Ҫ����ȡ����Tֵ����Ŀ��������Pֵ����ֵ����ҳ���ڵ�T��P��Ȼ��ִ�з�ҳ���ڵ�build�������������ܱ��Ϸ�ҳ��׼ȷ�ԣ��ǳ���Ҫ��