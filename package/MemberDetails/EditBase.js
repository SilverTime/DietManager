/**
 * Created by mooshroom on 2016/3/15.
 */
define('EditBase', [
    'avalon',
    'text!../../package/MemberDetails/EditBase.html',
    //'css!../../package/EditBase/EditBase.css'
    '../../lib/select/select.js',
    '../../plugins/isIt/isIt.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "EditBase",
        ready: function (i) {
            vm.reset()
            //以及其他方法
            pop.open(html)

            vm.$watch("HealthLog.*", function (a, b) {
                vm.compute()
            })


            //填入性别
            function trySelectSex(){
                try{
                    selectSex.select(vm.info.Sex)
                }catch (err){
                    setTimeout(trySelectSex,300)
                }
            }
            trySelectSex()





            vm.$watch('info.Target', function (a, b) {
                if (a == 3) {
                    MemberDetails.BaseInfo.goodEnergy = vm.HealthCompute.DTEC
                }
            })


        },
        reset: function () {
            avalon.mix(vm.info, MemberDetails.BaseInfo)
            //填入日期
            vm.Birthday = getDateFromTimestamp(vm.info.Birthday * 1000)
            vm.EndTime = getDateFromTimestamp(vm.info.EndTime * 1000)
            if (MemberDetails.HealthLogs.length > 0) {
                avalon.mix(vm.HealthLog, {
                    Height: Number(MemberDetails.HealthLogs[0].Height),
                    CurrentWeight: Number(MemberDetails.HealthLogs[0].Weight),
                    TargetWeight: Number(MemberDetails.BaseInfo.TargetWeight),
                    BFR:Number( MemberDetails.HealthLogs[0].BFR),
                    PAL:Number( MemberDetails.HealthLogs[0].PAL),
                    Waist: Number(MemberDetails.HealthLogs[0].Waist),
                    Hip: Number(MemberDetails.HealthLogs[0].Hip),
                })
                //avalon.mix(vm.HealthCompute,{
                //    BMI:MemberDetails.info.HealthLogs[0].BMI,
                //    WHR: MemberDetails.info.HealthLogs[0].WHR,
                //    BMR: MemberDetails.info.HealthLogs[0].BMR,
                //    DTEC: MemberDetails.info.HealthLogs[0].DTEC,
                //})
            }


        },
        info: {
            Tel: "",
            UID: "",
            Name: "",
            Target: 0
        },
        Birthday: "",
        EndTime: "",
        HealthLog: {
            Height: 0,
            CurrentWeight: 0,
            TargetWeight: 0,
            BFR: 0,
            PAL: 0,
            Waist: 0,
            Hip: 0,
            //计算值
        },
        HealthCompute: {
            BMI: 0,
            WHR: 0,//腰臀比
            BMR: 0,//基础代谢
            DTEC: 0,//每日总能量消耗
        },

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
                    checked: false,
                }

            ],
            callback: function (i) {
                //缓存旧性别
                var oldSex=vm.info.Sex
                //加载新的性别
                vm.info.Sex = i.id
                //加载新的体力活动水平选项
                vm.PALList=vm.$PALList[i.id]
                //缓存旧的pal
                var pal=vm.HealthLog.PAL
                //找到新的pal
                ForEach(vm.$PALList[oldSex], function (el,key) {
                    if(key==pal){
                        ForEach(vm.PALList, function (cl, cl_key) {
                            if(cl==el){
                                vm.HealthLog.PAL=cl_key
                            }
                        })
                    }
                })

                vm.compute()
                console.log(i)
            }
        },


        /*会员id（UID）,
         Params:{
         性别（Sex）
         联系方式（Tel）

         生日（Birthday）
         服务期限（Deadline）
         健身目的（Target）
         目标体重（TargetWeight）

         身高（Height）
         当前体重（CurrentWeight)
         体脂率（BFR）
         体力活动水平（PAL）
         腰围（Waist）
         臀围（Hip）

         BMI（BMI）
         腰臀比（WHR）
         基础代谢（BML）
         每日总能量消耗（DTEC）
         }
         */

        save: function () {
            var successTimes = 0

            function success() {
                successTimes++
                if (successTimes > 1) {
                    pop.close()
                }
            }

            //保存基础信息

            //加载参数
            var data = {
                UID: vm.info.UID,
                Params: {
                    Name:vm.info.Name,
                    Sex: vm.info.Sex,
                    Tel: vm.info.Tel,
                    Birthday: timeLengthFormat(newDateAndTime(vm.Birthday).getTime(),'s'),
                    EndTime: timeLengthFormat(newDateAndTime(vm.EndTime).getTime(),'s'),
                    Target: vm.info.Target,
                    TargetWeight: vm.HealthLog.TargetWeight,
                    CurrentWeight: vm.HealthLog.CurrentWeight,
                }
            }

            //验证数据
            if (data.Params.Sex != 1 && data.Params.Sex != 0) {
                tip.on('性别选择异常')
                return
            }
            if (!data.UID > 0) {
                tip.on('用户身份识别错误')
                return
            }

            if(data.Params.Name==""){
                return tip.on('姓名不能为空')
            }
            //发送数据
            require(['../../obj/bridge/Member.js'], function (obj) {
                obj.save(data.UID, data.Params, function (res) {
                    tip.on("基本信息更新成功！", 1)
                    MemberDetails.ready(vm.info.UID)
                    success()
                }, function (err) {
                    if (err != "没有更改数据") {
                        tip.on(err)
                    } else {
                        success()
                    }
                })
            })


            //保存体质信息
            var body = {
                Height: vm.HealthLog.Height,
                CurrentWeight: vm.HealthLog.CurrentWeight,
                BFR: vm.HealthLog.BFR,
                PAL: vm.HealthLog.PAL,
                Waist: vm.HealthLog.Waist,
                Hip: vm.HealthLog.Hip,
                BMI: vm.HealthCompute.BMI,
                WHR: vm.HealthCompute.WHR,
                BMR: vm.HealthCompute.BMR,
                DTEC: vm.HealthCompute.DTEC
            }
            //验证数据
            ForEach(body, function (val, key) {
                if (val == NaN || val == "NaN"||val<0||val==Infinity) {
                    body[key] = 0
                }
            })


            $$.call({
                i: "Diet/HealthLog/update",
                data: {
                    UID: vm.info.UID,
                    Params: body
                },
                success: function (res) {
                    tip.on("体质数据更新成功！", 1)
                    MemberDetails.ready(vm.info.UID)
                    success()
                },
                error: function (err) {
                    if (err != "没有更改数据") {
                        tip.on(err)
                    } else {
                        success()
                    }
                }
            })


        },

        //计算
        compute: function () {
            /* BMI（BMI）
             * BMI=体重（kg）/身高（m）2*/
            vm.HealthCompute.BMI = (vm.HealthLog.CurrentWeight / Math.pow(vm.HealthLog.Height / 100, 2)).toFixed(2)
            /*腰臀比（WHR）*/
            vm.HealthCompute.WHR = (vm.HealthLog.Waist / vm.HealthLog.Hip).toFixed(2)
            /*基础代谢（BMR）*/
            /*4、基础代谢（BMR）
             男性：BMR=9.99W+6.25H-4.92A+5
             女性：BMR=9.99W+6.25H-4.92A-161*/
            var W = vm.HealthLog.CurrentWeight,
                H = vm.HealthLog.Height,
                A = vm.getAge(),
                BMR = ''
            if (vm.info.Sex == 0) {
                //女性
                BMR = addUp([9.99 * W, 6.25 * H, -4.92 * A, -161]).toFixed(2)
            } else if (vm.info.Sex == 1) {
                //男性
                BMR = addUp([9.99 * W, +6.25 * H, -4.92 * A, +5]).toFixed(2)
            } else {
                tip.on('用户性别未知，无法计算BMR')
            }
            vm.HealthCompute.BMR = BMR
            /*每日总能量消耗（DTEC）
             *
             * 每日总能量消耗=PAL*基础代谢
             * */

            vm.HealthCompute.DTEC = (vm.HealthLog.PAL * BMR).toFixed(2)

        },
        getAge: function () {
            var age = '',
                now = new Date().getTime(),
                BDay = newDateAndTime(vm.Birthday)

            age = Math.floor((now - BDay) / 31536000000)

            return age
        },

        //体力活动水平相关
        $PALList:{
            //女性
            0:{
                "1.56":'轻',
                "1.64":'中',
                "1.82":'重',
            },
            //男性
            1:{
                "1.55":'轻',
                "1.78":'中',
                "2.10":'重',
            }
        },
        PALList:{
            "1.56":'轻',
            "1.64":'中',
            "1.82":'重',
        },

        showPALInfo:false,
        togglePALInfo: function () {
            vm.showPALInfo=!vm.showPALInfo
        }


    })
    window[vm.$id] = vm
})