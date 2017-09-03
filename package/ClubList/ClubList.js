/*
 俱乐部列表 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('ClubList', [
    'avalon',
    'text!../../package/ClubList/ClubList.html',
    'css!../../package/ClubList/ClubList.css',
    '../../obj/ClubDic.js',
    '../../lib/pager/pager'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "ClubList",
        ready: function (i) {
            if(i==0){
                goto('#!/'+vm.$id+'/1&&&&0_1')
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
                goto('#!/'+vm.$id+'/'+i+'0_1')
                return
            }

            vm.reset(params);

            index.html = html;
            vm.getClublist(vm.P);
            vm.$watch('Keyword', function () {
                clearTimeout(vm.timeout);
                vm.timeout = setTimeout(function () {
                    goto('#!/'+vm.$id+'/'+buildListParams(1,vm.Keyword,vm.status))
                }, 300)
            })
        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P:params[0],
                Keyword:params[1],
                status:params[2].split("_"),
                statusStr:params[2],
                //searchNull:0,
            })
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                list: [],
                //status: [],
                btnStatus: "0",
                Name: "",
                Address: "",
                Contacter: "",
                Tel: "",
                //Keyword: "",
                s: 1
            });
        },
        //将添加俱乐部页面渲染
        editClubFun: function (cid) {
            require(["../../package/ClubList/changeClub.js"], function () {
                changeClub.ready(cid);
            })
        },


        //获取分页
        $paper: {
            id: "ClubListP",
            N: 15,
            showPage: 6,
            getList: function (p) {
                goto('#!/'+vm.$id+'/'+buildListParams(p,vm.Keyword,vm.status))
            }
        },
        //分页
        P: 1,
        N: 15,
        T: "",

        Keyword: "",
        list: [],
        status: [0, 1],//默认全部加载
        searchNull:0,

        getClublist: function (p) {
            var data = {
                W: {
                    Status: vm.status
                },
                Keyword: vm.Keyword,
                P: p,
                N: 15,
                Sort: ""

            };
            obj_ClubDic.search(data, {
                success: function (res) {
                    vm.list=[];
                    if (res == null || res == undefined || res == "" || res == [] || res == {}||res==false) {
                        vm.searchNull = 1;
                    }
                    else {
                        vm.searchNull = 0;
                        for (var i = 0; i < res.L.length; i++) {
                            vm.list.push(res.L[i])
                        }
                        vm.P = res.P;
                        avalon.mix(ClubListP, {
                            T: res.T,
                            P: res.P
                        });
                        ClubListP.build(res.P)
                    }
                },
                error:function(){
                    vm.list=[];
                    vm.searchNull = 1;
                }
            })
        },


        //添加俱乐部 事件是否被触发
        btnStatus: "0",
        addClub: function () {
            if (vm.btnStatus === 1) {
                vm.btnStatus = 0;
            }
            else {
                vm.btnStatus = 1;
            }
        },


        //实现判断添加俱乐部中的状态判断功能
        s: 1,//状态值，默认为1,启用
        checkStatus: function () {
            if (vm.s == 1) {
                vm.s = 0;
            }
            else {
                vm.s = 1;
            }
        },
        //实现重置复选状态按钮
        resetCheckbox:function(){
            var ceb=document.getElementById("statusCheckbox");
            ceb.checked=false;
        },

        Name: "",
        Address: "",
        Contacter: "",
        Tel: "",
        deleteAdd: function () {
            vm.addClub();
            vm.Name = "";
            vm.Address = "";
            vm.Contacter = "";
            vm.Tel = "";
            vm.s = 1;
            vm.resetCheckbox();
        },
        ensureInfo: function () {
            if (vm.Name == "" || vm.Name == undefined || vm.Name == null) {
                tip.on("请输入俱乐部名称", 0, 3000);
                return
            }
            if (vm.Address == "" || vm.Address == undefined || vm.Address == null) {
                tip.on("请输入地址", 0, 3000);
                return
            }
            if (vm.Contacter == "" || vm.Contacter == undefined || vm.Contacter == null) {
                tip.on("请输入联系人", 0, 3000);
                return
            }
            if (vm.Tel == "" || vm.Tel == undefined || vm.Tel == null) {
                tip.on("请输入俱乐部的联系方式", 0, 3000);
                return
            }


            //匹配中国的电话号和手机号（手机号粗匹配13-18）
            var reg_phone = /1[3-8]{1}[0-9]{1}[0-9]{8}|0[0-9]{2,3}-[0-9]{7,8}(-[0-9]{1,4})?/;
            if (reg_phone.test(vm.Tel) == 0) {
                tip.on("请输入正确的手机号或电话号", 0, 3000);
                return;
            }


            //掉接口
            var data = {
                Name: vm.Name,
                Address: vm.Address,
                Status: vm.s,
                Contacter: vm.Contacter,
                Tel: vm.Tel
            };
            obj_ClubDic.add(data, {
                success: function () {
                    tip.on("添加成功", 1, 3000);
                    vm.Name = "";
                    vm.Address = "";
                    vm.Contacter = "";
                    vm.Tel = "";
                    vm.addClub();
                    vm.getClublist();
                }
            })
        },

        deleteClub: function (id) {
            if(!confirm('您要继续保留该俱乐部么？')&&confirm('您确定要删除该俱乐部么？')){
                $$.call({
                    i: "ClubDic/del",
                    data: {
                        ClubID: id
                    },
                    success: function () {
                        tip.on("删除成功", 1, 3000);
                        //强制浏览器刷新当前页面一次
                        window.location.reload(true);
                        vm.reset();
                    }
                })
            }

        },
        //点击“上课中”、“已停课”标签，切换状态筛选
        statusStr:'',
        toggleStatus: function (status) {
            clearTimeout(vm.timeout);
            goto('#!/'+vm.$id+'/'+buildListParams(1,vm.Keyword,status))
        }

    });
    window[vm.$id] = vm
});