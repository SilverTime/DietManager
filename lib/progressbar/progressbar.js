define([
    "avalon",
    "text!.. /../lib/progressbar/progressbar.html",
    "css!../../lib/progressbar/progressbar.css"
], function (avalon, html) {
    //声明新生成组件的ID

    var vm
    avalon.component("tsy:progressbar",{
        id: "progressbar",
        $init: function () {       //组件加载成功后自动执行
            vm=this
             window[vm.id]=vm
        },
        $template:html,
        $remove: function () {     //销毁时调用
            element.innerHTML = "";
        },
        onInit: function () {

        },
        present: 0,
        scope: 20,
        down: 1,
        timeout: null,
        timeend: null,
        waitime: 100,
        state: "default",//"default"默认状态； running 读条中；
        startT: function () {
            if (vm.state == "running") {
                vm.resetT()
            }
            if (vm.timeout != null) {
                clearInterval(vm.timeout);

            }
            vm.state = "running"
            vm.timeout = setInterval(run, vm.waitime)

            function run() {
                if (vm.state == "running") {
                    var s = (100 - vm.present) / 20
                    if (vm.present + s > 99.5) {
                        vm.present = 99.5
                    }
                    else {
                        vm.present += s
                    }


                }

            }

        },
        endT: function () {
            var last = 100 - vm.present
            if (vm.timeout != null) {
                clearInterval(vm.timeout);
            }
            if (vm.timeend != null) {
                clearInterval(vm.timeend);
            }
            vm.timeend = setInterval(function () {
                if (vm.present < 100) {
                    var s = vm.present + last / 2.5
                    if (s < 99) {
                        vm.present = s
                    } else {
                        vm.present = 100
                    }
                }
                else {
                    if (vm.timeout != null) {
                        clearInterval(vm.timeend);

                        setTimeout(function () {
                            vm.state = "default"
                            vm.resetT()
                        }, 500)

                    }
                }
            }, vm.waitime);

        },
        pauseT: function () {
            if (vm.timeout != null) {
                clearInterval(vm.timeout);
                clearInterval(vm.timeend)
            }
        },
        resetT: function () {
            if (vm.timeout != null) {
                clearInterval(vm.timeout);
                clearInterval(vm.timeend)
                vm.timeout = null;
            }
            //vm.waitime = 10;
            vm.present = 0;
            vm.scope = 20
            vm.state = "default"
        }
    });

});
