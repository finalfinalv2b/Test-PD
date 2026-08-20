import { useState } from 'react';
import { useGameStore, getActiveQuestions } from './game-store';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sliders, Sparkles, HelpCircle } from 'lucide-react';

// Custom SVG-based Trainer artwork component
function TrainerArtwork({ name }: { name: string }) {
  switch (name) {
    case 'Nurse Joy':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#ffe4e6" />
          <path d="M60,90 C50,80 40,70 40,58 C40,48 48,40 58,40 C60,40 60,42 60,42 C60,42 60,40 62,40 C72,40 80,48 80,58 C80,70 70,80 60,90 Z" fill="#fda4af" opacity="0.6" />
          <rect x="57" y="50" width="6" height="16" fill="#f43f5e" rx="1" />
          <rect x="52" y="55" width="16" height="6" fill="#f43f5e" rx="1" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 35,90 40,75 Q 45,60 60,60 Q 75,60 80,75 Q 85,90 70,112 C 82,115 95,130 95,160 Z" fill="#fb7185" stroke="#ffe4e6" strokeWidth="1" />
          <circle cx="38" cy="80" r="12" fill="#fb7185" />
          <circle cx="82" cy="80" r="12" fill="#fb7185" />
          <circle cx="38" cy="80" r="7" fill="#ffe4e6" />
          <circle cx="82" cy="80" r="7" fill="#ffe4e6" />
          <path d="M 50,60 Q 60,52 70,60 L 68,54 L 52,54 Z" fill="#ffffff" stroke="#fb7185" strokeWidth="1" />
          <text x="60" y="59" textAnchor="middle" fill="#fb7185" fontSize="6" fontWeight="bold">+</text>
        </svg>
      );
    case 'Brock':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#fef3c7" />
          <polygon points="25,95 40,65 55,95" fill="#d97706" opacity="0.4" />
          <polygon points="65,95 80,55 95,95" fill="#d97706" opacity="0.3" />
          <polygon points="45,95 65,45 85,95" fill="#b45309" opacity="0.5" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 40,88 45,72 C 43,65 48,52 60,52 C72,52 77,65 75,72 Q 80,88 70,112 C 82,115 95,130 95,160 Z" fill="#78350f" stroke="#d97706" strokeWidth="1" />
          <path d="M 45,72 L 40,65 L 48,68 L 46,58 L 54,64 L 56,52 L 64,52 L 66,64 L 74,58 L 72,68 L 80,65 L 75,72 Z" fill="#78350f" />
        </svg>
      );
    case 'Misty':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#e0f2fe" />
          <circle cx="40" cy="55" r="6" fill="#38bdf8" opacity="0.4" />
          <circle cx="85" cy="80" r="10" fill="#38bdf8" opacity="0.3" />
          <circle cx="75" cy="45" r="4" fill="#38bdf8" opacity="0.5" />
          <path d="M 25,160 C 25,130 40,115 50,112 Q 42,90 48,72 Q 54,58 64,58 Q 74,58 78,72 Q 82,90 70,112 C 80,115 95,130 95,160 Z" fill="#f97316" stroke="#0ea5e9" strokeWidth="1" />
          <path d="M 46,75 C 32,70 24,55 30,48 C 36,42 45,55 46,65 Z" fill="#f97316" />
          <rect x="43" y="66" width="5" height="3" fill="#0ea5e9" rx="0.5" />
        </svg>
      );
    case 'Koga':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#f3e8ff" />
          <path d="M 60,35 L 65,55 L 85,60 L 65,65 L 60,85 L 55,65 L 35,60 L 55,55 Z" fill="#a855f7" opacity="0.3" />
          <path d="M 25,160 C 25,135 38,115 50,110 Q 42,90 48,72 C 45,62 50,54 60,54 C70,54 75,62 72,72 Q 78,90 70,110 C 82,115 95,135 95,160 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
          <path d="M 48,72 L 43,65 L 52,68 L 50,58 L 58,63 L 60,50 L 62,63 L 70,58 L 68,68 L 77,65 L 72,72 Z" fill="#3b0764" />
          <path d="M 50,110 Q 35,115 25,130 Q 38,125 50,115" fill="#a855f7" />
          <path d="M 70,110 Q 85,115 95,130 Q 82,125 70,115" fill="#a855f7" />
        </svg>
      );
    case 'Flannery':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#ffedd5" />
          <path d="M 60,35 Q 75,55 68,75 Q 85,60 85,85 Q 85,105 60,110 Q 35,105 35,85 Q 35,65 52,75 Q 45,55 60,35 Z" fill="#f97316" opacity="0.4" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 40,90 48,72 C 42,65 48,50 60,50 C72,50 78,65 72,72 Q 80,90 70,112 C 82,115 95,130 95,160 Z" fill="#ea580c" stroke="#f97316" strokeWidth="1" />
          <path d="M 60,50 Q 80,25 95,30 Q 90,50 72,58 Z" fill="#ea580c" />
          <circle cx="68" cy="46" r="4" fill="#ef4444" />
        </svg>
      );
    case 'Cynthia':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#faf5ff" />
          <g fill="#d97706" opacity="0.5">
            <polygon points="35,45 37,50 42,50 38,53 40,58 35,55 30,58 32,53 28,50 33,50" />
            <polygon points="85,40 87,45 92,45 88,48 90,53 85,50 80,53 82,48 78,45 83,45" />
            <polygon points="40,95 42,100 47,100 43,103 45,108 40,105 35,108 37,103 33,100 38,100" />
          </g>
          <path d="M 20,160 C 20,125 35,115 50,110 Q 42,88 48,72 C 45,62 50,54 60,54 C70,54 75,62 72,72 Q 78,88 70,110 C 85,115 100,125 100,160 Z" fill="#1e1b4b" stroke="#d97706" strokeWidth="1" />
          <path d="M 32,72 Q 35,105 25,140 Q 38,125 45,105" fill="#fef08a" />
          <path d="M 88,72 Q 85,105 95,140 Q 82,125 75,105" fill="#fef08a" />
          <path d="M 48,72 Q 54,100 56,105 M 72,72 Q 66,100 64,105" stroke="#fef08a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <rect x="25" y="75" width="10" height="5" fill="#111827" transform="rotate(-15, 25, 75)" rx="1.5" stroke="#d97706" strokeWidth="0.5" />
          <rect x="85" y="75" width="10" height="5" fill="#111827" transform="rotate(15, 85, 75)" rx="1.5" stroke="#d97706" strokeWidth="0.5" />
        </svg>
      );
    case 'Volkner':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#fffbeb" />
          <polygon points="65,25 45,65 60,65 50,105 80,55 65,55" fill="#fbbf24" opacity="0.4" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 40,88 45,72 C 43,65 48,52 60,52 C72,52 77,65 75,72 Q 80,88 70,112 C 82,115 95,130 95,160 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="1" />
          <path d="M 45,72 L 38,62 L 48,68 L 44,52 L 54,62 L 56,44 L 64,44 L 66,62 L 76,52 L 72,68 L 82,62 L 75,72 Z" fill="#eab308" />
        </svg>
      );
    case 'Sabrina':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#faf5ff" />
          <circle cx="60" cy="65" r="15" fill="none" stroke="#c084fc" strokeWidth="2.5" />
          <circle cx="60" cy="65" r="6" fill="#a855f7" />
          <path d="M 35,65 Q 60,40 85,65 Q 60,90 35,65 Z" fill="none" stroke="#c084fc" strokeWidth="2" />
          <path d="M 25,160 C 25,125 38,115 50,110 Q 42,88 48,72 C 45,62 50,54 60,54 C70,54 75,62 72,72 Q 78,88 70,110 C 82,115 95,125 95,160 Z" fill="#1e1e2e" stroke="#c084fc" strokeWidth="1" />
          <path d="M 32,72 L 32,150 L 45,110 Z" fill="#0ea5e9" />
          <path d="M 88,72 L 88,150 L 75,110 Z" fill="#0ea5e9" />
        </svg>
      );
    case 'Blaine':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#fff5f5" />
          <circle cx="45" cy="50" r="8" fill="#f87171" opacity="0.3" />
          <circle cx="75" cy="45" r="12" fill="#f87171" opacity="0.2" />
          <circle cx="80" cy="85" r="6" fill="#f87171" opacity="0.4" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,90 48,72 C 48,60 52,55 60,55 C68,55 72,60 72,72 Q 78,90 70,112 C 82,115 95,130 95,160 Z" fill="#d97706" stroke="#ef4444" strokeWidth="1" />
          <rect x="44" y="66" width="14" height="7" fill="#1e293b" rx="1" />
          <rect x="62" y="66" width="14" height="7" fill="#1e293b" rx="1" />
          <line x1="58" y1="69" x2="62" y2="69" stroke="#1e293b" strokeWidth="2" />
          <path d="M 42,85 Q 60,70 78,85 Q 60,95 42,85" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
        </svg>
      );
    case 'Candice':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#f0f9ff" />
          <path d="M60,30 L60,110 M20,70 L100,70 M31.7,41.7 L88.3,98.3 M31.7,98.3 L88.3,41.7" stroke="#38bdf8" strokeWidth="2.5" opacity="0.3" strokeLinecap="round" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,90 48,72 C 45,62 50,55 60,55 C70,55 75,62 72,72 Q 78,90 70,112 C 82,115 95,130 95,160 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          <path d="M 38,72 C 28,80 15,100 18,115 C 22,125 35,110 42,85" fill="#1e293b" />
          <path d="M 82,72 C 92,80 105,100 102,115 C 98,125 85,110 78,85" fill="#1e293b" />
          <circle cx="41" cy="76" r="3.5" fill="#38bdf8" />
          <circle cx="79" cy="76" r="3.5" fill="#38bdf8" />
        </svg>
      );
    case 'Wallace':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#f0fdfa" />
          <path d="M 25,50 Q 40,40 55,50 T 85,50 T 95,50 M 25,85 Q 40,75 55,85 T 85,85" stroke="#2dd4bf" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,88 48,72 C 45,62 50,54 60,54 C70,54 75,62 72,72 Q 78,88 70,112 C 82,115 95,130 95,160 Z" fill="#0d9488" stroke="#2dd4bf" strokeWidth="1" />
          <path d="M 45,55 Q 60,40 75,55 L 70,60 L 50,60 Z" fill="#ffffff" stroke="#0d9488" strokeWidth="1" />
          <rect x="53" y="56" width="14" height="3" fill="#2dd4bf" />
        </svg>
      );
    case 'Giovanni':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#ecfdf5" />
          <polygon points="20,105 45,55 70,105" fill="#065f46" opacity="0.3" />
          <polygon points="50,105 75,45 100,105" fill="#065f46" opacity="0.4" />
          <path d="M 20,160 C 20,130 35,115 50,110 Q 45,90 48,72 C 45,62 52,54 60,54 C68,54 75,62 72,72 Q 75,90 70,110 C 85,115 100,130 100,160 Z" fill="#292524" stroke="#065f46" strokeWidth="1" />
          <path d="M 48,72 Q 60,58 72,72" fill="#78716c" />
          <polygon points="58,118 62,118 64,135 60,140 56,135" fill="#ea580c" />
        </svg>
      );
    case 'Erika':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#f0fdf4" />
          <path d="M35,45 Q40,35 45,45 T55,45" fill="#f472b6" opacity="0.4" />
          <path d="M75,55 Q80,45 85,55 T95,55" fill="#f472b6" opacity="0.3" />
          <circle cx="35" cy="85" r="6" fill="#f472b6" opacity="0.3" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,90 48,75 C 45,65 50,58 60,58 C70,58 75,65 72,75 Q 78,90 70,112 C 82,115 95,130 95,160 Z" fill="#1e3a8a" stroke="#10b981" strokeWidth="1" />
          <path d="M 43,75 Q 40,100 48,112 L 53,112 Z" fill="#1e293b" />
          <path d="M 77,75 Q 80,100 72,112 L 67,112 Z" fill="#1e293b" />
          <path d="M 46,65 Q 60,56 74,65" stroke="#eab308" strokeWidth="3" fill="none" />
        </svg>
      );
    case 'Bruno':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#fff7ed" />
          <circle cx="60" cy="75" r="32" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.4" />
          <line x1="30" y1="45" x2="90" y2="105" stroke="#ea580c" strokeWidth="1" opacity="0.3" />
          <line x1="90" y1="45" x2="30" y2="105" stroke="#ea580c" strokeWidth="1" opacity="0.3" />
          <path d="M 25,160 C 25,125 38,115 50,110 Q 42,90 48,72 Q 45,60 60,60 Q 75,60 72,72 Q 78,90 70,110 C 82,115 95,125 95,160 Z" fill="#9a3412" stroke="#ea580c" strokeWidth="1.5" />
          <path d="M 45,72 L 30,55 L 48,65 L 40,40 L 55,58 L 60,30 L 65,58 L 80,40 L 72,65 L 90,55 L 75,72 Z" fill="#1e293b" />
          <path d="M 47,68 Q 60,61 73,68" stroke="#ef4444" strokeWidth="2.5" fill="none" />
        </svg>
      );
    case 'Lance':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#faf5ff" />
          <path d="M 15,60 Q 35,40 50,65 Q 40,85 20,80 Z" fill="#581c87" opacity="0.3" />
          <path d="M 105,60 Q 85,40 70,65 Q 80,85 100,80 Z" fill="#581c87" opacity="0.3" />
          <path d="M 25,160 C 25,125 38,115 50,112 Q 40,88 45,72 C 43,65 48,52 60,52 C72,52 77,65 75,72 Q 80,88 70,112 C 82,115 95,125 95,160 Z" fill="#991b1b" stroke="#581c87" strokeWidth="1" />
          <path d="M 45,72 L 38,62 L 48,68 L 44,52 L 54,62 L 56,44 L 64,44 L 66,62 L 76,52 L 72,68 L 82,62 L 75,72 Z" fill="#dc2626" />
          <path d="M 30,120 L 42,102 L 50,115 Z" fill="#1e1b4b" stroke="#dc2626" strokeWidth="0.5" />
          <path d="M 90,120 L 78,102 L 70,115 Z" fill="#1e1b4b" stroke="#dc2626" strokeWidth="0.5" />
        </svg>
      );
    case 'Dawn':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#ecfeff" />
          <circle cx="35" cy="55" r="5" fill="#f43f5e" opacity="0.4" />
          <circle cx="43" cy="58" r="4" fill="#f43f5e" opacity="0.4" />
          <path d="M 35,55 Q 40,45 43,58" stroke="#10b981" strokeWidth="1" fill="none" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,90 48,72 C 45,62 50,55 60,55 C70,55 75,62 72,72 Q 78,90 70,112 C 82,115 95,130 95,160 Z" fill="#1e3a8a" stroke="#0891b2" strokeWidth="1" />
          <path d="M 45,62 Q 60,45 75,62 L 70,68 L 50,68 Z" fill="#ffffff" stroke="#f43f5e" strokeWidth="0.5" />
          <circle cx="60" cy="57" r="4" fill="#f43f5e" />
          <circle cx="60" cy="57" r="1.5" fill="#ffffff" />
        </svg>
      );
    case 'Ash':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#eff6ff" />
          <path d="M 30,50 L 35,40 L 40,50 L 30,50 Z M 85,90 L 90,80 L 95,90 L 85,90 Z" fill="#eab308" opacity="0.4" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,88 48,72 C 45,62 50,55 60,55 C70,55 75,62 72,72 Q 78,88 70,112 C 82,115 95,130 95,160 Z" fill="#1e40af" stroke="#ef4444" strokeWidth="1" />
          <path d="M 46,62 Q 60,48 74,62" fill="#ef4444" />
          <path d="M 48,66 Q 60,55 72,66 L 75,72 Q 60,65 45,72 Z" fill="#ffffff" />
          <path d="M 57,62 C 57,59 63,59 63,62" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'Red':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#fff1f2" />
          <polygon points="60,35 63,45 73,45 65,52 68,62 60,55 52,62 55,52 47,45 57,45" fill="#fbbf24" opacity="0.5" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,88 48,72 C 45,62 50,55 60,55 C70,55 75,62 72,72 Q 78,88 70,112 C 82,115 95,130 95,160 Z" fill="#1f2937" stroke="#ef4444" strokeWidth="1" />
          <path d="M 46,62 Q 60,48 74,62" fill="#ef4444" />
          <path d="M 48,66 Q 60,55 72,66 L 75,72 Q 60,65 45,72 Z" fill="#ffffff" />
        </svg>
      );
    case 'Professor Oak':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#f8fafc" />
          <path d="M 35,60 C 45,55 55,60 60,65 C 65,60 75,55 85,60 L 85,80 C 75,75 65,80 60,85 C 55,80 45,75 35,80 Z" fill="#cbd5e1" opacity="0.5" stroke="#94a3b8" strokeWidth="1" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,90 48,72 C 45,60 50,52 60,52 C70,52 75,60 72,72 Q 78,90 70,112 C 82,115 95,130 95,160 Z" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 48,112 L 55,135 L 60,120 L 65,135 L 72,112 Z" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
        </svg>
      );
    case 'Team Rocket':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <defs>
            <radialGradient id="trGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="75" r="42" fill="url(#trGrad)" />
          <text x="60" y="95" textAnchor="middle" fill="#ef4444" fontSize="56" fontWeight="900" fontFamily="sans-serif" opacity="0.8">R</text>
          <path d="M20,160 C20,135 35,115 50,110 C50,110 52,100 48,95 C45,90 38,70 52,50 C56,44 64,44 68,50 C82,70 75,90 72,95 C68,100 70,110 70,110 C85,115 100,135 100,160 Z" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
          <path d="M 45,62 Q 60,55 75,62" stroke="#ef4444" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'Jasmine':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#f1f5f9" />
          <line x1="20" y1="30" x2="100" y2="130" stroke="#94a3b8" strokeWidth="4" opacity="0.3" />
          <line x1="100" y1="30" x2="20" y2="130" stroke="#94a3b8" strokeWidth="4" opacity="0.3" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,90 48,72 Q 45,62 55,62 Q 65,62 68,72 Q 74,90 70,112 C 82,115 95,130 95,160 Z" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="43" cy="68" r="4" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
          <circle cx="77" cy="68" r="4" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        </svg>
      );
    case 'Falkner':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#f0f9ff" />
          <path d="M 15,60 C 30,50 45,55 50,70 C 40,80 25,75 15,60 Z" fill="#bae6fd" opacity="0.4" />
          <path d="M 105,60 C 90,50 75,55 70,70 C 80,80 95,75 105,60 Z" fill="#bae6fd" opacity="0.4" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,88 48,72 C 45,62 50,55 60,55 C70,55 75,62 72,72 Q 78,88 70,112 C 82,115 95,130 95,160 Z" fill="#0369a1" stroke="#0ea5e9" strokeWidth="1" />
          <path d="M 62,55 Q 70,35 80,42 Q 72,55 65,58 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="0.5" />
        </svg>
      );
    case 'Valerie':
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#fdf2f8" />
          <path d="M 60,70 C 45,50 25,55 35,75 C 45,85 55,75 60,70 Z" fill="#fbcfe8" opacity="0.5" />
          <path d="M 60,70 C 75,50 95,55 85,75 C 75,85 65,75 60,70 Z" fill="#fbcfe8" opacity="0.5" />
          <path d="M 60,70 C 50,85 35,90 40,105 C 48,110 55,95 60,70 Z" fill="#fbcfe8" opacity="0.4" />
          <path d="M 60,70 C 70,85 85,90 80,105 C 72,110 65,95 60,70 Z" fill="#fbcfe8" opacity="0.4" />
          <path d="M 25,160 C 25,130 38,115 50,112 Q 42,90 48,72 Q 45,62 55,62 Q 65,62 68,72 Q 74,90 70,112 C 82,115 95,130 95,160 Z" fill="#db2777" stroke="#fbcfe8" strokeWidth="1" />
          <path d="M 32,112 C 15,120 10,140 12,160 C 25,155 35,135 38,115 Z" fill="#f472b6" />
          <path d="M 88,112 C 105,120 110,140 108,160 C 95,155 85,135 82,115 Z" fill="#f472b6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <circle cx="60" cy="75" r="42" fill="#e2e8f0" />
          <HelpCircle className="w-16 h-16 text-slate-400 absolute inset-0 m-auto" />
        </svg>
      );
  }
}

