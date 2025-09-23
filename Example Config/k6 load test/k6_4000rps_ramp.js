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
    ramp_to_4000: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: PRE_VUS,
      maxVUs: MAX_VUS,
      stages: [
        { target:  250, duration: '30s' },
        { target:  500, duration: '30s' },
        { target:  750, duration: '30s' },
        { target: 1000, duration: '30s' },
        { target: 1250, duration: '30s' },
        { target: 1500, duration: '30s' },
        { target: 1750, duration: '30s' },
        { target: 2000, duration: '30s' },
        { target: 2250, duration: '30s' },
        { target: 2500, duration: '30s' },
        { target: 2750, duration: '30s' },
        { target: 3000, duration: '30s' },
        { target: 3250, duration: '30s' },
        { target: 3500, duration: '30s' },
        { target: 3750, duration: '30s' },
        { target: 4000, duration: '30s' },
        { target: 4000, duration: '180s' },
      ],
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
