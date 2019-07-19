const request = require('request');
const {getUserAgent, getType} = require('./src/tool');
const Iconv = require('iconv-lite');
const extend = require('extend');
const  { URL } = require('url');

/** 请求通用方法
 * request options
 * @param uri
 * @param options
 * @returns {Promise}
 */
function _request (uri, options) {

  if (getType(uri) === 'Undefined') {
    throw new Error('undefined is not a valid uri or options object.')
  }

  let params = initParams(uri, options);

  return new Promise((resolve, reject) => {
    let {headers} = params;
    if (!headers) {
      headers = {
        'User-Agent': getUserAgent()
      }
    }

    // headers origin
    if (!headers.Origin || !headers.origin) {
      let _url = new URL(params.uri || params.url);
      headers.Origin = _url.origin
    }

    if (headers['user-agent'] || headers['User-Agent']) {
      if (headers.hasOwnProperty('user-agent')) {
        headers['User-Agent'] = headers['user-agent'];
        delete headers['user-agent'];
      }
      headers['User-Agent'] = getUserAgent(headers['User-Agent']);
      params.headers = Object.assign({}, {
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      }, headers);


      params = Object.assign({}, {
        gzip: true,
        forever: true,
      }, params);
      // gbk编码转码
      if (params.gbk) {
        params.encoding = null
      }
      request(params, function(err, response, body) {
        if (err) {
          reject(err)
        } else {
          if (params.gbk) {
            response.body = Iconv.decode(body, 'gb2312').toString();
          }
          resolve(response)
        }
      })
    } else {
      reject('user-agent can not null')
    }
  })
}

/**
 * init params
 * @param uri
 * @param options
 */
function initParams (uri, options) {
  let params = {};
  if (options !== null && typeof options === 'object') {
    extend(params, options, {uri: uri})
  } else if (typeof uri === 'string') {
    extend(params, {uri: uri})
  } else {
    extend(params, uri)
  }
  return params
}

function verbFunc (verb) {
  let method = verb.toUpperCase()
  return function (uri, options) {
    let params = initParams(uri, options)
    params.method = method
    return _request(params)
  }
}

_request.get = verbFunc('get');
_request.head = verbFunc('head');
_request.options = verbFunc('options');
_request.post = verbFunc('post');
_request.put = verbFunc('put');
_request.patch = verbFunc('patch');
_request.del = verbFunc('delete');
_request['delete'] = verbFunc('delete');


module.exports = _request;