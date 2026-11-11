// Application State
const state = {
  mode: 'practice', // 'practice' or 'exam'
  questions: [],
  currentIndex: 0,
  timerSeconds: 0,
  timerInterval: null,
  startTime: null,
  endTime: null,
  lastErrors: []
};

// DOM Elements
const elements = {
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  searchBtn: document.getElementById('searchBtn'),
  openSearchFromHomeBtn: document.getElementById('openSearchFromHomeBtn'),
  searchModal: document.getElementById('searchModal'),
  closeSearchBtn: document.getElementById('closeSearchBtn'),
  searchInput: document.getElementById('searchInput'),
  searchResultsList: document.getElementById('searchResultsList'),
  headerLogo: document.getElementById('headerLogo'),

  // Screens
  startScreen: document.getElementById('startScreen'),
  quizScreen: document.getElementById('quizScreen'),
  resultsScreen: document.getElementById('resultsScreen'),

  // Start Screen Controls
  modeCardPractice: document.getElementById('modeCardPractice'),
  modeCardExam: document.getElementById('modeCardExam'),
  questionCountSelect: document.getElementById('questionCountSelect'),
  shuffleQuestionsCheck: document.getElementById('shuffleQuestionsCheck'),
  shuffleOptionsCheck: document.getElementById('shuffleOptionsCheck'),
  startBtn: document.getElementById('startBtn'),

  // Quiz Screen Controls
  quizModeBadge: document.getElementById('quizModeBadge'),
  questionCounter: document.getElementById('questionCounter'),
  quizTimer: document.getElementById('quizTimer'),
  progressBar: document.getElementById('progressBar'),
  questionCategory: document.getElementById('questionCategory'),
  questionText: document.getElementById('questionText'),
  optionsContainer: document.getElementById('optionsContainer'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  exitQuizBtn: document.getElementById('exitQuizBtn'),
  questionNavGrid: document.getElementById('questionNavGrid'),
  answeredStats: document.getElementById('answeredStats'),

  // Results Screen Controls
  resPercent: document.getElementById('resPercent'),
  resFraction: document.getElementById('resFraction'),
  gradeBadge: document.getElementById('gradeBadge'),
  gradeMessage: document.getElementById('gradeMessage'),
  statCorrect: document.getElementById('statCorrect'),
  statWrong: document.getElementById('statWrong'),
  statSkipped: document.getElementById('statSkipped'),
  statTime: document.getElementById('statTime'),
  retryAllBtn: document.getElementById('retryAllBtn'),
  retryErrorsBtn: document.getElementById('retryErrorsBtn'),
  resultsHomeBtn: document.getElementById('resultsHomeBtn'),
  reviewContainer: document.getElementById('reviewContainer'),
  filterButtons: document.querySelectorAll('.filter-btn')
};

// --- Theme Management ---
function initTheme() {
  const savedTheme = localStorage.getItem('exam_quiz_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('exam_quiz_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  elements.themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// --- Screen Switching ---
function showScreen(screen) {
  [elements.startScreen, elements.quizScreen, elements.resultsScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Utility: Shuffle Array ---
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// --- Start Quiz ---
function startQuiz(customQuestions = null) {
  if (typeof EXAM_QUESTIONS === 'undefined' || !EXAM_QUESTIONS.length) {
    alert('Ошибка: вопросы не загружены.');
    return;
  }

  let pool = customQuestions ? [...customQuestions] : [...EXAM_QUESTIONS];

  const shuffleQ = elements.shuffleQuestionsCheck.checked;
  const shuffleOpt = elements.shuffleOptionsCheck.checked;
  const countChoice = elements.questionCountSelect.value;

  if (shuffleQ && !customQuestions) {
    pool = shuffleArray(pool);
  }

  if (!customQuestions && countChoice !== 'all') {
    const limit = parseInt(countChoice, 10);
    pool = pool.slice(0, limit);
  }

  state.questions = pool.map(item => {
    let opts = [...item.options];
    let correctIdx = item.correct;

    if (shuffleOpt) {
      const indexedOpts = opts.map((text, idx) => ({ text, isCorrect: idx === correctIdx }));
      const shuffled = shuffleArray(indexedOpts);
      opts = shuffled.map(o => o.text);
      correctIdx = shuffled.findIndex(o => o.isCorrect);
    }

    return {
      id: item.id,
      question: item.question,
      options: opts,
      correct: correctIdx,
      userAnswer: null
    };
  });

  state.currentIndex = 0;
  state.startTime = Date.now();
  state.endTime = null;

  // Set mode badge
  if (state.mode === 'practice') {
    elements.quizModeBadge.className = 'mode-badge mode-practice';
    elements.quizModeBadge.textContent = '💡 Обучение';
    elements.quizTimer.style.display = 'none';
  } else {
    elements.quizModeBadge.className = 'mode-badge mode-exam';
    elements.quizModeBadge.textContent = '⏱️ Экзамен';
    elements.quizTimer.style.display = 'inline-flex';
    initTimer();
  }

  renderNavGrid();
  renderCurrentQuestion();
  showScreen(elements.quizScreen);
}

// --- Timer for Exam Mode ---
function initTimer() {
  clearInterval(state.timerInterval);
  // Give 1 minute per question, minimum 15 mins
  state.timerSeconds = Math.max(state.questions.length * 60, 15 * 60);
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    updateTimerDisplay();
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      alert('Время экзамена истекло! Тест автоматически завершается.');
      finishQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(state.timerSeconds / 60);
  const s = state.timerSeconds % 60;
  const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  elements.quizTimer.querySelector('span').textContent = formatted;

  if (state.timerSeconds <= 300) { // < 5 minutes
    elements.quizTimer.classList.add('warning');
  } else {
    elements.quizTimer.classList.remove('warning');
  }
}

// --- Render Current Question ---
function renderCurrentQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;

  elements.questionCounter.textContent = `Вопрос ${state.currentIndex + 1} из ${total}`;
  elements.questionCategory.textContent = `Вопрос #${q.id || (state.currentIndex + 1)}`;
  elements.questionText.textContent = q.question;

  const progressPercent = ((state.currentIndex + 1) / total) * 100;
  elements.progressBar.style.width = `${progressPercent}%`;

  // Render options
  elements.optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';

    const letterSpan = document.createElement('span');
    letterSpan.className = 'option-letter';
    letterSpan.textContent = letters[optIdx] || (optIdx + 1);

    const contentSpan = document.createElement('span');
    contentSpan.className = 'option-content';
    contentSpan.textContent = optText;

    btn.appendChild(letterSpan);
    btn.appendChild(contentSpan);

    // Apply state if already answered
    if (q.userAnswer !== null) {
      if (state.mode === 'practice') {
        if (optIdx === q.correct) {
          btn.classList.add('correct');
        } else if (optIdx === q.userAnswer) {
          btn.classList.add('wrong');
        }
      } else {
        if (optIdx === q.userAnswer) {
          btn.classList.add('selected');
        }
      }
    }

    btn.addEventListener('click', () => handleSelectOption(optIdx));
    elements.optionsContainer.appendChild(btn);
  });

  // Update button texts
  elements.prevBtn.style.visibility = state.currentIndex === 0 ? 'hidden' : 'visible';
  if (state.currentIndex === total - 1) {
    elements.nextBtn.textContent = 'Завершить 🏁';
  } else {
    elements.nextBtn.textContent = 'Далее →';
  }

  updateNavGridActive();
  updateAnsweredCounter();
}

// --- Handle Option Selection ---
function handleSelectOption(optIdx) {
  const q = state.questions[state.currentIndex];
  q.userAnswer = optIdx;

  if (state.mode === 'practice') {
    // In practice mode, render immediately with correct/wrong highlight
    renderCurrentQuestion();
  } else {
    // In exam mode, mark selected
    const allBtns = elements.optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach((b, idx) => {
      b.classList.toggle('selected', idx === optIdx);
    });
  }

  updateNavGridItem(state.currentIndex);
  updateAnsweredCounter();
}

// --- Navigation Grid ---
function renderNavGrid() {
  elements.questionNavGrid.innerHTML = '';
  state.questions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'nav-num-btn';
    btn.textContent = idx + 1;
    btn.title = `Вопрос ${idx + 1}`;
    btn.addEventListener('click', () => {
      state.currentIndex = idx;
      renderCurrentQuestion();
    });
    elements.questionNavGrid.appendChild(btn);
  });
}

