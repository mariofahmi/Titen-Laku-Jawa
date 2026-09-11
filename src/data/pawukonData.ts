import {
  WukuInfo,
  PasaranName,
  SadworoName,
  CaturworoName,
  TriworoName,
  DasaworoName,
  SasiName,
  IntentionConfig,
} from "../types";

export const WUKU_LIST: WukuInfo[] = [
  // Fase 1: Penanaman Niat dan Fondasi (Wuku 1-5)
  {
    number: 1,
    name: "Sinta",
    subtitle: "Awal Segalanya & Penanaman Niat",
    faseNumber: 1,
    faseTitle: "Penanaman Niat dan Fondasi",
    character:
      "Halaman kosong di buku kehidupan. Melambangkan awal mula dan niat murni sebelum tercoreng tindakan. Energinya lembut dan terbuka bagai benih yang baru ditebar ke tanah subur.",
    recommendations: [
      "Merumuskan tujuan hidup",
      "Membuat rencana detail proyek baru",
      "Menenangkan pikiran untuk menanam niat",
      "Memulai pembelajaran baru",
    ],
    cautions: [
      "Jangan mengharapkan hasil instan (ini waktu menanam, bukan memanen)",
      "Hindari ketergesa-gesaan mengeksekusi sebelum rencana matang",
    ],
    elementSummary: "Benih Murni & Permulaan",
  },
  {
    number: 2,
    name: "Landep",
    subtitle: "Ketajaman Pikiran & Strategi Intelektual",
    faseNumber: 1,
    faseTitle: "Penanaman Niat dan Fondasi",
    character:
      "Berasal dari kata 'landhep' yang berarti tajam. Membawa energi ketajaman intelektual, kemampuan analitis luar biasa, dan kejernihan logika bagai pisau tajam pemotong kebingungan.",
    recommendations: [
      "Merancang strategi bisnis dan rencana aksi",
      "Menyusun atau mereview kontrak hukum",
      "Memecahkan problem analitis yang rumit",
      "Pengambilan keputusan berbasis data dan nalar",
    ],
    cautions: [
      "Pisau tajam bisa melukai jika dipakai dalam konflik emosional",
      "Gunakan kecerdasan untuk membangun, bukan memojokkan sesama",
    ],
    elementSummary: "Ketajaman Nalar & Analisis",
  },
  {
    number: 3,
    name: "Wukir",
    subtitle: "Kekuatan Fondasi yang Kokoh",
    faseNumber: 1,
    faseTitle: "Penanaman Niat dan Fondasi",
    character:
      "Melambangkan gunung atau bukit tinggi yang tegak kokoh. Energinya tentang kestabilan struktural, ketahanan daya tahan, dan fondasi yang tak tergoyahkan oleh badai.",
    recommendations: [
      "Membangun rumah atau meletakkan batu pertama",
      "Mendirikan struktur bisnis jangka panjang",
      "Memperkuat struktur tim atau organisasi",
      "Konsistensi kerja keras yang berkelanjutan",
    ],
    cautions: [
      "Waspada terhadap kekakuan berlebihan atau keras kepala",
      "Jangan menolak masukan konstruktif hanya demi tradisi lama",
    ],
    elementSummary: "Gunung Penyangga & Fondasi",
  },
  {
    number: 4,
    name: "Kurantil",
    subtitle: "Masa Kegelisahan & Dinamika Tersembunyi",
    faseNumber: 1,
    faseTitle: "Penanaman Niat dan Fondasi",
    character:
      "Masa peralihan di mana angin bertiup kencang namun arahnya belum menentu. Banyak dinamika dan riak kecil di bawah permukaan yang mudah memicu kesalahpahaman.",
    recommendations: [
      "Amati, dengarkan, dan tunggu kabut mereda",
      "Lakukan penyesuaian fleksibel tanpa komitmen mutlak",
      "Catat sinyal-sinyal perubahan kecil",
    ],
    cautions: [
      "Hindari mengambil keputusan besar atau permanen",
      "Waspada terhadap tindakan terburu-buru yang dipicu kecemasan",
      "Jaga komunikasi agar tidak timbul prasangka",
    ],
    elementSummary: "Angin Peralihan & Kewaspadaan",
  },
  {
    number: 5,
    name: "Tolu",
    subtitle: "Keseimbangan & Penataan Ulang Arah",
    faseNumber: 1,
    faseTitle: "Penanaman Niat dan Fondasi",
    character:
      "Arti harfiah 'tiga' yang melambangkan titik keseimbangan tripod. Saatnya menarik napas, mengevaluasi jalannya rencana setelah kegelisahan Kurantil, serta menyeimbangkan kembali roda kehidupan.",
    recommendations: [
      "Menyeimbangkan buku keuangan dan anggaran",
      "Mengevaluasi kembali target pencapaian",
      "Meredakan ketegangan dalam hubungan interpersonal",
      "Melakukan penyesuaian taktis yang bijaksana",
    ],
    cautions: [
      "Bukan saatnya aksi spektakuler atau ekspansi agresif",
      "Fokus pada konsolidasi internal, bukan pameran keluar",
    ],
    elementSummary: "Tri-Keseimbangan & Konsolidasi",
  },

  // Fase 2: Interaksi Sosial dan Pengaruh (Wuku 6-10)
  {
    number: 6,
    name: "Gumbreg",
    subtitle: "Aktivitas Tinggi & Pasar Sosial yang Ramai",
    faseNumber: 2,
    faseTitle: "Interaksi Sosial dan Pengaruh",
    character:
      "Ibarat pasar yang ramai berdenyut. Energi sosial melimpah, interaksi bergelora, komunikasi terbuka, namun di tengah keramaian gesekan ego sangat rawan terjadi.",
    recommendations: [
      "Kampanye sosial, pemasaran, dan promosi",
      "Menghadiri pameran, konferensi, atau gathering besar",
      "Membuka relasi publik baru dan berinteraksi luas",
    ],
    cautions: [
      "Ego yang dominan bisa menyulut pertengkaran di tengah keramaian",
      "Pertahankan kerendahan hati dan fokus pada tujuan bersama",
    ],
    elementSummary: "Pasar Dinamis & Gesekan Ego",
  },
  {
    number: 7,
    name: "Warigalit",
    subtitle: "Ketelitian Ekstrim & Presisi Jam Tangan",
    faseNumber: 2,
    faseTitle: "Interaksi Sosial dan Pengaruh",
    character:
      "Energi seorang perajin jam atau ahli bedah. Presisi mikro adalah kunci utama; kesalahan sekecil apa pun dapat berdampak sistemik yang signifikan.",
    recommendations: [
      "Audit keuangan, pengecekan klausul kontrak",
      "Pekerjaan teknis, desain presisi, dan coding kritis",
      "Verifikasi ulang data dan perhitungan",
    ],
    cautions: [
      "Hindari bekerja tergesa-gesa atau terburu batas waktu",
      "Jangan menyepakati sesuatu tanpa membaca rincian paling kecil",
    ],
    elementSummary: "Presisi Bedah & Kehati-hatian Mikro",
  },
  {
    number: 8,
    name: "Warigagung",
    subtitle: "Masa Kebesaran & Pengaruh Publik",
    faseNumber: 2,
    faseTitle: "Interaksi Sosial dan Pengaruh",
    character:
      "Berarti 'agung' atau luas. Energi kepemimpinan memancar kuat; gagasan dan kehadiran seseorang lebih mudah diterima dan dihormati oleh khalayak ramai.",
    recommendations: [
      "Urusan publik, kepemimpinan tim, dan presentasi besar",
      "Mengambil peran strategis di komunitas",
      "Meluncurkan inisiatif berskala besar",
    ],
    cautions: [
      "Gunakan pengaruh demi kemaslahatan bersama, bukan arogansi",
      "Waspada agar tidak menjadi narsistik atau mabuk pujian",
    ],
    elementSummary: "Wibawa Publik & Kepemimpinan",
  },
  {
    number: 9,
    name: "Julungwangi",
    subtitle: "Reputasi di Atas Panggung Terang",
    faseNumber: 2,
    faseTitle: "Interaksi Sosial dan Pengaruh",
    character:
      "Identik dengan aroma wangi dan nama baik. Seperti berdiri di panggung megah di bawah sorotan lampu terang; setiap kata dan tindakan dinilai khalayak secara telanjang.",
    recommendations: [
      "Membangun citra positif dan personal branding berbasis integritas",
      "Peluncuran karya seni, publikasi, atau penampilan panggung",
      "Melakukan tindakan kebajikan yang menginspirasi banyak orang",
    ],
    cautions: [
      "Jangan menyembunyikan niat buruk, kepalsuan akan mudah tersingkap",
      "Jaga kejujuran mutlak karena sorotan sedang sangat tajam",
    ],
    elementSummary: "Aroma Wangi & Panggung Citra",
  },
  {
    number: 10,
    name: "Sungsang",
    subtitle: "Ketidakteraturan & Arus yang Terbalik",
    faseNumber: 2,
    faseTitle: "Interaksi Sosial dan Pengaruh",
    character:
      "Secara harfiah berarti 'terbalik'. Arus seolah mengalir ke hulu. Rencana yang telah disusun rapi bisa berjalan di luar perkiraan atau terbalik 180 derajat.",
    recommendations: [
      "Persiapkan Rencana Cadangan (Plan B)",
      "Bersikap fleksibel dan terbuka pada perubahan mendadak",
      "Fokus pada pekerjaan rutin yang tidak berdampak fatal",
    ],
    cautions: [
      "Tunda peluncuran produk atau pengesahan kontrak krusial",
      "Jangan memaksakan kehendak melawan arus yang terbalik",
    ],
    elementSummary: "Pembalikan Arah & Kesabaran Fleksibel",
  },

  // Fase 3: Kemenangan, Ujian, dan Transisi (Wuku 11-15)
  {
    number: 11,
    name: "Galungan",
    subtitle: "Kemenangan Nilai Kebenaran (Dharma)",
    faseNumber: 3,
    faseTitle: "Kemenangan, Ujian, dan Transisi",
    character:
      "Melambangkan kemenangan dharma (kebenaran batin) atas adharma (godaan hawa nafsu). Waktu sarat energi spiritual dan peneguhan integritas moral.",
    recommendations: [
      "Mempertegas prinsip dan nilai etika kerja",
      "Menyelesaikan perkara dengan menjunjung kejujuran",
      "Pembersihan diri dari kebiasaan buruk dan aura negatif",
      "Refleksi spiritual dan doa mendalam",
    ],
    cautions: [
      "Hindari kompromi busuk demi keuntungan materi sesaat",
      "Jangan merasa paling suci sendiri dibandingkan orang lain",
    ],
    elementSummary: "Kemenangan Dharma & Peneguhan Moral",
  },
  {
    number: 12,
    name: "Kuningan",
    subtitle: "Pemulihan, Rekonsiliasi, & Kedamaian Sejati",
    faseNumber: 3,
    faseTitle: "Kemenangan, Ujian, dan Transisi",
    character:
      "Kelanjutan pasca kemenangan Galungan. Mengajarkan bahwa kemenangan sejati bukan penaklukan brutal, melainkan tercapainya kedamaian, keseimbangan, dan pemulihan batin.",
    recommendations: [
      "Rekonsiliasi dan memaafkan masa lalu",
      "Berdamai dengan diri sendiri dan mitra kerja",
      "Menikmati hasil perjuangan dalam ketenangan batin",
      "Penyembuhan luka batin atau relasi",
    ],
    cautions: [
      "Jangan terburu-buru membuka medan pertempuran baru",
      "Berikan ruang istirahat yang layak bagi tubuh dan jiwa",
    ],
    elementSummary: "Kedamaian Batin & Rekonsiliasi",
  },
  {
    number: 13,
    name: "Langkir",
    subtitle: "Puncak Ambisi & Dorongan Bertumbuh",
    faseNumber: 3,
    faseTitle: "Kemenangan, Ujian, dan Transisi",
    character:
      "Energi ambisi yang membara tinggi untuk berprestasi, mendaki puncak, dan memperluas kapasitas diri. Ibarat api besar yang siap mematangkan logam.",
    recommendations: [
      "Mengeksekusi proyek besar yang membutuhkan dorongan ekstra",
      "Akselerasi target karir dan ekspansi usaha",
      "Menghadapi tantangan kompetisi sehat",
    ],
    cautions: [
      "Ambisi tanpa kendali etika adalah api yang menghanguskan diri sendiri",
      "Imbangi ambisi dengan pertimbangan kebijaksanaan dan kesehatan",
    ],
    elementSummary: "Api Ambisi & Lonjakan Prestasi",
  },
  {
    number: 14,
    name: "Mandasiya",
    subtitle: "Waktu Ujian, Hambatan, & Penguatan Daya Tahan",
    faseNumber: 3,
    faseTitle: "Kemenangan, Ujian, dan Transisi",
    character:
      "Masa ujian yang sengaja dihadirkan oleh semesta untuk menguji keteguhan, kesabaran, dan konsistensi batin. Rintangan datang bukan untuk menghentikan, melainkan menempa.",
    recommendations: [
      "Tunjukkan daya tahan mental dan resiliensi",
      "Perbaiki sistem internal yang rapuh",
      "Bertahan dengan kesabaran aktif",
    ],
    cautions: [
      "Jangan berputus asa atau menyerah di tengah jalan",
      "Hindari mengeluh di ruang publik; lewati ujian ini dengan kepala tegak",
    ],
    elementSummary: "Batu Tempaan & Ketahanan Batin",
  },
  {
    number: 15,
    name: "Julungpujut",
    subtitle: "Peralihan yang Rapuh (Jembatan Tali)",
    faseNumber: 3,
    faseTitle: "Kemenangan, Ujian, dan Transisi",
    character:
      "Ibarat jembatan tali di antara dua tebing curam. Sangat berguna untuk menyeberang menuju fase baru, namun strukturnya rapuh dan bukan tempat berpijak selamanya.",
    recommendations: [
      "Proyek transisi, pilot project, atau uji coba awal",
      "Perubahan sementara seraya memantau kondisi",
      "Langkah-langkah taktis jangka pendek",
    ],
    cautions: [
      "Hindari membangun investasi jangka panjang di atas fondasi ini",
      "Jangan membuat komitmen seumur hidup yang tak bisa dibatalkan",
    ],
    elementSummary: "Jembatan Gantung & Transisi Sementara",
  },

  // Fase 4: Disiplin dan Gerak Sosial (Wuku 16-20)
  {
    number: 16,
    name: "Pahang",
    subtitle: "Disiplin Prajurit & Konsistensi Teratur",
    faseNumber: 4,
    faseTitle: "Disiplin dan Gerak Sosial",
    character:
      "Waktu seorang ksatria berlatih di sasana. Hasil gemilang tidak lahir dari spekulasi instan, melainkan dari kedisiplinan harian, kerja teratur, dan ketekunan pantang kendur.",
    recommendations: [
      "Menjalankan rutinitas operasional yang ketat",
      "Membangun kebiasaan positif baru",
      "Menuntaskan pekerjaan yang butuh dedikasi tinggi",
    ],
    cautions: [
      "Hindari perilaku spekulatif atau jalan pintas tak jelas",
      "Jangan menyepelekan detail proses yang monoton",
    ],
    elementSummary: "Disiplin Baja & Keteguhan Latihan",
  },
  {
    number: 17,
    name: "Kuruwelut",
    subtitle: "Mengurai Benang Kusut & Urusan Berlapis",
    faseNumber: 4,
    faseTitle: "Disiplin dan Gerak Sosial",
    character:
      "Identik dengan dinamika yang berliku-liku dan keterikatan masa lalu bagai benang kusut. Masalah lama seringkali muncul kembali ke permukaan menuntut penyelesaian.",
    recommendations: [
      "Menyelesaikan utang piutang atau sengketa tertunda",
      "Memutus relasi yang toksik dan mengikat energi",
      "Membersihkan arsip lama dan merapikan tumpukan urusan",
    ],
    cautions: [
      "Hindari membuat keterikatan atau hutang baru",
      "Jangan terjerumus dalam lingkaran dramatisasi emosional",
    ],
    elementSummary: "Penguraian Benang Kusut & Pelepasan",
  },
  {
    number: 18,
    name: "Marakeh",
    subtitle: "Keterbukaan & Perluasan Jaringan",
    faseNumber: 4,
    faseTitle: "Disiplin dan Gerak Sosial",
    character:
      "Membuka pintu dan jendela selebar-lebarnya. Energi sosial magnetis, sangat mendukung lahirnya kolaborasi baru, memperluas lingkaran perkawanan, dan inisiatif komunal.",
    recommendations: [
      "Menjalin kemitraan usaha (joint venture) baru",
      "Memulai inisiatif kemanusiaan atau sosial",
      "Networking aktif dan silaturahmi",
    ],
    cautions: [
      "Tetap selektif; jangan asal mempercayakan rahasia dapur pada orang asing",
    ],
    elementSummary: "Jendela Terbuka & Jejaring Hangat",
  },
  {
    number: 19,
    name: "Tambir",
    subtitle: "Kematangan Sosial, Musyawarah, & Mediasi",
    faseNumber: 4,
    faseTitle: "Disiplin dan Gerak Sosial",
    character:
      "Jika Marakeh membuka pintu, Tambir mematangkan percakapan di dalam ruangan. Energinya sarat kebijaksanaan bermusyawarah, kehangatan keluarga, dan mufakat damai.",
    recommendations: [
      "Pernikahan dan pertemuan keluarga besar",
      "Mediasi konflik dan negosiasi win-win",
      "Rembug warga atau musyawarah penentu konsensus",
    ],
    cautions: [
      "Hindari memaksakan kehendak sepihak; dengarkan semua suara",
    ],
    elementSummary: "Rembug Mufakat & Kematangan Hubungan",
  },
  {
    number: 20,
    name: "Medangkungan",
    subtitle: "Kesabaran Petani & Pengendalian Diri",
    faseNumber: 4,
    faseTitle: "Disiplin dan Gerak Sosial",
    character:
      "Belajar dari seorang petani yang sabar menanti padi menguning. Alam semesta sedang memproses benih; tindakan impulsif atau nafsu memetik dini justru berisiko merusak hasil.",
    recommendations: [
      "Latihan kesabaran emosi dan mindful breathing",
      "Memantau proses dengan tenang tanpa intervensi reaktif",
      "Menjaga ucapan dalam situasi genting",
    ],
    cautions: [
      "Tindakan impulsif berisiko tinggi memicu penyesalan besar",
      "Jangan mengambil keputusan saat sedang marah atau gelisah",
    ],
    elementSummary: "Kesabaran Padi & Penguasaan Diri",
  },

  // Fase 5: Refleksi, Konflik, dan Kebijaksanaan (Wuku 21-25)
  {
    number: 21,
    name: "Maktal",
    subtitle: "Refleksi Mendalam & Masuk ke Gua Batin",
    faseNumber: 5,
    faseTitle: "Refleksi, Konflik, dan Kebijaksanaan",
    character:
      "Waktu untuk mundur sejenak dari kebisingan dunia luar dan masuk ke dalam heningnya gua batin. Menilai kembali makna eksistensi, arah cita-cita, dan kejujuran diri.",
    recommendations: [
      "Menyendiri, retret, atau kontemplasi sunyi",
      "Menyusun strategi tersembunyi untuk masa depan",
      "Evaluasi jujur atas kelemahan dan kekuatan pribadi",
    ],
    cautions: [
      "Hindari pamer atau mencari panggung publisitas",
      "Waspada rasa kesepian menjadi keputusasaan batin",
    ],
    elementSummary: "Gua Hening & Strategi Tersembunyi",
  },
  {
    number: 22,
    name: "Wuye",
    subtitle: "Kabut Kebijaksanaan & Hening Observasi",
    faseNumber: 5,
    faseTitle: "Refleksi, Konflik, dan Kebijaksanaan",
    character:
      "Ibarat berjalan di hutan berkabut tebal. Pandangan serba terbatas, jalan buntu tampak samar, dan kepastian belum tampak. Tindakan terbaik adalah duduk di tepi sungai dan mengamati arusnya.",
    recommendations: [
      "Observasi pasif dan mengumpulkan fakta tambahan",
      "Menunda eksekusi keputusan penting sampai kabut tersingkap",
      "Melatih intuisi dan kepekaan batiniah",
    ],
    cautions: [
      "Sangat berisiko meluncurkan hal besar dalam ketidakjelasan",
      "Jangan menandatangani kesepakatan yang klausulnya abu-abu",
    ],
    elementSummary: "Kabut Misteri & Mata Pengamat",
  },
  {
    number: 23,
    name: "Manahil",
    subtitle: "Kecerdikan Taktis & Kilatan Penembus Kabut",
    faseNumber: 5,
    faseTitle: "Refleksi, Konflik, dan Kebijaksanaan",
    character:
      "Berasal dari kata pemisah/pemecah. Bagai kilatan petir yang menembus kabut pekat; energi kecerdikan, solusi out-of-the-box, dan kejelian melihat celah kompetitif.",
    recommendations: [
      "Perencanaan taktis dan analisis kompetitif",
      "Mencari solusi alternatif untuk problem jalan buntu",
      "Manuver cerdas yang membutuhkan fleksibilitas pikiran",
    ],
    cautions: [
      "Jangan gunakan kecerdikan untuk menipu atau mencelakai orang",
      "Jaga agar strategi tetap berlandaskan etika luhur",
    ],
    elementSummary: "Kilat Pemecah Solusi & Taktik Cerdas",
  },
  {
    number: 24,
    name: "Prangbakat",
    subtitle: "Puncak Ketegangan & Penyelesaian Konflik",
    faseNumber: 5,
    faseTitle: "Refleksi, Konflik, dan Kebijaksanaan",
    character:
      "Titik kulminasi di mana ketegangan yang terpendam terbuka ke permukaan. Semua kartu terbuka di atas meja; baik untuk menuntaskan konflik yang telah menahun secara jujur.",
    recommendations: [
      "Menghadapi dan menyelesaikan perselisihan yang sudah memanas",
      "Mengambil sikap tegas untuk menghentikan kezaliman",
      "Transparansi total atas masalah yang selama ini disembunyikan",
    ],
    cautions: [
      "Waktu yang sangat BURUK untuk memulai hubungan cinta, kemitraan baru, atau pesta damai",
      "Kendalikan amarah agar tidak merusak segalanya",
    ],
    elementSummary: "Bara Ujian & Transparansi Konflik",
  },
  {
    number: 25,
    name: "Bala",
    subtitle: "Kerawanan Tertinggi & Kewaspadaan Menyeluruh",
    faseNumber: 5,
    faseTitle: "Refleksi, Konflik, dan Kebijaksanaan",
    character:
      "Berarti 'bencana' atau 'pasukan perang'. Wuku yang paling menuntut kewaspadaan tingkat tinggi dalam 210 hari Pawukon. Energi rentan friksi, kehilangan, atau kecelakaan.",
    recommendations: [
      "Prioritaskan keselamatan, kesehatan, dan perlindungan diri",
      "Tingkatkan doa, sedekah, dan laku prihatin",
      "Tetap berada di lingkaran yang aman dan teruji",
    ],
    cautions: [
      "Hindari perjalanan jauh tak penting atau olahraga ekstrim",
      "Jangan melakukan spekulasi investasi berisiko tinggi",
      "Hindari segala bentuk provokasi atau konfrontasi terbuka",
    ],
    elementSummary: "Perisai Perlindungan & Waspada Ekstra",
  },

  // Fase 6: Penutupan dan Persiapan Siklus Baru (Wuku 26-30)
  {
    number: 26,
    name: "Wugu",
    subtitle: "Kebijaksanaan Sosial & Keseimbangan Bersahaja",
    faseNumber: 6,
    faseTitle: "Penutupan dan Persiapan Siklus Baru",
    character:
      "Setelah badai Bala mereda, Wugu membawa ketenangan, hidup bersahaja, dan pemulihan harmoni sosial. Mengikis keserakahan dan mengembalikan proporsi yang sehat.",
    recommendations: [
      "Musyawarah mufakat demi ketenteraman kolektif",
      "Mengurangi gaya hidup konsumtif atau ambisi serakah",
      "Menenangkan situasi tegang di keluarga atau tempat kerja",
    ],
    cautions: [
      "Hindari sifat tamak atau haus pengakuan berlebihan",
    ],
    elementSummary: "Kesederhanaan & Penyeimbang Badai",
  },
  {
    number: 27,
    name: "Wayang",
    subtitle: "Dunia Perlambang, Seni, & Makna Terselubung",
    faseNumber: 6,
    faseTitle: "Penutupan dan Persiapan Siklus Baru",
    character:
      "Ibarat panggung kelir wayang kulit; hal-hal yang tampak di permukaan bukanlah hakikat sesungguhnya, melainkan bayangan simbolik. Sarat energi estetika, seni, dan filosofi peran hidup.",
    recommendations: [
      "Aktivitas seni budaya, sastra, dan kreasi visual",
      "Merenungkan lakon peran hidup masing-masing",
      "Membaca makna di balik peristiwa yang terjadi",
    ],
    cautions: [
      "Waspadai kepalsuan, janji manis gombal, dan orang yang bertopeng",
      "Jangan mudah terperdaya oleh bungkus luar semata",
    ],
    elementSummary: "Kelir Simbolik & Kedalaman Seni",
  },
  {
    number: 28,
    name: "Kulawu",
    subtitle: "Penurunan Ritme, Istirahat, & Perawatan Diri",
    faseNumber: 6,
    faseTitle: "Penutupan dan Persiapan Siklus Baru",
    character:
      "Berarti warna kelabu atau temaram. Bukan kesedihan, melainkan saat senja di mana burung-burung kembali ke sarang. Menurunkan tempo kerja, merawat kesehatan, dan membersihkan rumah.",
    recommendations: [
      "Membersihkan dan merapikan rumah serta ruang kerja",
      "Istirahat fisik, pemulihan stamina, dan libur kerja sejenak",
      "Merawat tubuh, tidur cukup, dan melepaskan kelelahan",
    ],
    cautions: [
      "Jangan memaksakan kerja lembur berat di waktu ini",
      "Hindari kegiatan yang menuntut pengerahan energi fisik masif",
    ],
    elementSummary: "Senja Pemulihan & Merapikan Sarang",
  },
  {
    number: 29,
    name: "Dukut",
    subtitle: "Kesuburan Rerumputan, Panen, & Hasil Nyata",
    faseNumber: 6,
    faseTitle: "Penutupan dan Persiapan Siklus Baru",
    character:
      "Melambangkan rumput subur yang menghijaui ladang. Inilah masa panen raya atas kerja keras yang ditabur sejak awal siklus, baik dalam bentuk rezeki materi maupun kematangan batin.",
    recommendations: [
      "Menyelesaikan dan meresmikan proyek yang sudah tuntas",
      "Menerima hasil, bagi hasil, dan merayakan pencapaian",
      "Evaluasi akhir terhadap hasil kerja siklus ini",
      "Pernikahan yang menginginkan kesuburan dan rezeki melimpah",
    ],
    cautions: [
      "Jangan lupa bersedekah dan berbagi rezeki hasil panen",
      "Hindari kikir atau merasa hasil panen murni karena kehebatan diri sendiri",
    ],
    elementSummary: "Panen Raya & Buah Manis Jerih Payah",
  },
  {
    number: 30,
    name: "Watugunung",
    subtitle: "Akhir Segalanya, Purna Tugas, & Penutupan Total",
    faseNumber: 6,
    faseTitle: "Penutupan dan Persiapan Siklus Baru",
    character:
      "Penutup paripurna dari 210 hari siklus Pawukon. 'Gunung Batu' melambangkan batas akhir yang final, kokoh, dan tuntas. Menutup pintu lama dengan rasa syukur agar pintu baru Sinta dapat terbuka luas.",
    recommendations: [
      "Penutupan total buku, pembubaran kepanitiaan yang purna",
      "Refleksi komprehensif atas perjalanan 210 hari ke belakang",
      "Memaafkan semua khilaf dan mengikhlaskan hal yang telah lewat",
      "Menyiapkan diri menyambut lembaran baru Wuku Sinta",
    ],
    cautions: [
      "Jangan memulai proyek baru jangka panjang di wuku ini",
      "Tuntaskan urusan yang menggantung sebelum melangkah ke siklus berikutnya",
    ],
    elementSummary: "Puncak Gunung Batu & Penutupan Paripurna",
  },
];

