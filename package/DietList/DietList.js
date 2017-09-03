/*
 食谱列表 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('DietList', [
    'avalon',
    'text!../../package/DietList/DietList.html',
    'css!../../package/DietList/DietList.css',
    '../../obj/Diet.js',
    '../../lib/select/select.js',
    '../../lib/pager/pager.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "DietList",
        ready: function (i) {

            //解析参数
            /*
             * 可能的参数格式:P&&Keyword&&status[]
             * 例如：1&&Keyword&&1_2_3
             * */
            var params = String(i).split("&&")
            //置入参数


            vm.reset(params);


            index.html = html;

            vm.searchDiet(vm.P)


            vm.$watch('w.*', function () {
                clearTimeout(vm.timeout)
                vm.timeout = setTimeout(function () {
                    goto('#!/DietList/' + vm.buildParams(vm.P, vm.w.Keyword, vm.w.Target))
                }, 300)
            })


        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: params[0],
                w: {
                    Keyword: params[1],
                    Target:params[2].split("_")
                }
            })

            setTimeout(function () {
                var target=params[2].split("_")
                if(target[0]==''){
                    return
                }
                ForEach(target, function (el) {
                    selectDL.list[el-1].checked=true
                })
            },500)


        },
        buildParams: function (p, k, t) {
            var params = []
            params.push(p)
            params.push(k)
            params.push(t.join("_"))
            return params.join("&&")
        },

        P: 1,
        N: 5,
        T: 150,
        $pager: {
            id: "DietListPager",
            N: 5,
            showPage: 6,//显示多少页
            getList: function (p) {
                goto('#!/DietList/' + vm.buildParams(p, vm.w.Keyword, vm.w.Target))
            }
        },

        list: [],
        targetName: ['减脂', '增肌', '塑型'],
        searchDiet: function (p) {
            var data = {
                P: p,
                N: vm.N,
                Keyword: vm.w.Keyword,
                W: {
                    Target: vm.w.Target
                },
                Sort:'TotalUse DESC'
            }
            if(data.W.Target[1]==""||data.W.Target[1]==undefined||data.W.Target.length==0){
                data.W.Target=['in',[1,2,3]]
            }

            if(Number(data.Keyword)>0){
                //为纯数字
                data.W.Energy=['between',[Number(data.Keyword)-400,Number(data.Keyword)+400]]
                data.Keyword=''
            }
            //data.W.Target.unshift('in')
            //vm.$old_w.W.Target.unshift('in')
            //验证搜索条件的变化
            if (data.Keyword != vm.$old_w.Keyword) {
                data.P = 1
            }
            if (data.W.Target.join(',') != vm.$old_w.W.Target.join(',')) {
                data.P = 1
            }

            require(['../../obj/bridge/Diet.js'], function (obj) {
                obj.search(data,  function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(DietListPager, {
                            T: 0,
                            P: vm.P
                        });
                        DietListPager.build(vm.P)
                        vm.list = []

                        //填充返回数据
                        vm.list = res.L
                        vm.P = res.P
                        avalon.mix(DietListPager, {
                            T: res.T,
                            P: res.P
                        });
                        DietListPager.build(res.P)
                    }
                )
            })


            vm.$old_w = {
                Keyword: data.Keyword,
                W: data.W
            }

        },
        $old_w: {
            Keyword: '',
            W: {Target: []}
        },
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
            id: "selectDL",
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
                vm.w.Target = ['in',[]]
                ForEach(i, function (el) {
                    vm.w.Target[1].push(el.id)
                })
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
        buy: function (DietID,index) {
            if(vm.list[index].Price>0){
                if(!confirm('支付'+vm.list[index].Price+'元钱获取该食谱？')){
                    tip.on('获取被取消')
                    return
                }
            }

            require(['../../obj/bridge/Coach.js','../../obj/bridge/CoachDiet.js'], function (c,cd) {
                c.get(cache.go('UID'), function (res) {
                    if(res.User.Balance.Balance<1){
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
                        tip.on('获取成功!',1)
                        vm.list[index].Has=true
                    })

                })
            })
        }


    });
    window[vm.$id] = vm
});