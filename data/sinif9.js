/* Sorchemist · 9. Sınıf Kimya — Türkiye Yüzyılı Maarif Modeli (2024) öğretim programına göre.
   Soru biçimi: { q: soru, o: [A..E], a: doğru şık indeksi (0'dan), e: çözüm açıklaması } */
window.SC_GRADES = window.SC_GRADES || {};
window.SC_GRADES[9] = {
  grade: 9,
  label: "9. Sınıf",
  program: "Türkiye Yüzyılı Maarif Modeli (2024)",
  welcome: "Lise 1 parşömenleri açılıyor! Kimyanın hayatın her yerinde olduğunu keşfedecek, atomun içine bakacak, bağların görünmez köprülerini kuracak ve dünyayı koruyan yeşil kimyayı öğreneceksin.",
  themes: [
    { id: "etkilesim", name: "Etkileşim", hours: 22, desc: "Kimya ve hayat, atom modelleri, periyodik özellikler" },
    { id: "cesitlilik", name: "Çeşitlilik", hours: 38, desc: "Güçlü ve zayıf etkileşimler, maddenin hâlleri, sıvıların özellikleri" },
    { id: "surdurulebilirlik", name: "Sürdürülebilirlik", hours: 8, desc: "Nanoteknoloji ve yeşil kimya" }
  ],
  topics: [
    {
      id: "9-1", theme: "etkilesim", icon: "⚗️",
      title: "Kimya Hayattır",
      sub: "Simyadan kimyaya, kimyanın alt disiplinleri, kariyer alanları ve laboratuvar güvenliği",
      subtopics: ["Simyadan bilim olarak kimyaya geçiş", "Kimyanın alt disiplinleri (analitik, organik, anorganik, fizikokimya, biyokimya, polimer)", "Kimyayla ilgili meslekler", "Laboratuvar güvenlik kuralları ve tehlike piktogramları"],
      story: { t: "Cabir'in imbiğinden Lavoisier'in terazisine", p: "Hobbit köyündeki ahşap atölyede bir simyacı çırağısın. Ustan değersiz metalleri altına çevirmeye çalışıyor ama başaramıyor. Yine de bu uğraş boşa gitmiyor: damıtma, süzme ve kristallendirme gibi teknikler, barut, mürekkep ve tunç gibi maddeler bu atölyelerde doğuyor. Sonra Boyle ve Lavoisier geliyor; deneyler ölçülüyor, kaydediliyor ve tekrarlanıyor. Simya, bilimsel yönteme dayanan kimyaya dönüşüyor." },
      points: [
        "Simya deneme-yanılmaya dayanır ve sistematik değildir. Kimya ise gözlem, deney, ölçüm ve tekrarlanabilirliğe dayanan bir bilimdir.",
        "Analitik kimya maddelerin nitel ve nicel bileşimini belirler. Organik kimya karbon bileşiklerini, biyokimya canlılardaki kimyasal süreçleri inceler.",
        "Fizikokimya, kimyasal olayların enerji, hız ve denge gibi fiziksel yönlerini inceler.",
        "Tehlike piktogramları maddenin risklerini gösterir: alev yanıcıyı, alevli daire oksitleyiciyi, kafatası akut zehirliliği, aşınan el aşındırıcılığı belirtir.",
        "Asit seyreltilirken asit suyun üzerine yavaşça eklenir; tersi yapılmaz."
      ],
      formulas: [
        { n: "Altın Kural", eq: "Önce su, sonra asit → asit suya, damla damla", note: "Su asidin üzerine dökülürse açığa çıkan ısı ani kaynamaya ve sıçramaya yol açabilir.", c: "amber" }
      ],
      tip: "Sınavda simyanın katkıları sorulursa damıtma, süzme, barut, cam, seramik ve alaşım (tunç) aklına gelsin. Plastik, pil, deterjan ve elektroliz ise modern kimyanın ürünleridir.",
      exp: "guvenlik-muhru",
      qs: [
        { q: "Bir maddenin hangi elementlerden oluştuğunu ve bu elementlerin miktarlarını belirleyen kimya disiplini hangisidir?", o: ["Biyokimya", "Analitik kimya", "Organik kimya", "Polimer kimyası", "Fizikokimya"], a: 1, e: "Analitik kimya maddelerin nitel (ne var?) ve nicel (ne kadar var?) analizini yapar." },
        { q: "Laboratuvarda bir şişenin üzerinde içinde alev bulunan kırmızı çerçeveli eşkenar dörtgen piktogram görülüyor. Bu piktogram neyi belirtir?", o: ["Oksitleyici madde", "Patlayıcı madde", "Yanıcı madde", "Aşındırıcı madde", "Çevreye zararlı madde"], a: 2, e: "Yalnız alev sembolü yanıcı maddeyi gösterir. Oksitleyici maddelerde alev bir dairenin üzerindedir." },
        { q: "Aşağıdakilerden hangisi simyayı bilim olarak kimyadan ayıran özelliklerden biridir?", o: ["Deney yapılması", "Maddelerin ısıtılması", "Sistematik bilgi birikimine ve tekrarlanabilir deneylere dayanmaması", "Laboratuvar araç-gereci kullanılması", "Maddelerin karıştırılması"], a: 2, e: "Simyacılar da deney yapardı. Fark, simyanın bilimsel yönteme, ölçüme ve tekrarlanabilirliğe dayanmamasıdır." },
        { q: "Derişik sülfürik asit seyreltilirken aşağıdaki uygulamalardan hangisi doğrudur?", o: ["Asidin üzerine hızlıca su dökülür", "Asit, suyun üzerine karıştırılarak yavaş yavaş eklenir", "Asit ve su aynı anda kaba boşaltılır", "Asit önce ısıtılır, sonra su eklenir", "Seyreltme kapalı bir kapta yapılır"], a: 1, e: "Seyreltme ekzotermiktir. Asit suya yavaşça eklenirse açığa çıkan ısı büyük su kütlesine dağılır ve sıçrama önlenir." },
        { q: "Aşağıdakilerden hangisi kimyanın doğrudan ilgi alanlarından biri değildir?", o: ["Yeni ilaçların geliştirilmesi", "Gübre üretimi", "Gezegenlerin yörünge hareketlerinin hesaplanması", "İçme suyunun arıtılması", "Yeni malzemelerin tasarlanması"], a: 2, e: "Gezegenlerin yörünge hareketleri fizik ve astronominin konusudur. Diğerlerinin hepsi kimyanın uygulama alanıdır." }
      ]
    },
    {
      id: "9-2", theme: "etkilesim", icon: "⚛️",
      title: "Atom ve Atom Modelleri",
      sub: "Bohr atom modeli, modern atom teorisi, orbitaller ve elektron dizilimi",
      subtopics: ["Atom altı tanecikler", "Bohr atom modeli ve enerji seviyeleri", "Modern atom teorisi ve orbital kavramı (s, p, d, f)", "Elektron dizilimi (ilk 20 element)"],
      story: { t: "Fenerin içindeki renkler", p: "Aqualf, atölyedeki fenerin alevine bir tutam tuz serpiyor ve alev aniden sarıya dönüyor. Neden? Isınan atomlardaki elektronlar daha yüksek enerji seviyelerine sıçrar. Geri inerken aradaki enerjiyi belirli renkte ışık olarak yayarlar. Her elementin kendine özgü bir ışık imzası vardır. Bohr bu imzaları açıklamak için elektronları belirli enerji katmanlarına yerleştirdi; modern atom teorisi ise elektronların bulunma olasılığının yüksek olduğu bölgeleri, yani orbitalleri tanımladı." },
      points: [
        "Bohr modelinde elektronlar çekirdek çevresinde belirli enerji seviyelerinde bulunur. Elektron üst seviyeden alt seviyeye inerken ışık yayar, alttan üste çıkarken enerji soğurur.",
        "Bohr modeli hidrojen gibi tek elektronlu taneciklerin spektrumunu açıklar, çok elektronlu atomları açıklayamaz.",
        "Modern atom teorisinde elektronun kesin yörüngesi değil, bulunma olasılığının yüksek olduğu bölge (orbital) tanımlanır.",
        "Her orbitalde zıt spinli en fazla 2 elektron bulunur. s alt kabuğunda 1, p'de 3, d'de 5, f'de 7 orbital vardır.",
        "Elektronlar orbitallere düşük enerjiden yükseğe doğru yerleşir: 1s 2s 2p 3s 3p 4s…"
      ],
      formulas: [
        { n: "Elektron Dizilimi", eq: "11Na: 1s² 2s² 2p⁶ 3s¹", note: "Değerlik elektronu 3s¹ olduğundan Na, 3. periyot 1A grubundadır.", c: "aqua" },
        { n: "Işıma", eq: "Üst enerji seviyesi → alt enerji seviyesi + ışık (foton)", note: "Alev testindeki renklerin kaynağı budur.", c: "purple" }
      ],
      tip: "Bir iyonun elektron dizilimini yazarken önce nötr atomu yaz, sonra elektron ekle ya da çıkar. 17Cl⁻ iyonu 18 elektronludur ve Ar ile aynı dizilime sahiptir (izoelektronik).",
      exp: "alev-testi",
      qs: [
        { q: "Bohr atom modeline göre bir elektron 3. enerji seviyesinden 1. enerji seviyesine geçtiğinde aşağıdakilerden hangisi gerçekleşir?", o: ["Enerji soğurulur", "Işık şeklinde enerji yayılır", "Elektron atomdan kopar", "Çekirdeğin yükü değişir", "Atom numarası azalır"], a: 1, e: "Yüksek enerji seviyesinden düşük enerji seviyesine geçen elektron, aradaki enerji farkını ışık (foton) olarak yayar." },
        { q: "11Na atomunun temel hâl elektron dizilimi aşağıdakilerden hangisidir?", o: ["1s² 2s² 2p⁷", "1s² 2s² 2p⁶ 3s¹", "1s² 2s² 2p⁵ 3s²", "1s² 2s³ 2p⁶", "1s² 2s² 2p⁶ 3p¹"], a: 1, e: "11 elektron sırasıyla 1s², 2s², 2p⁶ ve 3s¹ orbitallerine yerleşir." },
        { q: "Bohr atom modeli aşağıdakilerden hangisini açıklayamaz?", o: ["Hidrojen atomunun çizgi spektrumunu", "Elektronların belirli enerji seviyelerinde bulunmasını", "Elektronun enerji soğurarak üst seviyeye çıkmasını", "Çok elektronlu atomların spektrumlarını", "He⁺ iyonunun spektrumunu"], a: 3, e: "Bohr modeli yalnızca tek elektronlu tanecikler (H, He⁺, Li²⁺) için başarılıdır." },
        { q: "Bir orbitalde en fazla kaç elektron bulunabilir?", o: ["1", "2", "3", "6", "8"], a: 1, e: "Bir orbitalde birbirine zıt spinli en fazla 2 elektron bulunabilir." },
        { q: "17Cl⁻ iyonu hangi soy gaz atomu ile aynı elektron dizilimine sahiptir?", o: ["2He", "10Ne", "18Ar", "36Kr", "Hiçbiri"], a: 2, e: "Cl⁻ iyonunda 17 + 1 = 18 elektron vardır: 1s² 2s² 2p⁶ 3s² 3p⁶. Bu dizilim 18Ar ile aynıdır." }
      ]
    },
    {
      id: "9-3", theme: "etkilesim", icon: "🧭",
      title: "Periyodik Tablo ve Periyodik Özellikler",
      sub: "İlk 20 element üzerinden periyot-grup bulma, atom yarıçapı, iyonlaşma enerjisi, elektronegatiflik",
      subtopics: ["Elektron diziliminden periyot ve grup bulma", "Atom yarıçapı", "İyonlaşma enerjisi", "Elektronegatiflik", "Metal, ametal ve soy gazların özellikleri"],
      story: { t: "Aqualf'ın kristal haritası", p: "Atölyenin duvarında 20 kristal küre asılı. Aqualf her birine dokunduğunda kürelerin boyu ve parlaklığı değişiyor. Soldan sağa gittikçe küreler küçülüyor; çekirdek elektronları daha güçlü çekiyor. Yukarıdan aşağı indikçe yeni katmanlar eklendiği için küreler büyüyor. Periyodik tablo, elementlerin bu düzenli davranışlarının haritasıdır." },
      points: [
        "Periyot numarası en yüksek enerji katmanının numarasıdır. Grup numarası (A grupları için) değerlik elektron sayısından bulunur.",
        "Aynı periyotta soldan sağa atom yarıçapı genellikle azalır; aynı grupta yukarıdan aşağı artar.",
        "İyonlaşma enerjisi, gaz hâlindeki atomdan bir elektron koparmak için gereken enerjidir. Periyotta soldan sağa genellikle artar, grupta aşağı inildikçe azalır.",
        "Elektronegatiflik, bağdaki elektronları çekme yeteneğidir. En elektronegatif element flordur (F).",
        "Soy gazların değerlik katmanı doludur. Bu yüzden kendi periyotlarında birinci iyonlaşma enerjisi en yüksek olan elementlerdir."
      ],
      formulas: [
        { n: "Konum Bulma", eq: "16S: 1s² 2s² 2p⁶ 3s² 3p⁴ → 3. periyot, 6A (16. grup)", note: "En yüksek katman 3 olduğu için 3. periyot; 3s² 3p⁴ ile 6 değerlik elektronu olduğu için 6A grubu.", c: "emerald" }
      ],
      tip: "Periyodik tabloda sağ üst köşeye doğru (soy gazlar hariç) iyonlaşma enerjisi ve elektronegatiflik artar, atom yarıçapı ise sol alt köşeye doğru artar.",
      exp: "kristal-harita",
      qs: [
        { q: "16S elementinin periyodik tablodaki yeri aşağıdakilerden hangisidir?", o: ["2. periyot 6A grubu", "3. periyot 4A grubu", "3. periyot 6A grubu", "4. periyot 6A grubu", "3. periyot 2A grubu"], a: 2, e: "16S: 1s² 2s² 2p⁶ 3s² 3p⁴. En yüksek katman 3 olduğu için 3. periyot; 6 değerlik elektronu olduğu için 6A grubundadır." },
        { q: "Aynı periyotta soldan sağa doğru gidildikçe atom yarıçapı genellikle nasıl değişir ve bunun nedeni nedir?", o: ["Artar; katman sayısı artar", "Azalır; çekirdek yükü artarken katman sayısı değişmez", "Değişmez; katman sayısı aynıdır", "Artar; elektron sayısı artar", "Azalır; katman sayısı azalır"], a: 1, e: "Periyotta katman sayısı aynı kalır ama proton sayısı artar. Çekirdeğin elektronları çekme gücü arttığı için yarıçap küçülür." },
        { q: "3Li, 11Na, 8O, 9F ve 17Cl elementlerinden elektronegatifliği en büyük olan hangisidir?", o: ["Li", "Na", "O", "F", "Cl"], a: 3, e: "Flor, periyodik tablonun en elektronegatif elementidir." },
        { q: "11Na, 12Mg, 13Al, 18Ar ve 19K atomlarından birinci iyonlaşma enerjisi en büyük olan hangisidir?", o: ["Na", "Mg", "Al", "Ar", "K"], a: 3, e: "Ar bir soy gazdır ve değerlik katmanı tam doludur. 3. periyotta birinci iyonlaşma enerjisi en yüksek olan elementtir. K ise 4. periyotta olduğu için en düşük değere sahiptir." },
        { q: "1A grubunda yukarıdan aşağı doğru inildikçe;\nI. atom yarıçapı artar,\nII. birinci iyonlaşma enerjisi azalır,\nIII. elektronegatiflik artar.\nyargılarından hangileri doğrudur?", o: ["Yalnız I", "Yalnız III", "I ve II", "II ve III", "I, II ve III"], a: 2, e: "Grupta aşağı inildikçe katman sayısı artar: yarıçap büyür, elektron koparmak kolaylaşır (iyonlaşma enerjisi azalır) ve elektronegatiflik azalır. III yanlıştır." }
      ]
    },
    {
      id: "9-4", theme: "cesitlilik", icon: "🔗",
      title: "Güçlü Etkileşimler: Kimyasal Bağlar",
      sub: "İyonik, kovalent (polar–apolar) ve metalik bağ",
      subtopics: ["Kimyasal bağın oluşumu ve enerji", "İyonik bağ ve iyonik bileşiklerin özellikleri", "Kovalent bağ: polar ve apolar kovalent bağ", "Metalik bağ ve metallerin özellikleri"],
      story: { t: "Görünmez köprüler", p: "Aqualf iki kristali birbirine yaklaştırıyor: biri sodyum, diğeri klor. Sodyum tek değerlik elektronunu verir, klor alır; zıt yüklü iyonlar birbirini güçlü bir şekilde çeker ve tuz kristali oluşur. Su molekülünde ise atomlar elektronlarını paylaşır. Ocaktaki demirde de artı yüklü metal iyonları serbestçe dolaşan bir elektron denizinin içinde durur. Bu yüzden metal hem iletken hem de dövülebilirdir." },
      points: [
        "İyonik bağ, genellikle metal ile ametal arasında elektron alışverişi sonucu oluşan zıt yüklü iyonlar arasındaki elektrostatik çekimdir.",
        "İyonik bileşikler katı hâlde elektriği iletmez; eriyik ve sulu çözelti hâlinde iyonlar serbest kaldığı için iletir.",
        "Kovalent bağ ametal atomları arasında elektron ortaklaşmasıyla oluşur. Aynı atomlar arasında apolar (H–H), farklı atomlar arasında polar (H–Cl) kovalent bağ vardır.",
        "Metalik bağ, pozitif metal iyonları ile serbest (delokalize) değerlik elektronları arasındaki çekimdir.",
        "Metallerin iletkenliği, parlaklığı, tel ve levha hâline getirilebilmesi metalik bağla açıklanır."
      ],
      formulas: [
        { n: "İyonik Bileşik Formülü", eq: "12Mg → Mg²⁺ , 9F → F⁻ ⇒ MgF2", note: "Toplam yük sıfır olmalıdır: (+2) + 2·(−1) = 0", c: "rose" }
      ],
      tip: "Bir bağın türünü belirlemek için önce atomların metal mi ametal mi olduğuna bak: metal + ametal genellikle iyonik, ametal + ametal kovalent, metal + metal ise metalik bağ yapar.",
      exp: "iletkenlik-kristali",
      qs: [
        { q: "Aşağıdaki bileşiklerden hangisinde iyonik bağ bulunur?", o: ["H2O", "CO2", "MgO", "CH4", "Cl2"], a: 2, e: "Mg bir metal, O bir ametaldir. Mg iki elektron verir, O iki elektron alır ve Mg²⁺ ile O²⁻ iyonları arasında iyonik bağ oluşur." },
        { q: "Metallerin elektriği iletmesi aşağıdakilerden hangisi ile açıklanır?", o: ["Ortaklaşılmış elektron çiftleri", "Hidrojen bağları", "Serbestçe hareket edebilen değerlik elektronları", "Kristal yapıdaki boşluklar", "Çekirdeklerin hareketi"], a: 2, e: "Metalik bağda değerlik elektronları belirli bir atoma bağlı değildir. Bu delokalize elektronlar elektrik akımını taşır." },
        { q: "Aşağıdaki moleküllerin hangisinde apolar kovalent bağ vardır?", o: ["HCl", "H2", "NH3", "H2O", "HF"], a: 1, e: "Aynı iki atom (H–H) arasındaki bağda elektronlar eşit paylaşılır. Bu bağ apolar kovalent bağdır." },
        { q: "Sodyum klorür (NaCl) ile ilgili;\nI. Katı hâlde elektriği iletmez.\nII. Sulu çözeltisi elektriği iletir.\nIII. Yapısında kovalent bağ vardır.\nyargılarından hangileri doğrudur?", o: ["Yalnız I", "Yalnız II", "I ve II", "II ve III", "I, II ve III"], a: 2, e: "NaCl iyonik bir bileşiktir. Katıda iyonlar sabit konumdadır ve iletmez; suda çözününce serbest iyonlar iletir. Yapısında kovalent bağ yoktur." },
        { q: "12Mg ve 9F elementleri arasında oluşan bileşiğin formülü aşağıdakilerden hangisidir?", o: ["MgF", "Mg2F", "MgF2", "Mg2F3", "MgF3"], a: 2, e: "Mg, 2 elektron vererek Mg²⁺; F, 1 elektron alarak F⁻ olur. Yüklerin dengesi için bileşik MgF2 olmalıdır." }
      ]
    },
    {
      id: "9-5", theme: "cesitlilik", icon: "🧩",
      title: "Lewis Yapıları, Polarlık ve Adlandırma",
      sub: "Lewis nokta yapıları, polar–apolar moleküller ve bileşiklerin adlandırılması",
      subtopics: ["Lewis elektron nokta yapıları", "Ortaklanmamış elektron çiftleri", "Molekül polarlığı", "İyonik ve kovalent bileşiklerin adlandırılması"],
      story: { t: "Bükülen su şelalesi", p: "Aqualf yün kumaşa sürttüğü kehribar asasını atölye çeşmesinden akan ince suya yaklaştırıyor; su asaya doğru bükülüyor! Aynı denemeyi yağ benzeri bir sıvıyla yaptığında hiçbir şey olmuyor. Su molekülü bükük yapıda olduğu için kısmi yükleri birbirini götürmez ve molekül polardır. Hekzan gibi simetrik moleküller ise apolardır." },
      points: [
        "Lewis yapısında değerlik elektronları nokta olarak gösterilir. Bağ yapan elektron çiftleri çizgiyle, bağ yapmayanlar nokta çifti olarak yazılır.",
        "NH3 molekülünde N atomu 3 bağ yapar ve 1 ortaklanmamış elektron çifti taşır.",
        "Molekülün polarlığı bağların polarlığına ve molekülün şekline bağlıdır. CO2 polar bağlar içerse de doğrusal ve simetrik olduğundan apolardır.",
        "H2O bükük yapıdadır ve polardır. CH4 düzgün dörtyüzlüdür ve apolardır.",
        "Kovalent bileşikler sayı ön ekleriyle adlandırılır: mono, di, tri, tetra, penta… Değişken değerlikli metaller Roma rakamıyla belirtilir: FeCl3, demir(III) klorür."
      ],
      formulas: [
        { n: "Adlandırma", eq: "N2O5 → diazot pentaoksit · FeCl3 → demir(III) klorür", note: "İyonik bileşiklerde ön ek kullanılmaz: Al2O3 alüminyum oksittir.", c: "purple" }
      ],
      tip: "Polarlık için kısayol: merkez atomda ortaklanmamış elektron çifti varsa (H2O, NH3) molekül genellikle polardır. Merkez atomun çevresindeki atomlar aynı ve simetrik dizilmişse (CH4, CO2, CCl4) molekül apolardır.",
      exp: "bukulen-sivi",
      qs: [
        { q: "NH3 molekülünün Lewis yapısında azot atomu ile ilgili hangisi doğrudur?", o: ["4 bağ yapar, ortaklanmamış elektron çifti yoktur", "3 bağ yapar, 1 ortaklanmamış elektron çifti vardır", "2 bağ yapar, 2 ortaklanmamış elektron çifti vardır", "3 bağ yapar, ortaklanmamış elektron çifti yoktur", "1 bağ yapar, 3 ortaklanmamış elektron çifti vardır"], a: 1, e: "N'nin 5 değerlik elektronu vardır. Üçü H atomlarıyla bağ yapar, kalan ikisi 1 ortaklanmamış elektron çifti oluşturur." },
        { q: "Aşağıdaki moleküllerden hangisi polardır?", o: ["CO2", "CH4", "H2O", "CCl4", "O2"], a: 2, e: "H2O bükük yapıdadır ve O üzerinde ortaklanmamış elektron çiftleri vardır. Bağ dipolleri birbirini götürmez ve molekül polardır." },
        { q: "N2O5 bileşiğinin adı aşağıdakilerden hangisidir?", o: ["Azot oksit", "Diazot pentaoksit", "Pentaazot dioksit", "Azot(V) oksit dioksit", "Nitrojen beşoksit"], a: 1, e: "Kovalent bileşiklerde atom sayıları Yunanca ön eklerle belirtilir: 2 N → diazot, 5 O → pentaoksit." },
        { q: "FeCl3 bileşiğinin sistematik adı aşağıdakilerden hangisidir?", o: ["Demir klorür", "Demir triklorür", "Demir(II) klorür", "Demir(III) klorür", "Ferro klorür"], a: 3, e: "Fe birden fazla iyon yükü alabilir. 3 Cl⁻ iyonu olduğu için demir +3 yüklüdür: demir(III) klorür." },
        { q: "Aşağıdaki bileşik–ad eşleştirmelerinden hangisi yanlıştır?", o: ["KNO3 – Potasyum nitrat", "Na2SO4 – Sodyum sülfat", "Mg(OH)2 – Magnezyum hidroksit", "CO – Karbon monoksit", "Al2O3 – Alüminyum dioksit"], a: 4, e: "Al2O3 iyonik bir bileşiktir ve ön ek almaz; doğru adı alüminyum oksittir." }
      ]
    },
    {
      id: "9-6", theme: "cesitlilik", icon: "💎",
      title: "Zayıf Etkileşimler ve Katılar",
      sub: "Moleküller arası etkileşimler, hidrojen bağı, amorf ve kristal katılar",
      subtopics: ["Van der Waals etkileşimleri (dipol–dipol, London kuvvetleri)", "Hidrojen bağı", "Zayıf etkileşimlerin fiziksel özelliklere etkisi", "Kristal ve amorf katılar"],
      story: { t: "Buz sarayı ve cam kubbe", p: "Aqualf iki şeyi aynı anda ısıtıyor: buz parçasından oyulmuş bir kale ve camdan bir kubbe. Buz tam 0 °C'de birden erimeye başlıyor ve tamamen eriyene kadar sıcaklığı değişmiyor. Cam ise belirli bir anda erimiyor; yavaş yavaş yumuşuyor. Buz düzenli bir kristal örgüye sahiptir, cam ise düzensiz yapılı amorf bir katıdır." },
      points: [
        "Moleküller arası etkileşimler, bağlara göre çok daha zayıf olan fiziksel çekimlerdir. Maddelerin erime-kaynama noktalarını belirler.",
        "London (dağılma) kuvvetleri tüm moleküller arasında bulunur ve apolar moleküllerde tek etkileşimdir. Molekül büyüdükçe güçlenir.",
        "Hidrojen bağı, F, O veya N'ye bağlı H atomu ile komşu moleküldeki F, O veya N atomu arasında oluşan güçlü bir etkileşimdir (H2O, NH3, HF).",
        "Kristal katılar düzenli yapıdadır ve belirli bir erime noktası vardır. Amorf katılar (cam, plastik, mum) düzensizdir ve bir sıcaklık aralığında yumuşar.",
        "Kristal türleri: iyonik (NaCl), kovalent ağ (elmas, grafit), moleküler (buz, iyot) ve metalik (bakır)."
      ],
      formulas: [
        { n: "Kaynama Noktası Sıralaması", eq: "H2O (100 °C) > H2S (−60 °C)", note: "H2O molekülleri arasında hidrojen bağı vardır; H2S'de yoktur.", c: "aqua" }
      ],
      tip: "Molekül kütlesi benzer olan maddelerde kaynama noktasını karşılaştırırken önce hidrojen bağına, sonra polarlığa, en son molekül büyüklüğüne (London kuvvetleri) bak.",
      exp: "erime-egrisi",
      qs: [
        { q: "Aşağıdaki maddelerin hangisinde molekülleri arasında hidrojen bağı bulunur?", o: ["CH4", "HCl", "H2O", "H2S", "CO2"], a: 2, e: "Hidrojen bağı için H'nin F, O veya N'ye bağlı olması gerekir. Yalnızca H2O bu koşulu sağlar." },
        { q: "London (dağılma) kuvvetleri ile ilgili hangisi doğrudur?", o: ["Yalnızca iyonlar arasında oluşur", "Yalnızca polar moleküllerde bulunur", "Tüm moleküller arasında bulunur, apolar moleküllerde tek etkileşimdir", "Kovalent bağdan daha güçlüdür", "Molekül büyüdükçe zayıflar"], a: 2, e: "London kuvvetleri anlık dipollerden kaynaklanır ve tüm moleküllerde vardır. Molekül büyüdükçe güçlenir." },
        { q: "Aşağıdakilerden hangisi amorf katıdır?", o: ["Sofra tuzu", "Elmas", "Buz", "Cam", "Bakır"], a: 3, e: "Camın tanecikleri düzensiz dizilmiştir. Belirli bir erime noktası yoktur, ısıtıldıkça yumuşar." },
        { q: "Aynı dış basınç altında aşağıdaki maddelerden hangisinin kaynama noktası en yüksektir?", o: ["H2S", "CH4", "Ne", "H2O", "H2"], a: 3, e: "H2O molekülleri arasındaki hidrojen bağları, diğer maddelerdeki zayıf etkileşimlerden çok daha güçlüdür." },
        { q: "Aşağıdaki katı türü–örnek eşleştirmelerinden hangisi yanlıştır?", o: ["NaCl – İyonik kristal", "Elmas – Kovalent ağ kristal", "Buz – Moleküler kristal", "Bakır – Metalik kristal", "Grafit – İyonik kristal"], a: 4, e: "Grafit, karbon atomlarının kovalent bağlarla oluşturduğu bir kovalent ağ kristalidir. İyon içermez." }
      ]
    },
    {
      id: "9-7", theme: "cesitlilik", icon: "💧",
      title: "Sıvıların Özellikleri",
      sub: "Buhar basıncı, kaynama noktası, viskozite, yüzey gerilimi, adezyon ve kohezyon",
      subtopics: ["Buharlaşma ve buhar basıncı", "Kaynama ve kaynama noktası", "Viskozite (akmaya karşı direnç)", "Yüzey gerilimi", "Adezyon, kohezyon ve kılcallık"],
      story: { t: "İksir yarışı", p: "Aqualf üç uzun cam tüpe su, zeytinyağı ve bal dolduruyor ve her birine aynı anda birer gümüş bilye bırakıyor. Bilye suda hızla düşüyor, balda ise ağır ağır iniyor. Bal ısıtıldığında yarış değişiyor; bilye hızlanıyor. Sıvıların akmaya karşı direnci olan viskozite, moleküller arası etkileşimlere ve sıcaklığa bağlıdır." },
      points: [
        "Buhar basıncı, kapalı kapta sıvısıyla dengedeki buharın yaptığı basınçtır. Sıcaklık arttıkça artar; moleküller arası etkileşim güçlendikçe azalır.",
        "Bir sıvı, buhar basıncı dış basınca eşit olduğunda kaynar. Dağda dış basınç düşük olduğu için su 100 °C'nin altında kaynar.",
        "Viskozite, moleküller arası etkileşim arttıkça artar, sıcaklık arttıkça azalır.",
        "Yüzey gerilimi, yüzeydeki moleküllerin içe doğru çekilmesinden kaynaklanır. Su damlalarının küresel olması ve iğnenin su üstünde durması bununla açıklanır.",
        "Adezyon farklı moleküller arasındaki, kohezyon aynı moleküller arasındaki çekimdir. Su cam boruda yükselir (adezyon > kohezyon); cıva ise alçalır."
      ],
      formulas: [
        { n: "Kaynama Koşulu", eq: "P(buhar) = P(dış) ⇒ kaynama", note: "Düdüklü tencerede dış basınç artar ve su 100 °C'nin üzerinde kaynar.", c: "amber" }
      ],
      tip: "Sorularda viskozite yalnızca sıcaklık ve etkileşim türüyle değişir; sıvının miktarına bağlı değildir. Buhar basıncı da sıvının miktarına ve kabın şekline bağlı değildir.",
      exp: "iksir-yarisi",
      qs: [
        { q: "Bir sıvının kaynama noktası ile ilgili hangisi doğrudur?", o: ["Sıvı miktarı arttıkça kaynama noktası yükselir", "Buhar basıncının dış basınca eşit olduğu sıcaklıktır", "Dış basınç azalınca kaynama noktası yükselir", "Tüm sıvılar 100 °C'de kaynar", "Kaynama sırasında sıcaklık sürekli artar"], a: 1, e: "Kaynama, sıvının buhar basıncı dış basınca eşit olduğunda başlar. Saf sıvılarda kaynama sırasında sıcaklık sabit kalır." },
        { q: "Balın ısıtılınca daha kolay akmasının nedeni aşağıdakilerden hangisidir?", o: ["Yüzey geriliminin artması", "Moleküller arası etkileşimlerin yenilerek viskozitenin azalması", "Buhar basıncının azalması", "Yoğunluğunun artması", "Kimyasal yapısının değişmesi"], a: 1, e: "Sıcaklık arttıkça moleküllerin kinetik enerjisi artar ve moleküller arası çekimler daha kolay yenilir. Böylece viskozite azalır." },
        { q: "Bir toplu iğnenin dikkatlice bırakıldığında su yüzeyinde batmadan durabilmesi hangi özellikle açıklanır?", o: ["Viskozite", "Buhar basıncı", "Yüzey gerilimi", "Adezyon", "Yoğunluk"], a: 2, e: "Su yüzeyindeki moleküller içe doğru çekilir ve yüzeyde gergin bir zar gibi davranan yüzey gerilimi oluşur." },
        { q: "İnce bir cam boruya konulan suyun boru içinde yükselmesinin nedeni aşağıdakilerden hangisidir?", o: ["Su–cam arasındaki adezyonun, su–su arasındaki kohezyondan büyük olması", "Kohezyonun adezyondan büyük olması", "Suyun yoğunluğunun camdan büyük olması", "Suyun buhar basıncının yüksek olması", "Atmosfer basıncının boruda düşük olması"], a: 0, e: "Su molekülleri camla hidrojen bağı benzeri güçlü çekimler kurar. Adezyon kohezyondan büyük olduğu için su kılcal boruda yükselir." },
        { q: "Yüksek bir dağın zirvesinde suyun 100 °C'nin altında kaynamasının nedeni nedir?", o: ["Suyun saflığının azalması", "Dış (atmosfer) basıncın düşük olması", "Havadaki oksijenin az olması", "Suyun buhar basıncının azalması", "Yer çekiminin artması"], a: 1, e: "Yükseklik arttıkça atmosfer basıncı azalır. Suyun buhar basıncı daha düşük bir sıcaklıkta dış basınca eşitlenir." }
      ]
    },
    {
      id: "9-8", theme: "surdurulebilirlik", icon: "🌱",
      title: "Nanoteknoloji ve Yeşil Kimya",
      sub: "Nanoparçacıklar ve çevresel etkileri, yeşil kimya ilkeleri, atık önleme",
      subtopics: ["Nano ölçek ve nanoparçacıkların özellikleri", "Metal ve alaşım nanoparçacıklarının çevresel etkileri", "Yeşil kimya ilkeleri", "Atık önleme ve sürdürülebilir üretim"],
      story: { t: "Rengini değiştiren altın", p: "Aqualf altını öyle küçük parçalara bölüyor ki her parça yalnızca birkaç yüz atomdan oluşuyor. Sarı altın bir anda yakut kırmızısına dönüyor! Nano boyutta maddelerin rengi, iletkenliği ve tepkimeye yatkınlığı değişir. Ancak bu güçlü minik tanecikler doğaya karışırsa canlılara zarar verebilir. Bu yüzden simyacılar loncası yeni bir yemin ediyor: atığı temizlemek yerine hiç üretmemek. Yeşil kimyanın özü budur." },
      points: [
        "Nano ölçek 1–100 nanometre (1 nm = 10⁻⁹ m) aralığıdır.",
        "Nanoparçacıkların yüzey alanı/hacim oranı çok büyüktür. Bu yüzden renk, iletkenlik ve tepkimeye girme yatkınlığı gibi özellikleri farklıdır.",
        "Gümüş ve diğer metal nanoparçacıkları antibakteriyel ürünlerde kullanılır. Atık sularla doğaya karışırsa faydalı mikroorganizmalara zarar verebilir.",
        "Yeşil kimyanın ilk ilkesi atık önlemedir: atığı oluştuktan sonra arıtmak yerine oluşmasını engellemek.",
        "Yeşil kimya; güvenli çözücüler, yenilenebilir hammaddeler, enerji verimliliği ve doğada parçalanabilen ürünler hedefler."
      ],
      formulas: [
        { n: "Ölçek", eq: "1 nm = 10⁻⁹ m · nano ölçek: 1–100 nm", note: "Bir saç telinin kalınlığı yaklaşık 80 000 nm'dir.", c: "emerald" }
      ],
      tip: "Yeşil kimya sorularında 'atığı önlemek, arıtmaktan iyidir' ilkesini hatırla. Zararlı çözücü kullanımını artıran ya da parçalanmayan ürün üreten seçenekler yeşil kimyaya aykırıdır.",
      exp: "nano-altin",
      qs: [
        { q: "Nanoteknolojide 'nano ölçek' olarak kabul edilen boyut aralığı hangisidir?", o: ["1–100 milimetre", "1–100 mikrometre", "1–100 nanometre", "1–100 pikometre", "100–1000 nanometre"], a: 2, e: "Nanoteknoloji, en az bir boyutu 1–100 nm aralığında olan malzemelerle ilgilenir." },
        { q: "Nanoparçacıkların aynı maddenin büyük parçalarından farklı özellikler göstermesinin temel nedeni nedir?", o: ["Atom numaralarının değişmesi", "Yüzey alanı/hacim oranının çok büyük olması", "Kimyasal formüllerinin değişmesi", "Yoğunluklarının sıfıra yaklaşması", "Kütlelerinin artması"], a: 1, e: "Taneciğin küçülmesiyle atomların büyük bölümü yüzeyde kalır. Yüzey alanı/hacim oranı arttıkça fiziksel ve kimyasal özellikler değişir." },
        { q: "Aşağıdakilerden hangisi yeşil kimyanın 'atık önleme' ilkesine uygundur?", o: ["Oluşan atığı arıtma tesisinde temizlemek", "Atığı denize boşaltmak", "Tepkimeyi, atık oluşmayacak şekilde tasarlamak", "Atığı yakarak yok etmek", "Atığı toprağa gömmek"], a: 2, e: "Yeşil kimyanın birinci ilkesine göre atığı oluştuktan sonra arıtmak yerine hiç oluşmamasını sağlamak gerekir." },
        { q: "Antibakteriyel çoraplarda kullanılan gümüş nanoparçacıklarının yıkama ile doğaya karışması hangi soruna yol açabilir?", o: ["Suyun donma noktasının yükselmesi", "Atık su arıtımında görev yapan faydalı mikroorganizmaların zarar görmesi", "Ozon tabakasının kalınlaşması", "Toprağın aşırı verimli hâle gelmesi", "Gümüşün altına dönüşmesi"], a: 1, e: "Gümüş nanoparçacıkları bakterileri öldürür. Doğada ve arıtma tesislerinde faydalı mikroorganizmalara da zarar verebilir." },
        { q: "Aşağıdakilerden hangisi bir yeşil kimya uygulaması değildir?", o: ["Su bazlı boyaların tercih edilmesi", "Doğada parçalanabilen ambalaj üretilmesi", "Tepkimelerin oda sıcaklığında yürütülmesi için katalizör geliştirilmesi", "Zehirli ve zor parçalanan çözücülerin kullanımının artırılması", "Yenilenebilir hammaddelerin kullanılması"], a: 3, e: "Yeşil kimya, zehirli ve kalıcı çözücülerin kullanımını azaltmayı hedefler." }
      ]
    }
  ]
};
