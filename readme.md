# 一个爬虫请求库

自己平常写爬虫时用到的一个方法，现在单独抽出来作为一个库。
使用`request`请求库发请求，支持gbk编码

## 安装
* npm
``` shell
npm install spider-by-request
```
* yarn
``` shell
yarn add spider-by-request
```

## 使用
options 参数是 `request`的一个扩展，添加参数gbk
```javascript
const _request = require('spider-by-request');

_request({
  url: 'http://www.baidu.com',
  method: 'GET',
  gbk: false,
})
```
