const clear = '\033c';

const render = function render(foodTrucks) {
  console.log(clear);

  const nameHeader = 'NAME';
  const locationHeader = 'ADDRESS';
  const longestNameLength = Math.max(...foodTrucks.map(({ applicant }) => applicant.length), 
    nameHeader.length);
  const tab = 4;
  const padding = longestNameLength + tab;

  console.log(nameHeader.padEnd(padding), locationHeader);
  for (let { applicant, location } of foodTrucks) {
    console.log(applicant.padEnd(padding), location);
  }
  console.log('\nPress q to quit, or any other key to continue');
}

const renderError = function renderError(err) {
  console.error(clear, err);
}

const reset = function reset() {
  console.log(clear);
}

module.exports = {render, renderError, reset}
