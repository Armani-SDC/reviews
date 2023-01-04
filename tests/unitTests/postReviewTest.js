import http from 'k6/http';
import { sleep, check } from 'k6';

// export let options = {
//   noConnectionReuse: false,
//   vus: 1,
//   duration: '10s'
// }

export default (randomProduct) => {
  randomProduct = randomProduct ? randomProduct : Math.floor(Math.random() * (1000000 - 800000 + 1) + 800000);
  const url = 'http://localhost:3000/reviews/';
  const payload = JSON.stringify(
    {
      product_id: 3,
      rating: 2,
      summary: 'this is a test summary',
      body: 'this is a test body',
      recommend: false,
      name: 'test name',
      email: 'testEmail@test.com',
      photos: ['testurl1', 'testurl2'],
      characteristics:
      {
          Fit: {
              id: 1,
              value: 4
          },
          Length: {
              id: 2,
              value: 3
          },
          Comfort: {
              id: 3,
              value: 5
          },
          Quality: {
              id: 4,
              value: 4
          }
      }
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(url, payload, params);
  check(res, {
    'is post status 201' : (r) => (r.status === 201)
  })
  sleep(1);
};
