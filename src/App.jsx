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
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-500 mb-6 uppercase tracking-widest">Scoreboard</h1>

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
