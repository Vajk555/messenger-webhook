const express = require('express');
const app = express();

const VERIFY_TOKEN = 'barbershop123';

app.use('*', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(200).send('OK');
  }
});

app.listen(process.env.PORT || 3000);
