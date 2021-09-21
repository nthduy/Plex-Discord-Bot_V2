module.exports = {
  name: "random",
  command: {
    usage: "<number or it will be generate only 1 song>",
    description: "bot will join voice channel and play a random song.",
    process: async function (bot, client, message, query) {
      try {
        await bot.findRandomTracksOnPlex(query, message);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
