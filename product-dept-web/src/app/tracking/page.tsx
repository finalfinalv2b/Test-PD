"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const vesselOptions = [
  { code: 7, name: "Cargo & Containers", color: "bg-emerald-500", text: "text-emerald-400" },
  { code: 8, name: "Tankers & Liquids", color: "bg-red-500", text: "text-red-400" },
  { code: 3, name: "Specialized Tugs & Port Craft", color: "bg-sky-500", text: "text-sky-400" }
];

export default function TrackingPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([7]);

  // Calculator States
  const [departure, setDeparture] = useState("China");
  const [arrival, setArrival] = useState("Riverside, CA");
  const [freightType, setFreightType] = useState("Standard Boat");
  const [calculationResult, setCalculationResult] = useState<{
    days: number;
    etaDate: string;
    distance: number;
    speedKnots: number;
    lowOcean: number;
    highOcean: number;
    lowPort: number;
    highPort: number;
    lowDrayage: number;
    highDrayage: number;
  } | null>(null);

  // Freightos Toolkit States
  const [activeTool, setActiveTool] = useState<"cbm" | "co2" | "class">("cbm");

  // CBM states
  const [cbmLength, setCbmLength] = useState<string>("60");
  const [cbmWidth, setCbmWidth] = useState<string>("40");
  const [cbmHeight, setCbmHeight] = useState<string>("40");
  const [cbmQty, setCbmQty] = useState<string>("10");
  const [cbmWeight, setCbmWeight] = useState<string>("15"); // kg per box

  // CO2 states
  const [co2Weight, setCo2Weight] = useState<string>("150"); // total kg
  const [co2Dist, setCo2Dist] = useState<string>("6200"); // nautical miles
  const [co2Mode, setCo2Mode] = useState<"ocean" | "air" | "rail" | "truck">("ocean");

  // Class states
  const [classLength, setClassLength] = useState<string>("24"); // inches
  const [classWidth, setClassWidth] = useState<string>("24"); // inches
  const [classHeight, setClassHeight] = useState<string>("24"); // inches
  const [classWeight, setClassWeight] = useState<string>("150"); // lbs

  // Calculations for CBM
  const l = parseFloat(cbmLength) || 0;
  const w = parseFloat(cbmWidth) || 0;
  const h = parseFloat(cbmHeight) || 0;
  const q = parseFloat(cbmQty) || 0;
  const wt = parseFloat(cbmWeight) || 0;

  const totalCBM = (l * w * h / 1000000) * q;
  const totalCFT = totalCBM * 35.3147;
  const totalGrossWeight = wt * q;
  const airVolumetricWeight = (l * w * h / 5000) * q;
  const oceanVolumetricWeight = (l * w * h / 6000) * q;

  // Calculations for CO2
  const wtKg = parseFloat(co2Weight) || 0;
  const distNm = parseFloat(co2Dist) || 0;
  const distKm = distNm * 1.852;
  const metricTons = wtKg / 1000;
  
  let factor = 0.015; // ocean
  if (co2Mode === "air") factor = 0.500;
  if (co2Mode === "rail") factor = 0.025;
  if (co2Mode === "truck") factor = 0.080;

  const co2Kg = metricTons * distKm * factor;
  const equivalentTrees = co2Kg / 22; // 1 tree absorbs ~22kg of CO2 per year

  // Calculations for Freight Class
  const lin = parseFloat(classLength) || 0;
  const win = parseFloat(classWidth) || 0;
  const hin = parseFloat(classHeight) || 0;
  const wlbs = parseFloat(classWeight) || 0;

  const volumeCuFt = (lin * win * hin / 1728);
  const density = volumeCuFt > 0 ? wlbs / volumeCuFt : 0;

  let freightClass = "50";
  if (density < 1) freightClass = "500";
  else if (density < 2) freightClass = "400";
  else if (density < 3) freightClass = "300";
  else if (density < 4) freightClass = "250";
  else if (density < 5) freightClass = "200";
  else if (density < 6) freightClass = "175";
  else if (density < 7) freightClass = "125";
  else if (density < 8) freightClass = "110";
  else if (density < 9) freightClass = "100";
  else if (density < 10.5) freightClass = "92.5";
  else if (density < 12) freightClass = "85";
  else if (density < 13.5) freightClass = "77.5";
  else if (density < 15) freightClass = "70";
  else if (density < 22.5) freightClass = "65";
  else if (density < 30) freightClass = "60";
  else if (density < 35) freightClass = "55";
  else freightClass = "50";

  const departureDistances: Record<string, number> = {
    "China": 6200,
    "Vietnam": 7000,
    "India": 8800,
    "Bangladesh": 9200,
    "Indonesia": 7800,
    "Japan": 4800,
    "South Korea": 5100,
    "Taiwan": 5800,
    "Thailand": 7500,
    "Germany": 3800,
    "Mexico": 2200,
  };

  const portDelays: Record<string, number> = {
    "Riverside, CA": 4.0,
    "Oakland, CA": 2.5,
    "Los Angeles": 3.0,
    "Long Beach": 3.0,
    "New York / New Jersey": 2.0,
    "Savannah": 2.2,
    "Houston": 2.8,
    "Seattle": 1.8,
    "Miami": 1.5,
  };

  const calculateETA = () => {
    const dist = departureDistances[departure] || 6000;
    const portDelay = portDelays[arrival] || 2.0;
    const speed = freightType === "Fast Boat" ? 22 : 14;
    
    const isAsia = ["China", "Vietnam", "India", "Bangladesh", "Indonesia", "Japan", "South Korea", "Taiwan", "Thailand"].includes(departure);
    const isEastCoast = ["New York / New Jersey", "Savannah", "Houston", "Miami"].includes(arrival);
    const adjustedDist = isAsia && isEastCoast ? dist + 3200 : dist;

    // Ocean Transit (Freight time) low/high range
    const baseOceanDays = adjustedDist / (speed * 24);
    const lowOcean = Math.round(baseOceanDays * 0.81);
    const highOcean = Math.round(baseOceanDays * 1.19);

    // Port Clearance low/high range
    let lowPort = 3;
    let highPort = 7;
    if (arrival.startsWith("Oakland")) {
      lowPort = 2;
      highPort = 5;
    } else if (arrival.startsWith("Riverside")) {
      lowPort = 3;
      highPort = 7;
    } else {
      lowPort = Math.max(1, Math.round(portDelay * 0.8));
      highPort = Math.max(3, Math.round(portDelay * 1.8));
    }

    // Drayage / Inland Trucking low/high range
    let lowDrayage = 1;
    let highDrayage = 3;
    if (arrival.startsWith("Oakland")) {
      lowDrayage = 1;
      highDrayage = 2;
    } else if (arrival.startsWith("Riverside")) {
      lowDrayage = 1;
      highDrayage = 3;
    } else {
      lowDrayage = 1;
      highDrayage = 2;
    }

    const lowTotal = lowOcean + lowPort + lowDrayage;
    const highTotal = highOcean + highPort + highDrayage;
    const medianTotal = Math.round((lowTotal + highTotal) / 2);

    const eta = new Date();
    eta.setDate(eta.getDate() + medianTotal);
    const formattedDate = eta.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    setCalculationResult({
      days: medianTotal,
      etaDate: formattedDate,
      distance: Math.round(adjustedDist),
      speedKnots: speed,
      lowOcean,
      highOcean,
      lowPort,
      highPort,
      lowDrayage,
      highDrayage
    });
  };

  // Construct iframe src dynamically based on selected types
  const iframeSrc = `https://www.marinetraffic.com/en/ais/embed/zoom:3/centery:22/centerx:114/maptype:4/shownames:false/mmsi:0/shipid:0/fleet:/fleet_id:/vtypes:${selectedTypes.join(",")}/showmenu:/remember:false`;

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 md:px-8 lg:px-12 flex flex-col items-center relative overflow-hidden select-none">
      {/* Background Decorative Navigation Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white" />
      </div>

      <div className="w-full max-w-7xl z-10">
        {/* Navigation Back Link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/secret"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white font-sans text-xs md:text-sm font-bold tracking-widest transition-colors mb-8 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>BACK TO PROCESS</span>
          </Link>
        </motion.div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-white font-header uppercase tracking-wider text-[clamp(1.8rem,4vw,3.5rem)] leading-[0.9] mb-3">
              GLOBAL LOGISTICS ENGINE
            </h1>
            <p className="text-white/60 font-sans font-light text-xs md:text-sm max-w-xl leading-relaxed">
              Real-time maritime tracking and vessel telemetry. Monitored coordinates reflect raw AIS transponder packets for active Product Dept. manufacturing freight streams.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-md backdrop-blur-sm self-start md:self-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-header font-black text-[10px] tracking-widest uppercase text-emerald-400">
              LIVE AIS DATA FEED CONNECTED
            </span>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-lg overflow-hidden shadow-2xl relative"
          >
            {/* Map Header with Filter Dropdown */}
            <div className="absolute top-0 left-0 w-full bg-white/[0.05] border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-[10px] font-sans text-white/50 tracking-wider z-20">
              <div className="flex items-center gap-4">
                <span>AIS EMBEDDED MAP</span>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="hidden sm:inline">
                  VESSEL TYPES: {selectedTypes.map(t => vesselOptions.find(o => o.code === t)?.name).join(", ")}
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="bg-white/5 hover:bg-white/10 text-white font-header font-black px-3 py-1 rounded border border-white/10 transition-colors uppercase tracking-widest text-[9px] flex items-center gap-1.5"
                >
                  <span>Filter Window</span>
                  <span className="text-[7px]">{filterOpen ? "▲" : "▼"}</span>
                </button>

                {/* Filter Dropdown Window */}
                <AnimatePresence>
                  {filterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-black/95 border border-white/15 rounded shadow-2xl p-4 z-30 backdrop-blur-md"
                    >
                      <h4 className="font-header font-black text-[9px] text-[#e31a1c] tracking-widest uppercase mb-3 border-b border-white/10 pb-1.5">
                        SELECT VESSEL FILTERS
                      </h4>
                      <div className="flex flex-col gap-3">
                        {vesselOptions.map((opt) => {
                          const isSelected = selectedTypes.includes(opt.code);
                          return (
                            <label
                              key={opt.code}
                              className="flex items-center justify-between cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${opt.color}`} />
                                <span className="font-sans text-xs text-white/80 group-hover:text-white transition-colors">
                                  {opt.name}
                                </span>
                              </div>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  if (isSelected) {
                                    // Keep at least one selected to prevent empty map queries
                                    if (selectedTypes.length > 1) {
                                      setSelectedTypes(selectedTypes.filter((t) => t !== opt.code));
                                    }
                                  } else {
                                    setSelectedTypes([...selectedTypes, opt.code]);
                                  }
                                }}
                                className="accent-[#e31a1c] cursor-pointer"
                              />
                            </label>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* MarineTraffic Embed Map */}
            <div className="pt-[37px] w-full bg-[#1b232e]">
              <iframe
                src={iframeSrc}
                width="100%"
                className="h-[450px] md:h-[550px] lg:h-[600px] border-none block"
                title="MarineTraffic Live AIS Map"
                allowFullScreen
              />
            </div>

            {/* ETA Calculator Panel */}
            <div className="border-t border-white/10 p-6 bg-white/[0.01]">
              <h3 className="font-header font-black text-xs text-[#e31a1c] tracking-widest uppercase mb-6 flex items-center gap-2">
                <span>[ TRANSIT TIME & ETA CALCULATOR ]</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block font-header font-black text-[9px] text-white/50 tracking-widest uppercase mb-1.5">
                      Country of Departure
                    </label>
                    <select
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white/90 focus:outline-none focus:border-[#e31a1c] cursor-pointer"
                    >
                      <option value="China">China</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="India">India</option>
                      <option disabled>────────────────────</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Germany">Germany</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-header font-black text-[9px] text-white/50 tracking-widest uppercase mb-1.5">
                      Port of Arrival
                    </label>
                    <select
                      value={arrival}
                      onChange={(e) => setArrival(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white/90 focus:outline-none focus:border-[#e31a1c] cursor-pointer"
                    >
                      <option value="Riverside, CA">Riverside, CA</option>
                      <option value="Oakland, CA">Oakland, CA</option>
                      <option disabled>────────────────────</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Long Beach">Long Beach</option>
                      <option value="New York / New Jersey">New York / New Jersey</option>
                      <option value="Savannah">Savannah</option>
                      <option value="Houston">Houston</option>
                      <option value="Seattle">Seattle</option>
                      <option value="Miami">Miami</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-header font-black text-[9px] text-white/50 tracking-widest uppercase mb-1.5">
                      Freight Type
                    </label>
                    <select
                      value={freightType}
                      onChange={(e) => setFreightType(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white/90 focus:outline-none focus:border-[#e31a1c] cursor-pointer"
                    >
                      <option value="Standard Boat">Standard Boat (14 kn)</option>
                      <option value="Fast Boat">Fast Boat (22 kn)</option>
                    </select>
                  </div>

                  <button
                    onClick={calculateETA}
                    className="w-full bg-[#e31a1c] hover:bg-[#c91416] text-white font-header font-black text-xs tracking-widest uppercase py-3 px-4 rounded border border-[#e31a1c] transition-all duration-300 active:scale-[0.98] cursor-pointer mt-2"
                  >
                    Calculate Estimated Transit
                  </button>
                </div>

                {/* Result Panel */}
                <div className="border border-white/5 bg-black/40 rounded-lg p-6 flex flex-col justify-between min-h-[220px]">
                  {calculationResult ? (
                    <div className="flex flex-col h-full justify-between">
                      <div className="bg-[#f4f2ed] p-4 rounded-md mb-4 shadow-sm">
                        <span 
                          className="text-[9px] text-[#e31a1c] tracking-widest uppercase block mb-1.5"
                          style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
                        >
                          DOOR TO DOOR ESTIMATE
                        </span>
                        <div 
                          className="text-2xl sm:text-3xl md:text-4xl uppercase text-black tracking-tight leading-none"
                          style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
                        >
                          {calculationResult.etaDate}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 font-mono text-xs text-white/70">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider block text-white/40 mb-0.5">TRANSIT TIME</span>
                          <span className="text-sm font-bold text-white">{calculationResult.days} Days</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider block text-white/40 mb-0.5">EST. DISTANCE</span>
                          <span className="text-sm font-bold text-white">{calculationResult.distance.toLocaleString()} nm</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider block text-white/40 mb-0.5">VESSEL SPEED</span>
                          <span className="text-sm font-bold text-white">{calculationResult.speedKnots} knots</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider block text-white/40 mb-0.5">FREIGHT METHOD</span>
                          <span className="text-sm font-bold text-white">{freightType}</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] px-3 py-1.5 rounded uppercase tracking-wider text-center">
                        Route Calculated: {departure} → {arrival}
                      </div>

                      {/* Timeline Breakdown Breakdown */}
                      <div className="mt-5 border-t border-white/10 pt-4 flex flex-col gap-2.5 text-left">
                        <span 
                          className="text-[9px] text-[#e31a1c] tracking-widest uppercase block mb-1"
                          style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
                        >
                          Calculated Components (Low / High Ranges)
                        </span>
                        
                        <div className="flex flex-col gap-2 font-mono text-xs text-white/80">
                          {/* Ocean Transit */}
                          <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 px-3 py-2 rounded">
                            <span className="text-[9px] text-white/50 uppercase tracking-wider">1. Ocean Transit</span>
                            <span className="font-bold text-white">
                              {calculationResult.lowOcean}–{calculationResult.highOcean} Days
                              <span className="text-white/40 font-normal ml-2">
                                (median: {Math.round((calculationResult.lowOcean + calculationResult.highOcean) / 2)}d)
                              </span>
                            </span>
                          </div>

                          {/* Port Clearance */}
                          <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 px-3 py-2 rounded">
                            <span className="text-[9px] text-white/50 uppercase tracking-wider">2. Port Clearance</span>
                            <span className="font-bold text-white">
                              {calculationResult.lowPort}–{calculationResult.highPort} Days
                              <span className="text-white/40 font-normal ml-2">
                                (median: {Math.round((calculationResult.lowPort + calculationResult.highPort) / 2)}d)
                              </span>
                            </span>
                          </div>

                          {/* Drayage / Inland Trucking */}
                          <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 px-3 py-2 rounded">
                            <span className="text-[9px] text-white/50 uppercase tracking-wider">3. Inland Trucking</span>
                            <span className="font-bold text-white">
                              {calculationResult.lowDrayage}–{calculationResult.highDrayage} Days
                              <span className="text-white/40 font-normal ml-2">
                                (median: {Math.round((calculationResult.lowDrayage + calculationResult.highDrayage) / 2)}d)
                              </span>
                            </span>
                          </div>

                          {/* Summation */}
                          <div className="flex justify-between items-center border-t border-white/10 pt-2.5 mt-1">
                            <span className="text-[9px] text-[#e31a1c] uppercase tracking-wider font-bold">Summed Range</span>
                            <span className="font-bold text-white">
                              {calculationResult.lowOcean + calculationResult.lowPort + calculationResult.lowDrayage}–{calculationResult.highOcean + calculationResult.highPort + calculationResult.highDrayage} Days
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Transit Methodology & Data Details */}
                      <div className="mt-5 border-t border-white/10 pt-4 flex flex-col gap-2.5 text-left">
                        <span 
                          className="text-[9px] text-[#e31a1c] tracking-widest uppercase block mb-1"
                          style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
                        >
                          Logistics Methodology Reference
                        </span>
                        <div className="flex flex-col gap-2.5 font-sans text-[11px] text-white/60 leading-relaxed">
                          <div className="flex gap-2 items-start">
                            <span className="text-[#e31a1c] text-xs leading-none select-none">▪</span>
                            <p>
                              <strong className="text-white/80">Ocean Transit:</strong> 15–22 days from major South China ports (like Shenzhen and Hong Kong near Dongguan) to the Port of Los Angeles or Long Beach.
                            </p>
                          </div>
                          <div className="flex gap-2 items-start">
                            <span className="text-[#e31a1c] text-xs leading-none select-none">▪</span>
                            <p>
                              <strong className="text-white/80">Port Clearance:</strong> 3–7 days for unloading, customs clearance, and container availability.
                            </p>
                          </div>
                          <div className="flex gap-2 items-start">
                            <span className="text-[#e31a1c] text-xs leading-none select-none">▪</span>
                            <p>
                              <strong className="text-white/80">Drayage/Inland Trucking:</strong> 1–3 days to travel roughly 60–80 miles from the Southern California ports to warehouses or facilities in Riverside, CA.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <svg className="w-8 h-8 text-white/20 mb-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="font-header font-black text-[9px] text-white/40 tracking-widest uppercase mb-1">
                        Awaiting Inputs
                      </span>
                      <p className="text-[11px] text-white/30 font-sans max-w-[220px]">
                        Select departure, arrival port and cargo type to generate transit calculations.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Telemetry Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 rounded-lg w-full flex flex-col gap-6"
          >
            {/* Active Shipments Panel */}
            <div>
              <h3 className="font-header font-black text-[10px] text-[#e31a1c] tracking-widest uppercase mb-4 pb-2 border-b border-white/10">
                Active Shipments
              </h3>
              <div className="flex flex-col gap-4">
                {/* Shipment 1 */}
                <div className="border-b border-white/5 pb-4">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-header font-black text-xs text-white uppercase">EVER GIVEN</span>
                    <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      IN TRANSIT
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-white/50 mb-0.5">Route: Shenzhen → Los Angeles</p>
                  <p className="text-[10px] font-sans text-white/40">Cargo: PD-09 Prototype Batch</p>
                </div>
                {/* Shipment 2 */}
                <div className="border-b border-white/5 pb-4">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-header font-black text-xs text-white uppercase">COSCO SHIPPING</span>
                    <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      PORT CALL
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-white/50 mb-0.5">Route: Rotterdam → Newark</p>
                  <p className="text-[10px] font-sans text-white/40">Cargo: Sourcing Components</p>
                </div>
              </div>
            </div>

            {/* Global Port Congestion Panel */}
            <div>
              <h3 className="font-header font-black text-[10px] text-[#e31a1c] tracking-widest uppercase mb-4 pb-2 border-b border-white/10">
                Global Port Congestion
              </h3>
              <div className="flex flex-col gap-4">
                {/* Shanghai */}
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-header font-black text-[10px] text-white uppercase">PORT OF SHANGHAI</span>
                    <span className="text-[8px] font-sans font-bold px-1 py-0.5 rounded bg-[#e31a1c]/10 text-[#e31a1c] border border-[#e31a1c]/25">
                      HIGH DELAY
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-sans text-white/50 mb-1">
                    <span>Avg Dwell: 5.4 Days</span>
                    <span>84% Congestion</span>
                  </div>
                  <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                    <div className="bg-[#e31a1c] h-full rounded-full" style={{ width: "84%" }} />
                  </div>
                </div>

                {/* LA */}
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-header font-black text-[10px] text-white uppercase">PORT OF LAX</span>
                    <span className="text-[8px] font-sans font-bold px-1 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25">
                      MODERATE DELAY
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-sans text-white/50 mb-1">
                    <span>Avg Dwell: 3.2 Days</span>
                    <span>58% Congestion</span>
                  </div>
                  <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: "58%" }} />
                  </div>
                </div>

                {/* Rotterdam */}
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-header font-black text-[10px] text-white uppercase">PORT OF ROTTERDAM</span>
                    <span className="text-[8px] font-sans font-bold px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      NOMINAL FLOW
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-sans text-white/50 mb-1">
                    <span>Avg Dwell: 1.1 Days</span>
                    <span>22% Congestion</span>
                  </div>
                  <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "22%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Freightos Developer Tools Panel */}
            <div className="border-t border-white/10 pt-4 mt-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-header font-black text-[10px] text-[#e31a1c] tracking-widest uppercase">
                  Freightos Logistics Toolkit
                </h3>
                <span className="text-[7px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-mono">
                  WIDGET V1.1
                </span>
              </div>
              <p className="text-[10px] text-white/40 mb-3 font-sans">
                Interactive tools inspired by developers.freightos.com/freight-tools
              </p>

              {/* Tab Selector */}
              <div className="grid grid-cols-3 gap-1 bg-white/5 p-0.5 rounded text-[9px] font-mono mb-3">
                <button
                  onClick={() => setActiveTool("cbm")}
                  className={`py-1 rounded text-center transition-all ${
                    activeTool === "cbm"
                      ? "bg-[#e31a1c] text-white font-bold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  CBM (VOL)
                </button>
                <button
                  onClick={() => setActiveTool("co2")}
                  className={`py-1 rounded text-center transition-all ${
                    activeTool === "co2"
                      ? "bg-[#e31a1c] text-white font-bold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  CO2 ESTIMATE
                </button>
                <button
                  onClick={() => setActiveTool("class")}
                  className={`py-1 rounded text-center transition-all ${
                    activeTool === "class"
                      ? "bg-[#e31a1c] text-white font-bold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  CLASS DENSITY
                </button>
              </div>

              {/* Tool 1: CBM Calculator */}
              {activeTool === "cbm" && (
                <div className="flex flex-col gap-2.5 font-sans">
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">L (cm)</label>
                      <input
                        type="number"
                        value={cbmLength}
                        onChange={(e) => setCbmLength(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">W (cm)</label>
                      <input
                        type="number"
                        value={cbmWidth}
                        onChange={(e) => setCbmWidth(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">H (cm)</label>
                      <input
                        type="number"
                        value={cbmHeight}
                        onChange={(e) => setCbmHeight(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">QTY (Boxes)</label>
                      <input
                        type="number"
                        value={cbmQty}
                        onChange={(e) => setCbmQty(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">Box Weight (kg)</label>
                      <input
                        type="number"
                        value={cbmWeight}
                        onChange={(e) => setCbmWeight(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 p-2 rounded font-mono text-[9px] flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <span className="text-white/50">TOTAL VOLUME:</span>
                      <span className="text-white font-bold">{totalCBM.toFixed(3)} m³ <span className="text-white/40">({totalCFT.toFixed(1)} cu ft)</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">GROSS WEIGHT:</span>
                      <span className="text-white font-bold">{totalGrossWeight.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">AIR VOL WT (1:5000):</span>
                      <span className="text-white font-bold">{airVolumetricWeight.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">SEA VOL WT (1:6000):</span>
                      <span className="text-white font-bold">{oceanVolumetricWeight.toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tool 2: CO2 Estimator */}
              {activeTool === "co2" && (
                <div className="flex flex-col gap-2.5 font-sans">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">Cargo Weight (kg)</label>
                      <input
                        type="number"
                        value={co2Weight}
                        onChange={(e) => setCo2Weight(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">Distance (nm)</label>
                      <input
                        type="number"
                        value={co2Dist}
                        onChange={(e) => setCo2Dist(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">Transport Mode</label>
                    <select
                      value={co2Mode}
                      onChange={(e) => setCo2Mode(e.target.value as any)}
                      className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                    >
                      <option value="ocean">Ocean Vessel (FBX Standard)</option>
                      <option value="air">Air Cargo (FAX Standard)</option>
                      <option value="rail">Rail Freight</option>
                      <option value="truck">Road Trucking</option>
                    </select>
                  </div>

                  <div className="bg-white/5 border border-white/5 p-2 rounded font-mono text-[9px] flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <span className="text-white/50">CO2 EMISSIONS:</span>
                      <span className="text-white font-bold">{co2Kg.toFixed(2)} kg CO₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">EQUIV. TREES/YEAR:</span>
                      <span className="text-[#e31a1c] font-black">{Math.ceil(equivalentTrees)} Trees</span>
                    </div>
                    <div className="text-[8px] text-white/30 text-center border-t border-white/5 pt-1.5 mt-0.5 leading-normal">
                      Emissions based on EN 16258 standard guidelines.
                    </div>
                  </div>
                </div>
              )}

              {/* Tool 3: Freight Class Calculator */}
              {activeTool === "class" && (
                <div className="flex flex-col gap-2.5 font-sans">
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">L (in)</label>
                      <input
                        type="number"
                        value={classLength}
                        onChange={(e) => setClassLength(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">W (in)</label>
                      <input
                        type="number"
                        value={classWidth}
                        onChange={(e) => setClassWidth(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">H (in)</label>
                      <input
                        type="number"
                        value={classHeight}
                        onChange={(e) => setClassHeight(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] uppercase tracking-wider block text-white/50 mb-0.5">Total Weight (lbs)</label>
                    <input
                      type="number"
                      value={classWeight}
                      onChange={(e) => setClassWeight(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-1.5 py-1 text-xs text-white focus:outline-none focus:border-[#e31a1c]"
                    />
                  </div>

                  <div className="bg-white/5 border border-white/5 p-2 rounded font-mono text-[9px] flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <span className="text-white/50">CALCULATED VOLUME:</span>
                      <span className="text-white font-bold">{volumeCuFt.toFixed(2)} cu ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">SHIPMENT DENSITY:</span>
                      <span className="text-white font-bold">{density.toFixed(2)} lbs/cu ft</span>
                    </div>
                    <div className="flex justify-between items-baseline border-t border-white/5 pt-1.5 mt-0.5">
                      <span className="text-white/50">EST. CLASS (NMFC):</span>
                      <span 
                        className="text-sm text-[#e31a1c] tracking-tight"
                        style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
                      >
                        CLASS {freightClass}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Terminal Log */}
            <div>
              <h3 className="font-header font-black text-[10px] text-[#e31a1c] tracking-widest uppercase mb-3">
                AIS Terminal Feed
              </h3>
              <div className="bg-black/80 rounded border border-white/5 p-4 font-mono text-[9px] text-green-400/80 leading-relaxed h-[180px] overflow-hidden flex flex-col gap-1.5 justify-end">
                <div className="opacity-40">[INFO] AIS payload decoded successfully</div>
                <div className="opacity-60">[INFO] MMSI 351119000 ping: lat=22.61, lon=114.28</div>
                <div className="opacity-80">[INFO] Speed: 18.2 knots, Course: 112 deg</div>
                <div>[INFO] Destination: US LAX, ETA: 05-26 14:00</div>
                <div className="animate-pulse text-green-400">[SYS] Awaiting next transponder sweep...</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
