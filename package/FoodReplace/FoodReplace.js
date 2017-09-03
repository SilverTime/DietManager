/*
食物替换表 内在灵魂，沉稳坚毅
 生成时间：Thu Nov 17 2016   破门狂人R2-D2为您服务！
*/
define('FoodReplace',[
    'avalon',
    'text!../../package/FoodReplace/FoodReplace.html',
    'css!../../package/FoodReplace/FoodReplace.css',
    '../../lib/find/find.js'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"FoodReplace",
        ready: function (i) {
            vm.reset()
            index.html=html

            //以及其他方法

            if(vm.nowTable==-1){
                vm.getFoodReplace(1)
            }

        },
        reset: function () {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
            })
        },

        //食物替换表列表
        list:[
            '等值谷薯类交换表',
            '等值蔬菜交换表',
            '等值水果交换表',
            '等值大豆交换表',
            '等值奶制品交换表',
            '等值肉蛋类交换表',
            '等值硬果类交换表',
            '等值油脂交换表',
        ],

        //获取食物替换表
        info:[],
        nowTable:-1,
        getFoodReplace: function (id) {

            require(['../../obj/bridge/FoodReplace.js'], function (obj) {
                obj.search({P:1,N:9999999,W:{GID:id}},function(res){
                    vm.info=res.L
                })
            })
            vm.nowTable=id-1
        },

        //查找食物
        FoodID:"",
        Weight:"",
        $findFood:{
            callback: function (res, id) {
                console.log(res)
                vm.FoodID=res.FoodID
                //获得行数
                //var row = id.split("PEEC")[1]
                //填入
                //vm.packs[row].ECID = res.ECID
                //vm.packs[row].ECTitle = res.Title


                //alert(res.Title)
                vm.Weight=''
                document.getElementById('fr_weight_input').focus()
            },
            onInput: function (cvm) {
                vm.FoodID=''
                vm.Weight=''
            },
            target: "FoodDic",
            keyName: 'Name',
            placeholder: "查找食物"
        },

        //添加食物到替换表中
        addFoodToTable: function () {
            if(vm.FoodID==''){
                tip.on('尚未选中要添加的食物')
                return
            }
            if(vm.Weight==''){
                tip.on('尚未添加食物的重量')
                return
            }

            //查看是否已经添加了
            for(var i= 0,l=vm.info;i< l.length;i++){
                if(l[i].FoodID==vm.FoodID){
                    tip.on('该食物已经被添加过了',1)
                    return
                }
            }

            require(['../../obj/bridge/FoodReplace'], function (obj) {
                 var data={
                     GID:vm.nowTable+1,//替换组的组编号
                     FoodID:vm.FoodID,//食物编号
                     Weight:vm.Weight//该替换表中等量替换的质量
                 };
                obj.add(data,function(){

                    //清空添加
                    try{
                        frff.Keywords=''
                    }catch (err){

                    }
                    vm.Weight=''

                    //重新渲染列表
                    vm.getFoodReplace(vm.nowTable+1)
                })
            })
        },

        //从表中删除食物
        delFoodFromTable: function (LID) {
            require(['../../obj/bridge/FoodReplace'], function (obj) {
                obj.del(LID,function(){

                    //重新渲染列表
                    vm.getFoodReplace(vm.nowTable+1)
                })
            })
        }


    })
    window[vm.$id]=vm
})