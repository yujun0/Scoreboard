import React, { useState } from 'react';
import ScoreBoard from './components/ScoreBoard';
import Timer from './components/Timer';
import Controls from './components/Controls';

function App() {
  const [teamA, setTeamA] = useState({ name: 'Team A', score: 0 });
  const [teamB, setTeamB] = useState({ name: 'Team B', score: 0 });
  const [gameKey, setGameKey] = useState(0); // Used to force re-render/reset of Timer

  const handleResetGame = () => {
    setTeamA({ name: 'Team A', score: 0 });
    setTeamB({ name: 'Team B', score: 0 });
    setGameKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-start pt-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8 uppercase tracking-wider">Scoreboard</h1>

        <Timer key={gameKey} initialTime={600} />

        <ScoreBoard
          teamA={teamA}
          teamB={teamB}
          setTeamA={setTeamA}
          setTeamB={setTeamB}
        />

        <Controls onResetGame={handleResetGame} />
      </div>
    </div>
  );
}

export default App;
