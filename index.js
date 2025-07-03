require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const message = req.body.message?.textMessageData?.textMessage;
  const sender = req.body.senderData?.chatId;

  if (message && sender) {
    try {
      await axios.post(`https://api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.TOKEN}`, {
        chatId: sender,
        message: `Сәлем! Сіз жіберген: "${message}"`
      });
    } catch (error) {
      console.error('Жіберу кезінде қате:', error.message);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер іске қосылды: http://localhost:${PORT}`);
});
