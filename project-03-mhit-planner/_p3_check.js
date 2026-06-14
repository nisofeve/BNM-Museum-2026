// ══════════════════════════════════════════════════════
// SFX — synthesized high-tech sounds (Web Audio API, no files)
// tap() every button press · swap() screen/question change ·
// win() success/completion · lose() wrong/invalid
// ══════════════════════════════════════════════════════
const SFX=(()=>{let ctx;const ac=()=>ctx||(ctx=new(window.AudioContext||window.webkitAudioContext)());function tone({freq=440,type='sine',dur=.15,vol=.2,slide=0,delay=0}){try{const c=ac(),t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),t+dur);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(c.destination);o.start(t);o.stop(t+dur+.05)}catch(e){}}
return{tap(){tone({freq:1200,type:'square',dur:.06,vol:.1});tone({freq:1800,dur:.08,vol:.07,delay:.02})},swap(){tone({freq:300,type:'sawtooth',dur:.25,vol:.09,slide:900})},win(){[523,659,784,1047].forEach((f,i)=>tone({freq:f,type:'triangle',dur:.18,vol:.15,delay:i*.09}))},lose(){tone({freq:220,type:'sawtooth',dur:.3,vol:.15,slide:-120});tone({freq:110,type:'square',dur:.35,vol:.1,delay:.05})}};})();

