/**
 * Created by mooshroom on 2016/4/28.
 */
define('AddByAteLog', [
    'avalon',
    'text!../../package/MemberDiet/AddByAteLog.html'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "AddByAteLog",
        ready: function (data) {
            vm.reset()
            pop.open(html)
            vm.$data = data
            vm.getAteLogByUID()
        },
        reset: function () {
            avalon.mix(vm,{
                TargetEnergy:MemberDiet.member.goodEnergy
            })
        },
        TargetEnergy:0,
        $data: {},

        //获取就餐记录
        list: [],

        P: 0,
        N: 16,
        T:0,
        getAteLogByUID: function () {
            vm.P++
            $$.call({
                i: "Diet/AteLog/search",
                data: {
                    W:{
                        UID: vm.$data.UID,
                    },
                    Sort: 'Date DESC',
                    P: vm.P,
                    N: vm.N
                },
                success: function (res) {

                    ForEach(res.L, function (el) {

                        //处理食物列表数据
                        var logD={1:[],2:[],3:[]}
                        ForEach(el.Details, function (el) {
                            logD[el.MealID].push(el)
                        })

                        el.Details=logD

                        vm.list.push(el)
                    })
                    vm.T=res.T
                }
            })
        },

        //跳转到添加页面
        choose: function (LogID) {
            var href = '#!/EditDiet/3&&' +
                LogID +
                '&&' +
                vm.$data.UID +
                '&&' +
                vm.$data.date;
            window.location.href=href
        }
    })
    window[vm.$id] = vm
})