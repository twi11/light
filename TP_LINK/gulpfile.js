
// EMCA6 const 声明"常量" (这个变量一旦被声明，就没有办法被修改)
const gulp = require("gulp");

//拷贝html文件
gulp.task("copy-html", function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

//拷贝图片
gulp.task("images", function(){
	return gulp.src("images/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

//数据
gulp.task("data", function(){
	return gulp.src("data/*.json")
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})

//js文件
gulp.task("scripts", function(){
	return gulp.src("js/**.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})
const scss = require("gulp-sass-china");
//建立工程
gulp.task("scss",function(){
	return gulp.src("scss/*.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

gulp.task("watch", function(){

	gulp.watch("*.html", ['copy-html']);
	gulp.watch("images/**/*", ['images']);
	gulp.watch("*.json", ['data']);
	gulp.watch("js/*.js", ['scripts']);
	gulp.watch("scss/*.scss", ['scss']);

})
gulp.task("build", ['copy-html', 'images', 'scripts', 'data', "scss"], function(){
	console.log('工程建立成功');
})
const connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root: 'dist', 
		port: 9999,
		livereload: true //设置实时刷新
	})
})

gulp.task("default", ['watch', 'server']);