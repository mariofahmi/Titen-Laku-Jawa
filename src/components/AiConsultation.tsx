import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Send,
  HelpCircle,
  AlertCircle,
  Feather,
  RefreshCw,
  Clock,
} from "lucide-react";

interface AiConsultationProps {
  initialIntention?: string;
  initialTargetDate?: string;
  initialUserWeton?: string;
}

const PRESET_QUESTIONS = [
  {
    title: "Membuka Usaha Kafe / Bisnis",
    intention: "Membuka kedai kopi / kafe kecil bersama rekan kerja",
    context:
      "Kami berdua ingin memastikan waktu peluncuran yang harmonis dan meminimalkan gesekan kemitraan.",
  },
  {
    title: "Menyelaraskan Hari Pernikahan",
    intention: "Merencanakan prosesi lamaran dan akad pernikahan keluarga",
    context:
      "Mencari panduan menyelaraskan restu kedua keluarga besar dan kelimpahan rumah tangga.",
  },
  {
    title: "Menghadapi Waktu Ketidakpastian (Kabut Wuye / Bala)",
    intention: "Menghadapi situasi kerja yang penuh intrik dan kebuntuan arah",
    context:
      "Bagaimana menerapkan kearifan Pawukon untuk menahan diri dan bersabar aktif?",
  },
  {
    title: "Pindah Rumah & Menata Tempat Tinggal",
    intention: "Pindah ke rumah baru dan meletakkan perabot utama",
    context:
      "Ingin suasana rumah tangga yang adem ayem, kokoh, dan diterima tetangga sekitar.",
  },
];

export const AiConsultation: React.FC<AiConsultationProps> = ({
  initialIntention = "",
  initialTargetDate = "",
  initialUserWeton = "",
}) => {
  const [intention, setIntention] = useState<string>(initialIntention);
  const [targetDate, setTargetDate] = useState<string>(initialTargetDate);
  const [contextDetails, setContextDetails] = useState<string>("");
  const [userWeton, setUserWeton] = useState<string>(initialUserWeton);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseHtml, setResponseHtml] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync props when updated externally
  useEffect(() => {
    if (initialIntention) setIntention(initialIntention);
    if (initialTargetDate) setTargetDate(initialTargetDate);
    if (initialUserWeton) setUserWeton(initialUserWeton);
  }, [initialIntention, initialTargetDate, initialUserWeton]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!intention.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/forecast-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intention: intention.trim(),
          targetDate: targetDate.trim(),
          contextDetails: contextDetails.trim(),
          userWeton: userWeton.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mendapatkan tanggapan.");
      }

      setResponseHtml(data.text);
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          "Terjadi kendala saat menghubungi Pujangga AI. Pastikan GEMINI_API_KEY telah diatur."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPreset = (item: (typeof PRESET_QUESTIONS)[0]) => {
    setIntention(item.intention);
    setContextDetails(item.context);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Intro Banner */}
      <div className="bg-[#f5efe6] border border-[#e4d8c8] rounded-3xl p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdcca] text-[#634e38] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Kearifan Waktu & Konsultasi Batin</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2b1f13]">
              Bincang Pujangga Pawukon AI
            </h2>
            <p className="text-sm text-[#6c5a47] mt-1 max-w-2xl">
              Tanyakan rencana atau keresahan hidup Anda. Pujangga Pawukon akan
              menganalisis keselarasan niat dengan iklim waktu Kalender Jawa,
              memberikan strategi penaburan benih, serta rambu-rambu kewaspadaan.
            </p>
          </div>
          <div className="text-xs text-[#806c58] bg-white/80 border border-[#e2d5c5] rounded-2xl p-3.5 max-w-xs">
            ✨ Didukung model cerdas Gemini 3.8 Flash yang dituntun oleh filosofi
            buku Mario Fahmi Syahrial.
          </div>
        </div>
      </div>

      {/* Preset Ideas Chips */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#826f5d] uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Contoh Pertanyaan & Kasus Rencana:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(q)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white border border-[#e5d8c8] hover:bg-[#faf4ec] text-[#4d3c2b] transition-colors cursor-pointer"
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {/* Form Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#e3d7c7] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#483727] mb-1.5">
              Niat Inti / Rencana Kegiatan *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Membuka toko batik di kota baru bersama teman"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#dacfc0] text-[#33261a] text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#483727] mb-1.5">
              Tanggal Sasaran (Jika Ada)
            </label>
            <input
              type="text"
              placeholder="Contoh: 15 Mei 2026 atau bulan depan"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#dacfc0] text-[#33261a] text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#483727] mb-1.5">
              Weton Kelahiran Anda (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Rabu Wage (Neptu 11, Wuku Maktal)"
              value={userWeton}
              onChange={(e) => setUserWeton(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#dacfc0] text-[#33261a] text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#483727] mb-1.5">
              Detail Konteks Tambahan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Ada sedikit perbedaan pendapat dengan mitra usaha"
              value={contextDetails}
              onChange={(e) => setContextDetails(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#dacfc0] text-[#33261a] text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#827160]">
            Pujangga akan mengaitkan wuku, pasaran, dan kearifan alam Sadworo.
          </p>

          <button
            type="submit"
            disabled={isLoading || !intention.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#3f2f20] hover:bg-[#543e2b] disabled:opacity-50 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Menenun Wejangan Waktu...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-300" />
                <span>Konsultasikan Rencana</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Catatan:</span>
            {errorMessage}
          </div>
        </div>
      )}

      {/* AI Consultation Response Card */}
      {responseHtml && (
        <div className="bg-white border border-[#e2d5c4] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-[#f0e7db]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#8c6239] text-white flex items-center justify-center">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#2a1d11]">
                  Wejangan Pujangga Pawukon
                </h3>
                <p className="text-xs text-[#7e6d5b]">
                  Peta Iklim Spiritual & Navigasi Rencana Anda
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="text-xs text-[#8c6239] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Perbarui Panduan</span>
            </button>
          </div>

          <div className="prose prose-stone max-w-none text-sm text-[#3b2c1f] leading-relaxed whitespace-pre-wrap font-serif-title">
            {responseHtml}
          </div>

          <div className="pt-4 border-t border-[#f0e7db] text-[11px] text-[#867563] italic">
            * Wejangan ini bertindak sebagai kompas kesadaran batin, bukan ramalan
            mutlak yang menggantikan nalar sehat dan ikhtiar lahiriah.
          </div>
        </div>
      )}
    </div>
  );
};
