import React from "react";
import { ShieldAlert, X, CheckCircle2 } from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  hasAgreed: boolean;
  onAgree: () => void;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  hasAgreed,
  onAgree,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => {
        // Only allow closing on backdrop click if user has already agreed
        if (hasAgreed && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#faf7f2] border border-[#d9c9b5] rounded-3xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="shrink-0 px-5 py-3 sm:py-3.5 bg-white border-b border-[#ede1d1] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 border border-[#d9c9b5] flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
              <img
                src="/logo-mf.png"
                alt="Logo Mario Fahmi"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base sm:text-lg font-bold text-[#2d1e12]">
                  Pernyataan Etis & Disclaimer Budaya
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[9px] font-bold uppercase tracking-wider">
                  Resmi
                </span>
              </div>
              <p className="text-[11px] text-[#7e6955]">
                Prinsip Pembacaan Kalender Jawa Karya <strong>Mario Fahmi Syahrial</strong>
              </p>
            </div>
          </div>
          {hasAgreed && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body: 2-Column Grid for Zero-Scroll Reading */}
        <div className="p-3.5 sm:p-4 md:p-5 space-y-2.5 text-xs text-[#523f2f] leading-relaxed overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
            {/* Prinsip 1 */}
            <div className="p-3 bg-white rounded-xl border border-[#ede1d1] shadow-2xs space-y-1">
              <div className="font-bold text-xs sm:text-[13px] text-[#352517] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">1</span>
                <span>Bukan Ramalan atau Determinisme</span>
              </div>
              <p className="text-[#614f3e] text-[11px] sm:text-xs leading-relaxed pl-7">
                Sistem penanggalan ini berfungsi sebagai media edukasi, apresiasi budaya, dan refleksi filosofis tradisi Jawa—<strong>bukan alat meramal masa depan</strong>, menjamin keberuntungan, atau menentukan nasib mutlak.
              </p>
            </div>

            {/* Prinsip 2 */}
            <div className="p-3 bg-white rounded-xl border border-[#ede1d1] shadow-2xs space-y-1">
              <div className="font-bold text-xs sm:text-[13px] text-[#352517] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">2</span>
                <span>Kedaulatan & Kehendak Bebas (Free Will)</span>
              </div>
              <p className="text-[#614f3e] text-[11px] sm:text-xs leading-relaxed pl-7">
                Setiap keputusan dan ikhtiar berada di bawah kehendak bebas serta tanggung jawab pribadi di hadapan Tuhan YME. Kalender Jawa diposisikan sebagai <strong>"peta iklim kesadaran batin"</strong>, bukan instruksi tindakan kaku.
              </p>
            </div>

            {/* Prinsip 3 */}
            <div className="p-3 bg-white rounded-xl border border-[#ede1d1] shadow-2xs space-y-1">
              <div className="font-bold text-xs sm:text-[13px] text-[#352517] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">3</span>
                <span>Perspektif Simbolik & Reflektif</span>
              </div>
              <p className="text-[#614f3e] text-[11px] sm:text-xs leading-relaxed pl-7">
                Simbol waktu (Wuku, Pasaran, Sadworo, Triworo, Dasaworo, Sasi) memetakan kecenderungan psikososial. Hari waspada melatih kehati-hatian, sedangkan hari longgar membuka gerak (<strong>bukan label baik/buruk mutlak</strong>).
              </p>
            </div>

            {/* Prinsip 4 */}
            <div className="p-3 bg-white rounded-xl border border-[#ede1d1] shadow-2xs space-y-1">
              <div className="font-bold text-xs sm:text-[13px] text-[#352517] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0">4</span>
                <span>Bukan Pengganti Saran Profesional</span>
              </div>
              <p className="text-[#614f3e] text-[11px] sm:text-xs leading-relaxed pl-7">
                Analisis dan narasi dalam aplikasi ini tidak dimaksudkan untuk menggantikan nasihat profesional berlisensi di bidang medis, hukum, perbankan/keuangan, maupun psikologi klinis.
              </p>
            </div>
          </div>

          {/* Prinsip 5 + Kutipan Rujukan Mario Fahmi Syahrial (Horizontal Compact Strip) */}
          <div className="p-2.5 sm:p-3 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 border border-amber-200/90 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-[11px] text-[#5a4632]">
            <div className="flex items-start sm:items-center gap-2 flex-1">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-950 text-[10px] flex items-center justify-center font-bold shrink-0">5</span>
              <div>
                <strong>Penghormatan Tradisi & Rasionalitas:</strong> Disusun takzim terhadap kearifan lokal Nusantara, disajikan rasional dan elegan tanpa reduksi menjadi mitos tak berdasar.
              </div>
            </div>
            <div className="md:border-l-2 md:border-amber-400 md:pl-2.5 italic text-[#70522c] text-[10.5px] leading-snug md:max-w-xs shrink-0">
              "Fokus pembacaan adalah memperhalus kesadaran dan kualitas sikap merespons ritme waktu." (Bab 6)
            </div>
          </div>
        </div>

        {/* Sticky Footer - Always in View */}
        <div className="shrink-0 px-5 py-3 sm:py-3.5 bg-white border-t border-[#ede1d1] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-[11px] text-[#85705e] text-center sm:text-left">
            {!hasAgreed
              ? "⚠️ Konfirmasi wajib sebelum mengeksplorasi kalender."
              : "Anda telah mengonfirmasi pemahaman etika penanggalan."}
          </p>
          <button
            onClick={onAgree}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#2d1e12] text-[#f7e7a9] hover:bg-[#1a0f07] hover:text-white flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Memahami dan Menyetujui</span>
          </button>
        </div>
      </div>
    </div>
  );
};
