import React, { useState } from "react";
import {
  Compass,
  Calendar,
  CalendarCheck,
  RotateCw,
  Sparkles,
  BookOpen,
  UserCheck,
  PenTool,
  Volume2,
  VolumeX,
  ShieldAlert,
  X,
  Scale,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { DayForecast } from "../types";
import { gamelanAudio } from "../utils/audioChime";

export type ActiveTab =
  | "kompas"
  | "forecaster"
  | "siklus210"
  | "proyeksi2026"
  | "weton"
  | "konsultasi"
  | "jurnal";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  todayForecast: DayForecast;
  onSelectDate: (date: Date) => void;
  onOpenDisclaimer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  todayForecast,
  onSelectDate,
  onOpenDisclaimer,
}) => {
  const [isMuted, setIsMuted] = useState(gamelanAudio.isMuted);

  const toggleSound = () => {
    const muted = gamelanAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleTabClick = (id: ActiveTab) => {
    setActiveTab(id);
    gamelanAudio.playChime("ting");
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "kompas",
      label: "Kompas Hari Ini",
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: "forecaster",
      label: "Forecasting Hajat",
      icon: <CalendarCheck className="w-4 h-4" />,
    },
    {
      id: "siklus210",
      label: "6 Fase Pawukon",
      icon: <RotateCw className="w-4 h-4" />,
    },
    {
      id: "proyeksi2026",
      label: "Kalender Dinamis",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "weton",
      label: "Weton & Kemitraan",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      id: "jurnal",
      label: "Jurnal Waktu",
      icon: <PenTool className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e5dcce] shadow-xs transition-all print:hidden">
      {/* Top micro gold line */}
      <div className="h-0.5 bg-gradient-to-r from-[#d4af37] via-[#8c6239] to-[#d4af37]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          {/* Brand & Subtitle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md border border-[#c49746]/40 overflow-hidden shrink-0 transition-transform hover:scale-105">
                <img
                  src={`${import.meta.env.BASE_URL}logo-mf.png`}
                  alt="Logo Mario Fahmi"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#2c1e12]">
                    Titen Laku Jawa
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#f0e4d2] border border-[#d9c9b5] text-[10px] font-semibold text-[#6e5641]">
                    Siklus Pawukon & Weton
                  </span>
                </div>
                <p className="text-xs text-[#73604f]">
                  Ilmu Titen & Navigasi Irama Siklus Hidup Manusia Jawa
                </p>
                <p className="text-[11px] text-[#8c6239] font-medium tracking-wide mt-0.5">
                  Perancang: <span className="font-semibold text-[#3b2717]">Mario Fahmi Syahrial</span>
                </p>
              </div>
            </div>            {/* Sound Toggle & Quick Mobile Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenDisclaimer}
                title="Baca Disclaimer & Pernyataan Etis"
                className="p-2 rounded-xl border bg-[#fbf7f0] hover:bg-[#f3ebe0] text-amber-800 border-[#dac9b4] text-xs cursor-pointer shadow-xs"
              >
                <ShieldAlert className="w-4 h-4" />
              </button>
              <button
                onClick={toggleSound}
                title={isMuted ? "Bunyikan Gamelan" : "Heningkan Gamelan"}
                className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                  isMuted
                    ? "bg-[#f2ece2] text-stone-400 border-stone-300"
                    : "bg-[#e8dac7] text-[#4d3723] border-[#cfbea8]"
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  onSelectDate(new Date());
                  gamelanAudio.playChime("bonang");
                }}
                className="text-xs bg-[#ede2d2] hover:bg-[#e4d6c3] text-[#4d3824] px-3 py-1.5 rounded-xl font-medium border border-[#dac9b4] transition-colors"
              >
                {todayForecast.weton}
              </button>
            </div>
          </div>

          {/* Current Date Badge & Sound Toggle on Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Disclaimer Button */}
            <button
              onClick={onOpenDisclaimer}
              title="Baca Pernyataan Etis & Disclaimer Budaya"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#d9c9b5] bg-[#fbf7f0] hover:bg-[#f3ebe0] text-[#735e4b] hover:text-[#382617] text-xs font-semibold cursor-pointer transition-all shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-[11px]">Disclaimer</span>
            </button>

            {/* Gamelan Chime Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Bunyikan Gamelan Suara Latar" : "Heningkan Gamelan"}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                isMuted
                  ? "bg-[#f4efe8] text-stone-400 border-stone-300 hover:text-stone-600"
                  : "bg-gradient-to-r from-[#f7ecd9] to-[#faedd6] text-[#63482a] border-[#dac3a3] shadow-xs hover:border-[#c8a980]"
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Suara: Hening</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#a87532] animate-bounce" />
                  <span className="text-[11px]">Gamelan Aktif</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onSelectDate(new Date());
                gamelanAudio.playChime("bonang");
              }}
              className="group text-left px-3.5 py-2 rounded-2xl bg-[#f5ecdf] hover:bg-[#ebdfce] border border-[#dfd2be] transition-all flex items-center gap-3 cursor-pointer shadow-xs"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100 animate-pulse" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#826e5a] font-bold">
                  Hari Ini
                </div>
                <div className="text-sm font-bold text-[#362516]">
                  {todayForecast.weton}{" "}
                  <span className="font-normal text-xs text-[#73604e]">
                    (Neptu {todayForecast.totalNeptu})
                  </span>
                </div>
              </div>
              <div className="text-xs text-[#7e6955] border-l border-[#dccfbd] pl-3">
                <div className="font-semibold text-[#483321]">Wuku {todayForecast.wuku.name}</div>
                <div className="text-[11px] text-[#8e7a67]">
                  Sasi {todayForecast.sasi}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#332213] text-[#fbf5eb] shadow-md border border-[#c49746]/40 font-semibold"
                    : "text-[#5e4c3a] hover:bg-[#ede3d3] hover:text-[#2d1e11]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};


