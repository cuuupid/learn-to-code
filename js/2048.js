var squares = [];

var blockSize = width / 4;

var c1 = color(29, 195, 224);
var c2 = color(247, 166, 15);
textAlign(CENTER, CENTER);
textSize(28);
stroke(189, 189, 189);
textFont(createFont("monospace"));

var printBoard = function(board) {
    var boardString = "";
    for(var y = 0; y < board.length; y++) {
        boardString += "[ ";
        for(var x = 0; x < board.length; x++) {
            boardString += board[x][y].value + " ";
        }
        boardString += "]\n";
    }
    debug(boardString);
    return boardString;
};

var onCreate = function() {
    var start = round(random(0, 16));
    var start2 = start;
    while(start2 === start) {
        start2 = round(random(0, 16));
    }
    
    for (var x = 0; x < 4; x++) {
        squares.push([]);
        for (var y = 0; y < 4; y++) {
            var val = 0;
            var num = x*4 + y;
            if (num === start2 || num === start) {
                val = 2;
            }
            squares[x].push({
                x: x * blockSize,
                y: y * blockSize,
                value: val
            });
        }
    }
};

var direction = null;

var keyPressed = function() {
    switch(keyCode) {
        case UP:
        case DOWN:
        case LEFT:
        case RIGHT: direction = keyCode; break;
    }
    debug(direction);
};

// get axis of motion
var axis = function(dir){return (dir===UP || dir===DOWN) ? UP : RIGHT; };
// get whether direction is positive cartesian
var pos = function(dir){ return (dir===UP || dir===LEFT);};
// get whether square1 can be added to square2
var addable = function(s1, s2){ return (s2.value === 0 || s2.value === s1.value);};

// transpose matrix so rows become columns
var transpose = function(squares) {
    var transposed = squares.slice();
    return transposed[0].map(function(c, i) {
        return transposed.map(function(row){
            return row[i];
        });
    });
};

// check win
var checkWin = function() {
    var win = false;
    squares.forEach(function(column) {
        column.forEach(function(square) {
            if(square.value >= 2048) {
                win = true;
            }
        });
    });
    return win;
};

// check loss
var checkLoss = function() {
    var loss = true;
    squares.forEach(function(column) {
        column.forEach(function(square) {
            if(square.value === 0) {
                loss = false;
            }
        });
    });
    return loss;
};

// continue to populate the board
var populate = function() {
    var populex = round(random(0,16));
    for(var x = 0; x < squares.length; x++) {
        for(var y = 0; y < squares.length; y++) {
            if(x*4+y === populex) {
                if(squares[x][y].value > 0) {
                    populate();
                    return;
                } else {
                    squares[x][y].value = 2;
                    return;
                }
            }
        }
    }
};

var onUpdate = function() {
    // Called pre-render
    if (direction) {
        if(checkWin()) {
            squares = null;
            fill(248,248,248);
            stroke(248,248,248);
            rect(0,0,width,height);
            fill(0,0,0);
            text("You won!", width/2, height/2);
        }
        if (axis(direction) === UP) {
            squares.forEach(function(column) {
                if(pos(direction)) {
                    for(var y = 3; y > 0; y--) {
                        if(addable(column[y], column[y-1])) {
                            column[y-1].value += column[y].value;
                            column[y].value = 0;
                        }
                    }
                }
                else {
                    for(var y = 0; y < 3; y++) {
                        if(addable(column[y], column[y+1])) {
                            column[y+1].value += column[y].value;
                            column[y].value = 0;
                        }
                    }
                }
            });
        }
        else {
            printBoard(squares);
            var temp = transpose(squares);
            printBoard(temp);
            temp.forEach(function(row) {
                if(pos(direction)) {
                    for(var x = 3; x > 0; x--) {
                        if(addable(row[x], row[x-1])) {
                            row[x-1].value += row[x].value;
                            row[x].value = 0;
                        }
                    }
                }
                else {
                    for(var x = 0; x < 3; x++) {
                        if(addable(row[x], row[x+1])) {
                            row[x+1].value += row[x].value;
                            row[x].value = 0;
                        }
                    }
                }
            });
            squares = transpose(temp);
        }
        populate();
        if(checkLoss()) {
            squares = null;
            fill(248,248,248);
            stroke(248,248,248);
            rect(0,0,width,height);
            fill(0,0,0);
            text("You lost!", width/2, height/2);
        }
        direction = null;
    }
};

var draw = function() {
    onUpdate();
    squares.forEach(function(column) {
        column.forEach(function(square) {
            if (square.value === 0) {
                fill(54, 54, 54);
                rect(square.x, square.y, blockSize, blockSize);
            }
            else {
                fill(lerp(c1, c2, 2048 / square.value));
                rect(square.x, square.y, blockSize, blockSize);
                fill(255, 255, 255);
                text(square.value, square.x + blockSize / 2, square.y + blockSize / 2);
            }
        });
    });
};

onCreate();
