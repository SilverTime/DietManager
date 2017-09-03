//Diet/Bill
/**
 * 账单表
 * 充值、提现、消费、收入
 * @package Diet\Object
 */
define('Bill',
    ['avalon'],
    function () {
        var obj={      
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
obj:{
BillID:'',//账单编号  int(11) 必填:1 默认值:,
            Money:'',//账单金额  double(15,8) 必填:1 默认值:,
            Type:'',//账单类型 充值、提现、消费、收入 tinyint(2) 必填:1 默认值:,
            Memo:'',//备注  char(250) 必填:1 默认值:,
            Before:'',//账单前余额  double(15,2) 必填:1 默认值:,
            After:'',//账单后余额  double(15,2) 必填:1 默认值:,
            Account:'',//交易账户  char(250) 必填:1 默认值:,
            CTime:'',//账单时间  int(10) 必填:1 默认值:,
            CUID:'',//账单人  int(11) 必填:1 默认值:,
            CIP:'',//发生IP  int(11) 必填:1 默认值:,
            Status:'',//账单状态 已发起申请、处理中、已到帐 tinyint(2) 必填:1 默认值:,
            UUID:'',//账单处理人  int(11) 必填:1 默认值:,
            UUser:{
UID:'',//UID  int(11) 必填:1 默认值:,
Account:'',//Account  char(250) 必填:1 默认值:,
PWD:'',//PWD  char(250) 必填:1 默认值:,
Status:'',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
Name:'',//姓名  char(250) 必填:1 默认值:,
Sex:'',//性别  tinyint(2) 必填:1 默认值:,
ClubID:'',//俱乐部编号  int(11) 必填:1 默认值:,
Tel:'',//电话  char(20) 必填:1 默认值:,
CTime:'',//添加时间  int(10) 必填:1 默认值:
},
            Bill:{
UID:'',//UID  int(11) 必填:1 默认值:,
Account:'',//Account  char(250) 必填:1 默认值:,
PWD:'',//PWD  char(250) 必填:1 默认值:,
Status:'',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
Name:'',//姓名  char(250) 必填:1 默认值:,
Sex:'',//性别  tinyint(2) 必填:1 默认值:,
ClubID:'',//俱乐部编号  int(11) 必填:1 默认值:,
Tel:'',//电话  char(20) 必填:1 默认值:,
CTime:'',//添加时间  int(10) 必填:1 默认值:
}
},
            
get: function (BillID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/Bill/get",
                    data:{
                        BillID:BillID
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            /**
     * 获取对象的列表
     * @param  IDs 参数为各自对象的主键 此处不做限制
     * @param  Properties 限定取出属性范围
     * @return |
     */
gets: function (BillIDs,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/Bill/gets",
                    data:{
                        "Diet/Bill":BillIDs,
                        "P":1,
                        "N":1000000
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
save: function (BillID,Params,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/Bill/save',
                    data:{
                        BillID:BillID,
                        Params:Params
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
del: function (BillID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/Bill/del",
                    data:{
                        "BillID":BillID
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
search: function (data,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/Bill/search",
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
add: function (data,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/Bill/add',
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            }
        }
        return window['obj_Diet_Bill']=obj
    })