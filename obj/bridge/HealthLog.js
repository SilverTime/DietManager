//Diet/HealthLog
/**
 * 体质
 *
 * @package Diet\Object
 */
define('HealthLog',
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
                UID: '',//用户编号  int(11) 必填:1 默认值:,
                Date: '',//日期  int(8) 必填:1 默认值:,
                Weight: '',//体重  double(15,8) 必填:1 默认值:,
                BMI: '',//BMI  double(15,8) 必填:1 默认值:,
                BMR: '',//基础代谢  double(15,8) 必填:1 默认值:,
                PAL: '',//体力活动水平  double(15,8) 必填:1 默认值:,
                DTEC: '',//每日总能量消耗  double(15,8) 必填:1 默认值:,
                Waist: '',//腰围  double(15,8) 必填:1 默认值:,
                Hip: '',//臀围  double(15,8) 必填:1 默认值:,
                BFR: '',//体脂率  double(15,8) 必填:1 默认值:,
                WHR: '',//腰臀比  double(15,8) 必填:1 默认值:,
                Height: '',//身高  double(15,8) 必填:1 默认值:
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
                    i: "Diet/HealthLog/get",
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
                    i: "Diet/HealthLog/gets",
                    data: {
                        "Diet/HealthLog": UIDs,
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
                    i: 'Diet/HealthLog/save',
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
                    i: "Diet/HealthLog/del",
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
                    i: "Diet/HealthLog/search",
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
                    i: 'Diet/HealthLog/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_HealthLog'] = obj
    })