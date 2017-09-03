/**
 * Created by Administrator on 2015/4/22.
 */
/*
 * 微信版门禁系统使用说明
 * -----------------------
 * 处理流程：
 * 1、在微信菜单栏上绑定的地址如下
 *
 https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0ed684986326b7e7&redirect_uri=http%3a%2f%2fpicc.weixin.tansuyun.cn%2f&index.html&response_type=code&scope=snsapi_base&state=userInfo%2f1#wechat_redirect
 * 2、然后用户在微信的破服务器上面跑一圈之后会回到www.renchebond.com/mobile.html，并且会在地址后面带上参数code和state。
 * state不重要，(毛线，很重要)
 * 3、getCode()这个方法就是用来从URL中解析出code的值，
 * 4、然后将code的值发送给后端，
 * 5、再由后端拿着这个code去问微信要用户的openID，要到了之后进行登录之类的操作，然后返回结果
 * 6、然后，该怎么弄怎么弄了
 * -----------------------
 * 詹伟，2015.4.24
 * */


var doorWX = {
    UID: "",
    //isLogined: false,
    code: "",
    target: "",
    //解析获得code
    getCode: function () {

        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }

        //获取目标业务页面
        if (theRequest.state) {
            doorWX.target = theRequest.state;
        }

        //获取登录所用的code
        if (theRequest.code) {
            doorWX.code = theRequest.code;

            //执行请求动作
            try {
                doorWX.sendCode(doorWX.code);
            } catch (err) {
                alert(err.message)
            }


        }

    },

    //发送code换取用户信息
    sendCode: function (code) {

        //alert('Code:' + code)
        //根据code换取用户信息
        $$.call({
            i: "Wechat/getOAuth2AccessToken",
            data: {
                Code: code
            },
            success: function (res) {
                //alert("返回的accessToken和用户信息："+JSON.stringify(res))
                cache.go(res.AccessToken)
                cache.go(res.UserInfo)

                //签到
                $$.call({
                    i:"SignRecord/sign",
                    data:{
                        UserID:cache.go("uid"),
                    },success: function () {
                        console.log('签到成功')
                    },error: function () {
                        console.log('签到失败')
                    }
                })

                window.location.href = "./index.html#!/" + doorWX.target
                //doorWX.getWXUserInfo(res)

            },
            error: function (err) {
                tip.on('Wechat/getOAuth2AccessToken接口错误：' + err)
            }
        })
    },


};



