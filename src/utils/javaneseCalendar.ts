import {
  HariName,
  PasaranName,
  SadworoName,
  CaturworoName,
  TriworoName,
  DasaworoName,
  SasiName,
  DayForecast,
  DayMatchScore,
  IntentionType,
} from "../types";
import {
  WUKU_LIST,
  PASARAN_DATA,
  SADWORO_DATA,
  CATURWORO_DATA,
  TRIWORO_DATA,
  DASAWORO_DATA,
  SASI_MEANINGS,
  INTENTION_CONFIGS,
} from "../data/pawukonData";

const HARI_ARRAY: HariName[] = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const HARI_NEPTU: Record<HariName, number> = {
  Minggu: 5,
  Senin: 4,
  Selasa: 3,
  Rabu: 7,
  Kamis: 8,
  Jumat: 6,
  Sabtu: 9,
};

const PASARAN_ARRAY: PasaranName[] = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
const SADWORO_ARRAY: SadworoName[] = [
  "Tungle",
  "Aryang",
  "Warukung",
  "Paningron",
  "Uwas",
  "Mawulu",
];
const CATURWORO_ARRAY: CaturworoName[] = ["Sri", "Laba", "Jaya", "Menala"];
const TRIWORO_ARRAY: TriworoName[] = ["Pasah", "Beteng", "Kajeng"];
const DASAWORO_ARRAY: DasaworoName[] = [
  "Pandhita",
  "Pati",
  "Suka",
  "Duka",
  "Sri",
  "Manuh",
  "Manusa",
  "Raja",
  "Dewa",
  "Raksasa",
];