// ══════════════════════════════════════════════════════
// I18N STRINGS
// ══════════════════════════════════════════════════════
const STRINGS = {
  bm: {
    welcome_title_bm: "Perancang Bajet Penjagaan Kesihatan",
    welcome_title_en: "Health Budget Planner",
    welcome_tagline: "Rancang kesihatan anda hari ini, jimat lebih banyak esok!",
    welcome_start: "Mulakan / Start",

    info_header_title: "Kenali MHIT",
    info_header_sub: "Insurans/Takaful Perubatan & Kesihatan — tanya penasihat kami!",
    tab_a_label: "Apa itu MHIT?",
    tab_b_label: "Kenapa Penting?",
    tab_c_label: "Bagaimana Berfungsi?",
    tab_d_label: "ABC Sebelum Beli",

    presenter_name: "Aisyah — Penasihat MHIT Anda",
    info_greet: "Hai! Saya Aisyah 👋 Penasihat kesihatan anda. Tanya saya tentang MHIT — sentuh soalan di bawah!",

    tab_a_title: "Apa itu MHIT?",
    tab_a_def: "MHIT = Insurans/Takaful Perubatan & Kesihatan. Pelan perlindungan yang membantu bayar kos rawatan bila anda sakit atau masuk hospital.",
    tab_a_covers_label: "Melindungi:",
    tab_a_c1: "Bil hospital",
    tab_a_c2: "Kos rawatan",
    tab_a_c3: "Ubat-ubatan",
    tab_a_c4: "Pembedahan & penyakit serius",
    tab_a_side_title: "Perlindungan Menyeluruh",
    tab_a_side_body: "Anda tidak perlu tanggung kos perubatan seorang diri.",
    tab_a_pill1_title: "Ketenangan Fikiran",
    tab_a_pill1_body: "Fokus untuk sembuh, bukan risau bil",
    tab_a_pill2_title: "Perlindungan Kewangan",
    tab_a_pill2_body: "Simpanan anda kekal selamat",

    tab_b_title: "Kenapa MHIT Penting?",
    tab_b_p1_title: "Kos Perubatan Mahal",
    tab_b_p1_body: "Kos perubatan semakin mahal — satu rawatan boleh mencecah ribuan ringgit.",
    tab_b_p2_title: "Simpanan Boleh Habis",
    tab_b_p2_body: "Tanpa perlindungan, duit simpanan boleh habis atau terpaksa berhutang.",
    tab_b_p3_title: "Ketenangan Fikiran",
    tab_b_p3_body: "Ketenangan fikiran — fokus untuk sembuh, bukan risau bil.",
    tab_b_stat_title: "Tahukah Anda?",
    tab_b_stat1: "Kos perubatan meningkat setiap tahun",
    tab_b_stat2: "Kos rawatan serius bagi warga emas",

    tab_c_title: "Bagaimana MHIT Berfungsi?",
    tab_c_step1: "Bayar premium/caruman",
    tab_c_step2: "Dikumpul dalam tabung bersama",
    tab_c_step3: "Bayar tuntutan anda",
    tab_c_label: "Perkongsian Risiko / Risk Pooling",
    tab_c_side_title: "Bersama Lebih Kuat",
    tab_c_side_body: "Apabila ramai orang bergabung, risiko dikongsi bersama. Ini menjadikan perlindungan lebih mampu milik untuk semua.",
    tab_c_example_title: "Contoh",
    tab_c_example_body: "1,000 orang bayar RM100/bulan = RM100,000 terkumpul. Jika 10 orang sakit dan perlukan RM8,000 setiap satu = RM80,000 — semua ditanggung!",

    tab_d_title: "ABC Sebelum Beli MHIT",
    tab_d_a_title: "Anggar keperluan anda",
    tab_d_a_body: "Termasuk kondisi kesihatan semasa anda",
    tab_d_b_title: "Bandingkan pilihan",
    tab_d_b_body: "Lihat semua pilihan yang ada di pasaran",
    tab_d_c_title: "Cari pelan yang sesuai",
    tab_d_c_body: "Mengikut bajet dan keperluan anda",
    tab_d_q_title: "Soalan yang perlu ditanya:",
    tab_d_q1: "Apa perlindungan yang ditawarkan?",
    tab_d_q2: "Berapa premium yang perlu dibayar?",
    tab_d_q3: "Adakah premium akan meningkat dengan usia?",
    info_continue_btn: "Teruskan ke Perancang →",

    input_title_bm: "Beritahu Kami Tentang Anda",
    input_title_en: "Tell Us About You",
    mascot_label: "Perancang Kesihatan Anda",
    age_label: "Berapa umur anda? / How old are you?",
    age_unit: "tahun",
    age_confirm: "Sahkan →",
    ack_age: "Baik, terima kasih! Soalan seterusnya…",
    coverage_label: "Pelan MHIT anda sekarang: / Your current MHIT plan:",
    ack_cov_none: "Baik, jangan risau — mari kita lihat unjuran anda!",
    ack_cov_basic: "Bagus! Mari kita kira unjuran anda.",
    ack_cov_comprehensive: "Hebat! Mari kita semak unjuran anda.",
    cov_none_name: "Tiada Perlindungan",
    cov_none_en: "No Coverage",
    cov_none_limit: "Tiada / None",
    cov_basic_name: "Perlindungan Asas",
    cov_basic_en: "Basic Coverage",
    cov_comp_name: "Perlindungan Komprehensif",
    cov_comp_en: "Comprehensive Coverage",
    calculate_btn: "Kira Sekarang! / Calculate Now!",

    calc_title: "Menganalisa profil kesihatan anda...",
    calc_subtitle: "Analysing your health profile...",

    results_title: "Unjuran Kos Penjagaan Kesihatan Anda",
    results_years: "tahun",
    chart_title: "Unjuran Kos Perubatan (10 Tahun) / Medical Cost Projection (10 Years)",
    advice_heading: "Nasihat Peribadi / Personal Advice",

    alert_none_heading: "Amaran: Tiada Perlindungan!",
    alert_none_body: "Anda menanggung kos perubatan tanpa perlindungan dalam 10 tahun! Pertimbangkan untuk mendapatkan MHIT sekarang.",
    alert_basic_heading: "Semak Perlindungan Anda",
    alert_basic_body: "Anda mungkin memerlukan top-up perlindungan dalam beberapa tahun. Semak had pelan anda.",
    alert_comp_heading: "Perlindungan Baik!",
    alert_comp_body: "Perlindungan anda agak mencukupi untuk jangka pendek. Tetap semak pelan tahunan.",

    plan_none: "Tiada Perlindungan",
    plan_basic: "Perlindungan Asas",
    plan_comp: "Perlindungan Komprehensif",

    advice_abc: "⭐ ABC — Anggar, Bandingkan, Cari pelan yang sesuai untuk anda!",

    btn_recalculate: "← Kira Semula",
    btn_finish: "Tamat / Finish",

    chart_covered: "Ditanggung MHIT",
    chart_gap: "Kos Sendiri",
    tooltip_rm: "RM",
  },
  en: {
    welcome_title_bm: "Health Budget Planner",
    welcome_title_en: "Perancang Bajet Penjagaan Kesihatan",
    welcome_tagline: "Plan your health today, save more tomorrow!",
    welcome_start: "Start / Mulakan",

    info_header_title: "Know Your MHIT",
    info_header_sub: "Medical And Health Insurance/Takaful — ask our advisor!",
    tab_a_label: "What is MHIT?",
    tab_b_label: "Why Important?",
    tab_c_label: "How It Works?",
    tab_d_label: "ABC Before Buying",

    presenter_name: "Aisyah — Your MHIT Advisor",
    info_greet: "Hi! I'm Aisyah 👋 Your health advisor. Ask me about MHIT — tap a question below!",

    tab_a_title: "What is MHIT?",
    tab_a_def: "MHIT = Medical And Health Insurance/Takaful. A protection plan that helps cover treatment costs when sick or hospitalised.",
    tab_a_covers_label: "Covers:",
    tab_a_c1: "Hospital bills",
    tab_a_c2: "Treatment costs",
    tab_a_c3: "Medications",
    tab_a_c4: "Surgery & serious illnesses",
    tab_a_side_title: "Comprehensive Protection",
    tab_a_side_body: "You don't have to face medical costs alone.",
    tab_a_pill1_title: "Peace of Mind",
    tab_a_pill1_body: "Focus on recovery, not bills",
    tab_a_pill2_title: "Financial Protection",
    tab_a_pill2_body: "Your savings stay safe",

    tab_b_title: "Why is MHIT Important?",
    tab_b_p1_title: "Rising Medical Costs",
    tab_b_p1_body: "Medical costs keep rising — one treatment can cost thousands of ringgit.",
    tab_b_p2_title: "Savings at Risk",
    tab_b_p2_body: "Without coverage, your savings could be wiped out or you may need to borrow.",
    tab_b_p3_title: "Peace of Mind",
    tab_b_p3_body: "Peace of mind — focus on recovery, not bills.",
    tab_b_stat_title: "Did You Know?",
    tab_b_stat1: "Medical costs rise every year",
    tab_b_stat2: "Serious treatment cost for seniors",

    tab_c_title: "How Does MHIT Work?",
    tab_c_step1: "Pay your premium/contribution",
    tab_c_step2: "Pooled with others' contributions",
    tab_c_step3: "Pays your claims",
    tab_c_label: "Risk Pooling / Perkongsian Risiko",
    tab_c_side_title: "Stronger Together",
    tab_c_side_body: "When many people join, risk is shared. This makes protection more affordable for everyone.",
    tab_c_example_title: "Example",
    tab_c_example_body: "1,000 people pay RM100/month = RM100,000 pooled. If 10 people need RM8,000 each = RM80,000 — all covered!",

    tab_d_title: "ABC Before Buying MHIT",
    tab_d_a_title: "Assess your needs",
    tab_d_a_body: "Including your current health conditions",
    tab_d_b_title: "Compare options",
    tab_d_b_body: "Look at all available options in the market",
    tab_d_c_title: "Choose a suitable plan",
    tab_d_c_body: "According to your budget and needs",
    tab_d_q_title: "Questions to ask:",
    tab_d_q1: "What coverage is offered?",
    tab_d_q2: "How much is the premium?",
    tab_d_q3: "Will the premium increase with age?",
    info_continue_btn: "Continue to Planner →",

    input_title_bm: "Tell Us About You",
    input_title_en: "Beritahu Kami Tentang Anda",
    mascot_label: "Your Health Planner",
    age_label: "How old are you? / Berapa umur anda?",
    age_unit: "years old",
    age_confirm: "Confirm →",
    ack_age: "Great, thank you! Next question…",
    coverage_label: "Your current MHIT plan: / Pelan MHIT anda sekarang:",
    ack_cov_none: "Okay, don't worry — let's look at your projection!",
    ack_cov_basic: "Nice! Let's calculate your projection.",
    ack_cov_comprehensive: "Excellent! Let's check your projection.",
    cov_none_name: "No Coverage",
    cov_none_en: "Tiada Perlindungan",
    cov_none_limit: "None / Tiada",
    cov_basic_name: "Basic Coverage",
    cov_basic_en: "Perlindungan Asas",
    cov_comp_name: "Comprehensive Coverage",
    cov_comp_en: "Perlindungan Komprehensif",
    calculate_btn: "Calculate Now! / Kira Sekarang!",

    calc_title: "Analysing your health profile...",
    calc_subtitle: "Menganalisa profil kesihatan anda...",

    results_title: "Your Healthcare Cost Projection",
    results_years: "years old",
    chart_title: "Medical Cost Projection (10 Years) / Unjuran Kos Perubatan (10 Tahun)",
    advice_heading: "Personal Advice / Nasihat Peribadi",

    alert_none_heading: "Warning: No Coverage!",
    alert_none_body: "You face uncovered medical costs over 10 years! Consider getting MHIT coverage now.",
    alert_basic_heading: "Review Your Coverage",
    alert_basic_body: "You may need additional coverage in a few years. Review your plan limits.",
    alert_comp_heading: "Good Coverage!",
    alert_comp_body: "Your coverage is reasonably adequate for the short term. Still review annually.",

    plan_none: "No Coverage",
    plan_basic: "Basic Coverage",
    plan_comp: "Comprehensive Coverage",

    advice_abc: "⭐ ABC — Assess, Compare, Choose the right plan for you!",

    btn_recalculate: "← Recalculate",
    btn_finish: "Finish / Tamat",

    chart_covered: "MHIT Covered",
    chart_gap: "Out-of-Pocket",
    tooltip_rm: "RM",
  }
};

