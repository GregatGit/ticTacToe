// 
console.log(game);
var ai = {
    // takes in arr of 3 tile and returns empty tile
    computerMoves: function () {
        if (game.moves < 2) {
            if (game.centerTileFree) {
                game.centerTileFree = false;
                handlers.checkThisTile(4, false);
            } else {
                handlers.checkThisTile(0, false);
            }

        } else if (game.lineScores.indexOf(2) !== -1) { // first look for win
            let index = game.lineScores.indexOf(2);
            // find out which in the line 
            index = freeTile(game.combos[index]);
            handlers.checkThisTile(index, false);
        } else if (game.lineScores.indexOf(10) !== -1) { // stop user from a win
            let index = game.lineScores.indexOf(10);
            // find out which in the line 
            index = freeTile(game.combos[index]);
            handlers.checkThisTile(index, false);
        } else if (game.lineScores.indexOf(1) !== -1) { // stop user from a win
            let index = game.lineScores.indexOf(1);
            // find out which in the line 
            index = freeTile(game.combos[index]);
            handlers.checkThisTile(index, false);
        }
    },

    freeTile: function (arr, objArr) {
        let index;
        if (objArr[arr[0]].empty)
            index = arr[0];
        else if (objArr[arr[1]].empty)
            index = arr[1];
        else
            index = arr[2];
        return index;

        // if (game.tiles[arr[0]].empty) {
        //     return game.tiles[arr[0]].id;
        // } else if (game.tiles[arr[1]].empty) {
        //     return game.tiles[arr[1]].id;
        // } else {
        //     return game.tiles[arr[2]].id;
        // }
    }
};