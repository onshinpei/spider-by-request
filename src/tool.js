/**
 * spider should have a default user-agent
 * @param _userAgent
 * @returns {*}
 */
function getUserAgent (_userAgent='') {
  let defaultAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';
  let userAgent = _userAgent.toLowerCase();
  if (userAgent && (userAgent.indexOf('webkit') > -1 || userAgent.indexOf('mozilla') > -1 || userAgent.indexOf('opera') > -1 || userAgent.indexOf('ucweb') > -1)) {
    return _userAgent
  } else {
    return defaultAgent
  }
}

/**
 * get argument type
 * @param obj
 * @returns {string}
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

module.exports = {
  getUserAgent,
  getType
};