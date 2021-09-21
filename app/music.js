module.exports = function (client, bot) {
    // plex commands -------------------------------------------------------------
    const plexCommands = require('../commands');
    // when bot is ready
    client.once('ready', function () {
        console.log('bot ready');
        console.log('logged in as: ' + client.user.tag);

        plexCommands['plextest'].process(bot);
    });

    // when message is sent to discord
    client.on('message', function (message) {
        const msg = message.content;

        if (msg.startsWith(bot.config.caracteres_commande)) {
            if (bot.config.canal_ecoute === '' || message.channel.name === bot.config.canal_ecoute) {
                const cmdTxt = msg.split(/\s+/)[0].substring(bot.config.caracteres_commande.length, msg.length).toLowerCase();
                const query = msg.substring(cmdTxt.length + 2);
                if (cmdTxt === "?") {
                    if (query) {
                        message.reply(bot.language.MUSIC_HELP_1.format({ caracteres_commande: bot.config.caracteres_commande }), { tts: true });
                        return;
                    }
                    for (let command in plexCommands) {
                        const embedObj = {
                            embed: {
                                color: 4251856,
                                fields:
                                    [
                                        {
                                            name: bot.language.COMMAND,
                                            value: bot.config.caracteres_commande + command + ' ' + plexCommands[command].usage,
                                            inline: true
                                        },
                                        {
                                            name: bot.language.DESCRIPTION,
                                            value: plexCommands[command].description,
                                            inline: true
                                        }
                                    ],
                                footer: {
                                    text: ''
                                },
                            }
                        };
                        message.channel.send('\n**' + command + ' :**\n\n', embedObj);
                    }
                    return;
                }

                const alias = {
                    'queue': 'viewqueue',
                    'next': 'skip',
                    'v': 'volume'
                }

                let cmd = plexCommands[cmdTxt];

                // Try to find alias;
                if (!cmd) {
                    const aliasCommand = alias[cmdTxt];
                    if (aliasCommand) {
                        cmd = plexCommands[aliasCommand];
                    }
                }

                if (cmd) {
                    try {
                        cmd.process(bot, client, message, query);
                        if (process.catch !== undefined) {
                            process.catch(err => console.log(e));
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    message.reply(bot.language.MUSIC_UNKNOW_COMMAND.format({ cmdTxt: cmdTxt }));
                }
            }
        }

    });
};
