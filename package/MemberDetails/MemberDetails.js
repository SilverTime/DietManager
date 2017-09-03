/*
 会员资料详情 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('MemberDetails', [
    'avalon',
    'text!../../package/MemberDetails/MemberDetails.html',
    'css!../../package/MemberDetails/MemberDetails.css',
    //'../../obj/Member.js',
    //'../../obj/AteLog.js',
    //'../../obj/FoodType.js',
    '../../lib/ECharts/ECharts.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "MemberDetails",
        ready: function (i) {
            vm.reset()
            index.html = html

            //解析参数
            var params = String(i).split("&&")
            if (params[1] == 'mobile') {
                vm.mobile = true
            }

            //以及其他方法
            vm.getFoodType()
            vm.BaseInfo.UID = params[0]
            vm.getBaseInfo(params[0])
            //vm.getHabit(params[0])
            //vm.getHealthLog(params[0])
            vm.getMemberBodyCheck(params[0])
            vm.getProblemSuggestion(params[0])
            //vm.getAteLog(vm.week)

            vm.nowUID = index.uid

            vm.$watch('BaseInfo.Target', function (a, b) {
                if (a == 3) {
                    avalon.nextTick(function () {
                        vm.buildTMOE()
                        vm.BaseInfo.goodEnergy = vm.HealthLogs[0].DTEC
                    })

                } else {
                    avalon.nextTick(function () {
                        vm.buildTMOE()
                    })
                }


            })

            vm.$watch('BaseInfo.goodEnergy', function (a, b) {
                vm.buildTMOE()
            })

            window.onresize = vm.resize

        },
        resize: function () {
            mealPie.resize()
            NEPie.resize()
            mealDF.resize()
            NEDF.resize()
        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                noneLog: false,
                nowUID: 0,
                mobile: false,
                info: {
                    Club: {},
                    Coach: {},
                    HealthLogs: [{
                        BFR: 0,
                        BMI: 0,
                        BMR: 0,
                        DTEC: 0,
                        Date: 0,
                        Height: 0,
                        Hip: 0,
                        PAL: 0,
                        UID: 0,
                        WHR: 0,
                        Waist: 0,
                        Weight: 0,
                    }],
                    Habit: {}
                },
                week: 0,
                AteLogWeek: [],
                ateLog: {},
                $focusing: [],
                focusElem: '',
                foodTypes: [],
                Target: 0,
                goodEnergy: 0
            })
        },
        nowUID: 0,
        mobile: false,//是否手机版


        //获取基础资料
        BaseInfo: {
            Name: "",
            Sex: "",
            Coach: {
                Club: {
                    Name: ""
                },
                User: {
                    Name: ""
                },
                UID: ""
            },
            Birthday: "",
            EndTime: "",
            Tel: "",
            TargetWeight: "",
            goodEnergy: "",
            Target: "",

            History: "",
            Living: "",
            Survey: '',
            age: ''
        },
        getBaseInfo: function (id) {

            require(['../../obj/bridge/Member.js'], function (obj) {
                obj.get(id, function (res) {
                    //avalon.mix(vm.BaseInfo,res)
                    //if (res.Club.length >= 0) {
                    //    res.Club = {}
                    //}
                    //if (res.LogID == undefined) {
                    //    res.LogID = 0
                    //}
                    //if (res.Check == undefined) {
                    //    res.Check = []
                    //}
                    //if (res.Habit.length >= 0) {
                    //    res.Habit = {}
                    //}

                    avalon.mix(vm.BaseInfo, res)
                    vm.HealthLogs = res.HealthLogs.reverse()


                    vm.BaseInfo.goodEnergy = vm.getGoodEnergy(res.Target)

                    vm.getAteLog(vm.week)

                    //计算年龄
                    vm.getAge()

                    vm.buildTMOE()
                })
            })

        },


        //获取疾病历史&生活习惯
        Habit: {},
        getHabit: function (id) {
            require(['../../obj/bridge/Habit.js'], function (obj) {
                obj.get(id, function (res) {

                })
            })
        },

        //获取体质评估
        HealthLogs: [],
        getHealthLog: function (id) {
            require(['../../obj/bridge/HealthLog.js'], function (obj) {
                obj.search({W: {UID: id}, P: 1, N: 999999, Sort: "Date DESC"}, function (res) {
                    vm.HealthLogs = res.L
                })
            })
        },

        //获取绳梯检查项
        BodyCheck: [],
        getMemberBodyCheck: function (id) {
            require(['../../obj/bridge/MemberBodyCheck.js'], function (obj) {
                obj.search({W: {UID: id}, P: 1, N: 999999}, function (res) {
                    vm.BodyCheck = res.L
                })
            })
        },

        //获取问题及建议
        Suggestion: [],
        getProblemSuggestion: function (id) {
            require(['../../obj/bridge/ProblemSuggestion.js'], function (obj) {
                obj.search({W: {UID: id}, P: 1, N: 999999}, function (res) {
                    vm.Suggestion = res.L
                })
            })
        },


        //计算年龄
        getAge: function () {
            vm.BaseInfo.age = 0;
            var birthday;
            var timestamp = Date.parse(new Date()) / 1000;        //10位时间戳
            function getLocalTime(nS) {
                //本函数将时间戳转换成日期
                return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
            }

            timestamp = (getLocalTime(timestamp).substr(0, 4));
            birthday = (getLocalTime(vm.BaseInfo.Birthday).substr(0, 4));
            ;
            vm.BaseInfo.age = timestamp - birthday;
        },

        //计算每日推荐能量摄入
        getGoodEnergy: function (target) {
            var goodEnergy = 0
            switch (Number(target)) {
                case 1:
                    goodEnergy = vm.BaseInfo.TargetWeight * 30
                    break
                case 2:
                    goodEnergy = vm.BaseInfo.CurrentWeight * 50
                    break
                case 3:
                    goodEnergy = vm.HealthLogs[0].DTEC
                    break
            }
            return goodEnergy
        },


        /**************编辑项目*****************/
        //资料编辑
        EditBase: function () {
            require(['../../package/MemberDetails/EditBase.js'], function () {
                EditBase.ready()
            })
        },

        //基本历史与生活习惯编辑
        EditHabit: function () {
            require(['../../package/MemberDetails/EditHabit.js'], function () {
                EditHabit.ready()
            })
        },

        //身体检查项编辑
        EditCheck: function () {
            require(['../../package/MemberDetails/EditCheck.js'], function () {
                EditCheck.ready()
            })
        },
        ShareReport: function () {
            require(['../../package/MemberDetails/ShareReport.js'], function () {
                ShareReport.ready()
            })
        },

        //饮食记录
        week: 0,
        noneLog: false,
        getAteLog: function (week) {
            vm.week = week
            $$.call({
                i: "AteLog/getDietByWeek",
                data: {
                    Week: week,
                    UID: vm.BaseInfo.UID
                },
                success: function (res) {
                    avalon.mix(vm.ateLog, res)
                    var logs = res.Logs
                    vm.AteLogWeek = [{}, {}, {}, {}, {}, {}, {}]
                    var index = 0
                    var logD = {1: [], 2: [], 3: []}
                    if (logs != null) {
                        for (var i = 0; i < logs.length; i++) {
                            //插入就餐记录
                            index = new Date(logs[i].Date * 1000).getDay() - 1
                            if (index == -1) {
                                index = 6
                            }

                            //处理食物列表数据
                            logD = {1: [], 2: [], 3: []}
                            ForEach(logs[i].Details, function (el) {
                                logD[el.MealID].push(el)
                            })

                            logs[i].Details = logD

                            //填充
                            vm.AteLogWeek[index] = logs[i]
                            index = 0
                        }
                    }

                    for (var o = 0; o < 7; o++) {
                        if (vm.AteLogWeek[o].Date == undefined) {
                            vm.AteLogWeek[o].Date = vm.getWeekDay(o)
                            vm.AteLogWeek[o].TotalEnergy = 0
                            vm.AteLogWeek[o].null = true
                        }
                    }


                    vm.sumFoodType()
                    vm.sumTE()

                    if (addUp([res.Breakfast, res.Lunch, res.Dinner, res.CHO, res.Protein, res.Fat]) == 0) {
                        return vm.noneLog = true
                    } else {
                        vm.noneLog = false
                    }

                    //三餐能量统计
                    var mealTotal = [
                        {
                            name: '早餐',
                            value: Number(res.Breakfast).toFixed(2)
                        },
                        {
                            name: '午餐',
                            value: Number(res.Lunch).toFixed(2)
                        },
                        {
                            name: '晚餐',
                            value: Number(res.Dinner).toFixed(2)
                        },
                    ]

                    mealPie.$ops.series[0].data = mealTotal.sort(function (a, b) {
                        return a.value - b.value
                    })
                    mealPie.reload()

                    //营养素能量统计
                    var NETotal = [
                        {
                            name: '碳水化合物',
                            value: Number(res.CHO * 4).toFixed(2)
                        },
                        {
                            name: '蛋白质',
                            value: Number(res.Protein * 4).toFixed(2)
                        },
                        {
                            name: '脂肪',
                            value: Number(res.Fat * 9).toFixed(2)
                        },
                    ]

                    NEPie.$ops.series[0].data = NETotal.sort(function (a, b) {
                        return a.value - b.value
                    })
                    NEPie.reload()


                    //三餐能量差距图
                    var mealDF_data = [
                        (Number(res.Breakfast) - Number(vm.BaseInfo.goodEnergy) * 0.3).toFixed(2),
                        (Number(res.Lunch) - Number(vm.BaseInfo.goodEnergy) * 0.4).toFixed(2),
                        (Number(res.Dinner) - Number(vm.BaseInfo.goodEnergy) * 0.3).toFixed(2),
                    ]
                    mealDF.$ops.series[0].data = mealDF_data
                    mealDF.reload()

                    //三营能量差距图
                    var NE = []
                    switch (Number(vm.BaseInfo.Target)) {
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
                    /*
                     碳水化合物，1g=4kcal
                     蛋白质：1g=4kcal
                     脂肪：1g=9kcal
                     * */
                    var NEDF_data = [
                        (Number(res.CHO * 4) - Number(vm.BaseInfo.goodEnergy) * (NE[0] / addUp(NE))).toFixed(2),
                        (Number(res.Protein * 4) - Number(vm.BaseInfo.goodEnergy) * (NE[1] / addUp(NE))).toFixed(2),
                        (Number(res.Fat * 9) - Number(vm.BaseInfo.goodEnergy) * (NE[2] / addUp(NE))).toFixed(2),
                    ]
                    NEDF.$ops.series[0].data = NEDF_data
                    NEDF.reload()
                }
            })
        },

        weekName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        mealName: ['早餐', '午餐', '晚餐'],
        mealClass: ['text-success', 'text-danger', 'text-info'],
        getWeekDay: function (day) {
            var now = new Date().getDay()
            var upday = String(day - now + 1 + vm.week * 7)
            return strtotime(upday + " day")
        },
        AteLogWeek: [],
        ateLog: {},

        //添加就餐记录
        EditAteLog: function (date, index) {
            require(['../../package/MemberDetails/EditAteLog.js'], function () {
                EditAteLog.ready(date, index)
            })
        },
        //食物动态查询
        $focusing: [],
        focusElem: '',
        foodFocus: function (k, i, elem) {
            vm.$focusing = [k, i]
            vm.focusElem = elem
            console.log(vm.$focusing)
        },
        foodblur: function () {

        },
        $optFoodSearch: {
            id: "goInput_eal",

            //todo 后面再配置的时候需要添加对复数输入框做处理
            callback: function (Food) {
                var food = {}
                for (var x in EditAteLog.$food) {
                    if (x.charAt(0) != "$") {
                        food[x] = Food[x] || EditAteLog.$food[x]
                    }
                }
                console.log(food)
                avalon.mix(EditAteLog.foods[vm.$focusing[0]][vm.$focusing[1]], food)
                //vm.focusElem.blur()
                goInput_eal.mustOut()
                goInput_eal.goReset()

                //给重量输入框获取焦点
                document.getElementById('foodWeightInput_' + vm.$focusing[0] + '_' + vm.$focusing[1] + "_eal").focus()

            },
            callbackTM: function (Food) {
                avalon.mix(vm.foods[vm.$focusing[0]][vm.$focusing[1]], Food)
                vm.focusElem.blur()
                goInput_eal.mustOut()
                goInput_eal.goReset()
            }
        },

        //食物选择评估
        foodTypes: [],
        getFoodType: function () {
            //获取食物类型
            vm.foodTypes = avalon.mix([], foodTypes)
        },

        //统计各个分类的食物重量
        sumFoodType: function () {
            //重置食物类型统计
            for (var l = 0; l < vm.foodTypes.length; l++) {
                vm.foodTypes[l].foodTotal = 0
            }
            //展开计算
            var sum = {}

            //统计总量
            ForEach(vm.ateLog.Logs, function (el) {
                ForEach(el.Details, function (al) {
                    ForEach(al, function (bl) {
                        var TypeID = bl.TypeID
                        var Weight = bl.Weight

                        //如果还没有填充这个值
                        if (sum[TypeID] == undefined) {
                            sum[TypeID] = Weight
                            return
                        }

                        //如果已经填充这个值
                        sum[TypeID] = addUp([sum[TypeID], Weight]).toFixed(4)

                    })
                })
            })


            //计算出平均值
            ForEach(sum, function (val, key) {
                //加载计算结果
                ForEach(vm.foodTypes, function (el) {
                    if (key == el.TypeID) {
                        el.foodTotal = (val / vm.ateLog.Logs.length).toFixed(2)
                    }
                })
            })


        },

        //计算微量元素
        $TEIndex: ['DF', 'VA', 'VB1', 'VB2', 'Niacin', 'VE', 'Na', 'Ca', 'Fe', 'VC', 'CH'],
        TE: [
            {
                name: "膳食纤维(g)",
                sum: 0
            },
            {
                name: "视黄醇当量(μgRAE)",
                sum: 0
            },
            {
                name: "硫胺素(VB1)(mg)",
                sum: 0
            },
            {
                name: "核黄素(VB2)(mg)",
                sum: 0
            },
            {
                name: "尼克酸(mgNE)",
                sum: 0
            },
            {
                name: "维生素E(mg)",
                sum: 0
            },
            {
                name: "钠(mg)",
                sum: 0
            },
            {
                name: "钙(mg)",
                sum: 0
            },
            {
                name: "铁(mg)",
                sum: 0
            },
            {
                name: "抗坏血酸(VC)(mg)",
                sum: 0
            },
            {
                name: "胆固醇(mg)",
                sum: 0
            },
        ],

        logsNum: 0,
        sumTE: function () {
            //重置统计
            ForEach(vm.TE, function (val, key) {
                val.sum = 0
            })

            function getIndex(key) {
                var index = -1;
                var names = vm.$TEIndex
                for (var i = 0; i < names.length; i++) {
                    if (key == names[i]) {
                        index = i
                        break
                    }
                }
                return index
            }

            try {
                //展开计算
                ForEach(vm.ateLog.Logs, function (el) {
                    ForEach(el.Details, function (al) {
                        ForEach(al, function (bl) {
                            ForEach(bl.Food, function (cl, key) {

                                if (key.charAt(0) != "$") {
                                    var index = getIndex(key)
                                    if (index < 0) {
                                        return
                                    }
                                    vm.TE[index].sum = addUp([vm.TE[index].sum, cl * bl.Weight]).toFixed(2)
                                }
                            })
                        })
                    })
                })

                //计算出平均值
                ForEach(vm.TE, function (val, key) {
                    val.sum = (val.sum / vm.ateLog.Logs.length).toFixed(2)
                })
            } catch (err) {
                console.log(err.message)
            }


        },


        //教练员建议
        EditSuggest: function () {
            require(['../../package/MemberDetails/EditSuggest.js'], function () {
                EditSuggest.ready()
            })
        },

        /*统计图*/
        $mealPie: {
            id: "mealPie",
            width: '100%',
            height: 300,
            $ops: {
//                        backgroundColor: '#2c343c',
                title: {
                    text: '三餐平均能量占比',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}kcal ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '平均能量摄入',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '55%'],
                        data: [].sort(function (a, b) {
                            return a.value - b.value
                        }),
//                                roseType: 'angle',
                        label: {
                            normal: {
                                show: true,
                                //position: 'center',
                                formatter: "{b}\r\n{c}kcal({d}%)"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                },

                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
//                                            color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
//                                        color: '#c23531',
                                shadowBlur: 200,
//                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },
        $NEPie: {
            id: "NEPie",
            width: '100%',
            height: 300,
            $ops: {
//                        backgroundColor: '#2c343c',
                title: {
                    text: '营养素平均供能占比',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}kcal ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '平均能量摄入',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '55%'],
                        data: [].sort(function (a, b) {
                            return a.value - b.value
                        }),
//                                roseType: 'angle',
                        label: {
                            normal: {
                                show: true,
                                //position: 'center',
                                formatter: "{b}\r\n{c}kcal({d}%)"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                },

                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
//                                            color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
//                                        color: '#c23531',
                                shadowBlur: 200,
//                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },

        $mealDF: {
            id: "mealDF",
            width: '100%',
            height: 300,
            $ops: {
                title: {
                    text: '与推荐值得差距',
                    //subtext: 'From ExcelHome',
                    //sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 80,
                    bottom: 30
                },
                xAxis: {
                    type: 'value',
                    position: 'top',
                    splitLine: {lineStyle: {type: 'dashed'}},
                },
                yAxis: {
                    type: 'category',
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    data: ['早餐', '午餐', '晚餐']
                },
                series: [
                    {
                        name: '与推荐值的差距',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}\r\n{c}kcal'
                            }
                        },
                        data: []
                    }
                ]
            }
        },
        $NEDF: {
            id: "NEDF",
            width: '100%',
            height: 300,
            $ops: {
                title: {
                    text: '与推荐值得差距',
                    //subtext: 'From ExcelHome',
                    //sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 80,
                    bottom: 30
                },
                xAxis: {
                    type: 'value',
                    position: 'top',
                    splitLine: {lineStyle: {type: 'dashed'}},
                },
                yAxis: {
                    type: 'category',
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    data: ['碳水化合', '蛋白质', '脂肪']
                },
                series: [
                    {
                        name: '与推荐值的差距',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}\r\n{c}kcal'
                            }
                        },
                        data: []
                    }
                ]
            }
        },


        //todo 根据推荐能量摄入  以及健身目的  计算出三餐能量  与  宏量营养素摄入推荐量 并渲染

        //数据结构
        TMOE: [  //Three meals of energy 三餐能量
            {
                energy: 0,//能量
                CHO: 0,//碳水化合物
                protein: 0,//蛋白质
                fat: 0,//脂肪
            },
            {
                energy: 0,//能量
                CHO: 0,//碳水化合物
                protein: 0,//蛋白质
                fat: 0,//脂肪
            },
            {
                energy: 0,//能量
                CHO: 0,//碳水化合物
                protein: 0,//蛋白质
                fat: 0,//脂肪
            },

        ],

        //计算TMOE的函数
        buildTMOE: function () {
            //todo 编写相关的计算逻辑并加载计算结果到 vm.TMOE上面
            var energyPerDay;//todo 需赋值为每日推荐能量摄入值
            if (vm.BaseInfo.target == 3) {
                energyPerDay = vm.BaseInfo.HealthLogs[0].DTEC
            } else {
                energyPerDay = vm.BaseInfo.goodEnergy
            }


            vm.TMOE[0].energy = energyPerDay * 0.3;//早餐总能量
            vm.TMOE[1].energy = energyPerDay * 0.4;//午餐总能量
            vm.TMOE[2].energy = energyPerDay * 0.3;//晚餐总能量

            function getEach(target, energyAll) {
                // var target;//三种类型
                //var energyAll;每一餐的总能量


                var x = 0;

                /*
                 * 设 每餐总能量为 w，
                 * 每餐摄入碳水化合物 a 克，蛋白质 b 克，脂肪 c 克
                 *
                 * 据 公式：
                 * 三家营养素供能比例（碳水化合物：蛋白质：脂肪）：
                 减脂：50%：25%：25%
                 增肌：60%：20%：20%
                 塑形：60%：15%：25%
                 注：该比例为三大营养素提供的能量占一日总能量的比例，而不是克数的比例
                 其中碳水化合物，1g=4kcal
                 蛋白质：1g=4kcal
                 脂肪：1g=9kcal

                 得：
                 每日摄入能量 w=4a+4b+9c   (公式1)

                 若为减脂：
                 4a:4b:9c=2:1:1  (公式2-1)

                 若为增肌：
                 4a:4b:9c=3:1:1  (公式2-2）

                 若为塑形：
                 4a:4b:9c=4:1:1  (公式2-3)


                 *
                 *
                 * */

                if (target == 1) {
                    return {
                        CHO: (energyAll * 2 / 4 / 4).toFixed(2),
                        protein: (energyAll * 1 / 4 / 4).toFixed(2),
                        fat: (energyAll * 1 / 4 / 9).toFixed(2)
                    }
                } else if (target == 2) {
                    return {
                        CHO: (energyAll * 3 / 5 / 4).toFixed(2),
                        protein: (energyAll * 1 / 5 / 4).toFixed(2),
                        fat: (energyAll * 1 / 5 / 9).toFixed(2)
                    }
                } else if (target == 3) {
                    return {
                        CHO: (energyAll * 4 / 6 / 4).toFixed(2),
                        protein: (energyAll * 1 / 4 / 4).toFixed(2),
                        fat: (energyAll * 1 / 4 / 9).toFixed(2)
                    }
                } else {
                    console.log("target 参数错误")
                }

            }

            //调用
            ForEach(vm.TMOE, function (el) {
                avalon.mix(el, getEach(vm.BaseInfo.Target, el.energy))
            })

        }
    })
    window[vm.$id] = vm
})