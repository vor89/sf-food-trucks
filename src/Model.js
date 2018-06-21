import request from 'request';

/**
 * Gets the list of currently opened food trucks in SF.
 * @param {number} day - The current day of the week, with Sunday represented as a 0.
 * @param {string} time - The current time in the format HH:mm.
 * @param {number} offset - The offset of the list.
 * @param {number} limit - How many items to return.
 * @return {promise} - Returns a promise with the list of food trucks if successful.
 */
const getFoodTrucks = function (day, time, offset, limit) {
  const dayBefore = day === 0 ? 6 : day - 1;
  const baseURL = 'http://data.sfgov.org/resource/bbb8-hzi6.json';

  /**
   * Have to consider 2 cases for query:
   *   1. The food truck opens and closes the same day.
   *   2. The food truck opens but closes the next day.
   */
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

export default getFoodTrucks;
