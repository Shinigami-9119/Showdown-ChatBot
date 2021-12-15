'use strict';

module.exports = {
 
    monothreat: function() {
     	if (!this.can("tour")) return false;
        if(this.args.join('')) {
 
         this.reply('/etour monotype');
         this.reply(`/tour name Monothreat ${this.args.join().charAt(0).toUpperCase() + this.args.join().substr(1).toLowerCase()}`);
         this.reply('/tour scout off');
         this.reply(`/wall This is a ${this.args.join().charAt(0).toUpperCase() + this.args.join().substr(1).toLowerCase()} monothreat tournament, bring ${this.args.join().charAt(0).toUpperCase() + this.args.join().substr(1).toLowerCase()} or be disqualified!`);
     }
       else {
        let types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];
        let randType = types[~~(Math.random() * types.length)];
        this.reply('/etour monotype');
        this.reply('/tour name Monothreat ' + randType);
        this.reply('/wall This is a ' + randType + ' monothreat tournament, bring ' + randType + ' or be disqualified!');
        this.reply('/tour scout off');
   }
};
