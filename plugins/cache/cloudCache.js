/**
 * Created by mooshroom on 2015/9/26.
 * 云缓存插件
 * 依赖ws.call
 * 存储：ws.call({i:'C/s',data:{k:1,v:1212},success:function(r){console.log(r)}})

 获取：ws.call({i:'C/g',data:{k:1},success:function(r){console.log(r)}})
 */

(function(){
    //传入对象为存储
    //传入字符串未获取
    function CC(data){
        if(look(data)=="Object"){
            //存储
            for(var x in data){
                ws.call({
                    i:"C/s",
                    data:{
                        k:x,
                        v:data[x]
                    },
                    success: function (res) {
                        if(!res.err){
                            console.log(x+"-存储成功！")
                        }else{
                            console.log(x+'-存储失败！'+res.err)
                        }
                    }
                })
            }
        }
        else {
            console.log("cc传入参数错误："+data)
        }

        //类型判断函数
        function look (object) {
            return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
        }
    }



    return CC
})