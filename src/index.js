import axios from 'axios'
import { Client, GatewayIntentBits, Partials } from 'discord.js'
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});
const baseUrl = process.env.LAMBDA_INVOKE_PATH

client.once("ready", async () => {
  console.log("Ready!");
})

client.on('messageCreate', message => {

  console.log("message:"+message.content);

  if (message.author.bot) { // 1
    return;
  }

  // 起動
  if (message.content === '!mcstart') {
    axios.get(`${baseUrl}minecraft-server-start`)
      .then(res => {
        message.reply(`マイクラサーバを起動しました。IPは${res.data}です。`)
      })
      .catch(err => {
        message.reply('既に起動しています。')
      })
  }

  // 停止
  if (message.content === '!mcstop') {
    axios.get(`${baseUrl}minecraft-server-stop`)
      .then(res => {
        message.reply(`マイクラサーバを停止しました。`)
  })
  .catch(err => {
    message.reply('既に停止しています。')
  })
}

})

client.login(process.env.DISCORD_TOKEN)