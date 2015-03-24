/**
 *      Project: zept
 *     FileName: reName.js
 *         Desc: 批量修改文件名
 *       Author: guofan
 *        Email: hiafanti@gmail.com
 *      Version: 1.0.0
 *         Date: 14:54
 */
var fs = require('node-fs-extra');
/*
 var config = './config/cachebusters_js.json';
 var fileDirectory ='./rename/js/';
 var prefix = '_';
 var fileType = '.js';
 */
exports.reName = function(config, src, fileDirectory, prefix, fileType) {
    //先移除fileDirectory，创建fileDirectory目录
    try{
        fs.removeSync(fileDirectory);
        console.log(fileDirectory + ' dir has now been removed!');
    }catch(err) {
        console.log(fileDirectory + ' dir has not been existed!');
    }

    try{
        fs.mkdirsSync(fileDirectory);
        console.log(fileDirectory + ' dir has now been created!');
        console.log('++++++');
    }catch(err) {
        console.log(fileDirectory + ' dir has been existed!');
        console.log('++++++');
    }
    //备份需要md5的文件
    try{
        fs.copySync(src, fileDirectory);
        console.log(src + ' is copyed to ' + fileDirectory + ' success!');
        console.log('++++++');
    }catch(err) {
        console.log(src + ' is copyed to ' + fileDirectory + ' fail!');
        console.log('++++++');
    }

    var refer = fs.readJsonSync(config);
    if (fs.existsSync(fileDirectory)) {
        var files = fs.readdirSync(fileDirectory);
        var newFileName;
        files.forEach(function (file) {
            var filePath = fileDirectory + "/" + file;
            var typeReg = new RegExp(fileType + '$');
            if (typeReg.test(file)) {
                for(var i in refer) {
                    if(i == file) {
                        newFileName = file.replace(fileType, prefix + refer[i] + fileType);
                    }
                }
                var newFilePath = fileDirectory + newFileName;
                fs.rename(filePath, newFilePath, function (err) {
                    if (err) throw err;
                    console.log(file + ' has been converted!' + '\n' + '++++++');
                });
            }
        });

    } else {
        console.log(fileDirectory + "  Not Found!");
    }
};
