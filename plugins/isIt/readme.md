# isIt.js 数据验证组件
董文秀 2015年10月21日

---
## 功能说明：
针对需要在客户端进行输入的数据进行验证，例如手机号码、身份证号码、密码等。所包含的验证类型如下：
1. pwd  密码（长度大于或等于6）；
2. number 数字；
3. phone 座机号码；
4. mobile 手机号码；
5. email 电子邮箱；
6. money 金钱格式（整数或只有2为小数的数值）；
7. id 身份证号码。

## 用法：
引入isIt.js，也可以使用amd加载进来，然后在需要进行验证数据的地方调用isIt.xxx(data,"description");其中xxx为需要验证的数据类型，参数data为需要验证的数据，参数description为对数据的描述。方法返回true或者false，即通过验证返回true，不通过验证返回false并且使用tip组件或控制台提示。

验证数据时使用方法：

```javascript

//验证密码
isIt.pwd(data,'密码');

//验证数字
isIt.number(data,'数字');

//验证座机号码
isIt.phone(data,'座机');

//验证手机号码
isIt.mobile(data,'手机');

//验证邮箱
isIt.email(data,'邮箱');

//验证金钱
isIt.money(data,'金钱');

//验证身份证号码
isIt.id(data,'身份证');

```