export const PASARAN_DATA: Record<
  PasaranName,
  {
    name: PasaranName;
    neptu: number;
    title: string;
    description: string;
    suitability: string[];
  }
> = {
  Legi: {
    name: "Legi",
    neptu: 5,
    title: "Harmoni & Daya Tarik",
    description:
      "Napas yang dalam dan tenang. Energinya magnetis, menarik kebaikan, persatuan, dan kelembutan rasa. Menumbuhkan daya pikat dan suasana rukun.",
    suitability: [
      "Pernikahan & temu jodoh",
      "Silaturahmi keluarga & rekonsiliasi damai",
      "Aktivitas perhotelan, kuliner, & hospitality",
    ],
  },
  Pahing: {
    name: "Pahing",
    neptu: 9,
    title: "Energi Kuat & Dorongan Dinamis",
    description:
      "Dinamis, penuh nyala tekad, dan dorongan kuat. Sangat tepat untuk mendobrak rintangan, memulai aksi berskala besar, namun perlu kendali agar tak tergesa-gesa.",
    suitability: [
      "Peluncuran produk & pembukaan cabang baru",
      "Pekerjaan berat yang membutuhkan stamina ekstra",
      "Kompetisi dan kampanye agresif",
    ],
  },
  Pon: {
    name: "Pon",
    neptu: 7,
    title: "Stabilitas & Tanggung Jawab",
    description:
      "Pondasi yang seimbang, kokoh, dan dapat diandalkan. Mengalirkan energi ketelitian dalam mengelola amanah, harta, serta ketepatan janji.",
    suitability: [
      "Penandatanganan kontrak & akta notaris",
      "Pengelolaan keuangan, tabungan, & investasi terencana",
      "Pekerjaan rutin yang menuntut konsistensi tinggi",
    ],
  },
  Wage: {
    name: "Wage",
    neptu: 4,
    title: "Sunyi & Kehati-hatian Introspektif",
    description:
      "Keheningan fajar yang jernih. Bukan kesepian, melainkan hening yang dibutuhkan untuk mendengar bisikan nurani. Menghindarkan diri dari jerat ketergesa-gesaan.",
    suitability: [
      "Refleksi batin, menyepi, & meditasi",
      "Menelaah ulang rencana yang belum matang",
      "Pekerjaan yang membutuhkan ketenangan dan konsentrasi soliter",
    ],
  },
  Kliwon: {
    name: "Kliwon",
    neptu: 8,
    title: "Sakral & Kedalaman Batiniah",
    description:
      "Paling spiritual dan sakral. Memiliki daya magnetik besar yang menghimpun orang banyak, memperdalam kesadaran transendental dan bobot perjumpaan penting.",
    suitability: [
      "Rapat akbar & pertemuan yang memerlukan keseriusan penuh",
      "Ritual penyucian batin, tirakatan, & doa bersama",
      "Pemberian mandat atau amanah luhur",
    ],
  },
};

