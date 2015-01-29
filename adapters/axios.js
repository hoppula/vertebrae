var extend = require('../utils').extend;
require('native-promise-only');
var axios = require('axios');

var Axios = function(settings) {
  return new Promise(function(resolve, reject) {
    var options = {
      method: settings.type.toLowerCase(),
      url: settings.url,
      responseType: "text",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    };
    if (settings.headers) {
      options.headers = extend(options.headers, settings.headers);
    }
    if (settings.processData) {
      options.params = settings.data;
    } else {
      options.data = settings.data;
    }
    return axios(options).then(function(response) {
      settings.success(response.data);
      return resolve(response);
    }).catch(function(response) {
      var error = response.data || response;
      settings.error(error);
      return reject(response);
    });
  });
};

module.exports = Axios;
