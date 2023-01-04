import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    ramp_up_requests: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        {duration : '2s', target: 1000},
        {duration : '18s', target: 1000},
      ]
    }
  }
}

export default (randomProduct) => {
  randomProduct = randomProduct ? randomProduct : Math.floor(Math.random() * (1000000 - 800000 + 1) + 800000);
  const res = http.get(`http://localhost:3000/reviews?page=0&count=5&sort=newest&product_id=${randomProduct}`);
  check(res, {
    'is get reviews status 201' : (r) => (r.status === 201),
    'does review return an object' : (r) => ((typeof(JSON.parse(r.body)) === 'object')),
  });
  sleep(1);
};
