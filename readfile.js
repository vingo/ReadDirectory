var fs = require('fs');
var dir = 'C:\\Users\\maochaobo_yf\\test' // 指定搜索目录
var colors = require('colors');



function getAllList() {
    var list = [];
    readFile(dir, list);
    return list;
}

function checkDir(path) {

    var f = fs.lstatSync(path);
    var data = {
        isdir: f.isDirectory(),
        size: f.size
    }
    return data;
}

function readFile(path, list) {

    files = fs.readdirSync(path); //获取所有文件夹

    files.forEach(loop);

    function loop(file) {
        var temppath = path + '\\' + file;
        var status = checkDir(temppath);
        if (status.isdir) {
            readFile(temppath, list);
        } else {
            list.push({
                size: status.size,
                name: file,
                folder: path
            });

        }
    }
}

function readFolder(path) {
    var folder = fs.readdirSync(path),
        dirList,
        temp = [];
    var newf = folder.forEach(function(val) {
        if (fs.statSync(dir + "/" + val).isDirectory()) {
            temp.push(val);
        }
    });
    dirList = temp;
    return dirList;
}

function sortArray(a, b) {
    return b.size - a.size;
};

/*
 * 获取最大的5个目录
 *@param {Array} l 所有的文件
 *@param {Array} dirList 所有的目录
 */
function getFolder(l) {

    var dirSize = {},
        temp = '';
    for (var i = 0; i < l.length; i++) {
        for (var s = 0; s < dirList.length; s++) {
            temp = dir + '\\' + dirList[s];
            if (l[i].folder.indexOf(temp) != -1) {
                if (!dirSize.hasOwnProperty(temp)) {
                    dirSize[temp] = l[i].size;
                } else {
                    dirSize[temp] += l[i].size;
                }
            }
        };
    };
    var arr = [],
        keys = Object.keys(dirSize);
    for (var i in keys) {
        arr.push({
            size: dirSize[keys[i]],
            folder: keys[i]
        });
    }

    var folder = arr.sort(sortArray);
    folder = folder.slice(0, 5);
    return folder;
}
/*
 * 获取最大的5个文件
 *@param {Array} l 所有的文件
 */
function getFiles(l) {
    var arr = l.sort(sortArray);
    //获取最大的5个文件
    arr = arr.slice(0, 5);
    return arr;
}



var dirList = readFolder(dir); //获取所有的文件夹
var l = getAllList(); //获取所有的文件



console.log('---folder---'.red, getFolder(l, dirList))
console.log('---files-----'.red, getFiles(l))