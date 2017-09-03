/**
 * Created by 张功 on 2016/3/13.
 */
define('changeClub', [
    'avalon',
    'text!../../package/ClubList/changeClub.html',
    '../../obj/Member.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "changeClub",
        ready: function (id) {
            vm.thisClubInfo(id);
            pop.open(html);
            //vm.reset();

        },
        reset: function () {
            avalon.mix(vm, {
                Name:"",
                Address:"",
                Tel:"",
                Contacter:"",
                Status:1,
                info:{},
                //要重置的东西最后都放回到这里
            })
            vm.Checkbox();
        },

        ClubID:"",
        Name:"",
        Address:"",
        Contacter:"",
        Tel:"",
        Status:"",
        info:{},
        thisClubInfo:function(id){
            obj_ClubDic.get(id, {
                success: function (res) {
                    vm.info=res;
                    vm.Name=res.Name;
                    vm.Address=res.Address;
                    vm.Contacter=res.Contacter;
                    vm.Tel=res.Tel;
                    vm.Status=res.Status;
                    vm.ClubID=res.ClubID;
                    vm.Checkbox();
                }
            })
        },

        //获取状态
        Checkbox:function(){
            var ceb=document.getElementById("StatusCheckbox");
            if(vm.Status==1){
                ceb.checked=false;
            }
            else{
                ceb.checked=true;
            }
        },
        //实现重置复选状态按钮
        resetCheckbox:function(){
            var ceb=document.getElementById("StatusCheckbox");
            if(vm.Status==1){
                vm.Status=0;
                ceb.checked=true;
            }
            else{
                vm.Status=1;
                ceb.checked=false;
            }
        },

        changeClub:function(){
            //调接口
            var Params={
                Name:vm.Name,
                Address:vm.Address,
                Tel:vm.Tel,
                Status:vm.Status,
                Contacter:vm.Contacter
            };
            obj_ClubDic.save(vm.ClubID,Params,{
                success:function(){
                    tip.on("修改成功",1,3000);
                    //强制浏览器刷新当前页面一次

                    try{
                        ClubList.ready(buildListParams(ClubList.P,ClubList.Keyword,ClubList.status))
                    }catch(err){
                        window.location.reload([true]);
                    }
                    vm.reset();
                    pop.close()
                }
            })
        }
    })
    window[vm.$id] = vm
})