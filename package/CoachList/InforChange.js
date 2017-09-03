/**
 * Created by ANNNI on 2016/3/17.
 */
define('InforChange', [
    'avalon',
    'text!../../package/CoachList/InforChange.html',
    '../../obj/ClubDic.js',
    '../../obj/Coach.js',
    '../../plugins/isIt/isIt.js',
    '../../lib/select/select.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "InforChange",
        ready: function (i) {
            vm.reset();
            //vm.getClub();

            vm.uid = i
            vm.getClub();
            //以及其他方法
            pop.open(html);
        },
        reset: function () {
            avalon.mix({
                //要重置的东西最后都放回到这里
                info: [],
                //修改信息
                Name: "",
                Sex: "",
                Type: "",
                Status: 1,
                Tel: "",
                Deadline: "",
                CoachName: "",
                ClubName: "",
                Address: "",
            })
        },
        uid: 0,
        info: [],
        //修改信息
        Name: "",
        Sex: "",
        Type: "",
        Status: 1,
        Tel: "",
        Deadline: "",
        CoachName: "",
        ClubName: "",
        Address: "",

        getInfo: function (id) {
            obj_Coach.get(id, {
                success: function (res) {
                    vm.reset();
                    vm.Name = res.Name;
                    //vm.Sex = res.Sex;
                    selectSex.select(res.Sex)
                    vm.Type = res.Type;
                    vm.Status = res.Status;
                    vm.Tel = res.Tel;
                    vm.Deadline = getDateFromTimestamp(res.Deadline);
                    vm.CoachName = res.CoachName;
                    vm.ClubID = res.ClubID;
                    vm.Address = res.Address;
                    vm.Checkbox();
                }
            });
        },
        list: [],
        getClub: function () {
            var data = {
                W: {
                    Status: [1]
                }
            };
            obj_ClubDic.search(data, {
                success: function (res) {
                    vm.list = [];
                    for (var i = 0; i < res.L.length; i++) {
                        vm.list.push(res.L[i])
                    }

                    vm.getInfo(vm.uid);
                }
            })
        },


        //性别复选框插件配置参数
        $selectSex: {
            id: "selectSex",
            radioBox: true,
            list: [
                {
                    name: "女士",
                    id: 0,
                    checked: true
                },
                {
                    name: "先生",
                    id: 1,
                    checked: false
                }
            ],
            callback: function (i) {
                //返回状态id
                vm.Sex = i.id;
            }
        },


        ClubID: "",
        changeInfo: function () {

            if (vm.Name == "") {
                tip.on("请输入姓名");
                return;
            }
            if (vm.Target == 0) {
                tip.on("请选择性别");
                return;
            }
            if (vm.Type == 0) {
                alert(vm.Type);
                tip.on("请选择类型");
                return;
            }

            if(!isIt.tel(vm.Tel,'输入的手机号')){
                return
            }
            if (vm.Deadline == "") {
                tip.on("请选择使用日期");
                return;
            }

            //if (vm.ClubID == 0) {
            //    tip.on("请输入所属俱乐部");
            //    return;
            //}
            //if (vm.Address == "") {
            //    tip.on("请输入地址");
            //    return;
            //}

            var data = {
                Name: vm.Name,
                Sex: vm.Sex,
                Type: vm.Type,
                Status: vm.Status,
                Tel: vm.Tel,
                Deadline: newDateAndTime(vm.Deadline).getTime(),
                //CoachName: vm.CoachName,
                ClubID: vm.ClubID,
                Address: vm.Address
            };
            obj_Coach.save(vm.uid,data, {
                success: function () {
                    tip.on("修改成功", 1);
                    //setTimeout("window.location.reload(true);vm.reset();", 1000);
                    pop.close()
                    vm.reset()
                    try{
                        CoachList.ready(buildListParams(CoachList.P,CoachList.Keywords,CoachList.status))
                    }catch(err){}
                }
            })
        },

        //获取状态
        Checkbox: function () {
            var ceb = document.getElementById("StatusCheckbox");
            if (vm.Status == 1) {
                ceb.checked = false;
            }
            else {
                ceb.checked = true;
            }
        },
        //实现重置复选状态按钮
        resetCheckbox: function () {
            var ceb = document.getElementById("StatusCheckbox");
            if (vm.Status == 1) {
                vm.Status = 0;
                ceb.checked = true;
            }
            else {
                vm.Status = 1;
                ceb.checked = false;
            }

        },
        closePop: function () {
            vm.reset();
            window.location.reload(true);
        }
    });
    window[vm.$id] = vm
});