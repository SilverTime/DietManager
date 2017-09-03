/**
 * Created by mooshroom on 2016/3/15.
 */
define('ReplaceFood', [
    'avalon',
    'text!../../package/EditDiet/ReplaceFood.html',
    'css!../../package/EditDiet/EditDiet.css',
    '../../obj/bridge/FoodReplace.js'
], function (avalon, html,css,obj) {
    var vm = avalon.define({
        $id: "ReplaceFood",
        ready: function (el,foodIndex,mealIndex) {
            if(!el.Replace.GID>0){
                tip.on(el.Name+"暂时没有可替换的食物")
                return
            }


            vm.reset(el,foodIndex,mealIndex)
            //以及其他方法
            pop.open(html)


            vm.getFood(el.Replace.GID)

        },
        reset: function (el,foodIndex,mealIndex) {
            avalon.mix(vm,{
                //targetFood:el,
                foodIndex:foodIndex,
                mealIndex:mealIndex,
                list:[],
            })

            vm.targetFood=avalon.mix({},el)
        },

        GID:"",
        targetFood:{},
        foodIndex:-1,
        mealIndex:-1,

        list:[],
        getFood: function (GID) {
            var data={
                P:1,
                N:99999999999,
                W:{
                    GID:GID
                }
            }
            obj.search(data, function (res) {
                vm.list=res.L
            })
        },

        setFood: function (food) {
            require(['../../obj/bridge/FoodDic'], function (obj) {
                obj.get(food.FoodID, function (res) {
                    var oldFood=EditDiet.foods[vm.mealIndex][vm.foodIndex]
                    var newFood={}
                    res.Weight=vm.targetFood.Weight*(vm.targetFood.Replace.Weight/res.Replace.Weight)
                    ForEach(EditDiet.$food, function (el, key) {
                        if (key.charAt(0) != "$") {
                            newFood[key] = res[key] || EditDiet.$food[key]
                        }
                    })
                    avalon.mix(oldFood,newFood)

                    EditDiet.sum(vm.mealIndex, vm.foodIndex)
                    pop.close()
                })
            })


        },






    })
    return window[vm.$id] = vm
})