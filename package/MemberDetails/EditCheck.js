/**
 * Created by mooshroom on 2016/3/15.
 */
define([
    'text!../../package/MemberDetails/EditCheck.html',
    '../../obj/Checkupdic.js'
], function (html) {
    var vm = avalon.define({
        $id: "EditCheck",
        ready: function () {
            vm.reset()
            pop.open(html)
            vm.getCheckItem()
        },
        reset: function () {
            avalon.mix(vm, {
                checkList:[],
            })

            for(var i=0;i<vm.checkList.length;i++){
                vm.checkList[i].checked=false
                for(var o=0;o<MemberDetails.info.Check.length;o++){
                    if(vm.checkList[i].CheckupID==MemberDetails.info.Check[o].CheckupID){
                        vm.checkList[i].checked=true
                    }
                }

            }

        },
        getCheckItem: function () {
            obj_CheckupDic.search({P:1,N:9999999},{
                success: function (res) {
                    for(var i=0;i<res.L.length;i++){
                        res.L[i].checked=false
                        if(MemberDetails.BodyCheck.length>0){

                            for(var o=0;o<MemberDetails.BodyCheck.length;o++){
                                if(res.L[i].CheckupID==MemberDetails.BodyCheck[o].CheckupID){
                                    res.L[i].checked=true
                                }
                            }
                        }

                    }
                    vm.checkList=res.L
                }
            })
        },

        checkList:[],

        check: function (index) {
            vm.checkList[index].checked=!vm.checkList[index].checked
        },


        save: function () {
            var CheckIDs=[]
            for(var i=0;i<vm.checkList.length;i++){
                if(vm.checkList[i].checked){
                    //CheckIDs.push(vm.checkList[i].CheckupID)
                    CheckIDs.push({
                        //UID:MemberDetails.BaseInfo.UID,
                        CheckID:vm.checkList[i].CheckupID
                    })
                }
            }

            $$.call({
                i:"MemberBodyCheck/replaceW",
                data:{
                    W:{
                        UID:MemberDetails.BaseInfo.UID
                    },
                    Data:CheckIDs
                },
                success: function (res) {
                    MemberDetails.ready(MemberDetails.BaseInfo.UID)
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