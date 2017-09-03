/*
 个人中心 内在灵魂，沉稳坚毅
 生成时间：Tue Nov 08 2016   破门狂人R2-D2为您服务！
 */
define('Home', [
    'avalon',
    'text!../../package/Home/Home.html',
    'css!../../package/Home/Home.css',
    '../../obj/bridge/Coach.js',
    '../../lib/pager/pager',
    '../../lib/select/select.js',
], function (avalon, html, css, obj_Coach) {
    var vm = avalon.define({
        $id: "Home",
        ready: function (i) {


            index.html = html

            //以及其他方法
            if(!cache.go('UID')>0){
                index.showLoginBtn=true

            }

            /*参数：[主页用户id，标签页状态，,p,keyword,status]*/
            var params = String(i).split("&&")

            if(vm.UID!=params[0]){
                vm.reset()
            }

            vm.UID = params[0]
            vm.myself = (vm.UID == cache.go('UID'))

            if (params[0] == 0) {
                //跳转当前用户的主页
                goto('#!/Home/' + cache.go('UID') + "&&member&&1&&&&")
                return
            }

            if (params.length < 5) {
                //跳转会员标签下
                goto('#!/Home/' + params[0] + "&&member&&1&&&&")
                return
            }

            vm.$params = params


            vm.getCoach(params[0])

            vm.tabDoing[params[1]](params[2], params[3], params[4])


        },
        $params: [],
        reJump: function () {
            //goto('#!/Home/' + vm.$params.join('&&'))

            vm.ready(vm.$params.join('&&'))
        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                myself: false,
                UID: "",
                Coach: {
                    UID: '',//UID  int(11) 必填:1 默认值:,
                    ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                    Type: '',//类型  tinyint(2) 必填:1 默认值:,
                    Tel: '',//电话  char(20) 必填:1 默认值:,
                    Address: '',//地址  char(250) 必填:1 默认值:,
                    HeadImgURL: '',//头像地址  char(250) 必填: 默认值:,
                    Email: '',//电子邮箱  char(250) 必填: 默认值:,
                    Introduce: '',//自我介绍  text 必填: 默认值:,
                    Alipay: '',//支付宝账户  char(250) 必填: 默认值:,
                    BackgrondImgURL: '',//背景图地址  char(250) 必填: 默认值:,
                    MemberAmount: '',//累积学员数  int(11) 必填:1 默认值:,
                    DietAmount: '',//创建食谱数  int(11) 必填:1 默认值:,
                    SaleAmount: '',//累积售出数  int(11) 必填:1 默认值:,
                    Club: {
                        ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                        Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                        Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                        Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                        Contactor: '',//联系人  char(20) 必填:1 默认值:,
                        Status: '',//状态  tinyint(2) 必填: 默认值:
                    },
                    StartTime: "",//执教开始时间
                    Account: '',//Account  char(250) 必填:1 默认值:,
                    PWD: '',//PWD  char(250) 必填:1 默认值:,
                    Status: '',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
                    Name: '',//姓名  char(250) 必填:1 默认值:,
                    Sex: '',//性别  tinyint(2) 必填:1 默认值:,
                    CTime: '',//添加时间  int(10) 必填:1 默认值:
                    User: {
                        UID: '',//UID  int(11) 必填:1 默认值:,
                        Account: '',//Account  char(250) 必填:1 默认值:,
                        PWD: '',//PWD  char(250) 必填:1 默认值:,
                        Status: '',//状态  tinyint(2) 必填: 默认值:,
                        Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                        Sex: '',//性别  tinyint(2) 必填:1 默认值:,
                        ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                        Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                        CTime: '',//添加时间  int(10) 必填:1 默认值:,
                        Balance: {
                            UID: '',//用户编号  int(11) 必填:1 默认值:,
                            Balance: '',//账户余额  double(15,2) 必填:1 默认值:
                        },
                        Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                        Contactor: '',//联系人  char(20) 必填:1 默认值:
                    }
                },
                //标签页动作
                nowTab: '',
                page: "",
                //获取用户资料
                list: [],
                MP: 1,
                N: 12,
                T: "",
                MKeywords: "",
                status: [0, 1],//默认全部加载
                //判断查找结果是否为空,0为非空
                searchNull: 0,

            })
        },

        //基本资料相关
        myself: false,
        UID: "",
        Coach: {
            UID: '',//UID  int(11) 必填:1 默认值:,
            ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
            Type: '',//类型  tinyint(2) 必填:1 默认值:,
            Tel: '',//电话  char(20) 必填:1 默认值:,
            Address: '',//地址  char(250) 必填:1 默认值:,
            HeadImgURL: '',//头像地址  char(250) 必填: 默认值:,
            Email: '',//电子邮箱  char(250) 必填: 默认值:,
            Introduce: '',//自我介绍  text 必填: 默认值:,
            Alipay: '',//支付宝账户  char(250) 必填: 默认值:,
            BackgrondImgURL: '',//背景图地址  char(250) 必填: 默认值:,
            MemberAmount: '',//累积学员数  int(11) 必填:1 默认值:,
            DietAmount: '',//创建食谱数  int(11) 必填:1 默认值:,
            SaleAmount: '',//累积售出数  int(11) 必填:1 默认值:,
            Club: {
                ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                Contactor: '',//联系人  char(20) 必填:1 默认值:,
                Status: '',//状态  tinyint(2) 必填: 默认值:
            },
            StartTime: "",//执教开始时间
            Account: '',//Account  char(250) 必填:1 默认值:,
            PWD: '',//PWD  char(250) 必填:1 默认值:,
            Status: '',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
            Name: '',//姓名  char(250) 必填:1 默认值:,
            Sex: '',//性别  tinyint(2) 必填:1 默认值:,
            CTime: '',//添加时间  int(10) 必填:1 默认值:
            User: {
                UID: '',//UID  int(11) 必填:1 默认值:,
                Account: '',//Account  char(250) 必填:1 默认值:,
                PWD: '',//PWD  char(250) 必填:1 默认值:,
                Status: '',//状态  tinyint(2) 必填: 默认值:,
                Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                Sex: '',//性别  tinyint(2) 必填:1 默认值:,
                ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                CTime: '',//添加时间  int(10) 必填:1 默认值:,
                Balance: {
                    UID: '',//用户编号  int(11) 必填:1 默认值:,
                    Balance: '',//账户余额  double(15,2) 必填:1 默认值:
                },
                Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                Contactor: '',//联系人  char(20) 必填:1 默认值:
            }
        },
        getCoach: function (id) {
            if (id == vm.Coach.UID) {
                return
            }
            obj_Coach.get(id,
                function (res) {
                    res.StartTime = avalon.filters.date(Number(res.StartTime) * 1000, 'yyyy-MM-dd')
                    if (res.BackgrondImgURL == '' || res.BackgrondImgURL == null) {
                        res.BackgrondImgURL = './src/images/HomeBG.jpg'
                    }
                    if (res.HeadImgURL == "" || res.HeadImgURL == null) {
                        res.HeadImgURL = './src/images/head.png'
                    }

                    ForEach(res, function (el, key) {
                        if (el == false && typeof el == "object") {
                            return
                        }
                        vm.Coach[key] = res[key]
                    })
                    //vm.Coach=res
                })
        },


        //编辑背景图
        editBG: function () {
            require(['../../package/Home/EditBG.js'], function (edit) {
                edit.ready()
            })
        },

        //编辑头像
        editHead: function () {
            require(['../../package/Home/EditHead.js'], function (edit) {
                edit.ready()
            })
        },

        //编辑教练信息
        editCoach: function () {
            require(['../../package/Home/EditCoach.js'], function (edit) {
                edit.ready()
            })
        },

        //编辑教练信息
        editAlipay: function () {
            require(['../../package/Home/EditAlipay.js'], function (edit) {
                edit.ready()
            })
        },


        //标签页动作
        nowTab: '',
        page: "",
        tabDoing: {
            member: function (p, k, s) {

                if (!vm.myself) {
                    vm.$params[1] = 'myDiet'
                    vm.$params[2] = 1
                    goto('#!/Home/' + vm.$params.join('&&'))
                    return
                }

                vm.nowTab = 0
                vm.memberReady(p, k, s)
            },
            myDiet: function (p, k, s) {
                vm.nowTab = 1
                var has = false
                vm.dietReady(p, k, s, has)
                vm.$watch("w.Keyword", function (a, b) {
                    vm.$params[3] = a
                    vm.$params[2] = 1
                    goto('#!/Home/' + vm.$params.join("&&"))
                })


            },
            buyedDiet: function (p, k, s) {
                if (!vm.myself) {
                    vm.$params[1] = 'myDiet'
                    vm.$params[2] = 1
                    goto('#!/Home/' + vm.$params.join('&&'))
                    return
                }
                var has = true
                vm.nowTab = 2
                vm.dietReady(p, k, s, has)
                vm.$watch("w.Keyword", function (a, b) {
                    vm.$params[3] = a
                    vm.$params[2] = 1
                    goto('#!/Home/' + vm.$params.join("&&"))
                })


            },
        },

        /*会员方法*/
        memberReady: function (p, k, s) {
            require([
                'avalon',

                'css!../../package/MemberList/MemberList.css',
                '../../obj/Member.js',
                '../../lib/pager/pager'
            ], function (avalon, css, member, pager) {
                //解析参数
                /*
                 * 可能的参数格式:P&&Keyword&&status[]
                 * 例如：1&&Keyword&&1_2_3
                 * */
                var params = [p, k, s]
                //置入参数
                if (params[2] == "") {
                    //todo goto('#!/' + vm.$id + '/' + i + '0_1')
                    vm.$params[4] = '0_1'
                    vm.reJump()
                    return
                }

                //vm.reset(params);
                avalon.mix(vm, {
                    //要重置的东西最后都放回到这里
                    MP: p,
                    MKeywords: k,
                    status: s.split("_"),
                    statusStr: s,
                    searchNull: 0,
                })


                //avalon.scan(html)
                vm.getBaselist(vm.MP);
                vm.$watch('MKeywords', function () {
                    clearTimeout(vm.timeout);
                    vm.timeout = setTimeout(function () {
                        //todo goto('#!/' + vm.$id + '/' + buildListParams(1, vm.MKeywords, vm.status))
                        vm.$params[2] = 1
                        vm.$params[3] = vm.MKeywords
                        vm.reJump()
                    }, 300)
                })
            })
        },
        //将添加会员页面渲染到pop
        addMember: function () {
            require(["../../package/MemberList/addMember.js"], function () {
                addMember.ready();
            })
        },

        //获取分页
        $paper: {
            id: "MemberListPager",
            N: 12,
            showPage: 6,
            getList: function (p) {
                vm.$params[2] = p
                goto('#!/Home/' + vm.$params.join("&&"))
            }
        },

        //获取用户资料
        list: [],
        MP: 1,
        N: 12,
        T: "",
        MKeywords: "",
        status: [0, 1],//默认全部加载
        //判断查找结果是否为空,0为非空
        searchNull: 0,

        getBaselist: function (p) {
            var data = {
                W: {
                    //Status: vm.status
                    CoachID:cache.go('UID')
                },
                Keyword: vm.MKeywords,
                P: p,
                N: vm.N,
                Sort: "CTime DESC"
            };

            data.W.Status=['in',vm.status]
            //todo 验证MKeywords以及status是否变化，
            /*
             * 如果，有变化，说明是通过筛选项触发的，则，分页重置为1
             * 否则，说明是从分页触发的，则分页不重置。同时，MKeywords与status保持不变
             * */

            obj_Member.search(data, {
                success: function (res) {

                    if (res == null || res == undefined || res == "" || res == [] || res == {} || res == false) {
                        vm.searchNull = 1;
                    }
                    else {
                        vm.searchNull = 0;
                        vm.list=res.L
                        vm.MP = res.P;
                        avalon.mix(MemberListPager, {
                            T: res.T,
                            P: res.P
                        });
                        MemberListPager.build(res.P)
                    }
                },
                error: function () {
                    vm.list = [];
                    vm.searchNull = 1;
                }
            })
        },


        //点击“上课中”、“已停课”标签，切换状态筛选
        statusStr: '',
        toggleStatus: function (status) {
            //clearTimeout(vm.timeout);
            vm.$params[2] = 1
            vm.$params[4] = status.join('_')
            goto('#!/Home/' + vm.$params.join("&&"))
        },

        //删除成员
        delMember: function (uid) {
            if (confirm('删除该会员后，将无法还原，是否真要删除？')) {
                require(['../../obj/bridge/Member.js'], function (obj) {
                    obj.save(uid,{Status:-1}, function (res) {
                        vm.reJump()
                    })
                })
            }
        },


        /*食谱方法*/

        dietReady: function (p, k, s, has) {
            var data = {
                P: p,
                N: vm.DN,
                Keyword: k,
                W: {
                    //Target: vm.w.Target
                },

            }
            if (vm.w.Target.length==0) {
                data.W.Target = ['in',[1, 2, 3]]
            }else{
                data.W.Target=['in',vm.w.Target]
            }

            if(Number(data.Keyword)>0){
                //为纯数字
                data.W.Energy=['between',[Number(data.Keyword)-400,Number(data.Keyword)+400]]
                data.Keyword=''
            }


            if(has){
                //获取我购买的食谱
                data.W.UID=vm.UID
                require(['../../obj/bridge/CoachDiet.js'], function (obj) {
                    obj.search(data, function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(HomeDietListPager, {
                            T: 0,
                            P: 1
                        });
                        HomeDietListPager.build(1)
                        vm.Dlist = []

                        //填充返回数据
                        ForEach(res.L, function (el) {
                            vm.Dlist.push(el.Diet)
                        })


                        vm.DP = res.P
                        avalon.mix(HomeDietListPager, {
                            T: res.T,
                            P: res.P
                        });
                        HomeDietListPager.build(res.P)

                    })
                })
                return

            }

            //获取我创建的食谱
            data.W.CUID=vm.UID
            data.Sort='TotalUse DESC'
            require(['../../obj/bridge/Diet.js'], function (obj) {
                obj.search(data, function (res) {
                    //假设没有数据，重置各种东西
                    avalon.mix(HomeDietListPager, {
                        T: 0,
                        P: 1
                    });
                    HomeDietListPager.build(1)
                    vm.list = []

                    //填充返回数据
                    vm.Dlist = res.L
                    vm.DP = res.P
                    avalon.mix(HomeDietListPager, {
                        T: res.T,
                        P: res.P
                    });
                    HomeDietListPager.build(res.P)

                })
            })


        },

        DP: 1,
        DN: 5,
        DT: 150,
        $DPager: {
            id: "HomeDietListPager",
            N: 5,
            showPage: 6,//显示多少页
            getList: function (p) {
                vm.$params[2] = p
                goto('#!/Home/' + vm.$params.join("&&"))
            }
        },

        Dlist: [],
        targetName: ['减脂', '增肌', '塑型'],


        TargetList: [
            {
                name: "减脂",
                Target: "1",
                checked: false
            },
            {
                name: "增肌",
                Target: "2",
                checked: false
            },
            {
                name: "塑型",
                Target: "3",
                checked: false
            }
        ],
        allChecked: false,

        $selectDL: {
            id: "homeSelectDL",
            list: [
                {
                    name: '减脂',
                    id: "1",
                    checked: false
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
                vm.w.Target = []
                ForEach(i, function (el) {
                    vm.w.Target.push(el.id)
                })

                vm.$params[2] = 1
                goto('#!/Home/' + vm.$params.join("&&"))
                vm.reJump()
            }
        },

        w: {
            Keyword: "",
            Target: []
        },

        mealSignName: {
            1: '正餐',
            2: "加餐",
            3: "训练前",
            4: "训练中",
            5: "训练后"
        },

        //获取
        buy: function (DietID, index) {
            if (cache.go('UID')==undefined||!confirm('支付1元钱获取该食谱？')) {

                if(cache.go('UID'==undefined)){
                    tip.on('您需要先登录才能获取该食谱',1)
                    return
                }
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
                        CPrice: 1,//购买价格  double(15,2) 必填:1 默认值:
                    }, function (res) {
                        tip.on('获取成功!', 1)
                        vm.list[index].Has = true
                    })

                })
            })
        }

    })
    window[vm.$id] = vm
})