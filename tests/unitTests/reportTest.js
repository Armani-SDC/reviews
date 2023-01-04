import http from 'k6/http';
import { sleep, check } from 'k6';

// export let options = {
//   noConnectionReuse: false,
//   vus: 1,
//   duration: '10s'
// }

export default (randomProduct) => {
  randomProduct = randomProduct ? randomProduct : Math.floor(Math.random() * (1000000 - 800000 + 1) + 800000);
  const res = http.put(`http://localhost:3000/reviews/${randomProduct}/report`);
  check(res, {
    'is report status 201' : (r) => (r.status === 201)
  })
  sleep(1);
};
