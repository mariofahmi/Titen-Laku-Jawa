import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  UserCheck,
  Calendar,
  Sparkles,
  Heart,
  Repeat,
  Compass,
  ArrowRight,
  ShieldAlert,
  Feather,
  Sun,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Printer,
  Users,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";
import { calculateDayForecast } from "../utils/javaneseCalendar";
import { DayForecast } from "../types";
import { PASARAN_DATA } from "../data/pawukonData";
import { gamelanAudio } from "../utils/audioChime";

interface PersonalWetonCalculatorProps {
  onSelectDate: (date: Date) => void;
  onOpenConsultationWithWeton?: (wetonStr: string) => void;
}

// 8 Kategori Petungan Jodoh & Kemitraan Tradisi Jawa (Neptu A + Neptu B) % 8
const PETUNGAN_JODOH_DATA: Record<
  number,
  {
    title: string;
    badgeColor: string;
    bgClass: string;
    borderClass: string;
    textColor: string;
    summary: string;
    advice: string;
  }
> = {
  1: {
    title: "Pegat",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    bgClass: "bg-rose-50/70",
    borderClass: "border-rose-200",
    textColor: "text-rose-900",
    summary:
      "Berpotensi sering menemui perbedaan sudut pandang, ujian ego, atau dinamika komunikasi yang perlu dikelola secara sabar.",
    advice:
      "Perbanyak komunikasi terbuka, kurangi memaksakan kehendak, dan saling mengalah. Berikan ruang apresiasi untuk perbedaan masing-masing.",
  },
  2: {
    title: "Ratu",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    bgClass: "bg-amber-50/70",
    borderClass: "border-amber-200",
    textColor: "text-amber-950",
    summary:
      "Kemitraan berwibawa, sangat dihormati dan disegani di lingkungan sekitar. Hubungan membawa kemudahan rezeki dan keharmonisan.",
    advice:
      "Jaga kerendahan hati, perbanyak sedekah dan kegiatan sosial, serta gunakan pengaruh positif Anda untuk membantu orang banyak.",
  },
  3: {
    title: "Jodo",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    bgClass: "bg-emerald-50/70",
    borderClass: "border-emerald-200",
    textColor: "text-emerald-950",
    summary:
      "Sangat cocok dan serasi. Masing-masing pihak mampu menerima kelebihan serta kekurangan pasangan dengan lapang dada dan penuh kasih.",
    advice:
      "Pertahankan rasa syukur dan komitmen bersama. Saling menjaga komunikasi yang hangat di tengah kesibukan harian.",
  },
  4: {
    title: "Topo",
    badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
    bgClass: "bg-indigo-50/70",
    borderClass: "border-indigo-200",
    textColor: "text-indigo-950",
    summary:
      "Di awal perjalanan hubungan membutuhkan banyak tirakat, perjuangan, dan adaptasi. Namun di kemudian hari akan memetik buah kesuksesan yang melimpah.",
    advice:
      "Kuatkan ketabahan dan daya juang bersama di masa awal. Keuletan dan kesabaran Anda berdua adalah kunci kemakmuran jangka panjang.",
  },
  5: {
    title: "Tinari",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-200",
    bgClass: "bg-teal-50/70",
    borderClass: "border-teal-200",
    textColor: "text-teal-950",
    summary:
      "Mendapat kelapangan rezeki dan keberuntungan. Sering menemukan kemudahan dalam urusan sandang, pangan, papan, dan relasi kerja.",
    advice:
      "Gunakan rezeki yang lancar untuk berinvestasi bijak dan menyisihkan dana darurat. Hindari hidup berlebihan.",
  },
  6: {
    title: "Padu",
    badgeColor: "bg-orange-100 text-orange-900 border-orange-200",
    bgClass: "bg-orange-50/70",
    borderClass: "border-orange-200",
    textColor: "text-orange-950",
    summary:
      "Sering terjadi adu pendapat atau perdebatan kecil karena sama-sama kritis dan vokal. Namun tidak sampai merusak fondasi hubungan bila disikapi dewasa.",
    advice:
      "Hindari mendebat di saat emosi meninggi. Terapkan jeda waktu (cooling-off) sebelum mengambil keputusan besar.",
  },
  7: {
    title: "Sujanan",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
    bgClass: "bg-purple-50/70",
    borderClass: "border-purple-200",
    textColor: "text-purple-950",
    summary:
      "Diuji dengan rasa cemburu, godaan kesetiaan, atau kesalahpahaman dari pihak luar. Membutuhkan benteng transparansi yang kuat.",
    advice:
      "Terapkan keterbukaan penuh dalam segala hal. Jangan biarkan kabar burung atau bisikan pihak luar mengganggu kepercayaan bersama.",
  },
  0: {
    title: "Pesthi",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
    bgClass: "bg-sky-50/70",
    borderClass: "border-sky-200",
    textColor: "text-sky-950",
    summary:
      "Kehidupan kemitraan rukun, damai, tenteram, dan adem ayem lahir batin. Masalah apa pun yang datang dapat diselesaikan secara bijaksana.",
    advice:
      "Rawat kedamaian batin ini dengan terus saling menyemangati dan menjaga kehangatan hubungan spiritual dan keluarga.",
  },
};

