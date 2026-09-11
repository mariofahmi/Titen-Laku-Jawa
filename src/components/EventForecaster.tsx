import React, { useState, useMemo } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Sparkles,
  Info,
  CalendarDays,
  Heart,
  Briefcase,
  Home,
  FileSignature,
  Rocket,
  Flame,
  Sunrise,
  Crown,
} from "lucide-react";
import { IntentionType, DayMatchScore } from "../types";
import { INTENTION_CONFIGS } from "../data/pawukonData";
import { findBestDaysForIntention } from "../utils/javaneseCalendar";
import { gamelanAudio } from "../utils/audioChime";

interface EventForecasterProps {
  onSelectDate: (date: Date) => void;
  onOpenConsultationWithIntention?: (intention: string, dateStr: string) => void;
}

const INTENTION_ICONS: Record<IntentionType, React.ReactNode> = {
  pernikahan: <Heart className="w-4 h-4 text-rose-500" />,
  bisnis: <Briefcase className="w-4 h-4 text-amber-600" />,
  pindah_rumah: <Home className="w-4 h-4 text-emerald-600" />,
  kontrak: <FileSignature className="w-4 h-4 text-blue-600" />,
  peluncuran: <Rocket className="w-4 h-4 text-indigo-600" />,
  spiritual: <Flame className="w-4 h-4 text-amber-500" />,
  refleksi_penutupan: <Sunrise className="w-4 h-4 text-violet-600" />,
};

