
/**
 * Created by mooshroom on 2016/3/15.
 */
define('EditHead', [
    'avalon',
    'text!../../package/Home/EditHead.html',
    //'css!../../package/EditBase/EditBase.css'
    //'../../lib/select/select.js',
    '../../lib/fileuploader/fileuploader',
    '../../plugins/isIt/isIt.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "EditHead",
        ready: function (i) {
            vm.reset()
            //以及其他方法
            pop2.open(html)

        },
        reset: function () {
            try{
                vm.HeadImgURL=Home.Coach.HeadImgURL
            }catch (err){

            }

        },
        HeadImgURL:"",
        save: function () {
            if(vm.HeadImgURL==''){
                tip.on('尚未选择或者上传图片')
                return
            }

            try{
                var id=Home.Coach.UID
            }catch (err){
                tip.on('教练员id获取失败')
                return
            }

            require(['../../obj/bridge/Coach.js'], function (obj) {
                obj.save(id,{HeadImgURL:vm.HeadImgURL,}, function (res) {
                    pop2.close()
                    try{Home.Coach.HeadImgURL=vm.HeadImgURL}
                    catch (err){}
                }, function (err) {
                    tip.on(err)
                })
            })


        },

        $EditHead_uploader:{
            id:"uploader_EH",
            //获取上传验证的函数
            getSign: function (callback) {
                //将在组件的$ready()中调用,
                //todo 必须在callback中传入sign（上传签名）
                $$.call({
                    i:"Upload/sign",
                    data:{},
                    success: function (res) {
                        callback(res.Sign)
                    }
                })


            },

            /*回调函数 必须*/

            //上传失败的回调函数
            error: function (res,err) {

            },
            success: function (file, res) {
                console.log(file)
                vm.HeadImgURL=res[0].Domain
            },
        }


    })
    return window[vm.$id] = vm
})