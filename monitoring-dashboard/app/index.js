// index.js
const express = require('express');
const client = require('prom-client');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collect CPU, memory, etc

const counter = new client.Counter({
  name: 'my_app_requests_total',
  help: 'Total number of requests',
});

app.get('/', (req, res) => {
  counter.inc();
  res.send('Hello from Node.js!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(4000, () => {
  console.log('App running on http://localhost:4000');
});
