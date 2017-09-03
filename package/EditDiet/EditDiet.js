/*
 编辑食谱 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('EditDiet', [
    'avalon',
    'text!../../package/EditDiet/EditDiet.html',
    'css!../../package/EditDiet/EditDiet.css',
    '../../obj/Diet.js',
    '../../lib/select/select.js',
    '../../lib/switch/switch.js',
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "EditDiet",
        wayf: "",
        ready: function (i) {
            vm.reset()
            index.html = html
            //获取食物类型
            vm.foodTypes = avalon.mix([], foodTypes)



            //以及其他方法


            //vm.getFoodType()
            avalon.scan()

            /*
             * 如果i为0则为添加食谱，如果大于0则为编辑，所编辑的食谱ID为I
             *
             * 可能到来的客人：
             * 0添加
             * 1&&DietID编辑某个食谱
             * 2&&DietID从某个食谱复制
             * 3&&ateLogID&&UID&&Date从某个就餐记录复制
             * 4&&UID&&Date 添加并绑定给某用户的某天
             * 5&&UID&&Date&&DietID 从某个食谱创建并添加给某用户
             * */
            vm.wayf = i

            var whereAreYouFrom = String(i).split("&&")
            vm.status = whereAreYouFrom[0]
            switch (Number(whereAreYouFrom[0])) {
                case 0:
                    vm.title = "添加食谱"
                    vm.addInit()
                    vm.loadCache()

                    break
                case 1:
                    vm.title = "编辑食谱"
                    //获取原来食谱的东西放进去，提交的时候用save
                    //vm.editInit()
                    avalon.mix(vm, {
                        DietID: whereAreYouFrom[1]
                    })
                    vm.getDiet(vm.DietID)
                    break
                case 2:
                    vm.title = "复制食谱"
                    //获取原来的食谱的东西放进去，提交的时候用add
                    //vm.editInit()
                    avalon.mix(vm, {
                        DietID: whereAreYouFrom[1]
                    })
                    vm.getDiet(vm.DietID)

                    break
                case 3:
                    vm.title = "从就餐记录创建食谱"
                    //获取就餐记录的食物放进去，提交的时候用add
                    //vm.editInit()
                    avalon.mix(vm, {
                        AteLogID: whereAreYouFrom[1],
                        UID: whereAreYouFrom[2],
                        Date: whereAreYouFrom[3]
                    })
                    //这里需要编写获取就餐记录的方法，获取完毕之后添加食物到表单中
                    vm.getAteLog()
                    vm.getMemberInfo()
                    break
                case 4:
                    vm.title = "创建食谱并添加到"
                    //提交的时候调用绑定到某个会员

                    vm.addInit()
                    //记录参数
                    avalon.mix(vm, {
                        UID: whereAreYouFrom[1],
                        Date: whereAreYouFrom[2]
                    })
                    //获取会员资料
                    vm.getMemberInfo()

                    vm.loadCache()
                    break
                case 5:
                    //获取原来的食谱内容放进去，提交的时候用add，并绑定给某个用户
                    vm.title = "复制食谱并添加到"
                    //记录参数
                    avalon.mix(vm, {
                        UID: whereAreYouFrom[1],
                        Date: whereAreYouFrom[2],
                        DietID: whereAreYouFrom[3],
                    })

                    //获取食谱
                    vm.getDiet(vm.DietID)
                    //填入会员资料
                    vm.getMemberInfo()
                    break
                default :
                    window.location.href = '#!/EditDiet/0'
                    return
                    break
            }

            //监听基础项目，进行同步统计
            vm.$watch("info.base.*", function (a, b) {
                setTimeout(function () {
                    vm.getGoodValue()
                }, 300)
            })
            vm.$watch("NE", function (a, b) {
                setTimeout(function () {
                    vm.getGoodValue()
                    //vm.buildNE()
                }, 100)
            })


            var foodSearchWatchList = [
                'foodKeywords',
                'foodMinEngry',
                'foodMaxEngry',
                'foodType'
            ]

            ForEach(foodSearchWatchList, function (el) {
                vm.$watch(el, function (a, b) {
                    vm.searchFood(1)
                    vm.focusingFood = ''
                })
            })

            vm.searchFood(1)

            //添加高度滚动的监听事件
            //绑定到滚动事件上
            EventUtil.addEventHandler(window, 'scroll', vm.setFoodToolMT)

        },

        //加载缓存
        loadCache: function () {
            var d=cache.go('EditingDiet')
            if(d==undefined||d=="undefined"){
                return
            }

            setTimeout(function () {
                if(confirm('您有上次未保存的食谱，是否加载？')){
                    vm.foods=JSON.parse(d)
                }else{
                    vm.delCache()
                }
            },400)


        },
        saveCache: function () {
            var f=[[],[],[]]

            vm.foods.forEach(function (el, index) {
                el.forEach(function (al) {

                    var o={}
                    ForEach(al, function (val, key) {
                        if(key.charAt(0)=='$'){
                            return
                        }
                        o[key]=val
                    })
                    
                    f[index].push(o)
                })
            })

            if((Number(f[0].length)+Number(f[1].length)+Number(f[2].length))==0){
                f=undefined
            }

            cache.go({
                EditingDiet:JSON.stringify(f)
            })
        },
        delCache: function () {
            cache.go({
                EditingDiet:undefined
            })
        },


        title: "",
        status: '',
        DietID: "",
        AteLogID: "",
        UID: "",
        UN: "",
        Date: "",


        addInit: function () {
            //var s = [0, 0, 1, 1, 2, 2]
            //for (var i = 0; i < s.length; i++) {
            //    vm.addFoodInput(s[i])
            //}
            vm.buildNE()

            require(['../../lib/select/select.js'], function () {
                targetSelect.select(0)
            })

        },

        addFoodInput: function ($index) {
            vm.foods[$index].push(vm.$food)
        },
        delFoodInput: function (list, index, listIndex) {
            console.log(list)

            //if (list.length == 0) {
            //    list.push(vm.$food)
            //}

            list[index].Weight = 0

            vm.sum(listIndex, index)
            list.splice(index, 1)
            vm.saveCache()
        },

        getMemberInfo: function () {
            //查看本地有没有会员资料
            try {
                ///**/
                if (MemberDiet.member.Target == 3) {
                    avalon.mix(vm.info.base, {
                        REI: MemberDiet.member.HealthLogs[0].DTEC,
                    })
                } else {
                    avalon.mix(vm.info.base, {
                        REI: MemberDiet.member.goodEnergy,
                    })
                }

                if(MemberDiet.member.Target>0&&MemberDiet.member.Target<=3){
                    avalon.mix(vm.info.base, {
                        Target: MemberDiet.member.Target,
                    })
                    setTimeout(function () {
                        require(['../../lib/select/select.js'], function () {
                            targetSelect.select(MemberDiet.member.Target - 1)
                        })
                    }, 300)
                }else{
                    avalon.mix(vm.info.base, {
                        Target: 1,
                    })
                    setTimeout(function () {
                        require(['../../lib/select/select.js'], function () {
                            targetSelect.select(0)
                        })
                    }, 300)
                }


                vm.UN = MemberDiet.member.Name
            } catch (err) {

                //获取服务器上面的
                require(['../../obj/Member.js'], function () {
                    obj_Member.get(vm.UID, {
                        success: function (res) {
                            vm.UN = res.UN
                            if (res.Target == 3) {
                                avalon.mix(vm.info.base, {
                                    REI: res.HealthLogs[0].DTEC,
                                })
                            } else {
                                avalon.mix(vm.info.base, {
                                    REI: getGoodEnergy(res.Target, res.CurrentWeight, res.TargetWeight),
                                })
                            }
                            if(res.Target>0&&res.Target<=3){
                                require(['../../lib/select/select.js'], function () {
                                    targetSelect.select(res.Target - 1)
                                })
                            }else{
                                require(['../../lib/select/select.js'], function () {
                                    targetSelect.select(0)
                                })
                            }

                        }
                    })
                })

            }
        },

        reset: function () {


            //重置数据
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                $food: {//食物模板
                    FoodID: '',
                    Weight: '',
                    MealSign: "1",
                    MealID: '',//餐次
                    //以下是只需要在界面上显示的
                    Name: "",
                    Energy: "",
                    Unit: "",
                    Protein: "",
                    Fat: "",
                    DF: "",
                    CHO: "",
                    totalEnergy: 0,//总能量=energy*weight
                    totalCHO: 0,
                    totalProtein: 0,
                    totalFat: 0,
                    TypeID: '',
                    Replace:{},

                    VA: '',
                    VB1: '',
                    VB2: '',
                    Niacin: '',
                    VE:'',
                    Na:'',
                    Ca:'',
                    Fe: '',
                    VC: '',
                    CH:'',
                },
                wayf: "",
                AteLogID: "",
                UID: "",
                UN: "",
                Date: "",
                status: '',
                DietID: "",
                NE: [
                    0,
                    0,
                    0
                ],
                info: {
                    base: {
                        REI: '',
                        Target: 1,
                        NE: "0,0,0",
                        Introduce: "",
                        Attention: "",
                        Title: "",
                        Price: 0,
                    },

                    mealtotal: [
                        {
                            mealEnergy: 0,
                            mealCHO: 0,
                            mealProtein: 0,
                            mealFat: 0,
                            goodEnergy: 0,
                            goodCHO: 0,
                            goodProtein: 0,
                            goodFat: 0,
                        },
                        {
                            mealEnergy: 0,
                            mealCHO: 0,
                            mealProtein: 0,
                            mealFat: 0,
                            goodEnergy: 0,
                            goodCHO: 0,
                            goodProtein: 0,
                            goodFat: 0,
                        },
                        {
                            mealEnergy: 0,
                            mealCHO: 0,
                            mealProtein: 0,
                            mealFat: 0,
                            goodEnergy: 0,
                            goodCHO: 0,
                            goodProtein: 0,
                            goodFat: 0,
                        },
                    ]
                },
                foods: [
                    [],
                    [],
                    []
                ],
                $focusing: [],
                focusElem: '',
                dayTotal: {
                    dayEnergy: 0,
                    dayCHO: 0,
                    dayProtein: 0,
                    dayFat: 0,
                    dayGoodEnergy: 0,
                    dayGoodCHO: 0,
                    dayGoodProtein: 0,
                    dayGoodFat: 0,
                },
                //foodTypes: []
                foodList: [],
                foodKeywords: "",
                foodMinEngry: "",
                foodMaxEngry: "",
                foodType: 0,
                FP: 1,

                FT: 1,
                BLD: [3, 4, 3],//三餐能量比例
            })
            vm.checkNE()
        },

        //重置整个表单
        $oldvm: {
            info: {
                base: {
                    REI: '',
                    Target: 1,
                    NE: "0,0,0",
                    Introduce: "",
                    Attention: "",
                    Title: "",
                    Price: 0,
                },

                mealtotal: [
                    {
                        mealEnergy: 0,
                        mealCHO: 0,
                        mealProtein: 0,
                        mealFat: 0,
                        goodEnergy: 0,
                        goodCHO: 0,
                        goodProtein: 0,
                        goodFat: 0,
                    },
                    {
                        mealEnergy: 0,
                        mealCHO: 0,
                        mealProtein: 0,
                        mealFat: 0,
                        goodEnergy: 0,
                        goodCHO: 0,
                        goodProtein: 0,
                        goodFat: 0,
                    },
                    {
                        mealEnergy: 0,
                        mealCHO: 0,
                        mealProtein: 0,
                        mealFat: 0,
                        goodEnergy: 0,
                        goodCHO: 0,
                        goodProtein: 0,
                        goodFat: 0,
                    },
                ]
            },
            foods: [
                [],
                [],
                []
            ],
        },
        rewrite: function () {
            //表单的重置方法  $oldvm在获取食谱相关信息时填入
            avalon.mix(vm, vm.$oldvm)

        },
        getDiet: function (i) {
            obj_Diet.get(i, {
                success: function (res) {
                    // 编写加载数据的脚本

                    require(['../../lib/select/select.js'], function () {
                        targetSelect.select(res.Target - 1)
                    })
                    vm.info.base.REI = Number(res.REI).toFixed(2)
                    vm.info.base.Title=res.Title
                    vm.info.base.Attention=res.Attention
                    vm.info.base.Introduce=res.Introduce

                    //食物填充
                    ForEach(res.Details, function (i, index) {
                        vm.foods[i.MealID-1].push(avalon.mix({}, {//食物模板
                            FoodID: i.FoodID,
                            Weight: Number(i.Weight).toFixed(2),
                            MealSign: i.MealSign,
                            MealID: i.MealID,//餐次
                            //以下是只需要在界面上显示的
                            Name: i.Food.Name,
                            Energy: i.Food.Energy,
                            Unit: i.Food.Unit,
                            Protein: i.Food.Protein,
                            Fat: i.Food.Fat,
                            DF: i.Food.DF,
                            CHO: i.Food.CHO,
                            totalEnergy: i.Energy,//总能量=energy*weight
                            totalCHO: i.CHO,
                            totalProtein: i.Protein,
                            totalFat: i.Fat,
                            TypeID: i.Food.TypeID,
                            Replace: i.Food.Replace,
                            VA: i.Food.VA,
                            VB1: i.Food.VB1,
                            VB2: i.Food.VB2,
                            Niacin: i.Food.Niacin,
                            VE:i.Food.VE,
                            Na:i.Food.Na,
                            Ca:i.Food.Ca,
                            Fe: i.Food.Fe,
                            VC: i.Food.VC,
                            CH:i.Food.CH,
                        }))
                        avalon.nextTick(function () {
                            //vm.sum(i.MealID-1, index)
                        })
                    })
                    vm.info.NE = res.NE
                    vm.BLD=res.BLD.split(",")
                    vm.breakNE()

                    ForEach(vm.foods, function (el, i) {
                        ForEach(el, function (al, o) {
                            vm.sum(i, o)
                        })
                    })
                }
            })
        },
        getAteLog: function () {
            require(['../../obj/AteLog.js'], function () {
                obj_AteLog.get(vm.AteLogID, {
                    success: function (res) {

                        //食物填充
                        ForEach(res.Details, function (i, index) {
                            i.Food.Weight= i.Weight
                            vm.foods[i.MealID-1].push(avalon.mix({}, vm.$food, i.Food))

                            vm.sum(i.MealID-1, vm.foods[i.MealID-1].length-1)

                        })

                    }
                })
            })
        },

        //会返回过来的东西
        /*        $return: {
         "DietID": "22",
         "Target": "1",
         "Energy": "200.0000",
         "Status": "1",
         "CTime": "1457613861",
         "CUID": "1",
         "CHO": "150.0000",
         "DF": "110.0000",
         "Fat": "18.2000",
         "Protein": "108.0000",
         "REI": "120.0000",
         "NE": "100",
         "Sum": [
         {}
         ],
         "Details": {
         "1": [
         {},
         {}
         ],
         "2": [2],
         "3": [2]
         }
         },*/



        $food: {//食物模板
            FoodID: '',
            Weight: '',
            MealSign: "1",
            MealID: '',//餐次
            //以下是只需要在界面上显示的
            Name: "",
            Energy: "",
            Unit: "",
            Protein: "",
            Fat: "",
            DF: "",
            CHO: "",
            totalEnergy: 0,//总能量=energy*weight
            totalCHO: 0,
            totalProtein: 0,
            totalFat: 0,
            TypeID: '',
            Replace:{},

            VA: '',
            VB1: '',
            VB2: '',
            Niacin: '',
            VE:'',
            Na:'',
            Ca:'',
            Fe: '',
            VC: '',
            CH:'',
        },
        NE: [
            0,
            0,
            0
        ],
        buildNE: function () {
            vm.info.base.NE = "0,0,0"
            vm.info.base.NE = vm.NE.join()
            vm.getGoodValue()
        },
        breakNE: function () {
            vm.NE = []
            vm.NE = vm.info.base.NE.split(",")
            vm.getGoodValue()
        },
        info: {
            base: {
                REI: '',
                Target: 1,
                NE: "",
                Introduce: "",
                Attention: "",
                Title: "",
                Price: 0,
            },

            mealtotal: [
                {
                    mealEnergy: 0,
                    mealCHO: 0,
                    mealProtein: 0,
                    mealFat: 0,
                    goodEnergy: 0,
                    goodCHO: 0,
                    goodProtein: 0,
                    goodFat: 0,
                },
                {
                    mealEnergy: 0,
                    mealCHO: 0,
                    mealProtein: 0,
                    mealFat: 0,
                    goodEnergy: 0,
                    goodCHO: 0,
                    goodProtein: 0,
                    goodFat: 0,
                },
                {
                    mealEnergy: 0,
                    mealCHO: 0,
                    mealProtein: 0,
                    mealFat: 0,
                    goodEnergy: 0,
                    goodCHO: 0,
                    goodProtein: 0,
                    goodFat: 0,
                },
            ]
        },
        foods: [
            [],
            [],
            []
        ],


        $select: {
            id: 'targetSelect',
            radioBox: true,
            list: [
                {
                    name: '减脂',
                    id: "1",
                    checked: true
                },
                {
                    name: '增肌',
                    id: "2",
                    checked: false
                },
                {
                    name: '塑型',
                    id: "3",
                    checked: false
                }
            ],
            callback: function (i) {
                vm.info.base.Target = i.id
                vm.checkNE()
                vm.buildNE()
            }
        },

        checkNE: function () {
            //根据健身目的确定三营比例
            /*减脂：5:2.5:2.5
             增肌：6:2:2
             塑形： 60:15:25*/
            var NE = []
            switch (Number(vm.info.base.Target)) {
                case 1:
                    NE = [50, 25, 25]
                    break
                case 2:
                    NE = [60, 20, 20]
                    break
                case 3:
                    NE = [60, 15, 25]
                    break
                default :
                    NE = [0, 0, 0]
            }
            vm.NE = NE
        },


        //第一次重构：食物查询

        foodList: [],
        foodKeywords: "",
        foodMinEngry: "",
        foodMaxEngry: "",
        foodType: 0,
        setFoodType: function (i) {

            if (vm.foodType == i) {
                vm.foodType = 0
                return
            }
            vm.foodType = i
            vm.foodKeywords=''
            vm.foodMinEngry=''
            vm.foodMaxEngry=''
        },
        FP: 1,
        FN: 8,
        FT: 1,
        searchTimeout: "",
        searchFood: function (p) {
            clearTimeout(vm.searchTimeOut)
            vm.searchTimeOut = setTimeout(function () {
                require(['../../obj/bridge/FoodDic'], function (obj) {
                    var data = {
                        Keyword: vm.foodKeywords,
                        P: p,
                        N: vm.FN,
                        W: {},
                        Sort: 'Sort DESC'
                    }


                    if (vm.foodType > 0) {
                        data.W.TypeID = vm.foodType
                    }

                    if (Number(vm.foodMinEngry) > Number(vm.foodMaxEngry) && vm.foodMaxEngry != '') {
                        tip.on('最小单位能量不得大于最大单位能量')
                        return
                    }

                    if (Number(vm.foodMinEngry) > 0 && vm.foodMaxEngry === '') {
                        data.W.Energy = ['EGT', vm.foodMinEngry/100]
                    }

                    if (vm.foodMinEngry=== "" && Number(vm.foodMaxEngry) > 0) {
                        data.W.Energy = ['ELT', vm.foodMaxEngry/100]
                    }

                    if (Number(vm.foodMinEngry) >= 0 && Number(vm.foodMaxEngry) >= 0&&vm.foodMinEngry!== '' && vm.foodMaxEngry !=='' ) {
                        data.W.Energy = [['EGT', vm.foodMinEngry/100], ['ELT', vm.foodMaxEngry/100]]
                    }


                    obj.search(data, function (res) {

                        avalon.mix(vm, {
                            foodList: [],
                            FP: 1,
                            FT: 0,
                        })

                        avalon.mix(vm, {
                            foodList: res.L,
                            FP: res.P,
                            FT: res.T,
                        })


                    }, function (err) {

                    })
                })
            }, 300)

        },

        //食物的选择
        focusingFood: '',
        focusFood: function (i) {
            if (i === vm.focusingFood) {
                vm.focusingFood = ''
                return
            }
            vm.focusingFood = i
        },

        pushFood: function (mealindex, foodindex) {
            var food = vm.foodList[foodindex]
            var readyToPush = {}
            for (var x in vm.$food) {
                if (x.charAt(0) != "$") {
                    readyToPush[x] = food[x] || vm.$food[x]
                }
            }

            readyToPush.Weight = 100
            vm.foods[mealindex].push(readyToPush)

            //给重量输入框获取焦点
            //avalon.nextTick(function () {
            //    var weightInput = document.getElementById('foodWeightInput_' + mealindex + '_' + (vm.foods[mealindex].length-1) + "_eal")
            //    weightInput.focus()
            //})

            vm.sum(mealindex, vm.foods[mealindex].length - 1)

        },

        //食物查询工具的定位
        foodToolMT: 0,
        setFoodToolMT: function () {
            vm.foodToolMT = getScrollInfo().scrollTop - 340
            if (vm.foodToolMT < 0) {
                vm.foodToolMT = 0
            }
        },

        //食谱数据计算
        dayTotal: {
            dayEnergy: 0,
            dayCHO: 0,
            dayProtein: 0,
            dayFat: 0,
            dayGoodEnergy: 0,
            dayGoodCHO: 0,
            dayGoodProtein: 0,
            dayGoodFat: 0,
        },

        /*sum 统计刷新
         * @params k 第几餐
         * @params i 第几食物
         * @params x 变化量：Weight Energy CHO Protein Fat
         * */
        sum: function (k, i, x) {
            //本条数据刷新
            var thisFood = vm.foods[k][i]

            var newFoodTotal = {
                totalEnergy: 0,
                totalCHO: 0,
                totalProtein: 0,
                totalFat: 0
            }

            if (x == 'Weight' || x == undefined) {
                newFoodTotal = {
                    totalEnergy: (thisFood.Weight * thisFood.Energy ).toFixed(2),//总能量=energy*weight
                    totalCHO: (thisFood.Weight * thisFood.CHO ).toFixed(2),
                    totalProtein: (thisFood.Weight * thisFood.Protein ).toFixed(2),
                    totalFat: (thisFood.Weight * thisFood.Fat ).toFixed(2),
                }
            }

            if (x == 'Energy') {
                thisFood.Weight = (thisFood.totalEnergy / thisFood.Energy).toFixed(2)
                newFoodTotal = {
                    //totalEnergy: (thisFood.Weight * thisFood.Energy ).toFixed(2),//总能量=energy*weight
                    totalCHO: (thisFood.Weight * thisFood.CHO ).toFixed(2),
                    totalProtein: (thisFood.Weight * thisFood.Protein ).toFixed(2),
                    totalFat: (thisFood.Weight * thisFood.Fat ).toFixed(2),
                }
            }
            if (x == 'CHO') {
                thisFood.Weight = (thisFood.totalCHO / thisFood.CHO).toFixed(2)
                newFoodTotal = {
                    totalEnergy: (thisFood.Weight * thisFood.Energy ).toFixed(2),//总能量=energy*weight
                    //totalCHO: (thisFood.Weight * thisFood.CHO ).toFixed(2),
                    totalProtein: (thisFood.Weight * thisFood.Protein ).toFixed(2),
                    totalFat: (thisFood.Weight * thisFood.Fat ).toFixed(2),
                }
            }
            if (x == 'Protein') {
                thisFood.Weight = (thisFood.totalProtein / thisFood.Protein).toFixed(2)
                newFoodTotal = {
                    totalEnergy: (thisFood.Weight * thisFood.Energy ).toFixed(2),//总能量=energy*weight
                    totalCHO: (thisFood.Weight * thisFood.CHO ).toFixed(2),
                    //totalProtein: (thisFood.Weight * thisFood.Protein ).toFixed(2),
                    totalFat: (thisFood.Weight * thisFood.Fat ).toFixed(2),
                }
            }
            if (x == 'Fat') {
                thisFood.Weight = (thisFood.totalFat / thisFood.Fat).toFixed(2)
                newFoodTotal = {
                    totalEnergy: (thisFood.Weight * thisFood.Energy ).toFixed(2),//总能量=energy*weight
                    totalCHO: (thisFood.Weight * thisFood.CHO ).toFixed(2),
                    totalProtein: (thisFood.Weight * thisFood.Protein ).toFixed(2),
                    //totalFat: (thisFood.Weight * thisFood.Fat ).toFixed(2),
                }
            }


            console.log()
            avalon.mix(vm.foods[k][i], newFoodTotal)

            //本餐数据刷新
            var thisMeal = vm.foods[k],
                newMealTotal = {
                    mealEnergy: 0,
                    mealCHO: 0,
                    mealProtein: 0,
                    mealFat: 0,
                };
            for (var o = 0; o < thisMeal.length; o++) {
                if (thisMeal[o].Weight > 0) {
                    newMealTotal.mealEnergy = addUp([newMealTotal.mealEnergy, thisMeal[o].totalEnergy]).toFixed(2)
                    newMealTotal.mealCHO = addUp([newMealTotal.mealCHO, thisMeal[o].totalCHO]).toFixed(2)
                    newMealTotal.mealProtein = addUp([newMealTotal.mealProtein, thisMeal[o].totalProtein]).toFixed(2)
                    newMealTotal.mealFat = addUp([newMealTotal.mealFat, thisMeal[o].totalFat]).toFixed(2)
                }

            }
            avalon.mix(vm.info.mealtotal[k], newMealTotal)

            //本天数据刷新
            var newDayTotal = {
                dayEnergy: 0,
                dayCHO: 0,
                dayProtein: 0,
                dayFat: 0,
            }
            for (var p = 0; p < vm.info.mealtotal.length; p++) {
                newDayTotal.dayEnergy = addUp([newDayTotal.dayEnergy, vm.info.mealtotal[p].mealEnergy]).toFixed(2)
                newDayTotal.dayCHO = addUp([newDayTotal.dayCHO, vm.info.mealtotal[p].mealCHO]).toFixed(2)
                newDayTotal.dayProtein = addUp([newDayTotal.dayProtein, vm.info.mealtotal[p].mealProtein]).toFixed(2)
                newDayTotal.dayFat = addUp([newDayTotal.dayFat, vm.info.mealtotal[p].mealFat]).toFixed(2)
            }
            avalon.mix(vm.dayTotal, newDayTotal)

            vm.sumFoodType()
            vm.sumTE()
            vm.saveCache()
        },

        //食物规划
        wantFoodType: function (typeID, index, want) {

            if (vm.foodTypes[typeID - 1].want[index]) {
                vm.foodTypes[typeID - 1].want[index] = 0
                this.className = this.classList[0] + " " + this.classList[1]
            } else {
                vm.foodTypes[typeID - 1].want[index] = 1
                this.className += " want-food-type"
            }

            if (addUp(vm.foodTypes[typeID - 1].want) > 0) {
                vm.foodTypes[typeID - 1].wanting = true
            } else {
                vm.foodTypes[typeID - 1].wanting = false
            }

            console.log(want)
            console.log(index)
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
        getFoodType: function () {
            obj_FoodType.gets([], {
                success: function (res) {
                    vm.foodTypes = []
                    for (var i = 0; i < res.L.length; i++) {
                        res.L[i].foodTotal = 0
                        vm.foodTypes.push(res.L[i])
                    }
                }
            })
        },

        //统计各个分类的食物重量
        sumFoodType: function () {
            //重置食物类型统计
            for (var l = 0; l < vm.foodTypes.length; l++) {
                vm.foodTypes[l].foodTotal = 0
                vm.foodTypes[l].mealTotal = [0, 0, 0]
            }

            //展开计算
            for (var i = 0; i < vm.foods.length; i++) {
                for (var o = 0; o < vm.foods[i].length; o++) {
                    for (var p = 0; p < vm.foodTypes.length; p++) {
                        if (vm.foods[i][o].Weight > 0 && vm.foods[i][o].TypeID == vm.foodTypes[p].TypeID) {
                            vm.foodTypes[p].foodTotal = addUp([vm.foodTypes[p].foodTotal, vm.foods[i][o].Weight]).toFixed(2)
                            vm.foodTypes[p].mealTotal[i] = addUp([vm.foodTypes[p].mealTotal[i], vm.foods[i][o].Weight]).toFixed(2)
                        } else {
                            //console.log(vm.foods[i][o].TypeID+","+vm.foodTypes[p].TypeID)
                        }
                    }


                }
            }
        },

        //统计微量元素
        TE: {
            DF: {
                name: "膳食纤维(g)",
                sum: 0
            },
            VA: {
                name: "视黄醇当量(μgRAE)",
                sum: 0
            },
            VB1: {
                name: "硫胺素(VB1)(mg)",
                sum: 0
            },
            VB2: {
                name: "核黄素(VB2)(mg)",
                sum: 0
            },
            Niacin: {
                name: "尼克酸(mgNE)",
                sum: 0
            },
            VE: {
                name: "维生素E(mg)",
                sum: 0
            },
            Na: {
                name: "钠(mg)",
                sum: 0
            },
            Ca: {
                name: "钙(mg)",
                sum: 0
            },
            Fe: {
                name: "铁(mg)",
                sum: 0
            },
            VC: {
                name: "抗坏血酸(VC)(mg)",
                sum: 0
            },
            CH: {
                name: "胆固醇(mg)",
                sum: 0
            },
        },

        sumTE: function () {
            //重置统计
            ForEach(vm.TE, function (val, key) {
                val.sum = 0
            })

            //展开计算
            ForEach(vm.foods, function (el) {
                ForEach(el, function (al) {
                    ForEach(al, function (cl, key) {
                        if (key.charAt(0) != "$" && vm.TE[key] != undefined) {
                            vm.TE[key].sum = addUp([vm.TE[key].sum, cl * al.Weight]).toFixed(2)
                        }
                    })
                })
            })

        },

        //

        //保存
        /* $post: {
         Target: '',
         NE: '',//营养素功能比（以,分割）
         REI: "",//推荐能量摄入
         Foods: [
         {
         FoodID: '',
         Weight: "",
         MealSign: "",
         MealID: ''//餐次
         }
         ],
         Status: '1'//传1启用

         },*/
        add: function () {
            //整合数据
            var data = {
                Target: '',
                NE: '',//营养素功能比（以,分割）
                REI: "",//推荐能量摄入
                Introduce: "",
                Attention: "",
                Title: "",
                Price: 0,

            }
            //加载基础数据
            //avalon.mix(data, vm.info.base)

            ForEach(data, function (el, key) {
                data[key] = vm.info.base[key]
            })

            data.BLD=vm.BLD.join(',')
            data.Foods = []
            data.Status = '1'//传1启用
            //加载食物数据
            for (var i = 0; i < vm.foods.length; i++) {
                for (var o = 0; o < vm.foods[i].length; o++) {
                    if (vm.foods[i][o].Weight > 0) {
                        data.Foods.push({
                            FoodID: vm.foods[i][o].FoodID,
                            Weight: vm.foods[i][o].Weight,
                            MealSign: vm.foods[i][o].MealSign,
                            MealID: i + 1//餐次
                        })
                    } else {
                        vm.foods[i].splice(index, 1)

                        if (vm.foods[i].length == 0) {
                            vm.foods[i].push(vm.$food)
                        }
                    }

                }
            }

            //验证数据
            if (data.Title == '') {
                tip.on('还没有输入食谱标题')
                return
            }
            if (data.Target == "") {
                tip.on("食谱类型选择错误")
                return
            }
            if (data.NE == '' || data.NE.split(",").length != 3) {
                tip.on("三大营养素功能比例设置错误")
                return
            }
            if (!data.REI > 0) {
                tip.on("推荐能量设置错误")
                return
            }
            if (data.Foods.length == 0) {
                tip.on('未添加任何的食物')
                return
            }

            //发送请求


            if (vm.status == 1) {
                //调用保存方法
                obj_Diet.save(vm.DietID, data, {
                    success: function (res) {
                        vm.delCache()
                        goto('#!/DietDetails/' + res.DietID)
                    }
                })
                return
            }

            //发送数据
            obj_Diet.add(data, {
                success: function (res) {
                    vm.delCache()
                    tip.on('食谱创建成功', 1)
                    //todo 跳转添加成功后的食谱详情
                    //是否需要绑定到会员上
                    if (vm.UID == "") {
                        goto('#!/DietDetails/' + res.DietID)
                        return
                    }
                    if (confirm('是否将该食谱添加到' + vm.UN + "的食谱清单中？")) {
                        vm.addDiet(res.DietID)
                    }
                }
            })

        },

        //绑定食谱到会员
        addDiet: function (dietID) {
            var data = {
                UID: vm.UID,
                Date: vm.Date,
                DietID: dietID
            }

            //发起请求
            require(['../../obj/MemberDiet.js'], function () {
                obj_MemberDiet.add(data, {
                    success: function (res) {
                        tip.on('成功添加到食谱清单中', 1)
                        //返回会员食谱
                        goto("#!/MemberDiet/" + res.UID)
                    }
                })
            })

        },

        //推荐值的计算， 触发方式：目标能量值以及三营比例变化时重新计算
        BLD: [3, 4, 3],//三餐能量比例
        getGoodValue: function () {
            //----------验证计算所必须的条件------------
            //验证目标能量值
            if (vm.info.base.REI == "" || vm.info.base.REI <= 0) {
                console.log('尚未设定推荐能量值')
                return
            }
            //验证健身目的
            if (!vm.info.base.Target > 0) {
                tip.on("健身目的选择失败")
                return
            }
            //验证三营比
            for (var i = 0; i < vm.NE.length; i++) {
                if (!(vm.NE[i] >= 0)) {
                    console.log('尚未设定三大营养素供能比')
                }
            }


            //----------计算开始----------------


            //根据三营功能比计算出三种营养物质推荐供能
            var NE = vm.NE,
                REI = vm.info.base.REI

            var CE = REI * (NE[0] / addUp(NE)).toFixed(2),
                PE = REI * (NE[1] / addUp(NE)).toFixed(2),
                FE = REI * (NE[2] / addUp(NE)).toFixed(2)
            //根据三种营养物质推荐供能比计算出三种物质的质量
            /*碳水化合物 1g=4kcal
             蛋白质 1g=4kcal
             脂肪 1g=9kcal*/
            var CG = (CE / 4).toFixed(2),
                PG = (PE / 4).toFixed(2),
                FG = (FE / 9).toFixed(2)
            //填入本日推荐
            avalon.mix(vm.dayTotal, {
                dayGoodEnergy: REI,
                dayGoodCHO: CG,
                dayGoodProtein: PG,
                dayGoodFat: FG
            })
            //根据本日目标供能 及三餐比计算每餐的推荐供能--三餐比例固定3:4:3
            var BLD = vm.BLD
            //填入
            for (var i = 0; i < vm.info.mealtotal.length; i++) {
                avalon.mix(vm.info.mealtotal[i], {
                    goodEnergy: (REI * (BLD[i] / addUp(BLD))).toFixed(2),
                    goodCHO: (CE * (BLD[i] / addUp(BLD)) / 4).toFixed(2),
                    goodProtein: (PE * (BLD[i] / addUp(BLD)) / 4).toFixed(2),
                    goodFat: (FE * (BLD[i] / addUp(BLD)) / 9).toFixed(2),
                })
            }


        },


        //免费付费

        $opt_switch: {
            nowVal: '0',
            left: {
                label: "免费公开",
                value: "0"
            },
            right: {
                label: "付费获取",
                value: "1"
            },
            height:'34px',
            callback: function (value,libvm) {


                if(value==1){
                    setTimeout(function () {
                        libvm.toggle(0)
                    },200)

                    return
                }
                vm.Price = value
            }
        },


        //前往替换食物
        toReplaceFood: function (el, foodIndex, mealIndex) {
            require(['../../package/EditDiet/ReplaceFood.js'], function (that) {
                that.ready(vm.foods[mealIndex][foodIndex], foodIndex, mealIndex)
            })
        }

    })
    window[vm.$id] = vm
})