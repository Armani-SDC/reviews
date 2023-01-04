import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    ramp_up_requests: {
      executor: 'ramping-vus',
      startVUs: 100,
      stages: [
        {duration : '1s', target: 1050},
        {duration : '19s', target: 1050},
      ]
    }
  }
}

export default (randomProduct) => {
  randomProduct = randomProduct ? randomProduct : Math.floor(Math.random() * (1000000 - 800000 + 1) + 800000);
  const res = http.put(`http://localhost:3000/reviews/${randomProduct}/report`);
  check(res, {
    'is report status 201' : (r) => (r.status === 201)
  })
  sleep(1);
};
