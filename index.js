/**
 * Created by mooshroom on 2015/12/11.
 */

/*………………………………………………………………………………………………全局配置………………………………………………………………………………………………*/
//var apiURL = './index.php?i=';
var URL = 'http://huiruo2.dev.tansuyun.cn/'
var apiURL = 'http://huiruo2.dev.tansuyun.cn/sf.php?i=' //开发版服务端
//var apiURL = 'http://www.huiruo.cn/index.php?i='  //生产版

/* 全局公用死数据 */
//食物类型数据
var foodTypes = [

    {
        TypeID: "1",
        foodTotal: 0,
        icon: "谷",
        color: "#f3c280",
        Name: "谷类薯类及杂豆",
        TargetWeightMin: "250.00",
        TargetWeightMax: "400.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "2",
        foodTotal: 0,
        icon: "豆",
        color: "#b14e34",
        Name: "大豆类及坚果",
        TargetWeightMin: "25.00",
        TargetWeightMax: "35.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "3",
        foodTotal: 0,
        icon: "蔬",
        color: "#8ea53a",
        Name: "蔬菜类",
        TargetWeightMin: "300.00",
        TargetWeightMax: "500.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "4",
        foodTotal: 0,
        icon: "果",
        color: "#f4a001",
        Name: "水果类",
        TargetWeightMin: "200.00",
        TargetWeightMax: "350.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "5",
        foodTotal: 0,
        icon: "肉",
        color: "#de4d36",
        Name: "畜禽肉类",
        TargetWeightMin: "40.00",
        TargetWeightMax: "75.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "6",
        foodTotal: 0,
        icon: "奶",
        color: "#66aee8",
        Name: "奶类及奶制品",
        TargetWeightMin: "250.00",
        TargetWeightMax: "350.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "7",
        foodTotal: 0,
        icon: "蛋",
        color: "#f8d03e",
        Name: "蛋类",
        TargetWeightMin: "25.00",
        TargetWeightMax: "50.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "8",
        foodTotal: 0,
        icon: "鱼",
        color: "#f97f52",
        Name: "鱼虾类",
        TargetWeightMin: "50.00",
        TargetWeightMax: "100.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "9",
        foodTotal: 0,
        icon: "油",
        color: "#870e03",
        Name: "油",
        TargetWeightMin: "25.00",
        TargetWeightMax: "30.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "10",
        foodTotal: 0,
        icon: "盐",
        color: "#c8c8c8",
        Name: "盐",
        TargetWeightMin: "0.00",
        TargetWeightMax: "6.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
    {
        TypeID: "11",
        foodTotal: 0,
        icon: "另",
        color: "#f1f1f1",
        Name: "其他",
        TargetWeightMin: "0.00",
        TargetWeightMax: "2000.00",
        wanting: false,
        want: [0, 0, 0],
        mealTotal: [0, 0, 0]
    },
]

/*………………………………………………………………………………………………index的视图模型………………………………………………………………………………………………*/
require([
    'avalon',
    'mmRequest',
    //'../../plugins/door/door.js',
    'text!../../nav.json',
    '../../lib/pop/popAlert.js',
], function (avalon, mmRequest, nav) {
    var vm = avalon.define({
        $id: "index",
        ready: function () {

            console.time("门禁配置时间");
            require(['../../plugins/Gate/Gate'], function () {
                window.Gate = newGate({
                    autoLoginAPI: "Diet/User/reLogin",
                    haveLogin: function (res) {
                        console.log(1111)
                    },
                    notLogin: function (res) {
                        console.log(222)

                    },
                })
                console.timeEnd("门禁配置时间");

            })

            console.time("路由加载时间");
            //构建路由
            require([
                "mmRouter",
            ], function () {
                console.timeEnd("路由加载时间");
                avalon.router.get("/", function () {
                    goto('#!/Login/0')
                });
                var navList = JSON.parse(nav).nav;
                //构建导航的路由
                getMap(navList);
                console.log("路由构建完毕")
                //开始监听
                avalon.history.start();


                //vm.toggleSide(0)
                avalon.scan();

                console.time("缓存设置时间");
                vm.uid = cache.go('UID')
                vm.un = cache.go('Name')

                var g = cache.go('G')
                if (g == undefined) {
                    vm.G = []
                    return
                }
                vm.G = addUp(cache.go('G').split(','))
                console.timeEnd("缓存设置时间");
            })

            vm.$watch('html', function () {
                vm.contentHeight = 0
                vm.contentOpacity = 0
                vm.contentMT = -300
                setTimeout(function () {
                    vm.contentHeight = 'auto'
                    vm.contentOpacity = 1
                    vm.contentMT = 0
                }, 250)
            })


        },
        reset: function () {

        },
        lib: "",
        //当前用户的信息
        contentMT: "0",
        contentHeight: 'auto',
        contentOpacity: 1,
        admin: false,
        uid: "",
        un: "",
        G: "",
        g: "", //用户切换页面标记

        showLoginBtn:false,
        //切换到后台的时候调用的方法
        toggleSide: function (i) {
            switch (i) {
                case 0:
                    //跳转到前台
                    vm.nav = vm.CoachNav
                    window.location.href = '#!/Home/0'
                    vm.g = 1
                    break
                case 1:
                    //跳转到后台
                    vm.nav = vm.AdminNav
                    window.location.href = '#!/CoachList/0'
                    vm.g = 2
                    break
            }
        },
        //登出
        logout: function () {
            $$.call({
                    i: 'User/logout',
                    data: {},
                    success: function (res) {
                        window.location.href = "#!/Login/0"
                        Gate.reset()
                        index.uid = ""
                    },
                    err: function (err) {
                        tip.on(err, 1)
                    }
                }
            )
        },
        //jumpToMember:function(){
        //    for(var i = 0; i < vm.G.length; i++){
        //        //if(window.location.href=='#!/CoachList/0'){
        //            if(vm.G[i]==1){
        //                vm.toggleSide(0)
        //                vm.g=1
        //            }
        //        //}
        //    }
        //},
        //jumpToCoach:function(){
        //for(var i = 0; i < vm.G.length; i++) {
        //    //if (window.location.href == '#!/MemberList/0') {
        //        if (vm.G[i] == 2) {
        //            vm.toggleSide(1)
        //            vm.g = 2
        //        //}
        //    }
        //}
        //},

        // 控制姓名的下拉框
        showNameDropdown: false,
        SNDTimeout: "",
        /*
         * toggleND 控制姓名下拉框的出现和小时
         * @param i ：0-消失；1-出现；2-自动
         * */
        toggleND: function (i) {
            clearTimeout(vm.SNDTimeout)

            switch (i) {
                case 0:
                    vm.SNDTimeout = setTimeout(function () {
                        vm.showNameDropdown = false;
                    }, 400)
                    break
                case 1:
                    vm.showNameDropdown = true;
                    break
                case 2:
                    vm.showNameDropdown = !vm.showNameDropdown
            }
        },


        html: '',
        nowTop: '',

        //导航条
        nav: [{
            name: "",
            en: "",
            href: ""
        }],
        CoachNav: [
            {
                name: "我的主页",
                en: "Home",
                href: "#!/Home/0&&&&"
            }, {
                name: "食谱",
                en: "DietList",
                href: "#!/DietList/1&&&&"
            }, {
                name: "食物成分表",
                en: "FoodList",
                href: "#!/FoodList/1&&&&"
            }
        ],
        AdminNav: [
            {
                name: "用户管理",
                en: "CoachList",
                href: "#!/CoachList/1&&&&"
            }, {
                name: "俱乐部",
                en: "ClubList",
                href: '#!/ClubList/1&&&&',
            }, {
                name: "食物成分管理",
                en: "FoodManage",
                href: '#!/FoodManage/1'
            },
            {
                name: "食物替换表管理",
                en: "FoodReplace",
                href: '#!/FoodReplace/0'
            }
        ],

        //组件配置
        //提示框配置
        $opta: {
            id: "tip"
        },
//                模态框配置
//        $optb: {
//            id: "modal"
//        },
        //websocket配置
//        $optc: {
//            id: "ws",
//            server: "ws://180.97.81.190:46032",//线上版本
////                    server: "ws://my.s.tansuyun.cn:46080",//测试版本
//            debug: false
//        },
        $optd: {
            id: "pb"
        },
        //$optTop: {
        //    id: "toTop"
        //},
        $optpop: {
            id: 'pop',
            width: "960",
        },
        $optpop2: {
            id: 'pop2',
            width: "560",
        },
        foodKey: '',

    })

    console.time('基础组件加载时间')
    require([
        '../../lib/tip/tip.js',
        '../../lib/progressbar/progressbar.js',

    ], function () {
        avalon.nextTick(function () {
            console.timeEnd("基础组件加载时间");
            avalon.scan();
            vm.ready()

            //非必须组件加载
            console.time('额外组件加载')
            require([
                '../../lib/food_search/food_search.js',
                '../../plugins/shortcut/shortcut',], function () {
                console.timeEnd('额外组件加载')

                //setTimeout(testPop,1000)

                TimerMember()
            })
        })

    })

    window.index = vm

    /*………………………………………………………………………………………………路由处理函数………………………………………………………………………………………………*/

    //这个函数用来对用户进行权限控制，未来可能会添加多种限制条件
    function checkLimit(fn, limit) {


        if (cache.go("UnitID") == 23) {
            fn()
        } else {
            tip.on("您的账户没有访问改模块的权限")
            //history.go(-1)
        }

    }

    /*路由*/
    function newRouter(n) {
        console.time(n.name + "路由创建耗时")
        var en = n.en;
        n.vm = '../../package/' + en + "/" + en + '.js'
        avalon.router.get('/' + en + '/:i', function (i) {
            vm.showLoginBtn=false
            console.time('模块打开时间')
            //检查权限
            if (n.only > 0) {
                Gate.comeIn({
                    haveLogin: function (res) {

                        //做权限判断
                        var g = res.G

                        for (var i = 0; i < g.length; i++) {
                            if (n.only <= g[i]) {
                                loadVM()
                                return
                            }
                        }

                        goto('#!/login/0')


                    },
                    notLogin: function () {
                        goto('#!/login/0')
                    }
                })

            } else {
                Gate.comeIn({
                    haveLogin: function (res) {

                    },
                    notLogin: function () {

                    }
                })
                loadVM()
            }


            function loadVM() {
                //开启进度条
                try {
                    pb.startT()
                } catch (err) {

                }

                //if (n.name != "登陆") {
                //    document.getElementById("title").innerText = n.name
                //} else {
                //    document.getElementById("title").innerText = '私教营养助手'
                //}

                //tip.on("正在加载……",1)
                if (n.vm) {
                    require([n.vm], function () {
                        avalon.vmodels[en].ready(i)
                        index.nowTop = n.bePartOf
                        if (n.font) {
                            vm.nav = vm.CoachNav
                            vm.g = 1
                        } else {
                            vm.nav = vm.AdminNav
                            vm.g = 2
                        }
                        //tip.off("正在加载……",1)
                        if (pop.state != 0) {
                            pop.close()
                        }
                        //结束进度条
                        try {
                            pb.endT()
                        } catch (err) {
                        }
                    })
                }
                if (n.fn) {
                    n.fn(i)

                    //结束进度条
                    try {
                        pb.endT()
                    } catch (err) {
                    }
                }


                console.log(n.name + "模块加载完毕")
                console.timeEnd('模块打开时间')
            }

        });
        console.timeEnd(n.name + "路由创建耗时")
    }

    function getMap(nav) {
        console.time("路由写入时间")
        var l = nav
        var ll = l.length
        var lsl;
        for (var i = 0; i < ll; ++i) {
            //直接渲染项目
            newRouter(l[i])
        }
        console.timeEnd("路由写入时间")
    }


})


/*………………………………………………………………………………………………全局函数………………………………………………………………………………………………*/
//跨浏览器事件对象方法
var EventUtil = new Object;
EventUtil.addEventHandler = function (oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};

EventUtil.removeEventHandler = function (oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = null;
    }
};

