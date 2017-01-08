/* Tic Tac Toe by Greg Duncan - a Free Code Camp challenge

   The logic to make sense of all the numbers:
the tiles of the board start from 0 to 8 (going left to right)
game.combos are the lines and possible ways to win 
eg  combos[0] is 0 1 2 would be a line accross the top 
and combos[3] is 0 3 6 straight line starting top left going down
    combos[6] is 0 4 8 diagonal line starting top left
game.linescores - the eight scores are for each of the combos
when a computer take a tile 1 point is added to the affected lines so
if computer took top left corner lineScores[0], lineScores[3] lineScores[6]
would have 1 point added or 5 points if the player had taken the tile
so by searching for a 2 in the lineScore the computer knows it can win and 
if no 2, it looks for a 10 to see if it has to stop the player from winning.
Once a tile is used it's index (from 0 - 8) is pushed into tileUsed[]
the lineIndex property in each of tiles say which line the tile affects
*/

var game = {
    playerCanMove: true,
    gameHasStarted: false,
    moves: 0,
    tokenPlayer: 'X ', // Player or Computer can change X and O 
    tokenComp: 'O ',
    centerTileFree: true,
    lineScores: [0, 0, 0, 0, 0, 0, 0, 0], // read above for lineScores & combos
    combos: [
        [0, 1, 2], // -
        [3, 4, 5], // -
        [6, 7, 8], // -
        [0, 3, 6], // |
        [1, 4, 7], // |
        [2, 5, 8], // |
        [0, 4, 8], // \
        [2, 4, 6] // /
    ],
    tiles: [{
        empty: true,
        text: '',
        lineIndex: [0, 3, 6]
    }, {
        empty: true,
        text: '',
        lineIndex: [0, 4]
    }, {
        empty: true,
        text: '',
        lineIndex: [0, 5, 7]
    }, {
        empty: true,
        text: '',
        lineIndex: [1, 3]
    }, {
        empty: true,
        text: '',
        lineIndex: [1, 4, 6, 7]
    }, {
        empty: true,
        text: '',
        lineIndex: [1, 5]
    }, {
        empty: true,
        text: '',
        lineIndex: [2, 3, 7]
    }, {
        empty: true,
        text: '',
        lineIndex: [2, 4]
    }, {
        empty: true,
        text: '',
        lineIndex: [2, 5, 6]
    }],
    newGame: function () {
        this.tiles.forEach(function (tile, position) {
            tile.empty = true;
            tile.text = '';
            if (position < 8) { // only 8 lineScores
                game.lineScores[position] = 0;
            }
        });
        this.moves = 0;
        this.centerTileFree = true;
        this.gameHasStarted = true;
        // if (this.tokenPlayer === 'X'){
        //     this.playerCanMove = true;
        // }else{
        //     this.playerCanMove = false;
        //     // computers turn 
        // }
        view.displayAllTiles();
    },
    checkThisTile: function (num, isPlayer) {
        if (game.tiles[num].empty) {
            game.tiles[num].empty = false; // not empty
            if (num === 4) {
                game.centerTileFree = false;
            }
            let marker, amount;
            if (isPlayer) {
                marker = game.tokenPlayer;
                amount = 5;
            } else {
                marker = game.tokenComp;
                amount = 1;
            }
            view.displayOneTile(num, game.tokenPlayer);
            game.addLineScores(game.tiles[num].lineIndex, amount);
        }
    },
    addLineScores: function (arr, amount) { // amount : 5 for user & 1 for comp
        arr.forEach(function (index) {
            game.lineScores[index] += amount;
        });
        game.moves++;
        console.log(game.lineScores, 'count: ', game.moves);
    },
    changeTokens: function () {
        let temp = game.tokenComp;
        game.tokenComp = game.tokenPlayer;
        game.tokenPlayer = temp;
        document.getElementById('XandO').innerText = game.tokenPlayer;
    }
};

view = {
    displayAllTiles: function () {
        //updates the html
        game.tiles.forEach(function (tile, position) {
            document.getElementById(position).value = tile.text;
        });
    },
    displayOneTile: function (index, token) {
        document.getElementById(index).value = token;
    }
}

var handlers = {
    newGame: function () {
        game.newGame();
    },
    checkThisTile: function (index) {
        if (game.gameHasStarted && game.playerCanMove) {
            game.checkThisTile(index, true);
        }
    },
    changeTokens: function () {
        myTest();
        game.changeTokens();
    }
};

$("#email1").attr({
    href: ("mailto:gregdd@outlook.com?subject=contact_from_TICTACTOE&body=Hello")
});