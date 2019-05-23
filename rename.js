var fs = require('fs');
const readline = require('readline');

// 目录
var PATH = './';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let rep1, rep2;

rl.question('请输入replace的第一个参数,正则模式符请用逗号隔开(first param of replace, regx pattern after a comma):\n', (answer1) => {
  // TODO：将答案记录在数据库中。
  let args = answer1.split(',');
  rep1 = new RegExp(args[0], args[1]);

  rl.question('请输入replace的第二个参数(second param of replace):\n', (answer2) => {
    // TODO：将答案记录在数据库中。
    rep2 = answer2;

    rl.close();

    // 运行
    walk(PATH, function (path, fileName) {
      // 源文件路径
      var oldPath = path + fileName;
      // 新路径
      var newPath = path + fileName.replace(rep1, rep2);

      rename(oldPath, newPath);

      console.log(oldPath, ' ----> ', newPath);
    });
  });
});

//  遍历目录得到文件信息
function walk (path, callback) {
  var files = fs.readdirSync(path);

  files.forEach(function (file) {
    if (fs.statSync(path + '/' + file).isFile()) {
      callback(path, file);
    }
  });
}

// 修改文件名称
function rename (oldPath, newPath) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err;
    }
  });
}