EventUtil.formatEvent = function (oEvent) {
    //if (isIE && isWin) {
    //    oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
    //    oEvent.eventPhase = 2;
    //    oEvent.isChar = (oEvent.charCode > 0);
    //    oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
    //    oEvent.pageY = oEvent.clientY + document.body.scrollTop;
    //    oEvent.preventDefault = function () {
    //        this.returnValue = false;
    //    };
    //
    //    if (oEvent.type == "mouseout") {
    //        oEvent.relatedTarget = oEvent.toElement;
    //    } else if (oEvent.type == "mouseover") {
    //        oEvent.relatedTarget = oEvent.fromElement;
    //    }
    //
    //    oEvent.stopPropagation = function () {
    //        this.cancelBubble = true;
    //    };
    //
    //    oEvent.target = oEvent.srcElement;
    //    oEvent.time = (new Date).getTime();
    //}
    return oEvent;
};

EventUtil.getEvent = function () {
    if (window.event) {
        return this.formatEvent(window.event);
    } else {
        return EventUtil.getEvent.caller.arguments[0];
    }
}

EventUtil.getWhellDalta = function () {
    if (event.wheelDelta) {
        return (client.engine.opera && client.engine.opera < 9.5 ?
            -event.wheelDelta : event.wheelDelta);
    } else {
        return -event.detail * 40;
    }
}

