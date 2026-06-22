"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flame, TreePine, CloudRain, Sun, Thermometer, ShieldAlert, Tractor, Trophy, RotateCcw } from "lucide-react";

type TileState = "concrete" | "tree" | "blocked" | "watered";

interface Tile {
  id: number;
  state: TileState;
  clicksRemaining: number;
}

export default function HeatIslandGame() {
  const [gameState, setGameState] = useState<"start" | "playing" | "won" | "lost">("start");
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [heatLevel, setHeatLevel] = useState<number>(50); // 0 to 100
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  
  // Audio references (optional, could use Web Audio API for simple beeps)
  const [message, setMessage] = useState<string>("Cool down the city!");

  // Initialize grid
  const initGame = () => {
    const initialTiles: Tile[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      state: "concrete",
      clicksRemaining: 0,
    }));
    setTiles(initialTiles);
    setHeatLevel(50);
    setScore(0);
    setTimeLeft(30);
    setGameState("playing");
    setMessage("Quick, plant trees!");
  };

  // Game Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });

      // Heat logic
      setTiles((currentTiles) => {
        const concreteCount = currentTiles.filter((t) => t.state === "concrete" || t.state === "blocked").length;
        const treeCount = currentTiles.filter((t) => t.state === "tree").length;

        // Increase heat based on concrete, decrease based on trees
        setHeatLevel((prevHeat) => {
          let newHeat = prevHeat + (concreteCount * 0.5) - (treeCount * 1.5);
          if (newHeat >= 100) {
            setGameState("lost");
            return 100;
          }
          if (newHeat <= 0) newHeat = 0;
          return newHeat;
        });

        // Randomly block tiles (The Angry Bulldozer/Zoning)
        if (Math.random() < 0.1 && currentTiles.some(t => t.state === "concrete")) {
           setMessage("Oh no! Zoning red tape!");
           const newTiles = [...currentTiles];
           const available = newTiles.filter(t => t.state === "concrete");
           if(available.length > 0) {
               const target = available[Math.floor(Math.random() * available.length)];
               const index = newTiles.findIndex(t => t.id === target.id);
               newTiles[index] = { ...newTiles[index], state: "blocked", clicksRemaining: 3 };
               return newTiles;
           }
        }
        
        // Randomly destroy trees
        if (Math.random() < 0.05 && currentTiles.some(t => t.state === "tree")) {
           setMessage("Bulldozer cleared a tree!");
           const newTiles = [...currentTiles];
           const trees = newTiles.filter(t => t.state === "tree");
           if(trees.length > 0) {
               const target = trees[Math.floor(Math.random() * trees.length)];
               const index = newTiles.findIndex(t => t.id === target.id);
               newTiles[index] = { ...newTiles[index], state: "concrete", clicksRemaining: 0 };
               return newTiles;
           }
        }

        return currentTiles;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  const endGame = () => {
    setGameState((prev) => {
       if (prev === "lost") return "lost";
       return "won";
    });
  };

  useEffect(() => {
    if(gameState === "playing" && tiles.length > 0 && tiles.every(t => t.state === "tree")) {
       setGameState("won");
    }
  }, [tiles, gameState]);

  const handleTileClick = (index: number) => {
    if (gameState !== "playing") return;

    setTiles((prev) => {
      const newTiles = [...prev];
      const tile = newTiles[index];

      if (tile.state === "concrete") {
        newTiles[index] = { ...tile, state: "tree" };
        setScore((s) => s + 10);
        setHeatLevel((h) => Math.max(0, h - 5));
      } else if (tile.state === "blocked") {
        if (tile.clicksRemaining > 1) {
          newTiles[index] = { ...tile, clicksRemaining: tile.clicksRemaining - 1 };
        } else {
          newTiles[index] = { ...tile, state: "concrete", clicksRemaining: 0 };
          setScore((s) => s + 5);
        }
      }
      return newTiles;
    });
  };

  const getHeatColor = () => {
    if (heatLevel > 80) return "bg-red-600";
    if (heatLevel > 60) return "bg-orange-500";
    if (heatLevel > 40) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 relative">
      {/* Header / HUD */}
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Thermometer className={`w-6 h-6 ${heatLevel > 80 ? "text-red-500 animate-pulse" : "text-yellow-400"}`} />
          <div className="w-32 h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${getHeatColor()}`}
              style={{ width: `${heatLevel}%` }}
            />
          </div>
        </div>
        
        <div className="text-xl font-bold font-mono bg-slate-900 px-4 py-1 rounded-lg border border-slate-700 text-green-400">
          00:{timeLeft.toString().padStart(2, "0")}
        </div>

        <div className="text-right text-sm text-slate-300 font-medium">
          Score: <span className="text-white text-lg font-bold">{score}</span>
        </div>
      </div>

      <div className="text-center py-2 bg-slate-900 text-yellow-300 text-sm font-semibold h-8 flex items-center justify-center">
        {gameState === "playing" ? message : ""}
      </div>

      {/* Game Grid */}
      <div className="p-6 bg-slate-900 relative">
        {gameState === "start" && (
          <div className="absolute inset-0 z-10 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <Flame className="w-20 h-20 text-orange-500 mb-4 animate-bounce" />
            <h2 className="text-4xl font-extrabold text-white mb-2">Heat Island Hero</h2>
            <p className="text-slate-300 mb-8 max-w-md">
              The concrete jungle is overheating! Tap the concrete to plant trees and cool down the city. Watch out for red tape and bulldozers!
            </p>
            <button
              onClick={initGame}
              className="px-8 py-4 bg-green-500 hover:bg-green-400 text-slate-900 font-bold rounded-full text-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all hover:scale-105"
            >
              Start Planting!
            </button>
          </div>
        )}

        {(gameState === "won" || gameState === "lost") && (
          <div className="absolute inset-0 z-10 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            {gameState === "won" ? (
              <Trophy className="w-24 h-24 text-yellow-400 mb-4 animate-bounce" />
            ) : (
              <Flame className="w-24 h-24 text-red-500 mb-4 animate-pulse" />
            )}
            
            <h2 className={`text-4xl font-extrabold mb-2 ${gameState === "won" ? "text-green-400" : "text-red-500"}`}>
              {gameState === "won" ? "City Saved!" : "City Overheated!"}
            </h2>
            
            <p className="text-slate-300 mb-6 text-lg">
              {gameState === "won" 
                ? "You planted lots of trees and made the city nice and cool! Everyone is happy now." 
                : "The city got too hot! We need to plant more trees faster."}
            </p>
            
            <div className="bg-slate-800 p-4 rounded-xl mb-8 border border-slate-700">
              <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Final Score</div>
              <div className="text-3xl font-bold text-white">{score}</div>
              <div className="text-sm mt-2 text-blue-400">
                GDI Improved By: {Math.max(0, 100 - heatLevel).toFixed(0)}%
              </div>
            </div>

            <button
              onClick={initGame}
              className="flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-full text-xl shadow-lg transition-all hover:scale-105"
            >
              <RotateCcw className="w-6 h-6" /> Play Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto aspect-square">
          {tiles.map((tile, index) => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(index)}
              disabled={gameState !== "playing" || tile.state === "tree"}
              className={`
                relative rounded-xl flex items-center justify-center transition-all duration-200 overflow-hidden
                ${tile.state === "concrete" ? "bg-slate-400 hover:bg-slate-300 shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]" : ""}
                ${tile.state === "tree" ? "bg-green-500 shadow-[inset_0_-4px_0_rgba(21,128,61,1)] scale-105" : ""}
                ${tile.state === "blocked" ? "bg-red-400 shadow-[inset_0_-4px_0_rgba(185,28,28,1)]" : ""}
              `}
            >
              {tile.state === "concrete" && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <Flame className={`w-8 h-8 text-orange-600 ${heatLevel > 70 ? 'animate-pulse' : ''}`} />
                </div>
              )}
              {tile.state === "tree" && (
                <TreePine className="w-12 h-12 text-green-900 animate-[bounce_0.5s_ease-out]" />
              )}
              {tile.state === "blocked" && (
                <div className="flex flex-col items-center">
                  <ShieldAlert className="w-8 h-8 text-red-900 mb-1" />
                  <span className="text-xs font-bold text-red-900 bg-red-300 px-1 rounded">{tile.clicksRemaining}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
