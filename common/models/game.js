'use strict';

module.exports = function(Game) {
    Game.validatesPresenceOf("numPlayers", "winnings", "userId")
    Game.validatesDateOf("date", {message: "Not a valid date."})
    Game.validate("userId", validateUser, {message: "Invalid user id"})
    Game.validatesNumericalityOf("numPlayers", {int: true, message: {int: "Is not an integer"}})
    Game.validate("numPlayers", function(err) { if(this.numPlayers<=0)err()}, {message: "May not be less than zero."})
    Game.validatesNumericalityOf("winnings")
    Game.validate("winnings", function(err) { if(this.winnings<=0)err()}, {message: "May not be less than zero."})
};

function validateUser(error) {
    if (this.userId <= 1) {
        error()
    }
}
