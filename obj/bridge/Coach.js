//Diet/Coach
/**
 * 教练表
 *
 * @package Diet\Object
 */
define('Coach',
    ['avalon'],
    function () {
        var obj = {
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
            obj: {
                UID: '',//教练编号  int(11) 必填:1 默认值:,
                Type: '',//类型  tinyint(2) 必填:1 默认值:,
                Tel: '',//电话  char(20) 必填:1 默认值:,
                Address: '',//地址  char(250) 必填:1 默认值:,
                HeadImgURL: '',//头像地址  char(250) 必填: 默认值:,
                Email: '',//电子邮箱  char(250) 必填: 默认值:,
                Introduce: '',//自我介绍  text 必填: 默认值:,
                Alipay: '',//支付宝账户  char(250) 必填: 默认值:,
                BackgrondImgURL: '',//背景图地址  char(250) 必填: 默认值:,
                StartTime: '',//任教时间  int(10) 必填:1 默认值:,
                MemberAmount: '',//累积学员数  int(11) 必填:1 默认值:,
                DietAmount: '',//创建食谱数  int(11) 必填:1 默认值:,
                SaleAmount: '',//累积售出数  int(11) 必填:1 默认值:,
                Club: {
                    ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                    Name: '',//俱乐部名称  char(250) 必填:1 默认值:,
                    Address: '',//俱乐部地址  char(250) 必填:1 默认值:,
                    Tel: '',//俱乐部电话  char(20) 必填:1 默认值:,
                    Contactor: '',//联系人  char(20) 必填:1 默认值:,
                    Status: '',//状态  tinyint(2) 必填: 默认值:
                }
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
                    i: "Diet/Coach/get",
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
                    i: "Diet/Coach/gets",
                    data: {
                        "Diet/Coach": UIDs,
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
                    i: 'Diet/Coach/save',
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
                    i: "Diet/Coach/del",
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
                    i: "Diet/Coach/search",
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
                    i: 'Diet/Coach/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_Coach'] = obj
    })