#�ϴ���� uploader.js˵���ĵ�
2015��5��19��

---

## ����
* ʵ���ļ���ͼƬ���ϴ�

## ����
avalon.js 1.5+

cache.js

## ʹ�÷�ʽ

* demoҳ���У�

����apiURL
1. ���������Լ�uploader.js
2. �ٲ�������
```javascript
<tsy:uploader config="$opt"></tsy:uploader>```
3. ��д���ò�����

```
$id:"",
$opt:{
   id:""
   },

```

## ʵ��

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>�ϴ����</title>
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


## ���ò���(uploader.js��)

������|˵��|����|��Ҫ��
----|
boxID|�������div��ID|string|��Ҫ
label|�ϴ���ť������|string|��Ҫ
tip|�·���ʾ��Ϣ������|string|��ѡ

* ע��ҳ���жԱ�Ҫ���������·�����ú�����
