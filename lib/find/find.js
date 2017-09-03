/*
 findCommunity 内在灵魂，沉稳坚毅
 生成时间：Mon Aug 15 2016   破门狂人R2-D2为您服务！

 【使用方法】：
 1。 引入该文件
 2. 在html中添加组件标签：
 <tsy:find config="$opt">

 </tsy:find>

 3. 在 $opt中传入配置参数，需要传入callback,以及依赖对象函数，例如：
 $opt:{
 callback: function (res) {
 alert(res)
 },
 target:'Community'

 },

 其中，会在点击之后，将所选中的项目作为res传入到callback中，

 */
define('findCommunity', [
    'avalon',
    'text!../../lib/find/find.html',
    'css!../../lib/find/find.css'
], function (avalon, html, css) {
    //批量绑定快捷键
    function bindK(obj) {
        require(['../../plugins/shortcut/shortcut.js'], function () {
            /*快捷键设置*/

            var x
            for (x in obj) {
                if (x.charAt(0) != "$") {
                    if (obj.$opt != undefined) {
                        shortcut.add(x, obj[x], obj.$opt)
                    } else {
                        shortcut.add(x, obj[x])
                    }

                    //console.log(x + "快捷键绑定成功")
                }

            }
        })
    }

    //批量删除快捷键
    function removeK(obj) {
        require(['../../plugins/shortcut/shortcut.js'], function () {
            /*快捷键设置*/

            var x
            for (x in obj) {
                if (x.charAt(0) != "$") {
                    shortcut.remove(x)
                    //console.log(x + "已解除绑定")
                }

            }
        })
    }

    avalon.component('tsy:find', {
        $template: html,
        target: "",
        id: "",
        /*
         * ***************参数队列区**************************/
        showAdd: false,

        //回调函数
        callback: function () {

        },

        //但输入过程中
        onInput: function () {

        },

        //搜索关键字
        Keywords: '',

        //要填入的字段的名称
        keyName: "",

        placeholder: "",

        //上次的关键字
        $lastKey: "",

        //即将插入的输入框
        listTmp: '',

        //这个输入框
        input: "",

        //数据列表
        list: [],
        P: 1,
        N: 6,
        T: 1,
        //当前选中项
        active: 0,

        //当前列表状态 0:未开启 1:查询中 2：查询结束
        state: 0,

        $out: {
            1: true,
            2: true,
        },

        //错误提示
        err: '',

        //请求延迟
        timeout: "",

        //快捷键列表
        $hotKey: {},


        /*
         * ***************函数空位**************************/

        //搜索函数
        search: function () {

        },

        //立正
        attention: function () {


        },

        //稍息
        ease: function () {

        },

        //阻止稍息
        dontEase: function () {

        },

        //选择过程
        hover: function () {

        },

        //选中回调
        select: function () {

        },

        //重置
        reset: function () {

        },

        //添加
        add: function () {

        },


        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)
            //将参数放入对于的地方
            try {
                if (elem.data('id') != undefined) {
                    vm.id = elem.data('id')
                    //todo 改写上方的'lv'为你想要获取到的值
                }
            } catch (err) {
            }

            require(['text!../../lib/find/' + vm.target + '.html'], function (html) {
                vm.listTmp = html
            })


            //加载函数
            avalon.mix(vm, {
                $hotKey: {
                    $opt: {
                        type: "keydown"
                    },
                    "up": function () {
                        vm.hover('up')
                    },
                    "down": function () {
                        vm.hover('down')
                    },
                    'left': function () {
                        if (vm.P > 1) {
                            vm.search(-1)
                        }

                    },
                    "right": function () {
                        if (vm.P < (Math.ceil(vm.T / vm.N)))
                            vm.search(1)
                    },
                    'enter': function () {
                        vm.select(vm.active)
                    }
                },
                //选择过程
                hover: function (i) {
                    if (i == 'up') {
                        if (vm.active > 0) {
                            vm.active--
                        }
                        return
                    }
                    if (i == 'down') {
                        if (vm.active < vm.list.length - 1) {
                            vm.active++
                        }
                        return

                    }

                    vm.active = i
                },
                //立正
                attention: function (input) {
                    vm.$hotKey.$opt.target = input
                    bindK(vm.$hotKey, input)
                    vm.state = 2
                    vm.$out[1] = false
                    vm.search(0)
                },
                //搜索函数
                search: function (p) {
                    vm.state = 1
                    var data = {
                        Keyword: vm.Keywords,
                        P: Number(vm.P) + Number(p),
                        N: vm.N
                    }

                    //if (data.Keyword == "") {
                    //    return vm.state = 2
                    //}

                    if (data.P < 1) {
                        data.P = 1
                    }
                    if (data.P > Math.ceil(vm.T / data.N)) {
                        data.P = Math.ceil(vm.T / data.N)
                    }

                    if (data.P > Math.ceil(vm.T / vm.N)) {
                        data.P = Math.ceil(vm.T / vm.N)
                    }

                    if (vm.$lastKey != vm.Keywords) {
                        data.P = 1

                        try {
                            vm.onInput(vm)
                        }
                        catch (err) {
                        }
                    }


                    clearTimeout(vm.timeout)
                    vm.$lastKey = data.Keyword


                    require(['../../obj/bridge/' + vm.target + '.js'], function (comm) {
                        vm.timeout = setTimeout(function () {


                            comm.search(
                                data,
                                function (res) {

                                    avalon.mix(vm, {
                                        P: res.P,
                                        T: res.T,
                                        list: res.L
                                    })

                                    vm.state = 2
                                    vm.err = ''
                                },
                                function (err) {
                                    vm.state = 2

                                    vm.err = err

                                }
                            )
                        })

                    })
                },
                //选中回调
                select: function (i) {
                    if (i === undefined) {
                        i = vm.active
                    }
                    var res = vm.list[i]
                    try {
                        vm.$lastKey = vm.Keywords = res[vm.keyName]
                    } catch (err) {
                    }
                    vm.callback(res, vm.id, vm)
                    vm.ease()
                },
                //稍息
                ease: function (i) {
                    if (i === undefined) {
                        out()
                        return
                    }
                    vm.$out[i] = true
                    if (vm.$out[1] && vm.$out[2]) {
                        out()
                    }

                    console.log(vm.target + ":" + vm.$out[1] + "," + vm.$out[2])
                    function out() {
                        removeK(vm.$hotKey)
                        vm.state = 0
                        vm.$out = {
                            1: true,
                            2: true,
                        }


                    }
                }

                ,
                //阻止稍息
                dontEase: function () {
                    vm.$out[2] = false
                }
                ,
                //重置
                reset: function () {
                    avalon.mix(vm, {
                        //搜索关键字
                        Keywords: '',

                        //上次的关键字
                        $lastKey: "",

                        //数据列表
                        list: [],
                        P: 1,
                        N: 8,
                        T: 0,
                        //当前选中项
                        active: 0,

                        //当前列表状态 0:未开启 1:查询中 2：查询结束
                        state: 0,

                        $out: {
                            1: true,
                            2: true,
                        },
                        //错误提示
                        err: '',
                    })
                }
                ,


                //添加
                add: function () {
                    vm.state = 1
                    if (vm.Keywords == '') {
                        vm.err = '没有输入区域名称'
                        vm.state = 2
                        return
                    }

                    require(['../../obj/' + vm.target + '.js'], function (comm) {
                        if (!confirm('是否添加【' + vm.Keywords + '】到列表中？')) {
                            vm.err = ''
                            return
                        }
                        comm.add({
                            Title: vm.Keywords
                        }, {
                            success: function (res) {
                                vm.state = 2
                                vm.search(0)
                                vm.err = ''
                            },
                            error: function (err) {
                                vm.state = 2

                                vm.err = err
                            }
                        })

                    })
                }
                ,

            })


            if (vm.id != "") {
                window[vm.id] = vm
            }
        },
        $ready: function (vm, elem) {
            //vm.build()
        },


    })
})