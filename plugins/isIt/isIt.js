define('isIt',function(){
    return isIt = {
        pwd:function(str,intro){     //长度大于或等于6
            if(str.length < 6 || str.length > 16){
                try{
                    tip.on(intro + "'" + str + "'" + " 不是正确的密码，因为长度小于6或者大于16",0,3000);
                }catch(err){
                    console.log(intro + "'" + str + "'" + " 不是正确的密码，因为长度小于6或者大于16");
                }
                return false;
            }
            return true;
        },
        number:function(str,intro){      //数字
            var reg = /^[0-9-][0-9.]+$/;     //排除十六进制和未写整数部分的小数等情况
            if(reg.test(str)){
                if(isNaN(str)){
                    try{
                        tip.on(intro + "'" + str + "'" + " 不是数字 ",0,3000);
                    }catch(err){
                        console.log(intro + "'" + str + "'" + " 不是数字 ");
                    }
                    return false;
                }
                //console.log("'" + str + "'" + " 是 " + intro );
                return true;
            }
            try{
                tip.on(intro + "'" + str + "'" + " 不是数字",0,3000);
            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是数字 ");
            }
            return false;
        },
        //正确格式：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
        phone:function(str,intro){       //座机(不确定有哪些严格字段)
            var reg = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;///^\d{3}-\d{8}|\d{4}-\d{7}$/;///([0-9]{3,4}-)?[0-9]{7,8}/;d{3}-d{8}|d{4}-d{7};^((d{3,4})|d{3,4}-)?d{7,8}$
            if(reg.test(str)){
                //console.log("'" + str + "'" + " 是 " + intro );
                return true;
            }
            try{
                tip.on(intro + "'" + str + "'" + " 不是正确的座机号码，请用‘-’分隔",0,3000);
            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是正确的座机号码，请用‘-’分隔");
            }
            return false;
        },
        //最新手机号段归属地数据库(2015年10月18日)
        /*  三大运营商最新号段  合作版
         移动号段：
         134 135 136 137 138 139 147 150 151 152 157 158 159 178（新） 182 183 184 187 188
         联通号段：
         130 131 132 145 155 156 175（新） 176（新） 185 186
         电信号段：
         133 153 177 180 181 189
         虚拟运营商:
         170
         总结：
         130-139/180-189
         145 、147
         150-153 、155-159
         170 、175 、176 、177 、178
         */
        mobile:function(str,intro){      //手机
            var reg = /^(1[38][0-9][0-9]{8})|(14[57][0-9]{8})|(15[012356789][0-9]{8})|(17[05678][0-9]{8})$/;
            if(reg.test(str)){
                //console.log("'" + str + "'" + " 是 " + intro );
                return true;
            }
            try{
                tip.on(intro + "'" + str + "'" + " 不是正确的手机号码",0,3000);
            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是正确的手机号码");
            }
            return false;
        },
        tel: function (str, intro) {
            var p=/^(1[38][0-9][0-9]{8})|(14[57][0-9]{8})|(15[012356789][0-9]{8})|(17[05678][0-9]{8})$/;
            var t=/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
            if(p.test(str)||t.test(str)){
                return true
            }

            try{
                tip.on(intro + "'" + str + "'" + " 不是正确的电话号码",0,3000);
            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是正确的电话号码");
            }
            return false;
        },
        email:function(str,intro){       //电子邮箱（不太确定有哪些奇葩的邮箱）
            var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(reg.test(str)){
                //console.log("'" + str + "'" + " 是 " + intro );
                return true;
            }
            try{
                tip.on(intro + "'" + str + "'" + " 不是正确的电子邮箱" ,0,3000);

            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是正确的电子邮箱");
            }
            return false;
        },
        money:function(str,intro){       // 整数或只有2为小数的数值
            var reg = /^[0-9]+(.[0-9]{1,2})?$/;
            if(reg.test(str)){
                //console.log("'" + str + "'" + " 是 " + intro );
                return true;
            }
            try{
                tip.on(intro + "'" + str + "'" + " 不是正确的金额，金额为整数或只有两位小数",0,3000);
                billTip.on(intro + "'" + str + "'" + " 不是正确的金额，金额为整数或只有两位小数",0,3000)
            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是正确的金额，金额为整数或只有两位小数");
            }
            return false;
        },
        id:function(str,intro){      //身份证号码
            var reg = /^\d{6}[12]\d{3}[01][0-9][0123][0-9]\d{3}[0-9xX]$/;
            if(reg.test(str)){
                var yy = parseInt(str[6] + str[7] + str[8] + str[9]);
                var mm = parseInt(str[10] + str[11]);
                var dd = parseInt(str[12] + str[13]);
                var nowdate = new Date();
                if(yy > nowdate.getFullYear()){
                    try{
                        tip.on(intro + "'" + str + "'" + " 不是正确的身份证号码，因为出生年份大于当前年份",0,3000);
                    }catch(err){
                        console.log(intro + "'" + str + "'" + " 不是正确的身份证号码，因为出生年份大于当前年份");
                    }
                    return false;
                }
                if(mm > 12 || mm == 0){
                    try{
                        tip.on(intro + "'" + str + "'" + " 不是正确的身份证号码，因为出生月份错误",0,3000);
                    }catch(err){
                        console.log(intro + "'" + str + "'" + " 不是正确的身份证号码，因为出生月份错误");
                    }
                    return false;
                }
                var day = [31,28,31,30,31,30,31,31,30,31,30,31];
                if((yy % 400 == 0)||(yy / 4 == 0 && yy / 100 != 0)){
                    day[1] = 29;
                }
                if(dd > day[mm - 1] || dd == 0){
                    try{
                        tip.on(intro + "'" + str + "'" + " 不是正确的身份证号码，因为出生日期错误",0,3000);
                    }catch(err){
                        console.log(intro + "'" + str + "'" + " 不是正确的身份证号码，因为出生日期错误");
                    }
                    return false;
                }
                //console.log("'" + str + "'" + " 是 " + intro );
                return true;
            }
            try{
                tip.on(intro + "'" + str + "'" + " 不是正确的身份证号码",0,3000);
            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是正确的身份证号码");
            }
            return false;
        },
        //Chris 补充
        /*（严格）匹配姓名：
         要求：真实姓名可以是汉字，也可以是字母，但是不能两者都有，也不能包含任何符号和数字
         注意：1.如果是英文名,可以允许英文名字中出现空格
         2.英文名的空格可以是多个，但是不能连续出现多个
         3.汉字不能出现空格[\u4e00-\u9fa5]
         */
        name:function(str,intro){//匹配姓名
            var reg=/^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
            if(reg.test(str)){
                //console.log("'" + str + "'" + " 是 " + intro );
                return true;
            }
            try{
                tip.on(intro + "'" + str + "'" + " 不是正确的姓名格式",0,3000);
            }catch(err){
                console.log(intro + "'" + str + "'" + " 不是正确的姓名格式");
            }
            return false;
        }
    };
});
