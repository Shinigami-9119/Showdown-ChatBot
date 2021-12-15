'use strict';
function toID(text) {
    if (!text) return '';
    let type = typeof text;
    if (type !== 'string') {
      if (type === 'number') {
        text = '' + text;
      } else {
        if (text.id) {
          text = text.id;
        } else {
          text = (text.toString ? text.toString() : JSON.stringify(text));
        }
      }
    }
    return text.replace(/[^A-Za-z0-9]/g, '').split('').map((x,i) => i == 0 ? x.toUpperCase() : x).join('');
  }
const https = require('https');

const getUserInfo = (user) => {
    return new Promise((resolve, reject) => {
        https.get(`https://pokemonshowdown.com/users/${user}.json`, res => {
            if (res.statusCode !== 200) return reject("ERROR");

            res.setEncoding('utf8');
            let data = "";
            res.on('data', d => data += d);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', e => reject(e));
    });
};

module.exports = {
    rank: function (target, user, room) {
        if (!this.can("alts")) return true;
        if (!this.arg) return this.reply('You need to add a name after the command!')
        let targetU = this.arg || userid;
        targetU = toID(this.arg);

        getUserInfo(targetU)
            .then(d => {
                
                let ratings = d.ratings;
                let display = `<div style="height: 150px; overflow:auto;"><table style="width: 100%; background: #0364b0; border: 4px solid Black; box-shadow: inset 0 0 13px #0a70c0; color: White; border-collapse: collapse" cellspacing="2" cellpadding="3" border="1"><tbody><tr><th style="; background: #0a70c0; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset; color: white; color: White; font-family: Arial; font-family: Arial">Format</th><th style="; background: #0a70c0; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset; color: white; color: White; font-family: Arial;; font-family: Arial">ELO</th><th style="; background: #0a70c0; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset; color: white; color: White; font-family: Arial; font-family: Arial">GXE</th></tr>`;
                Object.keys(ratings)
                    .forEach(tier => display += `<tr><th style="; background: #0a70c0; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset; color: white; color: White; font-family: Arial; width: 35%">${tier}</th><th style="; background: #0a70c0; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset; color: white; color: White; font-family: Arial; width: 35%">${~~(ratings[tier].elo)}</th><th style="; background: #0a70c0; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset; color: white; color: White; font-family: Arial; font-family: Arial ; width: 35%">${ratings[tier].gxe}</th></tr>`);
            
                if (!(Object.keys(ratings)).length) return this.reply(`The user '${targetU}' has not played any ladder games yet.`);
                
                this.reply(`/addhtmlbox ${display}</tbody></table></div>`);
            })
            .catch(e => this.reply(e));
    },
};
