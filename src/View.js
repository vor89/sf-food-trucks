const clear = function clear() {
  console.clear();
}

const render = function render(foodTrucks) {
  clear();

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
  clear();
  console.error(err);
}

export default { clear, render, renderError };
