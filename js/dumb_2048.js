// Cosmetics
textAlign(CENTER, CENTER);
textSize(28);
textFont(createFont("monospace"));

// Step 1, make squares
var bs = width/4;
var squares = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

var createNewBlock = function() {
    var x = round(random(0,3));
    var y = round(random(0,3));
    if(squares[x][y] > 0) {
        createNewBlock();
        return;
    }
    squares[x][y] = 2;
};

createNewBlock();
createNewBlock();

// Utilities
var transpose = function(squares) {
    var transposed = squares.slice();
    return transposed[0].map(function(c, i) {
        return transposed.map(function(row){
            return row[i];
        });
    });
};

// Step 2, render the squares
var render = function() {
};

// Step 3, Update
var keypress = false;
var keyc = null;

var keyPressed = function() {
    keypress = true;
    keyc = keyCode;
};

var keyReleased = function() {
    keypress = false;
    keyc = null;
};

var update = function() {
    
    // Step 4, if key is pressed
    if (keypress) {
        // Step 5 get key code
        var dir = keyc; // UP LEFT DOWN RIGHT
        var grid;
        
        // Step 6 move the squares
        // Step 7 get axis
        if (dir === LEFT || dir === RIGHT) {
            //Step 8 transpose if needed
            grid = transpose(squares);
        } else {
            grid = squares;
        }
        
        // Step 9 shift the blocks
        if (dir === RIGHT || dir === DOWN) {
            for (var r = 0; r < grid.length; r++) {
                for (var c = 0; c < grid[r].length - 1; c++) {
                    if (grid[r][c] !== 0 && (grid[r][c+1] === 0 || grid[r][c+1] === grid[r][c])) {
                        grid[r][c+1] += grid[r][c];
                        debug(grid[r][c+1]);
                        grid[r][c] = 0;
                    }
                }
            }
        }
        if (dir === UP || dir === LEFT) {
            for (var r = 0; r < grid.length; r++) {
                for (var c = grid[r].length - 1; c > 0; c--) {
                    if (grid[r][c] !== 0 && (grid[r][c-1] === 0 || grid[r][c-1] === grid[r][c])) {
                        grid[r][c-1] += grid[r][c];
                        grid[r][c] = 0;
                    }
                }
            }
        }
        
        if (dir === LEFT || dir === RIGHT) {
            squares = transpose(grid);
        } else {
            squares = grid;
        }
        
        createNewBlock();
        
    }
    
};

// Finish
var draw = function() {
    update();
    for(var row = 0; row < squares.length; row++) {
        for(var col = 0; col < squares[row].length; col++) {
            var x = row * bs;
            var y = col * bs;
            fill(255,255,255);
            rect(x, y, bs, bs);
            fill(0,0,0);
            text(squares[row][col], x + bs/2, y + bs/2);
        }
    }
};
