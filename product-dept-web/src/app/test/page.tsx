"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Sliders, 
  Terminal, 
  RefreshCw, 
  Power,
  Lock,
  Layers,
  Sparkles
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { BattleGameWrapper } from "@/components/pokemon-battle/battle-game-wrapper";

// Simulated telemetry log entries
const INITIAL_LOGS = [
  "[SYSTEM] INITIALIZING DECRYPTOR SERVICE...",
  "[SYSTEM] ESTABLISHING SECURE PROTOCOLS...",
  "[SECURITY] CREDENTIAL ACCESS GRANTED: [ROLE: LAB_ADMIN]",
  "[HARDWARE] CONNECTING TO POWER CELL A-100...",
  "[TELEMETRY] CELL CORE TEMP: 98.4°F (STABLE)",
  "[SYSTEM] LAB SIMULATOR READY."
];

export default function TestPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Unlocked State Variables
  const [simulationSpeed, setSimulationSpeed] = useState(50);
  const [loadFactor, setLoadFactor] = useState(42);
  const [systemActive, setSystemActive] = useState(true);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>(INITIAL_LOGS);
  const [activeSignal, setActiveSignal] = useState("OPTIMAL");
  const [coreTemp, setCoreTemp] = useState(98.4);
  const [voltage, setVoltage] = useState(1.24);

  const logContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (!isUnlocked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUnlocked]);

  // Telemetry simulator loop
  useEffect(() => {
    if (!isUnlocked || !systemActive) return;

    const interval = setInterval(() => {
      // Randomize telemetry slightly
      setCoreTemp(prev => {
        const factor = (simulationSpeed / 100) * 0.4;
        const change = (Math.random() - 0.5) * factor;
        const next = prev + change;
        return parseFloat(Math.min(Math.max(next, 95.0), 108.5).toFixed(1));
      });

      setVoltage(prev => {
        const change = (Math.random() - 0.5) * 0.02;
        const next = prev + change;
        return parseFloat(Math.min(Math.max(next, 1.15), 1.35).toFixed(2));
      });

      setLoadFactor(prev => {
        const change = Math.floor((Math.random() - 0.5) * 4);
        const next = prev + change;
        return Math.min(Math.max(next, 10), 99);
      });

      // Add a random log entry sometimes
      if (Math.random() > 0.6) {
        const statuses = ["OK", "STABLE", "SYNCED", "TRANSMITTING"];
        const modules = ["CORE", "SENSOR_GRID", "COMM_BUS", "BATTERY_CELL"];
        const randStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randModule = modules[Math.floor(Math.random() * modules.length)];
        const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
        
        const newLog = `[${timestamp}] [${randModule}] SIGNAL STATE: ${randStatus} | LOAD: ${Math.floor(Math.random() * 100)}%`;
        
        setTelemetryLogs(prev => {
          const nextLogs = [...prev, newLog];
          if (nextLogs.length > 50) nextLogs.shift(); // Keep last 50 logs
          return nextLogs;
        });
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isUnlocked, systemActive, simulationSpeed]);

  // Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [telemetryLogs]);

  // Handle password check
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isChecking) return;

    setIsChecking(true);
    setError(null);

    // Simulate high-tech credential processing delay
    setTimeout(() => {
      if (password === "oo") {
        setIsUnlocked(true);
        setError(null);
      } else {
        setError("INVALID ENCRYPTION KEY. ACCESS DENIED.");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
      setIsChecking(false);
    }, 600);
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPassword("");
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500 pt-[72px]">
      <section className="flex-grow w-full flex flex-col justify-center items-center px-4 md:px-8 py-12 relative overflow-hidden">
        {/* Dynamic Abstract Tech Background lines */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* PASSWORD CHECKPOINT VIEW */
            <motion.div
              key="checkpoint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="border-2 border-foreground bg-background p-8 md:p-10 shadow-2xl relative">
                {/* Decorative Tech Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-[2px] -translate-y-[2px]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-[2px] translate-y-[2px]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-foreground/20 rounded bg-foreground/5 text-primary">
                      <Lock size={18} />
                    </div>
                    <span className="font-header text-sm tracking-widest font-black uppercase text-foreground/55">
                      SECURE PORTAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-foreground/40 uppercase">
                    [ LEVEL_02 ]
                  </span>
                </div>

                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none mb-3">
                    ENTER PASSKEY
                  </h1>
                  <p className="text-xs font-sans text-foreground/60 leading-relaxed uppercase">
                    Authorized personnel only. Credentials are logged and monitored.
                  </p>
                </div>

                <motion.form 
                  onSubmit={handleSubmit}
                  animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-2 relative">
                    <label 
                      htmlFor="password" 
                      className="text-[10px] font-black tracking-widest uppercase text-foreground/60"
                    >
                      DECRYPT KEY
                    </label>
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isChecking}
                        placeholder="••••••••"
                        className="w-full border-2 border-foreground bg-background py-4 pl-4 pr-12 outline-none focus:bg-foreground/5 transition-all font-mono uppercase text-sm tracking-widest placeholder-foreground/20"
                        required
                        autoComplete="off"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-foreground/45">
                        {isChecking ? (
                          <RefreshCw size={18} className="animate-spin text-primary" />
                        ) : (
                          <span className="text-xs font-mono select-none">[*]</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-primary border border-primary/20 bg-primary/5 p-3 rounded"
                    >
                      <ShieldAlert size={16} className="shrink-0" />
                      <span className="font-mono text-[10px] tracking-wider font-semibold leading-tight">
                        {error}
                      </span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isChecking}
                    className="w-full bg-foreground text-background hover:bg-primary hover:text-white transition-colors py-4 font-black text-sm tracking-widest uppercase border border-transparent cursor-pointer"
                  >
                    {isChecking ? "DECRYPTING NODE..." : "AUTHENTICATE"}
                  </button>
                </motion.form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="battle-game"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 w-screen h-screen z-[60] overflow-hidden bg-background"
            >
              {/* Lock Button */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={handleLock}
                  className="flex items-center gap-1.5 border border-foreground/25 bg-background hover:bg-foreground hover:text-background px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase cursor-pointer rounded animate-pulse"
                >
                  <Lock size={10} />
                  LOCK NODE
                </button>
              </div>
              <BattleGameWrapper />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <Footer />
    </div>
  );
}
