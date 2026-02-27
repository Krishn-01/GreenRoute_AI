import { Bell, Settings, Menu, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TopNavbar({ toggleSidebar }) {

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef();
  const profileRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-20 px-8 flex items-center justify-between
                    bg-white/5 backdrop-blur-2xl
                    border border-white/10
                    rounded-2xl shadow-xl z-50">

      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Menu
          onClick={toggleSidebar}
          className="text-emerald-400 cursor-pointer hover:scale-110 transition"
          size={28}
        />

        <h1 className="text-2xl font-semibold flex items-center gap-3">
          🌿
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 
                           bg-clip-text text-transparent">
            GreenRoute AI
          </span>
        </h1>
      </div>

      {/* SEARCH */}
      <div className="relative w-[40%]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vehicle, reports..."
          className="w-full bg-black/40 border border-white/10
                     rounded-full py-3 pl-12 pr-5
                     text-gray-200
                     focus:outline-none focus:border-emerald-400"
        />
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 relative">

        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          <Bell
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="cursor-pointer hover:text-emerald-400"
          />

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-64
                            bg-[#0b1f22] border border-white/10
                            rounded-xl shadow-2xl p-4 text-sm
                            z-50">
              <p className="mb-2">🚗 Vehicle speed updated</p>
              <p className="mb-2">🌱 Sustainability improved</p>
              <p>⚙ System check complete</p>
            </div>
          )}
        </div>

        {/* Settings */}
        <Settings className="cursor-pointer hover:text-emerald-400" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <img
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full cursor-pointer"
          />

          {showProfile && (
            <div className="absolute right-0 mt-4 w-40
                            bg-[#0b1f22] border border-white/10
                            rounded-xl shadow-2xl p-3 text-sm
                            z-50">
              <p className="hover:text-emerald-400 cursor-pointer">Profile</p>
              <p className="hover:text-red-400 cursor-pointer">Logout</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}