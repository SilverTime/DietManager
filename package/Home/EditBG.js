/**
 * Created by mooshroom on 2016/3/15.
 */
define('EditBG', [
    'avalon',
    'text!../../package/Home/EditBG.html',
    //'css!../../package/EditBase/EditBase.css'
    //'../../lib/select/select.js',
    '../../lib/fileuploader/fileuploader',
    '../../plugins/isIt/isIt.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "EditBG",
        ready: function (i) {
            vm.reset()
            //以及其他方法
            pop2.open(html)
            try{

            }catch (err){

            }

        },
        reset: function () {
            try{
                vm.BackgrondImgURL=Home.Coach.BackgrondImgURL
            }catch (err){

            }


        },

        BackgrondImgURL:"",

        save: function () {
            if(vm.BackgrondImgURL==''){
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
                obj.save(id,{BackgrondImgURL:vm.BackgrondImgURL,}, function (res) {
                    pop2.close()
                    try{Home.Coach.BackgrondImgURL=vm.BackgrondImgURL}
                    catch (err){}
                }, function (err) {
                    tip.on(err)
                })
            })


        },

        $EditBG_uploader:{
            id:"uploader_EBG",
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
                var img=res[0]
                vm.BackgrondImgURL=res[0].Domain
            },
        }


    })
    return window[vm.$id] = vm
})