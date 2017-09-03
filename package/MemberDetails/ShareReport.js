/**
 * Created by ASUS on 2016/3/21.
 */
/**
 * Created by mooshroom on 2016/3/15.
 */
define('ShareReport', [
    'avalon',
    'text!../../package/MemberDetails/ShareReport.html',
    '../../plugins/ZeroClipboard/ZeroClipboard.min.js'
    //'css!../../package/EditBase/EditBase.css'
    //'../../lib/select/select.js',
    //'../../plugins/isIt/isIt.js'
], function (avalon, html, ZeroClipboard) {
    var vm = avalon.define({
        $id: "ShareReport",
        ready: function (i) {
            vm.reset()
            //以及其他方法
            vm.Edithref()
            pop.open(html)

            setTimeout(function () {
                // 定义一个新的复制对象
                var clip = new ZeroClipboard( document.getElementById("d_clip_button"), {
                    moviePath: "plugins/ZeroClipboard/ZeroClipboard.swf"
                } );
                // 复制内容到剪贴板成功后的操作
                clip.on( 'complete', function(client, args) {
                    alert("已复制到剪贴板：")
                } );
                clip.on("ready", function() {
                    console.log('剪贴板已就绪')
                    this.on("aftercopy", function(event) {
                        vm.state=1
                        console.log("Copied text to clipboard: " + event.data["text/plain"]);
                    });
                });
                clip.on("error", function(event) {
                    //$(".demo-area").hide();
                    console.log('error[name="' + event.name + '"]: ' + event.message);
                    ZeroClipboard.destroy();
                });
            },200)


        },
        state:0,
        btn:['复制到剪贴板','已复制'],
        reset: function () {
            avalon.mix(vm,{
                state:0,
                href:''
            })
        },
        href:'',
        Edithref: function () {
            vm.href=window.location.href+"&&mobile"
        }


        

    })
    window[vm.$id] = vm
})