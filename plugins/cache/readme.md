# cache.js 客户端存储组件
詹伟 2015年5月30日

---
## 功能说明：
针对需要在客户端进行存储的数据进行统一处理，例如保存tsy、un、uid等数据，以及在微信端需要保存的openid，以及其他需要保存的东西（CSS）之类的也是可以的。玩法自己想象了。

如果当前的环境支持html5的web存储，那么会自动使用localStorage来存储，如果不支持则使用cookie进行存储，如果都不支持，则统一存储在cache.data这个对象里面，不过网页关闭了就会清空，这也是没有办法的~
## 用法：
引入cache.js，也可以使用amd加载进来，然后调用cache.go()

如果需要存储则传入一个对象：
```javascript
cache.go({tsy:"sdfsdfsdfsdf"})
```

当然，你可以可以同时传入多个需要存储的东西，那么你可以这么使用：

```javascript
cache.go({
    tsy:"sdfsdfsdf",
    uid:128,
    un:"mooshroom",
})
```
然后他就能同时存储对象里面的所有属性。

在获取的时候，只需要传入一个字符串就可：
```javascript
cache.go("tsy")
```
然后就能返回tsy的值，如果没有找到会返回 undefined