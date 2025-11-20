import React from 'react';
import { RefreshCw } from 'lucide-react';

const Controls = ({ onResetGame }) => {
    return (
        <div className="mt-8 w-full flex justify-center">
            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to reset the entire game?')) {
                        onResetGame();
                    }
                }}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
                <RefreshCw size={18} /> Reset Game
            </button>
        </div>
    );
};

export default Controls;
