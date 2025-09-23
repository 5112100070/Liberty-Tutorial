import http from 'k6/http';
import { check } from 'k6';

const HOST = __ENV.HOST || 'https://127.0.0.1';
const PATH = '/accounts-external/api/hello';
const URL  = `${HOST}${PATH}`;

const PRE_VUS = Number(__ENV.PRE_VUS || 1200);
const MAX_VUS = Number(__ENV.MAX_VUS || 6000);

export const options = {
  insecureSkipTLSVerify: true,
  scenarios: {
    hold_4000: {
      executor: 'constant-arrival-rate',
      rate: 8000,
      timeUnit: '1s',
      duration: '3m',
      preAllocatedVUs: PRE_VUS,
      maxVUs: MAX_VUS,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const res = http.get(URL, { timeout: '30s' });
  check(res, { 'status 200': (r) => r.status === 200 });
}
