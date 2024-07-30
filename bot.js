const { Client, GatewayIntentBits } = require("discord.js");
const TARGET_CHANNEL_ID = "1267522332013101117"; // ID del canal
const BOT_TOKEN = ""; // Token del bot

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is ready!");
  const targetChannel = client.channels.cache.get(TARGET_CHANNEL_ID);
  if (targetChannel) {
    targetChannel
      .send("Buenos dias coders!")
      .then(() => console.log("Startup message sent"))
      .catch((error) => console.error("Error sending startup message:", error));
  } else {
    console.error("Target channel not found.");
  }
});

client.on("messageCreate", (message) => {
  console.log(
    `Received message: '${message.content}' in channel '${message.channel.id}'`
  );

  if (message.author.bot) return; // Ignora los mensajes del propio bot

  if (message.channel.id === TARGET_CHANNEL_ID) {
    console.log(`Target channel '${TARGET_CHANNEL_ID}' matched.`);
    if (message.content.trim().toLowerCase() === "!presente") {
      console.log("Command !presente received.");

      const userMention = message.author.toString();
      const currentDate = new Date().toLocaleDateString();
      const responseMessage = `${userMention} está presente el día ${currentDate}. ¡Bienvenido!`;

      message.channel
        .send(responseMessage)
        .then(() => console.log("Message sent"))
        .catch((error) => console.error("Error sending message:", error));
    } else {
      console.log("The message is not !presente");
    }
  } else {
    console.log(
      `Message received in channel '${message.channel.id}', but not the target channel.`
    );
  }
});

client.login("");