// ══════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════
let state = {
  lang: 'bm',
  screen: 'welcome',
  age: 30,
  coverage: 'basic',
  chartInstance: null,
  idleTimer: null,
  idleSeconds: 60,
  idleRemaining: 60,
};

// ══════════════════════════════════════════════════════
// LANG
// ══════════════════════════════════════════════════════
function setLang(lang) {
  state.lang = lang;
  document.getElementById('btn-bm').classList.toggle('active', lang === 'bm');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  renderI18n();
  if (state.screen === 'results') updateResults();
}

function t(key) {
  return STRINGS[state.lang][key] || STRINGS['bm'][key] || key;
}

function renderI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

// ══════════════════════════════════════════════════════
// ===== PRESENTER MODULE (shared P3/P4/P6) =====
// Drives the SVG advisor character + holographic speech bubbles.
//   Presenter.mount('stage-id')  — clone the character into a stage
//   Presenter.use('stage-id')    — make that stage the active one
//   Presenter.say(htmlOrNode, {talkMs})   — character speaks (bubble pop-in,
//                                           mouth + raised-hand gesture)
//   Presenter.ask(htmlOrNode, opts)       — alias of say() for questions
//   Presenter.userSay(text)               — small visitor bubble from bottom
//   Presenter.hide()                      — hide the main bubble
// ══════════════════════════════════════════════════════
const Presenter = (() => {
  const stages = {};
  let activeId = null;

  function mount(stageId) {
    const stage = document.getElementById(stageId);
    if (!stage || stages[stageId]) return;
    const charMount = stage.querySelector('.presenter-char');
    const tpl = document.getElementById('presenter-svg-template');
    charMount.appendChild(tpl.content.cloneNode(true));
    stages[stageId] = {
      stage,
      svg: charMount.querySelector('svg'),
      bubble: stage.querySelector('.bubble-main'),
      bubbleContent: stage.querySelector('.bubble-main .bubble-content'),
      userBubble: stage.querySelector('.bubble-user'),
      userContent: stage.querySelector('.bubble-user .bubble-content'),
      talkTimer: null,
      userTimer: null,
    };
  }

  function use(stageId) { activeId = stageId; return stages[stageId]; }
  function get() { return stages[activeId]; }

  function rescueStoredPanels(container) {
    // Info panels live in #info-store; never destroy them with innerHTML=''
    const store = document.getElementById('info-store');
    if (!store) return;
    container.querySelectorAll('.tab-panel').forEach(p => store.appendChild(p));
  }

  function say(content, opts) {
    const s = get();
    if (!s) return;
    const o = opts || {};
    const talkMs = o.talkMs || 2800;
    // re-trigger pop-in animation
    s.bubble.classList.remove('visible');
    void s.bubble.offsetWidth;
    rescueStoredPanels(s.bubbleContent);
    if (typeof content === 'string') {
      s.bubbleContent.innerHTML = '<div class="bubble-line">' + content + '</div>';
    } else {
      s.bubbleContent.innerHTML = '';
      s.bubbleContent.appendChild(content);
    }
    s.bubbleContent.scrollTop = 0;
    s.bubble.classList.add('visible');
    // speaking gesture: open mouth + raised hand, then settle back to idle
    s.svg.classList.add('is-talking');
    clearTimeout(s.talkTimer);
    s.talkTimer = setTimeout(() => s.svg.classList.remove('is-talking'), talkMs);
  }

  function ask(content, opts) { say(content, opts); }

  function userSay(text, holdMs) {
    const s = get();
    if (!s) return;
    s.userContent.textContent = text;
    s.userBubble.classList.remove('visible');
    void s.userBubble.offsetWidth;
    s.userBubble.classList.add('visible');
    clearTimeout(s.userTimer);
    s.userTimer = setTimeout(() => s.userBubble.classList.remove('visible'), holdMs || 2200);
  }

  function hide() {
    const s = get();
    if (!s) return;
    rescueStoredPanels(s.bubbleContent);
    s.bubble.classList.remove('visible');
    s.svg.classList.remove('is-talking');
  }

  return { mount, use, say, ask, userSay, hide };
})();
// ===== END PRESENTER MODULE =====

