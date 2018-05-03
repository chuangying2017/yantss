var gulp = require('gulp')
var qn = require('gulp-qn')
var replace = require('gulp-replace')

if (process.argv[3]) {
  var version = process.argv[3].replace('--version=', '')
  if (version.length <= 0) {
    console.log('请输入版本号: gulp build --version=v4')
    process.exit(0);
  }
} else {
  console.log('请输入版本号: gulp build --version=v4')
  process.exit(0);
}

var path = 'build/staff/test/' + version + '/'
var host = 'http://o7tep4eu1.bkt.clouddn.com/' + path

var config = {
  accessKey: 'Ci8ge9jWi-lT_EYoGmuTt0b5xu3siJ5IlbOUDGSp',
  secretKey: 'hNd7vAyi2iz2S5MRM4TAUNU72SbbMEiOi2_X4klF',
  bucket: 'yantang',
  domain: 'http://o7tep4eu1.bkt.clouddn.com'
}

gulp.task('css', function () {
  return gulp.src(['./dist/static/css/*.css'])
    .pipe(qn({
      qiniu: config,
      prefix: path + 'css/'
    }));
});

gulp.task('js', function () {
  return gulp.src(['./dist/static/js/*.js'])
    .pipe(qn({
      qiniu: config,
      prefix: path + 'js/'
    }));
});

gulp.task('build', ['js', 'css'], function () {
  gulp.src('./dist/index.html')
    .pipe(replace('/static/', host))
    .pipe(gulp.dest('./dist/build/'));
})
