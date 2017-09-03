/**
 * Created by mooshroom on 2015/5/30 0030.
 * 本地存储模块，将所有需要缓存的内容进行统一存储
 */
var cache = {

        //内存数据
        data: {},

        //存储方式
        type: 0,//0:内存存储；1:localStorage；2：cookie

        //是否为存储
        //save:true,//默认是存储

        /*
         * 如果传入参数为对象，则为存储，其他的则视为提取
         */
        //就绪
        ready: function () {
            console.log("存储模块加载完成")
            //判断支持的环境
            if (typeof(Storage) !== "undefined") {
                // Yes! localStorage and sessionStorage support!
                console.log("HTML5 web存储模式开启")
                this.type = 1
            }
            else if (document.cookie || navigator.cookieEnabled) {
                // cookie
                console.log("cookie存储模式开启")
                this.type = 2
            }
            else {
                console.log("here存储模式开启")
                this.type = 0
            }

        },

        //电源按钮
        go: function (data) {
            //判断类型
            var type = this.look(data);
            if (type == "Object") {
                //当前执行存储操作
                console.log("正在存储")
                //每次可以存储多个值
                var x;
                for (x in data) {
                    this.cSet(x, data[x])
                }

            }
            else if (type == "String" || type=="Number") {
                console.log("正在获取" + data)
                //执行取出操作
                //首先拉取内存中的也就是cache.data
                return this.cGet(data)
            }
            else {
                console.log("参数类型错误，只能传入对象或字符串或数值-")
            }

        },

        //类型判断函数
        look: function (object) {
            return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
        },

        //保存
        cSet: function (key, val) {
            //在内存中保存
            this.data[key] = val

            //在存储中保存
            if (this.type === 1) {
                this.localStorageSet(key, val)
            }
            else if (this.type === 2) {
                this.cookieSet(key, val)
            }
        },

        //提取
        cGet: function (key) {
            //在内存中提取
            if (this.data[key]) {
                return this.data[key]
            }
            //在存储中提取
            else if (this.type === 1) {
                return this.localStorageGet(key)
            }
            else if (this.type === 2) {
                return this.cookieGet(key)
            }
        },

        //html5模式存储，
        localStorageSet: function (key, val) {
            window.localStorage.setItem(key, val);
            console.log("localStorageSet" + key + ":" + val)
        },
        localStorageGet: function (key) {
            var res = window.localStorage.getItem(key);

            if (res) {
                //存入内存中
                this.data[key] = res
                return res
            }
            else {
                console.log("没有找到：" + key)
                return undefined
            }

        },

        //cooki模式存储
        cookieSet: function (key, val) {
            var Days = 30; //此 cookie 将被保存 30 天
            var exp = new Date();    //new Date("December 31, 9998");
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = key + "=" + escape(val) + ";expires=" + exp.toGMTString();
            console.log("cookieSet" + key + ":" + val)
        },
        cookieGet: function (key) {
            var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
            if (arr != null) {
                return unescape(arr[2]);
            }

            else {
                console.log("没有找到：" + key)
                return undefined
            }

        }
    }

cache.ready()