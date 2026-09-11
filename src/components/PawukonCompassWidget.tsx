import React, { useState } from "react";
import { PasaranName, DayForecast } from "../types";
import { Sparkles, Compass, Eye, Info, Shield } from "lucide-react";
import { gamelanAudio } from "../utils/audioChime";

interface PawukonCompassWidgetProps {
  currentForecast: DayForecast;
  onSelectPasaranFilter?: (pasaran: PasaranName) => void;
}

interface PasaranDetail {
  name: PasaranName;
  direction: string;
  directionShort: string;
  colorName: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  element: string;
  character: string;
  neptu: number;
  javaneseAksara: string;
}

const PASARAN_COSMOLOGY: Record<PasaranName, PasaranDetail> = {
  Legi: {
    name: "Legi",
    direction: "Wetan (Timur)",
    directionShort: "Timur",
    colorName: "Pethak (Putih)",
    colorClass: "text-slate-800",
    borderClass: "border-slate-300",
    bgClass: "bg-slate-50",
    element: "Udara & Angin",
    character: "Harmonis, manis tutur kata, diplomatis, mudah merangkul orang lain.",
    neptu: 5,
    javaneseAksara: "ꦊꦒꦶ",
  },
  Pahing: {
    name: "Pahing",
    direction: "Kidul (Selatan)",
    directionShort: "Selatan",
    colorName: "Abrit (Merah)",
    colorClass: "text-rose-700",
    borderClass: "border-rose-300",
    bgClass: "bg-rose-50",
    element: "Geni (Api)",
    character: "Penuh gairah, berani mendobrak rintangan, berjiwa pemimpin, pantang menyerah.",
    neptu: 9,
    javaneseAksara: "ꦥꦲꦶꦁ",
  },
  Pon: {
    name: "Pon",
    direction: "Kulon (Barat)",
    directionShort: "Barat",
    colorName: "Jene (Kuning)",
    colorClass: "text-amber-700",
    borderClass: "border-amber-300",
    bgClass: "bg-amber-50",
    element: "Logam & Cahaya Emas",
    character: "Teliti, amanah, teguh memegang prinsip, stabil dalam mengelola materi.",
    neptu: 7,
    javaneseAksara: "ꦥꦺꦴꦤ꧀",
  },
  Wage: {
    name: "Wage",
    direction: "Lor (Utara)",
    directionShort: "Utara",
    colorName: "Cemeng (Hitam)",
    colorClass: "text-stone-800",
    borderClass: "border-stone-400",
    bgClass: "bg-stone-100",
    element: "Tirta (Air)",
    character: "Tenang, suka merenung, tajam mengamati, berhati-hati, penyimpan rahasia yang baik.",
    neptu: 4,
    javaneseAksara: "ꦮꦒꦺ",
  },
  Kliwon: {
    name: "Kliwon",
    direction: "Pancer (Pusat / Tengah)",
    directionShort: "Pusat",
    colorName: "Manca Warna (Pusat Beragam Warna)",
    colorClass: "text-indigo-900",
    borderClass: "border-indigo-300",
    bgClass: "bg-indigo-50",
    element: "Bantala (Bumi / Wadah Rohani)",
    character: "Kharismatik, memikat hati, penyeimbang 4 penjuru angin, intuisi spiritual kuat.",
    neptu: 8,
    javaneseAksara: "ꦏ꧀ꦭꦶꦮꦺꦴꦤ꧀",
  },
};

