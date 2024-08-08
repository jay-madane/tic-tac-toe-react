import { useState } from "react";

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsFirst, setXIsFirst] = useState(true);

    function handleClick(i){
        if(squares[i] || checkWinner(squares)) return;
        const newSquares = squares.slice();
        newSquares[i] = xIsFirst ? "X" : "O";
        setSquares(newSquares);
        setXIsFirst(!xIsFirst);
    }

    let status;
    const winner = checkWinner(squares);
    const isDraw = squares.every(square => square !== null);
    status = winner ? `Winner: ${winner}` : 
            isDraw ? "Draw!" : `Next Turn: ${xIsFirst ? "X" : "O"}`;

    return (
        <>
            <h1 className="status">{status}</h1>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button onClick={() => window.location.reload()} className="btn">Reset</button>
        </>
    );
}

function Square({
    value,
    onSquareClick
}){
    return (
        <button onClick={onSquareClick} className="square">{value}</button>
    );
}

function checkWinner(squares) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i=0; i<winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}