// ══════════════════════════════════════════════════════
// SCREEN NAV (scanline sweep + glitch-in + SFX swap)
// ══════════════════════════════════════════════════════
function runScanSweep() {
  const s = document.getElementById('scan-sweep');
  s.classList.remove('run');
  void s.offsetWidth;
  s.classList.add('run');
}

function runGlitch(screenEl) {
  screenEl.querySelectorAll('.glitch').forEach(el => {
    el.classList.remove('glitch-in');
    void el.offsetWidth;
    el.classList.add('glitch-in');
  });
}

function goToScreen(name) {
  const screens = ['welcome','info','input','calculating','results'];
  screens.forEach(s => {
    document.getElementById('screen-' + s).classList.remove('active');
  });
  const scr = document.getElementById('screen-' + name);
  scr.classList.add('active');
  state.screen = name;
  SFX.swap();
  runScanSweep();
  runGlitch(scr);
  resetIdle();
  if (name === 'info') {
    Presenter.use('stage-info');
    setTimeout(() => Presenter.say(t('info_greet')), 450);
  }
  if (name === 'input') {
    startPlanner();
  }
  if (name === 'results') {
    setTimeout(() => { renderResults(); SFX.win(); }, 100);
  }
  if (name !== 'welcome') startIdleTimer();
  else stopIdleTimer();
}

