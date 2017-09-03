/*
 food_search 内在灵魂，沉稳坚毅
 生成时间：Sat Mar 12 2016   破门狂人R2-D2为您服务！
 */
define('food_search', [
    'avalon',
    'text!../../lib/food_search/food_search.html',
    'css!../../lib/food_search/food_search.css',
    '../../lib/food_search/getInputPosition',
    '../../obj/bridge/FoodDic.js'
], function (avalon, html, css, gip, obj) {
    avalon.component('tsy:fs', {
        $template: html,

        /*
         * ***************参数队列区**************************/
        //暴露出来的名字
        id: "FoodsInput",


        /*
         * ***************函数空位**************************/



        onInit: function () {

        },
        /*配置区域*/
        //选取之后的回调函数
        callback: function (Foods) {
            console.log("尚未配置商品搜索组件：" + this.id + "的回调函数")
        },
        //条码枪返回之后的回掉函数
        callbackTM: function (Foods) {
            console.log("尚未配置商品搜索组件：" + this.id + "的条码枪回调函数，将执行默认回调")
            this.callback(Foods)
        },


        $customerID: "",
        /*内部区域*/

        //控制面板位置
        left: '',
        top: '',

        //控制面板的显示
        showing: false,

        hovering: false,
        goHover: function () {
        },
        selectFoods: function () {
        },


        // 商品搜索
        FoodsWaiting: false,
        FoodsDone: false,
        Foods: [],
        FoodsKey: "",
        goLastKey: "",
        focusFoods: -1,
        onFoods: false,
        pagerFoods: function () {
        },
//        lastInput:0,
        GP: 1,
        GT: 0,
        GN: 8,
        /*为判断条码创造的变量*/
        lastTime: 0,      //上次改变时间
        inputTimes: 0,//累计连续输入次数
        searchTimeOut: 0,
        thatIsTM: false,       //是否为条形码

        $waiting: false,
        $waitTime: 2,
        jump2Foods: function () {

        },
        mustOut: function () {

        },


        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)
            //将参数放入对于的地方
            try {
                if (elem.data('lv') != undefined) {
                    //vm.lv = elem.data('lv')
                    //todo 改写上方的'lv'为你想要获取到的值
                }
            } catch (err) {
            }
            vm.$FoodsHotKey = {
                $opt: {
                    type: "keydown"
                },
                "up": function () {
                    if (vm.focusFoods > 0) {
                        vm.focusFoods--
                    }
                    else {
                        vm.focusFoods = vm.Foods.length - 1
                    }
                },
                "down": function () {
                    if (vm.focusFoods < vm.Foods.length - 1) {
                        vm.focusFoods++
                    }
                    else {
                        vm.focusFoods = 0
                    }
                },
                'left': function () {
                    if (vm.GP > 1) {
                        vm.pagerFoods(1)
                    }

                },
                "right": function () {
                    if (vm.GP < (Math.ceil(vm.GT / vm.GN)))
                        vm.pagerFoods(-1)
                },
                'enter': function () {
                    if (vm.focusFoods != -1) {
                        vm.jump2Foods(vm.focusFoods)
                    }
                }
            }
//选中商品
            vm.selectFoods = function (index) {
                vm.focusFoods = index
            };
            //执行回调
            vm.jump2Foods = function (index) {

                vm.callback(vm.Foods[index])
                vm.goReset()
                vm.mustOut()

            };
            vm.mustOut = function () {
                vm.showing = vm.hovering = false
            }
            vm.goReset = function () {
                vm.Foods = []
                vm.GP = 1
                vm.GT = 0
                vm.FoodsKey = ""
                vm.goLastKey = ""
                vm.focusFoods = -1
                vm.onFoods = false
                vm.FoodsWaiting = false
                vm.FoodsDone = false
                vm.thatIsTM = ''
            };
            vm.posePanel = function (ele) {
                var p = cursor.getInputPositon(ele)
                vm.left = p.left
                vm.top = p.bottom
                vm.searchFoods(ele.value)
                vm.show(true)
            }

            vm.show = function (bool) {
                vm.showing = bool
                if (bool) {
                    bindK(vm.$FoodsHotKey)
                } else {
                    removeK(vm.$FoodsHotKey)
                }
            }
            vm.goHover = function (i) {
                vm.hovering = i

            }

            //vm.goOut=function (i) {
            //    vm.onFoods = 0
            //}
            vm.searchFoods = function (key) {
                if (key == "") {
                    //重置
                    vm.goReset()
                } else if (key != vm.goLastKey) {
                    vm.GP = 1
                    vm.GT = 0
                    /*
                     * 判断是否为条码枪输入的方法：
                     * 1. 快速输入，
                     * 2. 输入结果>=5&&<=30
                     * 3. 输入结果符合条码正则表达式
                     * 4. 返回结果有且只有一个
                     * */
                    vm.FoodsKey = vm.goLastKey = key


                    //之前有延迟的
                    vm.inputTimes++ //用于连击判断的连击累计
                    console.log("*" + vm.inputTimes + "连击")
                    clearTimeout(vm.searchTimeOut)

                    //条码输入第一层判断
                    reg = new RegExp(/[A-Za-z\/0-9]{5,30}/g)//判断条码的表达式
                    if ((vm.inputTimes >= 5 && vm.inputTimes <= 30) && reg.test(key)) {
                        //初步判断是条码输入
                        console.log("初步判断是条码输入:" + key)
                        vm.thatIsTM = key
                        vm.searchTimeOut = setTimeout(function () {

                            vm.callFoods()
                            vm.searchTimeOut = 0
                        }, 80)//为反复测试之后，刚好在人肉输入的间隙，不会导致过量请求的值
                    } else {
                        //人肉输入
                        vm.searchTimeOut = setTimeout(function () {
                            vm.callFoods()
                            vm.searchTimeOut = 0
                        }, 80)
                    }


                }
            };

            vm.pagerFoods = function (n) {
                var newGP = vm.GP + -n;
                if (newGP >= 1) {
                    vm.GP = newGP
                }
                else {
                    vm.GP = 1
                }
                clearTimeout(vm.searchTimeOut)
                vm.searchTimeOut = setTimeout(function () {
                    vm.callFoods()
                    vm.searchTimeOut = 0
                }, 80)
            };
            //正是召唤商品列表
            vm.callFoods = function () {
                vm.inputTimes = 0
                vm.FoodsWaiting = true
                if (vm.GP < 1) {
                    vm.GP = 1
                }
                try {
                    vm.$customerID = bill.customer.CustomerID
                } catch (err) {
                    console.log(err.message)
                }

                //组装请求参数
                var data = {
                    Keyword: vm.FoodsKey,
                    P: vm.GP,
                    N: vm.GN,
                }

                //发起请求
                obj.search(
                    data,
                    function (res) {
                        vm.FoodsDone = true
                        if (vm.GP == res.P) {
                            if (res.L.length && vm.FoodsKey != '') {
                                //vm.GP = res.P


                                var list = []
                                var resL = res.L
                                var len = resL.length

                                for (var i = 0; i < len; i++) {

                                    var All = 0;
                                    //todo 后面在这里添加对数据的2次加工,

                                    list.push(resL[i])


                                }


                                vm.Foods = list
                                /***判断是否为条形码***/
                                if (res.L.length == 1 && vm.thatIsTM != "" && vm.thatIsTM == res.L[0].BarCode) {

                                    vm.callbackTM(list[0])
                                    //vm.FoodsKey = '';
                                    //vm.thatIsTM = "";       //是否为条形码
                                    vm.goReset()

                                    return;
                                }
                            } else {
                                vm.Foods = []
                                //vm.GP--

                            }
                            vm.GT = res.T
                        }
                        vm.FoodsWaiting = false
                    },
                    function (err) {
                        vm.FoodsDone = true
                        tip.on(err)
                    }
                )
            }
            if (vm.id != "") {
                window[vm.id] = vm
            }
        },
        $ready: function (vm, elem) {

        },


    })
})