function updateNavGridActive() {
  const btns = elements.questionNavGrid.querySelectorAll('.nav-num-btn');
  btns.forEach((btn, idx) => {
    btn.classList.toggle('current', idx === state.currentIndex);
  });
}

function updateNavGridItem(idx) {
  const btns = elements.questionNavGrid.querySelectorAll('.nav-num-btn');
  const btn = btns[idx];
  if (!btn) return;

  const q = state.questions[idx];
  if (q.userAnswer === null) {
    btn.className = 'nav-num-btn';
  } else if (state.mode === 'practice') {
    if (q.userAnswer === q.correct) {
      btn.className = 'nav-num-btn correct';
    } else {
      btn.className = 'nav-num-btn wrong';
    }
  } else {
    btn.className = 'nav-num-btn answered';
  }

  if (idx === state.currentIndex) {
    btn.classList.add('current');
  }
}

function updateAnsweredCounter() {
  const answered = state.questions.filter(q => q.userAnswer !== null).length;
  elements.answeredStats.textContent = `Отвечено: ${answered} / ${state.questions.length}`;
}
// --- Finish Quiz & Show Results ---
function finishQuiz() {
  clearInterval(state.timerInterval);
  state.endTime = Date.now();

  const total = state.questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;
  const errors = [];

  state.questions.forEach(q => {
    if (q.userAnswer === null) {
      skippedCount++;
      errors.push(q);
    } else if (q.userAnswer === q.correct) {
      correctCount++;
    } else {
      wrongCount++;
      errors.push(q);
    }
  });

  state.lastErrors = errors;

  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  elements.resPercent.textContent = `${percent}%`;
  elements.resFraction.textContent = `${correctCount} / ${total}`;

  elements.statCorrect.textContent = correctCount;
  elements.statWrong.textContent = wrongCount;
  elements.statSkipped.textContent = skippedCount;

  // Format elapsed time
  const elapsedSeconds = Math.round((state.endTime - state.startTime) / 1000);
  const m = Math.floor(elapsedSeconds / 60);
  const s = elapsedSeconds % 60;
  elements.statTime.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  // Calculate Grade
  let gradeText = '';
  let gradeClass = '';
  let gradeMsg = '';

  if (percent >= 85) {
    gradeText = 'Отлично (5)';
    gradeClass = 'grade-badge grade-5';
    gradeMsg = 'Великолепный результат! Вы отлично знаете материал профессионального модуля.';
  } else if (percent >= 70) {
    gradeText = 'Хорошо (4)';
    gradeClass = 'grade-badge grade-4';
    gradeMsg = 'Хороший результат! Вы уверенно ориентируетесь в вопросах.';
  } else if (percent >= 50) {
    gradeText = 'Удовлетворительно (3)';
    gradeClass = 'grade-badge grade-3';
    gradeMsg = 'Тест сдан, но есть пробелы. Рекомендуется повторить вопросы с ошибками.';
  } else {
    gradeText = 'Неудовлетворительно (2)';
    gradeClass = 'grade-badge grade-2';
    gradeMsg = 'К сожалению, порог не пройден. Потренируйтесь в режиме «Обучение» и попробуйте снова.';
  }

  elements.gradeBadge.className = gradeClass;
  elements.gradeBadge.textContent = gradeText;
  elements.gradeMessage.textContent = gradeMsg;

  // Toggle Retry Errors Button
  if (errors.length > 0) {
    elements.retryErrorsBtn.style.display = 'inline-flex';
    elements.retryErrorsBtn.textContent = `⚠️ Повторить ошибки (${errors.length})`;
  } else {
    elements.retryErrorsBtn.style.display = 'none';
  }

  renderReviewList('all');
  showScreen(elements.resultsScreen);
}

