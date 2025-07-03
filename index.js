
require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())

app.post('/webhook', async (req, res) => {
  try {
    const message = req.body.messageData?.textMessageData?.textMessage;
    const chatId = req.body.senderData?.chatId;

    if (message && chatId) {
      await axios.post(`https://api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.TOKEN}`, {
        chatId,
        message: `Сен жаздың: ${message}`
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Қате шықты:", error.message);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Бот іске қосылды порт: ${PORT}`)
})
