let _request = require('../index');

spider();
async function spider() {
  const response = await _request.get('https://www.baidu.com');

  console.log(response.body)
}