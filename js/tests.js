(function () {
  const scale = [
    { t: "Ешқашан", v: 0 },
    { t: "Сирек", v: 1 },
    { t: "Жиі", v: 2 },
    { t: "Әрдайым", v: 3 }
  ];

  const tests = [
    {
      id: "mental",
      title: "Психикалық денсаулық жағдайы",
      desc: "Соңғы 2 аптадағы көңіл-күйіңіз, ұйқыңыз және жалпы жағдайыңыз туралы.",
      period: "Соңғы 2 аптада мына жағдайлар қаншалықты жиі болды?",
      questions: [
        "Көңіл-күйім төмен, жабырқау болды.",
        "Бұрын ұнайтын істерге қызығушылығым азайды.",
        "Қобалжу немесе мазасыздық сезімі жиі болды.",
        "Ұйқым бұзылды (ұйықтай алмадым немесе тым көп ұйықтадым).",
        "Шаршау, күш-қуаттың жетіспеуін сезіндім.",
        "Бір нәрсеге зейін қою қиын болды.",
        "Өзімді бос немесе керексіз сезіндім.",
        "Ашуланшақ болдым, тез тітіркендім.",
        "Достарыммен, жақындарыммен араласқым келмеді.",
        "Болашаққа сенімсіздікпен қарадым."
      ],
      levels: [
        { max: 9, cls: "low", name: "Жағдайыңыз тұрақты",
          text: "Нәтиже жалпы жақсы жағдайды көрсетеді. Күн тәртібін, ұйқыны және демалысты сақтауды жалғастырыңыз." },
        { max: 19, cls: "mid", name: "Жеңіл күйзеліс белгілері бар",
          text: "Соңғы кезде стресс немесе шаршау жинақталған болуы мүмкін. Демалысқа, қозғалысқа және жақындарыңызбен сөйлесуге уақыт бөліңіз. Жағдай жақсармаса, психологпен кеңесіңіз." },
        { max: 30, cls: "high", name: "Көмек алған дұрыс",
          text: "Нәтиже көптеген белгілердің жиі кездесетінін көрсетеді. Психологқа немесе сенімді адамға жүгінуді ұсынамыз. «Кеңес алу» бөлімі арқылы тіркеле аласыз." }
      ]
    },
    {
      id: "study",
      title: "Оқу үлгерімі",
      desc: "Оқудағы жоспарлау, мотивация және емтихан алдындағы қобалжу туралы.",
      period: "Мына тұжырымдар сізге қаншалықты тән?",
      questions: [
        "Сабаққа дайындалуға уақытты жоспарлай алмаймын.",
        "Тапсырмаларды соңғы сәтке қалдырамын.",
        "Дәріс немесе сабақ кезінде зейінімді сақтау қиын.",
        "Емтихан не бақылау жұмысы алдында қатты қобалжимын.",
        "Түсінбеген тақырыпты оқытушыдан сұрауға тартынамын.",
        "Оқуға деген мотивациям төмендеді.",
        "Оқу мен демалыс арасындағы тепе-теңдікті таба алмаймын.",
        "Үй тапсырмаларын орындауға қиналамын.",
        "Бағаларым мүмкіндігімнен төмен деп ойлаймын.",
        "Оқудан шаршау немесе жүктеме сезімі жиі болады."
      ],
      levels: [
        { max: 9, cls: "low", name: "Оқу ритмі жақсы",
          text: "Сіз оқуды жақсы ұйымдастырып жүрсіз. Қолданып жүрген әдістеріңізді сақтап, қажет болса құрдастарыңызбен бөлісіңіз." },
        { max: 19, cls: "mid", name: "Кейбір қиындықтар бар",
          text: "Уақытты жоспарлау, зейін немесе мотивация жағынан қиындықтар кездеседі. Апталық жоспар құрып, үлкен тапсырмаларды кішкентай қадамдарға бөлуге тырысыңыз." },
        { max: 30, cls: "high", name: "Қолдау қажет болуы мүмкін",
          text: "Оқу жүктемесі немесе қобалжу үлгеріміңізге әсер етіп жатыр. Куратормен немесе психологпен сөйлесіп, оқу стратегиясын бірге қарастырған пайдалы." }
      ]
    },
    {
      id: "adapt",
      title: "Буллинг және топқа бейімделу",
      desc: "Топтағы қарым-қатынас, қолдау және мазақ немесе қысым белгілері туралы.",
      period: "Соңғы уақытта мына жағдайлар қаншалықты жиі болды?",
      questions: [
        "Топта өзімді бөтен сезінемін.",
        "Курстастарым мені мазақтайды немесе келекелейді.",
        "Мен туралы жағымсыз сөздер не өсек таратылады.",
        "Топтық жұмыстарға мені шақырмайды немесе шеттетеді.",
        "Топқа немесе колледжге баруға қиналамын.",
        "Көмек сұрайтын адам таппаймын.",
        "Заттарыма зиян келтіреді немесе жасырады.",
        "Чаттарда не әлеуметтік желіде қорлайтын хабарлама алдым.",
        "Өз пікірімді айтудан қорқамын.",
        "Топтағы жағдай көңіл-күйім мен оқуыма әсер етеді."
      ],
      levels: [
        { max: 9, cls: "low", name: "Топта өзіңізді жайлы сезінесіз",
          text: "Нәтиже топқа бейімделудің жақсы екенін көрсетеді. Жаңа курстастарға қолдау көрсетіп, достық атмосфераны сақтаңыз." },
        { max: 19, cls: "mid", name: "Бейімделуде қиындықтар бар",
          text: "Топта жайсыздық немесе оқшаулану сезімі бар. Бір-екі адаммен жақынырақ араласуға тырысыңыз, ортақ іс-шараларға қатысыңыз. Қажет болса, психологпен сөйлесіңіз." },
        { max: 30, cls: "high", name: "Буллинг белгілері болуы мүмкін",
          text: "Нәтиже қысым немесе мазақ белгілерін көрсетуі мүмкін. Бұл сіздің кінәңіз емес. Куратормен, психологпен немесе сенімді ересек адаммен сөйлесіңіз, дәлелдерді (хат алмасу, скриншот) сақтаңыз. Қауіп төнсе, дереу әкімшілікке хабарлаңыз." }
      ]
    }
  ];

  const menu = document.getElementById("testsMenu");
  const runner = document.getElementById("testRunner");
  const titleEl = document.getElementById("tqTitle");
  const quizBox = document.getElementById("tqQuizBox");
  const bar = document.getElementById("tqBar");
  const counter = document.getElementById("tqCounter");
  const qEl = document.getElementById("tqQuestion");
  const aEl = document.getElementById("tqAnswers");
  const resEl = document.getElementById("tqResult");
  const prevBtn = document.getElementById("tqPrev");
  const backBtn = document.getElementById("tqBack");
  if (!menu || !runner) return;

  let cur = null, idx = 0, answers = [];

  menu.innerHTML = tests.map(function (t) {
    return '<div class="card test-option" data-id="' + t.id + '" role="button" tabindex="0">' +
      "<h3>" + t.title + "</h3><p>" + t.desc + '</p><span class="badge">' + t.questions.length + " сұрақ · 2–3 минут</span></div>";
  }).join("");

  function start(id) {
    cur = tests.find(function (t) { return t.id === id; });
    idx = 0; answers = [];
    titleEl.textContent = cur.title;
    menu.classList.add("hidden");
    runner.classList.remove("hidden");
    resEl.classList.add("hidden");
    quizBox.classList.remove("hidden");
    render();
    runner.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function render() {
    const n = cur.questions.length;
    bar.style.width = (idx / n * 100) + "%";
    counter.textContent = (idx === 0 ? cur.period + " " : "") + "Сұрақ " + (idx + 1) + " / " + n;
    qEl.textContent = cur.questions[idx];
    aEl.innerHTML = "";
    scale.forEach(function (s) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = s.t;
      if (answers[idx] === s.v) b.style.borderColor = "#6c8cff";
      b.addEventListener("click", function () { answer(s.v); });
      aEl.appendChild(b);
    });
    prevBtn.style.visibility = idx === 0 ? "hidden" : "visible";
  }

  function answer(v) {
    answers[idx] = v;
    if (idx < cur.questions.length - 1) { idx++; render(); }
    else showResult();
  }

  function showResult() {
    const total = answers.reduce(function (a, b) { return a + b; }, 0);
    const max = cur.questions.length * 3;
    const lvl = cur.levels.find(function (l) { return total <= l.max; }) || cur.levels[cur.levels.length - 1];
    bar.style.width = "100%";
    quizBox.classList.add("hidden");
    resEl.classList.remove("hidden");
    resEl.innerHTML =
      '<div class="tq-lvl ' + lvl.cls + '"><h3>' + lvl.name + "</h3>" +
      '<div class="tq-score">Ұпай: ' + total + " / " + max + "</div><p>" + lvl.text + "</p></div>" +
      '<div class="tq-actions"><button class="tq-btn" id="tqRetry" type="button">Қайта тапсыру</button>' +
      '<button class="tq-btn ghost" id="tqList" type="button">Басқа тест</button>' +
      '<a class="tq-btn ghost" href="consultation.html" style="text-decoration:none">Кеңес алу</a></div>';
    document.getElementById("tqRetry").onclick = function () { start(cur.id); };
    document.getElementById("tqList").onclick = toMenu;
  }

  function toMenu() {
    runner.classList.add("hidden");
    menu.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  menu.addEventListener("click", function (e) {
    const c = e.target.closest(".test-option");
    if (c) start(c.dataset.id);
  });
  menu.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      const c = e.target.closest(".test-option");
      if (c) { e.preventDefault(); start(c.dataset.id); }
    }
  });
  prevBtn.addEventListener("click", function () { if (idx > 0) { idx--; render(); } });
  backBtn.addEventListener("click", toMenu);
})();
