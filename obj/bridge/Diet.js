//Diet/Diet
/**
 * 食谱库
 * 减脂、增肌、塑性
 * @package Diet\Object
 */
define('Diet',
    ['avalon'],
    function () {
        var obj = {
            obj: {
                DietID: '',//食谱编号  int(11) 必填:1 默认值:,
                Target: '',//食谱目的 减脂、增肌、塑性 tinyint(2) 必填:1 默认值:,
                Energy: '',//能量含量  double(15,8) 必填:1 默认值:,
                Status: '',//食谱状态  tinyint(2) 必填:1 默认值:,
                CTime: '',//添加日期  int(10) 必填:1 默认值:,
                CUID: '',//添加人 添加人编号 int(11) 必填:1 默认值:,
                CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                REI: '',//推荐能量摄入  double(15,8) 必填:1 默认值:,
                NE: '',//营养素供能比 以逗号分隔的碳水化合物：蛋白质：脂肪 char(50) 必填:1 默认值:,
                Introduce: '',//食谱介绍  text 必填: 默认值:,
                Attention: '',//注意事项  text 必填: 默认值:,
                Praise: '',//好评数  int(11) 必填: 默认值:,
                Bad: '',//差评数  int(11) 必填: 默认值:,
                BreakfastEnergy: '',//早餐  double(15,8) 必填:1 默认值:,
                LunchEnergy: '',//午餐  double(15,8) 必填:1 默认值:,
                DinnerEnergy: '',//晚餐  double(15,8) 必填:1 默认值:,
                TotalEnergy: '',//总计能量  double(15,8) 必填:1 默认值:,
                Sort: '',//Sort  int(11) 必填:1 默认值:,
                TotalUse: '',//TotalUse  int(11) 必填:1 默认值:,
                Price: '',//价格  double(15,2) 必填:1 默认值:,
                Title: '',//名称  char(50) 必填:1 默认值:,
                Details: [
                    {
                        DetailID: '',//详情编号  int(11) 必填:1 默认值:,
                        DietID: '',//食谱编号  int(11) 必填:1 默认值:,
                        MealID: '',//餐次编号  int(11) 必填:1 默认值:,
                        FoodID: '',//食材编号  int(11) 必填:1 默认值:,
                        Weight: '',//食材质量  double(15,8) 必填:1 默认值:,
                        MealSign: '',//餐次标记 各个食材中确定具体的餐次，默认为正餐，可选 加餐，训练前 char(20) 必填:1 默认值:,
                        Energy: '',//能量含量  double(15,8) 必填:1 默认值:,
                        CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                        DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                        Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                        Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                        Unit: '',//食材单位  char(20) 必填:1 默认值:g
                    }
                ],
                Comments: [
                    {
                        CommentID: '',//评论编号  int(11) 必填:1 默认值:,
                        DietID: '',//食谱编号  int(11) 必填:1 默认值:,
                        Content: '',//评论内容  char(250) 必填:1 默认值:,
                        Level: '',//评论等级  tinyint(2) 必填:1 默认值:
                    }
                ],
                CUser: {
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
            /**
             * 添加食谱
             * @param Target 食谱类型 减脂、增肌、塑形
             * @param NE 营养素供能比 以逗号分隔的碳水化合物：蛋白质：脂肪
             * @param REI 推荐能量摄入
             * @param Foods 食物列表 格式见代码注释
             * @param Status 食谱状态
             * @return |
             */
            add: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/Diet/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 修改食谱
             * @param  DietID
             * @param Params
             */
            save: function (DietID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/Diet/save',
                    data: {
                        DietID: DietID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 后端渲染链接跳转，分享链接使用。其它不用
             * @param  Title 链接标题
             * @param  Description 描述信息
             * @param  Keywords 关键词
             * @param Tips 提示
             * @param  ImgSrc 图片地址
             * @param Url
             * @param  Time
             */
            jump: function (Title, Description, Keywords, Tips, ImgSrc, Url, Time, MemberID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/Diet/jump",
                    data: {
                        Title: Title,
                        Description: Description,
                        Keywords: Keywords,
                        Tips: Tips,
                        ImgSrc: ImgSrc,
                        Url: Url,
                        Time: Time,
                        MemberID: MemberID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 食谱分类合计，营养素总计
             * @param Foods
             */
            sum: function (Foods, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/Diet/sum",
                    data: {
                        Foods: Foods
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
             * 计算能量总值
             * @param Details
             * @return mixed
             */
            total: function (Details, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/Diet/total",
                    data: {
                        Details: Details
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (DietID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/Diet/get",
                    data: {
                        DietID: DietID
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
            gets: function (DietIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/Diet/gets",
                    data: {
                        "Diet/Diet": DietIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (DietID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/Diet/del",
                    data: {
                        "DietID": DietID
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
                    i: "Diet/Diet/search",
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_Diet'] = obj
    })