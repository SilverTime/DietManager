/**
 * Created by mooshroom on 2016/3/15.
 */
define([
    'text!../../package/MemberDetails/EditHabit.html',
    '../../obj/Habit.js'
], function (html) {
    var vm = avalon.define({
        $id: "EditHabit",
        ready: function () {
            vm.reset()
            pop.open(html)
        },
        reset: function () {
            avalon.mix(vm, {
                Habit: {
                    "History": MemberDetails.BaseInfo.History,
                    "Living": MemberDetails.BaseInfo.Living,
                    "Survey": MemberDetails.BaseInfo.Survey
                }
            })
        },
        "Habit": {
            "History": "",
            "Living": "",
            "Survey": ""
        },

        save: function () {
            var Params = {
                "History": vm.Habit.History,
                "Living": vm.Habit.Living,
                "Survey": vm.Habit.Survey
            }

           if(Params.History==""&&Params.Living==""&&Params.Survey==""){
               return tip.on('没有添加任何字段')
           }


                if (MemberDetails.BaseInfo.History === null&&MemberDetails.BaseInfo.History === null&&MemberDetails.BaseInfo.History === null) {
                    //调用add
                    require(['../../obj/bridge/Habit.js'], function (obj) {
                        Params.UID = MemberDetails.BaseInfo.UID
                        obj.add(Params, function (res) {
                            MemberDetails.ready(res.UID)
                            pop.close()

                        })
                    })

                    return
                }

            require(['../../obj/bridge/Habit.js'], function (obj) {
                obj.save(MemberDetails.BaseInfo.UID, Params, function (res) {
                    MemberDetails.ready(res.UID)
                    pop.close()

                })
            })

        }
    })
    window[vm.$id] = vm
})