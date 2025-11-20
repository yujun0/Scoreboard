import React, { useState } from 'react';
import { Minus } from 'lucide-react';

const TeamScore = ({ name, score, onIncrement, onDecrement, onNameChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(name);

    const handleNameClick = () => {
        setIsEditing(true);
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        onNameChange(tempName);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col items-center p-5 bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 w-full max-w-[48%] transition-all duration-300 hover:border-gray-600/50">
            {isEditing ? (
                <form onSubmit={handleNameSubmit} className="mb-3 w-full">
                    <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={handleNameSubmit}
                        autoFocus
                        className="w-full bg-gray-700/80 text-white text-center text-xl font-bold py-2 rounded-lg border-2 border-blue-500 outline-none shadow-inner"
                    />
                </form>
            ) : (
                <h2
                    onClick={handleNameClick}
                    className="text-xl font-bold mb-3 text-gray-300 truncate w-full text-center cursor-pointer hover:text-white transition-colors select-none"
                >
                    {name}
                </h2>
            )}

            <div className="text-7xl font-black text-white mb-6 font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {score}
            </div>

            <div className="flex flex-col gap-3 w-full">
                {/* Primary Action: +2 */}
                <button
                    onClick={() => onIncrement(2)}
                    className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-3xl py-6 rounded-2xl shadow-lg shadow-blue-900/30 transition-all active:scale-95 active:shadow-inner border-t border-white/10"
                >
                    +2
                </button>

                <div className="grid grid-cols-2 gap-3">
                    {/* Secondary Action: +3 */}
                    <button
                        onClick={() => onIncrement(3)}
                        className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold text-xl py-4 rounded-xl shadow-lg shadow-purple-900/30 transition-all active:scale-95 active:shadow-inner border-t border-white/10"
                    >
                        +3
                    </button>

                    {/* Tertiary Action: +1 */}
                    <button
                        onClick={() => onIncrement(1)}
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold text-lg py-4 rounded-xl shadow-md transition-all active:scale-95 active:shadow-inner border-t border-white/5"
                    >
                        +1
                    </button>
                </div>

                {/* Correction */}
                <button
                    onClick={onDecrement}
                    className="mt-1 bg-transparent hover:bg-white/5 text-gray-500 hover:text-gray-400 text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                    <Minus size={14} /> Correction
                </button>
            </div>
        </div>
    );
};

const ScoreBoard = ({ teamA, teamB, setTeamA, setTeamB }) => {
    const updateTeamA = (points) => setTeamA(prev => ({ ...prev, score: Math.max(0, prev.score + points) }));
    const updateTeamB = (points) => setTeamB(prev => ({ ...prev, score: Math.max(0, prev.score + points) }));

    return (
        <div className="flex justify-between items-start gap-3 w-full mb-8">
            <TeamScore
                name={teamA.name}
                score={teamA.score}
                onIncrement={updateTeamA}
                onDecrement={() => updateTeamA(-1)}
                onNameChange={(name) => setTeamA(prev => ({ ...prev, name }))}
            />
            <div className="h-full flex items-center pt-20 text-gray-600 font-black text-2xl italic opacity-50 select-none">VS</div>
            <TeamScore
                name={teamB.name}
                score={teamB.score}
                onIncrement={updateTeamB}
                onDecrement={() => updateTeamB(-1)}
                onNameChange={(name) => setTeamB(prev => ({ ...prev, name }))}
            />
        </div>
    );
};

export default ScoreBoard;
