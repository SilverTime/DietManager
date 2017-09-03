/**
 * Created by mooshroom on 2016/1/19.
 */
define('pager',[
    'avalon',
    'text!../../lib/pager/pager.html',
    'css!../../lib/pager/pager.css',
], function (avalon, html, css) {
    avalon.component('tsy:pager',{
        $template:html,
        id:'pager',

        P:1,//当前页
        T:0,//总数
        N:12,//每页条目

        showPage:10,//显示多少页
        allPage:0,//计算总页数
        pagerList:[],//分页页码列表

        build: function (p) {},//分页的构建函数
        bi: function () {},//点击分页上面的分页之后的函数

        getList: function () {},//获取列表的函数

        $init: function (vm, elem) {
            window[vm.id]=vm
            vm.build= function (p) {

                //错误判断
                if(p<=0||isNaN(p)){
                    console.log('错误的页码数:'+p)
                    return
                }

                //加载页码
                vm.P=p
                vm.allPage=Math.ceil(vm.T/vm.N)//计算总页数

                //计算页码队列
                if(p<vm.showPage/2){
                    //最前面的几个
                    if(vm.allPage<=vm.showPage){
                        return vm.pagerList=avalon.range(1,vm.allPage+1)
                    }else{
                        return vm.pagerList=avalon.range(1,vm.showPage+1)
                    }
                }else if(p>=vm.allPage-(vm.showPage/2)){
                    //最后面的几个
                    if(vm.allPage<=vm.showPage){
                        return vm.pagerList=avalon.range(1,vm.allPage+1)
                    }else{
                        return vm.pagerList=avalon.range(vm.allPage-vm.showPage+1,vm.allPage+1)
                    }
                }else{
                    //中间的
                    var n= 0
                    if(vm.showPage%2>0){
                        //是奇数页
                        n=0
                    }else{
                        n=1
                    }

                    return vm.pagerList=avalon.range(vm.P-(vm.showPage/2).toFixed(0)+1,Number(vm.P)+Number((vm.showPage/2).toFixed(0))+n)
                }
            }
            vm.bi= function (p) {
                console.log("bi~~    "+p)

                //重组分页
                vm.build(p)

                //执行请求列表的函数
                vm.getList(p)
            }
            //vm.bi(1)
        }
    })
})