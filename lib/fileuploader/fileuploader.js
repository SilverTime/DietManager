/*
 fileuploader 内在灵魂，沉稳坚毅
 生成时间：Fri Dec 09 2016   破门狂人R2-D2为您服务！
 */
define('fileuploader', [
    'avalon',
    'jquery',
    'text!../../lib/fileuploader/fileuploader.html',
    'css!../../lib/fileuploader/fileuploader.css',
    '../../lib/fileuploader/webuploader.js'
], function (avalon, $, html, css) {
    avalon.component('tsy:fileuploader', {
        $template: html,
        //组件编号，必须传入！
        id: "",
        /*
         * ***************参数队列区**************************/



        /*配置项 非必须*/
        //文件格式
        accept: {

            title: 'Images',                // {String} 文字描述
            extensions: 'jpg,jpeg,bmp,png', //{String} 允许的文件后缀，不带点，多个用逗号分割。
            mimeTypes: 'image/*'            //{String} 多个用逗号分割。
        },
        //所有文件大小
        fileSizeLimit: 200 * 1024 * 1024,    // 200 M
        //单个文件大小
        fileSingleSizeLimit: 50 * 1024 * 1024,   // 50 M
        //文件个数限制
        fileNumLimit: 1,
        //选中即上传
        auto: false,
        //获取上传验证的函数
        getSign: function () {
            //将在组件的$ready()中调用
            return true
        },
        // 文件接收服务端。
        server: 'http://r.tansuyun.cn/upload.php?m=',
        compress: false,
        //compress:{
        //    width: 1600,
        //    height: 1600,
        //
        //    // 图片质量，只有type为`image/jpeg`的时候才有效。
        //    quality: 90,
        //
        //    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
        //    allowMagnify: false,
        //
        //    // 是否允许裁剪。
        //    crop: false,
        //
        //    // 是否保留头部meta信息。
        //    preserveHeaders: true,
        //
        //    // 如果发现压缩后文件大小比原来还大，则使用原来图片
        //    // 此属性可能会影响图片自动纠正功能
        //    noCompressIfLarger: false,
        //
        //    // 单位字节，如果图片大小小于此值，不会采用压缩。
        //    compressSize: 0
        //},

        /*回调函数 必须*/
        //上传成功的回调函数
        success: function (res) {

        },
        //上传失败的回调函数
        err: function (res) {

        },


        /*
         * ***************函数空位**************************/
        uploader: {},//上传工具实体
        uploaderReady:false,
        list: [],//文件队列

        removeFile: function () {

        },
        upload: function () {

        },


        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)
            //将参数放入对于的地方
            //try {
            //    if(elem.data('lv')!=undefined){
            //        //vm.lv = elem.data('lv')
            //        //todo 改写上方的'lv'为你想要获取到的值
            //    }
            //} catch (err) {
            //}

            if (vm.id != "") {
                window[vm.id] = vm
            }

            vm.removeFile = function (i) {
                var list = vm.uploader.getFiles()
                vm.uploader.removeFile(list[i])
                vm.list.splice(i, 1)

            }

            vm.upload = function () {

                vm.uploader.upload()

            }


        },
        $ready: function (vm, elem) {


            //获取签名以备后续使用
            vm.getSign(function (sign) {
                //构建参数
                var config = {
                    // 文件接收服务端。
                    server: vm.server + sign,
                    dnd: document.getElementById(vm.id + 'Dnd'),//{Selector} [可选] [默认值：undefined] 指定Drag And Drop拖拽的容器，如果不指定，则不启动。
                    disableGlobalDnd: true,// {Selector} [可选] [默认值：false] 是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
                    paste: document.body,//{Selector} [可选] [默认值：undefined] 指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为document.body.
                    pick: document.getElementById(vm.id + 'Picker'),//{Selector, Object} [可选] [默认值：undefined] 指定选择文件的按钮容器，不指定则不创建按钮。
                    accept: vm.accept,//{Arroy} [可选] [默认值：null] 指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定。
                    thumb: { //{Object} [可选] 配置生成缩略图的选项。
                        width: 45,
                        height: 45,

                        // 图片质量，只有type为`image/jpeg`的时候才有效。
                        quality: 70,

                        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                        allowMagnify: false,

                        // 是否允许裁剪。
                        crop: true,

                        // 为空的话则保留原有图片格式。
                        // 否则强制转换成指定的类型。
                        type: 'image/jpeg'
                    },
                    compress: vm.compress,//{Object} [可选] 配置压缩的图片的选项。如果此选项为false, 则图片在上传前不进行压缩。
                    auto: vm.auto,// {Boolean} [可选] [默认值：false] 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
                    prepareNextFile: true,// {Boolean} [可选] [默认值：false] 是否允许在文件传输时提前把下一个文件准备好。 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。 如果能提前在当前文件传输期处理，可以节省总体耗时。
                    chunked: false,// {Boolean} [可选] [默认值：false] 是否要分片处理大文件上传。
                    //chunkSize: "",// {Boolean} [可选] [默认值：5242880] 如果要分片，分多大一片？ 默认大小为5M.
                    //chunkRetry: "",// {Boolean} [可选] [默认值：2] 如果某个分片由于网络问题出错，允许自动重传多少次？
                    //threads: "",// {Boolean} [可选] [默认值：3] 上传并发数。允许同时最大上传进程数。
                    formData: {},// {Object} [可选] [默认值：{}] 文件上传请求的参数表，每次发送都会发送此对象中的参数。
                    //fileVal: "",// {Object} [可选] [默认值：'file'] 设置文件上传域的name。
                    //method: "",// {Object} [可选] [默认值：'POST'] 文件上传方式，POST或者GET。
                    //sendAsBinary: "",// {Object} [可选] [默认值：false] 是否已二进制的流的方式发送文件，这样整个上传内容php://input都为文件内容， 其他参数在$_GET数组中。
                    fileNumLimit: vm.fileNumLimit,// {int} [可选] [默认值：undefined] 验证文件总数量, 超出则不允许加入队列。
                    fileSizeLimit: vm.fileSizeLimit,// {int} [可选] [默认值：undefined] 验证文件总大小是否超出限制, 超出则不允许加入队列。
                    fileSingleSizeLimit: vm.fileSingleSizeLimit,// {int} [可选] [默认值：undefined] 验证单个文件大小是否超出限制, 超出则不允许加入队列。
                    duplicate: true,// {Boolean} [可选] [默认值：undefined] 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
                    //disableWidgets: "",// {String, Array} [可选] [默认值：undefined] 默认所有 Uploader.register 了的 widget 都会被加载，如果禁用某一部分，请通过此 option 指定黑名单
                }

                vm.uploader = new WebUploader.Uploader(config)

                //绑定事件

                //当添加的时候（单个，暂时没用）
                vm.uploader.on('fileQueued', function (file) {
                    //vm.list.push(file)
                    console.log(file)
                })

                //当添加的时候(多个
                vm.uploader.on('filesQueued', function (files) {

                    files.forEach(function (el) {
                        el.state='inited'
                        el.on('statuschange', function (cur, prev) {
                            el.state=cur
                        })
                    })
                    vm.list = vm.list.concat(files)
                    console.log(files)
                })
                vm.uploader.on('fileDequeued', function (file) {
                    //文件被移除的时候

                })


                //进度条
                vm.uploader.on('uploadProgress', function (file,progress) {
                    console.log(progress)
                    vm.list.forEach(function (el,i) {
                        if(el.id==file.id){
                            vm.list.splice(i,1,avalon.mix(el,file,{progress:progress}))
                            vm.list.push({})
                            vm.list.pop()
                        }
                    })
                })

                // 拖拽时不接受 js,  文件。
                vm.uploader.on('dndAccept', function (items) {
                    var denied = false,
                        len = items.length,
                        i = 0,
                    // 修改js类型
                        unAllowed = 'application/javascript';

                    for (; i < len; i++) {
                        // 如果在列表里面
                        if (~unAllowed.indexOf(items[i].type)) {
                            denied = true;
                            break;
                        }
                    }

                    return !denied;
                });


                //所有文件上传完毕的时候
                vm.uploader.on('uploadFinished', function () {

                })

                //上传某个文件成功时
                vm.uploader.on('uploadSuccess', function (file,res) {

                    if(res.err||res.d==false){
                        vm.error(res,res.err)

                        vm.list.forEach(function (el,i) {
                            if(el.id==file.id){
                                vm.list.splice(i,1,avalon.mix(el,file,{state:'error'}))
                                vm.list.push({})
                                vm.list.pop()
                            }
                        })

                        return
                    }
                    vm.success(file,res.d)

                    vm.list.forEach(function (el,i) {
                        if(el.id==file.id){
                            vm.list.splice(i,1,avalon.mix(el,file,{state:'complete'}))
                            vm.list.push({})
                            vm.list.pop()
                        }
                    })
                })

                //上传某个文件失败时
                vm.uploader.on('uploadError', function (file,res) {
                    console.error(res)
                })

                vm.uploaderReady=true
            })

        },
        $dispose: function() {
            vm.uploader.destroy()
        }



    })
})