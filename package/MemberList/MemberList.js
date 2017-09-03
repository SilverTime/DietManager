/*
 会员列表 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('MemberList', [
    'avalon',
    'text!../../package/MemberList/MemberList.html',
    'css!../../package/MemberList/MemberList.css',
    '../../obj/Member.js',
    '../../lib/pager/pager'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "MemberList",
        ready: function (i) {

            //解析参数
            /*
             * 可能的参数格式:P&&Keyword&&status[]
             * 例如：1&&Keyword&&1_2_3
             * */
            var params = String(i).split(",")
            //置入参数
            if (params[2] == "") {
                goto('#!/' + vm.$id + '/' + i + '0_1')
                return
            }

            vm.reset(params);

            Home.page = html;
            vm.getBaselist(vm.P);
            vm.$watch('Keyword', function () {
                clearTimeout(vm.timeout);
                vm.timeout = setTimeout(function () {
                    goto('#!/' + vm.$id + '/' + buildListParams(1, vm.Keyword, vm.status))
                }, 300)
            })

        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: params[0],
                Keyword: params[1],
                status: params[2].split("_"),
                statusStr: params[2],
                searchNull: 0,
            })
        },

        //将添加会员页面渲染到pop
        addMember: function () {
            require(["../../package/MemberList/addMember.js"], function () {
                addMember.ready();
            })
        },

        //获取分页
        $paper: {
            id: "MemberListPager",
            N: 12,
            showPage: 6,
            getList: function (p) {
                goto('#!/' + vm.$id + '/' + buildListParams(p, vm.Keyword, vm.status))
            }
        },

        //获取用户资料
        list: [],
        P: 1,
        N: 12,
        T: "",
        Keyword: "",
        status: [0, 1],//默认全部加载
        //判断查找结果是否为空,0为非空
        searchNull: 0,

        getBaselist: function (p) {
            var data = {
                W: {
                    Status: vm.status
                },
                Keyword: vm.Keyword,
                P: p,
                N: vm.N,
                Sort: ""
            };

            //todo 验证keywords以及status是否变化，
            /*
             * 如果，有变化，说明是通过筛选项触发的，则，分页重置为1
             * 否则，说明是从分页触发的，则分页不重置。同时，keywords与status保持不变
             * */

            obj_Member.search(data, {
                success: function (res) {
                    vm.list = [];
                    if (res == null || res == undefined || res == "" || res == [] || res == {} || res == false) {
                        vm.searchNull = 1;
                    }
                    else {
                        vm.searchNull = 0;
                        for (var i = 0; i < res.L.length; i++) {
                            vm.list.push(res.L[i])
                        }
                        vm.P = res.P;
                        avalon.mix(MemberListPager, {
                            T: res.T,
                            P: res.P
                        });
                        MemberListPager.build(res.P)
                    }
                },
                error: function () {
                    vm.list = [];
                    vm.searchNull = 1;
                }
            })
        },


        //点击“上课中”、“已停课”标签，切换状态筛选
        statusStr: '',
        toggleStatus: function (status) {
            clearTimeout(vm.timeout);
            goto('#!/' + vm.$id + '/' + buildListParams(1, vm.Keyword, status))
        },

        //删除成员
        delMember: function (uid) {
            if (confirm('删除该会员后，将无法还原，是否真要删除？')) {
                obj_Member.del(uid, {
                    success: function (res) {
                        vm.getBaselist(vm.P)
                    }
                })
            }
        }


    });
    window[vm.$id] = vm;
});