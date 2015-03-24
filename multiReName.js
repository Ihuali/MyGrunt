/**
 *      Project: zept
 *     FileName: multi.js
 *         Desc: 批量修改文件名
 *       Author: guofan
 *        Email: hiafanti@gmail.com
 *      Version: 1.0.0
 *         Date: 14:54
 */
"use strict";
var name = require('./reName');
var configJs = './config/cachebusters_js.json';
var configCss = './config/cachebusters_css.json';
var jsDirectory = './rename/js/';
var cssDirectory = './rename/css/';
var srcJs = './src/js';
var srcCss = './src/css';
var prefix = '_';
var jsType = '.js';
var cssType = '.css';
name.reName(configJs, srcJs, jsDirectory, prefix, jsType);
name.reName(configCss, srcCss, cssDirectory, prefix, cssType);