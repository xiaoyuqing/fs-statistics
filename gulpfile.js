var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var uglifyjs = require('gulp-uglify');
var gulpUtil = require('gulp-util');
var inject = require('gulp-inject-string');
var runSequence = require('run-sequence');
var fs = require('fs')
var del = require('del');
var argv = require('yargs').argv;


var target = argv.target;

var statsObj={};

var getAssetType = function(str, type) {

  return new RegExp('^(?!libs\/).*\.'+type+'$').test(str)  
  
}


//读取webpack 生成的资源文件。
fs.readFile('dist/stats.json', 'utf8', function (error, data) {

  console.log('======================start read stats file==========================');

  if (error) {
    console.error("no stats file");
    return;
  }

  var dataObj = JSON.parse(data);
  var assetsArr = dataObj.assetsByChunkName[target];

  
  var jsAssetChunkStr='';
  var cssAssetChunkStr='';

  for (var j = 0, len = assetsArr.length; j < len; j++) {
    var assetsItem = assetsArr[j];

    if(getAssetType(assetsItem, 'js')){

      jsAssetChunkStr =`'${assetsItem}'`;
    }

    if(getAssetType(assetsItem, 'css')){

      cssAssetChunkStr = `'${assetsItem}'`;
    }

  }

  statsObj.jsAssert = jsAssetChunkStr;

  statsObj.cssAssert = cssAssetChunkStr;
  

  
  console.log('======================end read stats file==========================');
});


gulp.task('copyFile', function(){
  return gulp.src(['src/public/**/*.*','!src/public/data/**/*.*','!src/public/*.html'])
        .pipe(gulp.dest('dist'))
})


gulp.task('uglifyCss', function(){
    return gulp.src('dist/*.css')
            .pipe(uglifycss())
            .pipe(gulp.dest('dist'));
});


gulp.task('uglifyJs', function(){
    return gulp.src(['dist/**/*.js'])
           .pipe(uglifyjs().on('error', gulpUtil.log))
           .pipe(gulp.dest('dist'));
});




gulp.task('injectResources',function() {

        gulp.src('dist/' + target + '.html')
          .pipe(inject.after('<head>', `
            <script type="text/javascript">
              FsResources = {
                css: ${statsObj.cssAssert},
                js: ${statsObj.jsAssert} 
              }
            </script>  
          `))
          .pipe(gulp.dest('dist'));
});


//删除不相关的.html文件以及json的mock文件。
gulp.task('afterClean',['injectResources'], function(){
      del([
        'dist/*.html', 
        '!dist/' + target + '.html',
         'dist/data/*', 
         '!dist/data/' + target
         ]).then(() => {
          console.log('======================clean task done==========================');
       });
})


gulp.task('build', ['copyFile'],function(){
  runSequence([ 'uglifyCss', 'uglifyJs', 'afterClean']);
});