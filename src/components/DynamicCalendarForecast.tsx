import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Compass,
  CheckCircle2,
  CalendarDays,
  Sprout,
  Wheat,
  Download,
  FileSpreadsheet,
  Printer,
  Search,
  ChevronLeft,
  ChevronRight,
  PenTool,
  RotateCw,
  X,
  Layers,
  Leaf,
  Users,
  Mountain,
  Scale,
} from "lucide-react";
import { DayForecast, SasiName } from "../types";
import { calculateDayForecast } from "../utils/javaneseCalendar";
import {
  WUKU_LIST,
  SASI_MEANINGS,
  SADWORO_DATA,
  CATURWORO_DATA,
  TRIWORO_DATA,
  DASAWORO_DATA,
  PASARAN_DATA,
} from "../data/pawukonData";
import { gamelanAudio } from "../utils/audioChime";
import * as XLSX from "xlsx";

interface DynamicCalendarProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  onOpenConsultationWithDate?: (dateInfo: string) => void;
  onOpenJournalWithDate?: (date: Date) => void;
  onOpenDisclaimer?: () => void;
}

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const PRESET_YEARS = [2024, 2025, 2026, 2027, 2028, 2030];

// Metadata Sasi Lengkap (Karakter & Aktivitas Selaras)
const SASI_EXTENDED_INFO: Record<
  string,
  { makna: string; karakter: string; aktivitas: string; catatan: string }
> = {
  Sura: {
    makna: "Laku batin & menghindari hajatan besar",
    karakter: "Sakral dan kontemplatif. Banyak laku prihatin; bukan bulan pesta.",
    aktivitas: "Introspeksi, penetapan niat tahunan, pembersihan simbolik.",
    catatan: "Umumnya menghindari hajatan besar; fokus batin dan arah.",
  },
  Sapar: {
    makna: "Bekerja, belajar, dan menjalin hubungan dengan sesama",
    karakter: "Mulai melangkah setelah Sura. Energi bergerak, lebih praktis.",
    aktivitas: "Eksekusi rencana, perjalanan, pemasaran awal.",
    catatan: "Baik untuk aksi terukur; tetap disiplin agar tidak ceroboh.",
  },
  Mulud: {
    makna: "Religius dan penuh makna. Baik untuk memperbaiki akhlak",
    karakter: "Simbol kelahiran gagasan dan penerimaan sosial.",
    aktivitas: "Peluncuran, edukasi publik, kegiatan sosial.",
    catatan: "Cocok untuk memperkenalkan nilai/produk; perhatikan etika dan pesan.",
  },
  "Bakda Mulud": {
    makna: "Baik untuk bekerja, belajar, dan kegiatan sosial",
    karakter: "Menata dampak dari Mulud. Konsolidasi dan penguatan jejaring.",
    aktivitas: "Administrasi, standardisasi, penguatan tim.",
    catatan: "Stabil untuk urusan birokratis dan penguatan relasi.",
  },
  "Jumadil Awal": {
    makna: "Penataan awal siklus baru",
    karakter: "Menyusun fondasi menuju periode berikutnya.",
    aktivitas: "Rencana kerja, anggaran, desain sistem.",
    catatan: "Siapkan struktur agar alur kerja teratur.",
  },
  "Jumadil Akhir": {
    makna: "Pemantapan, penutup fase konsolidasi",
    karakter: "Penutupan urusan lama dan konsolidasi. Energi merapikan komitmen.",
    aktivitas: "Audit, merangkum capaian, memperbaiki struktur kerja/rumah.",
    catatan: "Baik untuk pekerjaan yang membutuhkan ketelitian dan keteguhan.",
  },
  Rejeb: {
    makna: "Kesadaran spiritual dan kewaspadaan",
    karakter: "Transisi dari menutup ke menyiapkan. Fase menanam niat sebelum puncak spiritual.",
    aktivitas: "Perencanaan, inisiasi proyek kecil, penguatan relasi.",
    catatan: "Cocok untuk memulai hal yang skalanya terukur; jangan memaksa percepatan.",
  },
  Ruwah: {
    makna: "Penyucian batin & refleksi leluhur",
    karakter: "Refleksi dan penyelarasan batin. Waktu menata hubungan dengan sesama.",
    aktivitas: "Silaturahmi, ziarah, pembersihan ruang.",
    catatan: "Baik untuk rekonsiliasi; kurang ideal untuk konfrontasi.",
  },
  Pasa: {
    makna: "Laku prihatin & pengendalian diri",
    karakter: "Disiplin, penghematan energi, fokus batin.",
    aktivitas: "Penyederhanaan proses, latihan konsistensi, pekerjaan sunyi.",
    catatan: "Tunda ekspansi besar; prioritaskan kualitas dan ketahanan.",
  },
  Sawal: {
    makna: "Pemulihan & penguatan relasi",
    karakter: "Rebound energi setelah Pasa. Momentum membuka kembali aktivitas.",
    aktivitas: "Peluncuran ulang, negosiasi, kolaborasi.",
    catatan: "Baik untuk menyambung jaringan; jaga ritme agar tidak berlebihan.",
  },
  Sela: {
    makna: "Masa jeda dan waktu menahan diri (jeda strategis)",
    karakter: "Waktu 'diapit' antara ekspansi dan puncak. Cocok untuk menimbang arah.",
    aktivitas: "Penyesuaian rencana, uji-coba, perbaikan metode.",
    catatan: "Jangan memaksakan hasil cepat; manfaatkan jeda untuk akurasi.",
  },
  Besar: {
    makna: "Peneguhan & keputusan besar",
    karakter: "Bulan penguatan keputusan dengan energi tegas.",
    aktivitas: "Keputusan strategis, pengumuman resmi, penguatan struktur.",
    catatan: "Tepat untuk komitmen jangka panjang; pastikan kesiapan.",
  },
};

