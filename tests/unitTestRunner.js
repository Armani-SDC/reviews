import http from 'k6/http';
import { sleep } from 'k6';
import getReviewTest from './unitTests/getReviewTest.js';
import postReviewTest from './unitTests/postReviewTest.js';
import metaTest from './unitTests/getMetaTest.js';
import helpfulTest from './unitTests/helpfulTest.js';
import reportTest from './unitTests/reportTest.js';

export const options = {
  scenarios: {
    ramp_up_requests: {
      executor: 'ramping-vus',
      startVUs: 100,
      stages: [
        {duration : '2s', target: 1000},
        {duration : '18s', target: 1000},
      ]
    }
  }
}

export default () => {
  const randomProduct1 = Math.floor(Math.random() * (1000000 - 800000 + 1) + 800000);
  const randomProduct2 = Math.floor(Math.random() * (1000000 - 800000 + 1) + 800000);
  helpfulTest(randomProduct1);
  reportTest(randomProduct1);
  postReviewTest(randomProduct1);
  getReviewTest(randomProduct2);
  metaTest(randomProduct1);
};
