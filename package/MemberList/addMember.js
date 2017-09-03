/**
 * Created by 张功 on 2016/3/13.
 */
define('addMember', [
    'avalon',
    'text!../../package/MemberList/addMember.html',
    '../../lib/select/select.js',
    '../../obj/bridge/Member.js',
    '../../plugins/isIt/isIt'
], function (avalon, html, select, obj_Member) {
    var vm = avalon.define({
        $id: "addMember",
        ready: function () {
            //index.html=html
            //以及其他方法
            pop.open(html);
            vm.reset();

        },
        //vm.reset();
        reset: function () {
            //默认一个月的服务期限
            var date = new Date()
            date.setMonth(Number(date.getMonth()) + 1)

            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                Name: "",
                Sex: "0",
                Tel: "",
                CurrentWeight: "",
                TargetWeight: "",
                Birthday: "1990-01-01",
                Deadline: getDateFromTimestamp(date.getTime()),
                Target: 0
            });
            //document.getElementById('mySelect').selectedIndex = document.getElementById('op1');


        },


        Name: "",
        Sex: "",
        Tel: "",
        CurrentWeight: "",
        TargetWeight: "",
        Birthday: "",
        Deadline: "",
        Target: "",


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


        //调用接口添加会员
        info: {},
        addMumInfo: function () {


            //正则表达式匹配高能区，非战斗人员请尽快撤离
            //输入不能为空
            if (vm.Name == "") {
                tip.on("请输入您的姓名", 0, 3000);
                return
            }
            if (vm.Tel != "" && !isIt.tel(vm.Tel, "所填入的号码")) {
                //tip.on("请输入您的联系方式",0,3000);
                return
            }
            if (vm.Birthday == "") {
                tip.on("请选择您的出生日期", 0, 3000);
                return
            }
            //if(vm.CurrentWeight==""){
            //    tip.on("请输入您的当前体重",0,3000);
            //    return
            //}
            //if(vm.TargetWeight==""){
            //    tip.on("请输入您的目标体重",1,3000);
            //    return
            //}
            //if(vm.Deadline==""){
            //    tip.on("请选择服务期限",1,3000);
            //    return
            //}
            //if( vm.Target==0){
            //    tip.on("请选择您的健身目的",1,3000);
            //    return
            //}


            //匹配中国的电话号和手机号（手机号粗匹配13-18）
            //var reg_phone=/^(1[3-8]{1}[0-9]{1}[0-9]{8}|0[0-9]{2,3}-[0-9]{7,8}(-[0-9]{1,4})?)$|^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
            //if(reg_phone.test(vm.Tel)==0){
            //    tip.on("请输入正确的手机号或电话号",0,3000);
            //    return;
            //}

            //var reg_weight=/(^[1-9][0-9]{1,2}$)|(^[1-9][0-9]{1,2}\.[0-9]{1,2}$)/;
            ////匹配体重
            //if(reg_weight.test(vm.CurrentWeight)==0){
            //    tip.on("当前体重输入有误",0,3000);
            //    return;
            //}
            //if(reg_weight.test(vm.TargetWeight)==0){
            //    tip.on("目标体重输入有误",0,3000);
            //    return;
            //}

            var data = {
                Name: vm.Name,
                Sex: vm.Sex,
                Tel: vm.Tel,
                Birthday: timeLengthFormat(newDateAndTime(vm.Birthday).getTime(), 's'),
                CurrentWeight: vm.CurrentWeight,
                TargetWeight: vm.TargetWeight,
                EndTime: timeLengthFormat(newDateAndTime(vm.Deadline).getTime(), 's'),
                //Target: vm.Target,
                Status: "1",//默认上课中
                CoachID: cache.go("UID"),
            };

            try {
                data.ClubID = Home.Coach.Club.ClubID
                if (!data.ClubID > 0) {
                    data.ClubID = undefined
                }
            } catch (err) {
            }

            if (vm.Target > 0) {
                data.Target = vm.Target
            }

            obj_Member.add(data, function (res) {
                    tip.on("添加成功", 1, 3000);
                    //强制浏览器刷新当前页面一次
                    //window.location.reload([true]);
                    pop.close()
                    vm.reset();

                    //添加体质评估数据

                //保存体质信息
                var body = {
                    Height: 0,
                    CurrentWeight: data.CurrentWeight,
                    BFR: 0,
                    PAL: 0,
                    Waist: 0,
                    Hip: 0,
                    BMI: 0,
                    WHR: 0,
                    BMR: 0,
                    DTEC:0
                }
                //验证数据
                ForEach(body, function (val, key) {
                    if (val == NaN || val == "NaN") {
                        body[key] = 0
                    }
                })


                $$.call({
                    i: "Diet/HealthLog/update",
                    data: {
                        UID: res.UID,
                        Params: body
                    },
                    success: function (res) {
                        //tip.on("体质数据更新成功！", 1)
                        //MemberDetails.ready(vm.info.UID)
                        //success()
                    },
                    error: function (err) {
                        //if (err != "没有更改数据") {
                        //    tip.on(err)
                        //} else {
                        //    success()
                        //}
                    }
                })

                try{
                    Home.reJump()
                }catch (err){}
                }
            )

        },
    })
    avalon.scan();
    window[vm.$id] = vm
})