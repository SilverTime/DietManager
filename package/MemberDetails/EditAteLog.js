/**
 * Created by mooshroom on 2016/3/15.
 */
define([
    'text!../../package/MemberDetails/EditAteLog.html',
    '../../obj/AteLog.js'
], function (html) {
    var vm = avalon.define({
        $id: "EditAteLog",
        ready: function (date,index) {
            //date--时间
            vm.reset()
            pop.open(html)

            if(index==undefined ||MemberDetails.AteLogWeek[index].null){
                //添加固有输入框
                var s = [0, 0, 1, 1, 2, 2]
                for (var i = 0; i < s.length; i++) {
                    vm.addFoodInput(s[i])
                }
            }else{
                //填入已有数据
                var details=MemberDetails.AteLogWeek[index].Details
                for(var x in details){
                    if(x.charAt(0)!="$"){
                        for(var o=0;o<details[x].length;o++){
                            details[x][o].Name=details[x][o].Food.Name
                            vm.foods[x-1].push(details[x][o])
                        }
                    }
                }

            }

            if(date!=undefined){
                //设置时间
                vm.Date=getDateFromTimestamp(date)
            }



        },
        reset: function () {
            avalon.mix(vm, {
                UN:MemberDetails.BaseInfo.Name,
                UID:MemberDetails.BaseInfo.UID,
                Sex:MemberDetails.BaseInfo.Sex,
                foods:[
                    [],
                    [],
                    [],
                ],
            })
        },

        Name:"",
        Sex:0,
        Date:'',
//食物模板
        $food:{
            FoodID: '',
            Weight: 0,
            MealSign: "1",
            MealID: '',
//以下是只需要在界面上显示的
            Name: "",
            Unit: "",
        },
        addFoodInput: function ($index) {
            vm.foods[$index].push(vm.$food)
        },
        delFoodInput: function (list, index) {
            console.log(list)
            list.splice(index, 1)
            if (list.length == 0) {
                list.push(vm.$food)
            }
        },

        foods:[
            [],
            [],
            [],
        ],

        save: function () {
            //加载数据
            var data={
                Date:timeLengthFormat(newDateAndTime(vm.Date),'s'),
                UID:vm.UID,
                Foods:[],
                TargetEnergy:MemberDetails.BaseInfo.goodEnergy
            }
            for(var i=0;i<vm.foods.length;i++){
                for(var o=0;o<vm.foods[i].length;o++){
                    if(vm.foods[i][o].Weight>0){
                        var food={
                            'FoodID':vm.foods[i][o].FoodID,
                            'Weight':vm.foods[i][o].Weight,
                            'MealSign':vm.foods[i][o].MealSign,
                            'MealID':i+1.//早餐
                        }
                        data.Foods.push(food)
                        food={
                            'FoodID':'',
                            'Weight':'',
                            'MealSign':'',
                            'MealID':''//早餐
                        }
                    }else{
                        if ((vm.foods[i][o].FoodID > 0)) {
                            tip.on(vm.foods[i][o].Name + "没有填写重量")
                            return
                        }
                    }

                }
            }
            //验证数据
            if(data.Date==""||data.Date==NaN){
                tip.on('还没有正确选择日期')
                return
            }
            if(data.Foods.length==0){
                tip.on('还没有添加任何的食物')
                return
            }

            $$.call({
                i:"AteLog/add",
                data:data,
                success: function (res) {
                    MemberDetails.getAteLog(0)
                    tip.on('添加成功',1)
                    pop.close()
                },
                error: function (err) {
                    tip.on(err)
                }
            })


        },



    })
    window[vm.$id] = vm
})