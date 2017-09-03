//Diet/FoodReplace
/**
 * 食材替换表
 *
 * @package Diet\Object
 */
define('FoodReplace',
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
                LID: '',//替换表记录编号  int(11) 必填:1 默认值:,
                FoodID: '',//食物编号  int(11) 必填:1 默认值:,
                Weight: '',//质量  double(15,8) 必填:1 默认值:,
                GID: '',//组号  int(11) 必填:1 默认值:,
                GName: '',//组名  char(250) 必填:1 默认值:,
                Name: '',//名称  char(250) 必填:1 默认值:,
                Energy: '',//单位能量  int(11) 必填:1 默认值:,
                Unit: '',//食材单位  char(20) 必填:1 默认值:g,
                Water: '',//单位水分  double(15,8) 必填:1 默认值:,
                Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                VA: '',//视黄醇当量  double(15,8) 必填:1 默认值:,
                VB1: '',//硫胺素(VB1)  double(15,8) 必填:1 默认值:,
                VB2: '',//核黄素(VB2)  double(15,8) 必填:1 默认值:,
                Niacin: '',//尼克酸  double(15,8) 必填:1 默认值:,
                VE: '',//维生素E  double(15,8) 必填:1 默认值:,
                Na: '',//钠  double(15,8) 必填:1 默认值:,
                Ca: '',//钙  double(15,8) 必填:1 默认值:,
                Fe: '',//铁  double(15,8) 必填:1 默认值:,
                TypeID: '',//类别编号  int(11) 必填:1 默认值:,
                VC: '',//抗坏血酸(VC)  double(15,8) 必填:1 默认值:,
                CH: '',//胆固醇  double(15,8) 必填:1 默认值:,
                Eatable: '',//可食部分  double(15,8) 必填:1 默认值:,
                TotalUse: '',//TotalUse  int(11) 必填:1 默认值:,
                Sort: '',//Sort  int(11) 必填:1 默认值:
            },

            get: function (LID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/FoodReplace/get",
                    data: {
                        LID: LID
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
            gets: function (LIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/FoodReplace/gets",
                    data: {
                        "Diet/FoodReplace": LIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (LID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/FoodReplace/save',
                    data: {
                        LID: LID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (LID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/FoodReplace/del",
                    data: {
                        "LID": LID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            search: function (data, success, error) {
                // 查询与某某食材同组的替换食物参数
                // data={
                //     W:{
                //         GID:1//组号
                //     }
                // }
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/FoodReplace/search",
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            },


            add: function (data, success, error) {
                // 如：组编号1的组为谷类，给该类添加替换食材 稻谷FoodID:1 ,等值替换质量为20g，数据如下：
                // data={
                //     GID:1,//替换组的组编号
                //     FoodID:1,//食物编号
                //     Weight:20//该替换表中等量替换的质量
                // };
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/FoodReplace/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_FoodReplace'] = obj
    })