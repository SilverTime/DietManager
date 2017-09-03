/*
 食谱详情 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('DietDetails', [
    'avalon',
    'text!../../package/DietDetails/DietDetails.html',
    'css!../../package/DietDetails/DietDetails.css',
    '../../obj/Diet.js',
    '../../lib/ECharts/ECharts.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "DietDetails",
        ready: function (i) {
            vm.reset()
            index.html = html
            //获取食物类型
            vm.foodTypes = avalon.mix([], foodTypes)
            //以及其他方法
            vm.getInfo(i)
        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                DetailsInfo: {},
                CP: 0,
                CN: 12,
                CT: 0,
                CList: [],
                Content: " ", //评论类容
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
        DetailsInfo: {},
        getInfo: function (id) {
            var id = id
            obj_Diet.get(id, {
                success: function (res) {
                    if (res.CUser.HeadImgURL == "" || res.CUser.HeadImgURL == null) {
                        res.CUser.HeadImgURL = './src/images/head.png'
                    }
                    //vm.DetailsInfo=[]
                    vm.DetailsInfo = res

                    //三餐能量统计
                    var mealTotal = [
                        {
                            name: '早',
                            value: Number(res.BreakfastEnergy).toFixed(2)
                        },
                        {
                            name: '午',
                            value: Number(res.LunchEnergy).toFixed(2)
                        },
                        {
                            name: '晚',
                            value: Number(res.DinnerEnergy).toFixed(2)
                        },
                    ]

                    D_mealPie.$ops.series[0].data = mealTotal.sort(function (a, b) {
                        return a.value - b.value
                    })
                    D_mealPie.reload()

                    //营养素能量统计
                    var NETotal = [
                        {
                            name: '碳',
                            value: Number(res.CHO * 4).toFixed(2)
                        },
                        {
                            name: '蛋',
                            value: Number(res.Protein * 4).toFixed(2)
                        },
                        {
                            name: '脂',
                            value: Number(res.Fat * 9).toFixed(2)
                        },
                    ]

                    D_NEPie.$ops.series[0].data = NETotal.sort(function (a, b) {
                        return a.value - b.value
                    })
                    D_NEPie.reload()

                    vm.sumFoodType()
                    vm.sumTE()

                    vm.pullComment(1)
                }
            })
        },
        mealSignList: {
            1: '正餐',
            2: '加餐',
            3: '训练前',
            4: '训练中',
            5: '训练后'
        },
        targetName: {
            1: '减脂',
            2: "增肌",
            3: "塑形"
        },

        /*统计图*/
        $D_mealPie: {
            id: "D_mealPie",
            width: '100%',
            height: 130,
            $ops: {
//                        backgroundColor: '#2c343c',
//                title: {
//                    text: '三餐能量统计',
//                    left: 'left',
//                    top: 20,
//                    textStyle: {
//                        color: '#ccc'
//                    }
//                },

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
                        name: '能量摄入',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        //center: ['50%', '50%'],
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
        $D_NEPie: {
            id: "D_NEPie",
            width: '100%',
            height: 130,
            $ops: {
//                        backgroundColor: '#2c343c',
//                title: {
//                    text: '营养素供能占比',
//                    left: 'left',
//                    top: 20,
//                    textStyle: {
//                        color: '#ccc'
//                    }
//                },

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
                        //center: ['50%', '50%'],
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
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
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

        mealList: ['早餐', '午餐', '晚餐'],

        //统计各个分类的食物重量
        sumFoodType: function () {
            //重置食物类型统计
            for (var l = 0; l < vm.foodTypes.length; l++) {
                vm.foodTypes[l].foodTotal = 0
                vm.foodTypes[l].mealTotal = [0, 0, 0]
            }

            //展开计算
            ForEach(vm.DetailsInfo.Details, function (el, i) {
                ForEach(vm.foodTypes, function (al, o) {
                    if (el.Weight > 0 && el.Food.TypeID == al.TypeID) {
                        al.foodTotal = addUp([al.foodTotal, el.Weight]).toFixed(2)
                    }
                })
            })
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
            ForEach(vm.DetailsInfo.Details, function (el, i) {
                ForEach(el.Food, function (cl, key) {
                    if (key.charAt(0) != "$" && vm.TE[key] != undefined) {
                        vm.TE[key].sum = addUp([vm.TE[key].sum, cl * el.Weight]).toFixed(2)
                    }
                })
            })

        },


        //获取
        buy: function (DietID, index) {
            if (!confirm('支付1元钱获取该食谱？')) {
                tip.on('获取被取消')
                return
            }
            require(['../../obj/bridge/Coach.js', '../../obj/bridge/CoachDiet.js'], function (c, cd) {
                c.get(cache.go('UID'), function (res) {
                    if (res.User.Balance.Balance < 1) {
                        alert('您的余额不足1元，请先充值')
                        //todo 打开充值弹出框

                        return
                    }

                    //余额充足
                    cd.add({
                        UID: cache.go('UID'),//教练编号  int(11) 必填:1 默认值:,
                        DietID: DietID,//食谱编号  int(11) 必填:1 默认值:,
                        CPrice: 1,//获取价格  double(15,2) 必填:1 默认值:
                    }, function (res) {
                        tip.on('获取成功!', 1)
                        vm.DetailsInfo.Has = true
                    })

                })
            })
        },

        //食谱评价
        Content: " ", //评论类容
        Comment: function (lv) {
            require(['../../obj/bridge/DietComment.js'], function (obj) {
                var data = {
                    //CommentID: '',//评论编号  int(11) 必填:1 默认值:,
                    DietID: vm.DetailsInfo.DietID,//食谱编号  int(11) 必填:1 默认值:,
                    Content: vm.Content,//评论内容  char(250) 必填:1 默认值:,
                    Level: lv,//评论等级  tinyint(2) 必填:1 默认值:
                }
                obj.add(data, function (res) {
                    tip.on('评论成功', 1)
                    vm.Content = ''
                    //todo 重新获取列表
                    //vm.ready(vm.DetailsInfo.DietID)
                    vm.pullComment(1)
                    vm.DetailsInfo.IsCommented=true

                    if(lv==0){
                        vm.DetailsInfo.Bad++
                    }else{
                        vm.DetailsInfo.Praise++
                    }
                })
            })
        },

        //获取食谱评价
        CP: 0,
        CN: 12,
        CT: 0,
        CList: [],
        pullComment: function (p) {
            require(['../../obj/bridge/DietComment.js'], function (obj) {
                obj.search({
                    P: p,
                    N: vm.CN,
                    W: {
                        DietID: vm.DetailsInfo.DietID
                    }
                }, function (res) {
                    avalon.mix(vm, {
                        CP: res.P,
                        CT: res.T,
                    })
                    ForEach(res.L, function (el) {
                        vm.CList.push(el)
                    })
                })
            })
        }

    })
    window[vm.$id] = vm
})