import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://127.0.0.1:3001/api/recommendation';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m',  target: 10 },
    { duration: '30s', target: 0  },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed:   ['rate<0.01'],
  },
};

export default function () {
  const payload = JSON.stringify({
    fullName: 'Ivan Ferreira',
    description: 'Teste de carga com k6',
    stars: 5,
    situation: 'Pendente',
    status: true,
  });

  const headers = { 'Content-Type': 'application/json' };
  const post = http.post(BASE_URL, payload, { headers });

  const idMatch = post.body.match(/"_id"\s*:\s*"([^"]+)"/);
  const id = idMatch ? idMatch[1] : null;

  check(post, {
    'POST status 201': (r) => r.status === 201,
    'POST retornou ID': () => id !== null,
  });

  if (!id) return;

  const get = http.get(`${BASE_URL}/${id}`);

  check(get, {
    'GET status 200': (r) => r.status === 200,
    'GET retornou o registro': (r) => r.body.includes(id),
  });

  const del = http.del(`${BASE_URL}/${id}`);

  check(del, {
    'DELETE sucesso': (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}