export const SADWORO_DATA: Record<
  SadworoName,
  {
    name: SadworoName;
    meaning: string;
    prohibitionOrGuidance: string;
    ecologicalWisdom: string;
  }
> = {
  Tungle: {
    name: "Tungle",
    meaning: "Daun / Vegetasi",
    prohibitionOrGuidance: "Hindari merusak vegetasi / tebang pohon besar",
    ecologicalWisdom:
      "Hari Earth Day mini: Menghormati tanaman, waktu ideal untuk merawat pohon, bercocok tanam, dan merasakan simbiosis alam.",
  },
  Aryang: {
    name: "Aryang",
    meaning: "Manusia / Ego & Emosi",
    prohibitionOrGuidance: "Waspada konflik interpersonal & gesekan ego",
    ecologicalWisdom:
      "Peringatan cuaca batin: Energi sedang intens, kendalikan lidah dan emosi, hindari konfrontasi langsung.",
  },
  Warukung: {
    name: "Warukung",
    meaning: "Hewan / Fauna",
    prohibitionOrGuidance: "Hindari penyembelihan & menyakiti satwa",
    ecologicalWisdom:
      "Hari welas asih: Menghargai hak hidup makhluk bernyawa, memberi makan satwa, atau berpantang konsumsi berlebihan.",
  },
  Paningron: {
    name: "Paningron",
    meaning: "Ikan / Sumber Air & Ekosistem Perairan",
    prohibitionOrGuidance: "Hindari menangkap ikan secara eksploitatif",
    ecologicalWisdom:
      "Prinsip restorasi: Memberi ruang bagi perairan beristirahat dan memulihkan ekosistem kelimpahannya.",
  },
  Uwas: {
    name: "Uwas",
    meaning: "Burung / Udara & Ruang Angkasa",
    prohibitionOrGuidance: "Hindari berburu unggas & merusak sarang",
    ecologicalWisdom:
      "Mendengarkan nyanyian alam, menatap langit tinggi, melepaskan keterikatan kerdil duniawi menuju perspektif luas.",
  },
  Mawulu: {
    name: "Mawulu",
    meaning: "Benih / Potensi Rentan",
    prohibitionOrGuidance: "Hindari menanam atau mengolah benih langsung",
    ecologicalWisdom:
      "Penghormatan pada potensi: Benih masih sangat rapuh. Saatnya mempersiapkan tanah dan wadah, bukan memaksakan tanam dini.",
  },
};

