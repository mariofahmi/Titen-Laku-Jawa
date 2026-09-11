import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily / safely
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// AI Forecasting & Life Guidance Endpoint
app.post("/api/forecast-ai", async (req, res) => {
  try {
    const { intention, targetDate, contextDetails, userWeton } = req.body;

    if (!intention) {
      return res.status(400).json({ error: "Niat atau rencana belum diisi." });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: "Kunci API Gemini belum terpasang di Settings > Secrets.",
      });
    }

    const prompt = `Anda adalah seorang tetua dan penasihat bijak falsafah waktu Jawa (Pujangga Pawukon & Budayawan Jawa), yang berpegang teguh pada buku "Kalender Jawa: Perhitungan Waktu, Watak, dan Irama Kehidupan" karya Mario Fahmi Syahrial.

Prinsip Utama:
1. Kalender Jawa BUKAN penentu takdir mutlak atau ramalan klenik menakut-nakuti, melainkan "Peta Iklim Spiritual" dan kompas kesadaran agar tindakan manusia selaras dengan ritme alam semesta.
2. Ingat kearifan: Kalender membantu kita "mendorong pintu yang sudah terbuka sedikit", bukan "menendang pintu yang terkunci rapat". Kesiapan diri, tim, dan kelayakan rencana tetaplah yang utama.
3. Gunakan konsep-konsep siklus waktu Jawa yang relevan:
   - Wuku (tema mingguan dari 30 wuku siklus 210 hari)
   - Pasaran (Legi, Pahing, Pon, Wage, Kliwon)
   - Sadworo (6 hari - kearifan ekologis & relasi alam: Tungle, Aryang, Warukung, Paningron, Uwas, Mawulu)
   - Caturworo (4 hari - dinamika sosial & rezeki: Sri, Laba, Jaya, Menala)
   - Triworo (3 hari - unsur material: Pasah/besi, Beteng/batu, Kajeng/kayu)
   - Dasaworo (10 hari - panggung drama manusia: Pandhita, Pati, Suka, Duka, Sri, Manuh, Manusa, Raja, Dewa, Raksasa)
   - Neptu & Weton jika disediakan.

Informasi Rencana Pengguna:
- Niat / Rencana: ${intention}
- Tanggal Sasaran: ${targetDate || "Belum ditentukan / mencari waktu terbaik"}
- Detail Konteks Tambahan: ${contextDetails || "Tidak ada"}
- Weton Pengguna (jika ada): ${userWeton || "Tidak disebutkan"}

Berikan wejangan forecasting & navigasi waktu dengan struktur yang santun, mendalam, praktis, dan memberdayakan:
1. Pembacaan Arus Iklim Waktu: Analisis keselarasan niat dengan irama waktu, fase wuku atau pasaran yang ideal.
2. Langkah Penyelarasan Tindakan (Strategi Menabur): Apa yang perlu dipersiapkan secara batiniah & lahiriah.
3. Mitigasi Kewaspadaan & Menahan Diri: Hari/energi apa yang perlu diwaspadai (misalnya menghindari konfrontasi saat Aryang/Raksasa, kehati-hatian saat Wage/Wuye, atau penundaan saat Bala).
4. Doa & Pepatah Jawa Penutup (Pitutur Luhur): Satu kalimat filosofi Jawa klasik yang menyejukkan hati.

Tulis dalam Bahasa Indonesia yang indah, elegan, berwibawa, dan mudah dipahami. Hindari takhayul menakutkan; tekankan kesadaran ekologis dan psikologis.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({
      text: response.text,
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: error?.message || "Gagal menghasilkan wejangan forecasting waktu.",
    });
  }
});

// Vite / Production middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pawukon Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
