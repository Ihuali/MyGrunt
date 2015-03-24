
//LiuJianHua    
var fs = require('fs');
module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //文件压缩
        uglify: {
            options: {
                banner: '/*! <%= pkg.file %> fancy <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            MD5JS: {
                options:{
                    // report: "min",//输出压缩率
                    mangle: false, //不混淆变量名
                    preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files: [{
                    expand: true,
                    cwd:'src',//js目录下
                    src: 'js/*',//所有js文件
                    dest: 'dest/js/',//输出到此目录下
                    rename: function (dest, src) {
                        // 或者改为同步的API读取
                        //由于该方法属于fs模块，使用前需要引入fs模块（var fs= require(“fs”) ）
                        //fs.readFileSync(filename, [encoding]) filename为文件路径  encoding编码为可选
                        //JOSN.parse 用于从一个字符串中解析出json对象
                        //stringObject.replace(regexp/substr,replacement)
                        var refer = JSON.parse(fs.readFileSync('./config/cachebusters_js.json', 'utf-8'));
                        console.log(src.replace('js/', ''))
                        for (var i in refer) {
                            if (src.replace('js/', '') == i) {
                                return dest + i.replace('.js', '_') + refer[i] + '.js';
                            }
                        }
                    }
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd:'src',//src目录下
                    src: ['css/*.css'],
                    dest: 'dest/css/',
                    rename: function (dest, src) {
                        // 或者改为同步的API读取
                        var refer = JSON.parse(fs.readFileSync('./config/cachebusters_css.json', 'utf-8'));
                        for (var i in refer) {
                            if (src.replace('css/', '') == i) {
                                return dest + i.replace('.css', '_') + refer[i] + '.css';
                            }
                        }
                    }
                }]
            }
        },
        //缓存克星，计算文件MD5值
        //https://github.com/felthy/grunt-cachebuster
        cachebuster: {
            JSC: {
                options: {
                    banner: '',//'/*! <%= pkg.file %> fancy <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                    format: 'json',
                    basedir: 'src/js/',
                    /*  formatter: function(hashes) {
                     var output = '"Filename","Hash"\n';
                     for (var filename in hashes) {
                     //output += '"' + filename.replace('.js', '_') + hashes[filename] + '.js' + '"\n';
                     output += '"' + filename + '","' + hashes[filename] + '"\n';
                     }
                     return output;
                     } */
                },
                src: ['src/js/*'],
                dest: 'config/cachebusters_js.json'
            },
            CSSC: {
                options: {
                    banner: '',//'/*! <%= pkg.file %> fancy <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                    format: 'json',
                    basedir: 'src/css/',
                    /*  formatter: function(hashes) {
                     var output = '"Filename","Hash"\n';
                     for (var filename in hashes) {
                     //output += '"' + filename.replace('.js', '_') + hashes[filename] + '.js' + '"\n';
                     output += '"' + filename + '","' + hashes[filename] + '"\n';
                     }
                     return output;
                     } */
                },
                src: ['src/css/*'],
                dest: 'config/cachebusters_css.json'
            }
        }
    });
    //载入任务
    grunt.loadNpmTasks('grunt-cachebuster');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //注册任务
    grunt.registerTask('default', 'grunt打包', function() {
        grunt.log.writeln('grunt打包开始，请执行config命令');
    });
    grunt.registerTask('config', ['cachebuster:JSC','cachebuster:CSSC']);

    grunt.registerTask('log', '生成配置文件', function() {
        grunt.log.writeln('利用cachebuster生成js，css等md5值配置文件，请执行MD5JS和MD5CSS命令！');
    });
    grunt.registerTask('MD5JS', ['uglify:MD5JS']);
    grunt.registerTask('MD5CSS', ['cssmin']);


}