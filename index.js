const request = require('request');
const {getUserAgent} = require('./src/tool');
const Iconv = require('iconv-lite');

/** 请求通用方法
 * request options
 * @param options
 * @returns {Promise}
 */
module.exports = function (options) {
  return new Promise((resolve, reject) => {
    if (!options.headers) {
      options.headers = {}
    }
    if (options.headers['user-agent'] || options.headers['User-Agent']) {
      if (options.headers.hasOwnProperty('user-agent')) {
        options.headers['User-Agent'] = options.headers['user-agent'];
        delete options.headers['user-agent'];
      }
      options.headers['User-Agent'] = getUserAgent(options.headers['User-Agent']);
      options.headers = Object.assign({}, {
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      }, options.headers);

      options = Object.assign({}, {
        gzip: true,
        forever: true,
      }, options);
      // gbk编码转码
      if (options.gbk) {
        options.encoding = null
      }
      request(options, function(err, response, body) {
        if (err) {
          reject(err)
        } else {
          if (options.gbk) {
            response.body = Iconv.decode(body, 'gb2312').toString();
          }
          resolve(response)
        }
      })
    } else {
      reject('user-agent can not null')
    }
  })
};