/**/

//获取插件
var gulp=require('gulp');
var rename=require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
//定义任务

//根据nav.json自动生成模块
gulp.task('default',function()
{
	var json=require('./nav.json')
	var history={
		nav:[],
		builded:[],
	}
	//批量构建文件的方法
	function buildPackage(i){
		var data={
			en: i.en,
			name:i.name,
			url:"./package/"+ i.en+'/',
			date:new Date().toDateString()
		}

		history.nav.push(i)
		history.builded.push(i)

		if(!isBuild(i)){
			gulp.src(['./tmp/package/package.html','./tmp/package/package.css','./tmp/package/package.js'])
				.pipe(handlebars(data))
				.pipe(rename({basename:data.en}))
				.pipe(gulp.dest(data.url))
			console.log('成功构建模块:'+ i.en)
		}
	}

	//判断是否已经构建
	function isBuild(i){

		var res=false

		if(typeof(json.builded)=="object"){
			for(var o=0;o<json.builded.length;o++){
				if(i.en==json.builded[o].en){
					console.log("模块已构建或命名冲突，已跳过该模块:"+i.en)
					res=true
					break
				}
			}
		}else{
			return res=false
		}

		return res
	}

	//遍历nav执行任务
	for(var i=0;i<json.nav.length;i++){
		buildPackage(json.nav[i])
	}
	//console.log(JSON.stringify(history.nav))
	//console.log(JSON.stringify(history.builded))
	//记录建立历史
	gulp.src(['./tmp/package/nav.json'])
		.pipe(handlebars({},{
			partials:{
				nav:JSON.stringify(history.nav),
				builded:JSON.stringify(history.builded)
			}
		}))
		.pipe(gulp.dest('./'))
})


//根据obj.json自动生成对象接口方法
gulp.task('obj', function () {

	var objs=require('./obj.json')
	var history={
		obj:[],
		builded:[],
	}
	//首字母大写转换
	function firstUpperCase(str){
		return str.substring(0,1).toUpperCase()+str.substring(1);
	}

	//转换“aaa_bbb_ccc”为“AaaBbbCcc”
	function codeRebuild(str){
		var codeArr= str.split("_")

		for(var o=0;o<codeArr.length;o++){
			codeArr[o]=firstUpperCase(codeArr[o])
		}

		return codeArr.join("")
	}

	//构建方法
	function buildObj(i){
		//转换“aaa_bbb_ccc”为“AaaBbbCcc”

		i.Code=codeRebuild(i.Code)

		history.obj.push(i)
		history.builded.push(i)

		if(!isBuild(i)){
			console.log(i.Code)
			gulp.src(['./tmp/obj/obj.js'])
				.pipe(handlebars(i))
				//.pipe(rename({basename: i.Code}))
				.pipe(rename({
					dirname: "",
					basename: i.Code,
					prefix: "",
					suffix: "",
					extname: ".js"
				}))
				.pipe(gulp.dest("./obj/"))
			console.log('成功构建对象:'+ i.Code+"("+i.Name+")")

		}
	}

	//检测是否构建的方法
	function isBuild(i){
		var res=false
		if(typeof(objs.builded)=="object"){
			for(var o=0;o<objs.builded.length;o++){
				if(i.Code==objs.builded[o].Code){
					console.log("模块已构建或命名冲突，已跳过该模块:"+i.Code)
					res=true
					break
				}
			}
		}

		return res
	}

	//执行
	//console.log(objs)
	for(var i=0;i<objs.obj.length;i++){

		buildObj(objs.obj[i])
	}

	//记录历史
	gulp.src(['./tmp/obj/obj.json'])
		.pipe(handlebars({},{
			partials:{
				obj:JSON.stringify(history.obj),
				builded:JSON.stringify(history.builded)
			}
		}))
		.pipe(gulp.dest('./'))

})

//生成路由文件
gulp.task('router', function () {

})

//新建ui组建
gulp.task('lib', function () {
	var lib=require('./package.json').newLib
	if(lib==undefined){
		console.log('未定义字段：newLib')
		return false
	}
	if(lib==''){
		console.log('未定义组件名称：newLib为空')
		return false
	}
	var data={
		en:lib,
		date:new Date().toDateString(),
		url:'./lib/'+lib+'/',
		lowerEn:lib.toLowerCase()
	}

	gulp.src(['./tmp/lib/lib.html','./tmp/lib/lib.css','./tmp/lib/lib.js'])
		.pipe(handlebars(data))
		.pipe(rename({basename:data.en}))
		.pipe(gulp.dest(data.url))
	console.log('成功构建组件:'+ lib+",请手动清除 newLib")

})



