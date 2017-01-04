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
    playerCanMove: false,
    gameHasStarted: false,
    tokenPlayer: 'X ', // Player or Computer can change X and O 
    tokenComp: 'O ',
    moves: 0,
    centerTileFree: true,
    lineScores : [0, 0, 0, 0, 0, 0, 0, 0], // read above for lineScores & combos
    combos:  [
        [0, 1, 2], // -
        [3, 4, 5], // -
        [6, 7, 8], // -
        [0, 3, 6], // |
        [1, 4, 7], // |
        [2, 5, 8], // |
        [0, 4, 8], // \
        [2, 4, 6]  // /
    ],
    tiles : [
        {
        id: 0,
        empty: true,
        XorO: false,
        lineIndex: [0, 3, 6]
        }, {
        id: 1,
        empty: true,
        XorO: false,
        lineIndex: [0, 4]
        }, {
        id: 2,
        empty: true,
        XorO: false,
        lineIndex: [0, 5, 7]
        }, {
        id: 3,
        empty: true,
        XorO: false,
        lineIndex: [1, 3]
        }, {
        id: 4,
        empty: true,
        XorO: false,
        lineIndex: [1, 4, 6, 7]
        }, {
        id: 5,
        empty: true,
        XorO: false,
        lineIndex: [1, 5]
        }, {
        id: 6,
        empty: true,
        XorO: false,
        lineIndex: [2, 3, 7]
        }, {
        id: 7,
        empty: true,
        XorO: false,
        lineIndex: [2, 4]
        }, {
        id: 8,
        empty: true,
        XorO: false,
        lineIndex: [2, 5, 6]
        }
    ]
};

var handlers = {
    newGame: function(){
        game.tiles.forEach(function(tile, position){
            //debugger;
            tile.empty = true;
            document.getElementById(position).value = '';
            if (position < 8){ // only 8 lineScores
                game.lineScores[position] = 0;
            }
        });
        // for (let i = 0; i < 9; i++){
        //     game.tiles[i].empty = true;
        //     //game.tiles[i].XorO = false;
        //     if (i < 8){ // only 8 lineScores
        //         game.lineScores[i] = 0;
        //     }
        //     document.getElementById(i).value = '';
        // }
        // for (var i = 0; i < game.lineScores.length; i++)
        //     game.lineScores[i] = 0;
        game.moves = 0;
        game.centerTileFree = true;
        game.gameHasStarted = true;
        if (game.tokenPlayer === 'X'){
            game.playerCanMove = true;
        }else{
            game.playerCanMove = false;
            // computers turn 
        }
    },
    checkThisTile: function(num, isPlayer){
        if (game.tiles[num].empty){
            game.tiles[num].empty = false; // not empty
            if (num === 4){
                game.centerTileFree = false;
            }
            let marker, amount;
            if (isPlayer){
                marker = game.tokenPlayer;
                amount = 5;
            }else{
                marker = game.tokenComp;
                amount = 1;
            }
            document.getElementById(num).value = marker;
            addLineScores(game.tiles[num].lineIndex, amount);
        }else{
            return false;
        }
              
    },
    changeTokens: function(){
        let temp = game.tokenComp;
        game.tokenComp = game.tokenPlayer;
        game.tokenPlayer = temp;
        document.getElementById('XandO').innerText = game.tokenPlayer; 
    }
};

function computerMoves(){
    if (game.moves < 2){
        if (game.centerTileFree){
            game.centerTileFree = false;
        handlers.checkThisTile(4, false);
        }else{
            handlers.checkThisTile(0, false);
        }
        
    }else if (game.lineScores.indexOf(2) !== -1){ // first look for win
        let index = game.lineScores.indexOf(2);
        // find out which in the line 
        index =  freeTile(game.combos[index]);
        handlers.checkThisTile(index, false);
    }else if (game.lineScores.indexOf(10) !== -1){ // stop user from a win
        let index = game.lineScores.indexOf(10);
        // find out which in the line 
        index =  freeTile(game.combos[index]);
        handlers.checkThisTile(index, false);
    }else if (game.lineScores.indexOf(1) !== -1){ // stop user from a win
        let index = game.lineScores.indexOf(1);
        // find out which in the line 
        index =  freeTile(game.combos[index]);
        handlers.checkThisTile(index, false);
    }
}
function addLineScores (arr, amount){ // amount : 5 for user & 1 for comp
    arr.forEach(function (index){
        game.lineScores[index] += amount;
    });
    game.moves++;
    console.log(game.lineScores, 'count: ', game.moves);
}
// takes in arr of 3 tile and returns empty tile
function freeTile (arr){
    if (game.tiles[arr[0]].empty){
        return game.tiles[arr[0]].id;
    }else if (game.tiles[arr[1]].empty){
        return game.tiles[arr[1]].id;
    }else{
        return game.tiles[arr[2]].id;
    }
}

$("#email1").attr({
    href: ("mailto:gregdd@outlook.com?subject=contact_from_TICTACTOE&body=Hello")
  });