function startCalculation() {
  goToScreen('calculating');
  // Reset and restart animation
  const fill = document.getElementById('progress-fill');
  fill.style.animation = 'none';
  fill.offsetHeight; // reflow
  fill.style.animation = 'progress-fill 2s ease-in-out forwards';
  setTimeout(() => goToScreen('results'), 2200);
}

// ══════════════════════════════════════════════════════
// INFO — "ASK THE ADVISOR" (replaces the old tab switcher;
// same four topics, same content, now answered in a speech bubble)
// ══════════════════════════════════════════════════════
const INFO_TABS = ['a','b','c','d'];
const INFO_CHIP_KEYS = ['tab_a_label','tab_b_label','tab_c_label','tab_d_label'];
let INFO_PANELS = [];

function askInfo(idx) {
  Presenter.use('stage-info');
  // chip highlight
  INFO_TABS.forEach((_, i) => {
    document.getElementById('chip-' + i).classList.toggle('active', i === idx);
  });
  // visitor's question pops up from the bottom...
  Presenter.userSay(t(INFO_CHIP_KEYS[idx]));
  // ...then the advisor answers in her speech bubble
  setTimeout(() => {
    SFX.swap();
    Presenter.say(INFO_PANELS[idx], { talkMs: 3200 });
  }, 450);
  resetIdle();
}

// ══════════════════════════════════════════════════════
// HEALTH PLANNER — ADVISOR INTERVIEW
// Same two questions (age, current MHIT plan), same data + result logic;
// the character now asks them in sequence via speech bubbles.
// ══════════════════════════════════════════════════════
function showAnswerPanel(id) {
  document.querySelectorAll('.answer-panel').forEach(p => p.classList.remove('show'));
  if (id) {
    const p = document.getElementById(id);
    p.classList.remove('show');
    void p.offsetWidth;
    p.classList.add('show');
  }
}

function startPlanner() {
  Presenter.use('stage-planner');
  Presenter.hide();
  showAnswerPanel(null);
  setTimeout(() => {
    Presenter.ask(t('age_label'));
    showAnswerPanel('answer-age');
  }, 500);
}

function confirmAge() {
  Presenter.use('stage-planner');
  Presenter.userSay(state.age + ' ' + t('age_unit'));
  showAnswerPanel(null);
  setTimeout(() => Presenter.say(t('ack_age'), { talkMs: 1400 }), 450);
  setTimeout(() => {
    SFX.swap();
    Presenter.ask(t('coverage_label'));
    showAnswerPanel('answer-coverage');
  }, 1800);
}

function answerCoverage(type) {
  selectCoverage(type);
  Presenter.use('stage-planner');
  const nameKey = { none: 'cov_none_name', basic: 'cov_basic_name', comprehensive: 'cov_comp_name' }[type];
  Presenter.userSay(t(nameKey));
  setTimeout(() => Presenter.say(t('ack_cov_' + type), { talkMs: 1500 }), 450);
  setTimeout(() => {
    showAnswerPanel(null);
    startCalculation();
  }, 1900);
}

