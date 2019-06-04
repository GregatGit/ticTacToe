/* Tic Tac Toe by Greg Duncan - a Free Code Camp challenge

   The logic to make sense of all the numbers:
the tiles of the board start from 0 to 8 (going left to right)
var combos are the lines and possible ways to win 
eg  combos[0] is 0 1 2 would be a line accross the top 
and combos[3] is 0 3 6 straight line starting top left going down
    combos[6] is 0 4 8 diagonal line starting top left
var linescores - the eight scores are for each of the combos
when a computer take a tile 1 point is added to the affected lines so
if computer took top left corner lineScores[0], lineScores[3] lineScores[6]
would have 1 point added or 5 points if the player had taken the tile
so by searching for a 2 in the lineScore the computer knows it can win and 
if no 2, it looks for a 10 to see if it has to stop the player from winning.
Once a tile is used it's index (from 0 - 8) is pushed into tileUsed[]
the lineIndex property in each of tiles say which line the tile affects
*/
var tokenPlayer = "X"; // can be changed to "O" by user
var tokenComp = "O"; // can be changed to "X" by user
var lineScores = [0, 0, 0, 0, 0, 0, 0, 0];
var combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
var tilesUsed = [];
var turns = 0;
var whosTurn = "user";
var shaded = -1; // -1 for blank - 0 to 7 (combos ref) to show which are
var playerCanMove = true;
// var tiles is down the bottom -

$('#zero').click(function() {
  playerMove(0);
});
$('#one').click(function() {
  playerMove(1);
});
$('#two').click(function() {
  playerMove(2);
});
$('#three').click(function() {
  playerMove(3);
});
$('#four').click(function() {
  playerMove(4);
});
$('#five').click(function() {
  playerMove(5);
});
$('#six').click(function() {
  playerMove(6);
});
$('#seven').click(function() {
  playerMove(7);
});
$('#eight').click(function() {
  playerMove(8);
});
$('#newGame').click(newGame);
$('#playerLetter').click(chooseLetter);
$('[data-toggle="tooltip"]').tooltip();

// this fired by user clicking on tile
function playerMove(num) {
  if (playerCanMove) {
    if (tiles[num].empty) {
      $(tiles[num].name).val(tokenPlayer);
      tiles[num].empty = false;
      tiles[num].XorO = tokenPlayer;
      whosTurn = "User";
      // the 5 is how much is added for player move
      lineScoreUpdate(num, 5, tiles[num].lineIndex);
      turns++;
      tilesUsed.push(num);
    }
    if (turns === 9) {
      $('#playerLetter').show();
    } else {
      compTurn();
    }
  }
}

function compTurn() {
  var num;
  if (tiles[4].empty) {
    num = 4;
  } else if (turns === 3 && lineScores[6] === 11) {
    if (tiles[4].XorO === tokenPlayer) {
      num = 2;
    } else {
      num = 1;
    }
  } else if (lineScores.indexOf(2) > -1) {
    var myIndex = lineScores.indexOf(2);
    num = findEmpty(combos[myIndex]);
    computerWins(num, myIndex);
  } else if (lineScores.indexOf(10) > -1) {
    var myIndex = lineScores.indexOf(10);
    num = findEmpty(combos[myIndex]);
  } else if (turns === 1) {
    num = 0;
  } else {
    do {
      num = Math.floor((Math.random() * 9) + 0);
    } while (tilesUsed.indexOf(num) !== -1);
  }
  var str = tiles[num].name;
  $(str).val(tokenComp);
  tiles[num].XorO = "O";
  tiles[num].empty = false;
  turns++;
  tilesUsed.push(num);
  whosTurn = "Comp";
  // the 1 is how much is added for comp move
  lineScoreUpdate(num, 1, tiles[num].lineIndex);
}

function computerWins(num, index) {
  var str = tiles[num].name;
  $(str).val(tokenComp);
  combos[index].forEach(function(x) {
    $(tiles[x].name).css('background', 'blue');
    shaded = index;
  });
  playerCanMove = false;
  $('#playerLetter').show();
}

function findEmpty(arr) {
  if (tiles[arr[0]].empty) {
    return arr[0];
  } else if (tiles[arr[1]].empty) {
    return arr[1];
  } else {
    return arr[2];
  }
}

function lineScoreUpdate(index, num, arr) {
  for (var i in arr) {
    lineScores[arr[i]] += num;
  }
  console.log(whosTurn + " " + lineScores);
  console.log(tilesUsed);
}

function newGame() {
  $('#playerLetter').hide();
  if (shaded !== -1) {
    combos[shaded].forEach(function(x) {
      $(tiles[x].name).css('background', 'white');
      shaded = -1;
    });
  }
  for (var i = 0; i < 9; i++) {
    $(tiles[i].name).val('');
    tiles[i].XorO = null;
    tiles[i].empty = true;
    if (i < 8) {
      lineScores[i] = 0;
    }
  }
  playerCanMove = true;
  tilesUsed.length = 0;
  turns = 0;
  if (tokenComp === "X")
    compTurn();
}

function chooseLetter() {
  if (tokenPlayer === "X") {
    tokenPlayer = "O";
    tokenComp = "X";
  } else {
    tokenPlayer = "X";
    tokenComp = "O";
  }
  $('#playerLetter').html(tokenPlayer + " " + '<i class="fa fa-refresh" aria-hidden="true"></i>');
}

var tiles = [{
  name: "#zero",
  empty: true,
  XorO: null,
  lineIndex: [0, 3, 6]
}, {
  name: "#one",
  empty: true,
  XorO: null,
  lineIndex: [0, 4]
}, {
  name: "#two",
  empty: true,
  XorO: null,
  lineIndex: [0, 5, 7]
}, {
  name: "#three",
  empty: true,
  XorO: null,
  lineIndex: [1, 3]
}, {
  name: "#four",
  empty: true,
  XorO: null,
  lineIndex: [1, 4, 6, 7]
}, {
  name: "#five",
  empty: true,
  XorO: null,
  lineIndex: [1, 5]
}, {
  name: "#six",
  empty: true,
  XorO: null,
  lineIndex: [2, 3, 7]
}, {
  name: "#seven",
  empty: true,
  XorO: null,
  lineIndex: [2, 4]
}, {
  name: "#eight",
  empty: true,
  XorO: null,
  lineIndex: [2, 5, 6]
}];

// SCREEN SIZE IF IT GET TOO SMALL
var viewportwidth = $(window).width();
if (viewportwidth < 370)
  makeBoxesSmall();

function makeBoxesSmall (){
  $('input').css({"height":"70px","width":"70px", "font-size": "25"});
}
function makeBoxesBig (){
  $('input').css({"height":"100px","width":"100px", "font-size": "50"});
}

$(window).resize(function() {
  viewportwidth = $(window).width();
  if (viewportwidth < 370)
  makeBoxesSmall();
  if (viewportwidth > 369)
    makeBoxesBig();
});

$("#email").attr({
  href: ("mailto:gregdd@outlook.com?subject=contact_from_TICTACTOE&body=Hello")
});