export const CATURWORO_DATA: Record<
  CaturworoName,
  {
    name: CaturworoName;
    meaning: string;
    focus: string;
  }
> = {
  Sri: {
    name: "Sri",
    meaning: "Kemakmuran & Kesejahteraan",
    focus: "Mendukung kelimpahan berkah, permohonan rezeki, awal usaha baru (simbol Dewi Padi).",
  },
  Laba: {
    name: "Laba",
    meaning: "Relasi & Transaksi",
    focus: "Mendukung perdagangan, perundingan, negosiasi yang saling menguntungkan (mutual benefit).",
  },
  Jaya: {
    name: "Jaya",
    meaning: "Kemenangan & Kompetisi",
    focus: "Energi dorongan maju, debat, dan perjuangan cita-cita; gunakan bijak agar tidak memantik perselisihan.",
  },
  Menala: {
    name: "Menala",
    meaning: "Menyepi & Evaluasi Batin",
    focus: "Waktu mundur sejenak dari hiruk-pikuk sosial untuk merenung dan menata kompas dari dalam.",
  },
};

export const TRIWORO_DATA: Record<
  TriworoName,
  {
    name: TriworoName;
    element: string;
    energy: string;
  }
> = {
  Pasah: {
    name: "Pasah",
    element: "Besi",
    energy: "Kekuatan tegas, tekad baja, pemecahan final, peletakan batu pertama tindakan berani.",
  },
  Beteng: {
    name: "Beteng",
    element: "Batu",
    energy: "Perlindungan benteng, ketetapan hukum, membuat kesepakatan permanen dan batas hubungan yang aman.",
  },
  Kajeng: {
    name: "Kajeng",
    element: "Kayu",
    energy: "Pertumbuhan organik, fleksibilitas alami, kreativitas seni, pembangunan bertahap.",
  },
};