//批量绑定快捷键
function bindK(obj) {
    require(['../../plugins/shortcut/shortcut.js'], function () {
        /*快捷键设置*/

        var x
        for (x in obj) {
            if (x.charAt(0) != "$") {
                if (obj.$opt != undefined) {
                    shortcut.add(x, obj[x], obj.$opt)
                } else {
                    shortcut.add(x, obj[x])
                }

                //console.log(x + "快捷键绑定成功")
            }

        }
    })
}

//批量删除快捷键
function removeK(obj) {
    require(['../../plugins/shortcut/shortcut.js'], function () {
        /*快捷键设置*/

        var x
        for (x in obj) {
            if (x.charAt(0) != "$") {
                shortcut.remove(x)
                //console.log(x + "已解除绑定")
            }

        }
    })
}

//安全相加 把所传入的数组的每一项转化为数值然后相加，返回加的结果
function addUp(arr) {
    var result = 0
    for (var i = 0; i < arr.length; i++) {
        result += Number(arr[i])
    }
    return result
}

//输入框输入限制
function minNumber(el) {
    if (el.value == "" || el.value < 0) {
        el.value = ""
    }
}

/*根据时间戳获取字符串*/
function getDateFromTimestamp(Timestamp) {
    for (var i = Timestamp.length; i < 13; i++) {
        Timestamp += '0';
    }
    var date = new Date();
    date.setTime(Timestamp);

    var month = (date.getMonth() + 1) + ''
    for (var o = month.length; o < 2; o++) {
        month = '0' + month
    }
    var day = date.getDate() + ''
    for (var p = day.length; p < 2; p++) {
        day = '0' + day
    }
    return date.getFullYear() + "-" + month + "-" + day
}