// Algoritma astronomis Julian Day Number (JD) standar untuk presisi kalender Jawa multi-abad
export function gregorianToJD(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

// Reference anchor Pawukon tervalidasi astronomis & historis (2023-12-17 adalah Minggu Wuku Sinta, JD: 2460296)
const JD_SINTA_REF = 2460296;
const REF_SURA_JD = 2461269; // 1 Sura 1960 Jawa = 16 Agustus 2026
const SYNODIC_MONTH = 29.53058867;

// Positive modulo helper
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

// Determine Sasi for a date (strict alignment with 2026 book tables + continuous lunar projection)
function getSasiForDate(targetDate: Date, jd: number): SasiName {
  const y = targetDate.getFullYear();
  const m = targetDate.getMonth() + 1;
  const d = targetDate.getDate();
  const ym = y * 10000 + m * 100 + d;

  if (y === 2026) {
    if (ym <= 20260203) return "Jumadil Akhir";
    if (ym <= 20260314) return "Rejeb";
    if (ym <= 20260412) return "Ruwah";
    if (ym <= 20260512) return "Pasa";
    if (ym <= 20260612) return "Sawal";
    if (ym <= 20260725) return "Sela";
    if (ym <= 20260815) return "Besar";
    if (ym <= 20260914) return "Sura";
    if (ym <= 20261010) return "Sapar";
    if (ym <= 20261114) return "Mulud";
    return "Bakda Mulud";
  }

  const daysDiff = jd - REF_SURA_JD;
  let monthOffset = Math.floor(daysDiff / SYNODIC_MONTH);
  const approxMonthStartJD = Math.round(REF_SURA_JD + monthOffset * SYNODIC_MONTH);
  if (jd < approxMonthStartJD) {
    monthOffset -= 1;
  }
  const sasiIdx = mod(monthOffset, 12);
  const SASI_ORDER: SasiName[] = [
    "Sura",
    "Sapar",
    "Mulud",
    "Bakda Mulud",
    "Jumadil Awal",
    "Jumadil Akhir",
    "Rejeb",
    "Ruwah",
    "Pasa",
    "Sawal",
    "Sela",
    "Besar",
  ];
  return SASI_ORDER[sasiIdx];
}

export function calculateDayForecast(
  inputDate: Date,
  options?: { mode?: "standard" | "book2026" }
): DayForecast {
  const d = new Date(inputDate);
  d.setHours(0, 0, 0, 0);

  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 1-12
  const day = d.getDate();

  const jd = gregorianToJD(year, month, day);

  // 1. Hari (7)
  const dayOfWeek = (jd + 1) % 7; // 0=Minggu, 1=Senin... 4=Kamis, 6=Sabtu
  const hari = HARI_ARRAY[dayOfWeek];
  const neptuHari = HARI_NEPTU[hari];

  // 2. Pasaran (5) - Standar Tradisi Jawa: (jd % 5) -> 0: Legi, 1: Pahing, 2: Pon, 3: Wage, 4: Kliwon
  const pasaranIndex = mod(jd, 5);
  const pasaran = PASARAN_ARRAY[pasaranIndex];
  const neptuPasaran = PASARAN_DATA[pasaran].neptu;
  const totalNeptu = neptuHari + neptuPasaran;

  // 3. Sadworo (6) - Paringkelan: 0: Tungle, 1: Aryang, 2: Warukung, 3: Paningron, 4: Uwas, 5: Mawulu
  const sadworoIndex = mod(jd + 4, 6);
  const sadworoName = SADWORO_ARRAY[sadworoIndex];
  const sadworoInfo = SADWORO_DATA[sadworoName];

  // 4. Caturworo (4) - 0: Sri, 1: Laba, 2: Jaya, 3: Menala
  const caturworoIndex = mod(jd, 4);
  const caturworoName = CATURWORO_ARRAY[caturworoIndex];
  const caturworoInfo = CATURWORO_DATA[caturworoName];

  // 5. Triworo (3) - 0: Pasah, 1: Beteng, 2: Kajeng
  const triworoIndex = mod(jd + 1, 3);
  const triworoName = TRIWORO_ARRAY[triworoIndex];
  const triworoInfo = TRIWORO_DATA[triworoName];

  // 6. Dasaworo (10) - 0: Pandhita, 1: Pati, 2: Suka, 3: Duka, 4: Sri, 5: Manuh, 6: Manusa, 7: Raja, 8: Dewa, 9: Raksasa
  const dasaworoIndex = mod(jd + 2, 10);
  const dasaworoName = DASAWORO_ARRAY[dasaworoIndex];
  const dasaworoInfo = DASAWORO_DATA[dasaworoName];

  // 7. Wuku (30) - Siklus Pawukon 210 hari, berganti setiap hari Minggu
  const sundayJD = jd - dayOfWeek;
  const weeksDiff = Math.floor((sundayJD - JD_SINTA_REF) / 7);
  const wukuIndex = mod(weeksDiff, 30);
  const wuku = WUKU_LIST[wukuIndex];

  // 8. Sasi
  const sasi = getSasiForDate(d, jd);
  const sasiMeaning = SASI_MEANINGS[sasi] || "Irama bulanan penuntun laku.";

  // Format date string YYYY-MM-DD
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const dateStr = `${yyyy}-${mm}-${dd}`;

  // Synthesize Watak Waktu
  const weton = `${hari} ${pasaran}`;
  const synthesisWatak = generateSynthesis(
    hari,
    pasaran,
    wuku.name,
    sadworoName,
    caturworoName,
    triworoName,
    dasaworoName
  );

  const { recommendedFor, avoidFor } = generateRecommendationsAndAvoids(
    wuku.name,
    pasaran,
    caturworoName,
    triworoName,
    dasaworoName,
    sadworoName
  );

  return {
    dateStr,
    date: d,
    hari,
    pasaran,
    weton,
    neptuHari,
    neptuPasaran,
    totalNeptu,
    wuku,
    sasi,
    sasiMeaning,
    sadworo: {
      name: sadworoName,
      meaning: sadworoInfo.meaning,
      prohibitionOrGuidance: sadworoInfo.prohibitionOrGuidance,
      ecologicalWisdom: sadworoInfo.ecologicalWisdom,
    },
    caturworo: {
      name: caturworoName,
      meaning: caturworoInfo.meaning,
      focus: caturworoInfo.focus,
    },
    triworo: {
      name: triworoName,
      element: triworoInfo.element,
      energy: triworoInfo.energy,
    },
    dasaworo: {
      name: dasaworoName,
      meaning: dasaworoInfo.meaning,
      archetype: dasaworoInfo.archetype,
      warningLevel: dasaworoInfo.warningLevel,
    },
    synthesisWatak,
    recommendedFor,
    avoidFor,
  };
}

function generateSynthesis(
  hari: HariName,
  pasaran: PasaranName,
  wukuName: string,
  sadworo: SadworoName,
  caturworo: CaturworoName,
  triworo: TriworoName,
  dasaworo: DasaworoName
): string {
  return `Hari ${hari} berpadu dengan pasaran ${pasaran} di bawah payung Wuku ${wukuName}. Dinamika alam Sadworo ${sadworo} beriringan dengan arus sosial Caturworo ${caturworo}, dipertegas oleh unsur material ${triworo} serta lakon Dasaworo ${dasaworo}. Hari ini mengundang keselarasan antara ketenangan batin dan kehati-hatian tindakan lahiriah.`;
}

function generateRecommendationsAndAvoids(
  wukuName: string,
  pasaran: PasaranName,
  caturworo: CaturworoName,
  triworo: TriworoName,
  dasaworo: DasaworoName,
  sadworo: SadworoName
): { recommendedFor: string[]; avoidFor: string[] } {
  const rec: string[] = [];
  const avo: string[] = [];

  // Recommendations based on combinations
  if (caturworo === "Sri" || caturworo === "Laba") {
    rec.push("Memulai usaha, dagang, transaksi, dan kemitraan");
  }
  if (pasaran === "Legi" || wukuName === "Tambir" || wukuName === "Dukut") {
    rec.push("Silaturahmi keluarga, lamaran, atau temu musyawarah rukun");
  }
  if (pasaran === "Pon" && triworo === "Beteng") {
    rec.push("Penandatanganan komitmen, batas perjanjian, atau pondasi hunian");
  }
  if (pasaran === "Pahing" || wukuName === "Langkir") {
    rec.push("Eksekusi proyek dinamis yang memerlukan keberanian & stamina tinggi");
  }
  if (dasaworo === "Pandhita" || wukuName === "Landep") {
    rec.push("Kajian strategis, belajar ilmu baru, dan perumusan nalar");
  }
  if (pasaran === "Wage" || caturworo === "Menala" || dasaworo === "Duka") {
    rec.push("Kontemplasi sunyi, evaluasi internal, dan jeda memulihkan diri");
  }
  if (pasaran === "Kliwon" || dasaworo === "Dewa") {
    rec.push("Doa penyucian batin, permohonan restu Ilahi, dan tirakatan");
  }

  // Cautions based on cycles
  if (dasaworo === "Pati") {
    avo.push("Hindari memulai proyek baru atau ikrar seumur hidup (Pati: energi penutupan)");
  }
  if (dasaworo === "Raksasa" || sadworo === "Aryang") {
    avo.push("Waspada konfrontasi terbuka, perdebatan emosional di media sosial, atau provokasi ego");
  }
  if (wukuName === "Bala") {
    avo.push("Hindari spekulasi finansial tinggi atau perjalanan jauh yang tergesa-gesa");
  }
  if (wukuName === "Sungsang") {
    avo.push("Tunda peluncuran agenda besar tanpa rencana cadangan (arus rentan berbalik)");
  }
  if (wukuName === "Wuye") {
    avo.push("Hindari mengambil keputusan final saat situasi masih berkabut");
  }
  if (sadworo === "Tungle") {
    avo.push("Peringatan ekologis: Hindari merusak vegetasi / menebang pohon besar");
  }
  if (sadworo === "Warukung") {
    avo.push("Peringatan welas asih: Hindari menyakiti atau menyembelih hewan");
  }
  if (sadworo === "Mawulu") {
    avo.push("Hindari memaksakan tanam benih langsung; rawat tanah dan wadah terlebih dahulu");
  }

  return {
    recommendedFor: rec.length ? rec : ["Aktivitas rutin sehari-hari", "Menjaga keharmonisan"],
    avoidFor: avo.length ? avo : ["Tindakan gegabah tanpa rencana matang"],
  };
}

export function evaluateIntentionHarmony(
  forecast: DayForecast,
  intentionId: IntentionType
): DayMatchScore {
  const config = INTENTION_CONFIGS.find((c) => c.id === intentionId);
  if (!config) {
    return {
      forecast,
      score: 50,
      harmonyTier: "Netral",
      reasons: ["Niat umum."],
      warnings: [],
    };
  }

  let score = 60; // baseline
  const reasons: string[] = [];
  const warnings: string[] = [];

  // 1. Wuku Evaluation (+20 or -25)
  if (config.favoredWukus.includes(forecast.wuku.name)) {
    score += 20;
    reasons.push(
      `Wuku ${forecast.wuku.name} sangat selaras dengan niat ini (${forecast.wuku.subtitle}).`
    );
  } else if (config.discouragedWukus.includes(forecast.wuku.name)) {
    score -= 25;
    warnings.push(
      `Wuku ${forecast.wuku.name} kurang kondusif (${forecast.wuku.subtitle}). Sebaiknya bersabar atau sediakan rencana cadangan.`
    );
  }

  // 2. Pasaran Evaluation (+10 or -10)
  if (config.favoredPasaran.includes(forecast.pasaran)) {
    score += 10;
    reasons.push(
      `Pasaran ${forecast.pasaran} memberikan energi pendukung (${PASARAN_DATA[forecast.pasaran].title}).`
    );
  } else if (forecast.pasaran === "Wage" && intentionId !== "refleksi_penutupan" && intentionId !== "spiritual") {
    score -= 8;
    warnings.push("Pasaran Wage lebih condong pada perenungan daripada eksekusi besar lahiriah.");
  }

  // 3. Caturworo Evaluation (+10 or -5)
  if (config.favoredCaturworo.includes(forecast.caturworo.name)) {
    score += 10;
    reasons.push(
      `Caturworo ${forecast.caturworo.name} mendukung arus kemaslahatan (${forecast.caturworo.meaning}).`
    );
  }

  // 4. Dasaworo Evaluation (+8 or -20)
  if (config.discouragedDasaworo.includes(forecast.dasaworo.name)) {
    score -= 20;
    warnings.push(
      `Dasaworo ${forecast.dasaworo.name} menandakan energi ${forecast.dasaworo.meaning}. Berhati-hatilah terhadap potensi hambatan.`
    );
  } else if (forecast.dasaworo.name === "Sri" || forecast.dasaworo.name === "Pandhita" || forecast.dasaworo.name === "Suka") {
    score += 8;
    reasons.push(`Dasaworo ${forecast.dasaworo.name} menghadirkan suasana ${forecast.dasaworo.meaning}.`);
  }

  // 5. Sadworo Guidance
  if (forecast.sadworo.name === "Aryang" && (intentionId === "pernikahan" || intentionId === "kontrak")) {
    score -= 10;
    warnings.push("Sadworo Aryang mengingatkan agar menjaga emosi dan menjauhi gesekan ego.");
  }

  // Clamp 0 to 100
  score = Math.max(10, Math.min(98, score));

  let harmonyTier: DayMatchScore["harmonyTier"] = "Netral";
  if (score >= 82) harmonyTier = "Sangat Selaras";
  else if (score >= 70) harmonyTier = "Cukup Baik";
  else if (score >= 50) harmonyTier = "Netral";
  else if (score >= 35) harmonyTier = "Kurang Disarankan";
  else harmonyTier = "Hindari";

  return {
    forecast,
    score,
    harmonyTier,
    reasons,
    warnings,
  };
}

export function findBestDaysForIntention(
  startDate: Date,
  daysAhead: number,
  intentionId: IntentionType
): DayMatchScore[] {
  const results: DayMatchScore[] = [];
  const curr = new Date(startDate);
  curr.setHours(0, 0, 0, 0);

  for (let i = 0; i < daysAhead; i++) {
    const candidateDate = new Date(curr);
    candidateDate.setDate(curr.getDate() + i);
    const forecast = calculateDayForecast(candidateDate);
    const match = evaluateIntentionHarmony(forecast, intentionId);
    results.push(match);
  }

  return results.sort((a, b) => b.score - a.score);
}

export function calculatePersonalWeton(birthDate: Date) {
  const forecast = calculateDayForecast(birthDate);
  return {
    birthForecast: forecast,
    weton: forecast.weton,
    totalNeptu: forecast.totalNeptu,
    birthWuku: forecast.wuku,
    pasaranInfo: PASARAN_DATA[forecast.pasaran],
  };
}
