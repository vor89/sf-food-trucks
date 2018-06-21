const request = require('request');

const getFoodTrucks = function (day, time, offset, limit) {
  const dayBefore = day === 0 ? 6 : day - 1;
  const baseURL = 'http://data.sfgov.org/resource/bbb8-hzi6.json';
  const query = `$select= applicant, location
    &$where= (dayorder = ${day} and start24 <= "${time}" and "${time}" < end24)
      or (end24 < start24 and dayorder = ${day} and start24 <= "${time}")
      or (end24 < start24 and dayorder = ${dayBefore} and "${time}" < end24)
    &$order= applicant, location
    &$offset= ${offset}
    &$limit= ${limit}`;
  const fullURL = `${baseURL}?${query}`;
  return new Promise((resolve, reject) => {
    request(fullURL, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response && response.statusCode !== 200) {
        reject(body);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

// TODO: use babel to use import/export
exports.getFoodTrucks = getFoodTrucks;
