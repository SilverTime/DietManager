# ���������
Twilbeter  2015-10-17

email��<1554136322@qq.com>

---
## ����
1. ��ҳ������ʾһ��������
1. ���ƽ��ȵĿ�ʼ
1. ���ƽ��ȵ���ͣ
1. �ؽ�������ɵ�100%
1. �������ý�����Ϊ���״̬

## �÷�
����Ҫʹ�õĵط���дDOM�ṹ�������������JS�ļ�����ʱû����ƶ�������á�

�ؼ����ֵĴ������£�
```html
<!--�ؼ�����-->
<div ms-widget="progressbar,progressbar,$opt"></div>

<script>

    //�������
    require(["../../ui/progressbar/progressbar.js"],function(){
            avalon.scan();
    });


</script>
```
�����ʹ�����һ������������ˣ�����ĵ��÷������£�
```javascript
// ����
progressbar.startT();

//��ͣ
progressbar.pauseT();

//�ɹ�
progressbar.endT();

//����
progressbar.resetT();

```

---
demo�Ĵ������£�
```html
<div ms-controller="ptest">
    <div class="content" ms-controller="ptest">
        <div ms-widget="progressbar,progressbar,$opt"></div>
        <h2>����</h2>
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button ms-click="startp">��ʼ/����</button>
        <button ms-click="pausep">��ͣ</button>
        <button ms-click="endp">�ɹ�</button>
        <button ms-click="resetp">����</button>
    </div>
</div>
<script>
    //�������
    require(["../../ui/progressbar/progressbar.js"],function(){
        //��Ԫ��VM
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

## ��չ
����ԶԹ������������ʽ������ȫ���ع�������DOM�ṹ���£�
```html
<!--������-->
<div class="progressbar">
    <div class="barprog" ms-duplex="present" ms-css-width="{{present}}%"></div>
</div>
```
progressbarΪ��ɫ��������ʽ��barprogΪ��ɫ�ӽ�������ʽ��
ms-duplex="present"�Լ�ms-css-width="{{present}}%"�����޸ģ������ļ���ʽ�����޸ġ