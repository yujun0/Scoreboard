import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Timer = ({ initialTime = 600 }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editMinutes, setEditMinutes] = useState(Math.floor(initialTime / 60));
    const [editSeconds, setEditSeconds] = useState(initialTime % 60);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(editMinutes * 60 + editSeconds);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const newTime = (parseInt(editMinutes) || 0) * 60 + (parseInt(editSeconds) || 0);
        setTimeLeft(newTime);
        setIsEditing(false);
        setIsActive(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center w-full mb-8">
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-2xl w-full max-w-xs relative mb-6">
                {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="flex items-center justify-center gap-2 text-6xl font-mono font-black text-red-500">
                        <input
                            type="number"
                            value={editMinutes}
                            onChange={(e) => setEditMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-24 bg-gray-800/80 text-center rounded-lg p-2 outline-none focus:ring-2 ring-red-500 shadow-inner"
                        />
                        <span className="text-gray-500">:</span>
                        <input
                            type="number"
                            value={editSeconds}
                            onChange={(e) => setEditSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-24 bg-gray-800/80 text-center rounded-lg p-2 outline-none focus:ring-2 ring-red-500 shadow-inner"
                        />
                        <button type="submit" className="absolute -right-4 -bottom-4 bg-green-600 hover:bg-green-500 p-3 rounded-full shadow-lg transition-transform hover:scale-110">
                            <Play size={24} fill="white" />
                        </button>
                    </form>
                ) : (
                    <div
                        className={`text-6xl md:text-7xl font-mono font-black tracking-widest text-center cursor-pointer select-none transition-colors duration-300 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] overflow-hidden ${isActive ? 'text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]' : 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]'}`}
                        onClick={() => !isActive && setIsEditing(true)}
                    >
                        {formatTime(timeLeft)}
                    </div>
                )}
            </div>

            <div className="flex gap-4 w-full max-w-xs">
                <button
                    onClick={toggleTimer}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-xl transition-all active:scale-95 shadow-lg border-t border-white/10 ${isActive
                            ? 'bg-gradient-to-br from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-yellow-900/20'
                            : 'bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-green-900/20'
                        }`}
                >
                    {isActive ? <><Pause fill="currentColor" /> Pause</> : <><Play fill="currentColor" /> Start</>}
                </button>
                <button
                    onClick={resetTimer}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-xl bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all active:scale-95 shadow-lg border-t border-white/5"
                >
                    <RotateCcw />
                </button>
            </div>
        </div>
    );
};

export default Timer;
