import readline from 'readline';
import moment from 'moment-timezone';
import getFoodTrucks from './Model';
import View from './View';

// Get the day and time in SF, regardless of the timezone of the user.
const dateTimeInSF = moment().tz('America/Los_Angeles');
const day = Number(dateTimeInSF.format('d'));
const time = dateTimeInSF.format('HH:mm');

// Print the first set of food trucks that are open without any prompt.
let offset = 0;
const limit = 10;
getFoodTrucks(day, time, offset, limit)
  .then((res) => {
    View.render(res);
    offset += res.length;
  })
  .catch((err) => View.renderError(err));

// Listen to keyboard inputs and react accordingly.
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  // If the user presses q or ctrl+c, then exit; else print the next set.
  if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    View.clear();
    process.exit();
  } else {
    getFoodTrucks(day, time, offset, limit)
      .then((res) => {
        View.render(res);
        offset += res.length;
      })
      .catch((err) => View.renderError(err));
  }
});