export const DASAWORO_DATA: Record<
  DasaworoName,
  {
    name: DasaworoName;
    meaning: string;
    archetype: string;
    warningLevel: "safe" | "caution" | "alert";
  }
> = {
  Pandhita: {
    name: "Pandhita",
    meaning: "Kebijaksanaan & Belajar",
    archetype: "Sang Guru Bijak",
    warningLevel: "safe",
  },
  Pati: {
    name: "Pati",
    meaning: "Risiko & Penutupan",
    archetype: "Batas Akhir / Titik Henti",
    warningLevel: "caution",
  },
  Suka: {
    name: "Suka",
    meaning: "Kegembiraan & Suka Cita",
    archetype: "Pesta & Sukacita",
    warningLevel: "safe",
  },
  Duka: {
    name: "Duka",
    meaning: "Kesedihan & Penyembuhan",
    archetype: "Gua Pemulihan Batin",
    warningLevel: "caution",
  },
  Sri: {
    name: "Sri",
    meaning: "Kemakmuran & Berkah",
    archetype: "Dewi Kelimpahan",
    warningLevel: "safe",
  },
  Manuh: {
    name: "Manuh",
    meaning: "Kepatuhan & Tata Tertib",
    archetype: "Kepatuhan pada Hukum",
    warningLevel: "safe",
  },
  Manusa: {
    name: "Manusa",
    meaning: "Relasi Sosial & Empati",
    archetype: "Sahabat Sejati",
    warningLevel: "safe",
  },
  Raja: {
    name: "Raja",
    meaning: "Kekuasaan & Kepemimpinan",
    archetype: "Sang Pemimpin",
    warningLevel: "safe",
  },
  Dewa: {
    name: "Dewa",
    meaning: "Perlindungan Ilahi & Berkah",
    archetype: "Pelindung Gaib Luhur",
    warningLevel: "safe",
  },
  Raksasa: {
    name: "Raksasa",
    meaning: "Konflik Kasar & Bahaya",
    archetype: "Energi Liar yang Mengancam",
    warningLevel: "alert",
  },
};

