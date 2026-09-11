export type HariName = "Minggu" | "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu";

export type PasaranName = "Legi" | "Pahing" | "Pon" | "Wage" | "Kliwon";

export type SadworoName = "Tungle" | "Aryang" | "Warukung" | "Paningron" | "Uwas" | "Mawulu";

export type CaturworoName = "Sri" | "Laba" | "Jaya" | "Menala";

export type TriworoName = "Pasah" | "Beteng" | "Kajeng";

export type DasaworoName =
  | "Pandhita"
  | "Pati"
  | "Suka"
  | "Duka"
  | "Sri"
  | "Manuh"
  | "Manusa"
  | "Raja"
  | "Dewa"
  | "Raksasa";

export type SasiName =
  | "Sura"
  | "Sapar"
  | "Mulud"
  | "Bakda Mulud"
  | "Jumadil Awal"
  | "Jumadil Akhir"
  | "Rejeb"
  | "Ruwah"
  | "Pasa"
  | "Sawal"
  | "Sela"
  | "Besar";

export interface WukuInfo {
  number: number; // 1 - 30
  name: string;
  subtitle: string;
  faseNumber: 1 | 2 | 3 | 4 | 5 | 6;
  faseTitle: string;
  character: string;
  recommendations: string[];
  cautions: string[];
  elementSummary: string;
}

export interface DayForecast {
  dateStr: string; // YYYY-MM-DD
  date: Date;
  hari: HariName;
  pasaran: PasaranName;
  weton: string; // e.g. "Kamis Wage"
  neptuHari: number;
  neptuPasaran: number;
  totalNeptu: number;
  wuku: WukuInfo;
  sasi: SasiName;
  sasiMeaning: string;
  sadworo: {
    name: SadworoName;
    meaning: string;
    prohibitionOrGuidance: string;
    ecologicalWisdom: string;
  };
  caturworo: {
    name: CaturworoName;
    meaning: string;
    focus: string;
  };
  triworo: {
    name: TriworoName;
    element: string;
    energy: string;
  };
  dasaworo: {
    name: DasaworoName;
    meaning: string;
    archetype: string;
    warningLevel: "safe" | "caution" | "alert";
  };
  synthesisWatak: string;
  recommendedFor: string[];
  avoidFor: string[];
}

export type IntentionType =
  | "pernikahan"
  | "bisnis"
  | "pindah_rumah"
  | "kontrak"
  | "peluncuran"
  | "spiritual"
  | "refleksi_penutupan";

export interface IntentionConfig {
  id: IntentionType;
  title: string;
  tagline: string;
  coreNeeds: string;
  favoredWukus: string[];
  discouragedWukus: string[];
  favoredPasaran: PasaranName[];
  favoredCaturworo: CaturworoName[];
  discouragedDasaworo: DasaworoName[];
  description: string;
}

export interface DayMatchScore {
  forecast: DayForecast;
  score: number; // 0 - 100
  harmonyTier: "Sangat Selaras" | "Cukup Baik" | "Netral" | "Kurang Disarankan" | "Hindari";
  reasons: string[];
  warnings: string[];
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  dateStr: string;
  type: "awal_wuku" | "harian" | "akhir_wuku";
  wukuName: string;
  weton: string;
  promptQuestion: string;
  content: string;
}
