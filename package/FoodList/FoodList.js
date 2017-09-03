/*
 食材列表 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('FoodList', [
    'avalon',
    'text!../../package/FoodList/FoodList.html',
    'css!../../package/FoodList/FoodList.css',
    '../../lib/pager/pager',
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "FoodList",
        ready: function (i) {

            //重置
            vm.reset();
            vm.addState = 0;


            var params = String(i).split('&&')
            avalon.mix(vm, {
                P: params[0],
                Keyword: params[1]
            })

            if (i == 0) {
                i = 1
            }
            index.html = html;

            //获取食物类型
            vm.foodTypes = avalon.mix([], foodTypes)

            vm.getFoodList(vm.P);
            vm.nowP = i;
            vm.$watch('Keyword', function () {
                clearTimeout(vm.timeout);
                vm.timeout = setTimeout(function () {
                    goto("#!/FoodList/" + [1, vm.Keyword].join('&&'))
                }, 300)
            })

            //添加高度滚动的监听事件
            //绑定到滚动事件上
            EventUtil.addEventHandler(window, 'scroll', vm.setFoodToolMT)

        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                searchNull: 0,
                P: 1,
                N: 20,
                T: 150,
                list: [ {
                    FoodID: '',//食物编号  int(11) 必填:1 默认值:,
                    Name: '',//名称  char(250) 必填:1 默认值:,
                    Energy: '',//单位能量  int(11) 必填:1 默认值:,
                    Unit: '',//食材单位  char(20) 必填:1 默认值:g,
                    Water: '',//单位水分  double(15,8) 必填:1 默认值:,
                    Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                    Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                    DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                    CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                    VA: '',//视黄醇当量  double(15,8) 必填:1 默认值:,
                    VB1: '',//硫胺素(VB1)  double(15,8) 必填:1 默认值:,
                    VB2: '',//核黄素(VB2)  double(15,8) 必填:1 默认值:,
                    Niacin: '',//尼克酸  double(15,8) 必填:1 默认值:,
                    VE: '',//维生素E  double(15,8) 必填:1 默认值:,
                    Na: '',//钠  double(15,8) 必填:1 默认值:,
                    Ca: '',//钙  double(15,8) 必填:1 默认值:,
                    Fe: '',//铁  double(15,8) 必填:1 默认值:,
                    TypeID: '',//类别编号  int(11) 必填:1 默认值:,
                    VC: '',//抗坏血酸(VC)  double(15,8) 必填:1 默认值:,
                    CH: '',//胆固醇  double(15,8) 必填:1 默认值:,
                    Eatable: '',//可食部分  double(15,8) 必填:1 默认值:,
                    TotalUse: '',//TotalUse  int(11) 必填:1 默认值:,
                    Sort: '',//Sort  int(11) 必填:1 默认值:,
                    Replace: [
                        {
                            LID: '',//替换表记录编号  int(11) 必填:1 默认值:,
                            FoodID: '',//食材编号  int(11) 必填:1 默认值:,
                            Weight: '',//质量  double(15,8) 必填:1 默认值:,
                            GID: '',//组号  int(11) 必填:1 默认值:
                        }
                    ],
                    Type: {
                        TypeID: '',//类别编号  int(11) 必填:1 默认值:,
                        Name: '',//类别名称  char(250) 必填:1 默认值:
                    }
                }],
                //Keyword: "",
                Keyword: "",

            })
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


        //获取分页
        $paper: {
            id: "FoodListPager",
            N: 20,
            showPage: 6,
            getList: function (p) {
                goto("#!/FoodList/" + [p, vm.Keyword].join('&&'))
            }
        },

        nowP: 0,
        //判断查找结果是否为空,0为非空
        searchNull: 0,

        P: 1,
        N: 20,
        T: 150,
        list: [ {
            FoodID: '',//食物编号  int(11) 必填:1 默认值:,
            Name: '',//名称  char(250) 必填:1 默认值:,
            Energy: '',//单位能量  int(11) 必填:1 默认值:,
            Unit: '',//食材单位  char(20) 必填:1 默认值:g,
            Water: '',//单位水分  double(15,8) 必填:1 默认值:,
            Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
            Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
            DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
            CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
            VA: '',//视黄醇当量  double(15,8) 必填:1 默认值:,
            VB1: '',//硫胺素(VB1)  double(15,8) 必填:1 默认值:,
            VB2: '',//核黄素(VB2)  double(15,8) 必填:1 默认值:,
            Niacin: '',//尼克酸  double(15,8) 必填:1 默认值:,
            VE: '',//维生素E  double(15,8) 必填:1 默认值:,
            Na: '',//钠  double(15,8) 必填:1 默认值:,
            Ca: '',//钙  double(15,8) 必填:1 默认值:,
            Fe: '',//铁  double(15,8) 必填:1 默认值:,
            TypeID: '',//类别编号  int(11) 必填:1 默认值:,
            VC: '',//抗坏血酸(VC)  double(15,8) 必填:1 默认值:,
            CH: '',//胆固醇  double(15,8) 必填:1 默认值:,
            Eatable: '',//可食部分  double(15,8) 必填:1 默认值:,
            TotalUse: '',//TotalUse  int(11) 必填:1 默认值:,
            Sort: '',//Sort  int(11) 必填:1 默认值:,
            Replace: [
                {
                    LID: '',//替换表记录编号  int(11) 必填:1 默认值:,
                    FoodID: '',//食材编号  int(11) 必填:1 默认值:,
                    Weight: '',//质量  double(15,8) 必填:1 默认值:,
                    GID: '',//组号  int(11) 必填:1 默认值:
                }
            ],
            Type: {
                TypeID: '',//类别编号  int(11) 必填:1 默认值:,
                Name: '',//类别名称  char(250) 必填:1 默认值:
            }
        }],
        Keyword: "",
        getFoodList: function (p) {
            var data = {
                Keyword: vm.Keyword,
                P: p,
                N: 20,
                Sort: "Sort DESC",
                W:{}
            };
            if (vm.foodType > 0) {
                data.W.TypeID = vm.foodType
            }

            require(['../../obj/bridge/FoodDic.js'], function (obj) {
                obj.search(data, function (res) {
                        vm.list =[ {
                            FoodID: '',//食物编号  int(11) 必填:1 默认值:,
                            Name: '',//名称  char(250) 必填:1 默认值:,
                            Energy: '',//单位能量  int(11) 必填:1 默认值:,
                            Unit: '',//食材单位  char(20) 必填:1 默认值:g,
                            Water: '',//单位水分  double(15,8) 必填:1 默认值:,
                            Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                            Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                            DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                            CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                            VA: '',//视黄醇当量  double(15,8) 必填:1 默认值:,
                            VB1: '',//硫胺素(VB1)  double(15,8) 必填:1 默认值:,
                            VB2: '',//核黄素(VB2)  double(15,8) 必填:1 默认值:,
                            Niacin: '',//尼克酸  double(15,8) 必填:1 默认值:,
                            VE: '',//维生素E  double(15,8) 必填:1 默认值:,
                            Na: '',//钠  double(15,8) 必填:1 默认值:,
                            Ca: '',//钙  double(15,8) 必填:1 默认值:,
                            Fe: '',//铁  double(15,8) 必填:1 默认值:,
                            TypeID: '',//类别编号  int(11) 必填:1 默认值:,
                            VC: '',//抗坏血酸(VC)  double(15,8) 必填:1 默认值:,
                            CH: '',//胆固醇  double(15,8) 必填:1 默认值:,
                            Eatable: '',//可食部分  double(15,8) 必填:1 默认值:,
                            TotalUse: '',//TotalUse  int(11) 必填:1 默认值:,
                            Sort: '',//Sort  int(11) 必填:1 默认值:,
                            Replace: [
                                {
                                    LID: '',//替换表记录编号  int(11) 必填:1 默认值:,
                                    FoodID: '',//食材编号  int(11) 必填:1 默认值:,
                                    Weight: '',//质量  double(15,8) 必填:1 默认值:,
                                    GID: '',//组号  int(11) 必填:1 默认值:
                                }
                            ],
                            Type: {
                                TypeID: '',//类别编号  int(11) 必填:1 默认值:,
                                Name: '',//类别名称  char(250) 必填:1 默认值:
                            }
                        }]
                        if (res == null || res == undefined || res == "" || res == [] || res == {}||res.L.length==0) {
                            vm.searchNull = 1;
                        }
                        else {
                            vm.searchNull = 0;
                            vm.list=res.L
                            vm.P = res.P;
                            avalon.mix(FoodListPager, {
                                T: res.T,
                                P: res.P
                            });
                            FoodListPager.build(res.P)
                        }
                    },
                    function () {
                        vm.list = [];
                        vm.searchNull = 1;

                    }
                )
            })

        },

        foodType: 0,
        setFoodType: function (i) {

            if (vm.foodType == i) {
                vm.foodType = 0
                return
            }
            vm.foodType = i
            vm.Keyword=''
            vm.getFoodList(1)

        },





        //食物详情
        //食物详情定位
        foodToolMT: 0,
        setFoodToolMT: function () {
            vm.foodToolMT = getScrollInfo().scrollTop - 135
            if (vm.foodToolMT < 0) {
                vm.foodToolMT = 0
            }
        },

        nowFood:0,
        lookFood: function (i) {
            vm.nowFood=i
        }

    })
    window[vm.$id] = vm
})