export const SASI_MEANINGS: Record<SasiName, string> = {
  Sura: "Waktu laku batin, tirakat penyucian diri, dan menghindari pesta hajatan besar duniawi.",
  Sapar: "Masa baik untuk bekerja keras, menuntut ilmu, dan menjalin hubungan sosial baru.",
  Mulud: "Bulan berkah, religiusitas, perbaikan akhlak, dan mengenang suri teladan luhur.",
  "Bakda Mulud": "Waktu yang sangat kondusif untuk aktivitas sosial, pembelajaran, dan kerja tim.",
  "Jumadil Awal": "Masa penguatan komitmen awal dan konsolidasi urusan rumah tangga maupun usaha.",
  "Jumadil Akhir": "Masa pemantapan, merapikan karya, dan menuntaskan fase perjalanan sebelum babak baru.",
  Rejeb: "Bulan kesadaran spiritual, kewaspadaan batin, dan mempererat doa kepada Sang Pencipta.",
  Ruwah: "Masa penyucian jiwa, mendoakan leluhur, membersihkan batin dari endapan dendam.",
  Pasa: "Masa laku prihatin, mengasah kepekaan empati, dan menahan hawa nafsu duniawi.",
  Sawal: "Masa kemenangan spiritual, pemulihan silaturahmi, dan memperkuat relasi kemanusiaan.",
  Sela: "Masa jeda (apit), menahan diri, serta tidak terburu-buru mengambil hajat raksasa.",
  Besar: "Bulan agung yang sangat baik untuk pernikahan, perayaan syukur, dan pengorbanan suci.",
};

