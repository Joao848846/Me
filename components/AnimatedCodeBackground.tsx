import React, { useState, useEffect, useRef } from 'react';

const codeLines = [
  "import { FuturisticPortfolio } from '@you/amazing-skills';",
  " ",
  "const App = () => {",
  "  const [data, setData] = useState(null);",
  "  useEffect(() => {",
  "    fetchData('/api/projects').then(res => res.json()).then(setData);",
  "  }, []);",
  " ",
  "  return <Layout>",
  "           <Header title='João Victor' />",
  "           <HeroSection data={profileData} />",
  "           <ProjectGrid projects={data} />",
  "           <Footer />",
  "         </Layout>;",
  "};",
  " ",
  "// Initializing Quantum Entanglement...",
  "function connectToMatrix(nodeId) {",
  "  const quantumLink = establishSecureChannel(nodeId);",
  "  if (quantumLink.status === 'CONNECTED') {",
  "    console.log('System Online. Welcome, Architect.');",
  "    return quantumLink.stream;",
  "  } else {",
  "    throw new Error('Connection Failed: Reality Unstable');",
  "  }",
  "}",
  " ",
  "class NeuralNetwork {",
  "  constructor(layers) {",
  "    this.layers = layers;",
  "    this.weights = this.initializeWeights();",
  "  }",
  "  train(data, epochs) {",
  "    for(let i = 0; i < epochs; i++) {",
  "      // ... complex calculations ...",
  "      this.adjustParameters(data.loss);",
  "    }",
  "  }",
  "}",
  " ",
  "export default App;",
  "// System Ready. Awaiting Commands.",
  "// Compile sequence initiated.",
  "// Loading neural enhancers...",
];

const colors = [
  'text-green-400', // Keywords, functions
  'text-cyan-400',  // Variables, constants
  'text-purple-400',// Strings, types
  'text-yellow-500',// Numbers, operators
  'text-slate-500', // Comments
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

interface Line {
  id: number;
  text: string;
  fullText: string;
  color: string;
  isActive: boolean;
}

const AnimatedCodeBackground: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const linesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: number;

    const typeChar = () => {
      setLines(prevLines => {
        const currentLineId = lineIndexRef.current;
        let newLines = [...prevLines];

        // Update active status for all lines
        newLines = newLines.map(line => ({ ...line, isActive: line.id === currentLineId }));

        const currentLineIndexInState = newLines.findIndex(l => l.id === currentLineId);
        const currentFullTextLine = codeLines[currentLineId % codeLines.length];

        if (currentLineIndexInState === -1) { // New line
          if (newLines.length >= 20) { // Limit number of visible lines
            newLines.shift();
          }
          newLines.push({
            id: currentLineId,
            text: currentFullTextLine.charAt(0),
            fullText: currentFullTextLine,
            color: getRandomColor(),
            isActive: true,
          });
        } else { // Existing line, continue typing
          newLines = newLines.map(line =>
            line.id === currentLineId
              ? { ...line, text: line.fullText.substring(0, charIndexRef.current + 1), isActive: true }
              : line
          );
        }
        return newLines;
      });

      charIndexRef.current++;
      const currentCodeLine = codeLines[lineIndexRef.current % codeLines.length];
      if (charIndexRef.current >= currentCodeLine.length) {
        charIndexRef.current = 0;
        lineIndexRef.current++;
      }
      
      const nextDelay = Math.random() * 50 + 60; // Variable delay: 60ms to 110ms
      timeoutId = window.setTimeout(typeChar, nextDelay);
    };

    timeoutId = window.setTimeout(typeChar, Math.random() * 50 + 60); // Start with a variable delay

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (linesContainerRef.current) {
      linesContainerRef.current.scrollTop = linesContainerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div 
        aria-hidden="true"
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-30 md:opacity-45"
    >
      <div ref={linesContainerRef} className="absolute inset-0 overflow-hidden">
        <pre className="font-mono text-xs sm:text-sm p-4 leading-relaxed">
          {lines.map(line => (
            <div 
              key={line.id} 
              className={`${line.color} ${line.isActive ? 'bg-cyan-900/40' : ''} transition-all duration-150 ease-in-out`}
            >
              {line.text}
              {line.isActive && charIndexRef.current < line.fullText.length && <span className="animate-pulse">_</span>} {/* Blinking cursor only on active line and if not finished typing */}
              {!line.isActive && line.text.length === line.fullText.length && line.fullText.trim() !== "" && <span className="opacity-0">_</span>} {/* Placeholder for consistent height, hidden */}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default AnimatedCodeBackground;