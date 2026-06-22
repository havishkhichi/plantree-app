"use client";

import React, { useEffect, useState } from "react";

const CODE_SNIPPETS = [
  "const GDI = 0.4 * heat;",
  "function plantTree() {",
  "  return city.coolDown();",
  "}",
  "<MapLibreGL layer={heatMap} />",
  "SELECT * FROM hotspots;",
  "await supabase.from('cities')",
  "if (temp > 35) alert('Hot!');",
  "console.log('Vibe Coder');",
  "export const Havish = () => {",
  "import { Earth } from 'lucide';",
  "array.map(tree => grow())",
  "// Calculating Green Deficit",
  "{ status: 'coding' }",
  "const checkMate = true;"
];

export function AnimatedCodeBackground() {
  const [columns, setColumns] = useState<number>(0);

  useEffect(() => {
    // Determine how many columns can fit (approx 120px per column)
    const updateColumns = () => {
      const width = window.innerWidth;
      // We are in a sidebar, so assume max width is around 400px.
      setColumns(Math.floor(400 / 100)); 
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 select-none pointer-events-none z-0">
      <div className="flex justify-between w-full h-[200%] absolute top-0 left-0 animate-[slideUp_20s_linear_infinite]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 text-emerald-500 font-mono text-xs opacity-70 whitespace-nowrap" style={{ animationDelay: `${i * 1.5}s`, marginTop: `${(i % 3) * 40}px` }}>
            {/* Repeat snippets multiple times to fill vertical space */}
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="opacity-80 hover:opacity-100 transition-opacity">
                {CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Adding a keyframe animation locally */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}} />
      
      {/* Gradient fade out at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
    </div>
  );
}
