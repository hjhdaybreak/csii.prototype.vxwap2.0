'use strict';
/************************************************配置************************************************/
// 源码、备份、预生产和生产环境路径
var SOURCE_PATH = "./static/";
var BACKUP_PATH = "./build/backup/";
var PRE_PRODUCT_PATH = "./build/preProduct/";
var PRODUCT_PATH = "./build/product/";

// 读取要压缩的js和css文件列表
var jsFiles = require(SOURCE_PATH + 'lib/config.preload.js').jsFiles;
var cssFiles = require(SOURCE_PATH + "lib/config.preload.js").cssFiles;

//懒加载文件
var lazyFilesModule = require(SOURCE_PATH + 'lib/config.lazyload.js').lazyLoad_Modules;
var lazyFilesNoModule = require(SOURCE_PATH + 'lib/config.lazyload.js').lazyLoad_NoModules;

// 合并和压缩后的js和css文件目标路径
var jsTarget = {
    preProduct: PRE_PRODUCT_PATH + 'lib/all.js',
    product: PRODUCT_PATH + 'lib/min/all.min.js',
};
var cssTarget = {
    preProduct: PRE_PRODUCT_PATH + 'css/all.css',
    product: PRODUCT_PATH + 'css/all.min.css',
};

/************************************************结束************************************************/
// 组装压缩用到的js和css的源码路径
function wrap(files) {
  var gruntFiles = [];
  files.forEach(function(file) {
    gruntFiles.push(BACKUP_PATH + "last/" + file);
  });
  return gruntFiles;
}

