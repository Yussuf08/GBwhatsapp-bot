require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const body = req.body;

  try {
    const message = body.messageData?.textMessageData?.textMessage;
    const chatId = body.senderData?.chatId;

    if (message && chatId) {
      await axios.post(
        `https://api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.TOKEN}`,
        {
          chatId: chatId,
          message: `✅ Сәлем! Сіздің хабарыңыз: "${message}"`,
        }
      );
    }
  } catch (error) {
    console.error("Хабарлама жіберуде қате:", error.message);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер іске қосылды: http://localhost:${PORT}`);
});
