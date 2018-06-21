/**
 * Clears the console.
 */
const clear = function clear() {
  console.clear();
}

/**
 * Prints the list of food trucks to console.
 * @param {array} foodTrucks - The list of food trucks.
 */
const render = function render(foodTrucks) {
  clear();
  console.log(foodTrucksToTable(foodTrucks));
  console.log('Press q to quit, or any other key to continue');
}

/**
 * Converts the list of food trucks into a string formatted as a table.
 * @param {array} foodTrucks - The list of food trucks.
 * @return {string} - The list of food trucks formatted as a table.
 */
const foodTrucksToTable = function foodTrucksToTable(foodTrucks) {
  const nameHeader = 'NAME';
  const locationHeader = 'ADDRESS';

  // Need to figure out how wide the left column should be.
  const longestNameLength = Math.max(...foodTrucks.map(({ applicant }) => applicant.length), 
    nameHeader.length);
  const tab = 4;
  const leftColWidth = longestNameLength + tab;

  const table = [];
  table.push(nameHeader.padEnd(leftColWidth), locationHeader, '\n');
  for (let { applicant, location } of foodTrucks) {
    table.push(applicant.padEnd(leftColWidth), location, '\n');
  }
  return table.join('');
}

/**
 * Prints an error message to error console.
 * @param {string} err - The error to print.
 */
const renderError = function renderError(err) {
  clear();
  console.error(err);
}

export default { clear, render, renderError };
