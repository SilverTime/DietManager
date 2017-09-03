/*
 switch 内在灵魂，沉稳坚毅
 生成时间：Wed Sep 28 2016   破门狂人R2-D2为您服务！
 */
define('switch',[
    'avalon',
    'text!../../lib/switch/switch.html',
    'css!../../lib/switch/switch.css'
], function (avalon, html, css) {
    return avalon.component('tsy:switch', {
        $template: html,
        id:"",
        /*
        * ***************参数队列区**************************/
        nowVal:'left',
        nowSide:"",
        left:{
            label:"左边",
            value:"left"
        },
        right: {
            label:"右边",
            value:"right"
        },
        height:'25px',
        callback: function (value) {

        },


        /*
         * ***************函数空位**************************/
        toggle: function (value) {

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
            vm.toggle= function (value) {
                if(value!=='auto'){
                    if(value==vm.left.value){
                        vm.nowSide='left'
                        vm.callback(value,vm)
                    }else if(value==vm.right.value){
                        vm.nowSide='right'
                        vm.callback(value,vm)
                    }else{
                        console.log('开关组件参数传入错误:'+value);
                    }
                    return
                }

                if(vm.nowSide=='left'){
                    vm.nowSide='right'
                    vm.callback(vm.right.value,vm)
                }else if(vm.nowSide=='right'){
                    vm.nowSide='left'
                    vm.callback(vm.left.value,vm)
                }

            }

            if(vm.id!=""){
                window[vm.id]=vm
            }
        },
        $ready: function (vm, elem) {
            vm.toggle(vm.nowVal)
        },


    })
})