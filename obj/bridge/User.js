//Diet/User
/**
 * 用户账户表
 * 1正常0禁止
 * @package Diet\Object
 */
define('User',
    ['avalon'],
    function () {
        var obj = {
            obj: {
                UID: '',//UID  int(11) 必填:1 默认值:,
                Account: '',//Account  char(250) 必填:1 默认值:,
                PWD: '',//PWD  char(250) 必填:1 默认值:,
                Status: '',//状态  tinyint(2) 必填: 默认值:,
                Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                Sex: '',//性别  tinyint(2) 必填:1 默认值:,
                ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                CTime: '',//添加时间  int(10) 必填:1 默认值:,
                Balance: {
                    UID: '',//用户编号  int(11) 必填:1 默认值:,
                    Balance: '',//账户余额  double(15,2) 必填:1 默认值:
                },
                Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                Contactor: '',//联系人  char(20) 必填:1 默认值:
            },
            /**
             * 用户注册
             * @param  Account 注册帐号
             * @param  PWD 注册密码
             * @param  Properties 其他属性
             * @return UserObject
             */
            reg: function (Account, PWD, Properties, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/reg",
                    data: {
                        Account: Account,
                        PWD: PWD,
                        Properties: Properties
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 用户登录
             * @param  Account 账户名
             * @param  PWD 账户密码
             * @return UserObject
             */
            login: function (Account, PWD, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/login",
                    data: {
                        Account: Account,
                        PWD: PWD
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 退出登录
             */
            logout: function (success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/logout",
                    data: {},
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 查找我的账户
             * @param  Account 账户名称
             * @return  {'Email':"","Phone":"",'Account':"","UID":1}
             */
            findAccount: function (Account, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/findAccount",
                    data: {
                        Account: Account
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 重置密码
             * @param  UID 用户编号
             * @param  PWD 新密码
             * @param  Code 验证码或旧密码 当用户权限为管理员时不需要Code参数，如果不是则需要提供Code验证码或者旧密码做验证
             */
            resetPWD: function (UID, PWD, Code, Account, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/resetPWD",
                    data: {
                        UID: UID,
                        PWD: PWD,
                        Code: Code,
                        Account: Account
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 检查账户是否存在
             * @param  Account 账户名称
             * @return  存在true,不存在false
             */
            checkAccount: function (Account, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/checkAccount",
                    data: {
                        Account: Account
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 自动登录
             * @param  SID 自动登录的验证字符
             * @return UserObject| 成功返回用户对象，否则返回false
             */
            reLogin: function (SID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/reLogin",
                    data: {
                        SID: SID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 发送验证码
             * @param  UID 用户名
             * @param  Address 地址(email的地址或手机号)
             * @param  Type 发送方式，默认为邮件，暂时支持邮件方式
             * @return  true/false
             */
            sendVerify: function (UID, Address, Type, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/sendVerify",
                    data: {
                        UID: UID,
                        Address: Address,
                        Type: Type
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 解除绑定多对多属性到关联表
             * @param  Property 属性名称
             * @param  Data 绑定数据
             * @param  PKID 主键ID
             * @return ||mixed
             */
            /**
             * 绑定多对多属性到关联表
             * @param  Property 属性名称
             * @param  Data 绑定数据
             * @param  PKID 主键ID
             * @return ||mixed
             */
            /**
             * 通过验证码登录
             * @param UID
             * @param Account
             * @param Code
             * @return mixed|
             */
            loginByCode: function (UID, Account, Code, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/loginByCode",
                    data: {
                        UID: UID,
                        Account: Account,
                        Code: Code
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (UID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/get",
                    data: {
                        UID: UID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 获取对象的列表
             * @param  IDs 参数为各自对象的主键 此处不做限制
             * @param  Properties 限定取出属性范围
             * @return |
             */
            gets: function (UIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/gets",
                    data: {
                        "Diet/User": UIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (UID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/User/save',
                    data: {
                        UID: UID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (UID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/del",
                    data: {
                        "UID": UID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            search: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/User/search",
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            },

            add: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/User/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_User'] = obj
    })