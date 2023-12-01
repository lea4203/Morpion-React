import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const calculateWinner = (squares) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsNext] = useState(true);
  const [scores, setScores] = useState([]);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    setIsNext(!isXNext);

    const updatedWinner = calculateWinner(newBoard);
    if (updatedWinner) {
      const newScores = [...scores, { player: updatedWinner, score: scores.filter((s) => s.player === updatedWinner).length + 1 }];
      setScores(newScores);
    }
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setIsNext(true);
  };

  const renderSquare = (index) => {
    const isWinnerSquare = winner && winner.includes(index);
    const squareClass = `square ${isWinnerSquare ? 'winner' : ''} ${board[index] || ''}`;
    return (
      <button
        className={squareClass}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="App">
        <div className="status">{status}</div>
        <div className="board-container">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
      <div>
        <h2>Score Board</h2>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.player}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleNewGame}>Nouvelle Partie</button>
    </div>
  );
}

export default App;
