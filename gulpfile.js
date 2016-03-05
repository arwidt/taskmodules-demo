process.env.DISABLE_NOTIFIER = true;

var gulp            = require('gulp');
var async           = require('async');
var taskmodules     = require('taskmodules');

gulp.task('default', function(done) {

    async.series([
        taskmodules.utils.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
        taskmodules.js.browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false),
        taskmodules.style.sass.create('src/scss/main.scss', 'main.scss', 'dist/css/', false, false)
    ], function() {
        console.log("SERIES COMPLETE");

        async.parallel([
            taskmodules.utils.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
            taskmodules.js.browserify.create('src/js/main.js', 'main.min.js', 'dist/js/', false, true),
            taskmodules.style.sass.create('src/scss/main.scss', 'main.min.css', 'dist/css/', false, true)
        ], function() {
            console.log("PARALLEL COMPLETE");
            done();
        });

    });

});