// ══════════════════════════════════════════════════════
// AGE CONTROL
// ══════════════════════════════════════════════════════
function changeAge(delta) {
  const prev = state.age;
  state.age = Math.max(18, Math.min(70, state.age + delta));
  if (state.age === prev) SFX.lose(); // invalid: hit the 18–70 boundary
  document.getElementById('age-display').textContent = state.age;
  updateAgeBands();
  resetIdle();
}

function updateAgeBands() {
  document.querySelectorAll('.age-band').forEach(band => {
    const min = parseInt(band.dataset.min);
    const max = parseInt(band.dataset.max);
    band.classList.toggle('active', state.age >= min && state.age <= max);
  });
}

// ══════════════════════════════════════════════════════
// COVERAGE
// ══════════════════════════════════════════════════════
function selectCoverage(type) {
  state.coverage = type;
  document.querySelectorAll('.coverage-card').forEach(c => c.classList.remove('selected'));
  document.querySelector('.coverage-card.' + type).classList.add('selected');
  resetIdle();
}

// ══════════════════════════════════════════════════════
// CALCULATION
// ══════════════════════════════════════════════════════
function getBaseCost(age) {
  if (age <= 25) return 3000;
  if (age <= 35) return 5000;
  if (age <= 45) return 8000;
  if (age <= 55) return 15000;
  return 25000;
}

function getCoveragePct(coverage) {
  if (coverage === 'none') return 0;
  if (coverage === 'basic') return 0.6;
  return 0.9;
}

function calcYear(baseCost, year, coveragePct) {
  const yearCost = baseCost * Math.pow(1.10, year);
  const covered = yearCost * coveragePct;
  const gap = yearCost * (1 - coveragePct);
  return { yearCost, covered, gap };
}

function calcProjections() {
  const baseCost = getBaseCost(state.age);
  const pct = getCoveragePct(state.coverage);
  const years = [1, 3, 5, 10];
  return years.map(y => ({ year: y, ...calcYear(baseCost, y, pct) }));
}

function calcTotal10yr() {
  const baseCost = getBaseCost(state.age);
  const pct = getCoveragePct(state.coverage);
  let total = 0;
  for (let y = 1; y <= 10; y++) {
    total += baseCost * Math.pow(1.10, y) * (1 - pct);
  }
  return Math.round(total);
}

function fmtRM(val) {
  return 'RM ' + Math.round(val).toLocaleString('en-MY');
}

