/* Sorchemist · 11. Sınıf Kimya — Türkiye Yüzyılı Maarif Modeli öğretim programına göre (2026-2027). */
window.SC_GRADES = window.SC_GRADES || {};
window.SC_GRADES[11] = {
  grade: 11,
  label: "11. Sınıf",
  program: "Türkiye Yüzyılı Maarif Modeli (2026)",
  welcome: "Lise 3, AYT Kimya'nın kalbidir! Tepkimelerin enerjisini ölçecek, hızını ayarlayacak, dengeyi Le Chatelier gibi yöneteceksin. Asit ve bazların savaşını titrasyonla kazanacak ve yeşil hidrojenin geleceğine bakacaksın.",
  themes: [
    { id: "etkilesim", name: "Etkileşim", hours: 48, desc: "Tepkimelerde enerji ve tepkime hızı" },
    { id: "cesitlilik", name: "Çeşitlilik", hours: 70, desc: "Kimyasal denge, asit-baz dengesi ve çözünürlük dengesi" },
    { id: "surdurulebilirlik", name: "Sürdürülebilirlik", hours: 20, desc: "Yeşil hidrojen, nanoteknoloji, mikro ve nanoplastikler" }
  ],
  topics: [
    {
      id: "11-1", theme: "etkilesim", icon: "🌡️",
      title: "Kimyasal Tepkimelerde Enerji",
      sub: "Endotermik–ekzotermik tepkimeler, bağ enerjileri, tepkime ve oluşum entalpileri, Hess yasası",
      subtopics: ["Fiziksel ve kimyasal olaylarda enerji değişimi", "Endotermik ve ekzotermik tepkimeler", "Bağ enerjileri", "Standart oluşum entalpisi", "Standart tepkime entalpisi ve Hess yasası"],
      story: { t: "Sıcak ve soğuk muskalar", p: "Aqualf'ın çantasında iki muska var. Birini sıktığında avucunu ısıtıyor, diğerini sıktığında buz gibi oluyor! İlkinde kalsiyum klorür suda çözünürken ısı veriyor (ekzotermik). Diğerinde amonyum nitrat çözünürken çevreden ısı alıyor (endotermik). Her tepkimenin bir enerji bilançosu vardır ve bu bilançonun adı entalpi değişimidir (ΔH)." },
      points: [
        "Ekzotermik tepkimelerde ısı açığa çıkar (ΔH < 0): yanma, nötralleşme, yoğuşma. Endotermik tepkimelerde ısı alınır (ΔH > 0): erime, buharlaşma, ayrışma.",
        "Bağ kırılması enerji gerektirir, bağ oluşumu enerji açığa çıkarır. ΔH = Σ(kırılan bağ enerjileri) − Σ(oluşan bağ enerjileri)",
        "Standart koşullarda elementlerin en kararlı hâllerinin oluşum entalpisi sıfırdır (O2(g), C(grafit), H2(g)).",
        "ΔH°(tepkime) = ΣΔH°f(ürünler) − ΣΔH°f(girenler)",
        "Hess yasası: Bir tepkimenin ΔH değeri tepkimenin izlediği yoldan bağımsızdır; ara basamakların ΔH'leri toplanabilir."
      ],
      formulas: [
        { n: "Oluşum Entalpisinden", eq: "ΔH° = ΣΔH°f(ürün) − ΣΔH°f(giren)", note: "CH4 + 2O2 → CO2 + 2H2O: ΔH = [−394 + 2(−286)] − (−75) = −891 kJ", c: "rose" },
        { n: "Bağ Enerjisinden", eq: "ΔH = ΣE(kırılan) − ΣE(oluşan)", note: "H2 + Cl2 → 2HCl: (436 + 243) − 2·432 = −185 kJ", c: "amber" }
      ],
      tip: "Tepkime ters çevrilince ΔH'nin işareti değişir, katsayılar n ile çarpılınca ΔH de n ile çarpılır. Hess sorularının hepsi bu iki kuralla çözülür.",
      exp: "sicak-soguk-muska",
      qs: [
        { q: "Aşağıdaki olaylardan hangisi endotermiktir?", o: ["Metanın yanması", "Asit ile bazın nötralleşmesi", "Su buharının yoğuşması", "Buzun erimesi", "Solunum"], a: 3, e: "Erime sırasında tanecikler arası çekimleri yenmek için dışarıdan ısı alınır (ΔH > 0)." },
        { q: "CH4(g) + 2O2(g) → CO2(g) + 2H2O(s) tepkimesinin ΔH değeri kaç kJ'dir? (ΔH°f: CH4 = −75, CO2 = −394, H2O(s) = −286 kJ/mol)", o: ["−605", "−891", "−966", "+891", "−755"], a: 1, e: "ΔH = [−394 + 2(−286)] − [−75 + 0] = −966 + 75 = −891 kJ." },
        { q: "H2(g) + Cl2(g) → 2HCl(g) tepkimesinin ΔH değeri kaç kJ'dir? (Bağ enerjileri: H–H = 436, Cl–Cl = 243, H–Cl = 432 kJ/mol)", o: ["−185", "+185", "−247", "+247", "−432"], a: 0, e: "ΔH = (436 + 243) − (2 · 432) = 679 − 864 = −185 kJ." },
        { q: "A → B ΔH1 = +50 kJ ve B → C ΔH2 = −120 kJ ise A → C tepkimesinin ΔH değeri kaç kJ'dir?", o: ["+170", "+70", "−70", "−170", "−6000"], a: 2, e: "Hess yasasına göre ΔH = ΔH1 + ΔH2 = 50 + (−120) = −70 kJ." },
        { q: "Aşağıdakilerden hangisinin standart oluşum entalpisi sıfırdır?", o: ["O3(g)", "H2O(s)", "CO2(g)", "O2(g)", "C(elmas)"], a: 3, e: "Standart koşullarda elementin en kararlı hâlinin oluşum entalpisi sıfırdır. Oksijenin en kararlı hâli O2(g)'dir. Karbonun en kararlı hâli ise elmas değil grafittir." }
      ]
    },
    {
      id: "11-2", theme: "etkilesim", icon: "💥",
      title: "Tepkime Hızı ve Çarpışma Teorisi",
      sub: "Tepkimelerin gerçekleşme şartları, etkin çarpışma, aktivasyon enerjisi, ortalama tepkime hızı",
      subtopics: ["Kimyasal tepkimelerin gerçekleşme şartları", "Çarpışma teorisi ve etkin çarpışma", "Aktivasyon enerjisi ve aktifleşmiş kompleks", "Tepkime hızı ve ortalama tepkime hızı", "Tepkime hızının ölçülmesi"],
      story: { t: "Tepe aşan tanecikler", p: "Aqualf tanecikleri, bir tepeyi aşmaya çalışan küçük bilyeler olarak hayal ediyor. Yalnızca yeterince hızlı ve doğru yönde çarpışanlar tepeyi aşıp ürüne dönüşebiliyor. Tepenin yüksekliği aktivasyon enerjisidir (Ea). Tepenin zirvesinde ise kısa ömürlü aktifleşmiş kompleks bulunur." },
      points: [
        "Bir tepkimenin gerçekleşmesi için taneciklerin çarpışması gerekir. Ama her çarpışma ürün oluşturmaz.",
        "Etkin çarpışma için tanecikler uygun geometride çarpışmalı ve en az aktivasyon enerjisi (Ea) kadar enerjiye sahip olmalıdır.",
        "Aktifleşmiş kompleks, potansiyel enerji diyagramının tepe noktasındaki kararsız ara yapıdır.",
        "ΔH = Ea(ileri) − Ea(geri)",
        "Ortalama tepkime hızı = derişim değişimi / zaman. Hız; gaz hacmi, renk, iletkenlik, pH veya kütle değişimiyle izlenebilir."
      ],
      formulas: [
        { n: "Ortalama Hız", eq: "r = −Δ[Tepken] / Δt = +Δ[Ürün] / Δt", note: "N2 + 3H2 → 2NH3 için: r(H2) = 3/2 · r(NH3)", c: "amber" },
        { n: "Ea ilişkisi", eq: "ΔH = Ea(ileri) − Ea(geri)", note: "Ea(ileri) = 120 kJ, ΔH = −40 kJ ise Ea(geri) = 160 kJ", c: "purple" }
      ],
      tip: "Bir maddenin harcanma hızını başka bir maddenin oluşma hızına çevirirken denklem katsayılarını oran olarak kullan.",
      exp: "tepe-asan-tanecikler",
      qs: [
        { q: "Çarpışma teorisine göre bir çarpışmanın ürünle sonuçlanması (etkin çarpışma) için aşağıdakilerden hangileri gereklidir?", o: ["Yalnız uygun geometri", "Yalnız yüksek sıcaklık", "Uygun geometri ve en az aktivasyon enerjisi kadar enerji", "Katalizör bulunması", "Taneciklerin aynı türden olması"], a: 2, e: "Tanecikler hem uygun yönlenmeyle çarpışmalı hem de aktivasyon enerjisine eşit ya da ondan büyük kinetik enerjiye sahip olmalıdır." },
        { q: "Bir tepkimenin ileri aktivasyon enerjisi 120 kJ, ΔH değeri −40 kJ'dir. Geri tepkimenin aktivasyon enerjisi kaç kJ'dir?", o: ["40", "80", "120", "160", "200"], a: 3, e: "ΔH = Ea(ileri) − Ea(geri) → −40 = 120 − Ea(geri) → Ea(geri) = 160 kJ." },
        { q: "A → B tepkimesinde A'nın derişimi 40 saniyede 2 M'den 1,2 M'ye düşüyor. A'nın ortalama harcanma hızı kaç M/s'dir?", o: ["0,01", "0,02", "0,03", "0,05", "0,8"], a: 1, e: "r = (2 − 1,2) / 40 = 0,8 / 40 = 0,02 M/s." },
        { q: "N2 + 3H2 → 2NH3 tepkimesinde NH3'ün oluşma hızı 0,4 M/s ise H2'nin harcanma hızı kaç M/s'dir?", o: ["0,2", "0,4", "0,6", "0,8", "1,2"], a: 2, e: "r(H2) / r(NH3) = 3 / 2 → r(H2) = 0,4 · 3/2 = 0,6 M/s." },
        { q: "Mg(k) + 2HCl(suda) → MgCl2(suda) + H2(g) tepkimesinin hızı aşağıdakilerden hangisi ölçülerek izlenemez?", o: ["Açığa çıkan H2 gazının hacmi", "Açık kaptaki toplam kütle kaybı", "Çözeltinin pH değeri", "Çözeltinin elektrik iletkenliği", "Çözeltinin renk değişimi"], a: 4, e: "Tepkimedeki tüm maddeler renksiz olduğundan renk değişimi gözlenemez." }
      ]
    },
    {
      id: "11-3", theme: "etkilesim", icon: "⚡",
      title: "Tepkime Hızını Etkileyen Faktörler ve Hız Denklemi",
      sub: "Madde cinsi, derişim, sıcaklık, temas yüzeyi, katalizör; hız denklemi, tepkime derecesi, hız sabiti",
      subtopics: ["Tepkenlerin cinsi ve fiziksel hâli", "Derişimin etkisi", "Sıcaklığın etkisi", "Temas yüzeyinin etkisi", "Katalizörün etkisi", "Hız denklemi, tepkime derecesi ve hız sabiti"],
      story: { t: "Fil dişi macunu", p: "Aqualf hidrojen peroksit dolu bir şişeye bir tutam potasyum iyodür atıyor. Saniyeler içinde şişeden dev bir köpük kulesi fışkırıyor! Katalizör, tepkimeye yeni ve daha alçak bir tepe yolu açtı. Aqualf toz hâlindeki magnezyumun şeritten çok daha hızlı tepkimeye girdiğini, sıcak asidin soğuktan daha hızlı köpürdüğünü de gösteriyor." },
      points: [
        "Derişim arttıkça birim zamandaki çarpışma sayısı artar ve hız artar.",
        "Sıcaklık artınca aktivasyon enerjisini aşan tanecik sayısı artar. Ea değişmez ama hız artar.",
        "Katı tanecikler küçüldükçe temas yüzeyi artar ve heterojen tepkimeler hızlanır (toz şekerin daha hızlı çözünmesi gibi).",
        "Katalizör tepkimeye alternatif bir yol sunarak Ea'yı düşürür. ΔH'yi değiştirmez ve tepkimeden değişmeden çıkar.",
        "Hız denklemi deneysel olarak belirlenir: r = k[A]^x[B]^y. Tepkime derecesi x + y'dir. k sıcaklık ve katalizöre bağlıdır, derişime bağlı değildir."
      ],
      formulas: [
        { n: "Hız Denklemi", eq: "r = k · [A]^x · [B]^y", note: "[A] iki katına çıkınca hız 4 katına çıkıyorsa x = 2'dir.", c: "aqua" }
      ],
      tip: "Deney tablosundan hız denklemi bulurken bir maddenin derişimi sabitken diğerinin derişimini değiştiren iki deneyi karşılaştır. Hızın kaç katına çıktığı, derecenin üssünü verir.",
      exp: "fil-disi-macunu",
      qs: [
        { q: "Sıcaklık artırıldığında tepkime hızının artmasının temel nedeni nedir?", o: ["Aktivasyon enerjisinin düşmesi", "Aktivasyon enerjisini aşabilen tanecik sayısının artması", "Tepkime entalpisinin değişmesi", "Katalizör oluşması", "Tanecik sayısının artması"], a: 1, e: "Sıcaklık Ea'yı değiştirmez. Taneciklerin ortalama kinetik enerjisi arttığı için Ea'yı aşabilen tanecik oranı artar." },
        { q: "Katalizör ile ilgili hangisi yanlıştır?", o: ["Aktivasyon enerjisini düşürür", "Tepkime hızını artırır", "Tepkimenin ΔH değerini değiştirir", "Tepkime sonunda değişmeden çıkar", "Tepkimeye farklı bir mekanizma sunar"], a: 2, e: "Katalizör tepkimenin izlediği yolu değiştirir ama başlangıç ve son enerji düzeylerini değiştirmez. ΔH aynı kalır." },
        { q: "2A + B → C tepkimesi için deney verileri:\n1) [A] = 0,1 M, [B] = 0,1 M → hız = r\n2) [A] = 0,2 M, [B] = 0,1 M → hız = 4r\n3) [A] = 0,1 M, [B] = 0,2 M → hız = 2r\nTepkimenin hız denklemi hangisidir?", o: ["r = k[A][B]", "r = k[A]²[B]", "r = k[A][B]²", "r = k[A]²", "r = k[A]²[B]²"], a: 1, e: "[A] iki katına çıkınca hız 4 katına çıkar → [A]². [B] iki katına çıkınca hız 2 katına çıkar → [B]¹. r = k[A]²[B]; tepkime derecesi 3'tür." },
        { q: "Hız sabiti (k) aşağıdakilerden hangisine bağlıdır?", o: ["Tepkenlerin derişimine", "Kabın hacmine", "Sıcaklığa", "Ürün miktarına", "Tepkime süresine"], a: 2, e: "k sıcaklık ve katalizöre bağlıdır. Derişim değişince hız değişir ama k sabit kalır." },
        { q: "Eşit kütledeki çinko parçası ile çinko tozu aynı derişimdeki HCl çözeltisine atılıyor. Çinko tozunun daha hızlı tepkimeye girmesinin nedeni nedir?", o: ["Derişimin artması", "Temas yüzeyinin artması", "Sıcaklığın artması", "Katalizör etkisi", "Aktivasyon enerjisinin artması"], a: 1, e: "Toz hâlindeki katının asitle temas eden yüzeyi çok daha büyüktür. Birim zamandaki çarpışma sayısı artar." }
      ]
    },
    {
      id: "11-4", theme: "cesitlilik", icon: "⚖️",
      title: "Kimyasal Denge",
      sub: "Tersinir tepkimeler, dinamik denge, denge sabiti (Kc) ve tepkime oranı (Q)",
      subtopics: ["Tersinir tepkimelerin özellikleri", "Fiziksel ve kimyasal değişimlerde denge", "Denge sabiti ifadesinin yazılması", "Tepkime oranı (Q) ve dengeye yönelim"],
      story: { t: "Hiç durmayan dans", p: "Aqualf kapalı bir cam küreye kahverengi azot dioksit gazı koyuyor. Renk bir süre açılıyor ve sonra sabit kalıyor. Durdu mu? Hayır! NO2 molekülleri birleşip N2O4'e dönüşürken N2O4 molekülleri de aynı hızla parçalanıyor. Dışarıdan bakınca her şey sabit görünür ama içeride dans hiç durmaz. Buna dinamik denge denir." },
      points: [
        "Kapalı sistemde ileri ve geri tepkime hızları eşitlendiğinde denge kurulur. Gözlenebilir özellikler (renk, basınç, derişim) sabit kalır.",
        "Denge dinamiktir: tepkimeler durmaz, iki yönde aynı hızla devam eder.",
        "aA + bB ⇌ cC + dD için Kc = [C]^c[D]^d / [A]^a[B]^b. Saf katı ve sıvılar ifadeye yazılmaz.",
        "Tepkime oranı Q, herhangi bir andaki derişimlerle hesaplanır. Q < Kc ise ileri, Q > Kc ise geri yönde ilerler, Q = Kc ise sistem dengededir.",
        "Kc yalnızca sıcaklıkla değişir. Tepkime ters çevrilirse yeni Kc = 1/Kc olur."
      ],
      formulas: [
        { n: "Denge Sabiti", eq: "N2(g) + 3H2(g) ⇌ 2NH3(g) → Kc = [NH3]² / ([N2]·[H2]³)", note: "Katsayılar üs olur.", c: "aqua" },
        { n: "Heterojen Denge", eq: "CaCO3(k) ⇌ CaO(k) + CO2(g) → Kc = [CO2]", note: "Katılar ifadeye yazılmaz.", c: "emerald" }
      ],
      tip: "Kc hesabında daima denge anındaki derişimleri kullan. Başlangıç–değişim–denge (BDD) tablosu kurmak hata yapmanı önler.",
      exp: "dinamik-denge",
      qs: [
        { q: "Kimyasal denge ile ilgili hangisi doğrudur?", o: ["Dengede tepkimeler durur", "Dengede ileri ve geri tepkime hızları eşittir", "Dengede tepken ve ürün derişimleri her zaman eşittir", "Denge yalnızca açık sistemlerde kurulur", "Dengede ürün oluşmaz"], a: 1, e: "Denge dinamiktir: ileri ve geri tepkimeler aynı hızda devam eder. Derişimler sabittir ama eşit olmak zorunda değildir." },
        { q: "N2(g) + 3H2(g) ⇌ 2NH3(g) tepkimesinin denge sabiti ifadesi hangisidir?", o: ["Kc = [NH3] / [N2][H2]", "Kc = [NH3]² / [N2][H2]³", "Kc = [N2][H2]³ / [NH3]²", "Kc = 2[NH3] / [N2]·3[H2]", "Kc = [NH3]² / [N2]³[H2]"], a: 1, e: "Ürün derişimleri payda, tepken derişimleri paydadadır ve katsayılar üs olarak yazılır." },
        { q: "CaCO3(k) ⇌ CaO(k) + CO2(g) tepkimesinin denge sabiti ifadesi hangisidir?", o: ["Kc = [CaO][CO2] / [CaCO3]", "Kc = [CaCO3] / [CO2]", "Kc = [CO2]", "Kc = [CaO]", "Kc = 1 / [CO2]"], a: 2, e: "Saf katıların derişimi sabit kabul edilir ve ifadeye yazılmaz. Geriye yalnızca [CO2] kalır." },
        { q: "H2(g) + I2(g) ⇌ 2HI(g) tepkimesi dengedeyken [H2] = 0,1 M, [I2] = 0,1 M ve [HI] = 0,8 M'dir. Kc kaçtır?", o: ["8", "16", "32", "64", "80"], a: 3, e: "Kc = [HI]² / ([H2][I2]) = 0,64 / 0,01 = 64." },
        { q: "Bir tepkime için belirli bir anda hesaplanan tepkime oranı Q, denge sabiti Kc'den küçüktür (Q < Kc). Sistem için hangisi doğrudur?", o: ["Sistem dengededir", "Tepkime geri yönde ilerler", "Tepkime ileri yönde ilerler", "Kc azalır", "Tepkime durur"], a: 2, e: "Q < Kc ise ürün oranı denge değerinden azdır. Sistem dengeye ulaşmak için ileri yönde ilerler." }
      ]
    },
    {
      id: "11-5", theme: "cesitlilik", icon: "🔀",
      title: "Dengeyi Etkileyen Faktörler: Le Chatelier İlkesi",
      sub: "Derişim, hacim–basınç, sıcaklık ve katalizörün dengeye etkisi",
      subtopics: ["Derişimin dengeye etkisi", "Hacim ve basıncın dengeye etkisi", "Sıcaklığın dengeye etkisi", "Katalizörün dengeye etkisi", "Le Chatelier ilkesi ve endüstriyel uygulamalar (Haber-Bosch)"],
      story: { t: "Renk değiştiren küreler", p: "Aqualf iki NO2 küresinden birini buzlu suya, diğerini kaynar suya daldırıyor. Soğuktaki küre neredeyse renksizleşirken sıcaktaki koyu kahverengiye dönüyor! 2NO2 ⇌ N2O4 tepkimesi ekzotermiktir. Isıtınca denge ısıyı harcamak için geri yöne kayar ve kahverengi NO2 artar. Le Chatelier'e göre denge her zaman kendisine yapılan etkiyi azaltacak yöne kayar." },
      points: [
        "Le Chatelier ilkesi: Dengedeki bir sisteme dış etki yapılırsa sistem bu etkiyi azaltacak yönde kayar.",
        "Bir maddenin derişimi artırılırsa denge o maddeyi harcayan yöne kayar.",
        "Hacim azaltılırsa (basınç artırılırsa) denge gaz mol sayısının az olduğu yöne kayar. Gaz mol sayıları eşitse etkilenmez.",
        "Sıcaklık artışı dengeyi endotermik yöne kaydırır. Kc'yi değiştiren tek faktör sıcaklıktır.",
        "Katalizör dengeyi kaydırmaz, yalnızca dengeye daha kısa sürede ulaşılmasını sağlar."
      ],
      formulas: [
        { n: "Haber-Bosch", eq: "N2(g) + 3H2(g) ⇌ 2NH3(g) + ısı", note: "Yüksek basınç NH3 verimini artırır. Düşük sıcaklık verimi artırır ama hızı düşürür; bu yüzden katalizör ve ılımlı sıcaklık kullanılır.", c: "rose" }
      ],
      tip: "Sıcaklığı tepkimenin bir maddesi gibi düşün: ekzotermik tepkimede ısı ürün tarafında, endotermik tepkimede tepken tarafında yazılır. Isıtmak, o tarafa madde eklemek gibidir.",
      exp: "renk-degistiren-kure",
      qs: [
        { q: "N2(g) + 3H2(g) ⇌ 2NH3(g) ΔH < 0 dengesinde NH3 miktarını artırmak için aşağıdakilerden hangisi yapılmalıdır?", o: ["Sıcaklığı artırmak", "Kabın hacmini artırmak", "Basıncı artırmak (hacmi azaltmak)", "Katalizör eklemek", "Ortama NH3 eklemek"], a: 2, e: "Basınç artınca denge gaz mol sayısının az olduğu ürün yönüne (4 mol → 2 mol) kayar ve NH3 artar." },
        { q: "2NO2(g, kahverengi) ⇌ N2O4(g, renksiz) ΔH < 0 dengesindeki kap ısıtılırsa ne gözlenir?", o: ["Renk açılır", "Renk koyulaşır", "Renk değişmez", "Kap tamamen renksizleşir", "N2O4 miktarı artar"], a: 1, e: "Ekzotermik tepkimede sıcaklık artışı dengeyi geri (endotermik) yöne kaydırır. Kahverengi NO2 artar ve renk koyulaşır." },
        { q: "Dengedeki bir sisteme katalizör eklenirse ne olur?", o: ["Denge ürünler yönüne kayar", "Denge tepkenler yönüne kayar", "Kc artar", "Denge kaymaz, dengeye ulaşma süresi kısalır", "ΔH azalır"], a: 3, e: "Katalizör ileri ve geri tepkimeleri eşit oranda hızlandırır. Denge konumu ve Kc değişmez." },
        { q: "Bir dengenin denge sabiti (Kc) aşağıdakilerden hangisi ile değişir?", o: ["Derişim", "Basınç", "Hacim", "Sıcaklık", "Katalizör"], a: 3, e: "Kc'yi değiştiren tek faktör sıcaklıktır." },
        { q: "H2(g) + I2(g) ⇌ 2HI(g) dengesinde sabit sıcaklıkta kabın hacmi yarıya indirilirse denge için hangisi doğrudur?", o: ["Ürünler yönüne kayar", "Tepkenler yönüne kayar", "Kaymaz", "Kc iki katına çıkar", "HI ayrışır"], a: 2, e: "Tepkimenin iki tarafındaki gaz mol sayıları eşittir (2 = 2). Hacim değişimi dengeyi kaydırmaz." }
      ]
    },
    {
      id: "11-6", theme: "cesitlilik", icon: "🍋",
      title: "Asit-Baz Teorileri ve Asitlerin-Bazların Kuvveti",
      sub: "Suyun otoiyonizasyonu, Arrhenius ve Brønsted-Lowry tanımları, kuvvetli–zayıf asit ve bazlar, Ka–Kb",
      subtopics: ["Suyun otoiyonizasyonu (Ksu)", "Arrhenius asit-baz tanımı", "Brønsted-Lowry asit-baz tanımı ve konjuge çiftler", "Kuvvetli ve zayıf asitler-bazlar", "Asitlik ve bazlık sabitleri (Ka, Kb)"],
      story: { t: "Lambalı asit avcısı", p: "Aqualf eşit derişimli iki asit çözeltisine iletkenlik lambasının uçlarını daldırıyor. Hidroklorik asitte lamba parlak yanıyor, sirke asidinde ise sönük sönük. HCl suda tamamen iyonlaşır ama asetik asidin yalnızca küçük bir kısmı iyonlaşır. Kuvvet, asidin miktarı değil, iyonlaşma derecesidir." },
      points: [
        "Su kendi kendine az da olsa iyonlaşır: H2O ⇌ H⁺ + OH⁻. 25 °C'de Ksu = [H⁺][OH⁻] = 1·10⁻¹⁴",
        "Arrhenius: asitler suya H⁺, bazlar OH⁻ verir. Brønsted-Lowry: asit proton (H⁺) verir, baz proton alır.",
        "Konjuge asit-baz çifti bir protonla farklılaşır: HSO4⁻ / SO4²⁻, NH4⁺ / NH3.",
        "Kuvvetli asitler suda tamamen iyonlaşır (HCl, HBr, HI, HNO3, H2SO4, HClO4). Zayıf asitler kısmen iyonlaşır (CH3COOH, HF, HCN).",
        "Ka (Kb) büyüdükçe asidin (bazın) kuvveti artar. Kuvvetli asidin konjuge bazı zayıftır."
      ],
      formulas: [
        { n: "Brønsted-Lowry", eq: "NH3 + H2O ⇌ NH4⁺ + OH⁻", note: "H2O proton verdi → asit; NH3 proton aldı → baz.", c: "emerald" },
        { n: "Asitlik Sabiti", eq: "HA ⇌ H⁺ + A⁻ · Ka = [H⁺][A⁻] / [HA]", note: "Ka ne kadar büyükse asit o kadar kuvvetlidir.", c: "amber" }
      ],
      tip: "Su amfoterdir: asitle karşılaşınca baz, bazla karşılaşınca asit gibi davranır. Brønsted sorularında H⁺'yı kimin verip kimin aldığına bak.",
      exp: "lambali-asit-avcisi",
      qs: [
        { q: "NH3 + H2O ⇌ NH4⁺ + OH⁻ tepkimesinde Brønsted-Lowry tanımına göre asit olarak davranan tanecik hangisidir?", o: ["NH3", "H2O", "NH4⁺", "OH⁻", "Hiçbiri"], a: 1, e: "H2O, NH3'e bir proton (H⁺) vererek OH⁻'a dönüşür. Proton veren tanecik Brønsted asididir." },
        { q: "HSO4⁻ iyonunun konjuge bazı hangisidir?", o: ["H2SO4", "SO4²⁻", "H2O", "SO3", "OH⁻"], a: 1, e: "Konjuge baz, asidin bir proton kaybetmiş hâlidir: HSO4⁻ − H⁺ = SO4²⁻." },
        { q: "Aşağıdakilerden hangisi kuvvetli bir asittir?", o: ["CH3COOH", "HF", "HCl", "H2CO3", "HCN"], a: 2, e: "HCl suda tamamen iyonlaşır. Diğerleri kısmen iyonlaşan zayıf asitlerdir." },
        { q: "Aynı sıcaklıkta HA için Ka = 1·10⁻⁵, HB için Ka = 1·10⁻³'tür. Bu asitler ile ilgili hangisi doğrudur?", o: ["HA daha kuvvetlidir", "HB daha kuvvetlidir", "Kuvvetleri eşittir", "İkisi de kuvvetli asittir", "Ka ile kuvvet arasında ilişki yoktur"], a: 1, e: "Ka büyüdükçe iyonlaşma artar. 10⁻³ > 10⁻⁵ olduğu için HB daha kuvvetlidir." },
        { q: "25 °C'de saf suyun otoiyonizasyonu ile ilgili hangisi doğrudur?", o: ["[H⁺] = 1·10⁻¹⁴ M'dir", "Ksu = [H⁺][OH⁻] = 1·10⁻¹⁴'tür", "Su hiç iyonlaşmaz", "[OH⁻] > [H⁺] olduğu için su baziktir", "Ksu sıcaklıktan bağımsızdır"], a: 1, e: "25 °C'de Ksu = 1·10⁻¹⁴ ve saf suda [H⁺] = [OH⁻] = 1·10⁻⁷ M'dir. Ksu sıcaklıkla değişir." }
      ]
    },
    {
      id: "11-7", theme: "cesitlilik", icon: "🌈",
      title: "pH, Nötralleşme ve Titrasyon",
      sub: "pH–pOH, kuvvetli ve zayıf asit-baz çözeltilerinde pH, nötralleşme, titrasyon, eşdeğerlik noktası, indikatörler",
      subtopics: ["pH ve pOH", "Kuvvetli ve zayıf asit-baz çözeltilerinde pH", "Nötralleşme tepkimeleri", "Kuvvetli asit–kuvvetli baz titrasyonu ve eşdeğerlik noktası", "İndikatörler ve asidik-bazik ürünlerin seçimi"],
      story: { t: "Pembeye dönen damla", p: "Aqualf'ın büretinden damlayan baz, fenolftalein katılmış asit çözeltisine düşüyor. Her damlada kısa süreliğine pembe bir bulut beliriyor ve kayboluyor. Sonra tek bir damla daha... ve bütün çözelti kalıcı olarak pembeye dönüyor! O an eşdeğerlik noktasının hemen ötesidir: asidin bütün H⁺ iyonları, bazın OH⁻ iyonlarıyla suya dönüştü." },
      points: [
        "pH = −log[H⁺], pOH = −log[OH⁻]. 25 °C'de pH + pOH = 14.",
        "pH < 7 asidik, pH = 7 nötr, pH > 7 bazik (25 °C).",
        "Kuvvetli asitte [H⁺] asidin derişimine eşittir. Zayıf asitte [H⁺] = √(Ka · C) yaklaşımı kullanılır.",
        "Nötralleşmede mol(H⁺) = mol(OH⁻) olduğunda eşdeğerlik noktasına ulaşılır: Ma·Va·(H⁺ sayısı) = Mb·Vb·(OH⁻ sayısı).",
        "Kuvvetli asit–kuvvetli baz titrasyonunda eşdeğerlik noktasında pH = 7'dir. Uygun indikatörün renk dönüm aralığı bu noktayı kapsamalıdır."
      ],
      formulas: [
        { n: "pH", eq: "pH = −log[H⁺] · pH + pOH = 14", note: "0,01 M HCl → [H⁺] = 10⁻² → pH = 2", c: "rose" },
        { n: "Titrasyon", eq: "Ma · Va = Mb · Vb", note: "Tek protonlu asit ve tek hidroksitli baz için.", c: "purple" }
      ],
      tip: "Bazik çözeltilerde önce pOH'u bul, sonra pH = 14 − pOH ile pH'a geç. 0,001 M NaOH → pOH = 3 → pH = 11.",
      exp: "pembe-damla",
      qs: [
        { q: "25 °C'de 0,01 M HCl çözeltisinin pH değeri kaçtır?", o: ["1", "2", "7", "12", "13"], a: 1, e: "HCl kuvvetli asittir: [H⁺] = 10⁻² M → pH = 2." },
        { q: "25 °C'de 0,001 M NaOH çözeltisinin pH değeri kaçtır?", o: ["3", "7", "10", "11", "14"], a: 3, e: "[OH⁻] = 10⁻³ M → pOH = 3 → pH = 14 − 3 = 11." },
        { q: "20 mL 0,1 M HCl çözeltisini tam olarak nötrleştirmek için kaç mL 0,2 M NaOH çözeltisi gerekir?", o: ["5", "10", "20", "40", "50"], a: 1, e: "mol HCl = 0,1 · 20 = 2 mmol. 0,2 · V = 2 → V = 10 mL." },
        { q: "Kuvvetli asit ile kuvvetli bazın titrasyonunda eşdeğerlik noktasındaki pH (25 °C) kaçtır?", o: ["1", "4", "7", "10", "14"], a: 2, e: "Kuvvetli asit ve kuvvetli bazdan oluşan tuz hidroliz olmaz. Eşdeğerlik noktasında çözelti nötrdür (pH = 7)." },
        { q: "25 °C'de 0,1 M zayıf HA asidinin Ka değeri 1·10⁻⁵'tir. Çözeltinin pH değeri kaçtır?", o: ["1", "2", "3", "5", "6"], a: 2, e: "[H⁺] = √(Ka · C) = √(10⁻⁵ · 10⁻¹) = √10⁻⁶ = 10⁻³ M → pH = 3." },
        { q: "Mide ekşimesinde mide ilacı olarak kullanılan maddenin özelliği ve nedeni hangisidir?", o: ["Kuvvetli asittir, mideyi asitlendirir", "Zayıf bazdır (ör. Mg(OH)2), fazla mide asidini nötrleştirir", "Nötr bir tuzdur, asitle tepkimeye girmez", "Kuvvetli bazdır (NaOH), hızlı etki eder", "İndikatördür, asitliği gösterir"], a: 1, e: "Mide ilaçları Mg(OH)2 veya Al(OH)3 gibi zayıf bazlar içerir. Fazla HCl'yi nötrleştirir ama kuvvetli baz gibi dokulara zarar vermez." }
      ]
    },
    {
      id: "11-8", theme: "cesitlilik", icon: "🧊",
      title: "Çözünürlük Dengesi",
      sub: "Suda az çözünen tuzlar, molar çözünürlük, çözünürlük çarpımı (Kçç), sıcaklık ve ortak iyon etkisi",
      subtopics: ["Suda az çözünen tuzların molar çözünürlükleri", "Çözünürlük çarpımı (Kçç)", "Çökelme koşulu (Q ile Kçç'nin karşılaştırılması)", "Sıcaklığın çözünürlüğe etkisi", "Ortak iyonun çözünürlüğe etkisi"],
      story: { t: "Beyaz bulut", p: "Aqualf gümüş nitrat çözeltisine bir damla tuzlu su ekliyor; berrak sıvıda beyaz bir bulut beliriyor. Gümüş klorür çöktü! Suda az çözünen tuzlar, çözünmüş iyonlarıyla bir denge kurar. Çözeltiye ortak bir iyon eklenince denge tekrar bozulur ve daha çok katı çöker." },
      points: [
        "Suda az çözünen tuz doymuş çözeltisinde iyonlarıyla dengededir: AgCl(k) ⇌ Ag⁺(suda) + Cl⁻(suda)",
        "Kçç = [Ag⁺][Cl⁻] (katı ifadeye yazılmaz). Molar çözünürlük s ile: AgCl için Kçç = s², CaF2 için Kçç = 4s³",
        "İyon çarpımı Q > Kçç ise çökelme olur, Q = Kçç ise çözelti doymuştur, Q < Kçç ise çökelme olmaz.",
        "Ortak iyon eklenmesi az çözünen tuzun çözünürlüğünü azaltır (denge katı yönüne kayar).",
        "Kçç sıcaklıkla değişir. Çözünmesi endotermik olan tuzların çözünürlüğü sıcaklıkla artar."
      ],
      formulas: [
        { n: "Kçç – s İlişkisi", eq: "AxBy(k) ⇌ xA + yB → Kçç = (x·s)^x · (y·s)^y", note: "CaF2: Kçç = s · (2s)² = 4s³", c: "aqua" }
      ],
      tip: "Kçç değerlerini karşılaştırarak çözünürlüğü kıyaslamak yalnızca iyon sayısı aynı olan tuzlar için geçerlidir (AgCl ile AgBr gibi). Farklı formül tiplerinde s değerini hesaplayarak karşılaştır.",
      exp: "beyaz-bulut",
      qs: [
        { q: "AgCl(k) ⇌ Ag⁺(suda) + Cl⁻(suda) dengesi için çözünürlük çarpımı ifadesi hangisidir?", o: ["Kçç = [AgCl]", "Kçç = [Ag⁺][Cl⁻] / [AgCl]", "Kçç = [Ag⁺][Cl⁻]", "Kçç = [Ag⁺] + [Cl⁻]", "Kçç = [Ag⁺]²"], a: 2, e: "Katı AgCl ifadeye yazılmaz. Kçç = [Ag⁺][Cl⁻]." },
        { q: "CaF2 tuzunun molar çözünürlüğü s ise Kçç ifadesi hangisidir?", o: ["s²", "2s²", "4s³", "s³", "27s⁴"], a: 2, e: "CaF2 ⇌ Ca²⁺ + 2F⁻ → [Ca²⁺] = s, [F⁻] = 2s → Kçç = s · (2s)² = 4s³." },
        { q: "Belirli bir sıcaklıkta AgCl'nin molar çözünürlüğü 1·10⁻⁵ M'dir. Bu sıcaklıkta AgCl'nin Kçç değeri kaçtır?", o: ["1·10⁻⁵", "2·10⁻⁵", "1·10⁻¹⁰", "2·10⁻¹⁰", "1·10⁻²⁵"], a: 2, e: "Kçç = s² = (10⁻⁵)² = 1·10⁻¹⁰." },
        { q: "AgCl'nin doymuş çözeltisine bir miktar NaCl katısı eklenip çözülürse ne olur?", o: ["AgCl'nin çözünürlüğü artar", "AgCl'nin çözünürlüğü azalır, bir miktar AgCl çöker", "Kçç değeri artar", "Kçç değeri azalır", "Hiçbir değişiklik olmaz"], a: 1, e: "Ortak iyon (Cl⁻) eklenince denge katı yönüne kayar. AgCl'nin çözünürlüğü azalır ve çökelme olur; Kçç değişmez." },
        { q: "İki çözelti karıştırıldığında az çözünen bir tuzun çökmesi için iyon çarpımı (Q) ile Kçç arasında hangi ilişki olmalıdır?", o: ["Q < Kçç", "Q = 0", "Q > Kçç", "Q = Kçç / 2", "Kçç = 0"], a: 2, e: "İyon çarpımı Kçç'yi aşarsa çözelti aşırı doymuş olur ve fazla iyonlar katı olarak çöker." }
      ]
    },
    {
      id: "11-9", theme: "surdurulebilirlik", icon: "🍃",
      title: "Yeşil Hidrojen, Nanoteknoloji ve Mikroplastikler",
      sub: "Fermantasyonla yeşil hidrojen, nanoteknolojik ürünlerin fayda ve riskleri, mikro ve nanoplastikler",
      subtopics: ["Fermantasyon yöntemiyle yeşil hidrojen enerjisi", "Hidrojen gazı miktarına etki eden faktörler", "Nanoteknolojik ürünler: potansiyel faydalar ve olası zararlar", "Mikroplastik ve nanoplastikler", "Mikro ve nanoplastiklerin çevreye ve sağlığa etkileri"],
      story: { t: "Mayalı enerji", p: "Aqualf mutfak atıklarını ve şekerli suyu kapalı bir kavanoza koyup içine özel bir bakteri kültürü ekliyor. Ertesi gün kavanozun ağzındaki balon şişmiş: hidrojen gazı! Karanlık fermantasyonla organik atıklardan karbon salımı düşük hidrojen üretmek, geleceğin temiz enerjisi olabilir. Aynı akşam Aqualf deniz kumunu süzüyor ve renkli, minik plastik parçaları buluyor. Kimya hem sorunu hem çözümü taşır." },
      points: [
        "Yeşil hidrojen, yenilenebilir enerji (güneş, rüzgâr) ya da biyolojik yollarla üretilen ve üretiminde karbon salımı olmayan veya çok düşük olan hidrojendir.",
        "Karanlık fermantasyonda mikroorganizmalar şeker ve organik atıkları oksijensiz ortamda parçalayarak H2 üretir.",
        "Hidrojen verimini sıcaklık, pH, substrat (besin) türü ve derişimi, mikroorganizma türü ve ortamın oksijensiz olması etkiler.",
        "Mikroplastikler 5 mm'den küçük plastik parçacıklarıdır. Nanoplastikler 1 mikrometreden küçüktür ve hücre zarlarından geçebilir.",
        "Nanoteknolojik ürünler daha verimli güneş panelleri ve hedefe yönelik ilaçlar sunar. Ancak canlılarda birikme ve toksisite riski taşır."
      ],
      formulas: [
        { n: "Karanlık Fermantasyon (ideal)", eq: "C6H12O6 + 2H2O → 2CH3COOH + 2CO2 + 4H2", note: "Bir mol glikozdan en fazla 4 mol H2 elde edilir (asetat yolu).", c: "emerald" }
      ],
      tip: "Hidrojenin renk kodları: yeşil (yenilenebilir), gri (doğal gazdan, CO2 salımlı), mavi (doğal gazdan, CO2 yakalamalı). Sınavda yeşil hidrojenin karbon salımı düşük üretim yöntemiyle ilişkisini hatırla.",
      exp: "mayali-enerji",
      qs: [
        { q: "Aşağıdakilerden hangisi 'yeşil hidrojen' kavramını en iyi tanımlar?", o: ["Yeşil renkli hidrojen gazı", "Doğal gazdan buhar reformasyonu ile elde edilen hidrojen", "Yenilenebilir enerji veya biyolojik yollarla, karbon salımı olmadan ya da çok düşük salımla üretilen hidrojen", "Kömürden elde edilen hidrojen", "Nükleer santrallerde atık olarak oluşan hidrojen"], a: 2, e: "Yeşil hidrojenin rengi yoktur. Ad, üretim yönteminin çevre dostu olmasından gelir." },
        { q: "Karanlık fermantasyon yöntemiyle hidrojen üretimi ile ilgili hangisi doğrudur?", o: ["Yüksek oksijenli ortamda yapılır", "Mikroorganizmalar organik maddeleri oksijensiz ortamda parçalayarak H2 üretir", "Yalnızca deniz suyunun elektroliziyle gerçekleşir", "Güneş ışığı olmadan gerçekleşemez", "Ürün olarak yalnızca metan oluşur"], a: 1, e: "Karanlık fermantasyonda anaerobik bakteriler şeker ve atıkları ışık gerektirmeden parçalar ve H2 açığa çıkarır." },
        { q: "Fermantasyonla hidrojen üretiminde;\nI. sıcaklık\nII. ortamın pH'ı\nIII. substrat (besin) derişimi\nfaktörlerinden hangileri elde edilen H2 miktarını etkiler?", o: ["Yalnız I", "Yalnız II", "I ve II", "II ve III", "I, II ve III"], a: 4, e: "Mikroorganizmaların etkinliği sıcaklık ve pH'a, üretilen gaz miktarı ise besin derişimine bağlıdır." },
        { q: "Mikroplastikler genellikle hangi boyuttan küçük plastik parçacıkları olarak tanımlanır?", o: ["5 metre", "5 santimetre", "5 milimetre", "5 nanometre", "5 pikometre"], a: 2, e: "Mikroplastikler 5 mm'den küçük plastik parçacıklarıdır. 1 µm'den küçük olanlara nanoplastik denir." },
        { q: "Nanoplastiklerin sağlık açısından özellikle endişe verici olmasının nedeni nedir?", o: ["Renkli olmaları", "Çok ağır olmaları", "Çok küçük oldukları için hücre zarlarından geçip dokularda birikebilmeleri", "Suda hemen çözünmeleri", "Radyoaktif olmaları"], a: 2, e: "Nano boyuttaki parçacıklar biyolojik engelleri aşabilir, hücrelere girebilir ve zararlı maddeleri taşıyabilir." }
      ]
    }
  ]
};
