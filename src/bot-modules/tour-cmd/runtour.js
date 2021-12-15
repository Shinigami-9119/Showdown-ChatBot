'use strict';

module.exports = {
 
    r: 'runtour',
    runtour: function () {
    	if (!this.can("tour")) return false;
        const args = this.arg.split(',')
        var atimer = parseFloat(this.arg).toFixed(1);
        if (isNaN(atimer)) return this.reply('Error: the argument must be a number!');
        if (atimer > 10) return this.reply('Error: The Argument is to high!');
        if (atimer < 0) return this.reply('Error: The Argument cant be a negative number!');
        if (atimer <= 0) this.reply('The Tournament will be starting __right now__');
        if (atimer > 0) this.reply("The Tournament will be starting in " + atimer + " minutes");
        let time = atimer * 1000 * 60; // minutes
        let self = this;
 
        setTimeout(() => {
        self.reply("/tour start");
        self.reply("/tour autodq 2");
        self.reply("/tour modjoin off");
        self.reply("/tour remind");
        }, time);
   }
};