export const EventForecaster: React.FC<EventForecasterProps> = ({
  onSelectDate,
  onOpenConsultationWithIntention,
}) => {
  const [selectedIntention, setSelectedIntention] =
    useState<IntentionType>("bisnis");
  const [startDateStr, setStartDateStr] = useState<string>(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });
  const [daysAhead, setDaysAhead] = useState<number>(60);
  const [onlyWeekend, setOnlyWeekend] = useState<boolean>(false);
  const [minScore, setMinScore] = useState<number>(70);

  const currentConfig = useMemo(() => {
    return (
      INTENTION_CONFIGS.find((c) => c.id === selectedIntention) ||
      INTENTION_CONFIGS[0]
    );
  }, [selectedIntention]);

  // Compute forecast matches
  const matchedDays: DayMatchScore[] = useMemo(() => {
    const [y, m, d] = startDateStr.split("-").map(Number);
    const start = new Date(y, m - 1, d);
    const all = findBestDaysForIntention(start, daysAhead, selectedIntention);

    return all.filter((item) => {
      if (item.score < minScore) return false;
      if (onlyWeekend) {
        const h = item.forecast.hari;
        return h === "Sabtu" || h === "Minggu";
      }
      return true;
    });
  }, [startDateStr, daysAhead, selectedIntention, onlyWeekend, minScore]);

  const handleSelectIntention = (id: IntentionType) => {
    setSelectedIntention(id);
    gamelanAudio.playChime("bonang");
  };

  return (
    <div className="space-y-7">
      {/* Header Guidance Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#faf6ef] to-[#f4ebe1] border border-[#e4d7c5] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#c49746]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ebdcc9] text-[#5e452c] text-xs font-bold uppercase tracking-wider mb-2.5 border border-[#decaba]">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Metode 4 Langkah Penyelarasan Waktu (Bab 4.1)</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#271a0e]">
              Forecasting Hari Baik Sesuai Niat
            </h2>
            <p className="text-sm sm:text-base text-[#685744] mt-2 max-w-2xl leading-relaxed">
              Memilih hari baik bukanlah mencari ramalan klenik, melainkan seni menyelaraskan energi manusia dengan irama alam—seperti pelaut handal yang memanfaatkan hembusan angin untuk mempercepat laju perahu.
            </p>
          </div>
          <div className="bg-white/90 border border-[#e2d4c0] rounded-2xl p-4 text-xs text-[#6e5843] max-w-sm shadow-xs">
            <span className="font-bold block text-[#332213] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Prinsip Pintu Terbuka:
            </span>
            "Titen Laku Jawa membantu Anda mendorong pintu yang sudah terbuka sedikit oleh alam, bukan memaksa menendang pintu yang sedang tertutup."
          </div>
        </div>
      </div>

      {/* Step 1: Intention Selection */}
      <div className="bg-white border border-[#e4d7c5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#f3ebdf]">
          <div className="text-xs uppercase tracking-wider text-[#826e5a] font-bold flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#332213] text-[#f5ebd9] text-[10px] font-bold flex items-center justify-center">
              1
            </span>
            <span>Tentukan Niat & Hajat Anda</span>
          </div>
          <span className="text-xs text-[#826e5a] font-semibold">
            {INTENTION_CONFIGS.length} Kategori
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {INTENTION_CONFIGS.map((item) => {
            const isSelected = selectedIntention === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectIntention(item.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-xs ${
                  isSelected
                    ? "bg-[#332214] text-[#f7efe3] border-[#332214] shadow-md ring-2 ring-[#c49746]"
                    : "bg-[#faf7f2] hover:bg-[#f3ede1] text-[#332214] border-[#e8dcce]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-white/80 border border-[#e2d5c3]">
                    {INTENTION_ICONS[item.id]}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-amber-400 bg-black/30 px-2 py-0.5 rounded-full">
                      Dipilih
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm font-serif-title">
                    {item.title}
                  </div>
                  <div
                    className={`text-[11px] mt-1 line-clamp-1 ${
                      isSelected ? "text-[#ddcfbe]" : "text-[#7a6855]"
                    }`}
                  >
                    {item.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Intention Philosophy Banner */}
        <div className="bg-[#faf5ed] border border-[#ebdcc9] rounded-2xl p-4 text-xs text-[#594632] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#8c6239] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#382a1b]">
              Kebutuhan Inti Energi ({currentConfig.title}):{" "}
            </span>
            <span className="font-medium">{currentConfig.coreNeeds}. </span>
            <span className="italic block mt-1 text-[#78634f] leading-relaxed">
              {currentConfig.description}
            </span>
          </div>
        </div>
      </div>

      {/* Steps 2-4: Filters & Date Horizon */}
      <div className="bg-white border border-[#e4d7c5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#826e5a] font-bold pb-2 border-b border-[#f3ebdf]">
          <span className="w-5 h-5 rounded-full bg-[#332213] text-[#f5ebd9] text-[10px] font-bold flex items-center justify-center">
            2
          </span>
          <Filter className="w-3.5 h-3.5" />
          <span>Rentang Waktu & Parameter Penyesuaian</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#4d3824] mb-1.5">
              Mulai Pindai Dari Tanggal
            </label>
            <input
              type="date"
              value={startDateStr}
              onChange={(e) => setStartDateStr(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#dacbb7] text-[#332214] text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4d3824] mb-1.5">
              Rentang Pindai Waktu
            </label>
            <select
              value={daysAhead}
              onChange={(e) => setDaysAhead(Number(e.target.value))}
              className="w-full bg-[#faf7f2] border border-[#dacbb7] text-[#332214] text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none cursor-pointer"
            >
              <option value={30}>30 Hari Ke Depan (~1 Bulan)</option>
              <option value={60}>60 Hari Ke Depan (~2 Bulan)</option>
              <option value={90}>90 Hari Ke Depan (~3 Bulan)</option>
              <option value={180}>180 Hari Ke Depan (~6 Bulan)</option>
              <option value={210}>210 Hari (1 Siklus Pawukon Penuh)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4d3824] mb-1.5">
              Toleransi Keselarasan
            </label>
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full bg-[#faf7f2] border border-[#dacbb7] text-[#332214] text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none cursor-pointer"
            >
              <option value={80}>Sangat Selaras (Skor ≥ 80%)</option>
              <option value={70}>Cukup Baik & Selaras (Skor ≥ 70%)</option>
              <option value={50}>Semua Hari yang Memungkinkan (≥ 50%)</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#e3d7c7] bg-[#faf7f2] cursor-pointer hover:bg-[#f3ece0] transition-colors">
              <input
                type="checkbox"
                checked={onlyWeekend}
                onChange={(e) => setOnlyWeekend(e.target.checked)}
                className="w-4 h-4 rounded text-[#8c6239] focus:ring-[#8c6239] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#483727]">
                Hanya Akhir Pekan (Sabtu / Minggu)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-[#2c1d10]">
            Rekomendasi Hari Terbaik ({matchedDays.length} Hari Ditemukan)
          </h3>
          <p className="text-xs text-[#786552]">
            Diurutkan berdasarkan skor matematis keselarasan Wuku, Pasaran, dan Siklus Harian.
          </p>
        </div>
      </div>

      {/* Cards List of Best Days */}
      {matchedDays.length === 0 ? (
        <div className="bg-white border border-[#e4d7c5] rounded-3xl p-10 text-center space-y-3 shadow-xs">
          <CalendarDays className="w-12 h-12 text-[#a89582] mx-auto opacity-70" />
          <h4 className="font-display text-lg font-bold text-[#453424]">
            Tidak ada hari yang memenuhi ambang batas filter ini
          </h4>
          <p className="text-xs text-[#7e6c5a] max-w-md mx-auto leading-relaxed">
            Coba turunkan ambang batas skor keselarasan atau matikan filter
            "Hanya Akhir Pekan" untuk melihat lebih banyak opsi hari.
          </p>
          <button
            onClick={() => {
              setMinScore(50);
              setOnlyWeekend(false);
              gamelanAudio.playChime("ting");
            }}
            className="text-xs px-5 py-2.5 rounded-xl bg-[#332213] text-white font-bold hover:bg-[#4d341f] transition-colors cursor-pointer shadow-xs"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matchedDays.map((item, idx) => {
            const f = item.forecast;
            const isTop3 = idx < 3;
            return (
              <div
                key={f.dateStr}
                className="bg-white border border-[#e3d7c7] hover:border-[#c5b097] rounded-3xl p-6 transition-all shadow-xs flex flex-col justify-between relative overflow-hidden"
              >
                {isTop3 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-200" />
                    <span>Opsi Unggulan #{idx + 1}</span>
                  </div>
                )}

                <div>
                  {/* Top Bar with Score Ring & Date */}
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#f1e9dd]">
                    <div>
                      <div className="text-[11px] text-[#867462] font-bold uppercase tracking-wider">
                        {new Date(f.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="font-display text-xl font-bold text-[#291a0e] flex items-center gap-2 mt-0.5">
                        <span>{f.weton}</span>
                        <span className="text-xs font-semibold text-[#6e5844] bg-[#f5ede3] px-2.5 py-0.5 rounded-lg border border-[#e8decf]">
                          Neptu {f.totalNeptu}
                        </span>
                      </div>
                    </div>

                    {/* Circular Score Visual Indicator */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-stone-200"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={
                              item.score >= 82
                                ? "text-emerald-600"
                                : item.score >= 70
                                ? "text-amber-600"
                                : "text-stone-500"
                            }
                            strokeDasharray={`${item.score}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-bold text-[#2d1c0c]">
                          {item.score}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-cycle Mini Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 py-3 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-[#faf6f0] text-[#4d3a29] border border-[#e8ded0]">
                      Wuku: <strong className="text-[#2b1f13]">{f.wuku.name}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#faf6f0] text-[#4d3a29] border border-[#e8ded0]">
                      Caturworo: <strong className="text-[#2b1f13]">{f.caturworo.name}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#faf6f0] text-[#4d3a29] border border-[#e8ded0]">
                      Triworo: <strong className="text-[#2b1f13]">{f.triworo.name}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#faf6f0] text-[#4d3a29] border border-[#e8ded0]">
                      Dasaworo: <strong className="text-[#2b1f13]">{f.dasaworo.name}</strong>
                    </span>
                  </div>

                  {/* Reasons & Strengths */}
                  <div className="space-y-1.5 mt-1">
                    {item.reasons.map((r, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-start gap-2 text-xs text-[#2e4533] leading-relaxed"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  {/* Warnings & Cautions (if any) */}
                  {item.warnings.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#f4ecdf] space-y-1">
                      {item.warnings.map((w, wIdx) => (
                        <div
                          key={wIdx}
                          className="flex items-start gap-2 text-[11px] text-[#7a4437]"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[#f1e9dd]">
                  <button
                    onClick={() => {
                      onSelectDate(f.date);
                      gamelanAudio.playChime("bonang");
                    }}
                    className="text-xs font-bold text-[#4a3420] hover:text-[#1e1208] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Buka di Kompas Hari Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {onOpenConsultationWithIntention && (
                    <button
                      onClick={() => {
                        onOpenConsultationWithIntention(
                          currentConfig.title,
                          `${f.dateStr} (${f.weton}, Wuku ${f.wuku.name})`
                        );
                        gamelanAudio.playChime("gong");
                      }}
                      className="text-xs px-3 py-1.5 rounded-xl bg-[#faf5ed] hover:bg-[#ede2d2] text-[#453424] font-bold border border-[#dfd0be] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Wejangan AI</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

