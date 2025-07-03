require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const messageData = req.body.messageData;
  const message = messageData?.textMessage;
  const chatId = req.body.senderData?.chatId;

  if (message && chatId) {
    try {
      await axios.post(
        `https://api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.TOKEN}`,
        {
          chatId: chatId,
          message: `Сәлем! Сен жаздың: ${message}`,
        }
      );
    } catch (error) {
      console.error("Қате шықты:", error.message);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер іске қосылды: http://localhost:${PORT}`);
});
