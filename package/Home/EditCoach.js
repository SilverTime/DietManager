/**
 * Created by mooshroom on 2016/11/10.
 */
define('EditCoach', [
    'avalon',
    'text!../../package/Home/EditCoach.html',
    //'css!../../package/EditBase/EditBase.css'
    //'../../lib/select/select.js',
    '../../plugins/isIt/isIt.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "EditCoach",
        ready: function (i) {
            vm.reset()
            //以及其他方法
            pop.open(html)

            try{
                var oldData=avalon.mix({},Home.Coach)
                oldData.Name=oldData.User.Name
                oldData.Sex=oldData.User.Sex
                avalon.mix(vm.data,oldData)

            }catch (err){
                //todo 通过请求获取教练资料
                console.log('todo 通过ajax获取教练资料')
            }

        },

        data: {
            UID: '',//UID  int(11) 必填:1 默认值:,
            ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
            Type: '',//类型  tinyint(2) 必填:1 默认值:,
            Tel: '',//电话  char(20) 必填:1 默认值:,
            Address: '',//地址  char(250) 必填:1 默认值:,
            HeadImgURL: '',//头像地址  char(250) 必填: 默认值:,
            Email: '',//电子邮箱  char(250) 必填: 默认值:,
            Introduce: '',//自我介绍  text 必填: 默认值:,
            Alipay: '',//支付宝账户  char(250) 必填: 默认值:,
            BackgrondImgURL: '',//背景图地址  char(250) 必填: 默认值:,
            MemberAmount: '',//累积学员数  int(11) 必填:1 默认值:,
            DietAmount: '',//创建食谱数  int(11) 必填:1 默认值:,
            SaleAmount: '',//累积售出数  int(11) 必填:1 默认值:,
            Club: {
                ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                Contactor: '',//联系人  char(20) 必填:1 默认值:,
                Status: '',//状态  tinyint(2) 必填: 默认值:
            },
            Account: '',//Account  char(250) 必填:1 默认值:,
            PWD: '',//PWD  char(250) 必填:1 默认值:,
            Status: '',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
            Name: '',//姓名  char(250) 必填:1 默认值:,
            Sex: '',//性别  tinyint(2) 必填:1 默认值:,
            CTime: '',//添加时间  int(10) 必填:1 默认值:
        },
        reset: function () {
            avalon.mix(vm,{
                data: {
                    UID: '',//UID  int(11) 必填:1 默认值:,
                    ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                    Type: '',//类型  tinyint(2) 必填:1 默认值:,
                    Tel: '',//电话  char(20) 必填:1 默认值:,
                    Address: '',//地址  char(250) 必填:1 默认值:,
                    HeadImgURL: '',//头像地址  char(250) 必填: 默认值:,
                    Email: '',//电子邮箱  char(250) 必填: 默认值:,
                    Introduce: '',//自我介绍  text 必填: 默认值:,
                    Alipay: '',//支付宝账户  char(250) 必填: 默认值:,
                    BackgrondImgURL: '',//背景图地址  char(250) 必填: 默认值:,
                    MemberAmount: '',//累积学员数  int(11) 必填:1 默认值:,
                    DietAmount: '',//创建食谱数  int(11) 必填:1 默认值:,
                    SaleAmount: '',//累积售出数  int(11) 必填:1 默认值:,
                    Club: {
                        ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                        Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                        Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                        Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                        Contactor: '',//联系人  char(20) 必填:1 默认值:,
                        Status: '',//状态  tinyint(2) 必填: 默认值:
                    },
                    Account: '',//Account  char(250) 必填:1 默认值:,
                    PWD: '',//PWD  char(250) 必填:1 默认值:,
                    Status: '',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
                    Name: '',//姓名  char(250) 必填:1 默认值:,
                    Sex: '',//性别  tinyint(2) 必填:1 默认值:,
                    CTime: '',//添加时间  int(10) 必填:1 默认值:
                },
            })

        },

        save: function () {
            require(['../../obj/bridge/Coach'], function (Coach) {
                var Params={
                    Address:"",
                    StartTime:"",
                    //Tel:"",
                    Email:"",
                    Introduce:"",
                    Name:'',
                    Sex:'',
                }

                ForEach(Params, function (el, key) {
                    Params[key]=vm.data[key]
                })


                Params.StartTime=timeLengthFormat(newDateAndTime(Params.StartTime).getTime(),'s')

                //验证

                if(Params.Name==''){
                    tip.on('姓名不能为空')
                    return
                }


                if(Params.Email==''){
                    return tip.on('邮箱不能为空')
                }

                if(!isIt.email(Params.Email)){
                    return
                }

                //验证邮箱之后提交
                require(['../../obj/bridge/Coach'], function (Coach) {
                    Coach.search({
                        P:1,
                        N:1,
                        W:{
                            Email:Params.Email
                        }
                    }, function (res) {
                        if(res.T>0){
                            //不能使用
                            return tip.on('不能使用别人的邮箱，请检查您的邮箱是否输入正确')
                        }

                        //提交
                        Coach.save(vm.data.UID,Params, function (res) {
                            pop.close()
                            try{
                                res.StartTime=avalon.filters.date(Number(res.StartTime)*1000,'yyyy-MM-dd')

                                //配置默认头像及背景的地址
                                if (res.BackgrondImgURL == '' || res.BackgrondImgURL == null) {
                                    res.BackgrondImgURL = './src/images/HomeBG.jpg'
                                }
                                if (res.HeadImgURL == "" || res.HeadImgURL == null) {
                                    res.HeadImgURL = './src/images/head.png'
                                }

                                safeMix(Home.Coach,res)
                            }catch (err){}
                        }, function (err) {
                            tip.on(err)
                        })


                    })
                })



            })


        },


    })
    return window[vm.$id] = vm
})