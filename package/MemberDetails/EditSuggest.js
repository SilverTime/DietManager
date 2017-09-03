/**
 * Created by mooshroom on 2016/3/16.
 */
define('EditSuggest', [
    'text!../../package/MemberDetails/EditSuggest.html',
    //'../../obj/bridge/ProblemSuggestion.js'
], function (html,obj) {
    var vm = avalon.define({
        $id: "EditSuggest",
        ready: function () {
            vm.reset()
            pop.open(html)

        },
        reset: function () {
            vm.problems = []
            var from = MemberDetails.Suggestion
            for (var i = 0; i < from.length; i++) {
                vm.problems.push({
                        Problem: from[i].Problem,
                        Suggestion: from[i].Suggestion
                    })
            }
        },
        problems: [],
        addRow: function () {
            vm.problems.push({
                Problem: "",
                Suggestion: ""
            })
        },
        delRow: function (index) {
            vm.problems.splice(index, 1)
            if (vm.problems.length == 0) {
                vm.addRow(0)
            }
        },
        save: function () {
            var UID=MemberDetails.BaseInfo.UID,
                Params=[]
            ForEach(vm.problems, function (el) {
                if(el.Problem==""&&el.Suggestion==""){
                    return
                }
                Params.push({
                    Problem: el.Problem,
                    Suggestion: el.Suggestion
                })
            })



            $$.call({
                i:"ProblemSuggestion/replaceW",
                data:{
                    W:{
                        UID:UID
                    },
                    Data:Params
                },
                success: function (res) {
                    MemberDetails.ready(MemberDetails.BaseInfo.UID)
                    tip.on('保存成功',1)
                    pop.close()
                },
                error: function (err) {
                    tip.on(err)
                }

            })



        }
    })
    window[vm.$id] = vm
})