/*
教练列表 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
*/
define('CoachList',[
    'avalon',
    'text!../../package/CoachList/CoachList.html',
    'css!../../package/CoachList/CoachList.css',
    '../../obj/bridge/Coach.js',
    '../../lib/pager/pager',
    '../../lib/select/select.js',
    '../../plugins/isIt/isIt.js',
    '../../obj/bridge/ClubDic.js'
], function (avalon, html, css,Coach,pager,select,isIt,ClubDic) {
    var vm=avalon.define({
        $id:"CoachList",
        ready: function (i) {
            if(i==0){
                goto('#!/CoachList/1&&&&0_1')
                return
            }
            //解析参数
            /*
             * 可能的参数格式:P&&Keyword&&status[]
             * 例如：1&&Keyword&&1_2_3
             * */
            var params = String(i).split("&&")
            //置入参数
            if(params[2]==""){
                goto('#!/CoachList/'+i+'0_1')
                return
            }

            vm.reset(params);

            index.html = html;
            vm.searchCoach(vm.P);
            vm.$watch('Keyword', function () {
                clearTimeout(vm.timeout);
                vm.timeout = setTimeout(function () {
                    goto('#!/CoachList/'+buildListParams(1,vm.Keyword,vm.status))
                }, 300)
            })

            vm.getClub()

        },

        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P:params[0],
                Keyword:params[1],
                status:params[2].split("_"),
                statusStr:params[2],
                searchNull:0,
            })
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
                addState:0,
                ClubList:[],
                Name:"",
                Sex:"0",
                Type:1,
                Tel:"",
                Deadline:"",
                CoachName:"",
                ClubName:"",
                Address:"",
                Password:"",
                s:1,
                ClubID:0,
                text:'',
                inputNumber:0,
            });

            try{
                document.getElementById("file").value=''

            }catch (err){}

        },
        //P:1,
        //N:10,
        //T:150,
        //$pager:{
        //    id:"CoachListPager",
        //    N:10,
        //    showPage:6,//显示多少页
        //    getList: function (p) {
        //        vm.searchCoach(p)
        //    }
        //},
        ClubList:[],
        getClub: function () {
            require(['../../obj/ClubDic.js'], function () {
                obj_ClubDic.gets([],{
                    success: function (res) {
                        vm.ClubList=res.L
                    }
                })
            })
        },
        list:[],
        StatusName:['启用中','已禁用'],
        //实现表头“启用”、“禁用”的状态筛选
        statusStr:'',
        toggleStatus: function (status) {
            clearTimeout(vm.timeout);
            goto('#!/CoachList/'+buildListParams(1,vm.Keyword,status))
        },
        //本参数判断搜索结果是否为空，默认为0，非null
        searchNull:0,
        searchCoach: function (p) {
            var data={
                P:p,//张攻鸭腿
                N:vm.N,
                Keyword:vm.Keyword,
                W:{
                    //Status:vm.status
                }
            };


            Coach.search(data, function (res) {
                    vm.list=[];
                    if (res == null || res == undefined || res == "" || res == [] || res == {}||res==false) {
                        vm.searchNull = 1;
                    }
                    else {
                        vm.searchNull = 0;
                        vm.list = res.L;
                        vm.P = res.P;
                        avalon.mix(CoachListPager, {
                            T: res.T,
                            P: res.P
                        });
                        CoachListPager.build(res.P)
                    }
                },
                function(){
                    vm.list=[];
                    vm.searchNull = 1;
                }
            );


        },
        //获取分页
        P:1,
        N:15,
        $paper: {
            id: "CoachListPager",
            N: 15,
            showPage: 6,
            getList: function (p) {
                goto('#!/CoachList/'+buildListParams(p,vm.Keyword,vm.status))
            }
        },
        $old_w:{
            Keyword:'',
            W:{Status:[]}
        },
        StatusList:[
            {
                name:"启用中",
                Status:"1",
                checked:false
            },
            {
                name:"已禁用",
                Status:"2",
                checked:false
            }
        ],
        allChecked:false,


            Keyword:"",
            status:[0, 1],


        //渲染pop弹窗页面
        resetPassword:function(i,a){
            require(["../../package/CoachList/resetPassword.js"],function(){
                resetPassword.ready(i,a) ;
            })
        },
        InforChange:function(i){
            require(["../../package/CoachList/InforChange.js"],function(){
                InforChange.ready(i);
            })
        },


        //添加用户弹窗
        addState:"0",
        add:function(){
            if(vm.addState==0){
                vm.addState=1;
            }
            else{
                vm.addState=0;
            }
        },
        //添加俱乐部中的 删除
        confirm:function(){
            vm.addState=0;
            vm.reset();
            vm.resetCheckbox();
            document.getElementById('Type').selectedIndex = document.getElementById('typeOp1');
            document.getElementById('club').selectedIndex = document.getElementById('clubOp1');
        },
        //实现判断添加俱乐部中的  状态判断  功能
        s: 1,//状态值，默认为1,启用
        checkStatus: function () {
            if (vm.s == 1) {
                vm.s = 0;
            }
            else {
                vm.s = 1;
            }
        },

        sexName:['女士','先生'],

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
                vm.Sex= i.id;
            }
        },


        //实现重置复选状态按钮
        resetCheckbox:function(){
            var ceb=document.getElementById("statusCheckbox");
            ceb.checked=false;
        },


        Name:"",
        Sex:"0",
        Type:1,
        Tel:"",
        Email:"",
        CoachName:"",
        Address:"",
        Password:"",
        //俱乐部
        ClubName:"",
        ClubID:0,


        //添加用户
        addUser:function(){

            var data={
                Name:vm.Name,
                Sex:vm.Sex,
                Status:vm.s,
                Type:vm.Type,
                Tel:vm.Tel,
                Email:vm.Email,
                Account:vm.CoachName,
                ClubID:vm.ClubID,
                Address:vm.Address,
                PWD:vm.Password
            };
            if(vm.Name == ""||vm.Name == undefined||vm.Name == null){
                tip.on("未填写姓名");
                return;
            }

           if(!isIt.tel(vm.Tel,"所输入的手机号")){
               return
           }

            if(vm.CoachName == ""){
                tip.on("未输入教练姓名");
                return;
            }
            if(vm.ClubID == 0){
                tip.on('还未选择俱乐部');
                return;
            }
            if(vm.Address == ""){
                tip.on("未填写地址");
                return;
            }

            if(!isIt.pwd(vm.Password,'输入的密码')){
                return;
            }

            obj_Coach.add(data,{
                success:function(res){
                    tip.on('用户添加成功',1,3000);
                    //setTimeout(function(){
                    //    window.location.reload(true);
                    //    vm.reset();
                    //},1000);
                    vm.list.push(res);
                    vm.addState=0;//收起添加列表
                    vm.reset();
                },
            })

        },

        //导入教练员
        text:'',
        inputNumber:0,
        //读取文件
        getText: function () {
            if (typeof FileReader == "undefined") {
                alert("您老的浏览器不行了！");
                return
            }
            var resultFile = document.getElementById("file").files[0];

            if (resultFile) {
                var reader = new FileReader();

                reader.readAsText(resultFile, 'GBK');
                reader.onload = function (e) {
                    vm.text = this.result;
                    console.log(vm.text)
                    var list=this.result.split('\n')
                    ForEach(list, function (val, i) {
                        if(val==''){
                            list.splice(i,1)
                        }
                    })

                    vm.inputNumber=list.length-1
                };
            }
        },

        //执行导入
        importCoach: function () {
            $$.call({
                i:'Coach/batch_add',

                data:{

                    Content:vm.text,//CSV文件内容

                },

                success: function (res) {
                    tip.on('成功导入'+res.length+'个新教练',1)
                    avalon.mix(vm,{
                        text:'',
                        inputNumber:0,
                    })
                    try{
                        document.getElementById("file").value=''

                    }catch (err){}
                    vm.ready(0)

                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }


    });

    window[vm.$id]=vm
});