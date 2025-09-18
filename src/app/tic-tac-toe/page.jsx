"use client";
import React, { useState } from "react";
import { IoLogoGameControllerB } from "react-icons/io";



export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return; // Prevent overwrite or play after win
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function renderSquare(index) {
    const isWinningSquare = winner && winner.line.includes(index);
    return (
      <button
        onClick={() => handleClick(index)}
        className={`w-24 h-24 text-3xl font-extrabold rounded-xl transition-all duration-300 flex items-center justify-center border-2 
          ${isWinningSquare ? "text-pink-600 scale-110" : "text-gray-800"}`}
        style={{
          background: isWinningSquare
            ? "linear-gradient(145deg, #ffe3f0, #f5b6d9)"
            : "linear-gradient(145deg, #ffffff, #dcdcdc)",
          boxShadow: isWinningSquare
            ? "0 0 20px rgba(236,72,153,0.8)"
            : "6px 6px 12px #b0b0b0, -6px -6px 12px #ffffff"
        }}
      >
        {board[index]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = `Winner: ${winner.player}`;
  } else if (!board.includes(null)) {
    status = "It's a Draw!";
  } else {
    status = `Next Player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div
      className="flex flex-col items-center space-y-6 p-6 min-h-screen"
      style={{
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-wide">
        <IoLogoGameControllerB className="inline mr-2" /> Tic-Tac-Toe
      </h1>

      <div className="grid grid-cols-3 gap-3 bg-white/80 p-6 rounded-2xl shadow-2xl">
        {board.map((_, i) => renderSquare(i))}
      </div>

      <p className="text-2xl text-white font-semibold drop-shadow-md">
        {status}
      </p>

      <button
        onClick={resetGame}
        className="px-6 py-3 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105"
        style={{
          background: "linear-gradient(145deg, #ff758c, #ff7eb3)",
          boxShadow: "6px 6px 15px rgba(255,105,135,0.6)"
        }}
      >
        🔄 Reset Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}
