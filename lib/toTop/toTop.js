/**
 * Created by mooshroom on 2015/12/5.
 *
 * 返回顶部组件
 */
define('toTop',[
    'avalon',
    'text!../../lib/toTop/toTop.html',
    'css!../../lib/toTop/toTop.css'
],function(avalon,html){
    var vm
    avalon.component("tsy:totop",{
        id:"totop",
        $init:function(){
            vm=this
            window[vm.id]=vm
        },
        $ready:function(){
//IE之外的绑定事件方法
            if(document.addEventListener && !document.attachEvent)
            {
                document.addEventListener('mousewheel',vm.computHeight);
//FF绑定滚动事件
                document.addEventListener('DOMMouseScroll',vm.computHeight);
            }
//IE
            else if(document.attachEvent && !document.addEventListener){
                document.attachEvent('onmousewheel',vm.computHeight);
            }else{
                window.onmousewheel = vm.computHeight;
            }
        },
        $template: html,
        showTopBtn:false,
        toping:true,
        computHeight:function(event){
            var e = event || window.event;
////获取滚动距离(FF每次滚动 data为3或者-3，其他为120或者-120)
            var data = e.detail || e.wheelDelta;
            if(data<0){
                vm.toping=false
            }

        //ff的 scroll
            var ffScroll = document.documentElement.scrollTop;
            //其他的 scroll
            var scroll = document.body.scrollTop;
            if(ffScroll >= 200 || scroll >= 200){
                vm.showTopBtn = true;
            } else {
                vm.showTopBtn = false;
            }

            //setTimeout(function(){layout.computHeight();},300);

        },

        //火箭
        toTop: function () {
            vm.toping=true
            layout.rocketStatue = 2
            layout.flyFast=20
            //设置加速度
            var a1 = 0.05
            //设置单位时间
            var t = 1000 / 60
            //设置当前时间
            var T = 0

            //设置减速度
            //获取总距离

            //开始的距离
            //已经移动了的距离
            var doneS = 0
            //开始计算
            function fly() {
                var S = getScrollTop()
                if (S != 0) {
//                    console.log("T:"+T)
                    layout.flyFast=200
                    layout.rocketStatue = 2
                    var s = 0//应当移动的距离
                    var v = 0
                    v = a1 * T//当前速度等于加速度乘以当前时间
                    //layout.fireLength=v*2
                    s = v * t//距离等于速度乘以时间
//                    console.log("s:"+s)
                    if(document.documentElement&&document.documentElement.scrollTop)
                    {
                        if (S - s > 0) {
                            document.documentElement.scrollTop = S - s//滚动
                        }
                        else {
                            document.documentElement.scrollTop = S-S/20
                            T=T- T/14

                        }
                    }
                    else if(document.body)
                    {
                        if (S - s > 0) {
                            document.body.scrollTop = S - s//滚动
                        }
                        else {
                            document.body.scrollTop = S-S/10
                            T=T- T/14

                        }
                    }
                    T = T + t//时间流逝
                    doneS = doneS + s//记录里程

                    setTimeout(function () {
                        if (getScrollTop() != 0&&vm.toping) {
                            fly()
                        }
                        else{
                            layout.fireLength=0
                            layout.flyFast=0
                            layout.rocketStatue=1
                            setTimeout(function(){
                                layout.rocketStatue=0
                            },2600)
                        }
                    }, t)
                }
            }
            fly()


            setTimeout(function(){
                if(layout.mouseOn){
                    layout.rocketStatue = 1
                }
                else{
                    layout.rocketStatue = 0
                }
                layout.flyFast=0

            },2000)
        },
        flyFast:0,
        mouseOn:false,
        fireLength: 0,
        rocketStatue: 0,//0=休息状态;1=准备起飞;2=飞行中
        rocketReady: function () {
            layout.mouseOn=true
            if (layout.rocketStatue == 0) {

                layout.rocketStatue = 1
            }
        },
        rocketDown: function () {

            if (layout.mouseOn&&(layout.rocketStatue == 1||getScrollTop()==0)) {
                if (layout.rocketStatue == 2) {
                    setTimeout(function () {
                        layout.rocketStatue = 0
                    }, 4000)
                } else {
                    layout.rocketStatue = 0
                }
            }
            layout.mouseOn=false
        },
    })
})