// ══════════════════════════════════════════════════════
// RESULTS RENDER
// ══════════════════════════════════════════════════════
function renderResults() {
  const projs = calcProjections();
  const total10 = calcTotal10yr();

  // Badges
  document.getElementById('badge-age').innerHTML = '👤 ' + state.age + ' <span>' + t('results_years') + '</span>';
  const planMap = { none: 'plan_none', basic: 'plan_basic', comprehensive: 'plan_comp' };
  const planClassMap = { none: 'badge-plan-none', basic: 'badge-plan-basic', comprehensive: 'badge-plan-comprehensive' };
  const badgePlan = document.getElementById('badge-plan');
  badgePlan.className = 'badge ' + planClassMap[state.coverage];
  const iconMap = { none: '🚫', basic: '🛡️', comprehensive: '⭐' };
  document.getElementById('badge-plan-text').textContent = iconMap[state.coverage] + ' ' + t(planMap[state.coverage]);

  // Chart
  if (state.chartInstance) {
    state.chartInstance.destroy();
    state.chartInstance = null;
  }

  const covData = projs.map(p => Math.round(p.covered));
  const gapData = projs.map(p => Math.round(p.gap));

  const ctx = document.getElementById('results-chart').getContext('2d');
  state.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Tahun 1 / Year 1', 'Tahun 3 / Year 3', 'Tahun 5 / Year 5', 'Tahun 10 / Year 10'],
      datasets: [
        {
          label: t('chart_covered'),
          data: covData,
          backgroundColor: 'rgba(0,180,166,0.8)',
          borderColor: '#00B4A6',
          borderWidth: 2,
          borderRadius: 8,
        },
        {
          label: t('chart_gap'),
          data: gapData,
          backgroundColor: 'rgba(255,107,91,0.8)',
          borderColor: '#FF6B5B',
          borderWidth: 2,
          borderRadius: 8,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'Nunito', size: 14, weight: '700' },
            padding: 16,
          }
        },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              return ctx.dataset.label + ': ' + fmtRM(ctx.raw);
            }
          },
          titleFont: { family: 'Poppins', size: 14, weight: '700' },
          bodyFont: { family: 'Nunito', size: 13 },
          padding: 12,
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { font: { family: 'Nunito', size: 13, weight: '600' } }
        },
        y: {
          stacked: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: {
            font: { family: 'Nunito', size: 12 },
            callback: v => 'RM ' + v.toLocaleString('en-MY')
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart',
      }
    }
  });

  // Alert card
  const alertCard = document.getElementById('alert-card');
  const alertIcon = document.getElementById('alert-icon');
  const alertHeading = document.getElementById('alert-heading');
  const alertBody = document.getElementById('alert-body');

  if (state.coverage === 'none') {
    alertCard.className = 'alert-card amber';
    alertIcon.textContent = '🚨';
    alertHeading.textContent = t('alert_none_heading');
    const body = t('alert_none_body');
    alertBody.textContent = body.replace('{total10yr}', fmtRM(total10));
    // Insert actual value
    alertBody.textContent = (state.lang === 'bm'
      ? 'Anda menanggung ' + fmtRM(total10) + ' kos perubatan tanpa perlindungan dalam 10 tahun! Pertimbangkan untuk mendapatkan MHIT sekarang.'
      : 'You face ' + fmtRM(total10) + ' in uncovered medical costs over 10 years! Consider getting MHIT coverage now.');
  } else if (state.coverage === 'basic') {
    alertCard.className = 'alert-card blue';
    alertIcon.textContent = '💡';
    alertHeading.textContent = t('alert_basic_heading');
    alertBody.textContent = t('alert_basic_body');
  } else {
    alertCard.className = 'alert-card green';
    alertIcon.textContent = '✅';
    alertHeading.textContent = t('alert_comp_heading');
    alertBody.textContent = t('alert_comp_body');
  }

  // Advice cards
  renderAdvice();

  // Animate advice cards
  const adviceCards = document.querySelectorAll('.advice-card');
  adviceCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
    }, 300 + i * 150);
  });
}

function renderAdvice() {
  const isYoung = state.age <= 35;
  const isMid = state.age > 35 && state.age <= 55;
  const isSenior = state.age > 55;
  const cov = state.coverage;
  const lang = state.lang;

  const advice = getAdvice(isYoung, isMid, isSenior, cov, lang);

  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('advice-text-' + i);
    const icon = document.getElementById('advice-icon-' + i);
    if (el && advice[i-1]) {
      el.innerHTML = advice[i-1].text;
      icon.textContent = advice[i-1].icon;
    }
  }
}

