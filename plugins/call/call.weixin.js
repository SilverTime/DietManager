/**
 * Created by Administrator on 2015/4/19.
 */

//生成请求编号（用于iframe，form，callback）
var tpTimes = 1

var $ = {
    call: function (config) {
        //生成表单ID
        var tpID = "tp" + tpTimes;
        //变更tpTimes
        tpTimes++;

        //拼接URL
        var tsy = cache.go("tsy");
        var url;
        var tsyStr;
        if (tsy != 'null' && tsy != null && tsy != '') {
            tsyStr = '&tsy=' + tsy
        }
        else {
            tsyStr = ""
        }
        url = './index.php?i=' + config.i + tsyStr;


        if (config.tpid) {
            tpID = config.tpid
        }

        //构建请求
        createIframe(tpID, url, config.data)
        createCallBack(tpID, config.success)
        //发起请求,
        tp(tpID)
    }
}


function createIframe(tpID, url, data) {

//创建iframe
    var paper = document.createElement("div")
    paper.style.display = "none";
    paper.innerHTML = '<iframe name=' + tpID + ' style="display:none" id=' + tpID + '>' + '</iframe>';
    var pen = document.createElement("form")
    pen.setAttribute('id', tpID + "form");
    pen.setAttribute('action', url);
    pen.setAttribute('method', 'POST');
    pen.setAttribute('target', tpID);
    pen.target = tpID;
//创建input
    var input = document.createElement('input')
    input.setAttribute("name", "callback");
    input.setAttribute("value", "cb" + tpID);
    pen.appendChild(input)
    //根据数据创建INPUT
    for (var p in data) {
        var item = data[p]
        if (Array.isArray(item)) {//todo 这个方式判断的数组在ES5下有效，
//            console.log("is arr!"+p+':'+data[p])
            for (var i = 0; i < item.length; i++) {
                var input = document.createElement('input')
                input.setAttribute("name", p + "[]");
                input.setAttribute("value", item[i]);
                pen.appendChild(input)
            }

        } else {
//            console.log("is't arr!"+p+':'+data[p])
            var input = document.createElement('input')
            input.setAttribute("name", p);
            input.setAttribute("value", item);
            pen.appendChild(input)
        }
    }
    console.log(pen)
//插入DOM
    paper.appendChild(pen)
    document.body.appendChild(paper)
}
function createCallBack(tpID, fn) {
//创建callback(执行完毕之后销毁DOM以及函数)
    Object.defineProperty(window, "cb" + tpID, {value: fn})
}
function tp(tpID) {
    document.getElementById(tpID + "form").submit()
}


