const packageJson = require('../package.json');
module.exports = {
  name : 'plextest',
  command : {
    usage: '',
    description: 'Test plex at bot start up to make sure everything is working',
    process: function(bot, client, message) {
      bot.plex.query('/').then(function(result) {
        if(message) {
          message.reply('name: ' + result.MediaContainer.friendlyName +'\nv: ' + result.MediaContainer.version + '\n'+
          'Bot version : ' + packageJson.version);
        }
        else {
          console.log('Media name: ' + result.MediaContainer.friendlyName);
          console.log('Media Container version: ' + result.MediaContainer.version);
          console.log('bot version: ' + packageJson.version);
        }
      }, function(err) {
        console.log('Error connecting to media server', err);
      });
    }
  }
};