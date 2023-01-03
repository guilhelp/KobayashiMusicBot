const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();

const TOKEN = 'ODc1Nzg0NDE2MzQ0MDM1MzY4.YRajzA.OD0gHae_KTDkOZAT9Qm3zWOlCHM';

const prefixo = '#';

const ytdlOptions = {
    filter: 'audioonly'
}

const servidores = {
    'server': {
        connection: null,
        dispatcher: null
    }
}


client.on("ready", () => {
    console.log('Estou online!');
});

client.on("message", async (msg) => {

    //filtro

    if(!msg.guild) return;

    if(!msg.content.startsWith(prefixo)) return;
    
    if(!msg.member.voice.channel) {
        msg.channel.send('Você precisa estar num canal de voz!');
        return;
    }

    //comandos
    if(msg.content == prefixo + 'join') {  //join
        try {
            servidores.server.connection = await msg.member.voice.channel.join();
        } 
        catch (err) {
            console.log('Erro ao entrar num canal de voz!');
            console.log(err);
        }
       servidores.server.connection = await msg.member.voice.channel.join();
    }

    if(msg.content == prefixo + 'leave') {  //join
        await msg.member.voice.channel.leave();
        servidores.server.connection = null;
        servidores.server.dispartcher = null;
     }

    if (msg.content.startsWith(prefixo + 'play')) { //#play <link>
        let oQueTocar = msg.content.slice(6);
        if (ytdl.validateURL(oQueTocar)) {
            servidores.server.dispatcher = servidores.server.connection.play(ytdl(oQueTocar, ytdlOptions));
        }
        else {
            msg.channel.send('Link inválido!');
        }
    }
    if(msg.content == prefixo + 'pause') {  // #pause
        servidores.server.dispatcher.pause();
    }

    if(msg.content == prefixo + 'resume') {  // #resume
        servidores.server.dispatcher.resume();
    }
});

client.login(TOKEN);