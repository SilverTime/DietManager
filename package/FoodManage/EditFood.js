/**
 * Created by mooshroom on 2016/11/24.
 */
define('EditFood',[
    'avalon',
    'text!../../package/FoodManage/EditFood.html',
    '../../obj/bridge/FoodDic.js',
], function (avalon, html, obj) {
    var vm=avalon.define({
        $id:"EditFood",
        ready: function (foodIndex) {
            pop.open(html)
            vm.reset()

            if(foodIndex===undefined){
                //添加食物
            }else{
                //编辑食物
                vm.foodIndex=foodIndex
                //填充食物数据
                var food=FoodManage.list[foodIndex]
                ForEach(food, function (el,key) {
                    if(typeof el=="object"||key.charAt(0)=='$'){
                        return
                    }
                    vm[key]=el
                })

            }




        },
        reset: function () {
            //获取食物类型

            avalon.mix(vm,{
                foodIndex:"",
                foodTypes: [
                    {
                        TypeID: "",
                        foodTotal: 0,
                        icon: "",
                        color: "",
                        Name: "",
                        TargetWeightMin: "",
                        TargetWeightMax: "",
                        wanting: false,
                        want: [0, 0, 0],
                        mealTotal: [0, 0, 0]
                    },
                ],
                TypeList:[],
                Name: "",
                FoodID:"",
                TypeID: 0,
                Energy: "",
                Unit: 'g',
                Water: 0,
                Protein: 0,
                Fat: 0,
                CHO: 0,
                DF: 0,
                VA: 0,
                VB1: 0,
                VB2: 0,
                Niacin: 0,
                VE: 0,
                Na: 0,
                Ca: 0,
                Fe: 0,
                VC: 0,
                CH: 0,
                Eatable: 0,
                Sort:0,
            })
            vm.foodTypes = avalon.mix([], foodTypes)
        },

        foodTypes: [
            {
                TypeID: "",
                foodTotal: 0,
                icon: "",
                color: "",
                Name: "",
                TargetWeightMin: "",
                TargetWeightMax: "",
                wanting: false,
                want: [0, 0, 0],
                mealTotal: [0, 0, 0]
            },
        ],
        //添加变量
        foodIndex:'',
        FoodID:"",
        Name: "",
        TypeID: 0,
        Energy: "",
        Unit: 'g',
        Water: 0,
        Protein: 0,
        Fat: 0,
        CHO: 0,
        DF: 0,
        VA: 0,
        VB1: 0,
        VB2: 0,
        Niacin: 0,
        VE: 0,
        Na: 0,
        Ca: 0,
        Fe: 0,
        VC: 0,
        CH: 0,
        Eatable: 0,
        Sort:0,

        addFood:function(){
            if(vm.Name == ""||vm.Name == undefined||vm.Name == null){
                tip.on("请填写食材名称");
                return;
            }
            if(vm.TypeID == ""||vm.TypeID == undefined||vm.TypeID == null||vm.TypeID===0){
                tip.on("请选择食材类别");
                return;
            }
            if(vm.Energy == ""||vm.Energy == undefined||vm.Energy == null){
                tip.on("请填写单位单位能量");
                return;
            }

            var data={
                Name: vm.Name,
                TypeID: vm.TypeID,
                Energy: vm.Energy,
                Unit: vm.Unit,
                Water: vm.Water,
                Protein: vm.Protein,
                Fat: vm.Fat,
                CHO: vm.CHO,
                DF: vm.DF,
                VA: vm.VA,
                VB1: vm.VB1,
                VB2: vm.VB2,
                Niacin: vm.Niacin,
                VE: vm.VE,
                Na: vm.Na,
                Ca: vm.Ca,
                Fe: vm.Fe,
                VC: vm.VC,
                CH: vm.CH,
                Eatable: vm.Eatable,
                Sort:vm.Sort,
            };

            if(vm.FoodID>0){
                //编辑
                obj.save(vm.FoodID,data, function (res) {
                    tip.on("添加成功",1,3000)
                    pop.close()
                    avalon.mix(FoodManage.list[vm.foodIndex],res)

                }, function (err) {
                    tip.on(err)
                })
                return
            }
            obj.add(data,function (res) {

                    tip.on("添加成功",1,3000)

                    pop.close()
                   FoodManage.list.unshift(res)


                },
                function(err){
                    tip.on(err);
                    //vm.resetAddInfo();
                }
            )
        },
        cancel:function(){
            vm.addState=0;
            //vm.reset();
            vm.resetAddInfo()
            document.getElementById('food_type').selectedIndex = document.getElementById('typeOp1');
        },
        delFood:function(){
            if(confirm('确认删除 ['+
                    vm.Name+"] ？")==false){
                return
            }
            $$.call({
                i:"FoodDic/del",
                data:{
                    "FoodID":vm.FoodID
                },
                success:function(){
                    tip.on("删除成功",1,3000)

                    FoodManage.list.splice(index,1);
                    pop.close()

                },
                error:function(err){
                    console.log(err)
                }
            })
        }

    })

    return window[vm.$id]=vm
})