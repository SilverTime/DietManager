/*
 登录 内在灵魂，沉稳坚毅
 生成时间：Thu Mar 10 2016   破门狂人R2-D2为您服务！
 */
define('Login', [
    'avalon',
    'text!../../package/Login/Login.html',
    'css!../../package/Login/Login.css',
    '../../plugins/isIt/isIt.js',
    '../../plugins/door/door.js',
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "Login",
        ready: function (i) {
            document.body.style.overflow = "hidden"
            vm.reset()
            index.html = html
            //以及其他方法

            //自动登陆
            Gate.comeIn({
                haveLogin: function (res) {
                    //todo 跳转
                    document.body.style.overflowY = "scroll"
                    var G = res.G
                    index.uid = res.UID
                    if (G[0] == 2) {
                        //如果是管理员，跳转教练列表
                        window.location.href = "#!/CoachList/0"
                    }
                    else if (G[0] == 1) {
                        //如果是教练，跳转会员列表
                        window.location.href = "#!/Home/0"
                        if (G[1] == 2) {
                            index.g = 1
                        }
                    }
                },
            })

            vm.addScrollListener()

            avalon.nextTick(function(){
                var target=document.querySelector("#login_PWD")
                shortcut.add("enter", vm.login, {
                    'type': 'keyup',
                    'propagate': true,
                    'target': target
                })
            })


        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                info: {
                    Account: '',
                    PWD: ''
                }
            })
        },
        info: {
            Account: '',
            PWD: ''
        },
        login: function () {
            var data = {
                Account: '',
                PWD: ''
            }
            avalon.mix(data, vm.info)
            //TODO 验证账户名不可为空
            //if(!isIt.PWD(data.PWD,'密码')){
            //    return
            //}


            if (data.Account == '') {
                tip.on("用户名不能为空")
                return
            }
            if (data.PWD == "") {
                tip.on("密码不能为空")
                return
            }
            //if(data.Account.length>6){
            //    tip.on("用户名过长")
            //    return
            //}
            $$.call({
                i: "Diet/User/login",
                data: data,
                success: function (res, origin) {
                    document.body.style.overflowY = "scroll"
                    if (origin.G[0] == 2) {
                        //如果是管理员，跳转教练列表
                        window.location.href = "#!/CoachList/0"
                    }
                    else if (origin.G[0] == 1) {
                        //如果是教练，跳转会员列表
                        window.location.href = "#!/Home/0"
                        if (origin.G[1] == 2) {
                            index.g = 1
                        }
                    }
                    index.G = addUp(origin.G)
                    cache.go(res)
                    index.uid = cache.go('UID')
                    index.un = res.Name
                },
                error: function (err) {
                    tip.on(err)
                }
            })


        },
        /*首页动画*/
        moving: false,
        addScrollListener: function () {
            EventUtil.addEventHandler(window.document, 'mousewheel', whellFn)
            EventUtil.addEventHandler(window.document, 'DOMMouseScroll', whellFn)
            function whellFn(that) {

                if (vm.moving) {
                    return
                }

                var event = EventUtil.getEvent(that)
                //console.log(event)
                if (event.deltaY >= 0) {
                    // 向下滚动
                    if (vm.now == vm.images.length - 1) {
                        return
                    }
                    vm.changeNow(vm.now + 1)
                } else {
                    //向上滚动
                    if (vm.now == 0) {
                        return
                    }
                    vm.changeNow(vm.now - 1)
                }
            }

        },
        now: 0,
        images: [
            {
                src: '../../images/1/左大图.jpg',
                name: "登陆",
                color: '#0a3150'
            }, {
                src: '../../images/2/左大图.jpg',
                name: "智能评估",
                color: '#61b8a6'
            }, {
                src: '../../images/3/左大图.jpg',
                name: "习惯配餐",
                color: '#bb3030'
            }, {
                src: '../../images/4/左大图.jpg',
                name: "了解更多",
                color: '#835d42'
            }
        ],
        last: 0,
        direction: '',
        changeNow: function (index) {
            if (vm.moving) {
                return
            }

            if (index >= vm.images.length) {
                index = 0
            }
            if (vm.last < index) {
                vm.direction = 'down'
            } else {
                vm.direction = 'up'
            }
            console.log(vm.direction + index)

            vm.last = index
            vm.now = index
            vm.moving = true
            setTimeout(function () {
                vm.moving = false
            }, 1000)
        },

        UIs: []

    })
    window[vm.$id] = vm
})