// --- Render Review List ---
function renderReviewList(filter) {
  elements.reviewContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  let list = state.questions;
  if (filter === 'wrong') {
    list = state.questions.filter(q => q.userAnswer === null || q.userAnswer !== q.correct);
  } else if (filter === 'correct') {
    list = state.questions.filter(q => q.userAnswer !== null && q.userAnswer === q.correct);
  }

  if (list.length === 0) {
    elements.reviewContainer.innerHTML = '<p style="color: var(--text-muted); padding: 1rem 0;">В этой категории вопросов нет.</p>';
    return;
  }

  list.forEach((q, idx) => {
    const isCorrect = q.userAnswer === q.correct;
    const isSkipped = q.userAnswer === null;

    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'is-correct' : (isSkipped ? 'is-skipped' : 'is-wrong')}`;

    const originalIdx = state.questions.indexOf(q) + 1;
    const qTitle = document.createElement('div');
    qTitle.className = 'review-q';
    qTitle.textContent = `${originalIdx}. ${q.question}`;
    item.appendChild(qTitle);

    if (isSkipped) {
      const skipNotice = document.createElement('div');
      skipNotice.className = 'review-answer user-wrong';
      skipNotice.textContent = '❌ Ответ не был дан';
      item.appendChild(skipNotice);
    } else if (!isCorrect) {
      const userAns = document.createElement('div');
      userAns.className = 'review-answer user-wrong';
      const userLetter = letters[q.userAnswer] || '';
      userAns.textContent = `❌ Ваш ответ: ${userLetter}) ${q.options[q.userAnswer]}`;
      item.appendChild(userAns);
    }

    const correctAns = document.createElement('div');
    correctAns.className = 'review-answer correct-ans';
    const corrLetter = letters[q.correct] || '';
    correctAns.textContent = `✔ Правильный ответ: ${corrLetter}) ${q.options[q.correct]}`;
    item.appendChild(correctAns);

    elements.reviewContainer.appendChild(item);
  });
}

// --- Cheatsheet / Search Functionality ---
function openSearchModal() {
  elements.searchModal.classList.add('open');
  elements.searchInput.value = '';
  renderSearchResults('');
  setTimeout(() => elements.searchInput.focus(), 100);
}

function closeSearchModal() {
  elements.searchModal.classList.remove('open');
}

function renderSearchResults(query) {
  elements.searchResultsList.innerHTML = '';
  const qClean = query.trim().toLowerCase();
  const letters = ['A', 'B', 'C', 'D', 'E'];

  if (typeof EXAM_QUESTIONS === 'undefined') return;

  const results = EXAM_QUESTIONS.filter(item => {
    if (!qClean) return true;
    return item.question.toLowerCase().includes(qClean) ||
           item.options.some(opt => opt.toLowerCase().includes(qClean));
  });

  const displayList = results.slice(0, 50); // Show top 50 matches

  if (displayList.length === 0) {
    elements.searchResultsList.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">Ничего не найдено по вашему запросу.</p>';
    return;
  }

  displayList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'search-item';

    const qText = document.createElement('div');
    qText.className = 'search-item-q';
    qText.textContent = `#${item.id}. ${item.question}`;
    card.appendChild(qText);

    const ansText = document.createElement('div');
    ansText.className = 'search-item-ans';
    const corrLetter = letters[item.correct] || '';
    ansText.textContent = `✔ ${corrLetter}) ${item.options[item.correct]}`;
    card.appendChild(ansText);

    elements.searchResultsList.appendChild(card);
  });
}

