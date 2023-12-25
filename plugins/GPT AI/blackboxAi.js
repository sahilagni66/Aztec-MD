const fetch = async (url) => (await import('node-fetch')).default(url);
const config = require('../../config.js');

module.exports = {
  name: 'blackbox',
  category: 'GPT AI',
  async client(vorterx, m, { args, connect }) {
    try {
      if (!args) {
        await connect('❌');
        return m.reply(
          "```\nError 404: Text not found. Please provide text to get results...\n```"
        );
      }

      const getBlack = `https://mzn-api.onrender.com/ai/blackbox?prompt=${encodeURIComponent(args)}`;

      const res = await fetch(getBlack);

      if (!res.ok) {
        m.reply(`Error: ${res.status}`);
        return;
      }

      const result = await res.json();
      console.log(result);

      // Check if the 'res' property exists in the result
      if (!result || !result.res) {
        await connect('❌');
        return m.reply("No results found for the provided text.");
      }

      const getRes = result.res;
      const getFinal = `*BLACKBOX AI*\n\n${getRes}\n\n*${config.CAPTION}*`;

      await vorterx.sendMessage(m.from, {
        image: { url: 'https://i.ibb.co/DLyfLjq/BLACKBOX-AI-BY-DIEGOSON-TECH.png' },
        caption: getFinal,
      });

      await connect('🤖');
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply("```\nAn error occurred. Please try again...\n```");
    }
  },
};
        