export const INTENTION_CONFIGS: IntentionConfig[] = [
  {
    id: "pernikahan",
    title: "Pernikahan & Menyatukan Dua Keluarga",
    tagline: "Keharmonisan, Kematangan Sosial, & Kelanjutan Keturunan",
    coreNeeds: "Harmoni rasa, restu sosial, iklim damai, dan kesuburan",
    favoredWukus: ["Tambir", "Dukut", "Warigagung", "Sinta", "Galungan", "Wugu"],
    discouragedWukus: ["Prangbakat", "Bala", "Sungsang", "Kurantil", "Watugunung"],
    favoredPasaran: ["Legi", "Pon", "Kliwon"],
    favoredCaturworo: ["Sri", "Laba"],
    discouragedDasaworo: ["Pati", "Raksasa", "Duka"],
    description:
      "Sesuai Bab 4.1.1: Membangun kehidupan bersama menuntut Wuku yang membawa berkah kelimpahan (Dukut/Sri) dan kematangan musyawarah (Tambir). Hindari masa konfrontasi (Prangbakat) atau kerawanan (Bala).",
  },
  {
    id: "bisnis",
    title: "Membuka Usaha & Meluncurkan Bisnis",
    tagline: "Pertumbuhan, Keuntungan Bersama, Stabilitas, & Pengaruh",
    coreNeeds: "Kecerdasan strategi, pondasi kokoh, dan jejaring pasar",
    favoredWukus: ["Sinta", "Landep", "Warigagung", "Marakeh", "Langkir", "Dukut"],
    discouragedWukus: ["Wuye", "Sungsang", "Bala", "Kurantil", "Watugunung"],
    favoredPasaran: ["Pahing", "Legi", "Pon"],
    favoredCaturworo: ["Sri", "Laba"],
    discouragedDasaworo: ["Pati", "Raksasa"],
    description:
      "Sesuai Bab 4.1.2: Memilih Wuku yang sarat daya mula (Sinta), ketajaman strategi (Landep), atau pengaruh luas (Warigagung). Hindari kabut keraguan (Wuye) atau arah terbalik (Sungsang).",
  },
  {
    id: "pindah_rumah",
    title: "Pindah Rumah & Membangun Hunian",
    tagline: "Kestabilan Struktur, Kedamaian Batin, & Adaptasi Baru",
    coreNeeds: "Pondasi benteng kokoh, penerimaan tetangga baru, keharmonisan",
    favoredWukus: ["Wukir", "Tolu", "Gumbreg", "Tambir", "Wugu"],
    discouragedWukus: ["Bala", "Prangbakat", "Julungpujut", "Sungsang"],
    favoredPasaran: ["Pon", "Legi"],
    favoredCaturworo: ["Sri"],
    discouragedDasaworo: ["Pati", "Raksasa", "Duka"],
    description:
      "Sesuai Bab 4.1.2: Membutuhkan kestabilan gunung Wukir, keseimbangan Tolu, atau penerimaan lingkungan Gumbreg. Utamakan unsur Beteng (Batu) dalam Triworo untuk benteng pertahanan.",
  },
  {
    id: "kontrak",
    title: "Penandatanganan Kontrak & Perjanjian",
    tagline: "Kekuatan Hukum Mengikat, Kepercayaan, & Stabilitas",
    coreNeeds: "Kepastian klausul, tekad bersama, kejernihan nalar",
    favoredWukus: ["Landep", "Warigalit", "Pahang", "Tambir"],
    discouragedWukus: ["Sungsang", "Kurantil", "Wuye", "Bala"],
    favoredPasaran: ["Pon", "Legi"],
    favoredCaturworo: ["Laba", "Sri"],
    discouragedDasaworo: ["Pati", "Raksasa"],
    description:
      "Sesuai Bab 4.1.3: Pilih Pasaran Pon (stabilitas & menepati janji) serta unsur Beteng (Batu mengikat) atau Pasah (Besi keputusan final). Hindari ketidakteraturan Sungsang.",
  },
  {
    id: "peluncuran",
    title: "Peluncuran Publik / Kampanye / Show",
    tagline: "Sorotan Panggung, Gaung Suara, & Daya Tarik Massa",
    coreNeeds: "Energi melimpah, magnet publik, reputasi harum",
    favoredWukus: ["Julungwangi", "Gumbreg", "Warigagung", "Marakeh", "Langkir"],
    discouragedWukus: ["Sungsang", "Bala", "Kulawu", "Watugunung"],
    favoredPasaran: ["Pahing", "Kliwon", "Legi"],
    favoredCaturworo: ["Laba", "Jaya"],
    discouragedDasaworo: ["Duka", "Pati"],
    description:
      "Julungwangi ibarat panggung benderang di bawah sorot lampu. Pasaran Pahing memberi nyala dorongan ekstra, sementara Kliwon menghimpun khalayak ramai.",
  },
  {
    id: "spiritual",
    title: "Laku Batin, Meditasi, & Ritual Bersih Diri",
    tagline: "Kedalaman Transendental, Rekonsiliasi Jiwa, & Penyucian",
    coreNeeds: "Keheningan rasa, pemutusan belenggu, perlindungan ilahi",
    favoredWukus: ["Galungan", "Kuningan", "Maktal", "Sinta", "Watugunung"],
    discouragedWukus: [],
    favoredPasaran: ["Kliwon", "Wage"],
    favoredCaturworo: ["Menala"],
    discouragedDasaworo: ["Raksasa"],
    description:
      "Bab 2.5: Pasaran Kliwon sarat daya sakral dan batiniah, sementara Wage memberi hening sejati. Caturworo Menala mengajak mundur dari kebisingan duniawi.",
  },
  {
    id: "refleksi_penutupan",
    title: "Menuntaskan Urusan Lama & Evaluasi",
    tagline: "Memotong Benang Kusut & Merawat Diri",
    coreNeeds: "Kelonggaran waktu, keikhlasan melepaskan, perapian karya",
    favoredWukus: ["Kuruwelut", "Maktal", "Kulawu", "Watugunung", "Tolu"],
    discouragedWukus: ["Langkir"],
    favoredPasaran: ["Wage", "Pon"],
    favoredCaturworo: ["Menala"],
    discouragedDasaworo: ["Raksasa"],
    description:
      "Bab 5: Seni menutup pintu dengan baik agar jendela baru terbuka lapang. Kuruwelut untuk menyelesaikan benang kusut, Kulawu untuk menurunkan ritme, dan Watugunung untuk purna tugas.",
  },
];
