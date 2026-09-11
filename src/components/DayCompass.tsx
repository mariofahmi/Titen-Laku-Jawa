import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  TreePine,
  TrendingUp,
  Boxes,
  Users,
  Moon,
  Feather,
  Copy,
  Check,
  Compass,
} from "lucide-react";
import { DayForecast } from "../types";
import { PawukonCompassWidget } from "./PawukonCompassWidget";
import { gamelanAudio } from "../utils/audioChime";

interface DayCompassProps {
  currentForecast: DayForecast;
  onSelectDate: (date: Date) => void;
  onOpenConsultationWithDate?: (dateStr: string) => void;
  onOpenJournalWithDate?: (forecast: DayForecast) => void;
}

export const DayCompass: React.FC<DayCompassProps> = ({
  currentForecast,
  onSelectDate,
  onOpenConsultationWithDate,
  onOpenJournalWithDate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const [y, m, d] = e.target.value.split("-").map(Number);
      const newDate = new Date(y, m - 1, d);
      onSelectDate(newDate);
      gamelanAudio.playChime("bonang");
    }
  };

  const handleStepDay = (step: number) => {
    const next = new Date(currentForecast.date);
    next.setDate(next.getDate() + step);
    onSelectDate(next);
    gamelanAudio.playChime("bonang");
  };

  const copyDaySummary = () => {
    const summary = `📅 TITEN LAKU JAWA - IKHTISAR HARI INI
📅 ${new Date(currentForecast.date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
✨ Weton: ${currentForecast.weton} (Neptu ${currentForecast.totalNeptu})
🌀 Wuku: ${currentForecast.wuku.name} (#${currentForecast.wuku.number} - Fase ${currentForecast.wuku.faseNumber}: ${currentForecast.wuku.faseTitle})
📜 Sasi: ${currentForecast.sasi}
🌾 Multicycles:
• Sadworo: ${currentForecast.sadworo.name} (${currentForecast.sadworo.meaning})
• Caturworo: ${currentForecast.caturworo.name} (${currentForecast.caturworo.meaning})
• Triworo: ${currentForecast.triworo.name} (${currentForecast.triworo.element})
• Dasaworo: ${currentForecast.dasaworo.name} (${currentForecast.dasaworo.archetype})

💡 Watak Waktu: "${currentForecast.synthesisWatak}"
🌱 Rekomendasi: ${currentForecast.recommendedFor.slice(0, 2).join(", ")}
⚠️ Kewaspadaan: ${currentForecast.avoidFor.slice(0, 2).join(", ")}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    gamelanAudio.playChime("ting");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-7">
      {/* Date Navigation & Selector Bar */}
      <div className="bg-[#faf6ee] border border-[#e4d7c5] rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStepDay(-1)}
            className="p-2.5 rounded-2xl bg-white border border-[#dacbb7] hover:bg-[#ede1ce] text-[#4d3723] transition-colors cursor-pointer shadow-xs"
            title="Hari Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative">
            <input
              type="date"
              value={currentForecast.dateStr}
              onChange={handleDateChange}
              className="bg-white border border-[#dacbb7] text-[#332214] font-semibold text-sm rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none cursor-pointer shadow-xs"
            />
          </div>

          <button
            onClick={() => handleStepDay(1)}
            className="p-2.5 rounded-2xl bg-white border border-[#dacbb7] hover:bg-[#ede1ce] text-[#4d3723] transition-colors cursor-pointer shadow-xs"
            title="Hari Berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              onSelectDate(new Date());
              gamelanAudio.playChime("gong");
            }}
            className="text-xs bg-[#ebddcb] hover:bg-[#decaba] text-[#4a3622] px-3.5 py-2.5 rounded-2xl font-bold transition-colors cursor-pointer shadow-xs"
          >
            Hari Ini
          </button>
        </div>

        {/* Date Display & Share / Copy Button */}
        <div className="flex items-center gap-3">
          <div className="text-center sm:text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#826e5a] font-bold">
              Penanggalan Masehi & Jawa
            </div>
            <div className="text-sm font-bold text-[#2d1e11]">
              {new Date(currentForecast.date).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              • Sasi {currentForecast.sasi}
            </div>
          </div>

          <button
            onClick={copyDaySummary}
            className={`p-2.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 shadow-xs ${
              copied
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-[#523e2b] border-[#dacbb7] hover:bg-[#f5ede2]"
            }`}
            title="Salin Ikhtisar Hari Ini"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span className="hidden sm:inline">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#8c6239]" />
                <span className="hidden sm:inline">Salin Kartu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Card: Watak Waktu & Weton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#faf6ef] to-[#f4ebe1] border border-[#e2d4c0] rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Subtle Watermark & Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-[#c49746]/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#eadbc7] relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ebdcc9] text-[#5e452c] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs border border-[#decaba]">
              <Moon className="w-3.5 h-3.5" />
              <span>Sistem Pawukon & Pancawara Jawa</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#271a0e] tracking-tight">
              {currentForecast.weton}
            </h2>
            <p className="text-[#63513f] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Perpaduan dinamis hari <strong>{currentForecast.hari}</strong> dengan pasaran{" "}
              <strong>{currentForecast.pasaran}</strong>. Membawa bobot vibrasi numerik Neptu{" "}
              <span className="font-bold text-[#2d1c0c] bg-[#faedd9] px-2 py-0.5 rounded-lg border border-[#e2cda9]">
                {currentForecast.totalNeptu}
              </span>{" "}
              ({currentForecast.hari}: {currentForecast.neptuHari} +{" "}
              {currentForecast.pasaran}: {currentForecast.neptuPasaran}).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="bg-white/90 border border-[#e2d4c0] rounded-2xl p-4 text-center min-w-[130px] shadow-xs">
              <div className="text-[10px] uppercase tracking-wider text-[#826e5a] font-bold">
                Wuku ke-{currentForecast.wuku.number}
              </div>
              <div className="font-display text-2xl font-bold text-[#302011]">
                {currentForecast.wuku.name}
              </div>
              <div className="text-[11px] text-[#78634e] mt-0.5 font-medium">
                Fase {currentForecast.wuku.faseNumber}
              </div>
            </div>

            <div className="bg-white/90 border border-[#e2d4c0] rounded-2xl p-4 text-center min-w-[130px] shadow-xs">
              <div className="text-[10px] uppercase tracking-wider text-[#826e5a] font-bold">
                Sasi Jawa
              </div>
              <div className="font-display text-2xl font-bold text-[#302011]">
                {currentForecast.sasi}
              </div>
              <div className="text-[11px] text-[#78634e] mt-0.5 font-medium">
                Siklus 210 Hari
              </div>
            </div>
          </div>
        </div>

        {/* Synthesis: Tenunan Benang Waktu */}
        <div className="pt-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7d654d] uppercase tracking-wider mb-2">
            <Feather className="w-4 h-4 text-[#8c6239]" />
            <span>Bagaimana Watak Hari Ini? (Tenunan Benang Waktu)</span>
          </div>
          <p className="text-base sm:text-xl text-[#312011] leading-relaxed font-serif-title italic">
            "{currentForecast.synthesisWatak}"
          </p>
          <p className="text-xs text-[#75624e] mt-2.5">
            <strong>Tema Wuku:</strong> {currentForecast.wuku.subtitle}. {currentForecast.wuku.character}
          </p>
        </div>
      </div>

      {/* Interactive Pawukon Compass & 5 Pasaran Cosmology Widget */}
      <PawukonCompassWidget currentForecast={currentForecast} />

      {/* Grid of the Multicycles (Sadworo, Caturworo, Triworo, Dasaworo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sadworo (6 Hari) - Alam & Ekologi */}
        <div className="bg-white border border-[#e5d8c6] rounded-2xl p-5 hover:border-[#c5b097] transition-all shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] uppercase tracking-wider text-[#7e6955] font-bold">
                Sadworo (6 Hari)
              </span>
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <TreePine className="w-4 h-4" />
              </span>
            </div>
            <div className="font-display text-xl font-bold text-[#291a0d]">
              {currentForecast.sadworo.name}
            </div>
            <div className="text-xs font-semibold text-emerald-800 mt-0.5">
              Unsur: {currentForecast.sadworo.meaning}
            </div>
            <div className="text-xs text-[#63513f] mt-2.5 pt-2 border-t border-[#f2e9dc] leading-relaxed">
              <span className="font-bold text-[#3d2918]">Kearifan: </span>
              {currentForecast.sadworo.ecologicalWisdom}
            </div>
          </div>
          <div className="text-[11px] text-amber-900 bg-amber-50 rounded-xl p-2.5 mt-3 border border-amber-200/60 font-medium">
            ⚠️ {currentForecast.sadworo.prohibitionOrGuidance}
          </div>
        </div>

        {/* Caturworo (4 Hari) - Nasib & Sosial */}
        <div className="bg-white border border-[#e5d8c6] rounded-2xl p-5 hover:border-[#c5b097] transition-all shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] uppercase tracking-wider text-[#7e6955] font-bold">
                Caturworo (4 Hari)
              </span>
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="font-display text-xl font-bold text-[#291a0d]">
              {currentForecast.caturworo.name}
            </div>
            <div className="text-xs font-semibold text-amber-900 mt-0.5">
              Fokus: {currentForecast.caturworo.meaning}
            </div>
            <div className="text-xs text-[#63513f] mt-2.5 pt-2 border-t border-[#f2e9dc] leading-relaxed">
              <span className="font-bold text-[#3d2918]">Dinamika: </span>
              {currentForecast.caturworo.focus}
            </div>
          </div>
          <div className="text-[11px] text-[#63513f] bg-[#faf5ed] rounded-xl p-2.5 mt-3 border border-[#ebdccb]">
            Perputaran 4 pilar rezeki & keseimbangan sosial.
          </div>
        </div>

        {/* Triworo (3 Hari) - Unsur Material */}
        <div className="bg-white border border-[#e5d8c6] rounded-2xl p-5 hover:border-[#c5b097] transition-all shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] uppercase tracking-wider text-[#7e6955] font-bold">
                Triworo (3 Hari)
              </span>
              <span className="p-1.5 rounded-lg bg-stone-100 text-stone-800">
                <Boxes className="w-4 h-4" />
              </span>
            </div>
            <div className="font-display text-xl font-bold text-[#291a0d]">
              {currentForecast.triworo.name}
            </div>
            <div className="text-xs font-semibold text-stone-800 mt-0.5">
              Material: {currentForecast.triworo.element}
            </div>
            <div className="text-xs text-[#63513f] mt-2.5 pt-2 border-t border-[#f2e9dc] leading-relaxed">
              <span className="font-bold text-[#3d2918]">Energi: </span>
              {currentForecast.triworo.energy}
            </div>
          </div>
          <div className="text-[11px] text-[#63513f] bg-[#faf5ed] rounded-xl p-2.5 mt-3 border border-[#ebdccb]">
            Triworo merefleksikan daya materi: Pasah, Beteng, Kajeng.
          </div>
        </div>

        {/* Dasaworo (10 Hari) - Panggung Drama Manusia */}
        <div className="bg-white border border-[#e5d8c6] rounded-2xl p-5 hover:border-[#c5b097] transition-all shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] uppercase tracking-wider text-[#7e6955] font-bold">
                Dasaworo (10 Hari)
              </span>
              <span
                className={`p-1.5 rounded-lg font-bold ${
                  currentForecast.dasaworo.warningLevel === "alert"
                    ? "bg-rose-100 text-rose-800"
                    : currentForecast.dasaworo.warningLevel === "caution"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="font-display text-xl font-bold text-[#291a0d]">
              {currentForecast.dasaworo.name}
            </div>
            <div className="text-xs font-semibold text-[#664d36] mt-0.5">
              Arketipe: {currentForecast.dasaworo.archetype}
            </div>
            <div className="text-xs text-[#63513f] mt-2.5 pt-2 border-t border-[#f2e9dc] leading-relaxed">
              <span className="font-bold text-[#3d2918]">Lakon: </span>
              {currentForecast.dasaworo.meaning}
            </div>
          </div>
          <div className="text-[11px] text-[#63513f] bg-[#faf5ed] rounded-xl p-2.5 mt-3 border border-[#ebdccb]">
            Status: {currentForecast.dasaworo.warningLevel === "alert" ? "Waspada Emosi" : "Harmonis"}
          </div>
        </div>
      </div>

      {/* Rekomendasi & Kewaspadaan (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Recommended Actions */}
        <div className="bg-white border border-[#d2e2d2] rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3.5 pb-3 border-b border-[#e8f1e8]">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1a3821]">
                Langkah yang Didukung Energi Hari Ini
              </h3>
              <p className="text-xs text-emerald-900/70">
                Pintu aktivitas yang terbuka lebar
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {currentForecast.recommendedFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#2a3e2e]">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mindful Cautions */}
        <div className="bg-white border border-[#edd7d2] rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3.5 pb-3 border-b border-[#f5e7e4]">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#3d1e16]">
                Kebijaksanaan Menahan Diri & Kewaspadaan
              </h3>
              <p className="text-xs text-amber-900/70">
                Langkah pencegahan dan peredam konflik
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {currentForecast.avoidFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#4d3329]">
                <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-[#805f54] mt-4 pt-3 border-t border-[#f7eae6] italic leading-relaxed">
            "Mengetahui hari ini berangin kencang memungkinkan kita memilih untuk mencari tempat berlindung, bukan menghentikan seluruh langkah hidup."
          </p>
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="bg-[#faf5ee] border border-[#e5d8c6] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="text-xs sm:text-sm text-[#6e5a47]">
          Ingin mendalami rencana khusus atau mencatat perenungan hari <strong>{currentForecast.weton}</strong>?
        </div>
        <div className="flex items-center gap-2.5">
          {onOpenJournalWithDate && (
            <button
              onClick={() => {
                onOpenJournalWithDate(currentForecast);
                gamelanAudio.playChime("ting");
              }}
              className="text-xs px-4 py-2.5 rounded-xl bg-white border border-[#dacbb7] hover:bg-[#f5ede2] text-[#4d3622] font-semibold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Feather className="w-3.5 h-3.5 text-[#8c6239]" />
              <span>Tulis Jurnal Hari Ini</span>
            </button>
          )}
          {onOpenConsultationWithDate && (
            <button
              onClick={() => {
                onOpenConsultationWithDate(
                  `${currentForecast.dateStr} (${currentForecast.weton}, Wuku ${currentForecast.wuku.name})`
                );
                gamelanAudio.playChime("gong");
              }}
              className="text-xs px-4 py-2.5 rounded-xl bg-[#332213] hover:bg-[#4d341f] text-white font-semibold transition-colors cursor-pointer flex items-center gap-2 shadow-sm border border-[#c49746]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Konsultasi Pujangga AI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

