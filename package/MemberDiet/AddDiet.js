/*
 {{name}} 内在灵魂，沉稳坚毅
 生成时间：{{date}}   破门狂人R2-D2为您服务！
 */
define('AddDiet',[
    'avalon',
    'text!../../package/MemberDiet/AddDiet.html',
    '../../lib/select/select',
    '../../lib/pager/pager.js',
    '../../obj/Diet.js',
    '../../obj/MemberDiet.js'
    //'css!../../package/AddDiet/AddDiet.css'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"AddDiet",
        ready: function (date) {
            vm.date=date
            vm.reset()
            pop.open(html)
            //以及其他方法
            setTimeout(function () {
                vm.searchDiet(vm.P)
            },300)


            vm.$watch('w.*', function () {
                clearTimeout(vm.$timeout)
                vm.$timeout=setTimeout(function () {
                    vm.searchDiet(1)
                },300)
            })

        },
        $timeout:'',
        reset: function () {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
                TargetEnergy:MemberDiet.member.goodEnergy,
                UID:MemberDiet.member.UID,
            })
        },
        UID:"",

        w:{
            Keyword:'',
            Target:[]
        },
        TargetEnergy:'',

        targetName:['减脂','增肌','塑型'],

        $select: {
            id: 'targetSelect_MD',
            //radioBox: true,
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
                vm.w.Target=[]
                ForEach(i, function (el) {
                    vm.w.Target.push(el.id)
                })
            }
        },

        P:1,
        N:5,
        T:150,
        $pager:{
            id:"addDietPager",
            N:5,
            showPage:6,//显示多少页
            getList: function (p) {
                vm.searchDiet(p)
            }
        },

        list:[],
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
            if(data.W.Target[0]==""){
                data.W.Target=[1,2,3]
            }
            if(Number(data.Keyword)>0){
                //为纯数字
                data.W.Energy=['between',[Number(data.Keyword)*0.9,Number(data.Keyword)*1.1]]
                data.Keyword=''
            }
            //验证搜索条件的变化
            if (data.Keyword != vm.$old_w.Keyword) {
                data.P = 1
            }
            if (data.W.Target.join(',') != vm.$old_w.W.Target.join(',')) {
                data.P = 1
            }


            obj_Diet.search(data, {
                success: function (res) {
                    //假设没有数据，重置各种东西
                    avalon.mix(addDietPager, {
                        T: 0,
                        P: vm.P
                    });
                    addDietPager.build(vm.P)
                    vm.list = []

                    //填充返回数据
                    vm.list = res.L
                    vm.P = res.P
                    avalon.mix(addDietPager, {
                        T: res.T,
                        P: res.P
                    });
                    addDietPager.build(res.P)
                }
            })

            vm.$old_w = {
                Keyword: data.Keyword,
                W: data.W
            }

        },
        $old_w:{
            Keyword:'',
            W:{Target:[]}
        },

        date:"",
        //添加会员食谱
        addDiet: function (dietID) {
            var data={
                UID:MemberDiet.member.UID,
                Date:vm.date,
                DietID:dietID
            }

            //发起请求
            obj_MemberDiet.add(data,{
                success: function (res) {
                    tip.on('添加成功',1)
                    MemberDiet.getDiet(MemberDiet.week)
                    pop.close()
                }
            })
        }
        ,mealSignName:{
            1:'正餐',
            2:"加餐",
            3:"训练前",
            4:"训练中",
            5:"训练后"
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

        //显示就餐记录，通过就餐记录创建食谱
        showAteLog: function () {

            //抓取参数
            var data={
                date:vm.date,
                UID:MemberDiet.member.UID
            }

            pop.close()
            //打开
            require(['../../package/MemberDiet/AddByAteLog'], function () {
                setTimeout(function () {
                    AddByAteLog.ready(data)

                },300)
            })

        },

        //获取
        buy: function (DietID,index) {
            if(!confirm('支付1元钱购买该食谱？')){
                tip.on('购买被取消')
                return
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
                        CPrice: 1,//购买价格  double(15,2) 必填:1 默认值:
                    }, function (res) {
                        tip.on('购买成功!',1)
                        vm.list[index].Has=true
                    })

                })
            })
        }



    })
    window[vm.$id]=vm
})