// --- Event Listeners Setup ---
function setupEvents() {
  // Theme toggle
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Logo / Home click
  elements.headerLogo.addEventListener('click', () => {
    if (elements.quizScreen.classList.contains('active')) {
      if (confirm('Прервать текущее тестирование и вернуться на главную страницу?')) {
        clearInterval(state.timerInterval);
        showScreen(elements.startScreen);
      }
    } else {
      showScreen(elements.startScreen);
    }
  });

  // Mode Selection Cards
  elements.modeCardPractice.addEventListener('click', () => {
    state.mode = 'practice';
    elements.modeCardPractice.classList.add('selected');
    elements.modeCardExam.classList.remove('selected');
  });

  elements.modeCardExam.addEventListener('click', () => {
    state.mode = 'exam';
    elements.modeCardExam.classList.add('selected');
    elements.modeCardPractice.classList.remove('selected');
  });

  // Start Test Button
  elements.startBtn.addEventListener('click', () => startQuiz());

  // Navigation Buttons
  elements.prevBtn.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentQuestion();
    }
  });

  elements.nextBtn.addEventListener('click', () => {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    } else {
      // Last question -> Finish
      const unans = state.questions.filter(q => q.userAnswer === null).length;
      if (unans > 0) {
        if (confirm(`У вас осталось неотвеченных вопросов: ${unans}. Всё равно завершить тест?`)) {
          finishQuiz();
        }
      } else {
        finishQuiz();
      }
    }
  });

  // Exit Quiz Button
  elements.exitQuizBtn.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите завершить тест и посмотреть результаты?')) {
      finishQuiz();
    }
  });

  // Results Buttons
  elements.retryAllBtn.addEventListener('click', () => {
    startQuiz();
  });

  elements.retryErrorsBtn.addEventListener('click', () => {
    if (state.lastErrors && state.lastErrors.length > 0) {
      startQuiz(state.lastErrors);
    }
  });

  elements.resultsHomeBtn.addEventListener('click', () => {
    showScreen(elements.startScreen);
  });

  // Filter Review
  elements.filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderReviewList(btn.getAttribute('data-filter'));
    });
  });

  // Search / Cheatsheet Modal
  elements.searchBtn.addEventListener('click', openSearchModal);
  elements.openSearchFromHomeBtn.addEventListener('click', openSearchModal);
  elements.closeSearchBtn.addEventListener('click', closeSearchModal);
  elements.searchModal.addEventListener('click', e => {
    if (e.target === elements.searchModal) closeSearchModal();
  });

  elements.searchInput.addEventListener('input', e => {
    renderSearchResults(e.target.value);
  });

  // Keyboard Navigation
  window.addEventListener('keydown', e => {
    if (elements.searchModal.classList.contains('open')) {
      if (e.key === 'Escape') closeSearchModal();
      return;
    }

    if (!elements.quizScreen.classList.contains('active')) return;

    // Keys 1-5 or A-E to select options
    const num = parseInt(e.key, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      handleSelectOption(num - 1);
    } else if (['a', 'b', 'c', 'd', 'e', 'A', 'B', 'C', 'D', 'E'].includes(e.key)) {
      const charCode = e.key.toUpperCase().charCodeAt(0) - 65;
      if (charCode >= 0 && charCode <= 4) {
        handleSelectOption(charCode);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      elements.nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      elements.prevBtn.click();
    }
  });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEvents();
});

