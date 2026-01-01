import { useState } from 'react';

const LogicPro: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [view, setView] = useState<'tracks' | 'mixer' | 'piano'>('tracks');

  const tracks = [
    { name: 'Kick', color: 'bg-red-600' },
    { name: 'Snare', color: 'bg-orange-500' },
    { name: 'Hi-Hat', color: 'bg-yellow-500' },
    { name: 'Bass', color: 'bg-blue-600' },
    { name: 'Synth Lead', color: 'bg-purple-600' },
    { name: 'Pad', color: 'bg-green-600' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
      {/* Toolbar */}
      <div className="h-10 bg-[#2d2d2d] flex items-center px-4 gap-2 text-sm">
        <button className="px-3 py-1 bg-[#3d3d3d] rounded">File</button>
        <button className="px-3 py-1 bg-[#3d3d3d] rounded">Edit</button>
        <button className="px-3 py-1 bg-[#3d3d3d] rounded">Track</button>
        <button className="px-3 py-1 bg-[#3d3d3d] rounded">Mix</button>
      </div>

      {/* Transport */}
      <div className="h-12 bg-[#252525] flex items-center justify-center gap-4 border-y border-[#3d3d3d]">
        <button className="text-xl">⏮️</button>
        <button onClick={() => setPlaying(!playing)} className="text-2xl">
          {playing ? '⏸️' : '▶️'}
        </button>
        <button className="text-xl">⏭️</button>
        <button 
          onClick={() => setRecording(!recording)}
          className={`text-2xl ${recording ? 'text-red-500' : ''}`}
        >
          ⏺️
        </button>
        <div className="ml-8 font-mono bg-black px-4 py-1 rounded">
          01:02:345
        </div>
        <div className="ml-4 flex gap-2">
          {(['tracks', 'mixer', 'piano'] as const).map(v => (
            <button 
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded capitalize ${view === v ? 'bg-blue-600' : 'bg-[#3d3d3d]'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Inspector */}
        <div className="w-56 bg-[#252525] border-r border-[#3d3d3d] p-3">
          <div className="text-xs text-gray-400 mb-2">INSPECTOR</div>
          <div className="bg-[#1a1a1a] rounded p-3 mb-3">
            <div className="text-sm font-medium mb-2">Track Settings</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Volume</span>
                <span>0 dB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pan</span>
                <span>C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          {view === 'tracks' && (
            <>
              {/* Timeline */}
              <div className="h-6 bg-[#2d2d2d] flex border-b border-[#3d3d3d]">
                <div className="w-40" />
                <div className="flex-1 flex">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div key={i} className="flex-1 border-l border-[#3d3d3d] text-[10px] text-gray-500 pl-1">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracks */}
              <div className="flex-1 overflow-auto">
                {tracks.map((track, i) => (
                  <div key={i} className="flex h-16 border-b border-[#3d3d3d]">
                    <div className="w-40 bg-[#252525] p-2 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${track.color}`} />
                      <span className="text-sm">{track.name}</span>
                    </div>
                    <div className="flex-1 bg-[#1a1a1a] relative">
                      <div className={`absolute top-1 bottom-1 left-0 w-1/3 ${track.color} opacity-50 rounded`} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === 'mixer' && (
            <div className="flex-1 flex items-end justify-center gap-4 p-8 bg-[#1a1a1a]">
              {tracks.map((track, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-48 bg-[#2d2d2d] rounded relative">
                    <div className={`absolute bottom-0 left-0 right-0 ${track.color} rounded-b`} 
                         style={{ height: `${60 + Math.random() * 30}%` }} />
                  </div>
                  <div className="text-xs truncate w-16 text-center">{track.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogicPro;