/*返回的示例
 *
 *
 * */

//var ex = {
//    "d": {
//        "L": [{
//            "FoodID": "1",
//            "Name": "tang",
//            "Energy": "1",
//            "Unit": "g",
//            "Water": "0.0000",
//            "Protein": "0.0000",
//            "Fat": "0.0000",
//            "DF": "0.0000",
//            "CHO": "0.0000",
//            "VA": "0.0000",
//            "VB1": "0.0000",
//            "VB2": "0.0000",
//            "Niacin": "0.0000",
//            "VE": "0.0000",
//            "Na": "0.0000",
//            "Ca": "0.0000",
//            "Fe": "0.0000",
//            "TypeID": "1",
//            "VC": "0.0000",
//            "CH": "0.0000",
//            "Eatable": "0.0000"
//        }, {
//            "FoodID": "2",
//            "Name": "2",
//            "Energy": "1",
//            "Unit": "g",
//            "Water": "0.0000",
//            "Protein": "0.0000",
//            "Fat": "0.0000",
//            "DF": "0.0000",
//            "CHO": "0.0000",
//            "VA": "0.0000",
//            "VB1": "0.0000",
//            "VB2": "0.0000",
//            "Niacin": "0.0000",
//            "VE": "0.0000",
//            "Na": "0.0000",
//            "Ca": "0.0000",
//            "Fe": "0.0000",
//            "TypeID": "1",
//            "VC": "0.0000",
//            "CH": "0.0000",
//            "Eatable": "0.0000"
//        }, {
//            "FoodID": "3",
//            "Name": "3",
//            "Energy": "0",
//            "Unit": "g",
//            "Water": "0.0000",
//            "Protein": "0.0000",
//            "Fat": "0.0000",
//            "DF": "0.0000",
//            "CHO": "0.0000",
//            "VA": "0.0000",
//            "VB1": "0.0000",
//            "VB2": "0.0000",
//            "Niacin": "0.0000",
//            "VE": "0.0000",
//            "Na": "0.0000",
//            "Ca": "0.0000",
//            "Fe": "0.0000",
//            "TypeID": "1",
//            "VC": "0.0000",
//            "CH": "0.0000",
//            "Eatable": "0.0000"
//        }, {
//            "FoodID": "4",
//            "Name": "4",
//            "Energy": "0",
//            "Unit": "g",
//            "Water": "0.0000",
//            "Protein": "0.0000",
//            "Fat": "0.0000",
//            "DF": "0.0000",
//            "CHO": "0.0000",
//            "VA": "0.0000",
//            "VB1": "0.0000",
//            "VB2": "0.0000",
//            "Niacin": "0.0000",
//            "VE": "0.0000",
//            "Na": "0.0000",
//            "Ca": "0.0000",
//            "Fe": "0.0000",
//            "TypeID": "1",
//            "VC": "0.0000",
//            "CH": "0.0000",
//            "Eatable": "0.0000"
//        }, {
//            "FoodID": "5",
//            "Name": "5",
//            "Energy": "0",
//            "Unit": "g",
//            "Water": "0.0000",
//            "Protein": "0.0000",
//            "Fat": "0.0000",
//            "DF": "0.0000",
//            "CHO": "0.0000",
//            "VA": "0.0000",
//            "VB1": "0.0000",
//            "VB2": "0.0000",
//            "Niacin": "0.0000",
//            "VE": "0.0000",
//            "Na": "0.0000",
//            "Ca": "0.0000",
//            "Fe": "0.0000",
//            "TypeID": "1",
//            "VC": "0.0000",
//            "CH": "0.0000",
//            "Eatable": "0.0000"
//        }, {
//            "FoodID": "6",
//            "Name": "6",
//            "Energy": "0",
//            "Unit": "g",
//            "Water": "0.0000",
//            "Protein": "0.0000",
//            "Fat": "0.0000",
//            "DF": "0.0000",
//            "CHO": "0.0000",
//            "VA": "0.0000",
//            "VB1": "0.0000",
//            "VB2": "0.0000",
//            "Niacin": "0.0000",
//            "VE": "0.0000",
//            "Na": "0.0000",
//            "Ca": "0.0000",
//            "Fe": "0.0000",
//            "TypeID": "1",
//            "VC": "0.0000",
//            "CH": "0.0000",
//            "Eatable": "0.0000"
//        }], "P": 1, "N": 20, "T": "6"
//    }, "tsy": "", "UID": null, "UN": null, "err": "", "c": 200
//}