function getAdvice(isYoung, isMid, isSenior, cov, lang) {
  const bm = lang === 'bm';
  const advices = [];

  // Age + coverage specific
  if (isYoung && cov === 'none') {
    advices.push({
      icon: '🌱',
      text: bm
        ? '<strong>Mulakan MHIT awal!</strong> Premium lebih rendah ketika muda. Semakin awal anda mula, semakin banyak anda jimat.'
        : '<strong>Start MHIT early!</strong> Premiums are lower when you\'re young. The earlier you start, the more you save.'
    });
  } else if (isYoung && cov === 'basic') {
    advices.push({
      icon: '📈',
      text: bm
        ? '<strong>Semak had perlindungan anda.</strong> Pelan asas mungkin tidak mencukupi 5–10 tahun lagi apabila kos perubatan meningkat.'
        : '<strong>Check your coverage limits.</strong> A basic plan may not be enough in 5–10 years as medical costs rise.'
    });
  } else if (isYoung && cov === 'comprehensive') {
    advices.push({
      icon: '🏆',
      text: bm
        ? '<strong>Pilihan bijak!</strong> Perlindungan komprehensif pada usia muda memastikan anda dilindungi jangka panjang dengan premium lebih berpatutan.'
        : '<strong>Smart choice!</strong> Comprehensive coverage at a young age ensures long-term protection at more affordable premiums.'
    });
  } else if (isMid && cov === 'none') {
    advices.push({
      icon: '⚠️',
      text: bm
        ? '<strong>Risiko tinggi!</strong> Pada usia pertengahan, risiko penyakit kronik meningkat. Mulakan MHIT sekarang sebelum terlambat.'
        : '<strong>High risk!</strong> In middle age, chronic disease risk increases. Start MHIT now before it\'s too late.'
    });
  } else if (isMid && cov === 'basic') {
    advices.push({
      icon: '🔄',
      text: bm
        ? '<strong>Pertimbangkan naik taraf.</strong> Pada usia ini, kos rawatan lebih tinggi. Pelan komprehensif mungkin lebih berbaloi.'
        : '<strong>Consider upgrading.</strong> At this age, treatment costs are higher. A comprehensive plan may be more worthwhile.'
    });
  } else if (isMid && cov === 'comprehensive') {
    advices.push({
      icon: '✅',
      text: bm
        ? '<strong>Perlindungan baik!</strong> Pastikan had perlindungan anda mencukupi untuk rawatan kritikal dan penyakit serius.'
        : '<strong>Good coverage!</strong> Ensure your coverage limits are sufficient for critical treatments and serious illnesses.'
    });
  } else if (isSenior) {
    advices.push({
      icon: '👴',
      text: bm
        ? '<strong>Pastikan had perlindungan mencukupi.</strong> Warga emas menghadapi kos perubatan lebih tinggi. Bincang dengan agen MHIT bertauliah.'
        : '<strong>Ensure coverage is sufficient.</strong> Seniors face higher medical costs. Speak with a licensed MHIT agent.'
    });
  }

  // Generic second advice
  advices.push({
    icon: '📅',
    text: bm
      ? '<strong>Semak pelan anda setiap tahun</strong> — kos perubatan meningkat ~10% setahun. Pastikan had perlindungan anda mengikuti inflasi perubatan.'
      : '<strong>Review your plan annually</strong> — medical costs rise ~10% per year. Make sure your coverage keeps up with medical inflation.'
  });

  // Third advice
  advices.push({
    icon: '🤝',
    text: bm
      ? '<strong>Dapatkan nasihat profesional.</strong> Hubungi ejen atau penasihat MHIT berlesen untuk pilihan pelan yang paling sesuai dengan keperluan anda.'
      : '<strong>Get professional advice.</strong> Contact a licensed MHIT agent or advisor for the plan options best suited to your needs.'
  });

  return advices.slice(0, 3);
}

function updateResults() {
  if (state.screen === 'results') renderResults();
}

// ══════════════════════════════════════════════════════
// IDLE TIMER
// ══════════════════════════════════════════════════════
function resetIdle() {
  stopIdleTimer();
  if (state.screen !== 'welcome') startIdleTimer();
}

function startIdleTimer() {
  state.idleRemaining = state.idleSeconds;
  const bar = document.getElementById('idle-bar');
  bar.classList.remove('visible');
  bar.style.width = '100%';

  state.idleTimer = setInterval(() => {
    state.idleRemaining--;
    const pct = (state.idleRemaining / state.idleSeconds) * 100;
    bar.style.width = pct + '%';

    if (state.idleRemaining <= 15) {
      bar.classList.add('visible');
    }

    if (state.idleRemaining <= 0) {
      stopIdleTimer();
      goToScreen('welcome');
    }
  }, 1000);
}

function stopIdleTimer() {
  if (state.idleTimer) {
    clearInterval(state.idleTimer);
    state.idleTimer = null;
  }
  document.getElementById('idle-bar').classList.remove('visible');
  document.getElementById('idle-bar').style.width = '100%';
}

// ══════════════════════════════════════════════════════
// KIOSK HARDENING
// ══════════════════════════════════════════════════════
// Disable long-press context menu + text selection
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

// Fullscreen on first touch/click
const goFullscreen = () => {
  document.documentElement.requestFullscreen().catch(() => {});
  document.removeEventListener('pointerdown', goFullscreen);
};
document.addEventListener('pointerdown', goFullscreen);

// SFX.tap() on every button-like press (delegated)
document.addEventListener('pointerdown', e => {
  if (e.target.closest('button, .chip, .coverage-card, .age-btn')) SFX.tap();
}, { passive: true });

// ══════════════════════════════════════════════════════
// RESET IDLE ON INTERACTION
// ══════════════════════════════════════════════════════
['click','touchstart','mousemove','keydown'].forEach(evt => {
  document.addEventListener(evt, () => {
    if (state.screen !== 'welcome') resetIdle();
  }, { passive: true });
});

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // mount the shared character into both presenter stages
  Presenter.mount('stage-info');
  Presenter.mount('stage-planner');
  // cache the advisor's answer panels (they move between #info-store
  // and the info speech bubble)
  INFO_PANELS = INFO_TABS.map(x => document.getElementById('tab-' + x));
  updateAgeBands();
  renderI18n();
});
