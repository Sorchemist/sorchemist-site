/* Sorchemist · 12. Sınıf Kimya — 2026-2027'de 12. sınıfta uygulanan (2018) ortaöğretim kimya programına göre.
   Not: Maarif Modeli 12. sınıfa 2027-2028'de geçecektir. */
window.SC_GRADES = window.SC_GRADES || {};
window.SC_GRADES[12] = {
  grade: 12,
  label: "12. Sınıf",
  program: "Ortaöğretim Kimya Programı (2018) · 2027'de Maarif'e geçecek",
  welcome: "Son sınıf! Elektronların akışından pil ve elektroliz üreteceksin, karbonun sonsuz bileşik dünyasına dalacak ve geleceğin enerji kaynaklarını tartacaksın. AYT'nin organik ve elektrokimya soruları bu parşömenlerde.",
  themes: [
    { id: "elektrik", name: "Kimya ve Elektrik", hours: 20, desc: "Redoks, elektrot potansiyelleri, piller, elektroliz ve korozyon" },
    { id: "karbon", name: "Karbon Kimyasına Giriş", hours: 10, desc: "Organik–anorganik bileşikler, formüller, karbonun bağ yapısı" },
    { id: "organik", name: "Organik Bileşikler", hours: 34, desc: "Hidrokarbonlar ve fonksiyonel gruplar" },
    { id: "enerji", name: "Enerji Kaynakları ve Bilimsel Gelişmeler", hours: 8, desc: "Fosil yakıtlar, alternatif enerji ve sürdürülebilirlik" }
  ],
  topics: [
    {
      id: "12-1", theme: "elektrik", icon: "🔋",
      title: "Redoks ve Elektrot Potansiyelleri",
      sub: "Yükseltgenme basamakları, redoks tepkimeleri, standart elektrot potansiyelleri, aktiflik sırası",
      subtopics: ["Yükseltgenme basamağı", "Redoks tepkimeleri, indirgen ve yükseltgen", "Elektrot ve standart hidrojen elektrodu", "Standart indirgenme potansiyelleri", "Metallerin aktiflik sırası"],
      story: { t: "Metallerin düellosu", p: "Aqualf, içinde farklı tuz çözeltileri bulunan beş kadehin her birine farklı metal parçaları bırakıyor. Bazı kadehlerde metal hemen kararıp kaplanıyor, bazılarında hiçbir şey olmuyor. Elektron vermeye daha istekli olan metal, daha az istekli olanın iyonunu indirger. Bu düellonun puan tablosu standart elektrot potansiyelleridir." },
      points: [
        "Yükseltgenme basamağı, bir atomun bileşikteki gerçek ya da varsayılan yüküdür. Elementlerde 0'dır; bileşikte toplam 0'dır.",
        "Elektron veren tanecik yükseltgenir (indirgendir), elektron alan tanecik indirgenir (yükseltgendir).",
        "Standart hidrojen elektrodunun potansiyeli 0,00 V kabul edilir; diğer elektrotlar buna göre ölçülür.",
        "İndirgenme potansiyeli büyük olan tanecik daha kolay indirgenir (Ag⁺, Cu²⁺). Küçük olan metal daha aktiftir ve daha kuvvetli indirgendir (Mg, Zn).",
        "Bir metal, kendisinden daha büyük indirgenme potansiyeline sahip metal iyonunu indirger: Zn + Cu²⁺ → Zn²⁺ + Cu"
      ],
      formulas: [
        { n: "Yükseltgenme Basamağı", eq: "KMnO4: (+1) + x + 4(−2) = 0 → x = +7", note: "O genellikle −2, H genellikle +1, 1A metalleri +1'dir.", c: "purple" },
        { n: "Potansiyel Tablosu (E°)", eq: "Ag⁺/Ag +0,80 · Cu²⁺/Cu +0,34 · 2H⁺/H2 0,00 · Zn²⁺/Zn −0,76 · Mg²⁺/Mg −2,37 V", note: "Aşağıdaki metal, yukarıdaki iyonu indirger.", c: "aqua" }
      ],
      tip: "Potansiyel tablosunda kendiliğinden yürüyen tepkimeyi bulmak için tablonun altındaki metal ile üstündeki iyonu eşleştir. Bu yöntem yanılmaz.",
      exp: "metal-duellosu",
      qs: [
        { q: "KMnO4 bileşiğinde Mn atomunun yükseltgenme basamağı kaçtır?", o: ["+2", "+4", "+5", "+6", "+7"], a: 4, e: "K = +1, O = −2. (+1) + x + 4(−2) = 0 → x = +7." },
        { q: "2Al(k) + 3Cu²⁺(suda) → 2Al³⁺(suda) + 3Cu(k) tepkimesinde indirgen olan tanecik hangisidir?", o: ["Al", "Cu²⁺", "Al³⁺", "Cu", "Su"], a: 0, e: "Al elektron vererek yükseltgenir ve Cu²⁺'yı indirger. Elektron veren tanecik indirgendir." },
        { q: "Cu²⁺/Cu için E° = +0,34 V ve Zn²⁺/Zn için E° = −0,76 V'tur. Çinko çubuk CuSO4 çözeltisine daldırılırsa ne gözlenir?", o: ["Hiçbir değişiklik olmaz", "Çinko çözünür, çubuğun üzerinde bakır birikir", "Bakır çözünür, çinko birikir", "Çözeltiden O2 gazı çıkar", "Çinko çubuk kalınlaşır, çözeltinin mavi rengi koyulaşır"], a: 1, e: "Zn daha aktiftir (E° daha küçük). Zn yükseltgenerek çözünür, Cu²⁺ indirgenip bakır olarak birikir; mavi renk açılır." },
        { q: "Standart hidrojen elektrodunun standart indirgenme potansiyeli kaç volttur?", o: ["−1,00", "−0,76", "0,00", "+0,34", "+1,00"], a: 2, e: "Standart hidrojen elektrodu referans elektrottur ve potansiyeli 0,00 V kabul edilir." },
        { q: "E°(Ag⁺/Ag) = +0,80 V, E°(Cu²⁺/Cu) = +0,34 V, E°(Mg²⁺/Mg) = −2,37 V olduğuna göre en kuvvetli indirgen hangisidir?", o: ["Ag⁺", "Cu²⁺", "Mg²⁺", "Ag", "Mg"], a: 4, e: "İndirgenme potansiyeli en küçük olan çiftin metali en kolay yükseltgenir ve en kuvvetli indirgendir. Bu metal Mg'dir." }
      ]
    },
    {
      id: "12-2", theme: "elektrik", icon: "⚡",
      title: "Elektrokimyasal Hücreler (Piller)",
      sub: "Galvanik hücre, anot–katot, tuz köprüsü, hücre potansiyeli, günlük hayatta piller",
      subtopics: ["Galvanik (volta) hücresi", "Anot ve katot tepkimeleri", "Tuz köprüsünün görevi", "Standart hücre potansiyeli", "Lityum iyon piller ve diğer pil türleri"],
      story: { t: "Limondan fener", p: "Aqualf bir limona çinko çivi ve bakır para saplıyor, ikisini tellerle küçük bir ışık kristaline bağlıyor ve kristal titrek bir ışık saçıyor! Çinko elektronlarını teli izleyerek bakır tarafına gönderiyor. Elektronların bu yolculuğu kimyasal enerjiyi elektrik enerjisine çevirir. Her pil, kontrol altına alınmış bir redoks tepkimesidir." },
      points: [
        "Galvanik hücrede kendiliğinden yürüyen redoks tepkimesinin kimyasal enerjisi elektrik enerjisine dönüşür.",
        "Anotta yükseltgenme, katotta indirgenme olur. Galvanik hücrede anot (−), katot (+) kutuptur.",
        "Elektronlar dış devrede anottan katoda akar.",
        "Tuz köprüsü iyon geçişini sağlayarak çözeltilerin elektriksel nötrlüğünü korur ve devreyi tamamlar.",
        "E°hücre = E°katot − E°anot (indirgenme potansiyelleriyle). E°hücre > 0 ise pil kendiliğinden çalışır."
      ],
      formulas: [
        { n: "Daniell Pili", eq: "Zn(k) + Cu²⁺(suda) → Zn²⁺(suda) + Cu(k) · E° = 0,34 − (−0,76) = 1,10 V", note: "Anot Zn, katot Cu.", c: "amber" }
      ],
      tip: "'Anot–Oksitlenme', 'Katot–Kazanma' (elektron kazanma) diye hatırla. Galvanik hücrede anot kütlesi azalır, katot kütlesi artar.",
      exp: "limondan-fener",
      qs: [
        { q: "Zn | Zn²⁺ (1 M) || Cu²⁺ (1 M) | Cu pilinin standart hücre potansiyeli kaç volttur? (E°: Cu²⁺/Cu = +0,34 V, Zn²⁺/Zn = −0,76 V)", o: ["0,42", "0,76", "1,10", "−1,10", "0,34"], a: 2, e: "E°hücre = E°katot − E°anot = 0,34 − (−0,76) = 1,10 V." },
        { q: "Galvanik hücrelerde anot elektrot için hangisi doğrudur?", o: ["İndirgenme olur", "Pozitif kutuptur", "Yükseltgenme olur", "Kütlesi her zaman artar", "Elektronlar anoda dış devreden gelir"], a: 2, e: "Anotta yükseltgenme olur. Galvanik hücrede anot negatif kutuptur ve elektronlar anottan dış devreye çıkar." },
        { q: "Galvanik hücrede tuz köprüsünün görevi nedir?", o: ["Elektronları taşımak", "Elektrotları birbirine lehimlemek", "İyon geçişiyle çözeltilerin elektriksel nötrlüğünü korumak", "Hücre potansiyelini artırmak", "Çözeltileri ısıtmak"], a: 2, e: "Tuz köprüsündeki iyonlar çözeltilere geçerek yük birikimini önler ve devreyi tamamlar." },
        { q: "Bir galvanik hücrede elektronların dış devredeki hareket yönü hangisidir?", o: ["Katottan anoda", "Anottan katoda", "Tuz köprüsünden anoda", "Çözeltiden elektrota", "Elektronlar hareket etmez"], a: 1, e: "Elektronlar yükseltgenmenin olduğu anottan, indirgenmenin olduğu katoda doğru dış devreden akar." },
        { q: "Aşağıdaki pil türlerinden hangisi yeniden şarj edilebilir?", o: ["Alkali pil", "Çinko-karbon (kuru) pil", "Lityum iyon pil", "Daniell pili", "Limon pili"], a: 2, e: "Lityum iyon pillerde tepkime dışarıdan akım verilerek tersine çevrilebilir. Telefon ve elektrikli araçlarda bu yüzden kullanılır." }
      ]
    },
    {
      id: "12-3", theme: "elektrik", icon: "🔩",
      title: "Elektroliz ve Korozyon",
      sub: "Elektroliz, Faraday yasaları, kaplamacılık, korozyon ve korozyondan korunma",
      subtopics: ["Elektroliz ve elektrolitik hücre", "Eriyik ve sulu çözelti elektrolizi", "Faraday yasası ve hesaplamalar", "Kaplamacılık ve metal arıtımı", "Korozyon ve korunma yöntemleri (galvanizleme, kurban anot)"],
      story: { t: "Gümüşle kaplanan kalkan", p: "Aqualf demir bir kalkanı bakır sülfat çözeltisine daldırıyor ve kalkanı bir güç kristalinin eksi ucuna bağlıyor. Dakikalar içinde kalkan kızıl bakırla kaplanıyor! Bu kez elektrik akımı, kendiliğinden yürümeyen bir tepkimeyi zorla yürütüyor. Akım ne kadar uzun ve güçlüyse kalkana o kadar çok metal birikir. Faraday bu ilişkiyi tek bir sayıya bağladı: 96 500 coulomb." },
      points: [
        "Elektrolizde elektrik enerjisi kullanılarak kendiliğinden yürümeyen bir redoks tepkimesi gerçekleştirilir.",
        "Elektrolitik hücrede de anotta yükseltgenme, katotta indirgenme olur. Ama burada anot (+), katot (−) kutuptur.",
        "1 mol elektronun yükü 1 Faraday = 96 500 C'dur. Yük (Q) = akım (I) · zaman (t)",
        "Cu²⁺ + 2e⁻ → Cu: 2 mol e⁻ ile 1 mol (63,5 g) bakır birikir.",
        "Demirin paslanması (korozyon) için O2 ve su gerekir. Boyama, galvanizleme (Zn kaplama) ve kurban anot (Mg) korozyonu önler."
      ],
      formulas: [
        { n: "Faraday", eq: "n(e⁻) = I · t / 96500", note: "0,2 mol e⁻ ile Cu²⁺ → Cu: 0,1 mol = 6,35 g Cu", c: "amber" }
      ],
      tip: "Elektroliz hesaplarında önce geçen elektronun molünü bul, sonra yarı tepkimedeki elektron sayısına göre metalin molüne geç.",
      exp: "kaplanan-kalkan",
      qs: [
        { q: "1 mol elektronun taşıdığı elektrik yükü kaç coulombdur?", o: ["1", "6,02·10²³", "9650", "96 500", "1,6·10⁻¹⁹"], a: 3, e: "1 mol elektronun yükü 1 Faraday'dır ve yaklaşık 96 500 C'a eşittir." },
        { q: "CuSO4 çözeltisinin elektrolizinde devreden 0,2 mol elektron geçtiğinde katotta kaç gram bakır birikir? (Cu: 63,5)", o: ["3,175", "6,35", "12,7", "31,75", "63,5"], a: 1, e: "Cu²⁺ + 2e⁻ → Cu. 0,2 mol e⁻ ile 0,1 mol Cu birikir: 0,1 · 63,5 = 6,35 g." },
        { q: "NaCl eriyiğinin elektrolizinde katotta hangi madde oluşur?", o: ["Cl2 gazı", "Na metali", "H2 gazı", "O2 gazı", "NaOH"], a: 1, e: "Eriyikte su olmadığı için katotta Na⁺ iyonları indirgenir: Na⁺ + e⁻ → Na. Anotta Cl2 oluşur." },
        { q: "Demir eşyaların çinko ile kaplanarak korozyondan korunmasına ne ad verilir?", o: ["Elektroliz", "Galvanizleme", "Kalsinasyon", "Damıtma", "Süblimleşme"], a: 1, e: "Çinko demirden daha aktiftir. Çinko kaplama hem bariyer oluşturur hem de demirin yerine kendisi yükseltgenir." },
        { q: "Demirin paslanması için aşağıdakilerden hangileri birlikte gereklidir?", o: ["Yalnız su", "Yalnız oksijen", "Oksijen ve su", "Azot ve su", "Karbondioksit ve azot"], a: 2, e: "Demir yalnızca nemli ve oksijenli ortamda paslanır. Kuru havada ya da oksijensiz suda paslanma çok yavaştır." }
      ]
    },
    {
      id: "12-4", theme: "karbon", icon: "💠",
      title: "Karbon Kimyasına Giriş",
      sub: "Organik–anorganik bileşikler, basit ve molekül formülü, karbonun allotropları, hibritleşme ve bağ yapısı",
      subtopics: ["Anorganik ve organik bileşikler", "Basit formül ve molekül formülü", "Doğada karbon: elmas, grafit, fulleren, grafen", "Lewis formülleri", "Hibritleşme ve molekül geometrisi"],
      story: { t: "Karbonun dört yüzü", p: "Aqualf'ın masasında dört hazine duruyor: parlayan bir elmas, kurşun kalem ucundaki grafit, futbol topu biçiminde bir fulleren ve tek atom kalınlığında bir grafen yaprağı. Hepsi yalnızca karbondan oluşuyor! Karbon dört bağ yapabilir, kendisiyle uzun zincirler ve halkalar kurabilir. Bu yüzden milyonlarca organik bileşik vardır." },
      points: [
        "Organik bileşikler karbonun genellikle H, O, N gibi atomlarla oluşturduğu bileşiklerdir. CO, CO2, karbonatlar ve siyanürler anorganik kabul edilir.",
        "Basit (kaba) formül, atomların en küçük tam sayılı oranıdır. Molekül formülü gerçek atom sayılarını gösterir: C6H12O6 → CH2O.",
        "Molekül formülü = (basit formül)n; n = mol kütlesi / basit formül kütlesi.",
        "Elmas, grafit, fulleren ve grafen karbonun allotroplarıdır. Grafit elektriği iletir, elmas iletmez.",
        "sp³ hibritleşmede 109,5° (CH4), sp²'de 120° (C2H4), sp'de 180° (C2H2) bağ açısı vardır."
      ],
      formulas: [
        { n: "Formül Bulma", eq: "%80 C, %20 H → C: 80/12 = 6,67 · H: 20/1 = 20 → 1 : 3 → CH3", note: "MA = 30 ise n = 30/15 = 2 → C2H6", c: "emerald" }
      ],
      tip: "Formül sorularında yüzdeleri mol oranına çevir, en küçüğe böl, tam sayıya yuvarla. Sonra mol kütlesiyle n'yi bul.",
      exp: "karbonun-yuzleri",
      qs: [
        { q: "Aşağıdaki bileşiklerden hangisi anorganik kabul edilir?", o: ["CH4", "C2H5OH", "CO2", "C6H6", "CH3COOH"], a: 2, e: "CO2, karbon içermesine rağmen karbon oksitleri anorganik bileşik grubunda yer alır." },
        { q: "Glikozun (C6H12O6) basit formülü hangisidir?", o: ["C6H12O6", "CHO", "CH2O", "C2H4O2", "C3H6O3"], a: 2, e: "6 : 12 : 6 oranı en sade hâliyle 1 : 2 : 1'dir. Basit formül CH2O'dur." },
        { q: "Kütlece %80 C ve %20 H içeren bir hidrokarbonun mol kütlesi 30 g/mol'dür. Molekül formülü hangisidir? (C: 12, H: 1)", o: ["CH3", "C2H4", "C2H6", "C3H8", "CH4"], a: 2, e: "C: 80/12 ≈ 6,67, H: 20 → oran 1 : 3 → CH3 (15 g/mol). n = 30/15 = 2 → C2H6." },
        { q: "Aşağıdakilerden hangisi karbonun bir allotropu değildir?", o: ["Elmas", "Grafit", "Fulleren", "Grafen", "Kireç taşı"], a: 4, e: "Kireç taşı (CaCO3) bir karbon bileşiğidir. Allotroplar ise yalnızca aynı elementin atomlarından oluşan farklı yapılardır." },
        { q: "CH4 molekülündeki karbon atomunun hibritleşme türü ve bağ açısı hangisidir?", o: ["sp, 180°", "sp², 120°", "sp³, 109,5°", "sp³, 90°", "sp², 109,5°"], a: 2, e: "Karbon dört tekli bağ yaptığı için sp³ hibritleşmiştir. Molekül düzgün dörtyüzlüdür ve bağ açısı 109,5°'dir." }
      ]
    },
    {
      id: "12-5", theme: "organik", icon: "⛓️",
      title: "Hidrokarbonlar",
      sub: "Alkanlar, alkenler, alkinler ve aromatik hidrokarbonlar; adlandırma ve izomeri",
      subtopics: ["Alkanlar: genel formül, adlandırma, özellikler", "Alkenler: çift bağ, katılma tepkimeleri", "Alkinler: üçlü bağ", "Aromatik hidrokarbonlar (benzen)", "Yapı ve geometrik (cis-trans) izomeri"],
      story: { t: "Rengini kaybeden iksir", p: "Aqualf iki gaz kabına birkaç damla kırmızı-kahve bromlu su damlatıyor. Etan gazının bulunduğu kapta renk değişmiyor ama eten gazının bulunduğu kapta iksir bir anda renksizleşiyor! Etendeki çift bağ açılarak bromu yakaladı. Doymamış hidrokarbonları tanımanın en eski sırrı budur." },
      points: [
        "Alkanlar (CnH2n+2) yalnızca tekli bağ içeren doymuş hidrokarbonlardır ve yer değiştirme tepkimeleri verir.",
        "Alkenler (CnH2n) en az bir C=C çift bağı içerir. Br2, H2, H2O ile katılma tepkimesi verir ve bromlu suyu renksizleştirir.",
        "Alkinler (CnH2n−2) en az bir C≡C üçlü bağı içerir. Üçlü bağda 1 sigma ve 2 pi bağı vardır.",
        "Adlandırmada en uzun zincir seçilir, numaralandırma çoklu bağa ve dallanmaya en küçük numarayı verecek şekilde yapılır: CH3–CH=CH–CH3 → 2-büten.",
        "Aynı molekül formülüne sahip farklı yapılara izomer denir. C4H10'un 2 yapı izomeri vardır: bütan ve 2-metilpropan."
      ],
      formulas: [
        { n: "Katılma", eq: "CH2=CH2 + Br2 → CH2Br–CH2Br", note: "Kırmızı-kahve brom rengi kaybolur.", c: "rose" }
      ],
      tip: "Bir hidrokarbonun doymuş olup olmadığını bulmak için formülü CnH2n+2 ile karşılaştır. 2 H eksik olması bir çift bağ veya bir halka anlamına gelir.",
      exp: "rengini-kaybeden-iksir",
      qs: [
        { q: "Alkanların genel formülü hangisidir?", o: ["CnH2n", "CnH2n−2", "CnH2n+2", "CnHn", "CnH2n+1OH"], a: 2, e: "Alkanlar doymuş hidrokarbonlardır ve genel formülleri CnH2n+2'dir (CH4, C2H6, C3H8…)." },
        { q: "CH3–CH=CH–CH3 bileşiğinin IUPAC adı hangisidir?", o: ["1-büten", "2-büten", "Bütan", "2-bütin", "Propen"], a: 1, e: "4 karbonlu zincir 'büt', çift bağ '-en' ekiyle gösterilir. Çift bağ 2. karbonda başladığı için ad 2-bütendir." },
        { q: "Aşağıdaki gazlardan hangisi bromlu suyun kırmızı-kahve rengini giderir?", o: ["Metan", "Etan", "Propan", "Eten", "Bütan"], a: 3, e: "Eten (CH2=CH2) bir alkendir. Çift bağı Br2 ile katılma tepkimesi verir ve brom rengi kaybolur." },
        { q: "C4H10 molekül formülüne sahip kaç farklı yapı izomeri vardır?", o: ["1", "2", "3", "4", "5"], a: 1, e: "Düz zincirli bütan ve dallanmış 2-metilpropan (izobütan) olmak üzere 2 yapı izomeri vardır." },
        { q: "Etin (asetilen, HC≡CH) molekülünde iki karbon atomu arasındaki bağ için hangisi doğrudur?", o: ["1 sigma bağı", "2 sigma bağı", "1 sigma, 1 pi bağı", "1 sigma, 2 pi bağı", "3 pi bağı"], a: 3, e: "Üçlü bağ 1 sigma (σ) ve 2 pi (π) bağından oluşur. Karbonlar sp hibritleşmiştir ve molekül doğrusaldır." }
      ]
    },
    {
      id: "12-6", theme: "organik", icon: "🍷",
      title: "Fonksiyonel Gruplar I: Alkoller ve Eterler",
      sub: "Alkollerin sınıflandırılması, adlandırma, fiziksel özellikler, yükseltgenme tepkimeleri; eterler",
      subtopics: ["Alkollerin sınıflandırılması (primer, sekonder, tersiyer)", "Alkollerin adlandırılması ve fiziksel özellikleri", "Alkollerin yükseltgenmesi", "Eterler ve fonksiyonel grup izomerisi"],
      story: { t: "Turuncudan yeşile", p: "Aqualf üç küçük şişedeki alkolün üzerine turuncu potasyum dikromat çözeltisi damlatıyor. Birinci ve ikinci şişede renk zümrüt yeşiline dönüyor, üçüncüde turuncu kalıyor. Primer ve sekonder alkoller yükseltgendi, tersiyer alkol ise direndi! Yükseltgenen karbonun üzerinde hidrojen yoksa tepkime yürümez." },
      points: [
        "Alkollerin fonksiyonel grubu –OH'dir. OH grubunun bağlı olduğu karbona bağlı karbon sayısına göre primer (1°), sekonder (2°) veya tersiyer (3°) olarak sınıflandırılır.",
        "Alkoller molekülleri arasında hidrojen bağı yaptığı için benzer kütleli eter ve alkanlardan daha yüksek kaynama noktasına sahiptir.",
        "Primer alkol yükseltgenince önce aldehit, sonra karboksilik asit oluşur. Sekonder alkol yükseltgenince keton oluşur. Tersiyer alkol yükseltgenmez.",
        "Eterlerin genel formülü R–O–R'dir. Dimetil eter (CH3–O–CH3) ile etanol (C2H5OH) fonksiyonel grup izomeridir.",
        "Etanol fermantasyonla elde edilir ve dezenfektan, yakıt ve çözücü olarak kullanılır. Metanol çok zehirlidir."
      ],
      formulas: [
        { n: "Yükseltgenme Zinciri", eq: "CH3CH2OH → CH3CHO → CH3COOH", note: "Etanol → etanal → etanoik asit", c: "amber" }
      ],
      tip: "Alkol sınıfını bulmak için –OH'nin bağlı olduğu karbonun kaç karbona bağlı olduğunu say: 1 → primer, 2 → sekonder, 3 → tersiyer.",
      exp: "turuncudan-yesile",
      qs: [
        { q: "Aşağıdaki alkollerden hangisi sekonder (2°) alkoldür?", o: ["Metanol", "Etanol", "1-propanol", "2-propanol", "2-metil-2-propanol"], a: 3, e: "2-propanolde (CH3–CHOH–CH3) –OH'nin bağlı olduğu karbon iki karbona bağlıdır. Bu yüzden sekonder alkoldür." },
        { q: "Etanolün kaynama noktasının (78 °C) aynı mol kütleli dimetil eterden (−24 °C) çok yüksek olmasının nedeni nedir?", o: ["Etanolün iyonik olması", "Etanol molekülleri arasında hidrojen bağı bulunması", "Dimetil eterin daha ağır olması", "Etanolde London kuvvetlerinin olmaması", "Dimetil eterin polar olmaması"], a: 1, e: "Etanoldeki –OH grubu molekülleri arasında hidrojen bağı oluşturur. Dimetil eterde O'ya bağlı H olmadığı için hidrojen bağı oluşmaz." },
        { q: "Primer bir alkol tam olarak yükseltgendiğinde sırasıyla hangi bileşikler oluşur?", o: ["Keton → karboksilik asit", "Aldehit → karboksilik asit", "Eter → ester", "Keton → aldehit", "Alken → alkan"], a: 1, e: "Primer alkol önce aldehite, ardından karboksilik aside yükseltgenir." },
        { q: "Aşağıdaki alkollerden hangisi asitlendirilmiş potasyum dikromat ile yükseltgenmez?", o: ["Etanol", "1-bütanol", "2-bütanol", "2-metil-2-propanol", "Metanol"], a: 3, e: "2-metil-2-propanol tersiyer alkoldür. –OH'nin bağlı olduğu karbonda hidrojen bulunmadığı için yükseltgenmez." },
        { q: "C2H6O molekül formülüne sahip etanol ve dimetil eter için hangisi doğrudur?", o: ["Aynı bileşiğin iki adıdır", "Fonksiyonel grup izomerleridir", "Geometrik izomerdir", "Fiziksel özellikleri aynıdır", "İkisi de karboksilik asittir"], a: 1, e: "İkisinin molekül formülü aynıdır ama fonksiyonel grupları (alkol –OH, eter –O–) farklıdır. Bunlara fonksiyonel grup izomeri denir." }
      ]
    },
    {
      id: "12-7", theme: "organik", icon: "🍎",
      title: "Fonksiyonel Gruplar II: Karbonil Bileşikleri, Asitler ve Esterler",
      sub: "Aldehitler ve ketonlar, karboksilik asitler, esterleşme, Tollens testi, günlük hayatta organik bileşikler",
      subtopics: ["Aldehitler ve ketonlar (karbonil grubu)", "Aldehitlerin yükseltgenmesi ve Tollens testi", "Karboksilik asitler", "Esterler ve esterleşme tepkimesi", "Amin, amit ve polimerlere giriş"],
      story: { t: "Elma kokulu iksir", p: "Aqualf bir şişeye sirke asidi, diğerine alkol koyuyor, ikisini birleştirip birkaç damla derişik sülfürik asitle ısıtıyor. Atölyeyi taze meyve kokusu sarıyor! Asit ve alkol birleşerek bir ester oluşturdu. Muzun, ananasın ve elmanın kokusunun sırrı da esterlerdir. Ardından gümüş nitrat ve amonyaklı bir çözeltiyle bir aldehiti ısıtıyor; tüpün içi aynaya dönüyor." },
      points: [
        "Karbonil grubu (C=O) karbon zincirinin ucundaysa aldehit (–CHO), zincirin içindeyse keton (–CO–) oluşur.",
        "Aldehitler kolay yükseltgenir ve Tollens ayıracıyla gümüş aynası oluşturur. Ketonlar bu testi vermez.",
        "Karboksilik asitlerin fonksiyonel grubu –COOH'dir. Sirkedeki asetik asit (etanoik asit) CH3COOH'dir.",
        "Esterleşme: karboksilik asit + alkol ⇌ ester + su (asit katalizörlü, tersinir).",
        "Esterler adlandırılırken önce alkolden gelen alkil grubu, sonra asitten gelen kısım okunur: CH3COOC2H5 → etil etanoat (etil asetat)."
      ],
      formulas: [
        { n: "Esterleşme", eq: "CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O", note: "Etanoik asit + etanol → etil etanoat + su", c: "emerald" }
      ],
      tip: "Ester adlandırmasında formülde O'dan sonra gelen kısım alkolden (alkil), C=O içeren kısım asitten gelir.",
      exp: "elma-kokulu-iksir",
      qs: [
        { q: "Aldehitlerin fonksiyonel grubu hangisidir?", o: ["–OH", "–COOH", "–CHO", "–O–", "–NH2"], a: 2, e: "Aldehitlerde karbonil grubu zincir ucundadır ve –CHO şeklinde gösterilir." },
        { q: "Bir karboksilik asidin bir alkol ile asit katalizörlüğünde tepkimesinden hangi maddeler oluşur?", o: ["Eter ve su", "Ester ve su", "Aldehit ve hidrojen", "Keton ve su", "Alken ve su"], a: 1, e: "Bu tepkime esterleşmedir: RCOOH + R'OH ⇌ RCOOR' + H2O." },
        { q: "Tollens ayıracı ile gümüş aynası testi hangi iki bileşik sınıfını birbirinden ayırt etmek için kullanılır?", o: ["Alkan – alken", "Aldehit – keton", "Alkol – eter", "Asit – baz", "Ester – amin"], a: 1, e: "Aldehitler Ag⁺'yı metalik gümüşe indirgeyerek ayna oluşturur. Ketonlar bu tepkimeyi vermez." },
        { q: "Sirkenin ekşi tadını veren asetik asidin IUPAC adı ve formülü hangisidir?", o: ["Metanoik asit, HCOOH", "Etanoik asit, CH3COOH", "Propanoik asit, C2H5COOH", "Etanol, C2H5OH", "Etanal, CH3CHO"], a: 1, e: "Asetik asidin sistematik adı etanoik asittir ve formülü CH3COOH'dir." },
        { q: "CH3COOCH2CH3 bileşiğinin adı hangisidir?", o: ["Metil propanoat", "Etil etanoat", "Etil metanoat", "Propil etanoat", "Dietil eter"], a: 1, e: "O'ya bağlı etil grubu alkolden (etil), CH3CO– kısmı etanoik asitten (etanoat) gelir: etil etanoat." }
      ]
    },
    {
      id: "12-8", theme: "enerji", icon: "☀️",
      title: "Enerji Kaynakları ve Bilimsel Gelişmeler",
      sub: "Fosil yakıtlar, alternatif enerji kaynakları, hidrojen yakıt pilleri, biyoyakıtlar, sürdürülebilirlik",
      subtopics: ["Fosil yakıtlar (kömür, petrol, doğal gaz) ve çevresel etkileri", "Alternatif enerji kaynakları (güneş, rüzgâr, jeotermal, hidroelektrik, nükleer)", "Hidrojen enerjisi ve yakıt pilleri", "Biyoyakıtlar (biyodizel, biyoetanol)", "Sürdürülebilirlik ve nanoteknoloji"],
      story: { t: "Yakıtların yarışı", p: "Aqualf dört küçük lambaya farklı yakıtlar koyuyor: odun alkolü, gazyağı, doğal gaz ve hidrojen. Her lambanın üstünde aynı miktar su ısınıyor. Hidrojen lambası suyu en hızlı ısıtıyor ve geriye yalnızca su buharı bırakıyor! Fosil yakıtlar güçlüdür ama karbondioksit salar. Geleceğin enerjisi temiz, yenilenebilir ve verimli olmalıdır." },
      points: [
        "Fosil yakıtlar (kömür, petrol, doğal gaz) yenilenemez. Yanmalarıyla CO2, SO2 ve NOx salınır; sera etkisi ve asit yağmurlarına yol açar.",
        "Doğal gazın ana bileşeni metandır (CH4). Fosil yakıtlar arasında birim enerji başına en az CO2 salan yakıttır.",
        "Hidrojen yakıt pilinde H2 ve O2'nin tepkimesiyle elektrik üretilir; tek ürün sudur: 2H2 + O2 → 2H2O.",
        "Biyodizel, bitkisel yağların alkolle transesterleşmesiyle elde edilir. Biyoetanol, şekerlerin fermantasyonuyla üretilir.",
        "Güneş pillerinde yarı iletken silisyum kullanılır. Nanoteknoloji panellerin verimini artırmaya yardım eder."
      ],
      formulas: [
        { n: "Yakıt Pili", eq: "Anot: 2H2 → 4H⁺ + 4e⁻ · Katot: O2 + 4H⁺ + 4e⁻ → 2H2O", note: "Toplam: 2H2 + O2 → 2H2O + elektrik enerjisi", c: "aqua" }
      ],
      tip: "Enerji sorularında 'yenilenebilir mi?' ve 'karbon salımı var mı?' sorularını sor. Hidrojen bir enerji taşıyıcısıdır; ne kadar temiz olduğu üretim yöntemine bağlıdır.",
      exp: "yakitlarin-yarisi",
      qs: [
        { q: "Aşağıdakilerden hangisi bir fosil yakıt değildir?", o: ["Taş kömürü", "Petrol", "Doğal gaz", "Linyit", "Hidrojen"], a: 4, e: "Hidrojen fosil yakıt değildir. Sudan veya biyokütleden elde edilebilen bir enerji taşıyıcısıdır." },
        { q: "Hidrojen–oksijen yakıt pilinin çalışması sonucu oluşan tek kimyasal ürün hangisidir?", o: ["CO2", "Su (H2O)", "Metan", "Ozon", "Azot oksit"], a: 1, e: "Yakıt pilinde 2H2 + O2 → 2H2O tepkimesi gerçekleşir. Elektrik üretilirken yalnızca su oluşur." },
        { q: "Biyodizel genellikle hangi yöntemle üretilir?", o: ["Ham petrolün damıtılmasıyla", "Bitkisel yağların alkolle transesterleşmesiyle", "Kömürün gazlaştırılmasıyla", "Suyun elektroliziyle", "Uranyumun bölünmesiyle"], a: 1, e: "Bitkisel ya da atık yağlar metanol veya etanolle katalizör varlığında tepkimeye sokulur ve yağ asidi esterleri (biyodizel) oluşur." },
        { q: "Güneş pillerinde ışığı elektriğe dönüştürmek için en yaygın kullanılan yarı iletken element hangisidir?", o: ["Demir", "Bakır", "Silisyum", "Kurşun", "Kükürt"], a: 2, e: "Silisyum (Si) yarı iletkendir ve fotovoltaik hücrelerde en yaygın kullanılan malzemedir." },
        { q: "Doğal gazın ana bileşeni hangisidir?", o: ["Etan", "Propan", "Bütan", "Metan", "Hidrojen"], a: 3, e: "Doğal gazın büyük kısmı (%85–95) metandan (CH4) oluşur." }
      ]
    }
  ]
};
