import React, { useState } from "react";
import {
  RotateCw,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  X,
  Compass,
  Layers,
} from "lucide-react";
import { WukuInfo, DayForecast } from "../types";
import { WUKU_LIST } from "../data/pawukonData";
import { gamelanAudio } from "../utils/audioChime";

interface PawukonCycleMapProps {
  currentForecast: DayForecast;
  onSelectWuku?: (wuku: WukuInfo) => void;
}

const PHASES_METADATA = [
  {
    faseNumber: 1,
    title: "Fase 1: Penanaman Niat & Fondasi",
    wukuRange: "Wuku 1 - 5 (Sinta s/d Tolu)",
    color: "from-amber-600 to-amber-700",
    bgColor: "bg-amber-50 border-amber-200 text-amber-900",
    theme:
      "Awal siklus mikrokosmis. Merumuskan tujuan hidup, menajamkan logika, menegakkan fondasi, dan menstabilkan arah sebelum melangkah ke dunia luas.",
  },
  {
    faseNumber: 2,
    title: "Fase 2: Interaksi Sosial & Pengaruh",
    wukuRange: "Wuku 6 - 10 (Gumbreg s/d Sungsang)",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50 border-blue-200 text-blue-900",
    theme:
      "Terjun ke gelanggang publik. Aktivitas sosial memuncak, reputasi di panggung terang, namun rawan gesekan ego dan ketidakteraturan tak terduga.",
  },
  {
    faseNumber: 3,
    title: "Fase 3: Kemenangan, Ujian, & Transisi",
    wukuRange: "Wuku 11 - 15 (Galungan s/d Julungpujut)",
    color: "from-emerald-600 to-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200 text-emerald-900",
    theme:
      "Peneguhan nilai kebenaran (dharma), pemulihan damai, ledakan ambisi, ujian ketahanan, dan penyeberangan di jembatan rapuh.",
  },
  {
    faseNumber: 4,
    title: "Fase 4: Disiplin & Gerak Sosial",
    wukuRange: "Wuku 16 - 20 (Pahang s/d Medangkungan)",
    color: "from-indigo-600 to-indigo-700",
    bgColor: "bg-indigo-50 border-indigo-200 text-indigo-900",
    theme:
      "Kedisiplinan prajurit, mengurai benang kusut lama, membuka jejaring persaudaraan baru, musyawarah matang, dan kesabaran menanti panen.",
  },
  {
    faseNumber: 5,
    title: "Fase 5: Refleksi, Konflik, & Kebijaksanaan",
    wukuRange: "Wuku 21 - 25 (Maktal s/d Bala)",
    color: "from-rose-600 to-rose-700",
    bgColor: "bg-rose-50 border-rose-200 text-rose-900",
    theme:
      "Menyelami gua batin di tengah kabut keraguan, kilatan strategi cerdas, puncak penyelesaian konflik, dan kewaspadaan ekstra menghadapi badai Bala.",
  },
  {
    faseNumber: 6,
    title: "Fase 6: Penutupan & Persiapan Siklus Baru",
    wukuRange: "Wuku 26 - 30 (Wugu s/d Watugunung)",
    color: "from-purple-600 to-purple-700",
    bgColor: "bg-purple-50 border-purple-200 text-purple-900",
    theme:
      "Keseimbangan bersahaja, perenungan simbolik wayang, relaksasi perawatan diri di senja hari, memetik buah panen, dan penutupan tuntas di Watugunung.",
  },
];

