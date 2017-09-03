/*
我的食谱 内在灵魂，沉稳坚毅
 生成时间：Mon Mar 21 2016   破门狂人R2-D2为您服务！
*/
define('MyDiet',[
    'avalon',
    'text!../../package/MyDiet/MyDiet.html',
    'css!../../package/MyDiet/MyDiet.css',
    '../../obj/Member.js',
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"MyDiet",
        ready: function (i) {
            vm.reset()
            index.html = html

            //以及其他方法
            //获取用户信息
            vm.getMember(i)
            //设置今天
            vm.now=new Date().getDay()-1




        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
            })
        },
        getMember: function (i) {
            obj_Member.get(i, {
                success: function (res) {

                    vm.member=res
                    vm.member.goodEnergy=vm.getGoodEnergy(res.Target)
                    vm.getDiet(vm.week)
                }
            })
        },
        //计算每日推荐能量摄入
        getGoodEnergy: function (target) {
            var goodEnergy = 0
            switch (Number(target)) {
                case 1:
                    goodEnergy = vm.member.TargetWeight * 30
                    break
                case 2:
                    goodEnergy = vm.member.CurrentWeight * 50
                    break
                case 3:
                    goodEnergy = vm.member.CurrentWeight * 40
                    break
            }
            return goodEnergy
        },
        member:{},
        sexName:['女士','先生'],

        /*饮食记录*/
        week:0,
        getDiet: function (week) {
            vm.week=week
            $$.call({
                i:"MemberDiet/getDietByWeek",
                data:{
                    Week:week,
                    UID:vm.member.UID
                },
                success: function (res) {
                    if (res === null) {
                        res = {}
                    }
                    avalon.mix(vm.Diet, res)
                    var logs = res.Logs
                    vm.DietWeek = [{}, {}, {}, {}, {}, {}, {}]
                    var index = 0//即将插入的序号
                    var logD = {1: [], 2: [], 3: []}
                    if (logs != null) {
                        for (var i = 0; i < logs.length; i++) {

                            //插入到界面中
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

                            //重排当前就餐记录的食物:正餐在上，加餐在下
                            ForEach(logs[i].Details, function (val, key) {
                                val.sort(function (a, b) {
                                    return a.MealSign - b.MealSign
                                })
                            })

                            vm.DietWeek[index] = logs[i]
                            index = 0
                        }
                    }

                    for (var o = 0; o < 7; o++) {
                        if (vm.DietWeek[o].Date == undefined) {
                            vm.DietWeek[o].Date = vm.getWeekDay(o)
                            vm.DietWeek[o].ActualEnergy = 0
                            vm.DietWeek[o].null = true
                        }
                    }

                    //vm.sumFoodType()
                    vm.member.UN=vm.member.Account
                    document.getElementById("title").innerText = vm.member.UN+"的食谱"
                }
            })
        },
        weekName:['一','二','三','四','五','六','日'],
        mealName:['早餐','午餐','晚餐'],
        mealClass:['text-success','text-danger','text-info'],
        getWeekDay: function (day) {
            var now=new Date().getDay()
            var upday=String(day-now+1+vm.week*7)
            return strtotime(upday+" day")
        },
        DietWeek:[

        ],
        Diet:{

        },


        //添加食谱
        AddDiet: function (date) {
            require(['../../package/MemberDiet/AddDiet.js'], function () {
                AddDiet.ready(date)
            })
        },

        //添加烹饪建议
        addCookingTip: function (week,LogID,tip) {
            require(['../../package/MemberDiet/addCookingTip'], function () {
                addCookingTip.ready(week,LogID,tip)
            })
        },

        mealSignName:{
            1:'正餐',
            2:"加餐",
            3:"训练前",
            4:"训练中",
            5:"训练后"
        },

        //控制标签页的显示
        now:0,
        tabTo: function (i) {
            vm.now=i
        },

        //控制页面标题
        setTitle: function () {
            //这个做不到啊！
        }


    })
    window[vm.$id]=vm
})