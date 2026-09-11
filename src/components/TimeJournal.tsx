import React, { useState, useEffect } from "react";
import {
  PenTool,
  Save,
  Trash2,
  Calendar,
  Sparkles,
  BookMarked,
  Feather,
  Clock,
} from "lucide-react";
import { DayForecast, JournalEntry } from "../types";

interface TimeJournalProps {
  currentForecast: DayForecast;
}

const STORAGE_KEY = "pawukon_time_journal_entries";

export const TimeJournal: React.FC<TimeJournalProps> = ({ currentForecast }) => {
  const [journalType, setJournalType] = useState<
    "awal_wuku" | "harian" | "akhir_wuku"
  >("harian");
  const [content, setContent] = useState<string>("");
  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([]);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Load saved entries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedEntries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading journal from storage:", e);
    }
  }, []);

  // Compute guided prompt based on active type and currentForecast
  const currentPrompt = React.useMemo(() => {
    if (journalType === "awal_wuku") {
      return `Minggu ini adalah Wuku ${currentForecast.wuku.name}, yang bertema "${currentForecast.wuku.subtitle}". Apa pesan atau tantangan utama yang mungkin akan Anda hadapi minggu ini? Apa satu niat yang ingin Anda fokuskan agar selaras dengan energi ini?`;
    }
    if (journalType === "akhir_wuku") {
      return `Wuku ${currentForecast.wuku.name} telah bergulir. Apa yang telah Anda pelajari tentang diri Anda minggu ini? Apakah tantangan watak wuku benar-benar hadir? Bagaimana Anda membawa hikmah ini ke wuku berikutnya?`;
    }
    // harian
    return `Hari ini adalah ${currentForecast.weton}. Bagaimana energi ini terasa dalam aktivitas dan batin Anda hari ini? Apakah Anda merasakan keharmonisan (Legi), dorongan kuat (Pahing), kestabilan (Pon), hening introspektif (Wage), atau sakralitas (Kliwon)?`;
  }, [journalType, currentForecast]);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: "jrn_" + Date.now(),
      timestamp: new Date().toISOString(),
      dateStr: currentForecast.dateStr,
      type: journalType,
      wukuName: currentForecast.wuku.name,
      weton: currentForecast.weton,
      promptQuestion: currentPrompt,
      content: content.trim(),
    };

    const updated = [newEntry, ...savedEntries];
    setSavedEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving journal:", e);
    }

    setContent("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = savedEntries.filter((item) => item.id !== id);
    setSavedEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error updating journal storage:", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Editorial */}
      <div className="bg-[#f5efe6] border border-[#e4d8c8] rounded-3xl p-6 sm:p-7">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdcca] text-[#634e38] text-xs font-semibold uppercase tracking-wider mb-2">
            <Feather className="w-3.5 h-3.5" />
            <span>Kearifan Bab 4.3: Menjadikan Waktu Sebagai Kompas Jiwa</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2b1f13]">
            Jurnal Waktu Pribadi (Refleksi Batin)
          </h2>
          <p className="text-sm text-[#6c5a47] mt-1 leading-relaxed font-serif-title">
            "Dengan praktik mencatat ini, waktu berhenti menjadi sesuatu yang
            terjadi KEPADA Anda. Ia berubah menjadi sesuatu yang terjadi UNTUK
            Anda. Kalender Jawa berubah dari sekadar buku perhitungan menjadi
            cermin yang memantulkan kembali perjalanan jiwa Anda."
          </p>
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white border border-[#e3d7c7] rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
        {/* Type Selector Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[#f2eadf]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setJournalType("awal_wuku")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                journalType === "awal_wuku"
                  ? "bg-[#3f2f20] text-white"
                  : "bg-[#faf6f0] text-[#554332] hover:bg-[#ede1d1]"
              }`}
            >
              Awal Wuku (Niat Mingguan)
            </button>
            <button
              type="button"
              onClick={() => setJournalType("harian")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                journalType === "harian"
                  ? "bg-[#3f2f20] text-white"
                  : "bg-[#faf6f0] text-[#554332] hover:bg-[#ede1d1]"
              }`}
            >
              Refleksi Harian (Pasaran)
            </button>
            <button
              type="button"
              onClick={() => setJournalType("akhir_wuku")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                journalType === "akhir_wuku"
                  ? "bg-[#3f2f20] text-white"
                  : "bg-[#faf6f0] text-[#554332] hover:bg-[#ede1d1]"
              }`}
            >
              Akhir Wuku (Evaluasi)
            </button>
          </div>

          <div className="text-xs text-[#82705e]">
            {currentForecast.weton} • Wuku {currentForecast.wuku.name}
          </div>
        </div>

        {/* Prompt Question */}
        <div className="bg-[#faf5ed] border border-[#ebdcca] rounded-2xl p-4 text-xs sm:text-sm text-[#463524] leading-relaxed flex items-start gap-3">
          <PenTool className="w-4 h-4 text-[#8c6239] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block text-[#2b1f13] mb-1">
              Pertanyaan Perenungan:
            </span>
            <span>{currentPrompt}</span>
          </div>
        </div>

        {/* Input Textarea Form */}
        <form onSubmit={handleSaveEntry} className="space-y-4">
          <textarea
            rows={4}
            required
            placeholder="Tuliskan perenungan atau niat Anda di sini (cukup beberapa kalimat jujur)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#faf7f2] border border-[#dacfc0] text-[#33261a] text-sm rounded-2xl p-4 focus:ring-2 focus:ring-[#8c6239] focus:outline-none"
          />

          <div className="flex items-center justify-between">
            {saveSuccess ? (
              <span className="text-xs font-medium text-emerald-700 animate-in fade-in">
                ✓ Catatan refleksi berhasil disimpan!
              </span>
            ) : (
              <span className="text-xs text-[#867563]">
                Tersimpan di peramban pribadi Anda.
              </span>
            )}

            <button
              type="submit"
              disabled={!content.trim()}
              className="px-5 py-2 rounded-xl bg-[#3f2f20] hover:bg-[#523e2b] disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Refleksi</span>
            </button>
          </div>
        </form>
      </div>

      {/* History of Saved Entries */}
      <div className="space-y-3">
        <h3 className="font-display text-base font-bold text-[#2b1f13] flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-[#8c6239]" />
          <span>Rekam Jejak Refleksi Jiwa ({savedEntries.length})</span>
        </h3>

        {savedEntries.length === 0 ? (
          <div className="bg-white border border-[#e4d8c8] rounded-2xl p-8 text-center text-xs text-[#816f5c]">
            Belum ada catatan refleksi yang disimpan. Mulai tuliskan satu kalimat
            tentang pengalaman rasa hari ini.
          </div>
        ) : (
          <div className="space-y-3">
            {savedEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-[#e3d7c7] rounded-2xl p-5 shadow-xs space-y-2 relative group"
              >
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#f2eadf]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#2d2013]">
                      {entry.weton}
                    </span>
                    <span className="text-[#887766]">
                      • Wuku {entry.wukuName}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f5efe6] text-[10px] font-medium text-[#6b5845]">
                      {entry.type === "awal_wuku"
                        ? "Awal Wuku"
                        : entry.type === "akhir_wuku"
                        ? "Akhir Wuku"
                        : "Harian"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#938170]">
                      {new Date(entry.timestamp).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-[#aa9582] hover:text-rose-600 transition-colors cursor-pointer p-1"
                      title="Hapus Catatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-[#7d6b58] italic">
                  "{entry.promptQuestion}"
                </div>

                <p className="text-xs sm:text-sm text-[#382a1d] leading-relaxed whitespace-pre-wrap font-serif-title">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