export const PersonalWetonCalculator: React.FC<PersonalWetonCalculatorProps> = ({
  onSelectDate,
  onOpenConsultationWithWeton,
}) => {
  // 1. Data Pengguna Utama (Nama Lengkap, Tanggal Lahir)
  const [fullName, setFullName] = useState<string>(() => {
    return localStorage.getItem("titen_user_fullname") || "Mario Fahmi Syahrial";
  });
  const [birthDateStr, setBirthDateStr] = useState<string>(() => {
    return localStorage.getItem("titen_user_birthdate") || "1987-12-24";
  });

  // Simpan ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem("titen_user_fullname", fullName);
  }, [fullName]);

  useEffect(() => {
    localStorage.setItem("titen_user_birthdate", birthDateStr);
  }, [birthDateStr]);

  // 2. Data Rekan / Pasangan (Opsional untuk Kemitraan)
  const [showPartnership, setShowPartnership] = useState<boolean>(false);
  const [partnerName, setPartnerName] = useState<string>("");
  const [partnerBirthDateStr, setPartnerBirthDateStr] = useState<string>("1990-05-15");

  // Perhitungan Weton Utama (Live Instant Sync)
  const birthForecast: DayForecast = useMemo(() => {
    if (!birthDateStr) return calculateDayForecast(new Date(1987, 11, 24));
    const [y, m, d] = birthDateStr.split("-").map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return calculateDayForecast(date);
  }, [birthDateStr]);

  // Perhitungan Weton Pasangan / Rekan Kerja (Live Instant Sync)
  const partnerForecast: DayForecast = useMemo(() => {
    if (!partnerBirthDateStr) return calculateDayForecast(new Date(1990, 4, 15));
    const [y, m, d] = partnerBirthDateStr.split("-").map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return calculateDayForecast(date);
  }, [partnerBirthDateStr]);

  // Hasil Petungan Kemitraan
  const partnershipResult = useMemo(() => {
    const totalNeptuCombined = birthForecast.totalNeptu + partnerForecast.totalNeptu;
    const remainder = totalNeptuCombined % 8;
    const petungan = PETUNGAN_JODOH_DATA[remainder] || PETUNGAN_JODOH_DATA[0];
    return {
      totalNeptuCombined,
      remainder,
      ...petungan,
    };
  }, [birthForecast, partnerForecast]);

  const handleDateChange = (val: string) => {
    setBirthDateStr(val);
    gamelanAudio.playChime("bonang");
  };

  const handlePartnerDateChange = (val: string) => {
    setPartnerBirthDateStr(val);
    gamelanAudio.playChime("ting");
  };

  // Hitung Selapanan (35 hari) dan Wuku recurrence (210 hari)
  const nextMilestones = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nextWetonDate: Date | null = null;
    let nextWukuDate: Date | null = null;

    for (let i = 1; i <= 210; i++) {
      const cand = new Date(today);
      cand.setDate(today.getDate() + i);
      const f = calculateDayForecast(cand);

      if (!nextWetonDate && f.hari === birthForecast.hari && f.pasaran === birthForecast.pasaran) {
        nextWetonDate = cand;
      }
      if (!nextWukuDate && f.wuku.name === birthForecast.wuku.name) {
        nextWukuDate = cand;
      }
      if (nextWetonDate && nextWukuDate) break;
    }

    return { nextWetonDate, nextWukuDate };
  }, [birthForecast]);

  // Format tanggal lahir dalam bahasa Indonesia untuk tampilan cetak & kartu PDF
  const formattedBirthDate = useMemo(() => {
    if (!birthDateStr) return "-";
    const [y, m, d] = birthDateStr.split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [birthDateStr]);

  // 8 Tanggal Selapanan (Wetonan) 1 tahun ke depan untuk piagam resmi
  const upcomingSelapananDates = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 365; i++) {
      const cand = new Date(today);
      cand.setDate(today.getDate() + i);
      const f = calculateDayForecast(cand);
      if (f.hari === birthForecast.hari && f.pasaran === birthForecast.pasaran) {
        dates.push(
          cand.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        );
        if (dates.length >= 8) break;
      }
    }
    return dates;
  }, [birthForecast]);

  // Nomor Registrasi Piagam Otentik
  const certificateRegNo = useMemo(() => {
    const cleanDate = (birthDateStr || "19871224").replace(/-/g, "");
    const pasaranShort = birthForecast.pasaran.toUpperCase().slice(0, 3);
    return `TLJ-PIAGAM/${cleanDate}/${pasaranShort}-${birthForecast.totalNeptu.toString().padStart(2, "0")}`;
  }, [birthDateStr, birthForecast]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* ========================================================================= */}
      {/* 1. DEDICATED PIAGAM RESMI KOSMOLOGI KELAHIRAN (CETAK/PDF A4 LANDSCAPE) */}
      {/* ========================================================================= */}
      <div
        className="hidden print:block bg-[#fffefb] text-[#1c1208] piagam-certificate-print"
        style={{
          width: "100%",
          height: "194mm",
          maxHeight: "194mm",
          pageBreakInside: "avoid",
          breakInside: "avoid",
          pageBreakAfter: showPartnership ? "always" : "avoid",
          border: "3.5px solid #8c6239",
          padding: "10px 14px",
          borderRadius: "14px",
          background: "#fffefb",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            border: "1.5px solid #d4af37",
            padding: "12px 16px",
            borderRadius: "10px",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header Kop Piagam */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src="/logo-mf.png"
                  alt="Logo Mario Fahmi"
                  style={{ width: "48px", height: "48px", objectFit: "contain", display: "block" }}
                />
                <div>
                  <div style={{ fontFamily: "'Marcellus', Georgia, serif", fontSize: "16pt", fontWeight: 800, color: "#1f1207", lineHeight: 1.15, letterSpacing: "0.04em" }}>
                    TITEN LAKU JAWA
                  </div>
                  <div style={{ fontSize: "10.5pt", fontWeight: 800, color: "#7a5832", letterSpacing: "0.04em", marginTop: "2px" }}>
                    Navigasi Irama Siklus Hidup Manusia Jawa
                  </div>
                </div>
              </div>
              {/* Sisi Kanan Kop: Tanggal Penerbitan Saja (Dokumen Primbon Resmi Dihilangkan) */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "8.5pt", fontWeight: 700, color: "#7a5832", letterSpacing: "0.02em" }}>
                  Diterbitkan: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
            </div>

            {/* Garis Aksen Emas */}
            <div style={{ height: "2px", background: "linear-gradient(90deg, #8c6239, #d4af37, #8c6239)", margin: "8px 0 10px 0" }} />
          </div>

          {/* Banner Subjek / Nama (Cukup Namanya Saja Sesuai Permintaan) */}
          <div
            style={{
              backgroundColor: "#faf5ed",
              border: "1.2px solid #ebd8c2",
              borderRadius: "10px",
              padding: "8px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "'Marcellus', Georgia, serif", fontSize: "20pt", fontWeight: 800, color: "#221307", lineHeight: 1.2 }}>
              {fullName || "Subjek Terdaftar"}
            </div>
            <div style={{ fontSize: "8.5pt", color: "#483626", marginTop: "3px" }}>
              Lahir pada hari: <strong style={{ color: "#1f1207" }}>{birthForecast.hari}, {formattedBirthDate}</strong> &bull; Weton: <strong style={{ color: "#7a5832" }}>{birthForecast.weton}</strong> (Neptu <strong>{birthForecast.totalNeptu}</strong>) &bull; Kalender Jawa: <strong style={{ color: "#1f1207" }}>Tahun Jawa / Sasi {birthForecast.sasi}</strong>
            </div>
          </div>

          {/* 3 Medali Utama: Weton, Wuku, Sasi */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            <div style={{ border: "1px solid #dfcca9", borderRadius: "10px", padding: "8px 12px", background: "#fbf7f0", textAlign: "center" }}>
              <div style={{ fontSize: "7.5pt", fontWeight: 800, color: "#8c6239", textTransform: "uppercase", letterSpacing: "0.06em" }}>WETON & TOTAL NEPTU</div>
              <div style={{ fontFamily: "'Marcellus', serif", fontSize: "14pt", fontWeight: 800, color: "#27170a", margin: "2px 0" }}>{birthForecast.weton}</div>
              <div style={{ fontSize: "8pt", fontWeight: 600, color: "#543d28" }}>Total Neptu: {birthForecast.totalNeptu} ({birthForecast.hari} {birthForecast.neptuHari} + {birthForecast.pasaran} {birthForecast.neptuPasaran})</div>
            </div>
            <div style={{ border: "1px solid #dfcca9", borderRadius: "10px", padding: "8px 12px", background: "#fbf7f0", textAlign: "center" }}>
              <div style={{ fontSize: "7.5pt", fontWeight: 800, color: "#8c6239", textTransform: "uppercase", letterSpacing: "0.06em" }}>WUKU LAHIR (SIKLUS 210 HARI)</div>
              <div style={{ fontFamily: "'Marcellus', serif", fontSize: "14pt", fontWeight: 800, color: "#27170a", margin: "2px 0" }}>Wuku {birthForecast.wuku.name}</div>
              <div style={{ fontSize: "8pt", fontWeight: 600, color: "#543d28" }}>Wuku #{birthForecast.wuku.number} &bull; Fase {birthForecast.wuku.faseNumber} ({birthForecast.wuku.faseTitle})</div>
            </div>
            <div style={{ border: "1px solid #dfcca9", borderRadius: "10px", padding: "8px 12px", background: "#fbf7f0", textAlign: "center" }}>
              <div style={{ fontSize: "7.5pt", fontWeight: 800, color: "#8c6239", textTransform: "uppercase", letterSpacing: "0.06em" }}>SASI KELAHIRAN</div>
              <div style={{ fontFamily: "'Marcellus', serif", fontSize: "14pt", fontWeight: 800, color: "#27170a", margin: "2px 0" }}>Sasi {birthForecast.sasi}</div>
              <div style={{ fontSize: "8pt", fontWeight: 600, color: "#543d28" }}>Dimensi Kebatinan & Resonansi Kosmis</div>
            </div>
          </div>

          {/* Grid 2 Kolom: Cakra Pasaran & 4 Dimensi Kosmologis */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr", gap: "10px" }}>
            {/* Kolom Kiri: Cakra Pasaran & Aura */}
            <div style={{ border: "1px solid #e2d2bf", borderRadius: "10px", padding: "10px 14px", background: "#faf7f2" }}>
              <div style={{ fontSize: "8pt", fontWeight: 800, color: "#7a5832", textTransform: "uppercase", marginBottom: "6px", borderBottom: "1px solid #ebdccb", paddingBottom: "3px" }}>
                🧭 Cakra Kiblat Papat Kalima Pancer
              </div>
              {/* Pasaran 5 Row */}
              <div style={{ display: "flex", gap: "4px", justifyContent: "space-between", marginBottom: "6px" }}>
                {[
                  { name: "Wage", arah: "Lor (Utara)", neptu: 4 },
                  { name: "Legi", arah: "Wetan (Timur)", neptu: 5 },
                  { name: "Pahing", arah: "Kidul (Selatan)", neptu: 9 },
                  { name: "Pon", arah: "Kulon (Barat)", neptu: 7 },
                  { name: "Kliwon", arah: "Pancer (Pusat)", neptu: 8 },
                ].map((p) => {
                  const isBirth = p.name === birthForecast.pasaran;
                  return (
                    <div
                      key={p.name}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "3px 1px",
                        borderRadius: "5px",
                        fontSize: "6.5pt",
                        fontWeight: isBirth ? 800 : 600,
                        background: isBirth ? "#382315" : "#ffffff",
                        color: isBirth ? "#fbf5eb" : "#554433",
                        border: isBirth ? "1.2px solid #c49746" : "1px solid #e6dcd0",
                      }}
                    >
                      <div>{p.name} ({p.neptu})</div>
                      <div style={{ fontSize: "5.5pt", opacity: isBirth ? 0.9 : 0.7 }}>{p.arah.split(" ")[0]}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: "7.5pt", color: "#3d2b1c", lineHeight: 1.45 }}>
                <strong style={{ color: "#8c6239" }}>Aura Pasaran {birthForecast.pasaran} ({PASARAN_DATA[birthForecast.pasaran].title}):</strong>{" "}
                {PASARAN_DATA[birthForecast.pasaran].description}
              </div>
            </div>

            {/* Kolom Kanan: 4 Dimensi Kosmologis & Wuku */}
            <div style={{ border: "1px solid #e2d2bf", borderRadius: "10px", padding: "10px 14px", background: "#faf7f2" }}>
              <div style={{ fontSize: "8pt", fontWeight: 800, color: "#7a5832", textTransform: "uppercase", marginBottom: "6px", borderBottom: "1px solid #ebdccb", paddingBottom: "3px" }}>
                ⚖️ 4 Lapisan Dimensi Kosmologis Kelahiran
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 8px", fontSize: "7.2pt", marginBottom: "5px" }}>
                <div style={{ color: "#665544" }}>
                  <strong>Sadworo:</strong> <span style={{ color: "#1f1207", fontWeight: 700 }}>{birthForecast.sadworo.name}</span> ({birthForecast.sadworo.meaning})
                </div>
                <div style={{ color: "#665544" }}>
                  <strong>Caturworo:</strong> <span style={{ color: "#1f1207", fontWeight: 700 }}>{birthForecast.caturworo.name}</span> ({birthForecast.caturworo.focus})
                </div>
                <div style={{ color: "#665544" }}>
                  <strong>Triworo:</strong> <span style={{ color: "#1f1207", fontWeight: 700 }}>{birthForecast.triworo.name}</span> (Unsur: {birthForecast.triworo.element})
                </div>
                <div style={{ color: "#665544" }}>
                  <strong>Dasaworo:</strong> <span style={{ color: "#1f1207", fontWeight: 700 }}>{birthForecast.dasaworo.name}</span> ({birthForecast.dasaworo.archetype})
                </div>
              </div>
              <div style={{ fontSize: "7.5pt", color: "#3d2b1c", lineHeight: 1.45, borderTop: "1px dashed #e4d8c8", paddingTop: "4px" }}>
                <strong style={{ color: "#8c6239" }}>Pengaruh Wuku {birthForecast.wuku.name} ({birthForecast.wuku.subtitle}):</strong>{" "}
                {birthForecast.wuku.character}
              </div>
            </div>
          </div>

          {/* Kalender Selapanan 1 Tahun ke Depan */}
          <div
            style={{
              backgroundColor: "#faf5ed",
              border: "1px solid #ebd8c2",
              borderRadius: "8px",
              padding: "7px 12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "7.2pt", fontWeight: 800, color: "#7a5832", textTransform: "uppercase" }}>
                📅 Jadwal Selapanan / Wetonan Anda ({birthForecast.weton}) 1 Tahun ke Depan (Siklus 35 Hari):
              </span>
              <span style={{ fontSize: "6.2pt", color: "#887766" }}>
                *Momentum laku tirakat, mawas diri, dan doa keselamatan
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {upcomingSelapananDates.map((dateStr) => (
                <span
                  key={dateStr}
                  style={{
                    padding: "2.5px 8px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #dacbb9",
                    borderRadius: "5px",
                    fontSize: "7.2pt",
                    fontWeight: 700,
                    color: "#332213",
                  }}
                >
                  {dateStr}
                </span>
              ))}
            </div>
          </div>

          {/* Kaki Piagam / Falsafah Luhur & Logo Saja (Sesuai Permintaan 3 & 4) */}
          <div style={{ borderTop: "1.5px solid #d4c5b3", paddingTop: "6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontStyle: "italic", fontWeight: 600, fontSize: "8.5pt", color: "#443322" }}>
                “Memayu Hayuning Bawana, Sura Dira Jayaningrat Lebur Dening Pangastuti”
              </div>
              <div style={{ fontSize: "6.5pt", color: "#887766", marginTop: "2px" }}>
                Dokumen Otentik Primbon Kosmologi Jiwa Jawa &bull; Titen Laku Jawa
              </div>
            </div>
            <div>
              <img
                src="/logo-mf.png"
                alt="Logo Mario Fahmi"
                style={{ width: "38px", height: "38px", objectFit: "contain", display: "inline-block" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DEDICATED PIAGAM KEMITRAAN & JODOH (HALAMAN 2 KHUSUS CETAK JIKA AKTIF) */}
      {/* ========================================================================= */}
      {showPartnership && (
        <div
          className="hidden print:block bg-[#fffefb] text-[#1c1208] piagam-certificate-print"
          style={{
            width: "100%",
            height: "194mm",
            maxHeight: "194mm",
            pageBreakBefore: "always",
            pageBreakInside: "avoid",
            breakInside: "avoid",
            border: "3.5px solid #8c6239",
            padding: "10px 14px",
            borderRadius: "14px",
            background: "#fffefb",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              border: "1.5px solid #d4af37",
              padding: "12px 16px",
              borderRadius: "10px",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Header Kop Piagam Kemitraan */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src="/logo-mf.png"
                    alt="Logo Mario Fahmi"
                    style={{ width: "48px", height: "48px", objectFit: "contain", display: "block" }}
                  />
                  <div>
                    <div style={{ fontFamily: "'Marcellus', Georgia, serif", fontSize: "16pt", fontWeight: 800, color: "#1f1207", lineHeight: 1.15, letterSpacing: "0.04em" }}>
                      TITEN LAKU JAWA
                    </div>
                    <div style={{ fontSize: "10.5pt", fontWeight: 800, color: "#7a5832", letterSpacing: "0.05em", marginTop: "1px" }}>
                      PIAGAM KESELARASAN KEMITRAAN & PETUNGAN JODOH
                    </div>
                    <div style={{ fontSize: "7.5pt", color: "#8c6239", marginTop: "1px" }}>
                      Analisis Kecocokan Energi Primbon Tradisi Jawa (Sistem Petungan 8 Dimensi)
                    </div>
                  </div>
                </div>
                {/* Tanggal Penerbitan */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "8.5pt", fontWeight: 700, color: "#7a5832", letterSpacing: "0.02em" }}>
                    Diterbitkan: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* Garis Aksen Emas */}
              <div style={{ height: "2px", background: "linear-gradient(90deg, #8c6239, #d4af37, #8c6239)", margin: "8px 0 10px 0" }} />
            </div>

            {/* Banner Kedua Pihak / Pasangan */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", alignItems: "center", gap: "8px" }}>
              <div style={{ border: "1px solid #dfcca9", borderRadius: "10px", padding: "8px 14px", background: "#fbf7f0", textAlign: "center" }}>
                <div style={{ fontSize: "7pt", fontWeight: 800, color: "#8c6239", textTransform: "uppercase" }}>PIHAK PERTAMA (UTAMA)</div>
                <div style={{ fontFamily: "'Marcellus', serif", fontSize: "14pt", fontWeight: 800, color: "#221307", margin: "2px 0" }}>
                  {fullName || "Pihak Pertama"}
                </div>
                <div style={{ fontSize: "7.5pt", color: "#483626" }}>
                  Weton: <strong>{birthForecast.weton}</strong> &bull; Bobot Neptu: <strong>{birthForecast.totalNeptu}</strong>
                </div>
              </div>
              <div style={{ textAlign: "center", fontSize: "16pt", fontWeight: 800, color: "#8c6239" }}>
                &
              </div>
              <div style={{ border: "1px solid #dfcca9", borderRadius: "10px", padding: "8px 14px", background: "#fbf7f0", textAlign: "center" }}>
                <div style={{ fontSize: "7pt", fontWeight: 800, color: "#8c6239", textTransform: "uppercase" }}>PIHAK KEDUA (PASANGAN / REKAN)</div>
                <div style={{ fontFamily: "'Marcellus', serif", fontSize: "14pt", fontWeight: 800, color: "#221307", margin: "2px 0" }}>
                  {partnerName || "Pihak Kedua"}
                </div>
                <div style={{ fontSize: "7.5pt", color: "#483626" }}>
                  Weton: <strong>{partnerForecast.weton}</strong> &bull; Bobot Neptu: <strong>{partnerForecast.totalNeptu}</strong>
                </div>
              </div>
            </div>

            {/* Hasil Perhitungan Petungan 8 */}
            <div
              style={{
                backgroundColor: "#faf5ed",
                border: "1.5px solid #d8c3a9",
                borderRadius: "10px",
                padding: "10px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "7.5pt", fontWeight: 800, color: "#7a5832", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                HASIL PETUNGAN KESELARASAN TRADISI JAWA (SISA BAGI 8 #{partnershipResult.remainder})
              </div>
              <div style={{ fontFamily: "'Marcellus', Georgia, serif", fontSize: "18pt", fontWeight: 800, color: "#271509", margin: "3px 0" }}>
                Kategori: “{partnershipResult.title}”
              </div>
              <div style={{ fontSize: "8pt", fontWeight: 700, color: "#5a432e" }}>
                Rumus: ({birthForecast.totalNeptu} + {partnerForecast.totalNeptu}) = Total Neptu {partnershipResult.totalNeptuCombined} &divide; 8 &rarr; Sisa #{partnershipResult.remainder} ({partnershipResult.title})
              </div>
            </div>

            {/* Uraian Dinamika & Rekomendasi Laku Harmoni */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ border: "1px solid #e2d2bf", borderRadius: "10px", padding: "10px 14px", background: "#faf7f2" }}>
                <div style={{ fontSize: "8pt", fontWeight: 800, color: "#7a5832", textTransform: "uppercase", marginBottom: "4px", borderBottom: "1px solid #ebdccb", paddingBottom: "3px" }}>
                  📖 Dinamika Energi Hubungan
                </div>
                <div style={{ fontSize: "7.5pt", color: "#3d2b1c", lineHeight: 1.45 }}>
                  {partnershipResult.summary}
                </div>
              </div>
              <div style={{ border: "1px solid #e2d2bf", borderRadius: "10px", padding: "10px 14px", background: "#faf7f2" }}>
                <div style={{ fontSize: "8pt", fontWeight: 800, color: "#7a5832", textTransform: "uppercase", marginBottom: "4px", borderBottom: "1px solid #ebdccb", paddingBottom: "3px" }}>
                  🌱 Rekomendasi Laku Harmoni & Ikhtiar
                </div>
                <div style={{ fontSize: "7.5pt", color: "#3d2b1c", lineHeight: 1.45 }}>
                  {partnershipResult.advice}
                </div>
              </div>
            </div>

            {/* Kaki Piagam Kemitraan */}
            <div style={{ borderTop: "1.5px solid #d4c5b3", paddingTop: "6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontStyle: "italic", fontWeight: 600, fontSize: "8.5pt", color: "#443322" }}>
                  “Rukun Agawe Santosa, Crah Agawe Bubrah”
                </div>
                <div style={{ fontSize: "6.5pt", color: "#887766", marginTop: "2px" }}>
                  Petungan ini adalah sarana mawas diri, saling memahami watak, dan merajut keharmonisan hidup bersama.
                </div>
              </div>
              <div>
                <img
                  src="/logo-mf.png"
                  alt="Logo Mario Fahmi"
                  style={{ width: "38px", height: "38px", objectFit: "contain", display: "inline-block" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAMPILAN ANTARMUKA WEB INTERAKTIF (SEMBUNYI SAAT CETAK / PRINT:HIDDEN) */}
      {/* ========================================================================= */}
      <div className="space-y-7 print:hidden">

      {/* 1. KONTROL INPUT LENGKAP: Nama Lengkap, Hari, & Tanggal Lahir (Sinkron Otomatis) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#faf6ef] to-[#f4ebe1] border border-[#e4d7c5] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#ebdcc9]">
          <div>
            {/* Badge 'Kalkulator Weton & Peta Jiwa Pribadi' disembunyikan sesuai permintaan */}
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#271a0e]">
              Kenali Weton & Karakter Kelahiran Anda
            </h2>
            <p className="text-sm sm:text-base text-[#685744] mt-2 max-w-2xl leading-relaxed">
              Masukkan <strong>Nama Lengkap</strong> dan <strong>Tanggal Lahir</strong> Anda. Sistem akan secara otomatis menghitung <strong>Hari Lahir</strong>, <strong>Pasaran</strong>, <strong>Neptu</strong>, <strong>Wuku</strong>, serta seluruh lapisan dimensi filosofis Jawa secara instan dan presisi.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#dac9b4] text-[#422e1b] hover:bg-[#faf4ec] text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              title="Cetak atau Simpan PDF Profil Weton Pribadi"
            >
              <Printer className="w-4 h-4 text-[#8c6239]" />
              <span>Cetak / PDF Profil</span>
            </button>
          </div>
        </div>

        {/* Form Grid 3-Kolom: Nama Lengkap, Tanggal Lahir, Hari Lahir (Sinkron) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kolom 1: Nama Lengkap */}
          <div className="bg-white/95 border border-[#dfd2bf] rounded-2xl p-4 shadow-xs">
            <label className="block text-xs font-bold text-[#4a3420] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#8c6239]" />
              <span>Nama Lengkap:</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap Anda..."
              className="w-full bg-[#faf7f2] border border-[#dacbb7] text-[#2c1d0f] text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none"
            />
            <span className="text-[10px] text-[#857260] mt-1 block">
              Nama dicantumkan pada kartu profil & sertifikat jiwa.
            </span>
          </div>

          {/* Kolom 2: Tanggal Lahir */}
          <div className="bg-white/95 border border-[#dfd2bf] rounded-2xl p-4 shadow-xs">
            <label className="block text-xs font-bold text-[#4a3420] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8c6239]" />
              <span>Tanggal Lahir:</span>
            </label>
            <input
              type="date"
              value={birthDateStr}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#dacbb7] text-[#2c1d0f] text-sm font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none cursor-pointer"
            />
            <span className="text-[10px] text-[#857260] mt-1 block">
              Pilih tanggal, bulan, dan tahun kelahiran.
            </span>
          </div>

          {/* Kolom 3: Hari Lahir (Terhitung Otomatis & Sinkron) */}
          <div className="bg-white/95 border border-[#dfd2bf] rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#4a3420] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8c6239]" />
                <span>Hari Lahir (Sinkron):</span>
              </label>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                🟢 Otomatis
              </span>
            </div>
            <div className="w-full bg-[#faf7f2] border border-[#dacbb7] text-[#2c1d0f] text-sm font-bold rounded-xl px-3.5 py-2.5 flex items-center justify-between">
              <span className="text-sm sm:text-base font-bold text-black">{birthForecast.hari}</span>
              <span className="text-xs font-semibold text-[#8c6239] bg-[#ebdcc9] px-2 py-0.5 rounded-md">
                Bobot Neptu: {birthForecast.neptuHari}
              </span>
            </div>
            <span className="text-[10px] text-[#857260] mt-1 block">
              Sinkron otomatis sesuai kalender astronomis.
            </span>
          </div>
        </div>

        {/* Banner Sinkronisasi Instan */}
        <div className="mt-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#faedd9] via-[#f7e6ce] to-[#f4dfc2] border border-[#e2cca9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#523b24]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>{fullName ? fullName : "Subjek"}</strong> teridentifikasi lahir pada hari{" "}
              <strong>{birthForecast.hari}</strong> dengan Weton{" "}
              <strong className="text-[#3b220e] text-sm">{birthForecast.weton}</strong> (Neptu{" "}
              <strong>{birthForecast.totalNeptu}</strong>) di bawah naungan Wuku{" "}
              <strong>{birthForecast.wuku.name}</strong>.
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-[#dfcaa7] font-semibold text-[11px] text-[#6b4e31] shrink-0 text-center">
            Sasi: {birthForecast.sasi}
          </span>
        </div>
      </div>

      {/* 2. HASIL PROFIL JIWA LENGKAP & KARTU PERSONAL */}
      <div className="bg-white border border-[#e4d7c5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-[#f2eadf]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#826e5a] font-bold flex items-center gap-2">
              <span>Profil Waktu & Primbon Pribadi</span>
              {fullName && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#f3ebd9] text-[#5e452a] font-semibold text-[10px]">
                  {fullName}
                </span>
              )}
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-bold text-[#27190d] mt-1">
              {birthForecast.weton}
            </h3>
            <div className="text-xs sm:text-sm text-[#73604f] mt-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#8c6239]" />
              <span>
                Kelahiran:{" "}
                <strong>
                  {birthForecast.hari},{" "}
                  {new Date(birthForecast.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>{" "}
                (Tahun Jawa / Sasi {birthForecast.sasi})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Box Total Neptu */}
            <div className="bg-gradient-to-br from-[#faf6ef] to-[#f4ebe1] border border-[#e2d4c0] rounded-2xl p-4 text-center min-w-[120px] shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#826f5d]">
                Total Neptu
              </div>
              <div className="font-display text-3xl font-bold text-[#2a1e12] mt-0.5">
                {birthForecast.totalNeptu}
              </div>
              <div className="text-[11px] font-semibold text-[#8c7865] mt-1">
                {birthForecast.hari} ({birthForecast.neptuHari}) + {birthForecast.pasaran} ({birthForecast.neptuPasaran})
              </div>
            </div>

            {/* Box Wuku Lahir */}
            <div className="bg-gradient-to-br from-[#faf6ef] to-[#f4ebe1] border border-[#e2d4c0] rounded-2xl p-4 text-center min-w-[120px] shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#826f5d]">
                Wuku Lahir
              </div>
              <div className="font-display text-3xl font-bold text-[#2a1e12] mt-0.5">
                {birthForecast.wuku.name}
              </div>
              <div className="text-[11px] font-semibold text-[#8c7865] mt-1">
                Wuku #{birthForecast.wuku.number} (Fase {birthForecast.wuku.faseNumber})
              </div>
            </div>

            {/* Box Sasi */}
            <div className="bg-gradient-to-br from-[#faf6ef] to-[#f4ebe1] border border-[#e2d4c0] rounded-2xl p-4 text-center min-w-[120px] shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#826f5d]">
                Sasi Kelahiran
              </div>
              <div className="font-display text-2xl font-bold text-[#2a1e12] mt-0.5">
                {birthForecast.sasi}
              </div>
              <div className="text-[11px] font-semibold text-[#8c7865] mt-1">
                Irama Batiniah
              </div>
            </div>
          </div>
        </div>

        {/* 6 Dimensi Kosmologis Kelahiran (Sadworo, Caturworo, Triworo, Dasaworo, Arah Pasaran) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#735d49] mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8c6239]" />
            <span>Lapisan Dimensi Kosmologis Kelahiran ({fullName || "Pribadi"})</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#faf6ef] border border-[#ebdcc9]">
              <span className="text-[10px] text-[#8c6239] font-bold uppercase block">Sadworo (Paringkelan)</span>
              <strong className="text-sm text-[#2d1e11] mt-0.5 block">{birthForecast.sadworo.name}</strong>
              <span className="text-[11px] text-[#705e4d] mt-1 block">Makna: {birthForecast.sadworo.meaning}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#faf6ef] border border-[#ebdcc9]">
              <span className="text-[10px] text-[#8c6239] font-bold uppercase block">Caturworo (Sosial)</span>
              <strong className="text-sm text-[#2d1e11] mt-0.5 block">{birthForecast.caturworo.name}</strong>
              <span className="text-[11px] text-[#705e4d] mt-1 block">Fokus: {birthForecast.caturworo.focus}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#faf6ef] border border-[#ebdcc9]">
              <span className="text-[10px] text-[#8c6239] font-bold uppercase block">Triworo (Unsur Alam)</span>
              <strong className="text-sm text-[#2d1e11] mt-0.5 block">{birthForecast.triworo.name}</strong>
              <span className="text-[11px] text-[#705e4d] mt-1 block">Unsur: {birthForecast.triworo.element}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#faf6ef] border border-[#ebdcc9]">
              <span className="text-[10px] text-[#8c6239] font-bold uppercase block">Dasaworo (Lakon Watak)</span>
              <strong className="text-sm text-[#2d1e11] mt-0.5 block">{birthForecast.dasaworo.name}</strong>
              <span className="text-[11px] text-[#705e4d] mt-1 block">Lakon: {birthForecast.dasaworo.archetype}</span>
            </div>
          </div>
        </div>

        {/* Karakter Bawaan Pasaran & Wuku */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#faf7f2] border border-[#ebdcca] rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8c6239] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Aura & Karakter Pasaran {birthForecast.pasaran}</span>
            </div>
            <p className="text-sm text-[#382617] leading-relaxed">
              Kelahiran <strong>{birthForecast.weton}</strong> berada dalam getaran pasaran{" "}
              <strong className="text-[#8c6239]">{birthForecast.pasaran}</strong> ({PASARAN_DATA[birthForecast.pasaran].title}).{" "}
              {birthForecast.pasaran === "Legi" &&
                "Membawa aura keharmonisan, daya pikat sosial, luwes dalam komunikasi, diplomatis, dan mudah disukai oleh berbagai kalangan."}
              {birthForecast.pasaran === "Pahing" &&
                "Membawa nyala tekad kuat, berani mendobrak hambatan, berjiwa pelopor, pantang menyerah, dan memiliki dorongan kemandirian yang tinggi."}
              {birthForecast.pasaran === "Pon" &&
                "Membawa kestabilan nalar yang kokoh, teguh memegang amanah, teliti dalam perhitungan materi, dan berprinsip jelas."}
              {birthForecast.pasaran === "Wage" &&
                "Membawa kedalaman introspeksi batin, teliti, berhati-hati, menyukai keheningan, dan tajam dalam mengamati hal-hal yang tersirat."}
              {birthForecast.pasaran === "Kliwon" &&
                "Membawa daya magnetik batiniah, kepemimpinan spiritual yang berwibawa, kharisma yang menghimpun orang banyak, serta ketajaman intuisi."}
            </p>
          </div>

          <div className="bg-[#faf7f2] border border-[#ebdcca] rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8c6239] uppercase tracking-wider">
              <Feather className="w-4 h-4 text-amber-600" />
              <span>Pengaruh Wuku Kelahiran: {birthForecast.wuku.name}</span>
            </div>
            <p className="text-sm text-[#382617] leading-relaxed">
              <strong className="text-[#8c6239]">{birthForecast.wuku.subtitle}:</strong>{" "}
              {birthForecast.wuku.character}
            </p>
          </div>
        </div>

        {/* Siklus Perulangan Waktu Pribadi (Selapanan & 210 Hari) */}
        <div className="bg-white border border-[#e5d9cb] rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#453424] uppercase tracking-wider">
            <Repeat className="w-4 h-4 text-[#8c6239]" />
            <span>Siklus Perulangan Waktu Pribadi ({fullName || "Pribadi"})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#faf5ed] border border-[#ebdcca] shadow-xs">
              <div className="text-[11px] font-bold text-[#8c6239] uppercase">
                Hari Weton Berikutnya (Selapanan 35 Hari)
              </div>
              <div className="font-bold text-sm text-[#2d2013] mt-1.5">
                {nextMilestones.nextWetonDate
                  ? new Date(nextMilestones.nextWetonDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Mencari..."}
              </div>
              <div className="text-[11px] text-[#786654] mt-1.5 leading-relaxed">
                Siklus 35 hari pertemuan {birthForecast.hari} & {birthForecast.pasaran}. Tradisi Jawa menganjurkan laku syukur, mawas diri, dan doa keselamatan di hari ini.
              </div>
              {nextMilestones.nextWetonDate && (
                <button
                  onClick={() => {
                    onSelectDate(nextMilestones.nextWetonDate!);
                    gamelanAudio.playChime("bonang");
                  }}
                  className="text-xs text-[#8c6239] hover:text-[#50341b] font-bold mt-2.5 block cursor-pointer"
                >
                  Lihat Tanggal Ini di Kompas Hari Ini →
                </button>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-[#faf5ed] border border-[#ebdcca] shadow-xs">
              <div className="text-[11px] font-bold text-[#8c6239] uppercase">
                Kembalinya Wuku Kelahiran (Siklus 210 Hari)
              </div>
              <div className="font-bold text-sm text-[#2d2013] mt-1.5">
                {nextMilestones.nextWukuDate
                  ? new Date(nextMilestones.nextWukuDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Mencari..."}
              </div>
              <div className="text-[11px] text-[#786654] mt-1.5 leading-relaxed">
                Minggu di mana Wuku {birthForecast.wuku.name} berulang kembali dalam siklus 210 hari Pawukon Nusantara. Energi bawaan jiwa Anda berada di puncak resonansinya.
              </div>
              {nextMilestones.nextWukuDate && (
                <button
                  onClick={() => {
                    onSelectDate(nextMilestones.nextWukuDate!);
                    gamelanAudio.playChime("bonang");
                  }}
                  className="text-xs text-[#8c6239] hover:text-[#50341b] font-bold mt-2.5 block cursor-pointer"
                >
                  Lihat Tanggal Ini di Kompas Hari Ini →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODUL KEMITRAAN: Uji Keselarasan Weton Pasangan / Rekan Kerja */}
      <div className="bg-white border border-[#e4d7c5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f2eadf]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faedd9] text-[#8c6239] flex items-center justify-center shrink-0 border border-[#decaba]">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2a1c0f]">
                Uji Keselarasan Kemitraan & Pasangan (Petungan Jodoh)
              </h3>
              <p className="text-xs text-[#705e4d]">
                Berdasarkan rumusan Primbon Jawa Petungan Neptu 8 Dimensi (Pegat, Ratu, Jodo, Topo, Tinari, Padu, Sujanan, Pesthi).
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPartnership(!showPartnership)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              showPartnership
                ? "bg-[#382415] text-white border-[#382415]"
                : "bg-[#faf6ee] text-[#543b22] border-[#dacbb7] hover:bg-[#f2e7d7]"
            }`}
          >
            {showPartnership ? "Sembunyikan Analisis Kemitraan" : "Buka Analisis Kemitraan +"}
          </button>
        </div>

        {showPartnership && (
          <div className="space-y-6 pt-2">
            {/* Input Pasangan / Rekan Kerja */}
            <div className="p-5 rounded-2xl bg-[#faf6ef] border border-[#e8dac9] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a614b] block">
                Masukkan Data Rekan Kerja / Pasangan:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4a3420] mb-1">
                    Nama Pasangan / Rekan:
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Contoh: Dinda Permata"
                    className="w-full bg-white border border-[#dacbb7] text-[#2c1d0f] text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4a3420] mb-1">
                    Tanggal Lahir Pasangan / Rekan:
                  </label>
                  <input
                    type="date"
                    value={partnerBirthDateStr}
                    onChange={(e) => handlePartnerDateChange(e.target.value)}
                    className="w-full bg-white border border-[#dacbb7] text-[#2c1d0f] text-sm font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#8c6239] focus:outline-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4a3420] mb-1">
                    Weton Pasangan (Sinkron Otomatis):
                  </label>
                  <div className="w-full bg-white border border-[#dacbb7] text-[#2c1d0f] text-sm font-bold rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                    <span>{partnerForecast.weton}</span>
                    <span className="text-xs font-semibold text-[#8c6239] bg-[#faedd9] px-2 py-0.5 rounded-md">
                      Neptu: {partnerForecast.totalNeptu}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hasil Analisis Keselarasan Kemitraan */}
            <div className={`p-6 rounded-3xl border ${partnershipResult.borderClass} ${partnershipResult.bgClass} space-y-4 shadow-xs`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#63503f]">
                    Kategori Keselarasan Energi:
                  </span>
                  <div className="flex items-center gap-2.5 mt-1">
                    <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#2d1c0c]">
                      {partnershipResult.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${partnershipResult.badgeColor}`}>
                      Sisa Pembagian 8: #{partnershipResult.remainder}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-semibold text-[#735e4d] block">
                    Total Gabungan Neptu:
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#2a190b]">
                    {birthForecast.totalNeptu} + {partnerForecast.totalNeptu} = {partnershipResult.totalNeptuCombined}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#302012] leading-relaxed">
                  {partnershipResult.summary}
                </p>
                <div className="p-3.5 rounded-xl bg-white/80 border border-black/5 text-xs text-[#422e1b] leading-relaxed">
                  <strong>Rekomendasi Laku Harmoni:</strong> {partnershipResult.advice}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
