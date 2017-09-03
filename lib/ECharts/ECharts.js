/**
 * Created by mooshroom on 2016/1/20.
 */
define('ECharts',[
    'avalon',
    'text!../../lib/ECharts/ECharts.html',
    'css!../../lib/ECharts/ECharts.css',
    '../../lib/ECharts/echarts.common.min.js'
], function (avalon,html,css,echarts) {
    avalon.component('tsy:chart',{
        $template:html,
        id:"",
        height:400,
        width:'100%',
        $ops:{
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        },
        $Chart:null,
        $init: function (vm, elem) {
            window[vm.id]=vm



            vm.reload= function () {
                vm.$Chart.setOption(vm.$ops)
            }

            vm.resize= function () {
                vm.$Chart.resize()
            }



        },

        reload: function () {},
        resize: function () {},

        $ready: function (vm,elem) {
            vm.$Chart=echarts.init(document.getElementById(vm.id))
            vm.reload()
            //window.onresize(vm.$Chart.resize())
        }

    })
})