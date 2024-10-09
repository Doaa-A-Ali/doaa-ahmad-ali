import React, { useState, useCallback } from 'react';  

function TicTacToe() {  
  const [board, setBoard] = useState([  
    ['-', '-', '-'],  
    ['-', '-', '-'],
    ['-', '-', '-'],  
  ]);  
  const [currentPlayer, setCurrentPlayer] = useState('X');  
  const [isGameOver, setIsGameOver] = useState(false);  
  const [winner, setWinner] = useState(null);  

  const handleClick = useCallback((row, col) => {  
    if (isGameOver) {  
      return;  
    }  

    if (board[row][col] !== '-') {  
      alert("This cell is already chosen");  
      return;  
    }  

    const newBoard = board.map((r) => [...r]);  
    newBoard[row][col] = currentPlayer;  
    setBoard(newBoard);  

    const winner = checkWinner(newBoard);  
    if (winner) {  
      setWinner(winner);  
      setIsGameOver(true);  
    } else if (!newBoard.flat().includes('-')) {  
      setIsGameOver(true);  
    } else {  
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');  
    }  
  }, [board, currentPlayer, isGameOver]);  

  const checkWinner = (board) => {  
    const winningCombinations = [  
      [[0, 0], [0, 1], [0, 2]],  
      [[1, 0], [1, 1], [1, 2]],  
      [[2, 0], [2, 1], [2, 2]],  
      [[0, 0], [1, 0], [2, 0]],  
      [[0, 1], [1, 1], [2, 1]],  
      [[0, 2], [1, 2], [2, 2]],  
      [[0, 0], [1, 1], [2, 2]],  
      [[0, 2], [1, 1], [2, 0]],  
    ];  

    for (const combination of winningCombinations) {  
      const [a, b, c] = combination;  
      if (  
        board[a[0]][a[1]] !== '-' &&  
        board[a[0]][a[1]] === board[b[0]][b[1]] &&  
        board[a[0]][a[1]] === board[c[0]][c[1]]  
      ) {  
        return board[a[0]][a[1]];  
      }  
    }  
    return undefined;  
  };  

  const resetGame = () => {  
    setBoard([  
      ['-', '-', '-'],  
      ['-', '-', '-'],  
      ['-', '-', '-'],  
    ]);  
    setCurrentPlayer('X');  
    setIsGameOver(false);  
    setWinner(null);  
  };  

  const renderBoard = () => {  
    return board.map((row, rowIndex) => (  
      <div key={rowIndex} className="flex">  
        {row.map((cell, colIndex) => (  
          <div  
            key={colIndex}  
            onClick={() => !isGameOver && handleClick(rowIndex, colIndex)}  
            className={`w-20 h-20 flex items-center justify-center border-4 border-gray-200 rounded-lg cursor-pointer 
              duration-200 ease-in-out transform ${cell === 'X' ? 'bg-purple-400 text-white' : cell === 'O' ? 'bg-blue-400 text-white' : 'bg-white'} hover:scale-105 hover:shadow-lg`}  
          >  
            {cell}  
            
          </div>  
        ))}  
      </div>  
    ));  
  };  

  return (  
    <div className="h-screen w-screen fixed flex items-center justify-center bg-purple-200">  
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">  
        <h1 className="text-4xl font-bold italic mb-6 text-center text-purple-600">Tic Tac Toe</h1>  

        {isGameOver && winner && (  
          <h2 className="text-2xl font-bold text-center text-blue-300 ">{`🎉 ${winner} wins! 🎉`}</h2>  
        )}  
        {isGameOver && !winner && (  
          <h2 className="text-2xl font-bold text-center text-rose-400 "> Game Over 🤝 </h2>  
        )}  

        <div className="board flex flex-col justify-center items-center">  
          {renderBoard()}  
          <button  
            onClick={resetGame}  
            className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-200 ease-in-out shadow-lg"  
          >  
            Restart Game 
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}  

export default TicTacToe;