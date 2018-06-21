const clear = function clear() {
  console.clear();
}

const render = function render(foodTrucks) {
  clear();
  console.log(foodTrucksToTable(foodTrucks));
  console.log('Press q to quit, or any other key to continue');
}

const foodTrucksToTable = function foodTrucksToTable(foodTrucks) {
  const nameHeader = 'NAME';
  const locationHeader = 'ADDRESS';
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

const renderError = function renderError(err) {
  clear();
  console.error(err);
}

export default { clear, render, renderError };