function wrapLazy(files, hasMod) {
    var gruntFiles = [];
    if (hasMod) {
        for (var row in files) {
            for (var i in row["files"]) {
                gruntFiles.push(row["files"][i]);
            }
        }
    } else {
        for (var row in files) {
            for (var i in files[row]) {
                gruntFiles.push(files[row][i]);
            }
        } 
    }
    return gruntFiles;
}

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'compile-handlebars': {
            indexHtml: {
                files: [{
                    src: BACKUP_PATH + 'last/index.handlebars',
                    dest: [PRE_PRODUCT_PATH + 'index.html', PRODUCT_PATH + 'index.html']
                }],
                templateData: [{
                    productMode: false
                }, {
                    productMode: true
                }]
            }
        },
        copy: {
            // 从static备份到backup(不操作开发代码)
            toBackup: {
                files: [{
                    expand: true,
                    cwd: SOURCE_PATH,
                    flatten: false,
                    src: ["**"],
                    dest: BACKUP_PATH + 'last/'
                }, {
                    expand: true,
                    cwd: SOURCE_PATH,
                    flatten: false,
                    src: ["**"],
                    dest: BACKUP_PATH + '<%= grunt.template.today("yyyy-mm-dd_HH-MM") %>/'
                }]
            },
            toPreProduct: {
                files: [{
                    expand: true,
                    cwd: SOURCE_PATH,
                    flatten: false,
                    src: ['<%= buildFilesSrc %>','<%= buildFilesExtraSrc %>'],
                    dest: PRE_PRODUCT_PATH
                }]
            },
            toProduct: {
                files: [{
                    expand: true,
                    cwd: SOURCE_PATH,
                    flatten: false,
                    src:['<%= buildFilesSrc %>','<%= buildFilesExtraSrc %>'] ,
                    dest: PRODUCT_PATH
                }]
            }
        },
        clean: {
            // 拷贝完开发代码后清除预生产和生产环境中的无用index、js和css
            preBuild: {
                files: [{
                    expand: true,
                    cwd: PRE_PRODUCT_PATH,
                    src: ['index.html', 'index.handlebars', 'index.browser.html']
                }, {
                    expand: true,
                    cwd: PRODUCT_PATH,
                    src: ['index.html', 'index.handlebars', 'index.browser.html']
                }, {
                    expand: true,
                    cwd: PRE_PRODUCT_PATH + "css/",
                    src: ['*.css']
                }, {
                    expand: true,
                    cwd: PRODUCT_PATH + "css/",
                    src: ['*.css']
                }, {
                    expand: true,
                    cwd: PRE_PRODUCT_PATH + "lib/",
                    src: ["*.js", "min/vx2-sanitize.min.js", "min/vx2-storage.min.js", "min/vx2-ui.router.min.js", "min/vx2-vviewport.vpage.min.js", "modules", "plugins", "public_plugins"],
                }, {
                    expand: true,
                    cwd: PRODUCT_PATH + "lib/",
                    src: ["*.js", "min/vx2-sanitize.min.js", "min/vx2-storage.min.js", "min/vx2-ui.router.min.js", "min/vx2-vviewport.vpage.min.js", "modules", "plugins", "public_plugins"],
                }]
            },
            // 清空已构建工程
            built: {
                files: [{
                    expand: true,
                    src: ['./build']
                }]
            },
            // 清空所有备份
            backup: {
                files: [{
                    expand: true,
                    src: ['./backup']
                }]
            },
            // 清空最新的备份
            lastBackup: {
                files: [{
                    expand: true,
                    cwd: BACKUP_PATH,
                    src: ['last']
                }]
            }
        },
        // 从backup/last中合并all.js和all.css到preProduct
        concat: {
            allJs: {
                options: {
                    separator: ";\n/*----------------------------------------separator----------------------------------------*/\n",
                    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> ' + '<%= pkg.author.name %>;\n' + '* Licensed : <%= pkg.license  %> \n*/\n',
                },
                src: wrap(jsFiles),
                dest: jsTarget.preProduct
            },
            allCss: {
                options: {
                    separator: "\n/*----------------------------------------separator----------------------------------------*/\n",
                    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> ' + '<%= pkg.author.name %>;\n' + '* Licensed : <%= pkg.license  %> \n*/\n',
                },
                src: wrap(cssFiles),
                dest: cssTarget.preProduct
            }
        },
        // 将preProduct的all.js压缩成all.min.js，发送到product
        uglify: {
            options: {
                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %>' + ' <%= pkg.author.name %>;\n' + '* Licensed : <%= pkg.license  %> \n*/\n'
            },
            allMinJs: {
                src: jsTarget.preProduct,
                dest: jsTarget.product
            }
        },
        // 将preProduct的all.css压缩成all.min.css，发送到product
        cssmin: {
            options: {
                // * for keeping all (default), 1 for keeping first one only, 0 for removing all
                keepSpecialComments: 0,
                // set to false to disable advanced optimizations - selector & property merging, reduction, etc.
                advanced: false,
                // set to false to disable aggressive merging of properties.
                aggressiveMerging: false,
                // whether to merge @media at-rules (default is true)
                mediaMerging: false,
                // set to false to skip shorthand compacting (default is true unless sourceMap is set when it's false)
                shorthandCompacting: false,
                // rounding precision; defaults to 2; -1 disables rounding
                roundingPrecision: -1
            },
            allMinCss: {
                /**
                 * files: {
                 *   './dirOut/output.min.css': './dirIn/input.css'
                 * }
                 */
                files: (function() {
                    // 返回动态key的js对象
                    var str = '({"' + cssTarget.product + '":"' + cssTarget.preProduct + '"})';
                    var obj = eval(str);
                    return obj;
                })()
            }
        },
        // jshint检测
        jshint: {
            // grunt-contrib-jshint的详细参数介绍，请参考：https://github.com/gruntjs/grunt-contrib-jshint
            // 配置jshint的校验规则，参数详细参考DOC目录下面的《jshint参数详解.pdf》
            options: {
                '-W064': true, // 忽略错误代码为 W064 的错误
                "strict": true,
                // "curly": true,
                "eqnull": true,
                // "eqeqeq": true,
                "undef": true,
                "globals": {
                    "$": true,
                    "window": true,
                    "angular": true,
                    "vx": true,
                    "document": true,
                    "jQuery": true,
                    "console": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                // reporterOutput : 'jshint/report.txt'//将jshint校验的结果输出到文件
            },
            beforeconcat: wrap(jsFiles), // 合并之前检测
            afterconcat: jsTarget.preProduct // 合并之后检测
        },
        lazyModFiles: wrapLazy(lazyFilesModule, true),//有模块懒加载文件
        lazyNoModFiles: wrapLazy(lazyFilesNoModule, false),//无模块懒加载文件,
        buildFilesSrc:['<%= lazyModFiles %>', '<%= lazyNoModFiles %>', 'css/fonts/**', 'css/img/**', 'htmls/**', 'lib/min/jquery-1.11.1.min.js', 'lib/min/vx2.min.js','images/**'],//预上线 以及上线版本拷贝源文件路径
        buildFilesExtraSrc:['fonts/**']//非必须。根据需要配置
    });
    // 加载grunt任务依赖模块
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['clean:lastBackup', 'clean:built', 'copy:toBackup', 'copy:toPreProduct', 'copy:toProduct', 'compile-handlebars', 'concat', 'uglify', 'cssmin']);
    // 清空备份和已构建工程
    grunt.registerTask('cleanAll', ['clean:backup', 'clean:built']);
    //加载自定义任务
    //grunt.loadTasks('tasks');

    /******************** 配置分包目录的名称****************************************************/
    var filesArr = ['BankInnerTransfer', 'DetailQry'];
    var _files = [],
        i;
    for (i = 0; i < filesArr.length; i++) {
        _files.push({
            expand: true,
            cwd: PRODUCT_PATH,
            flatten: false,
            src: ["index.html", "lib/**", "images/**", "css/**", "htmls/" + filesArr[i] + "/**"],
            dest: "./build/banklist/" + filesArr[i]
        });
    }

    grunt.registerTask('split_package', 'bank product split ', function() {
        grunt.config('copy.split', {
            files: _files
        });
        grunt.config('clean.split', {
            files: [{
                expand: true,
                cwd: "./build/banklist",
                src: ['**']
            }]
        });

        grunt.task.run(['clean:split', 'copy:split']);
    });

    grunt.registerTask('package', 'build package project', function() {

        grunt.task.run(['default', 'split_package']);
    });
    /******************** 分包配置介绍****************************************************/
};
