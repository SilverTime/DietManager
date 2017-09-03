/*
 pop 内在灵魂，沉稳坚毅
 生成时间：Fri Mar 11 2016   破门狂人R2-D2为您服务！

 弹出框组件，
 */
define('pop', [
    'avalon',
    'text!../../lib/pop/popAlert.html',
    'css!../../lib/pop/popAlert.css'
], function (avalon, html, css) {
    avalon.component('tsy:pop', {
        $template: html,
        id: "",
        /*
         * ***************参数队列区**************************/
        width: "960",//弹出框宽度
        Status: 0,//弹出框状态值，0为关闭状态，1，介于开启和关闭的状态,2开启状态
        html:"",

        /*
         * ***************函数空位**************************/
        open: function () {

        },
        close: function () {

        },


        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            //var elem = avalon(elem)
            //将参数放入对于的地方
            //try {
            //    if(elem.data('lv')!=undefined){
            //        //vm.lv = elem.data('lv')
            //        //todo 改写上方的'lv'为你想要获取到的值
            //    }
            //} catch (err) {
            //}

            //函数加载区

            /*这个判断内用于解决弹出框有时候不能弹出的问题
            * 问题可能是因为当popAlert.js加载进来并且看到dom里面有调用该组件的地方，但是，没有抓取到其配置，便开始构建组件
            * 之后，正常抓取到配置构建的组件就不能正确的进行avalon的绑定，导致弹出框不能弹出
            *
            * 于是设置下面这个树桩，树桩当然会报undefined，以此阻止该组件的构建，让他在avalon内部出错，
            *
            * 称之为：让没看清路就开跑的兔子撞死在树桩上！
            * */
            if(vm.id==''){
                console.error('兔子撞树上了')
               树桩(duang)
            }

            //开启方法
            vm.open = function (html) {

                document.body.style.overflow = "hidden"
                document.body.style.marginRight="17px"
                var audioElement = document.getElementById(vm.id + "open");

                try{
                    audioElement.volume = 0.2
                    audioElement.load();
                    audioElement.play();
                }catch (err){}
                avalon.nextTick(function () {
                    vm.Status = 2
                })
                vm.html = html
            }

            //关闭方法
            vm.close = function () {
                if(vm.Status==2){
                    vm.Status = 1

                    var audioElement = document.getElementById(vm.id + "close")
                    try{
                        audioElement.volume = 0.2
                        audioElement.load();
                        audioElement.play();
                    }catch (err){}
                }



                setTimeout(function () {
                    vm.Status = 0
                    document.body.style.overflowY = "scroll"
                    document.body.style.marginRight="0px"
                    vm.html = ''
                }, 250)
            }


            if (vm.id != "") {
                window[vm.id] = vm
            }
        },
        $ready: function (vm, elem) {
            ////自我检测
            //vm.Status=-1
            //setTimeout(function () {
            //    if(document.querySelector('.state--1')){
            //        console.info('弹出框构建完成'+vm.id)
            //        vm.close()
            //    }else{
            //        setTimeout(function () {
            //            window.location.reload()
            //        },100)
            //    }
            //},500)

        },


    })
})