export const DynamicCalendarForecast: React.FC<DynamicCalendarProps> = ({
  selectedDate,
  onSelectDate,
  onOpenConsultationWithDate,
  onOpenJournalWithDate,
  onOpenDisclaimer,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(() => (selectedDate || new Date()).getFullYear());
  const [activeMonth, setActiveMonth] = useState<number>(() => (selectedDate || new Date()).getMonth()); // 0-11, -1 = all months
  const [dayTypeFilter, setDayTypeFilter] = useState<
    "all" | "bisnis" | "pernikahan" | "refleksi" | "waspada"
  >("all");
  const [pasaranFilter, setPasaranFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isWukuModalOpen, setIsWukuModalOpen] = useState<boolean>(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayForecast | null>(null);

  // Perhitungan tanggal dan kalender Jawa hari ini
  const todayForecast = useMemo(() => calculateDayForecast(new Date()), []);

  // Sinkronisasi jika selectedDate berubah dari luar (misal dari tab lain)
  useEffect(() => {
    if (selectedDate) {
      setSelectedYear(selectedDate.getFullYear());
      setActiveMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

  // Otomatis arahkan dan fokus ke baris tanggal hari ini saat komponen dimuat
  useEffect(() => {
    const today = new Date();
    if (selectedYear === today.getFullYear() && activeMonth === today.getMonth()) {
      const timer = setTimeout(() => {
        const el = document.getElementById("today-calendar-row");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [selectedYear, activeMonth]);

  const handleJumpToToday = () => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setActiveMonth(today.getMonth());
    setSearchQuery("");
    setPasaranFilter("all");
    setDayTypeFilter("all");
    gamelanAudio.playChime("bonang");
    setTimeout(() => {
      const el = document.getElementById("today-calendar-row");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  const handleYearChange = (newYear: number) => {
    if (newYear >= 100 && newYear <= 3000) {
      setSelectedYear(newYear);
      gamelanAudio.playChime("bonang");
    }
  };

  const handleMonthChange = (idx: number) => {
    setActiveMonth(idx);
    gamelanAudio.playChime("bonang");
  };

  const handleFilterChange = (
    type: "all" | "bisnis" | "pernikahan" | "refleksi" | "waspada"
  ) => {
    setDayTypeFilter(type);
    gamelanAudio.playChime("ting");
  };

  // Generate days based on activeMonth (single month or entire year)
  const monthDays: DayForecast[] = useMemo(() => {
    const days: DayForecast[] = [];

    if (activeMonth === -1) {
      // All 12 months
      for (let m = 0; m < 12; m++) {
        const daysInMonth = new Date(selectedYear, m + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
          days.push(calculateDayForecast(new Date(selectedYear, m, d)));
        }
      }
    } else {
      // Single month
      const daysInMonth = new Date(selectedYear, activeMonth + 1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        days.push(calculateDayForecast(new Date(selectedYear, activeMonth, d)));
      }
    }
    return days;
  }, [selectedYear, activeMonth]);

  // Filtered days based on type, pasaran, and search
  const displayedDays = useMemo(() => {
    return monthDays.filter((f) => {
      // Day Type Filter
      if (dayTypeFilter === "bisnis") {
        const ok =
          (f.caturworo.name === "Sri" || f.caturworo.name === "Laba") &&
          f.dasaworo.name !== "Pati" &&
          f.dasaworo.name !== "Raksasa";
        if (!ok) return false;
      } else if (dayTypeFilter === "pernikahan") {
        const ok =
          (f.wuku.name === "Tambir" ||
            f.wuku.name === "Dukut" ||
            f.wuku.name === "Warigagung" ||
            f.wuku.name === "Sinta") &&
          (f.pasaran === "Legi" || f.pasaran === "Pon");
        if (!ok) return false;
      } else if (dayTypeFilter === "refleksi") {
        const ok =
          f.pasaran === "Wage" ||
          f.caturworo.name === "Menala" ||
          f.dasaworo.name === "Pandhita";
        if (!ok) return false;
      } else if (dayTypeFilter === "waspada") {
        const ok =
          f.dasaworo.name === "Raksasa" ||
          f.dasaworo.name === "Pati" ||
          f.wuku.name === "Bala" ||
          f.sadworo.name === "Aryang";
        if (!ok) return false;
      }

      // Pasaran Filter
      if (pasaranFilter !== "all" && f.pasaran !== pasaranFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const rowStr = `${f.date.getDate()} ${f.hari} ${f.pasaran} ${f.wuku.name} ${f.sasi} ${f.sadworo.name} ${f.caturworo.name} ${f.triworo.name} ${f.dasaworo.name}`.toLowerCase();
        if (!rowStr.includes(q)) return false;
      }

      return true;
    });
  }, [monthDays, dayTypeFilter, pasaranFilter, searchQuery]);

  // Unique active wukus and sasis for cultural panel
  const activeWukus = useMemo(() => {
    const map = new Map<string, (typeof WUKU_LIST)[0]>();
    monthDays.forEach((d) => {
      if (!map.has(d.wuku.name)) {
        map.set(d.wuku.name, d.wuku);
      }
    });
    return Array.from(map.values());
  }, [monthDays]);

  const activeSasis = useMemo(() => {
    const set = new Set<string>();
    monthDays.forEach((d) => set.add(d.sasi));
    return Array.from(set);
  }, [monthDays]);

  // Export to Excel (.xlsx)
  const exportToExcel = () => {
    gamelanAudio.playChime("ting");
    const wb = XLSX.utils.book_new();

    if (activeMonth === -1) {
      // Multi-sheet for each of the 12 months
      for (let m = 0; m < 12; m++) {
        const daysInM = new Date(selectedYear, m + 1, 0).getDate();
        const rows: any[] = [
          ["Tgl", "Hari", "Pasaran", "Neptu", "Wuku", "Sasi", "Sadworo", "Caturworo", "Triworo", "Dasaworo"],
        ];
        for (let d = 1; d <= daysInM; d++) {
          const f = calculateDayForecast(new Date(selectedYear, m, d));
          rows.push([
            f.date.getDate(),
            f.hari,
            f.pasaran,
            f.totalNeptu,
            f.wuku.name,
            f.sasi,
            f.sadworo.name,
            f.caturworo.name,
            f.triworo.name,
            f.dasaworo.name,
          ]);
        }
        const ws = XLSX.utils.aoa_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, MONTH_NAMES[m]);
      }
      XLSX.writeFile(wb, `Kalender_Jawa_${selectedYear}_Penuh.xlsx`);
    } else {
      // Single month sheet
      const rows: any[] = [
        ["Tgl", "Hari", "Pasaran", "Neptu", "Wuku", "Sasi", "Sadworo", "Caturworo", "Triworo", "Dasaworo"],
      ];
      monthDays.forEach((f) => {
        rows.push([
          f.date.getDate(),
          f.hari,
          f.pasaran,
          f.totalNeptu,
          f.wuku.name,
          f.sasi,
          f.sadworo.name,
          f.caturworo.name,
          f.triworo.name,
          f.dasaworo.name,
        ]);
      });
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, MONTH_NAMES[activeMonth]);
      XLSX.writeFile(wb, `Kalender_Jawa_${MONTH_NAMES[activeMonth]}_${selectedYear}.xlsx`);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    gamelanAudio.playChime("ting");
    let csv = "Bulan,Tgl,Hari,Pasaran,Neptu,Wuku,Sasi,Sadworo,Caturworo,Triworo,Dasaworo\n";
    monthDays.forEach((f) => {
      const bName = MONTH_NAMES[f.date.getMonth()];
      csv += `"${bName}",${f.date.getDate()},"${f.hari}","${f.pasaran}",${f.totalNeptu},"${f.wuku.name}","${f.sasi}","${f.sadworo.name}","${f.caturworo.name}","${f.triworo.name}","${f.dasaworo.name}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Kalender_Jawa_${activeMonth === -1 ? selectedYear + "_Penuh" : MONTH_NAMES[activeMonth] + "_" + selectedYear}.csv`;
    link.click();
  };

  return (
    <div className="space-y-7">
      {/* Editorial Narrative Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#faf6ef] to-[#f4ebe1] border border-[#e4d7c5] rounded-3xl p-6 sm:p-8 shadow-sm print:hidden">
        <div className="max-w-3xl relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ebdcca] text-[#5e452c] text-xs font-bold uppercase tracking-wider mb-2.5 border border-[#decaba]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sistem Kalender Jawa Dinamis Multi-Tahun</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#271a0e]">
            Tahun {selectedYear}: Navigasi Waktu, Watak, dan Irama Kehidupan
          </h2>
          <p className="text-sm sm:text-base text-[#63513f] mt-2.5 leading-relaxed font-serif-title italic">
            "Kalender Jawa memperlakukan waktu bukan sebagai garis lurus yang bergegas, melainkan sebagai taman siklus berlapis. Melalui Pawukon dan Pasaran, manusia diajak untuk peka membaca iklim batin, menyelaraskan langkah, dan menghormati ritme semesta."
          </p>
        </div>

        {/* Dynamic Year Stepper & Controls Bar */}
        <div className="mt-7 pt-6 border-t border-[#e8ded0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7a6450]">
              Pilih Tahun:
            </span>
            <div className="inline-flex items-center bg-white border border-[#d9c9b5] rounded-2xl shadow-xs p-1">
              <button
                onClick={() => handleYearChange(selectedYear - 1)}
                title="Tahun Sebelumnya"
                className="p-2 text-[#6e5641] hover:bg-[#f3ebe0] rounded-xl cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
                className="w-20 text-center font-display text-lg font-bold text-[#2d1f13] bg-transparent border-none focus:outline-none"
              />
              <button
                onClick={() => handleYearChange(selectedYear + 1)}
                title="Tahun Berikutnya"
                className="p-2 text-[#6e5641] hover:bg-[#f3ebe0] rounded-xl cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              {PRESET_YEARS.map((yr) => (
                <button
                  key={yr}
                  onClick={() => handleYearChange(yr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    selectedYear === yr
                      ? "bg-[#332213] text-[#f7e7a9] shadow-xs ring-1 ring-[#c49746]"
                      : "bg-white/80 hover:bg-[#ede0d0] text-[#5e4936] border border-[#dfd1bf]"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>

            {/* Quick Jump to Today (Always visible across screen sizes) */}
            <button
              onClick={handleJumpToToday}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#332213] hover:bg-[#48331d] text-[#f7e7a9] border border-[#c49746] flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
              title="Lompat & Selaraskan ke Tanggal Hari Ini"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Hari Ini</span>
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                if (onOpenDisclaimer) {
                  onOpenDisclaimer();
                } else {
                  setIsDisclaimerOpen(true);
                  gamelanAudio.playChime("ting");
                }
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#faf4ec] hover:bg-[#f3e7d5] text-[#784d1f] border border-[#d8c3a9] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              title="Baca Pernyataan Etis & Disclaimer Budaya"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              <span>Disclaimer</span>
            </button>

            <button
              onClick={() => {
                setIsWukuModalOpen(true);
                gamelanAudio.playChime("ting");
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#f5ecdf] hover:bg-[#ebdecb] text-[#523d29] border border-[#d8c7b2] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#916531]" />
              <span>Kamus 30 Wuku</span>
            </button>

            <button
              onClick={exportToExcel}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#ba912a] to-[#996515] text-white hover:brightness-105 flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Unduh Excel</span>
            </button>

            <button
              onClick={exportToCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#f5ecdf] text-[#4d3a28] border border-[#d8c7b2] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#735e4b]" />
              <span>Unduh CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#f5ecdf] text-[#4d3a28] border border-[#d8c7b2] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#735e4b]" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kartu Status Penyelarasan Hari Ini */}
      <div className="bg-gradient-to-br from-[#f8f2e8] via-[#fcf9f5] to-[#f4ebe0] border-2 border-[#d9c49d] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden print:hidden">
        {/* Background decorative watermark */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-[#8c6239]">
          <Calendar className="w-44 h-44" />
        </div>

        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#ba912a] to-[#8c6239] text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#faebd7]">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
                Tanggal Berlaku Hari Ini
              </span>
              <span className="text-xs font-semibold text-[#735d48]">
                {todayForecast.hari}, {todayForecast.date.getDate()} {MONTH_NAMES[todayForecast.date.getMonth()]} {todayForecast.date.getFullYear()}
              </span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display text-lg sm:text-xl font-bold text-[#2d1b0d]">
                {todayForecast.hari} {todayForecast.pasaran}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#ebded0] text-[#543f2d] font-bold">
                Neptu {todayForecast.totalNeptu}
              </span>
              <span className="text-[#c4b3a1]">•</span>
              <span className="text-xs text-[#523d2b]">
                Wuku: <strong className="text-[#8c5923] font-bold">{todayForecast.wuku.name}</strong>
              </span>
              <span className="text-[#c4b3a1]">•</span>
              <span className="text-xs text-[#523d2b]">
                Sasi: <strong className="font-semibold">{todayForecast.sasi}</strong>
              </span>
              <span className="text-[#c4b3a1]">•</span>
              <span className="text-xs text-[#445b42]">
                Sadworo: <strong>{todayForecast.sadworo.name}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 shrink-0">
          <button
            onClick={handleJumpToToday}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-[#332213] hover:bg-[#48331d] text-[#f7e7a9] border border-[#c49746] flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            title="Arahkan Kalender Langsung ke Tanggal & Bulan Hari Ini"
          >
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
            <span>Fokus ke Hari Ini</span>
          </button>
        </div>
      </div>

      {/* Monthly Interactive Calendar Section */}
      <div className="bg-white border border-[#e4d8c8] rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 print:p-0 print:border-none print:shadow-none print:space-y-2">
        {/* DOKUMEN KOP RESMI CETAK / PDF (A4 LANDSCAPE) */}
        <div className="hidden print:block mb-3 pb-3 border-b-2 border-[#8c6239]">
          <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none', background: 'transparent' }}>
            <tbody>
              <tr style={{ border: 'none', background: 'transparent' }}>
                <td style={{ width: '60px', verticalAlign: 'middle', border: 'none', padding: '0 16px 0 0', background: 'transparent' }}>
                  <img
                    src="/logo-mf.png"
                    alt="Logo Mario Fahmi"
                    style={{ width: '54px', height: '54px', objectFit: 'contain', display: 'block' }}
                  />
                </td>
                <td style={{ verticalAlign: 'middle', border: 'none', padding: 0, background: 'transparent' }}>
                  <div style={{ fontFamily: "'Marcellus', Georgia, serif", fontSize: '15pt', fontWeight: 800, color: '#1f140a', lineHeight: 1.15, letterSpacing: '0.02em' }}>
                    TITEN LAKU JAWA
                  </div>
                  <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#3b2514', marginTop: '2px' }}>
                    TABEL KALENDER 9 DIMENSI WAKTU &bull; TAHUN {selectedYear}
                  </div>
                  <div style={{ fontSize: '7.5pt', color: '#7a5a3a', marginTop: '1px' }}>
                    Navigasi Siklus Pawukon, Weton, Watak, dan Irama Kehidupan &mdash; Perancang: Mario Fahmi Syahrial
                  </div>
                </td>
                <td style={{ textAlign: 'right', verticalAlign: 'middle', border: 'none', padding: 0, background: 'transparent', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'inline-block', textAlign: 'right' }}>
                    <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#f5ede2', border: '1px solid #d4c0a5', borderRadius: '6px', fontSize: '9pt', fontWeight: 800, color: '#3b2210' }}>
                      {activeMonth === -1
                        ? `TAHUN ${selectedYear} (12 BULAN)`
                        : `BULAN ${MONTH_NAMES[activeMonth].toUpperCase()} ${selectedYear}`}
                    </div>
                    <div style={{ fontSize: '7.5pt', color: '#685444', marginTop: '3px' }}>
                      Dicetak: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
          <div>
            <h3 className="font-display text-xl font-bold text-[#2c1f13] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#8c6239]" />
              <span>
                Tabel Kalender Jawa {selectedYear} (9 Kolom Dokumen Otentik)
              </span>
            </h3>
            <p className="text-xs text-[#7d6b58]">
              {activeMonth === -1
                ? "Menampilkan seluruh 12 bulan kalender secara lengkap"
                : `Bulan ${MONTH_NAMES[activeMonth]} ${selectedYear} (${displayedDays.length} hari ditampilkan)`}
            </p>
          </div>

          {/* Search Box & Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari weton, wuku, sasi..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#faf6f0] border border-[#e1d3c1] rounded-xl text-xs text-[#2c1f13] focus:outline-none focus:ring-1 focus:ring-[#8c6239]"
              />
            </div>

            <select
              value={pasaranFilter}
              onChange={(e) => setPasaranFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#faf6f0] border border-[#e1d3c1] text-[#483726] focus:outline-none"
            >
              <option value="all">Semua Pasaran</option>
              <option value="Legi">Legi</option>
              <option value="Pahing">Pahing</option>
              <option value="Pon">Pon</option>
              <option value="Wage">Wage</option>
              <option value="Kliwon">Kliwon</option>
            </select>
          </div>
        </div>

        {/* Day Type Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 print:hidden">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              dayTypeFilter === "all"
                ? "bg-[#332213] text-white shadow-xs"
                : "bg-[#f5efe6] text-[#554332] hover:bg-[#ebdccb]"
            }`}
          >
            Semua Hari
          </button>
          <button
            onClick={() => handleFilterChange("bisnis")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              dayTypeFilter === "bisnis"
                ? "bg-amber-800 text-white shadow-xs"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100"
            }`}
          >
            Peluang Bisnis (Sri/Laba)
          </button>
          <button
            onClick={() => handleFilterChange("pernikahan")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              dayTypeFilter === "pernikahan"
                ? "bg-rose-800 text-white shadow-xs"
                : "bg-rose-50 text-rose-800 hover:bg-rose-100"
            }`}
          >
            Pernikahan
          </button>
          <button
            onClick={() => handleFilterChange("refleksi")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              dayTypeFilter === "refleksi"
                ? "bg-stone-800 text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Refleksi & Jeda (Wage/Menala)
          </button>
          <button
            onClick={() => handleFilterChange("waspada")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              dayTypeFilter === "waspada"
                ? "bg-red-800 text-white shadow-xs"
                : "bg-red-50 text-red-800 hover:bg-red-100"
            }`}
          >
            Kewaspadaan
          </button>
        </div>

        {/* Month Selector Tabs */}
        <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-13 gap-1.5 print:hidden">
          {MONTH_NAMES.map((mName, idx) => {
            const isSelected = activeMonth === idx;
            const isTodayMonth =
              idx === new Date().getMonth() &&
              selectedYear === new Date().getFullYear();
            return (
              <button
                key={mName}
                onClick={() => handleMonthChange(idx)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-[#332213] text-[#f7e7a9] shadow-xs ring-2 ring-[#c49746]"
                    : "bg-[#faf6f0] hover:bg-[#f1e6d7] text-[#4d3c2b] border border-[#ebdcca]"
                }`}
              >
                <span>{mName.slice(0, 3)}</span>
                {isTodayMonth && (
                  <span
                    className={`absolute -top-1 -right-1 px-1 py-0.2 rounded-full text-[8px] font-extrabold uppercase shadow-2xs ${
                      isSelected ? "bg-emerald-500 text-white" : "bg-emerald-600 text-white animate-pulse"
                    }`}
                  >
                    Ini
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={() => handleMonthChange(-1)}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMonth === -1
                ? "bg-[#332213] text-[#f7e7a9] shadow-xs ring-2 ring-[#c49746]"
                : "bg-[#faf6f0] hover:bg-[#f1e6d7] text-[#4d3c2b] border border-[#ebdcca]"
            }`}
          >
            12 Bln
          </button>
        </div>

        {/* 9-Column Month Table View */}
        <div className="overflow-x-auto border border-[#e5d9ca] rounded-2xl shadow-xs print:border-none print:shadow-none print:overflow-visible">
          <table className="min-w-full divide-y divide-[#ebdcca] text-xs print:w-full print:text-[8pt] print:divide-stone-400">
            <thead className="bg-[#f7f2ea] text-[#523f2f] font-bold">
              <tr>
                <th className="py-3 px-3 text-left">Tgl</th>
                <th className="py-3 px-3 text-left">Hari</th>
                <th className="py-3 px-3 text-left">Pasaran</th>
                <th className="py-3 px-3 text-left">Wuku</th>
                <th className="py-3 px-3 text-left">Sasi</th>
                <th className="py-3 px-3 text-left">Sadworo</th>
                <th className="py-3 px-3 text-left">Caturworo</th>
                <th className="py-3 px-3 text-left">Triworo</th>
                <th className="py-3 px-3 text-left">Dasaworo</th>
                <th className="py-3 px-3 text-center print:hidden">Integrasi Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1e8dd] bg-white">
              {displayedDays.map((f) => {
                const today = new Date();
                const isToday =
                  f.date.getDate() === today.getDate() &&
                  f.date.getMonth() === today.getMonth() &&
                  f.date.getFullYear() === today.getFullYear();
                const isSunday = f.hari === "Minggu";
                const isAlert =
                  f.dasaworo.name === "Raksasa" || f.wuku.name === "Bala";
                return (
                  <tr
                    key={f.dateStr}
                    id={isToday ? "today-calendar-row" : undefined}
                    onClick={() => setSelectedDayDetail(f)}
                    className={`transition-all cursor-pointer ${
                      isToday
                        ? "bg-amber-100/90 ring-2 ring-amber-600 shadow-sm hover:bg-amber-100 font-semibold"
                        : isAlert
                        ? "bg-rose-50/30 hover:bg-[#faf6f0]"
                        : isSunday
                        ? "bg-[#fdf9f4] hover:bg-[#faf6f0] row-minggu"
                        : "hover:bg-[#faf6f0]"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-[#2c1e12]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={isToday ? "text-sm font-extrabold text-amber-900" : ""}>{f.date.getDate()}</span>
                        {activeMonth === -1 && <span className="text-[10px] text-stone-400">/{f.date.getMonth() + 1}</span>}
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[9px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            Hari Ini
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      className={`py-2.5 px-3 font-semibold ${
                        isSunday ? "text-rose-700" : "text-[#453424]"
                      }`}
                    >
                      {f.hari}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md font-bold text-[11px] badge-pasaran ${
                          f.pasaran === "Legi"
                            ? "bg-amber-100 text-amber-900 border border-amber-200"
                            : f.pasaran === "Pahing"
                            ? "bg-red-100 text-red-900 border border-red-200"
                            : f.pasaran === "Pon"
                            ? "bg-blue-100 text-blue-900 border border-blue-200"
                            : f.pasaran === "Wage"
                            ? "bg-stone-200 text-stone-800 border border-stone-300"
                            : "bg-purple-100 text-purple-900 border border-purple-200"
                        }`}
                      >
                        {f.pasaran}
                      </span>{" "}
                      <span className="text-[10px] text-[#867563]">
                        ({f.totalNeptu})
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-[#7a5832]">
                      {f.wuku.name}
                    </td>
                    <td className="py-2.5 px-3 text-[#574433]">{f.sasi}</td>
                    <td className="py-2.5 px-3 text-[#435242]">
                      {f.sadworo.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          f.caturworo.name === "Sri" ||
                          f.caturworo.name === "Laba"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {f.caturworo.name}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[#61503e]">
                      {f.triworo.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          f.dasaworo.warningLevel === "alert"
                            ? "bg-rose-100 text-rose-800"
                            : f.dasaworo.warningLevel === "caution"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-50 text-blue-800"
                        }`}
                      >
                        {f.dasaworo.name}
                      </span>
                    </td>
                    <td
                      className="py-2.5 px-3 text-center print:hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            onSelectDate(f.date);
                            gamelanAudio.playChime("bonang");
                          }}
                          title="Buka Kompas Hari Ini"
                          className="px-2 py-1 rounded-lg text-[11px] font-bold bg-[#f3ebe0] hover:bg-[#e6dac9] text-[#553f29] cursor-pointer transition-colors"
                        >
                          Kompas
                        </button>
                        {onOpenConsultationWithDate && (
                          <button
                            onClick={() => {
                              onOpenConsultationWithDate(
                                `${f.weton}, ${f.date.getDate()} ${MONTH_NAMES[f.date.getMonth()]} ${f.date.getFullYear()} (Wuku ${f.wuku.name})`
                              );
                              gamelanAudio.playChime("ting");
                            }}
                            title="Tanyakan ke Pujangga AI"
                            className="p-1 rounded-lg text-amber-700 hover:bg-amber-100 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onOpenJournalWithDate && (
                          <button
                            onClick={() => {
                              onOpenJournalWithDate(f.date);
                              gamelanAudio.playChime("ting");
                            }}
                            title="Tulis Jurnal Tanggal Ini"
                            className="p-1 rounded-lg text-[#79634e] hover:bg-[#ebdccb] cursor-pointer"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* KARTU RANGKUMAN BUDAYA CETAK / PDF */}
        <div className="hidden print:block mt-3 pt-2.5 border-t-2 border-[#8c6239]/60">
          <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none', background: 'transparent' }}>
            <tbody>
              <tr style={{ border: 'none', background: 'transparent' }}>
                <td style={{ width: '33.33%', border: 'none', padding: '4px 8px', background: '#faf6f0', verticalAlign: 'top' }}>
                  <div style={{ fontSize: '7.5pt', fontWeight: 700, color: '#4a3319' }}>🌀 RENTANG WUKU AKTIF</div>
                  <div style={{ fontSize: '7pt', color: '#685444', marginTop: '2px' }}>
                    {Array.from(new Set(displayedDays.map(d => d.wuku.name))).join(' • ')}
                  </div>
                </td>
                <td style={{ width: '33.33%', border: 'none', padding: '4px 8px', background: '#f6f1e8', verticalAlign: 'top' }}>
                  <div style={{ fontSize: '7.5pt', fontWeight: 700, color: '#4a3319' }}>🌙 SASI JAWA BERJALAN</div>
                  <div style={{ fontSize: '7pt', color: '#685444', marginTop: '2px' }}>
                    {Array.from(new Set(displayedDays.map(d => d.sasi))).join(' transisi ke ')}
                  </div>
                </td>
                <td style={{ width: '33.33%', border: 'none', padding: '4px 8px', background: '#faf6f0', verticalAlign: 'top', textAlign: 'right' }}>
                  <div style={{ fontSize: '7.5pt', fontWeight: 700, color: '#4a3319' }}>📜 OTENTISITAS DOKUMEN</div>
                  <div style={{ fontSize: '7pt', color: '#685444', marginTop: '2px' }}>
                    Buku Kalender Jawa &bull; Mario Fahmi Syahrial
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: 'center', fontSize: '6.5pt', color: '#887766', marginTop: '4px' }}>
            * Dicetak resmi dari Sistem Penanggalan & Forecaster Siklus Hidup Nusantara &mdash; Titen Laku Jawa &bull; Format A4 Landscape
          </div>
        </div>
      </div>

      {/* Cultural Reference Section (6 Dimension Pillars) */}
      <div className="space-y-4 reference-container print:break-before-page">
        <h3 className="font-display text-lg font-bold text-[#2e2013] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#8c6239]" />
          <span>Pedoman Makna Lapisan Waktu Jawa (Rujukan Halaman Buku)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Makna Sasi */}
          <div className="bg-white border border-[#e4d7c5] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c6239] mb-3 border-b border-[#f0e4d2] pb-2">
              <Calendar className="w-4 h-4 text-[#8c6239]" />
              <span>Makna Sasi Jawa Aktif</span>
            </div>
            <div className="space-y-3 text-xs">
              {activeSasis.map((sName) => {
                const info = SASI_EXTENDED_INFO[sName] || {
                  makna: SASI_MEANINGS[sName as SasiName] || "Irama bulanan penuntun laku.",
                  karakter: "Refleksi dan penataan ritme.",
                  aktivitas: "Pekerjaan teratur dan silaturahmi.",
                  catatan: "Jaga keseimbangan batin.",
                };
                return (
                  <div key={sName} className="p-3 bg-[#faf7f2] rounded-2xl border border-[#ede2d2]">
                    <div className="font-bold text-sm text-[#352517] mb-1">
                      Sasi {sName}
                    </div>
                    <div className="text-[#695745] italic mb-1.5">
                      "{info.makna}"
                    </div>
                    <div className="text-[11px] text-[#786450] space-y-0.5">
                      <div><strong>Karakter:</strong> {info.karakter}</div>
                      <div><strong>Aktivitas:</strong> {info.aktivitas}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Watak Waktu Wuku */}
          <div className="bg-white border border-[#e4d7c5] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c6239] mb-3 border-b border-[#f0e4d2] pb-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Watak Waktu Wuku Aktif</span>
            </div>
            <div className="space-y-2.5 text-xs max-h-72 overflow-y-auto pr-1">
              {activeWukus.map((w) => (
                <div key={w.name} className="p-2.5 bg-[#faf7f2] rounded-xl border border-[#ede2d2]">
                  <div className="flex items-center justify-between font-bold text-[#352517]">
                    <span>Wuku {w.name}</span>
                    <span className="text-[10px] text-[#8c6239]">#{w.number}</span>
                  </div>
                  <div className="text-[11px] text-[#695745] font-medium mt-0.5">
                    {w.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sadworo (6 Hari) */}
          <div className="bg-white border border-[#e4d7c5] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c6239] mb-3 border-b border-[#f0e4d2] pb-2">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <span>Sadworo (Etika Ekologis)</span>
            </div>
            <div className="space-y-1.5 text-xs">
              {Object.entries(SADWORO_DATA).map(([sName, sData]) => (
                <div key={sName} className="flex items-start justify-between py-1 border-b border-[#f5ede2] last:border-none">
                  <span className="font-bold text-[#3a2919] min-w-[70px]">{sName}</span>
                  <span className="text-[11px] text-[#635342] text-right">{sData.prohibitionOrGuidance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Triworo (3 Hari) */}
          <div className="bg-white border border-[#e4d7c5] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c6239] mb-3 border-b border-[#f0e4d2] pb-2">
              <Mountain className="w-4 h-4 text-[#8c6239]" />
              <span>Triworo (Unsur Alam)</span>
            </div>
            <div className="space-y-2 text-xs">
              {Object.entries(TRIWORO_DATA).map(([tName, tData]) => (
                <div key={tName} className="p-2 bg-[#faf7f2] rounded-xl border border-[#ede2d2] flex items-center justify-between">
                  <span className="font-bold text-[#352517]">{tName}</span>
                  <span className="text-[11px] font-semibold text-[#8c6239]">Unsur: {tData.element}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Caturworo (4 Hari) */}
          <div className="bg-white border border-[#e4d7c5] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c6239] mb-3 border-b border-[#f0e4d2] pb-2">
              <Users className="w-4 h-4 text-blue-700" />
              <span>Caturworo (Peran Sosial)</span>
            </div>
            <div className="space-y-1.5 text-xs">
              {Object.entries(CATURWORO_DATA).map(([cName, cData]) => (
                <div key={cName} className="flex items-start justify-between py-1 border-b border-[#f5ede2] last:border-none">
                  <span className="font-bold text-[#3a2919] min-w-[60px]">{cName}</span>
                  <span className="text-[11px] text-[#635342] text-right">{cData.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Dasaworo (10 Hari) */}
          <div className="bg-white border border-[#e4d7c5] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c6239] mb-3 border-b border-[#f0e4d2] pb-2">
              <Scale className="w-4 h-4 text-purple-700" />
              <span>Dasaworo (Intensitas Tindakan)</span>
            </div>
            <div className="space-y-1 text-xs max-h-56 overflow-y-auto pr-1">
              {Object.entries(DASAWORO_DATA).map(([dName, dData]) => (
                <div key={dName} className="flex items-center justify-between py-1 border-b border-[#f5ede2] last:border-none">
                  <span className="font-bold text-[#3a2919]">{dName}</span>
                  <span className="text-[11px] text-[#635342]">{dData.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Author & Cultural Ethical Statement Banner */}
        <div className="bg-[#faf5ed] border border-[#e8dac8] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#2f2014]">
                Pernyataan Etis & Disclaimer Budaya (Mario Fahmi Syahrial)
              </h5>
              <p className="text-xs text-[#6e5a48] mt-0.5">
                Kalender Jawa difungsikan sebagai peta orientasi situasional dan refleksi batin, <strong>bukan instrumen ramalan atau penentu nasib mutlak</strong>. Kedaulatan hidup berada di bawah kehendak bebas manusia di hadapan Tuhan YME.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (onOpenDisclaimer) {
                onOpenDisclaimer();
              } else {
                setIsDisclaimerOpen(true);
                gamelanAudio.playChime("ting");
              }
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#332213] text-[#fbf5eb] hover:bg-[#20140b] cursor-pointer shrink-0 transition-colors shadow-xs"
          >
            Baca Pernyataan Lengkap
          </button>
        </div>
      </div>
      {/* MODAL 1: Detail Hari Refleksi Waktu */}
      {selectedDayDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
          <div className="bg-white border border-[#d9c9b5] rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ede1d1] pb-3">
              <div>
                <h4 className="font-display text-lg font-bold text-[#2d1e12]">
                  {selectedDayDetail.hari} {selectedDayDetail.pasaran},{" "}
                  {selectedDayDetail.date.getDate()}{" "}
                  {MONTH_NAMES[selectedDayDetail.date.getMonth()]}{" "}
                  {selectedDayDetail.date.getFullYear()}
                </h4>
                <p className="text-xs text-[#7e6955]">
                  Neptu Total: {selectedDayDetail.totalNeptu} ({selectedDayDetail.hari} + {selectedDayDetail.pasaran}) • Wuku {selectedDayDetail.wuku.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayDetail(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#faf7f2] rounded-xl border border-[#ede3d5]">
                <span className="font-bold text-[#8c6239] block mb-1">
                  🌿 Wuku: {selectedDayDetail.wuku.name}
                </span>
                <p className="text-[#594736]">{selectedDayDetail.wuku.character}</p>
              </div>

              <div className="p-3 bg-[#faf7f2] rounded-xl border border-[#ede3d5]">
                <span className="font-bold text-[#8c6239] block mb-1">
                  🌙 Sasi: {selectedDayDetail.sasi}
                </span>
                <p className="text-[#594736]">{selectedDayDetail.sasiMeaning}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#faf7f2] rounded-xl border border-[#ede3d5]">
                  <span className="font-bold text-[#445543] block">
                    🍃 Sadworo: {selectedDayDetail.sadworo.name}
                  </span>
                  <span className="text-[11px] text-[#695745]">
                    {selectedDayDetail.sadworo.prohibitionOrGuidance}
                  </span>
                </div>
                <div className="p-2.5 bg-[#faf7f2] rounded-xl border border-[#ede3d5]">
                  <span className="font-bold text-blue-900 block">
                    👥 Caturworo: {selectedDayDetail.caturworo.name}
                  </span>
                  <span className="text-[11px] text-[#695745]">
                    {selectedDayDetail.caturworo.meaning}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#faf7f2] rounded-xl border border-[#ede3d5]">
                  <span className="font-bold text-[#624f3c] block">
                    ⛰️ Triworo: {selectedDayDetail.triworo.name}
                  </span>
                  <span className="text-[11px] text-[#695745]">
                    Unsur: {selectedDayDetail.triworo.element}
                  </span>
                </div>
                <div className="p-2.5 bg-[#faf7f2] rounded-xl border border-[#ede3d5]">
                  <span className="font-bold text-purple-900 block">
                    ⚖️ Dasaworo: {selectedDayDetail.dasaworo.name}
                  </span>
                  <span className="text-[11px] text-[#695745]">
                    {selectedDayDetail.dasaworo.meaning}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[#634927] text-[11px] italic">
                "{selectedDayDetail.synthesisWatak}"
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ede1d1]">
              <button
                onClick={() => {
                  onSelectDate(selectedDayDetail.date);
                  setSelectedDayDetail(null);
                  gamelanAudio.playChime("bonang");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#332213] text-[#fbf5eb] hover:bg-[#20140b] cursor-pointer"
              >
                Buka di Kompas Hari Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Kamus Lengkap 30 Wuku Pawukon */}
      {isWukuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
          <div className="bg-white border border-[#d9c9b5] rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ede1d1] pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-[#2d1e12] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#8c6239]" />
                  <span>Kamus 30 Wuku Pawukon (Siklus 210 Hari)</span>
                </h3>
                <p className="text-xs text-[#7e6955]">
                  Makna Filosofis dan Karakter Waktu (Berdasarkan Halaman 13 Catatan Kalender Jawa)
                </p>
              </div>
              <button
                onClick={() => setIsWukuModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WUKU_LIST.map((w) => (
                <div
                  key={w.number}
                  className="p-3.5 bg-[#faf7f2] hover:bg-[#f5eee4] transition-colors rounded-2xl border border-[#ede1d1] space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-sm text-[#2d1e12]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#ebdcca] text-[#5e452c] text-[10px] flex items-center justify-center font-bold">
                        {w.number}
                      </span>
                      {w.name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#8c6239] uppercase">
                      Fase {w.faseNumber}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#70563b]">
                    {w.subtitle}
                  </div>
                  <p className="text-[11px] text-[#695847] leading-relaxed">
                    {w.character}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#ede1d1]">
              <button
                onClick={() => setIsWukuModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#332213] text-[#fbf5eb] hover:bg-[#20140b] cursor-pointer"
              >
                Tutup Kamus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Pernyataan Etis & Disclaimer Budaya */}
      {isDisclaimerOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 print:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDisclaimerOpen(false);
            }
          }}
        >
          <div className="bg-[#faf7f2] border border-[#d9c9b5] rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="shrink-0 px-6 py-4 sm:py-5 bg-white border-b border-[#ede1d1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-xs">
                  <ShieldAlert className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#2d1e12]">
                    Pernyataan Etis & Disclaimer Budaya
                  </h3>
                  <p className="text-xs text-[#7e6955]">
                    Prinsip Pembacaan Kalender Jawa Karya Mario Fahmi Syahrial
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDisclaimerOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5 text-xs text-[#523f2f] leading-relaxed">
              <div className="p-3.5 bg-white rounded-2xl border border-[#ede1d1] shadow-2xs space-y-1">
                <div className="font-bold text-sm text-[#352517] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">1</span>
                  Bukan Instrumen Ramalan atau Determinisme
                </div>
                <p className="text-[#665443] pl-7">
                  Aplikasi dan sistem penanggalan ini <strong>tidak berfungsi sebagai alat meramal masa depan</strong>, menjamin keberuntungan, atau menentukan nasib mutlak seseorang. Seluruh data disajikan sebagai media edukasi, apresiasi budaya, dan refleksi filosofis tradisi Jawa.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#ede1d1] shadow-2xs space-y-1">
                <div className="font-bold text-sm text-[#352517] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">2</span>
                  Kedaulatan Individu & Kehendak Bebas (Free Will)
                </div>
                <p className="text-[#665443] pl-7">
                  Setiap keputusan, ikhtiar, dan arah hidup sepenuhnya berada di bawah kehendak bebas dan tanggung jawab pribadi masing-masing di hadapan Tuhan Yang Maha Esa. Kalender Jawa diposisikan sebagai <strong>"peta iklim kesadaran batin"</strong>, bukan instruksi penentu tindakan kaku.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#ede1d1] shadow-2xs space-y-1">
                <div className="font-bold text-sm text-[#352517] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">3</span>
                  Perspektif Simbolik & Reflektif (Bukan Label Baik/Buruk Mutlak)
                </div>
                <p className="text-[#665443] pl-7">
                  Simbol-simbol siklus waktu (Wuku, Pasaran, Sadworo, Caturworo, Triworo, Dasaworo, Sasi) mencerminkan suasana dan kecenderungan psikososial. Tidak ada hari yang secara mutlak "buruk" atau "kutukan"; hari waspada menuntut kehati-hatian, sedangkan hari longgar membuka ruang pergerakan.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#ede1d1] shadow-2xs space-y-1">
                <div className="font-bold text-sm text-[#352517] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">4</span>
                  Bukan Pengganti Saran Profesional
                </div>
                <p className="text-[#665443] pl-7">
                  Analisis dan narasi dalam aplikasi ini tidak dimaksudkan untuk menggantikan nasihat profesional di bidang medis, hukum, perbankan/keuangan, maupun psikologi klinis.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#ede1d1] shadow-2xs space-y-1">
                <div className="font-bold text-sm text-[#352517] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">5</span>
                  Penghormatan terhadap Tradisi & Rasionalitas Modern
                </div>
                <p className="text-[#665443] pl-7">
                  Disusun dengan rasa takzim mendalam terhadap kearifan lokal Nusantara, disajikan secara rasional dan elegan agar dapat dihayati oleh generasi masa kini tanpa mereduksinya menjadi mitos tak berdasar.
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-[#684c2a] text-[11px] italic leading-relaxed">
                "Fokus pembacaan bukan pada pencarian kepastian atau penentuan nasib, melainkan pada upaya memperhalus kesadaran dan kualitas sikap dalam merespons ritme serta kecenderungan waktu." (Mario Fahmi Syahrial, Bab 6)
              </div>
            </div>

            {/* Sticky/Fixed Footer with prominent Agree Button */}
            <div className="shrink-0 p-4 sm:p-5 bg-white border-t border-[#ede1d1] flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-[#85705e] text-center sm:text-left">
                Pernyataan etis pembacaan kalender Jawa secara bijak dan bertanggung jawab.
              </p>
              <button
                onClick={() => setIsDisclaimerOpen(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#332213] text-[#f7e7a9] hover:bg-[#1a0f07] hover:text-white flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Memahami dan Menyetujui</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Re-export as Year2026Forecast for full backwards compatibility
export const Year2026Forecast = DynamicCalendarForecast;
export default DynamicCalendarForecast;
