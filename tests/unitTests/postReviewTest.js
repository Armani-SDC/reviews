import http from 'k6/http';
import { sleep } from 'k6';

// export let options = {
//   noConnectionReuse: false,
//   vus: 1,
//   duration: '10s'
// }

export default () => {
  let randomProduct = Math.floor(Math.random() * (1000000 - 800000 + 1) + 800000);
  http.get('http://localhost:3000/reviews?page=0&count=5&sort=newest&product_id=899333');
  sleep(1);
};