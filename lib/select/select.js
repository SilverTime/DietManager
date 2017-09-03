/**
 * Created by mooshroom on 2016/1/6.
 */
define('select', [
    'avalon',
    'text!../../lib/select/select.html',
    'css!../../lib/select/select.css',
    'css!../../src/css/bootstrap.css'
    //'css!../../src/css/font-awesome.min.css'
], function (avalon, html, css, font) {
    avalon.component('tsy:select', {
        $template: html,
        id:"",
        list:[],
        radioBox:false,
        allChecked:false,
        $init: function (vm, elem) {
            ////主动读取配置
            //var elem = avalon(elem)
            ////将参数放入对于的地方
            //try {
            //    if(elem.data('lv')!=undefined){
            //        vm.lv = elem.data('lv')
            //    }
            //} catch (err) {
            //}

            if(vm.id!=""){
                window[vm.id]=vm
            }

            vm.select= function (i) {

                if(vm.radioBox){
                    for(var o=0;o<vm.list.length;o++){
                        vm.list[o].checked=false
                    }
                }

                if(i=='all'){                   //全选还是全不选
                    if(vm.allChecked){//false
                        for(var p= 0;p<vm.list.length;p++){//遍历所有
                            vm.list[p].checked=false;    //checked状态设为false，全不选

                        }
                    }else{//true
                        for(var l= 0;l<vm.list.length;l++){
                            vm.list[l].checked=true

                        }
                    }
                }else{                           //复选：点哪个，哪个的状态就相反
                    vm.list[i].checked=!vm.list[i].checked
                }


                if(vm.radioBox){
                    var item={},poto=vm.list[i]
                    for(var x in poto){
                        if(x.charAt(0)!="$"){
                            item[x]=poto[x]
                        }
                    }

                        vm.callback(item);
                    return
                }

                var checkedNum=0;
                var checks=[];
                for(var i= 0;i<vm.list.length;i++){
                    if(vm.list[i].checked){
                        checkedNum++;//统计选中的数量
                        checks.push(vm.list[i]); //把选中的按钮放入数组中
                    }
                }
                if(checkedNum==vm.list.length){//如果都放进来了，根据结果，重新设置状态
                    vm.allChecked=true;
                }else{
                    vm.allChecked=false;
                }


                vm.callback(checks);

                return checks;
            }



        },
        $ready: function (vm, elem) {

        },

        callback: function () {

        },

        select: function () {

        }




    })
});