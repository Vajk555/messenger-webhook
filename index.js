const express = require('express');
const app = express();

app.use(express.json());

const VERIFY_TOKEN = 'barbershop123';
const MAKE_WEBHOOK_URL = 'IDE_A_MAKE_WEBHOOK_URL';

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
