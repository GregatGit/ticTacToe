// 
console.log(game);

var ai = {
    // takes in arr of 3 tile and returns empty tile
    myTest: function(){
        console.log('hi there');
    },
    computerMoves: function () {
        if (game.moves < 2) { // see if center is taken
            if (game.centerTileFree) {
                game.centerTileFree = false;
                game.checkThisTile(4, false);
            } else {
                game.checkThisTile(0, false);
            }
        } else if (game.lineScores.indexOf(2) !== -1) { // first look for win
            let index = game.lineScores.indexOf(2);
            // find out which in the line 
            index = ai.freeTile(game.combos[index]);
            game.checkThisTile(index);
        } else if (game.lineScores.indexOf(10) !== -1) { // stop user from a win
            let index = game.lineScores.indexOf(10);
            // find out which in the line 
            index = ai.freeTile(game.combos[index]);
            game.checkThisTile(index);
        // } else if (game.lineScores.indexOf(1) !== -1) { // stop user from a win
        //     let index = game.lineScores.indexOf(1);
        //     // find out which in the line 
        //     index = ai.freeTile(game.combos[index]);
        //     game.checkThisTile(index);
        } else{
            let index;
            do {
                index = Math.floor((Math.random() * 9) + 0);
            } while (game.usedTiles.indexOf(index) !== -1);
            game.checkThisTile(index);
        }
    },
    freeTile: function (arr) {
        if (game.tiles[arr[0]].empty)
            return arr[0];
        else if (game.tiles[arr[1]].empty)
            return arr[1];
        else
            return arr[2];
    }
};