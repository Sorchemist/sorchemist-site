/* Sorchemist · 10. Sınıf Kimya — Türkiye Yüzyılı Maarif Modeli öğretim programına göre. */
window.SC_GRADES = window.SC_GRADES || {};
window.SC_GRADES[10] = {
  grade: 10,
  label: "10. Sınıf",
  program: "Türkiye Yüzyılı Maarif Modeli (2025)",
  welcome: "Lise 2 parşömenlerinde kimyasal tepkimeleri tartacak, mol ile atomları sayacak, gazları pistonlara hapsedecek ve çözeltilerin sırlarını çözeceksin. Son durak, gezegenimizi koruyan sürdürülebilir kimya.",
  themes: [
    { id: "etkilesim", name: "Etkileşim", hours: 32, desc: "Kimyasal tepkimeler, mol kavramı, kimyasal hesaplamalar ve gazlar" },
    { id: "cesitlilik", name: "Çeşitlilik", hours: 26, desc: "Çözünme, çözünürlük, derişim ve koligatif özellikler" },
    { id: "surdurulebilirlik", name: "Sürdürülebilirlik", hours: 10, desc: "Yeşil kimya, atmosfer ve küresel çevre sorunları" }
  ],
  topics: [
    {
      id: "10-1", theme: "etkilesim", icon: "🔥",
      title: "Kimyasal Tepkimeler ve Türleri",
      sub: "Kimyasal değişim, tepkime denklemleri ve denkleştirme; çökelme, redoks ve asit-baz tepkimeleri",
      subtopics: ["Fiziksel ve kimyasal değişim", "Tepkime denklemlerinin yazılması ve denkleştirilmesi", "Çökelme tepkimeleri", "İndirgenme-yükseltgenme (redoks) tepkimeleri", "Asit-baz (nötralleşme) tepkimeleri"],
      story: { t: "Altın yağmuru", p: "Aqualf iki şeffaf iksiri birbirine döküyor: kurşun(II) nitrat ve potasyum iyodür. Kap bir anda parıl parıl altın sarısı kristallerle doluyor. Çözünmeyen kurşun(II) iyodür çöktü! Başka bir kapta çinko çubuğu mavi bakır sülfat çözeltisine daldırıyor; mavi renk soluyor, çubuğun üstünü kızıl bakır kaplıyor. Elektronlar çinkodan bakır iyonlarına geçti. Her tepkimede atomlar yeniden düzenlenir ama hiçbiri kaybolmaz." },
      points: [
        "Kimyasal değişimde maddenin kimliği değişir ve yeni maddeler oluşur (paslanma, yanma). Fiziksel değişimde kimlik değişmez (erime, çözünme).",
        "Denkleştirmede her elementin atom sayısı tepkimenin iki tarafında eşitlenir. Kütle ve atom korunur.",
        "Çökelme tepkimesinde iki çözelti karıştırılınca suda az çözünen bir katı (çökelek) oluşur: Pb²⁺ + 2I⁻ → PbI2(k).",
        "Redoks tepkimelerinde elektron alışverişi olur. Elektron veren yükseltgenir (indirgendir), elektron alan indirgenir (yükseltgendir).",
        "Asit ile bazın tepkimesi (nötralleşme) sonucunda tuz ve su oluşur."
      ],
      formulas: [
        { n: "Altın Yağmuru", eq: "Pb(NO3)2(suda) + 2KI(suda) → PbI2(k) + 2KNO3(suda)", note: "Sarı PbI2 çökeleği oluşur.", c: "amber" },
        { n: "Redoks", eq: "Zn(k) + Cu²⁺(suda) → Zn²⁺(suda) + Cu(k)", note: "Zn yükseltgenir, Cu²⁺ indirgenir.", c: "aqua" }
      ],
      tip: "Yanma tepkimelerini denkleştirirken sırasıyla C, H ve en son O atomlarını eşitle. Örnek: C3H8 + 5O2 → 3CO2 + 4H2O.",
      exp: "tepkime-kazani",
      qs: [
        { q: "Aşağıdakilerden hangisi kimyasal bir değişimdir?", o: ["Buzun erimesi", "Şekerin suda çözünmesi", "Demirin paslanması", "İyotun süblimleşmesi", "Camın kırılması"], a: 2, e: "Paslanmada demir oksijen ve su ile tepkimeye girerek yeni bir madde (demir oksit) oluşturur. Diğerleri fiziksel değişimdir." },
        { q: "Pb(NO3)2(suda) + 2KI(suda) → PbI2 + 2KNO3 tepkimesinde oluşan çökelek hangisidir?", o: ["KNO3", "PbI2", "KI", "Pb(NO3)2", "Çökelek oluşmaz"], a: 1, e: "Nitrat ve potasyum tuzları suda çok çözünür. Suda az çözünen sarı PbI2 katısı çöker." },
        { q: "Zn(k) + Cu²⁺(suda) → Zn²⁺(suda) + Cu(k) tepkimesi ile ilgili hangisi doğrudur?", o: ["Zn indirgenmiştir", "Cu²⁺ elektron vermiştir", "Zn yükseltgenmiş, Cu²⁺ indirgenmiştir", "Elektron alışverişi yoktur", "Tepkime bir çökelme tepkimesidir"], a: 2, e: "Zn iki elektron vererek Zn²⁺ olur (yükseltgenme). Cu²⁺ bu elektronları alarak Cu olur (indirgenme)." },
        { q: "C3H8 + a O2 → b CO2 + c H2O tepkimesi en küçük tam sayılarla denkleştirildiğinde a kaçtır?", o: ["3", "4", "5", "7", "10"], a: 2, e: "3 C → b = 3; 8 H → c = 4. Sağdaki O sayısı 3·2 + 4·1 = 10 olduğundan a = 5'tir." },
        { q: "Aşağıdakilerden hangisi bir asit-baz (nötralleşme) tepkimesidir?", o: ["CH4 + 2O2 → CO2 + 2H2O", "Mg + 2HCl → MgCl2 + H2", "HNO3 + KOH → KNO3 + H2O", "AgNO3 + NaCl → AgCl + NaNO3", "2H2O2 → 2H2O + O2"], a: 2, e: "Asit (HNO3) ile baz (KOH) tepkimeye girerek tuz (KNO3) ve su oluşturur. Bu tepkime bir nötralleşme tepkimesidir." }
      ]
    },
    {
      id: "10-2", theme: "etkilesim", icon: "⚖️",
      title: "Mol Kavramı",
      sub: "Avogadro sayısı, mol kütlesi, tanecik sayısı ve kütle–mol ilişkileri",
      subtopics: ["Saf maddelerin ölçülebilir özellikleri", "Avogadro sayısı (6,02·10²³)", "Mol kütlesi", "Kütle, mol ve tanecik sayısı dönüşümleri"],
      story: { t: "Simyacının terazisi", p: "Aqualf'ın terazisinin bir kefesinde 12 gram karbon, diğerinde 6,02·10²³ tane sayılmış görünmez boncuk var ve terazi dengede! Kimyacılar atomları tek tek sayamaz ama tartabilir. Bir mol, 12 g karbon-12'deki atom sayısı kadar tanecik demektir. Mol sayesinde terazi, bir atom sayacına dönüşür." },
      points: [
        "1 mol, 6,02·10²³ tanecik (Avogadro sayısı, NA) içerir.",
        "Mol kütlesi, 1 mol maddenin gram cinsinden kütlesidir. CO2: 12 + 2·16 = 44 g/mol.",
        "Mol sayısı = kütle / mol kütlesi; tanecik sayısı = mol sayısı · NA.",
        "Bir molekülün mol sayısı ile içerdiği atomların mol sayısı farklıdır: 1 mol NH3'te 4 mol atom vardır.",
        "Eşit kütledeki maddelerden mol kütlesi en küçük olanın mol sayısı en büyüktür."
      ],
      formulas: [
        { n: "Mol Formülü", eq: "n = m / MA · N = n · NA", note: "n: mol, m: kütle (g), MA: mol kütlesi (g/mol), N: tanecik sayısı", c: "emerald" }
      ],
      tip: "Soruda tanecik sayısı verildiyse önce NA'ya bölerek mole geç. Bütün dönüşümler moldan geçer: kütle ↔ mol ↔ tanecik.",
      exp: "mol-terazisi",
      qs: [
        { q: "0,5 mol CO2 kaç gramdır? (C: 12, O: 16)", o: ["11", "16", "22", "44", "88"], a: 2, e: "CO2'nin mol kütlesi 12 + 32 = 44 g/mol'dür. m = 0,5 · 44 = 22 g." },
        { q: "3,01·10²³ tane H2O molekülü kaç moldür? (NA = 6,02·10²³)", o: ["0,25", "0,5", "1", "2", "3"], a: 1, e: "n = N / NA = 3,01·10²³ / 6,02·10²³ = 0,5 mol." },
        { q: "1 mol NH3 molekülünde toplam kaç mol atom bulunur?", o: ["1", "2", "3", "4", "6"], a: 3, e: "Bir NH3 molekülünde 1 N + 3 H = 4 atom vardır. 1 mol NH3'te 4 mol atom bulunur." },
        { q: "16 gram CH4 gazı kaç mol molekül ve kaç mol H atomu içerir? (C: 12, H: 1)", o: ["1 mol molekül, 4 mol H", "1 mol molekül, 1 mol H", "2 mol molekül, 4 mol H", "0,5 mol molekül, 2 mol H", "4 mol molekül, 1 mol H"], a: 0, e: "CH4 = 16 g/mol olduğundan 16 g = 1 mol molekül. Her molekülde 4 H vardır, yani 4 mol H atomu." },
        { q: "Eşit kütlelerde alınan aşağıdaki gazlardan hangisinin mol sayısı en büyüktür? (H: 1, He: 4, C: 12, N: 14, O: 16)", o: ["O2", "N2", "CH4", "He", "H2"], a: 4, e: "n = m / MA olduğundan mol kütlesi en küçük olan H2 (2 g/mol) en çok mol sayısına sahiptir." }
      ]
    },
    {
      id: "10-3", theme: "etkilesim", icon: "🎈",
      title: "Kimyasal Hesaplamalar",
      sub: "Stokiyometri, sınırlayıcı bileşen ve tepkime verimi",
      subtopics: ["Denkleştirilmiş denklemde mol oranları", "Kütle–mol–hacim hesapları", "Sınırlayıcı (tükenen) bileşen ve artan madde", "Teorik ve gerçek verim (% verim)"],
      story: { t: "Balon şişiren iksir", p: "Aqualf bir şişeye hidroklorik asit koyuyor, balonun içine de magnezyum şeritleri yerleştiriyor. Balonu şişenin ağzına geçirip şeritleri asidin içine düşürüyor; balon hidrojen gazıyla şişmeye başlıyor. Ama bir noktada duruyor. Çünkü magnezyum tükendi! Tükenen madde, oluşacak ürünün miktarını belirler. Buna sınırlayıcı bileşen denir." },
      points: [
        "Denkleştirilmiş denklemdeki katsayılar maddelerin mol oranlarını verir: N2 + 3H2 → 2NH3.",
        "Sınırlayıcı bileşen, tepkimede tamamen tükenen ve ürün miktarını belirleyen maddedir. Diğer madde artar.",
        "Sınırlayıcıyı bulmak için her tepkenin mol sayısı katsayısına bölünür; en küçük değeri veren tükenir.",
        "Teorik verim hesaplanan en fazla ürün miktarıdır. % verim = (gerçek / teorik) · 100",
        "Normal koşullarda (0 °C, 1 atm) 1 mol gaz 22,4 L hacim kaplar."
      ],
      formulas: [
        { n: "Balon Tepkimesi", eq: "Mg(k) + 2HCl(suda) → MgCl2(suda) + H2(g)", note: "1 mol Mg'den 1 mol H2 gazı oluşur.", c: "rose" },
        { n: "Verim", eq: "% verim = (gerçek ürün / teorik ürün) · 100", note: "Yan tepkimeler ve kayıplar verimi %100'ün altına düşürür.", c: "amber" }
      ],
      tip: "Sınırlayıcı bileşen sorularında iki tepkenin miktarı verilir. İki miktar da verildiyse mutlaka önce hangisinin tükendiğini bul; ürünü tükenen maddeye göre hesapla.",
      exp: "balon-iksiri",
      qs: [
        { q: "N2 + 3H2 → 2NH3 tepkimesine göre 6 mol H2 gazının yeterli miktarda N2 ile tamamen tepkimesinden kaç mol NH3 oluşur?", o: ["2", "3", "4", "6", "12"], a: 2, e: "3 mol H2'den 2 mol NH3 oluşur. 6 mol H2 → (6/3)·2 = 4 mol NH3." },
        { q: "2H2 + O2 → 2H2O tepkimesinde 4 mol H2 ile 3 mol O2 tepkimeye sokuluyor. Tepkime tamamlandığında hangi maddeden kaç mol artar?", o: ["H2'den 1 mol", "O2'den 1 mol", "O2'den 2 mol", "H2'den 2 mol", "Artan madde olmaz"], a: 1, e: "4 mol H2 için 2 mol O2 gerekir. H2 tükenir ve 3 − 2 = 1 mol O2 artar." },
        { q: "CaCO3(k) → CaO(k) + CO2(g) tepkimesine göre 50 g CaCO3'ün tamamen ayrışmasından kaç gram CO2 oluşur? (CaCO3: 100, CO2: 44 g/mol)", o: ["11", "22", "28", "44", "50"], a: 1, e: "50 g CaCO3 = 0,5 mol. 1:1 orandan 0,5 mol CO2 oluşur: 0,5 · 44 = 22 g." },
        { q: "Teorik olarak 20 g ürün oluşması beklenen bir tepkimeden 15 g ürün elde ediliyor. Tepkimenin yüzde verimi kaçtır?", o: ["%15", "%25", "%50", "%75", "%133"], a: 3, e: "% verim = (15 / 20) · 100 = %75." },
        { q: "Mg + 2HCl → MgCl2 + H2 tepkimesine göre 4,8 g Mg'nin yeterli HCl ile tepkimesinden kaç mol H2 gazı oluşur? (Mg: 24)", o: ["0,1", "0,2", "0,4", "2", "4,8"], a: 1, e: "4,8 / 24 = 0,2 mol Mg. Mg ile H2 arasındaki oran 1:1 olduğu için 0,2 mol H2 oluşur." }
      ]
    },
    {
      id: "10-4", theme: "etkilesim", icon: "🫧",
      title: "Gazların Özellikleri ve Gaz Yasaları",
      sub: "Boyle, Charles, Gay-Lussac ve Avogadro yasaları",
      subtopics: ["Gazların özellikleri ve basınç", "Basınç–hacim ilişkisi (Boyle)", "Sıcaklık–hacim ilişkisi (Charles)", "Basınç–sıcaklık ilişkisi (Gay-Lussac)", "Hacim–madde miktarı ilişkisi (Avogadro)"],
      story: { t: "Pistonlu sihirli şişe", p: "Aqualf, içinde parlayan gaz taneciklerinin dans ettiği pistonlu bir cam silindir yapmış. Pistonu bastırdığında tanecikler duvarlara daha sık çarpıyor ve basınç artıyor. Silindiri ocağa yaklaştırdığında tanecikler hızlanıyor ve pistonu yukarı itiyor. Gaz yasaları, bu dansın matematiksel dilidir." },
      points: [
        "Gazlar bulundukları kabı doldurur, sıkıştırılabilir ve birbirleriyle her oranda karışır.",
        "Boyle: sabit sıcaklık ve mol sayısında P·V sabittir; basınç artarsa hacim azalır.",
        "Charles: sabit basınçta hacim mutlak sıcaklıkla (Kelvin) doğru orantılıdır.",
        "Gay-Lussac: sabit hacimde basınç mutlak sıcaklıkla doğru orantılıdır.",
        "Avogadro: aynı sıcaklık ve basınçta eşit hacimdeki gazlar eşit sayıda tanecik içerir. T(K) = t(°C) + 273"
      ],
      formulas: [
        { n: "Birleşik Gaz Yasası", eq: "P1·V1 / T1 = P2·V2 / T2", note: "Sıcaklık mutlaka Kelvin cinsinden kullanılır.", c: "aqua" }
      ],
      tip: "Gaz sorularında en sık hata, sıcaklığı Celsius ile kullanmaktır. Formüle koymadan önce her zaman 273 ekle.",
      exp: "pistonlu-sise",
      qs: [
        { q: "Sabit sıcaklıkta 2 atm basınçta 6 L hacim kaplayan bir gazın basıncı 3 atm'ye çıkarılırsa hacmi kaç L olur?", o: ["2", "3", "4", "9", "12"], a: 2, e: "Boyle yasası: P1·V1 = P2·V2 → 2 · 6 = 3 · V2 → V2 = 4 L." },
        { q: "Sabit basınçta 27 °C'de 3 L hacim kaplayan gaz 127 °C'ye ısıtılırsa hacmi kaç L olur?", o: ["2,25", "3", "4", "9", "14,1"], a: 2, e: "Charles yasası: V1/T1 = V2/T2. T1 = 300 K, T2 = 400 K → V2 = 3 · 400 / 300 = 4 L." },
        { q: "Sabit hacimli kapalı bir kaptaki gazın mutlak sıcaklığı iki katına çıkarılırsa basıncı nasıl değişir?", o: ["Yarıya iner", "Değişmez", "İki katına çıkar", "Dört katına çıkar", "Dörtte birine iner"], a: 2, e: "Gay-Lussac yasasına göre sabit hacimde basınç mutlak sıcaklıkla doğru orantılıdır." },
        { q: "Aynı sıcaklık ve basınçta bulunan 1 L H2 ve 1 L CO2 gazları için hangisi kesinlikle doğrudur?", o: ["Kütleleri eşittir", "Molekül sayıları eşittir", "Atom sayıları eşittir", "Yoğunlukları eşittir", "Mol kütleleri eşittir"], a: 1, e: "Avogadro yasasına göre aynı koşullardaki eşit hacimli gazlar eşit sayıda molekül içerir." },
        { q: "Ağzı kapatılmış, hava ile şişirilmiş bir balon dondurucuya konulduğunda büzülür. Bu durum hangi gaz yasası ile açıklanır?", o: ["Boyle", "Charles", "Graham", "Dalton", "Avogadro"], a: 1, e: "Balondaki gazın basıncı yaklaşık sabittir. Sıcaklık düştükçe hacim azalır (Charles yasası)." }
      ]
    },
    {
      id: "10-5", theme: "etkilesim", icon: "🌬️",
      title: "İdeal Gaz Denklemi, Kinetik Teori ve Graham Yasası",
      sub: "PV = nRT, kinetik moleküler teori, difüzyon ve efüzyon",
      subtopics: ["İdeal gaz denklemi", "Gazların kinetik moleküler teorisi", "Gerçek gazlar ve ideallikten sapma", "Graham difüzyon ve efüzyon yasası"],
      story: { t: "Beyaz halkanın yeri", p: "Aqualf uzun bir cam borunun bir ucuna amonyak, diğer ucuna hidrojen klorür emdirilmiş pamuk koyuyor. Gazlar birbirine doğru yayılıyor ve buluştukları yerde beyaz bir duman halkası (NH4Cl) oluşuyor. Ama halka tam ortada değil, HCl tarafına daha yakın. Hafif amonyak molekülleri daha hızlı koştu! Graham yasası tam olarak bunu söyler." },
      points: [
        "İdeal gaz denklemi: P·V = n·R·T. R = 0,082 L·atm/(mol·K) veya 22,4/273.",
        "Kinetik teoriye göre gaz tanecikleri sürekli ve gelişigüzel hareket eder, çarpışmaları esnektir.",
        "Gaz taneciklerinin ortalama kinetik enerjisi yalnızca mutlak sıcaklığa bağlıdır.",
        "Graham yasası: aynı sıcaklıkta gazların yayılma hızları mol kütlelerinin karekökü ile ters orantılıdır.",
        "Gerçek gazlar ideal davranışa yüksek sıcaklık ve düşük basınçta en çok yaklaşır."
      ],
      formulas: [
        { n: "İdeal Gaz", eq: "P·V = n·R·T", note: "0,5 mol gaz, 0 °C ve 1 atm'de 11,2 L hacim kaplar.", c: "aqua" },
        { n: "Graham", eq: "v1 / v2 = √(MA2 / MA1)", note: "He ile CH4: vHe/vCH4 = √(16/4) = 2", c: "purple" }
      ],
      tip: "Graham sorularında gazların yalnızca mol kütlelerine bak. Hafif olan gaz daha hızlı yayılır ve buluşma noktası ağır gazın tarafına yakın olur.",
      exp: "beyaz-halka",
      qs: [
        { q: "0 °C ve 1 atm koşullarında 0,5 mol ideal gaz kaç L hacim kaplar? (R = 22,4/273 L·atm/mol·K)", o: ["5,6", "11,2", "22,4", "44,8", "1,12"], a: 1, e: "V = nRT/P = 0,5 · (22,4/273) · 273 / 1 = 11,2 L." },
        { q: "Kinetik moleküler teoriye göre gaz taneciklerinin ortalama kinetik enerjisi neye bağlıdır?", o: ["Gazın cinsine", "Gazın mol kütlesine", "Yalnızca mutlak sıcaklığa", "Kabın hacmine", "Gazın basıncına"], a: 2, e: "Aynı sıcaklıktaki bütün gazların ortalama kinetik enerjileri eşittir. Kinetik enerji yalnızca mutlak sıcaklıkla değişir." },
        { q: "Aynı koşullarda He gazının yayılma hızı CH4 gazının yayılma hızının kaç katıdır? (He: 4, CH4: 16)", o: ["1/4", "1/2", "1", "2", "4"], a: 3, e: "vHe / vCH4 = √(16/4) = √4 = 2." },
        { q: "Bir cam borunun iki ucundan aynı anda NH3 ve HCl gazları gönderiliyor. Oluşan beyaz NH4Cl halkası ile ilgili hangisi doğrudur? (NH3: 17, HCl: 36,5)", o: ["Tam ortada oluşur", "NH3 ucuna daha yakın oluşur", "HCl ucuna daha yakın oluşur", "Halka oluşmaz", "Konumu sıcaklıktan bağımsız olarak rastgeledir"], a: 2, e: "NH3'ün mol kütlesi daha küçük olduğu için daha hızlı yayılır ve daha uzun yol alır. Gazlar HCl ucuna yakın bir noktada buluşur." },
        { q: "Gerçek gazlar ideal gaz davranışına hangi koşullarda en çok yaklaşır?", o: ["Düşük sıcaklık, yüksek basınç", "Yüksek sıcaklık, düşük basınç", "Düşük sıcaklık, düşük basınç", "Yüksek sıcaklık, yüksek basınç", "Koşullardan bağımsızdır"], a: 1, e: "Yüksek sıcaklıkta tanecikler arası çekimler önemsizleşir; düşük basınçta taneciklerin öz hacmi kabın hacmi yanında ihmal edilebilir." }
      ]
    },
    {
      id: "10-6", theme: "cesitlilik", icon: "🧂",
      title: "Çözünme ve Çözünürlük",
      sub: "Çözünme süreci, çözünme türleri, çözelti çeşitleri ve çözünürlüğe etki eden faktörler",
      subtopics: ["Çözünme süreci ve 'benzer benzeri çözer'", "İyonik ve moleküler çözünme", "Doymamış, doymuş ve aşırı doymuş çözeltiler", "Elektrolit ve elektrolit olmayan çözeltiler", "Çözünürlüğe etki eden faktörler (sıcaklık, basınç, madde cinsi)"],
      story: { t: "Doymak bilmeyen kazan", p: "Aqualf kazandaki suya kaşık kaşık güherçile (KNO3) ekliyor. Bir noktadan sonra kristaller artık çözünmüyor ve dibe çöküyor; çözelti doydu. Kazanı ocağa koyduğunda dipteki kristaller de kayboluyor. Sıcaklık arttıkça KNO3'ün çözünürlüğü artar! Ama gazoz şişesini ısıtırsa tersi olur: gazların çözünürlüğü sıcaklıkla azalır." },
      points: [
        "'Benzer benzeri çözer': polar çözücüler polar ve iyonik maddeleri, apolar çözücüler apolar maddeleri iyi çözer.",
        "İyonik çözünmede madde suda iyonlarına ayrışır (NaCl, KNO3). Moleküler çözünmede moleküller bütün olarak dağılır (şeker, etanol).",
        "Doymuş çözelti, belirli sıcaklıkta çözebileceği en fazla maddeyi çözmüştür. Aşırı doymuş çözelti kararsızdır.",
        "Katıların sudaki çözünürlüğü genellikle sıcaklıkla artar. Gazların çözünürlüğü sıcaklık artınca azalır, basınç artınca artar.",
        "Çözünürlük g/100 g su birimiyle verilir ve maddeye özgüdür."
      ],
      formulas: [
        { n: "Çözünürlük Oranı", eq: "40 °C'de KNO3: 64 g / 100 g su ⇒ 50 g suda 32 g", note: "Çözünürlük orantı kurularak farklı su miktarlarına uyarlanır.", c: "emerald" }
      ],
      tip: "Gazlı içecekler soğukken ve kapağı kapalıyken gazını daha iyi korur. Bu iki durum, gaz çözünürlüğünün sıcaklık ve basınca bağlılığını özetler.",
      exp: "doymak-bilmeyen-kazan",
      qs: [
        { q: "Apolar bir madde olan iyot (I2) aşağıdaki çözücülerden hangisinde en iyi çözünür?", o: ["Su", "Etanol", "Karbon tetraklorür (CCl4)", "Amonyak", "Hidrojen florür"], a: 2, e: "Apolar maddeler apolar çözücülerde iyi çözünür. CCl4 apolar bir çözücüdür." },
        { q: "Aşağıdaki maddelerden hangisi suda iyonlarına ayrışarak çözünür?", o: ["Şeker (C12H22O11)", "Etanol (C2H5OH)", "Potasyum nitrat (KNO3)", "Metanol (CH3OH)", "Glikoz (C6H12O6)"], a: 2, e: "KNO3 iyonik bir bileşiktir; suda K⁺ ve NO3⁻ iyonlarına ayrışır. Diğerleri moleküler olarak çözünür." },
        { q: "Gazların sudaki çözünürlüğü ile ilgili hangisi doğrudur?", o: ["Sıcaklık artınca artar", "Basınç artınca azalır", "Sıcaklık artınca azalır, basınç artınca artar", "Sıcaklık ve basınçtan etkilenmez", "Yalnızca gazın miktarına bağlıdır"], a: 2, e: "Isıtınca gaz molekülleri kolayca sudan ayrılır (çözünürlük azalır). Basınç artınca daha çok gaz çözünür." },
        { q: "Çözünürlüğü sıcaklıkla artan bir katının doymamış sulu çözeltisi için aşağıdaki işlemlerden hangisi çözeltiyi doymuş hâle getiremez?", o: ["Aynı sıcaklıkta katı eklemek", "Sıcaklığı düşürmek", "Sabit sıcaklıkta suyun bir kısmını buharlaştırmak", "Aynı sıcaklıkta su eklemek", "Sıcaklığı düşürüp katı eklemek"], a: 3, e: "Su eklemek çözeltiyi daha da seyreltir ve doymamışlığı artırır." },
        { q: "40 °C'de KNO3'ün çözünürlüğü 64 g/100 g sudur. Aynı sıcaklıkta 50 g su en fazla kaç g KNO3 çözebilir?", o: ["16", "32", "50", "64", "128"], a: 1, e: "100 g su 64 g çözerse 50 g su 64 / 2 = 32 g çözer." }
      ]
    },
    {
      id: "10-7", theme: "cesitlilik", icon: "🧪",
      title: "Derişim Birimleri",
      sub: "Molarite, kütlece yüzde, ppm ve seyreltme hesapları",
      subtopics: ["Molar derişim (molarite)", "Kütlece yüzde derişim", "ppm (milyonda bir kısım)", "Seyreltme ve karıştırma"],
      story: { t: "Mavi iksirin tonu", p: "Aqualf, aynı mavi bakır sülfat tozundan üç ayrı şişeye koyuyor: birine bir çay kaşığı, birine üç, birine beş. Su miktarları eşit. Şişeler açık maviden lacivert maviye uzanan bir renk skalası oluşturuyor. Renk ne kadar koyuysa derişim o kadar yüksek. Kimyacılar bu 'koyuluğu' molarite ile sayıya döker." },
      points: [
        "Molarite (M) = çözünenin mol sayısı / çözeltinin hacmi (L).",
        "Kütlece yüzde = (çözünen kütlesi / çözelti kütlesi) · 100.",
        "ppm = (çözünen kütlesi / çözelti kütlesi) · 10⁶. Çok seyreltik çözeltilerde (su kirliliği) kullanılır.",
        "Seyreltmede çözünenin mol sayısı değişmez: M1·V1 = M2·V2",
        "Aynı maddenin çözeltileri karıştırılırsa: M(son) = (M1·V1 + M2·V2) / (V1 + V2)"
      ],
      formulas: [
        { n: "Molarite", eq: "M = n / V", note: "0,4 mol NaOH 2 L çözeltide → 0,2 M", c: "aqua" },
        { n: "Seyreltme", eq: "M1·V1 = M2·V2", note: "Su eklenince mol sayısı sabit kalır, derişim azalır.", c: "emerald" }
      ],
      tip: "Molarite hesabında hacmin litre olduğuna dikkat et: 500 mL = 0,5 L. Kütlece yüzde hesabında payda çözücü değil, çözelti kütlesidir.",
      exp: "mavi-iksir",
      qs: [
        { q: "0,4 mol NaOH ile hazırlanan 2 L çözeltinin molar derişimi kaçtır?", o: ["0,1 M", "0,2 M", "0,4 M", "0,8 M", "2 M"], a: 1, e: "M = n / V = 0,4 / 2 = 0,2 M." },
        { q: "11,7 g NaCl ile hazırlanan 500 mL çözeltinin molar derişimi kaçtır? (NaCl: 58,5 g/mol)", o: ["0,1 M", "0,2 M", "0,4 M", "0,5 M", "2 M"], a: 2, e: "n = 11,7 / 58,5 = 0,2 mol. M = 0,2 / 0,5 = 0,4 M." },
        { q: "2 kg'lık bir su örneğinde 0,01 g kurşun bulunmaktadır. Kurşun derişimi kaç ppm'dir?", o: ["0,5", "2", "5", "10", "50"], a: 2, e: "ppm = (0,01 g / 2000 g) · 10⁶ = 5 ppm." },
        { q: "20 g şeker 80 g suda çözülerek hazırlanan çözeltinin kütlece yüzde derişimi kaçtır?", o: ["%16", "%20", "%25", "%40", "%80"], a: 1, e: "Çözelti kütlesi 20 + 80 = 100 g. Kütlece % = (20 / 100) · 100 = %20." },
        { q: "0,5 M 200 mL NaCl çözeltisine su eklenerek hacmi 500 mL'ye tamamlanıyor. Son çözeltinin derişimi kaç M olur?", o: ["0,1", "0,2", "0,25", "0,5", "1,25"], a: 1, e: "M1·V1 = M2·V2 → 0,5 · 200 = M2 · 500 → M2 = 0,2 M." }
      ]
    },
    {
      id: "10-8", theme: "cesitlilik", icon: "❄️",
      title: "Koligatif Özellikler",
      sub: "Kaynama noktası yükselmesi ve donma noktası alçalması",
      subtopics: ["Çözeltilerin buhar basıncı", "Kaynama noktası yükselmesi", "Donma noktası alçalması", "Tanecik sayısının etkisi (iyon sayısı)"],
      story: { t: "Donmayan iksir", p: "Kış gecesi Hobbit köyünde her şey donuyor ama Aqualf'ın kapı önündeki tuzlu su kovası hâlâ sıvı! Suya karışan tuz iyonları, su moleküllerinin düzenli buz kristalleri kurmasını zorlaştırır. Aynı iyonlar kaynamayı da geciktirir. Bu özellikler çözünenin türüne değil, sayısına bağlıdır." },
      points: [
        "Koligatif özellikler çözünen taneciklerin türüne değil, sayısına (derişimine) bağlıdır.",
        "Uçucu olmayan bir madde çözündüğünde çözeltinin buhar basıncı düşer, kaynama noktası yükselir ve donma noktası alçalır.",
        "İyonik maddeler suda ayrışarak daha çok tanecik oluşturur: NaCl → 2 tanecik, CaCl2 → 3 tanecik.",
        "ΔTk = Kk · m · i ve ΔTd = Kd · m · i (su için Kk = 0,52 °C/m; Kd = 1,86 °C/m)",
        "Kışın yollara tuz serpilmesi ve araç radyatörlerine antifriz konulması donma noktası alçalmasının uygulamalarıdır."
      ],
      formulas: [
        { n: "Kaynama Noktası Yükselmesi", eq: "ΔTk = Kk · m · i", note: "1 molal NaCl (i = 2): ΔTk = 0,52 · 1 · 2 = 1,04 °C", c: "rose" }
      ],
      tip: "Eşit derişimli çözeltileri karşılaştırırken her maddenin suda kaç tanecik verdiğini (i değeri) bul. Tanecik sayısı en büyük olanın donma noktası en düşük, kaynama noktası en yüksektir.",
      exp: "donmayan-iksir",
      qs: [
        { q: "Saf suya bir miktar sofra tuzu eklenip çözülürse aşağıdakilerden hangisi gerçekleşir?", o: ["Kaynama noktası düşer, donma noktası yükselir", "Kaynama noktası yükselir, donma noktası düşer", "Kaynama ve donma noktaları değişmez", "Buhar basıncı artar", "Kaynama ve donma noktaları birlikte yükselir"], a: 1, e: "Çözünen tanecikler buhar basıncını düşürür. Kaynama noktası yükselir, donma noktası alçalır." },
        { q: "Aynı molal derişimdeki aşağıdaki sulu çözeltilerden hangisinin donma noktası en düşüktür?", o: ["C6H12O6", "NaCl", "KNO3", "CaCl2", "C2H5OH"], a: 3, e: "CaCl2 suda Ca²⁺ ve 2Cl⁻ olmak üzere 3 tanecik verir. Tanecik sayısı en fazla olduğu için donma noktası en düşüktür." },
        { q: "Kış aylarında buzlanmayı önlemek için yollara tuz serpilmesi hangi özellikle açıklanır?", o: ["Kaynama noktası yükselmesi", "Donma noktası alçalması", "Yüzey gerilimi", "Viskozite", "Adezyon"], a: 1, e: "Tuz, suyun donma noktasını düşürür. Böylece su 0 °C'nin altında da sıvı kalır." },
        { q: "Koligatif özellikler ile ilgili hangisi doğrudur?", o: ["Çözünenin kimyasal türüne bağlıdır", "Çözünen taneciklerin sayısına bağlıdır", "Yalnızca iyonik çözeltilerde görülür", "Çözücünün miktarına bağlı değildir", "Yalnızca gaz çözünenlerde görülür"], a: 1, e: "Koligatif özellikler çözünen taneciklerin türüne değil, sayısına (derişimine) bağlıdır." },
        { q: "1 molal NaCl sulu çözeltisi 1 atm basınçta kaç °C'de kaynamaya başlar? (Su için Kk = 0,52 °C/m)", o: ["99,48", "100,00", "100,52", "101,04", "101,56"], a: 3, e: "NaCl 2 tanecik verir (i = 2). ΔTk = 0,52 · 1 · 2 = 1,04 °C. Kaynama noktası 100 + 1,04 = 101,04 °C olur." }
      ]
    },
    {
      id: "10-9", theme: "surdurulebilirlik", icon: "🌍",
      title: "Yeşil Kimya, Atmosfer ve Küresel Sorunlar",
      sub: "Atom ekonomisi, su ve karbon ayak izi, asit yağmurları, sera etkisi, ozon tabakası",
      subtopics: ["Atom ekonomisi", "Makro ve mikro ölçekli deneyler", "Su ayak izi ve karbon ayak izi", "Atmosferdeki tepkimeler: asit yağmurları, ozon tabakasının incelmesi", "Sera etkisi ve küresel ısınma"],
      story: { t: "Ağlayan mermer heykel", p: "Köy meydanındaki mermer simyacı heykelinin yüzü her yıl biraz daha aşınıyor. Aqualf yağmur suyunu turnusolle test ediyor ve kırmızıya döndüğünü görüyor! Fabrika bacalarından yükselen kükürt dioksit ve azot oksitler bulutlarda asitlere dönüşür. Bu asitler mermerdeki kalsiyum karbonatı çözer. Çözüm kimyanın kendisinde: daha az atık, daha temiz enerji, daha akıllı tepkimeler." },
      points: [
        "Atom ekonomisi = (istenen ürünün mol kütlesi / tüm ürünlerin mol kütleleri toplamı) · 100. Katılma (toplama) tepkimelerinde %100'dür.",
        "Mikro ölçekli deneyler daha az kimyasal, daha az atık ve daha az enerji kullanır.",
        "SO2 ve NOx gazları atmosferde H2SO4 ve HNO3'e dönüşerek asit yağmurlarına neden olur. Asit yağmuru mermeri (CaCO3) aşındırır.",
        "CFC (kloroflorokarbon) gazları ozon (O3) tabakasını inceltir. CO2 ve CH4 sera etkisini artırır.",
        "Su ayak izi, bir ürünün üretim zincirinde kullanılan toplam tatlı su miktarıdır. Karbon ayak izi, neden olunan toplam sera gazı salımıdır."
      ],
      formulas: [
        { n: "Asit Yağmuru", eq: "CaCO3(k) + H2SO4(suda) → CaSO4(k) + H2O(s) + CO2(g)", note: "Mermer ve kireç taşından yapılmış tarihi eserler aşınır.", c: "rose" }
      ],
      tip: "Çevre sorularında gaz–sorun eşleşmesini ezberle: SO2/NOx → asit yağmuru, CFC → ozon incelmesi, CO2/CH4 → sera etkisi, CO → zehirlenme.",
      exp: "aglayan-heykel",
      qs: [
        { q: "Atom ekonomisi en yüksek olan tepkime türü hangisidir?", o: ["Yer değiştirme tepkimeleri", "Ayrışma tepkimeleri", "Katılma (toplama) tepkimeleri", "Çift yer değiştirme tepkimeleri", "Yanma tepkimeleri"], a: 2, e: "Katılma tepkimelerinde tepkenlerin tüm atomları tek bir ürüne dönüşür. Yan ürün oluşmaz ve atom ekonomisi %100 olur." },
        { q: "Asit yağmurlarına neden olan başlıca gazlar hangileridir?", o: ["O2 ve N2", "SO2 ve NOx", "He ve Ar", "CFC ve O3", "H2 ve CH4"], a: 1, e: "SO2 ve azot oksitler atmosferde su buharıyla tepkimeye girerek H2SO4 ve HNO3 oluşturur." },
        { q: "Ozon tabakasının incelmesine en çok neden olan bileşik grubu hangisidir?", o: ["Kloroflorokarbonlar (CFC)", "Karbonatlar", "Nitratlar", "Alkoller", "Sülfatlar"], a: 0, e: "CFC'ler stratosferde UV ışınlarıyla parçalanır. Açığa çıkan klor atomları ozon moleküllerini zincirleme şekilde yıkar." },
        { q: "I. CO2\nII. CH4\nIII. N2\nGazlarından hangileri sera etkisini artırır?", o: ["Yalnız I", "Yalnız III", "I ve II", "II ve III", "I, II ve III"], a: 2, e: "CO2 ve CH4 kızılötesi ışınları soğurarak sera etkisini artırır. N2 sera gazı değildir." },
        { q: "Bir ürünün su ayak izi ile ilgili hangisi doğrudur?", o: ["Ürünün içerdiği su miktarıdır", "Üretimden tüketime kadar tüm süreçte kullanılan toplam tatlı su miktarıdır", "Ürünün yoğunluğudur", "Ürünün paketindeki su damlası sembolüdür", "Ürünün üretildiği şehrin yağış miktarıdır"], a: 1, e: "Su ayak izi, bir ürünün tüm yaşam döngüsü boyunca doğrudan ve dolaylı olarak kullanılan tatlı su miktarını gösterir." }
      ]
    }
  ]
};
