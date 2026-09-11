import React, { useState, useMemo } from "react";
import { Header, ActiveTab } from "./components/Header";
import { DayCompass } from "./components/DayCompass";
import { EventForecaster } from "./components/EventForecaster";
import { PawukonCycleMap } from "./components/PawukonCycleMap";
import { Year2026Forecast } from "./components/Year2026Forecast";
import { PersonalWetonCalculator } from "./components/PersonalWetonCalculator";
import { AiConsultation } from "./components/AiConsultation";
import { TimeJournal } from "./components/TimeJournal";
import { DisclaimerModal } from "./components/DisclaimerModal";
import { calculateDayForecast } from "./utils/javaneseCalendar";
import { gamelanAudio } from "./utils/audioChime";
import { Feather, Compass, BookOpen, Heart } from "lucide-react";

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("kompas");
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  // Disclaimer state: unconditionally open on app launch as requested
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(true);
  const [hasAgreedDisclaimer, setHasAgreedDisclaimer] = useState<boolean>(false);

  const handleAgreeDisclaimer = () => {
    setHasAgreedDisclaimer(true);
    setIsDisclaimerOpen(false);
    gamelanAudio.playChime("bonang");
  };

  const handleOpenDisclaimer = () => {
    setIsDisclaimerOpen(true);
    gamelanAudio.playChime("ting");
  };

  // Consultation pre-fill states
  const [consultIntention, setConsultIntention] = useState<string>("");
  const [consultTargetDate, setConsultTargetDate] = useState<string>("");
  const [consultUserWeton, setConsultUserWeton] = useState<string>("");

  // Forecast for today (fixed) and selectedDate (dynamic)
  const todayForecast = useMemo(() => calculateDayForecast(new Date()), []);
  const currentForecast = useMemo(
    () => calculateDayForecast(selectedDate),
    [selectedDate]
  );

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setActiveTab("kompas");
  };

  const handleOpenConsultationWithDate = (dateInfo: string) => {
    setConsultTargetDate(dateInfo);
    setConsultIntention("");
    setActiveTab("konsultasi");
  };

  const handleOpenConsultationWithIntention = (
    intention: string,
    dateInfo: string
  ) => {
    setConsultIntention(intention);
    setConsultTargetDate(dateInfo);
    setActiveTab("konsultasi");
  };

  const handleOpenConsultationWithWeton = (wetonStr: string) => {
    setConsultUserWeton(wetonStr);
    setConsultIntention("Mendalami arah perjalanan hidup dan potensi diri");
    setActiveTab("konsultasi");
  };

  const handleOpenJournalWithDate = () => {
    setActiveTab("jurnal");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2c1f13] flex flex-col selection:bg-[#ecdcca] selection:text-[#2d2013]">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        todayForecast={todayForecast}
        onSelectDate={handleSelectDate}
        onOpenDisclaimer={handleOpenDisclaimer}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "kompas" && (
          <DayCompass
            currentForecast={currentForecast}
            onSelectDate={setSelectedDate}
            onOpenJournalWithDate={handleOpenJournalWithDate}
          />
        )}

        {activeTab === "forecaster" && (
          <EventForecaster
            onSelectDate={handleSelectDate}
          />
        )}

        {activeTab === "siklus210" && (
          <PawukonCycleMap currentForecast={currentForecast} />
        )}

        {activeTab === "proyeksi2026" && (
          <Year2026Forecast
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onOpenJournalWithDate={(date) => {
              setSelectedDate(date);
              setActiveTab("jurnal");
            }}
            onOpenDisclaimer={handleOpenDisclaimer}
          />
        )}

        {activeTab === "weton" && (
          <PersonalWetonCalculator
            onSelectDate={handleSelectDate}
          />
        )}

        {activeTab === "konsultasi" && (
          <AiConsultation
            initialIntention={consultIntention}
            initialTargetDate={consultTargetDate}
            initialUserWeton={consultUserWeton}
          />
        )}

        {activeTab === "jurnal" && (
          <TimeJournal currentForecast={currentForecast} />
        )}
      </main>

      {/* Cultural Footer */}
      <footer className="mt-auto border-t border-[#e5d9ca] bg-[#f4ebe0]/60 py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#756453]">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 border border-[#dfd2be] flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                <img
                  src="/logo-mf.png"
                  alt="Logo Mario Fahmi"
                  className="w-full h-full object-contain"
                />
              </div>
              <span>
                Diselaraskan berdasarkan prinsip karya Mario Fahmi Syahrial:{" "}
                <strong className="text-[#3b2b1c]">
                  "Kalender Jawa: Perhitungan Waktu, Watak, dan Irama Kehidupan"
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-4 text-[#8a7967]">
              <span>Peta Iklim Spiritual</span>
              <span>•</span>
              <span>Bukan Klenik atau Fatalisme</span>
              <span>•</span>
              <span>Kompas Kesadaran Batin</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Root Disclaimer Gatekeeper Modal (Opens automatically on app launch) */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        hasAgreed={hasAgreedDisclaimer}
        onAgree={handleAgreeDisclaimer}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
}

export default App;
