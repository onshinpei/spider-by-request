# 一个node.js爬虫请求库

自己平常写爬虫时模拟浏览器发请求用到的一个方法，现在单独抽出来作为一个库。
使用`request`请求库发请求，使用Promise, 支持gbk编码。

如果headers里没有`user-agent`、`origin`，那么将使用默认`user-agent`, `origin`将根据`url`设定

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
  uri: 'https://www.baidu.com',
  method: 'GET',
  gbk: false,
})
// or
_request.get('https://www.baidu.com')
```