export const PawukonCompassWidget: React.FC<PawukonCompassWidgetProps> = ({
  currentForecast,
}) => {
  const [selectedPasaran, setSelectedPasaran] = useState<PasaranName>(
    currentForecast.pasaran
  );

  const activeCosmology = PASARAN_COSMOLOGY[selectedPasaran];
  const isCurrentActive = currentForecast.pasaran === selectedPasaran;

  const handleSelect = (pasaran: PasaranName) => {
    setSelectedPasaran(pasaran);
    gamelanAudio.playChime("ting");
  };

  return (
    <div className="bg-gradient-to-br from-[#ffffff] via-[#faf6ee] to-[#f4ebe0] border border-[#e2d5c3] rounded-3xl p-6 sm:p-7 shadow-xs relative overflow-hidden">

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Side: Interactive Cakra Kiblat Papat Visual Compass */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-[#8c6239]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6b5643]">
              Cakra Pancawara (Kiblat Papat Kalima Pancer)
            </span>
          </div>

          {/* Interactive Dial */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-[#dacfc0] flex items-center justify-center p-3 bg-white/60 shadow-inner">
            {/* Concentric rings */}
            <div className="absolute inset-4 rounded-full border border-[#ece2d4] pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-[#f2e9dc] pointer-events-none" />

            {/* North (Utara) - WAGE */}
            <button
              onClick={() => handleSelect("Wage")}
              className={`absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-xs flex flex-col items-center ${
                currentForecast.pasaran === "Wage"
                  ? "ring-2 ring-[#8c6239] ring-offset-2"
                  : ""
              } ${
                selectedPasaran === "Wage"
                  ? "bg-stone-900 text-white border-stone-900 scale-105"
                  : "bg-white text-stone-800 border-stone-300 hover:bg-stone-100"
              }`}
            >
              <span className="text-[10px] text-stone-400 font-medium">Lor (Utara)</span>
              <span className="font-display font-bold">Wage (4)</span>
            </button>

            {/* East (Timur) - LEGI */}
            <button
              onClick={() => handleSelect("Legi")}
              className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-xs flex flex-col items-center ${
                currentForecast.pasaran === "Legi"
                  ? "ring-2 ring-[#8c6239] ring-offset-2"
                  : ""
              } ${
                selectedPasaran === "Legi"
                  ? "bg-emerald-800 text-white border-emerald-800 scale-105"
                  : "bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span className="text-[10px] text-emerald-300 font-medium">Wetan (Timur)</span>
              <span className="font-display font-bold">Legi (5)</span>
            </button>

            {/* South (Selatan) - PAHING */}
            <button
              onClick={() => handleSelect("Pahing")}
              className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-xs flex flex-col items-center ${
                currentForecast.pasaran === "Pahing"
                  ? "ring-2 ring-[#8c6239] ring-offset-2"
                  : ""
              } ${
                selectedPasaran === "Pahing"
                  ? "bg-rose-800 text-white border-rose-800 scale-105"
                  : "bg-white text-rose-900 border-rose-300 hover:bg-rose-50"
              }`}
            >
              <span className="text-[10px] text-rose-300 font-medium">Kidul (Selatan)</span>
              <span className="font-display font-bold">Pahing (9)</span>
            </button>

            {/* West (Barat) - PON */}
            <button
              onClick={() => handleSelect("Pon")}
              className={`absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-xs flex flex-col items-center ${
                currentForecast.pasaran === "Pon"
                  ? "ring-2 ring-[#8c6239] ring-offset-2"
                  : ""
              } ${
                selectedPasaran === "Pon"
                  ? "bg-amber-800 text-white border-amber-800 scale-105"
                  : "bg-white text-amber-900 border-amber-300 hover:bg-amber-50"
              }`}
            >
              <span className="text-[10px] text-amber-300 font-medium">Kulon (Barat)</span>
              <span className="font-display font-bold">Pon (7)</span>
            </button>

            {/* Center (Pancer) - KLIWON */}
            <button
              onClick={() => handleSelect("Kliwon")}
              className={`w-24 h-24 rounded-full border-2 text-center p-2 flex flex-col items-center justify-center transition-all cursor-pointer shadow-md ${
                currentForecast.pasaran === "Kliwon"
                  ? "ring-2 ring-[#8c6239] ring-offset-2"
                  : ""
              } ${
                selectedPasaran === "Kliwon"
                  ? "bg-[#382315] text-white border-[#c89b3c] scale-105"
                  : "bg-[#f5ede3] text-[#3d2716] border-[#dac9b6] hover:bg-[#ede1d3]"
              }`}
            >
              <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">
                Pancer
              </span>
              <span className="font-display text-sm font-bold">Kliwon</span>
              <span className="text-[10px] opacity-90 font-medium mt-0.5">
                Neptu 8
              </span>
            </button>
          </div>

          <div className="text-[11px] text-[#7a6755] mt-2.5 text-center">
            * Klik penjuru untuk melihat arketipe & kearifan lima pasaran Jawa
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white/95 border border-[#e4d8c8] rounded-2xl p-5 shadow-xs space-y-3.5 relative z-10">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#f1e8dc] gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#2d2013] leading-tight">
                  Pasaran {activeCosmology.name}
                </h4>
                {isCurrentActive && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                    Aktif Hari Ini
                  </span>
                )}
              </div>
              <div className="text-xs text-[#7d6c5a] mt-1.5 leading-normal">
                Arah: <strong>{activeCosmology.direction}</strong> • Unsur:{" "}
                <strong>{activeCosmology.element}</strong>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[11px] uppercase tracking-wider text-[#8b7968] font-semibold">
                Bobot Neptu
              </div>
              <div className="font-display text-2xl font-bold text-[#3d2817]">
                {activeCosmology.neptu}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#483626] min-w-[100px]">
                Warna Kosmis:
              </span>
              <span className="text-[#594838]">{activeCosmology.colorName}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#483626] min-w-[100px]">
                Karakter Jiwa:
              </span>
              <span className="text-[#594838] leading-relaxed">
                {activeCosmology.character}
              </span>
            </div>

            <div className="flex items-start gap-2 pt-1 border-t border-[#f4ebdf]">
              <span className="font-semibold text-[#483626] min-w-[100px]">
                Kearifan Hari:
              </span>
              <span className="text-[#594838] leading-relaxed">
                {activeCosmology.name === "Legi" &&
                  "Waktu yang subur untuk bernegosiasi, merajut perdamaian, dan silaturahmi."}
                {activeCosmology.name === "Pahing" &&
                  "Mendorong eksekusi proyek berani, peluncuran karya, dan memecahkan kebekuan."}
                {activeCosmology.name === "Pon" &&
                  "Sangat selaras untuk menata pembukuan, transaksi jangka panjang, dan meletakkan fondasi."}
                {activeCosmology.name === "Wage" &&
                  "Mengajak hening, riset mendalam, menahan diri dari keputusan gegabah, dan introspeksi."}
                {activeCosmology.name === "Kliwon" &&
                  "Membuka intuisi batin, doa tulus, kepemimpinan bijak, dan menghimpun kekuatan spiritual."}
              </span>
            </div>
          </div>

          {/* Quick Neptu Contribution Indicator */}
          <div className="pt-2 border-t border-[#f1e8dc] flex items-center justify-between text-[11px] text-[#827160]">
            <span>
              Hari ini: <strong>{currentForecast.hari}</strong> ({currentForecast.neptuHari}) +{" "}
              <strong>{currentForecast.pasaran}</strong> ({currentForecast.neptuPasaran})
            </span>
            <span className="font-bold text-[#3d2716]">
              Total Neptu: {currentForecast.totalNeptu}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
