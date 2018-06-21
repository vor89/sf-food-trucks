import readline from 'readline';
import moment from 'moment-timezone';
import getFoodTrucks from './Model';
import View from './View';

const dateTimeInSF = moment().tz('America/Los_Angeles');
const day = Number(dateTimeInSF.format('d'));
const time = dateTimeInSF.format('HH:mm');
let offset = 0;
const limit = 10;

getFoodTrucks(day, time, offset, limit)
  .then((res) => {
    View.render(res);
    offset += 10;
  })
  .catch((err) => View.renderError(err));

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    View.clear();
    process.exit();
  } else {
    getFoodTrucks(day, time, offset, limit)
      .then((res) => {
        View.render(res);
        offset += 10;
      })
      .catch((err) => View.renderError(err));
  }
});