//根据字符串获取时间戳
function newDateAndTime(dateStr) {
    var ds = dateStr.split(" ")[0].split("-");
    var ts = dateStr.split(" ")[1] ? dateStr.split(" ")[1].split(":") : ['00', '00', '00'];
    var r = new Date();
    r.setFullYear(ds[0], ds[1] - 1, ds[2]);
    r.setHours(ts[0], ts[1], ts[2], 0);
    return r;
}

//遍历数组和对象
/*
 * for each 语句，
 * 实现for 和for(var i in y)的功能
 * 调用时
 ForEach(obj,function(i){
 })
 * */
function ForEach(obj, func) {
    if (typeof obj == "object") {
        if (obj.length == undefined) {
            for (var x in obj) {
                //传入（每一项，每一项的序列号）
                func(obj[x], x);
            }
        } else {
            for (var i = 0; i < obj.length; i++) {
                //传入（每一项，每一项的序列号）
                func(obj[i], i);
            }
        }
    } else {
        console.log('类型错误:' + JSON.stringify(obj))
    }
}

//计算每日推荐能量摄入
function getGoodEnergy(target, weight, targetWeight) {
    var goodEnergy = 0
    switch (Number(target)) {
        case 1:
            goodEnergy = targetWeight * 30
            break
        case 2:
            goodEnergy = weight * 50
            break
        case 3:
            goodEnergy = weight * 40
            break
    }
    return goodEnergy
}

//界面跳转的封装函数
function goto(href) {
    window.location.href = href
}

//列表类页面的参数构建
function buildListParams(p, k, t) {
    var params = []
    params.push(p)
    params.push(k)
    params.push(t.join("_"))
    return params.join("&&")
}

//获取滚动高度、屏幕高度、可滚动文本总高度
function getScrollInfo() {
    var scrollTop = 0;
    var clientHeight = 0;
    var scrollHeight = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    //console.log(scrollTop + ',' + clientHeight + ',' + scrollHeight)
    return {
        scrollTop: scrollTop,
        clientHeight: clientHeight,
        scrollHeight: scrollHeight,
    }
}

//转换为10为时间戳发送给后端
/*
 * s 要进行转换的时间戳
 * u 转换后的时间单位 字符串 'ms' 毫秒 's' 秒
 * */
function timeLengthFormat(s, u) {
    switch (u) {
        case 'ms':

            return Math.ceil(s * 1000)
            break
        case 's':
            return Math.ceil(s / 1000)

            break
    }
}

//安全赋值，用于解决服务端在字段为空时返回的空数组无法复制给原本设计为对象格式的字段问题
function safeMix(to, from) {
    ForEach(from, function (el, key) {
        try {
            to[key] = from[key]
        } catch (err) {
            console.log(err)
        }
    })

    return to
}


//测试popAlert组件的韩素
function testPop() {
    pop.open('233')
    setTimeout(function () {
        if (document.querySelector('.state-2')) {
            console.log(document.querySelector('.pop-bg'))
            setTimeout(function () {
                window.location.reload()
            }, 100)

        } else {
            alert('出错啦')
        }
    }, 500)

}

//用来更新会员的状态的函数
function TimerMember(){
    $$.call({
        i:"Timer/member",
        data:{},
        success: function () {
            
        },
        error: function () {
            
        }
    })

}