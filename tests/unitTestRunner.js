import http from 'k6/http';
import { sleep } from 'k6';
import getReviewTest from './unitTests/getReviewTest.js';
import metaTest from './unitTests/getMetaTest.js';
import helpfulTest from './unitTests/helpfulTest.js';
import reportTest from './unitTests/reportTest.js';

// export let options = {
//   noConnectionReuse: false,
//   vus: 1,
//   duration: '10s'
// }

export default () => {
  getReviewTest();
  metaTest();
  helpfulTest();
  reportTest();
};