export const PawukonCycleMap: React.FC<PawukonCycleMapProps> = ({
  currentForecast,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number | "all">("all");
  const [activeModalWuku, setActiveModalWuku] = useState<WukuInfo | null>(null);

  const filteredWukus =
    selectedPhase === "all"
      ? WUKU_LIST
      : WUKU_LIST.filter((w) => w.faseNumber === selectedPhase);

  const currentWukuNumber = currentForecast.wuku.number;

  const handlePhaseClick = (phase: number | "all") => {
    setSelectedPhase(phase);
    gamelanAudio.playChime("ting");
  };

  const handleOpenWuku = (wuku: WukuInfo) => {
    setActiveModalWuku(wuku);
    gamelanAudio.playChime("bonang");
  };

  return (
    <div className="space-y-6">
      {/* Intro Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#faf6ef] to-[#f4ebe1] border border-[#e4d7c5] rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebdcca] text-[#5e452c] text-xs font-bold uppercase tracking-wider mb-2 border border-[#decaba]">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Siklus Akbar 210 Hari Pawukon</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#271a0e]">
              Peta 6 Fase Perjalanan Hidup Manusia
            </h2>
            <p className="text-sm text-[#685744] mt-1 max-w-2xl leading-relaxed">
              Pawukon bukan sekadar deretan 30 nama minggu, melainkan 30 komposisi watak waktu yang bergulir secara siklikal. Memahami wuku berarti membaca iklim batin—kapan harus melangkah berani, bertahan kokoh, atau menepi untuk refleksi.
            </p>
          </div>

          {/* Current Position Card */}
          <div className="bg-white/95 border border-[#dfd2bf] rounded-2xl p-4 sm:p-5 shadow-xs shrink-0 min-w-[260px]">
            <div className="text-[11px] font-bold text-[#826e5a] uppercase tracking-wider">
              Posisi Hari Ini di Siklus
            </div>
            <div className="font-display text-xl font-bold text-[#2b1f13] mt-0.5">
              Wuku {currentForecast.wuku.name}{" "}
              <span className="text-sm font-medium text-[#756453]">
                (Wuku #{currentWukuNumber}/30)
              </span>
            </div>
            <div className="text-xs text-amber-900 font-semibold mt-1">
              Fase {currentForecast.wuku.faseNumber}:{" "}
              {currentForecast.wuku.faseTitle}
            </div>
            <div className="w-full bg-[#eee3d4] rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#c49746] to-[#6e461f] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentWukuNumber / 30) * 100}%` }}
              />
            </div>
            <div className="text-[10px] font-semibold text-[#806c58] mt-1 text-right">
              Kemajuan Siklus: {Math.round((currentWukuNumber / 30) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Phase Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => handlePhaseClick("all")}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedPhase === "all"
              ? "bg-[#332213] text-white shadow-xs"
              : "bg-white border border-[#e4dacb] text-[#594735] hover:bg-[#f6efe4]"
          }`}
        >
          Semua 30 Wuku
        </button>
        {PHASES_METADATA.map((p) => {
          const isSelected = selectedPhase === p.faseNumber;
          return (
            <button
              key={p.faseNumber}
              onClick={() => handlePhaseClick(p.faseNumber)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#332213] text-white shadow-xs ring-2 ring-[#c49746]"
                  : "bg-white border border-[#e4dacb] text-[#594735] hover:bg-[#f6efe4]"
              }`}
            >
              Fase {p.faseNumber}
            </button>
          );
        })}
      </div>

      {/* Phase Descriptions Box if filtered */}
      {selectedPhase !== "all" && (
        <div
          className={`p-5 rounded-3xl border ${
            PHASES_METADATA[selectedPhase - 1].bgColor
          } transition-all shadow-xs`}
        >
          <div className="text-xs font-bold uppercase tracking-wider">
            {PHASES_METADATA[selectedPhase - 1].title}
          </div>
          <div className="text-xs sm:text-sm mt-1 leading-relaxed font-medium">
            {PHASES_METADATA[selectedPhase - 1].theme}
          </div>
        </div>
      )}

      {/* 30 Wuku Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWukus.map((wuku) => {
          const isCurrent = wuku.number === currentWukuNumber;
          return (
            <div
              key={wuku.number}
              onClick={() => handleOpenWuku(wuku)}
              className={`group bg-white border rounded-3xl p-5 hover:border-[#a8937d] transition-all cursor-pointer shadow-xs relative flex flex-col justify-between ${
                isCurrent
                  ? "border-[#c49746] ring-2 ring-[#c49746]/30 bg-[#faf6ee]"
                  : "border-[#e3d7c7]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#f4ecdf]">
                  <span className="text-[10px] font-bold text-[#8b7865] uppercase tracking-wider">
                    Wuku #{wuku.number} • Fase {wuku.faseNumber}
                  </span>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Aktif Saat Ini
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-[#2b1f13] group-hover:text-[#8c6239] transition-colors">
                  {wuku.name}
                </h3>
                <div className="text-xs font-semibold text-[#8c6239] mt-0.5 line-clamp-1">
                  {wuku.subtitle}
                </div>

                <p className="text-xs text-[#544434] mt-2.5 line-clamp-3 leading-relaxed">
                  {wuku.character}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f2eadf] flex items-center justify-between text-xs text-[#8c6239] font-bold">
                <span>Lihat Wejangan & Pantangan</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail for Selected Wuku */}
      {activeModalWuku && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2d6c5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalWuku(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#756453] hover:bg-[#f3ede4] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3eae0] text-[#715c46] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Wuku ke-{activeModalWuku.number} dari 30</span>
                <span>•</span>
                <span>Fase {activeModalWuku.faseNumber}: {activeModalWuku.faseTitle}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2c1f13]">
                Wuku {activeModalWuku.name}
              </h3>
              <div className="text-sm font-semibold text-[#8c6239] mt-0.5">
                {activeModalWuku.subtitle}
              </div>
            </div>

            {/* Essence & Character */}
            <div className="bg-[#faf6f0] border border-[#ece0d1] rounded-2xl p-4 text-xs sm:text-sm text-[#453424] leading-relaxed">
              <span className="font-bold block mb-1 text-[#2c1f13]">
                Watak & Pesan Filosofis Waktu:
              </span>
              {activeModalWuku.character}
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1f3824] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Niat & Aktivitas yang Selaras (Saran Tindakan)</span>
              </div>
              <div className="space-y-1.5">
                {activeModalWuku.recommendations.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#384a3c] bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cautions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#47261d] uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Kebijaksanaan Menahan Diri & Kewaspadaan</span>
              </div>
              <div className="space-y-1.5">
                {activeModalWuku.cautions.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#543930] bg-amber-50/40 p-2.5 rounded-xl border border-amber-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-3 border-t border-[#f2eadf] flex justify-end">
              <button
                onClick={() => setActiveModalWuku(null)}
                className="px-5 py-2.5 rounded-xl bg-[#3f2f20] hover:bg-[#523e2b] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Tutup Wejangan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
