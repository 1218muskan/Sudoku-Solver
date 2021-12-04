let sudokuCell = document.querySelectorAll(".input-grid > input");
let ouputSudoku = document.querySelectorAll(".output-grid > input");
let board = [[".",".",".",".",".",".",".",".","."], 
             [".",".",".",".",".",".",".",".","."], 
             [".",".",".",".",".",".",".",".","."], 
             [".",".",".",".",".",".",".",".","."] , 
             [".",".",".",".",".",".",".",".","."], 
             [".",".",".",".",".",".",".",".","."], 
             [".",".",".",".",".",".",".",".","."], 
             [".",".",".",".",".",".",".",".","."], 
             [".",".",".",".",".",".",".",".","."]];


function resetSudoku(){
    window.location.reload();
}

function solveSudoku(){
    for(var i=0; i<81; i++)
    {
        var row= Math.floor(i/9);
        var col=i%9;
        board[row][col] = sudokuCell[i].value;
    }

    // if user enters the correct digits into the grid
    if(isCorrect()){
        solve();
        display();
    }
}

function isCorrect(){

    for(var i=0; i<9 ; i++){
        for(var j=0; j<9; j++){

            if(parseInt(board[i][j]) >9 || parseInt(board[i][j]) <1 ){
                alert("Enter valid number");
                return false;
            }
        }
    }

    for(var i=0; i<9 ; i++){
        for(var j=0; j<9; j++){

            if(board[i][j]!=''){

                if(!isSafe(i , j , board[i][j])){

                    console.log(isSafe(i , j , board[i][j]));
                    alert("Enter sudoku correctly.");
                    return false;
                }
            }
        }
    }

    return true;
}

function solve(){

    var row=0,col=0;
    var isEmpty=false;

    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){

            if(board[i][j]=== ""){ 
                row=i;
                col=j;
                isEmpty=true;
                break;
            }

        }
    }

    if(isEmpty===false) return true;

    for(var c=1;c<=9;c++){

        if( isSafe(row, col, c.toString() )){
            
            board[row][col]=c.toString();
            if(solve()) return true;
            board[row][col]="";
        }
    }
    return false;
}
    

function isSafe(row, col, num){ 
    
    // checking for row
    for(var i=0;i<9;i++){ 
        
        if(i!=col && board[row][i]===num){
            return false;
        }
         
    }

    // checking column
    for(var j=0;j<9;j++){
        
        if(j!=row && board[j][col]===num)
            return false;
    }
      
    // checking grid
    var boxRow= row-row%3;
    var boxCol= col-col%3;

    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){

            if((i+boxRow !=row) && (j+boxCol !=col) && board[i+boxRow][j+boxCol]===num)
                return false;
        }
    }
    
    return true;
}

function display(){
    for(var i=0; i<9; i++){
        for(var j=0 ; j<9 ; j++){

            var index = 9*i + j;
            if(sudokuCell[index].value!=""){
                ouputSudoku[index].style.color = "red";
            }

            ouputSudoku[index].value = board[i][j];
        }
    }
}