export function QuizScreen() {
  const { 
    currentQuestionIndex, 
    recommendationWeights,
    setRecommendationWeights,
    selectTrainer,
    resetGame,
    userMode
  } = useGameStore();

  const [weightsOpen, setWeightsOpen] = useState(false);
  const activeQuestions = getActiveQuestions(userMode);
  const currentQuestion = activeQuestions[currentQuestionIndex];

  // Helper to handle weight sliders and automatically normalize values in view
  const handleWeightChange = (key: 'craving' | 'quality' | 'distance' | 'popularity', value: number) => {
    setRecommendationWeights({ [key]: value });
  };

  const totalWeights = recommendationWeights.craving + recommendationWeights.quality + recommendationWeights.distance + recommendationWeights.popularity;

  const displayPercent = (val: number) => {
    if (totalWeights === 0) return '0%';
    return `${Math.round((val / totalWeights) * 100)}%`;
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4 px-4 py-4 text-foreground font-mono select-none">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-primary/20 pb-3">
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 text-xs font-bold text-primary/70 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          LEAVE RIVALRY
        </button>
        <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full text-[10px] font-bold text-primary border border-primary/10">
          🎮 RIVAL MATCHUP {currentQuestionIndex + 1}/{activeQuestions.length}
        </div>
      </div>

      {/* Progress Path */}
      <div className="w-full flex justify-between gap-1 items-center bg-foreground/[0.02] border border-foreground/5 p-2.5 rounded-xl">
        {activeQuestions.map((q, idx) => {
          const isActive = idx === currentQuestionIndex;
          const isAnswered = idx < currentQuestionIndex;
          return (
            <div
              key={q.id}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-primary scale-y-110 shadow-[0_0_6px_var(--primary)]' 
                  : isAnswered 
                  ? 'bg-foreground/60' 
                  : 'bg-foreground/10'
              }`}
            />
          );
        })}
      </div>

      {/* Question Text */}
      <div className="text-center py-2 px-1">
        <span className="text-[9px] text-primary font-black tracking-widest uppercase block mb-1">
          DECIDE YOUR PATH
        </span>
        <h3 className="text-base md:text-lg font-black uppercase tracking-tight leading-snug text-foreground">
          {currentQuestion.question}
        </h3>
      </div>

      {/* Side-by-Side Matchup Board */}
      <div className="grid grid-cols-2 gap-4 items-stretch py-1 relative">
        {/* Versus absolute element overlay */}
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="w-11 h-11 rounded-full border-4 border-foreground bg-primary text-white font-black flex items-center justify-center shadow-[0_3px_0_#000] text-xs transform -rotate-12 animate-pulse">
            VS
          </div>
        </div>

        {/* TRAINER A CARD */}
        <motion.div
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => selectTrainer('A')}
          className="flex flex-col border-4 border-foreground bg-background rounded-3xl overflow-hidden shadow-[0_5px_0_#000] cursor-pointer group text-left relative"
        >
          {/* Card element gradient banner */}
          <div className={`h-2.5 w-full bg-gradient-to-r ${currentQuestion.optionA.theme} border-b-2 border-foreground`} />
          
          {/* Visual container */}
          <div className="p-3 bg-foreground/[0.01] flex-grow flex flex-col justify-between">
            {/* Trainer Title Row */}
            <div className="flex justify-between items-baseline mb-1 border-b border-foreground/15 pb-1">
              <span className="font-header font-black text-xs uppercase text-foreground leading-none tracking-tight">
                {currentQuestion.optionA.trainerName}
              </span>
              <span className="text-[8px] font-bold text-foreground/45">
                {currentQuestion.optionA.symbol}
              </span>
            </div>

            {/* Styled Character Window */}
            <div className={`border-2 border-foreground rounded-2xl overflow-hidden h-36 bg-gradient-to-b ${currentQuestion.optionA.theme} opacity-90 group-hover:opacity-100 transition-opacity flex items-end justify-center relative shadow-inner`}>
              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
              <TrainerArtwork name={currentQuestion.optionA.trainerName} />
            </div>

            {/* Description */}
            <div className="mt-2 text-center">
              <span className="text-[10px] font-bold text-foreground/50 uppercase block leading-none">
                TRAINER ATTITUDE
              </span>
              <span className="text-[11px] font-black text-foreground uppercase mt-1 block leading-tight">
                {currentQuestion.optionA.descriptor}
              </span>
            </div>

            {/* Selection Button */}
            <button className="w-full mt-3 border-2 border-foreground bg-emerald-100 hover:bg-emerald-200 transition-colors py-2 rounded-xl text-[10px] font-black uppercase text-foreground flex items-center justify-center gap-1 cursor-pointer shadow-[0_2.5px_0_#000] active:translate-y-0.5 active:shadow-none">
              {currentQuestion.optionA.buttonText}
            </button>
          </div>
        </motion.div>

        {/* TRAINER B CARD */}
        <motion.div
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => selectTrainer('B')}
          className="flex flex-col border-4 border-foreground bg-background rounded-3xl overflow-hidden shadow-[0_5px_0_#000] cursor-pointer group text-left relative"
        >
          {/* Card element gradient banner */}
          <div className={`h-2.5 w-full bg-gradient-to-r ${currentQuestion.optionB.theme} border-b-2 border-foreground`} />
          
          {/* Visual container */}
          <div className="p-3 bg-foreground/[0.01] flex-grow flex flex-col justify-between">
            {/* Trainer Title Row */}
            <div className="flex justify-between items-baseline mb-1 border-b border-foreground/15 pb-1">
              <span className="font-header font-black text-xs uppercase text-foreground leading-none tracking-tight">
                {currentQuestion.optionB.trainerName}
              </span>
              <span className="text-[8px] font-bold text-foreground/45">
                {currentQuestion.optionB.symbol}
              </span>
            </div>

            {/* Styled Character Window */}
            <div className={`border-2 border-foreground rounded-2xl overflow-hidden h-36 bg-gradient-to-b ${currentQuestion.optionB.theme} opacity-90 group-hover:opacity-100 transition-opacity flex items-end justify-center relative shadow-inner`}>
              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
              <TrainerArtwork name={currentQuestion.optionB.trainerName} />
            </div>

            {/* Description */}
            <div className="mt-2 text-center">
              <span className="text-[10px] font-bold text-foreground/50 uppercase block leading-none">
                TRAINER ATTITUDE
              </span>
              <span className="text-[11px] font-black text-foreground uppercase mt-1 block leading-tight">
                {currentQuestion.optionB.descriptor}
              </span>
            </div>

            {/* Selection Button */}
            <button className="w-full mt-3 border-2 border-foreground bg-rose-100 hover:bg-rose-200 transition-colors py-2 rounded-xl text-[10px] font-black uppercase text-foreground flex items-center justify-center gap-1 cursor-pointer shadow-[0_2.5px_0_#000] active:translate-y-0.5 active:shadow-none">
              {currentQuestion.optionB.buttonText}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Accordion Settings Weights Slider Panel */}
      <div className="border-4 border-foreground bg-white rounded-2xl overflow-hidden shadow-[0_3px_0_#000] mt-1.5 transition-all">
        {/* Toggle bar */}
        <button
          onClick={() => setWeightsOpen(!weightsOpen)}
          className="w-full px-4 py-2.5 bg-amber-50 hover:bg-amber-100/50 border-b-2 border-foreground/10 transition-colors flex items-center justify-between font-bold text-xs uppercase cursor-pointer text-foreground/80"
        >
          <span className="flex items-center gap-2">
            <Sliders size={13} className="text-primary" />
            RECO-ENGINE WEIGHTS CONFIG 🛠️
          </span>
          <span className="text-[10px] text-primary font-mono">
            {weightsOpen ? '▲ CLOSE' : '▼ ADJUST SLIDERS'}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {weightsOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-3.5 bg-amber-50/10 text-xs font-mono border-t border-foreground/5">
                <p className="text-[9px] text-foreground/55 uppercase border-b border-foreground/10 pb-1.5 leading-normal">
                  Customize weights for ranking local restaurants. The system automatically normalizes sliders in real-time.
                </p>

                {/* 1. Craving weight */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="flex items-center gap-1">🧠 Craving Archetype</span>
                    <span className="text-primary font-black text-right text-[10px]">
                      {recommendationWeights.craving.toFixed(2)} ({displayPercent(recommendationWeights.craving)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={recommendationWeights.craving}
                    onChange={(e) => handleWeightChange('craving', parseFloat(e.target.value))}
                    className="w-full accent-primary border border-foreground/10 rounded cursor-pointer"
                  />
                </div>

                {/* 2. Quality weight */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="flex items-center gap-1">⭐ Restaurant Quality</span>
                    <span className="text-primary font-black text-right text-[10px]">
                      {recommendationWeights.quality.toFixed(2)} ({displayPercent(recommendationWeights.quality)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={recommendationWeights.quality}
                    onChange={(e) => handleWeightChange('quality', parseFloat(e.target.value))}
                    className="w-full accent-primary border border-foreground/10 rounded cursor-pointer"
                  />
                </div>

                {/* 3. Distance weight */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="flex items-center gap-1">📍 Proximity Distance</span>
                    <span className="text-primary font-black text-right text-[10px]">
                      {recommendationWeights.distance.toFixed(2)} ({displayPercent(recommendationWeights.distance)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={recommendationWeights.distance}
                    onChange={(e) => handleWeightChange('distance', parseFloat(e.target.value))}
                    className="w-full accent-primary border border-foreground/10 rounded cursor-pointer"
                  />
                </div>

                {/* 4. Popularity weight */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="flex items-center gap-1">🔥 Review Count/Popularity</span>
                    <span className="text-primary font-black text-right text-[10px]">
                      {recommendationWeights.popularity.toFixed(2)} ({displayPercent(recommendationWeights.popularity)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={recommendationWeights.popularity}
                    onChange={(e) => handleWeightChange('popularity', parseFloat(e.target.value))}
                    className="w-full accent-primary border border-foreground/10 rounded cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
