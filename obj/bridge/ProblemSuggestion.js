//Diet/ProblemSuggestion
/**
 * 问题和建议
 * 添加人编号
 * @package Diet\Object
 */
define('ProblemSuggestion',
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
                PSID: '',//问题建议编号  int(11) 必填:1 默认值:,
                Problem: '',//问题  char(250) 必填:1 默认值:,
                Suggestion: '',//建议  char(250) 必填:1 默认值:,
                CTime: '',//添加日期  int(10) 必填:1 默认值:,
                CUID: '',//添加人 添加人编号 int(11) 必填:1 默认值:,
                User: {
                    UID: '',//UID  int(11) 必填:1 默认值:,
                    Account: '',//Account  char(250) 必填:1 默认值:,
                    PWD: '',//PWD  char(250) 必填:1 默认值:,
                    Status: '',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
                    Name: '',//姓名  char(250) 必填:1 默认值:,
                    Sex: '',//性别  tinyint(2) 必填:1 默认值:,
                    ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                    Tel: '',//电话  char(20) 必填:1 默认值:,
                    CTime: '',//添加时间  int(10) 必填:1 默认值:
                }
            },

            get: function (PSID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/ProblemSuggestion/get",
                    data: {
                        PSID: PSID
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
            gets: function (PSIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/ProblemSuggestion/gets",
                    data: {
                        "Diet/ProblemSuggestion": PSIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (PSID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/ProblemSuggestion/save',
                    data: {
                        PSID: PSID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (PSID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/ProblemSuggestion/del",
                    data: {
                        "PSID": PSID
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
                    i: "Diet/ProblemSuggestion/search",
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
                    i: 'Diet/ProblemSuggestion/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_ProblemSuggestion'] = obj
    })