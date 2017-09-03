//Diet/Index

define('',
    ['avalon'],
    function () {
        var obj={      
            obj:{

},
            
index: function (success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }
                
                $$.call({
                    i:"Diet/Index/index",
                    data:{
                        
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            }
        }
        return window['obj_Diet_Index']=obj
    })