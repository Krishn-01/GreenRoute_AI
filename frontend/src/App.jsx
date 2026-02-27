import { useState, useMemo } from "react";
import SustainabilityScore from "./components/SustainabilityScore";
import PredictiveAnalytics from "./components/PredictiveAnalytics";
import VehicleChart from "./components/VehicleChart";
import FleetLeaderboard from "./components/FleetLeaderboard";
import AIInsights from "./components/AIInsights";
import AIChatAssistant from "./components/AIChatAssistant";
import CarHero from "./components/CarHero";
import TopNavbar from "./components/TopNavbar";

function App() {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Vehicle A", fuel: 38.5, temperature: 58, speed: 75 },
    { id: 2, name: "Vehicle B", fuel: 34.2, temperature: 72, speed: 82 },
    { id: 3, name: "Vehicle C", fuel: 28.5, temperature: 85, speed: 95 },
  ]);

  const [selectedVehicleId, setSelectedVehicleId] = useState(1);

  const selectedVehicle = vehicles.find(
    (v) => v.id === selectedVehicleId
  );

  const calculateScore = (vehicle) => {
    let score = 100;
    score -= vehicle.temperature > 80 ? 25 : vehicle.temperature > 65 ? 15 : 5;
    score -= vehicle.speed > 100 ? 20 : vehicle.speed > 80 ? 10 : 5;
    score -= vehicle.fuel < 32 ? 20 : vehicle.fuel < 35 ? 10 : 5;
    return Math.max(0, Math.min(100, score));
  };

  const sustainabilityScore = calculateScore(selectedVehicle);
  const predictedScore = sustainabilityScore;

  const fleetAverage = useMemo(() => {
    const total = vehicles.reduce(
      (sum, v) => sum + calculateScore(v),
      0
    );
    return (total / vehicles.length).toFixed(1);
  }, [vehicles]);

  const rankedFleet = vehicles
    .map((v) => ({ ...v, score: calculateScore(v) }))
    .sort((a, b) => b.score - a.score);

  const refreshData = () => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === selectedVehicleId
          ? {
              ...v,
              fuel: +(Math.random() * 10 + 30).toFixed(1),
              temperature: Math.floor(Math.random() * 30 + 50),
              speed: Math.floor(Math.random() * 40 + 60),
            }
          : v
      )
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#03191c] text-white">

      <TopNavbar fleetAverage={fleetAverage} />
      <CarHero />

      <div className="w-full px-8 xl:px-20 mt-14 space-y-16">

        {/* ================= ROW 1 ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

          {/* Fleet Overview */}
          <div className="xl:col-span-2 
                          bg-white/5 backdrop-blur-xl 
                          border border-white/10 
                          rounded-2xl p-8">

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">
                Fleet Overview
              </h2>

              <div className="flex items-center gap-4">
                <select
                  value={selectedVehicleId}
                  onChange={(e) =>
                    setSelectedVehicleId(Number(e.target.value))
                  }
                  className="bg-white/10 px-4 py-2 rounded-lg text-sm"
                >
                  {vehicles.map((v) => (
                    <option
                      key={v.id}
                      value={v.id}
                      className="text-black"
                    >
                      {v.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={refreshData}
                  className="bg-emerald-500 hover:bg-emerald-600
                             text-black px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Overview Layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

              {/* Sustainability */}
              <div className="md:col-span-1 flex justify-center">
                <SustainabilityScore score={sustainabilityScore} />
              </div>

              {/* Prediction */}
              <div className="md:col-span-1 flex justify-center">
                <PredictiveAnalytics
                  predictedScore={predictedScore}
                  status="Stable"
                />
              </div>

              {/* Bigger Chart */}
              <div className="md:col-span-3">
                <VehicleChart />
              </div>

            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white/5 backdrop-blur-xl 
                          border border-white/10 
                          rounded-2xl p-8">

            <AIChatAssistant />
          </div>

        </div>

        {/* ================= ROW 2 ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

          {/* Real-Time Monitoring */}
          <div className="bg-white/5 backdrop-blur-xl 
                          border border-white/10 
                          rounded-2xl p-8">

            <h2 className="text-lg font-semibold mb-6">
              Real-Time Monitoring
            </h2>

            <FleetLeaderboard rankedFleet={rankedFleet} />
          </div>

          {/* Fleet Performance Analysis */}
          <div className="bg-white/5 backdrop-blur-xl 
                          border border-white/10 
                          rounded-2xl p-8">

            <AIInsights vehicleData={selectedVehicle} />
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;