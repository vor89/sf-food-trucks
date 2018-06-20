const request = require('request');

const getFoodTrucks = function (time, offset, limit) {
  const url = `http://data.sfgov.org/resource/bbb8-hzi6.json?$where=start24 <= "${time}" and "${time}" < end24 &$offset= ${offset} &$limit= ${limit}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

// TODO: use babel to use import/export
exports.default = getFoodTrucks;