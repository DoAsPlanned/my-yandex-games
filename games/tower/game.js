(function () {
  "use strict";

  const STORAGE_KEY = "tower-pulse-local-scores";
  const BEST_KEY = "tower-pulse-best-score";
  const MUSIC_KEY = "tower-pulse-music-enabled";
  const MUSIC_VOLUME_KEY = "tower-pulse-music-volume";
  const LEADERBOARD_NAME = "towerpulsehighscore";
  const MUSIC_SRC = "./assets/background_music_loop.mp3";
  const BASE_MUSIC_VOLUME = 0.34;
  const BLOCK_HEIGHT = 26;
  const START_SIZE = 190;
  const MOVE_RANGE = 250;
  const BASE_SPEED = 190;
  const SPEED_STEP = 7.5;
  const PERFECT_MARGIN = 8;
  const CAMERA_SMOOTH = 3.4;
  const SCRAP_GRAVITY = 1380;
  const SCRAP_DRAG = 4.8;
  const BLOCK_SETTLE_SPEED = 11;
  const SKY_STARS = 36;
  const SHOW_DEBUG_AXES = false;
  const MOBILE_STAR_FACTOR = 0.35;
  const MOBILE_PARTICLE_FACTOR = 0.45;
  window.gameLang = "en";
  const TEXTS = {
    ru: {
      appTitle: "Башня Ритма",
      brandKicker: "Подсказка",
      brandTitle: "Строй идеальную башню",
      brandDescription: "Ставь платформы точно друг на друга и строй башню как можно выше. Чем точнее попадание, тем ровнее башня и больше серия.",
      startMenuEyebrow: "Строй идеальную башню",
      startMenuTitle: "Башня Ритма",
      startMenuDescription: "Нажми в нужный момент, чтобы поставить платформу точно поверх предыдущей. Чем точнее попадание, тем выше башня.",
      startButton: "Играть",
      shareButton: "Рейтинг",
      ratingTitle: "Рейтинг",
      ratingNoteGlobal: "Здесь показываются лучшие игроки из глобального топа Башни Ритма.",
      ratingNoteLocal: "Рекорды сохраняются на этом устройстве.",
      ratingYou: "Вы",
      ratingAuthButton: "Войти для рейтинга",
      ratingAuthHint: "Чтобы записывать рекорд и видеть своё место, войдите в аккаунт.",
      gameOverEyebrow: "Раунд завершён",
      gameOverMenuButton: "Меню",
      restartButton: "Сыграть ещё",
      restart: "Рестарт",
      dropButton: "Поставить",
      settingsHeadingEyebrow: "Настройки",
      settingsHeadingTitle: "Панель игры",
      settingsControlEyebrow: "Управление",
      settingsControlTitle: "Одно нажатие",
      settingsTip1: "Нажми или тапни, чтобы поставить текущую платформу.",
      settingsTip2: "Платформы двигаются по очереди по осям X и Y.",
      settingsTip3: "Точное попадание даёт серию и помогает строить ровную башню.",
      settingsMusicEyebrow: "Музыка",
      settingsMusicTitle: "Атмосфера",
      settingsMusicLabel: "Фоновая музыка",
      settingsPlatformEyebrow: "Платформа",
      settingsPlatformTitle: "Синхронизация",
      statusTitle: "Статус",
      statusPreparing: "Подготовка платформы...",
      statusPreparingHint: "Локальные рекорды сохраняются даже без SDK.",
      scoreLabel: "Счёт",
      bestLabel: "Лучший",
      comboLabel: "Серия",
      resultLabel: "Результат",
      musicOn: "Включена",
      musicOff: "Выключена",
      rankingEmptyGlobal: "Глобальный топ пока пуст",
      rankingEmptyLocal: "Пока пусто",
      playerName: "Игрок",
      selfName: "Вы",
      statusLocal: "Локальный режим",
      statusSdkMissing: "SDK не найден. Игра работает автономно.",
      statusSdkReady: "Синхронизация подключена",
      statusSdkReadyHint: "Лучший счёт можно синхронизировать с профилем, если платформа это разрешает.",
      statusSdkFailed: "Подключение SDK не удалось, поэтому используется локальное сохранение.",
      gameOverTitleLose: "Башня потеряла баланс",
      gameOverTitleZero: "Башня не успела вырасти",
      gameOverSummaryBest: "Новый рекорд. Отличный темп, башня получилась почти идеальной.",
      gameOverSummaryRetry: "Ещё одна попытка, и платформу получится поймать гораздо точнее.",
      perfect: "Идеально",
      perfectCombo: "Идеально x{combo}",
      settingsClose: "Закрыть настройки",
      settingsButton: "Настройки",
      musicButton: "Музыка",
      topPlayers: "Топ игроков",
      volume: "Громкость"
      ,leaderboardMissing: "Лидерборд не найден."
      ,leaderboardUnavailable: "Глобальный рейтинг сейчас недоступен."
      ,leaderboardAuthNeeded: "Нужна авторизация, чтобы записывать результат в глобальный рейтинг."
    },
    en: {
      appTitle: "Rhythm Tower",
      brandKicker: "Tip",
      brandTitle: "Build the perfect tower",
      brandDescription: "Place platforms precisely on top of each other and build the tower as high as possible. The more accurate the hit, the cleaner the tower and the higher the streak.",
      startMenuEyebrow: "Build the perfect tower",
      startMenuTitle: "Rhythm Tower",
      startMenuDescription: "Tap at the right moment to place the platform exactly over the previous one. The more accurate the timing, the taller the tower.",
      startButton: "Play",
      shareButton: "Ranking",
      ratingTitle: "Ranking",
      ratingNoteGlobal: "This section shows the best players from the global Yandex Games leaderboard.",
      ratingNoteLocal: "Records are stored on this device.",
      ratingYou: "You",
      ratingAuthButton: "Sign in for ranking",
      ratingAuthHint: "Sign in to save your record and see your global rank.",
      gameOverEyebrow: "Round over",
      gameOverMenuButton: "Menu",
      restartButton: "Play again",
      restart: "Restart",
      dropButton: "Place",
      settingsHeadingEyebrow: "Settings",
      settingsHeadingTitle: "Game panel",
      settingsControlEyebrow: "Controls",
      settingsControlTitle: "Single tap",
      settingsTip1: "Tap or click to place the current platform.",
      settingsTip2: "Platforms move alternately along the X and Y axes.",
      settingsTip3: "Perfect placement builds a streak and helps keep the tower clean.",
      settingsMusicEyebrow: "Music",
      settingsMusicTitle: "Atmosphere",
      settingsMusicLabel: "Background music",
      settingsPlatformEyebrow: "Platform",
      settingsPlatformTitle: "Sync",
      statusTitle: "Status",
      statusPreparing: "Preparing platform...",
      statusPreparingHint: "Local records are saved even without the SDK.",
      scoreLabel: "Score",
      bestLabel: "Best",
      comboLabel: "Streak",
      resultLabel: "Result",
      musicOn: "On",
      musicOff: "Off",
      rankingEmptyGlobal: "Global ranking is empty",
      rankingEmptyLocal: "No records yet",
      playerName: "Player",
      selfName: "You",
      statusLocal: "Local mode",
      statusSdkMissing: "Yandex Games SDK was not found. The game is running автономously.",
      statusSdkReady: "Yandex Games connected",
      statusSdkReadyHint: "Best score can be synced with the profile if the platform allows it.",
      statusSdkFailed: "SDK connection failed, local save is used instead.",
      gameOverTitleLose: "The tower lost its balance",
      gameOverTitleZero: "The tower had no time to grow",
      gameOverSummaryBest: "New record. Great pace, the tower was almost perfect.",
      gameOverSummaryRetry: "One more try and your timing will be much more precise.",
      perfect: "Perfect",
      perfectCombo: "Perfect x{combo}",
      settingsClose: "Close settings",
      settingsButton: "Settings",
      musicButton: "Music",
      topPlayers: "Top players",
      volume: "Volume"
      ,leaderboardMissing: "Leaderboard was not found in the Yandex Games console."
      ,leaderboardUnavailable: "Global leaderboard is currently unavailable."
      ,leaderboardAuthNeeded: "Authorization is required to save the result to the global leaderboard."
    }
  };

  const el = {
    canvas: document.getElementById("gameCanvas"),
    score: document.getElementById("scoreValue"),
    best: document.getElementById("bestValue"),
    combo: document.getElementById("comboValue"),
    rankingList: document.getElementById("rankingList"),
    rankingSelf: document.getElementById("rankingSelf"),
    rankingAuthButton: document.getElementById("rankingAuthButton"),
    ratingTitle: document.getElementById("ratingTitle"),
    ratingNote: document.getElementById("ratingNote"),
    brandKicker: document.querySelector(".brand-kicker"),
    brandTitle: document.querySelector(".brand-chip h1"),
    brandDescription: document.querySelector(".brand-chip p"),
    startMenuEyebrow: document.querySelector("#startPanel .menu-copy .eyebrow"),
    startMenuTitle: document.querySelector("#startPanel .menu-copy h2"),
    startMenuDescription: document.querySelector("#startPanel .menu-copy p"),
    gameOverEyebrow: document.querySelector("#gameOverPanel .eyebrow"),
    settingsHeadingEyebrow: document.querySelector(".settings-dialog .dialog-head .eyebrow"),
    settingsHeadingTitle: document.querySelector(".settings-dialog .dialog-head h2"),
    settingsSectionEyebrows: document.querySelectorAll(".settings-section .card-head .eyebrow"),
    settingsSectionTitles: document.querySelectorAll(".settings-section .card-head h3"),
    settingsTips: document.querySelectorAll(".tips-list li"),
    settingsMusicLabel: document.querySelector(".settings-row span"),
    sdkStatus: document.getElementById("sdkStatus"),
    sdkHint: document.getElementById("sdkHint"),
    settingsStatusText: document.getElementById("settingsStatusText"),
    startPanel: document.getElementById("startPanel"),
    gameOverPanel: document.getElementById("gameOverPanel"),
    gameOverMenuButton: document.getElementById("gameOverMenuButton"),
    startButton: document.getElementById("startButton"),
    restartButton: document.getElementById("restartButton"),
    restartTopButton: document.getElementById("restartTopButton"),
    restartInlineButton: document.getElementById("restartInlineButton"),
    dropButton: document.getElementById("dropButton"),
    shareButton: document.getElementById("shareButton"),
    settingsButton: document.getElementById("settingsButton"),
    closeSettingsButton: document.getElementById("closeSettingsButton"),
    settingsSheet: document.getElementById("settingsSheet"),
    musicToggleButton: document.getElementById("musicToggleButton"),
    musicSettingsButton: document.getElementById("musicSettingsButton"),
    musicVolumeSlider: document.getElementById("musicVolumeSlider"),
    musicVolumeValue: document.getElementById("musicVolumeValue"),
    finalScore: document.getElementById("finalScoreValue"),
    finalBest: document.getElementById("finalBestValue"),
    gameOverTitle: document.getElementById("gameOverTitle"),
    gameOverSummary: document.getElementById("gameOverSummary"),
    centerMessage: document.getElementById("centerMessage"),
    centerMessageText: document.getElementById("centerMessageText")
  };

  const ctx = el.canvas.getContext("2d");
  const state = {
    mode: "idle",
    score: 0,
    bestScore: 0,
    combo: 0,
    cameraY: 0,
    blocks: [],
    scraps: [],
    particles: [],
    stars: [],
    currentBlock: null,
    axisIndex: 0,
    lastTime: 0,
    pulse: 0,
    messageTimer: 0,
    roundCount: 0,
    localScores: [],
    remoteScores: [],
    remotePlayerEntry: null,
    rankingMode: "remote",
    isMobile: false,
    sdkReady: false,
    ysdk: null,
    player: null,
    leaderboards: null,
    canSetLeaderboardScore: false,
    canReadPlayerEntry: false,
    gameplayStarted: false,
    adCooldownUntil: 0,
    musicEnabled: true,
    musicVolume: 0.5,
    audioContext: null,
    musicTrack: null,
    musicTrackReady: false
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function formatScore(score) {
    return Math.max(0, Math.round(score)).toString();
  }

  function detectMobileProfile() {
    return window.innerWidth <= 860 || window.matchMedia("(pointer: coarse)").matches;
  }

  function getTexts() {
    return TEXTS[window.gameLang] || TEXTS.ru;
  }

  function normalizeLang(value) {
    return String(value || "").toLowerCase().startsWith("ru") ? "ru" : "en";
  }

  function setLanguage(value) {
    window.gameLang = normalizeLang(value || window.gameLang || "en");
    document.documentElement.lang = window.gameLang;
    if (document.body) {
      document.body.dataset.lang = window.gameLang;
    }
    applyI18n();
    return window.gameLang;
  }

  function t(key, params) {
    const table = getTexts();
    const fallback = TEXTS.ru[key] || key;
    let value = table[key] || fallback;
    if (params) {
      Object.keys(params).forEach(function (paramKey) {
        value = value.replace(`{${paramKey}}`, String(params[paramKey]));
      });
    }
    return value;
  }

  function resizeCanvas() {
    state.isMobile = detectMobileProfile();
    const ratio = state.isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : Math.min(window.devicePixelRatio || 1, 2);
    const rect = el.canvas.getBoundingClientRect();
    const width = Math.max(320, Math.round(rect.width));
    const height = Math.max(460, Math.round(rect.height));
    el.canvas.width = Math.round(width * ratio);
    el.canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createStars() {
    state.stars = [];
    const starCount = state.isMobile ? Math.max(10, Math.round(SKY_STARS * MOBILE_STAR_FACTOR)) : SKY_STARS;
    while (state.stars.length < starCount) {
      const star = {
        x: Math.random(),
        y: Math.random() * 0.62,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.28 + Math.random() * 0.42,
        drift: 0.16 + Math.random() * 0.28,
        kind: state.isMobile ? "dot" : (Math.random() > 0.72 ? "sparkle" : "dot")
      };
      const insideBuildLaneX = star.x > 0.33 && star.x < 0.67;
      const insideBuildLaneY = star.y > 0.08 && star.y < 0.62;
      if (insideBuildLaneX && insideBuildLaneY) {
        continue;
      }
      state.stars.push(star);
    }
  }

  function colorSet(index) {
    const hue = (188 + index * 15) % 360;
    return {
      top: `hsl(${hue} 52% 60%)`,
      left: `hsl(${(hue + 10) % 360} 40% 54%)`,
      right: `hsl(${(hue - 16 + 360) % 360} 42% 48%)`,
      glow: `hsla(${hue} 60% 70% / 0.26)`
    };
  }

  function isoProject(x, y, z) {
    const centerX = el.canvas.clientWidth * 0.5;
    const groundY = el.canvas.clientHeight * 0.77;
    const scaleX = 0.92;
    const scaleY = 0.48;

    return {
      x: centerX + (x - y) * scaleX,
      y: groundY + state.cameraY + (x + y) * scaleY - z
    };
  }

  function rectCorners(block) {
    const x1 = block.x - block.width / 2;
    const x2 = block.x + block.width / 2;
    const y1 = block.y - block.depth / 2;
    const y2 = block.y + block.depth / 2;
    const z = block.z;
    const top = z + block.height;

    return {
      topNW: isoProject(x1, y1, top),
      topNE: isoProject(x2, y1, top),
      topSE: isoProject(x2, y2, top),
      topSW: isoProject(x1, y2, top),
      botNW: isoProject(x1, y1, z),
      botNE: isoProject(x2, y1, z),
      botSE: isoProject(x2, y2, z),
      botSW: isoProject(x1, y2, z)
    };
  }

  function blockGroundPolygon(block, inset) {
    const x1 = block.x - block.width / 2 + inset;
    const x2 = block.x + block.width / 2 - inset;
    const y1 = block.y - block.depth / 2 + inset;
    const y2 = block.y + block.depth / 2 - inset;

    return [
      isoProject(x1, y2, 0),
      isoProject(x2, y2, 0),
      isoProject(x2, y1, 0),
      isoProject(x1, y1, 0)
    ];
  }

  function fillPoly(points, fillStyle) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  function fillOutline(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawBlock(block) {
    const c = rectCorners(block);
    const colors = block.colors;

    ctx.save();
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = state.isMobile
      ? (block.isCurrent ? 6 : 2)
      : (block.isCurrent ? 22 : 8);

    fillPoly([c.topSW, c.topSE, c.topNE, c.topNW], colors.top);
    fillPoly([c.topSE, c.botSE, c.botNE, c.topNE], colors.right);
    fillPoly([c.topSW, c.botSW, c.botSE, c.topSE], colors.left);

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.24)";
    ctx.lineWidth = 1;
    fillOutline([c.topSW, c.topSE, c.topNE, c.topNW]);
    ctx.restore();
  }

  function createBaseBlock() {
    return {
      x: 0,
      y: 0,
      z: 0,
      width: START_SIZE,
      depth: START_SIZE,
      height: BLOCK_HEIGHT,
      colors: colorSet(0),
      isCurrent: false
    };
  }

  function createMovingBlock() {
    const previous = state.blocks[state.blocks.length - 1];
    const axis = state.axisIndex % 2 === 0 ? "x" : "y";
    const landingZ = previous.z + BLOCK_HEIGHT;

    const block = {
      x: previous.x,
      y: previous.y,
      z: landingZ,
      targetZ: landingZ,
      landingZ: landingZ,
      width: previous.width,
      depth: previous.depth,
      height: BLOCK_HEIGHT,
      axis: axis,
      direction: 1,
      speed: BASE_SPEED + state.score * SPEED_STEP,
      range: MOVE_RANGE + Math.min(140, state.score * 4),
      colors: colorSet(state.blocks.length),
      isCurrent: true
    };

    if (axis === "x") {
      block.x = previous.x - block.range;
    } else {
      block.y = previous.y - block.range;
    }

    state.currentBlock = block;
  }

  function updateHud() {
    el.score.textContent = formatScore(state.score);
    el.best.textContent = formatScore(state.bestScore);
    el.combo.textContent = formatScore(state.combo);
  }

  function applyI18n() {
    document.title = t("appTitle");
    el.canvas.setAttribute("aria-label", t("appTitle"));
    if (el.settingsButton) {
      el.settingsButton.setAttribute("aria-label", t("settingsButton"));
    }
    if (el.musicToggleButton) {
      el.musicToggleButton.setAttribute("aria-label", t("musicButton"));
    }
    if (el.closeSettingsButton) {
      el.closeSettingsButton.setAttribute("aria-label", t("settingsClose"));
    }
    if (el.brandKicker) {
      el.brandKicker.textContent = t("brandKicker");
    }
    if (el.brandTitle) {
      el.brandTitle.textContent = t("brandTitle");
    }
    if (el.brandDescription) {
      el.brandDescription.textContent = t("brandDescription");
    }
    if (el.startMenuEyebrow) {
      el.startMenuEyebrow.textContent = t("startMenuEyebrow");
    }
    if (el.startMenuTitle) {
      el.startMenuTitle.textContent = t("startMenuTitle");
    }
    if (el.startMenuDescription) {
      el.startMenuDescription.textContent = t("startMenuDescription");
    }
    if (el.startButton) {
      el.startButton.textContent = t("startButton");
    }
    if (el.shareButton) {
      el.shareButton.textContent = t("shareButton");
    }
    if (el.ratingTitle) {
      el.ratingTitle.textContent = t("ratingTitle");
    }
    if (el.ratingNote) {
      el.ratingNote.textContent = t("ratingNoteGlobal");
    }
    if (el.rankingAuthButton) {
      el.rankingAuthButton.textContent = t("ratingAuthButton");
    }
    if (el.gameOverEyebrow) {
      el.gameOverEyebrow.textContent = t("gameOverEyebrow");
    }
    if (el.gameOverMenuButton) {
      el.gameOverMenuButton.textContent = t("gameOverMenuButton");
    }
    if (el.restartButton) {
      el.restartButton.textContent = t("restartButton");
    }
    if (el.restartTopButton) {
      el.restartTopButton.textContent = t("restart");
    }
    if (el.restartInlineButton) {
      el.restartInlineButton.textContent = t("restart");
    }
    if (el.dropButton) {
      el.dropButton.textContent = t("dropButton");
    }
    if (el.settingsHeadingEyebrow) {
      el.settingsHeadingEyebrow.textContent = t("settingsHeadingEyebrow");
    }
    if (el.settingsHeadingTitle) {
      el.settingsHeadingTitle.textContent = t("settingsHeadingTitle");
    }
    if (el.settingsSectionEyebrows[0]) {
      el.settingsSectionEyebrows[0].textContent = t("settingsControlEyebrow");
    }
    if (el.settingsSectionTitles[0]) {
      el.settingsSectionTitles[0].textContent = t("settingsControlTitle");
    }
    if (el.settingsTips[0]) {
      el.settingsTips[0].textContent = t("settingsTip1");
    }
    if (el.settingsTips[1]) {
      el.settingsTips[1].textContent = t("settingsTip2");
    }
    if (el.settingsTips[2]) {
      el.settingsTips[2].textContent = t("settingsTip3");
    }
    if (el.settingsSectionEyebrows[1]) {
      el.settingsSectionEyebrows[1].textContent = t("settingsMusicEyebrow");
    }
    if (el.settingsSectionTitles[1]) {
      el.settingsSectionTitles[1].textContent = t("settingsMusicTitle");
    }
    if (el.settingsMusicLabel) {
      el.settingsMusicLabel.textContent = t("settingsMusicLabel");
    }
    if (el.settingsSectionEyebrows[2]) {
      el.settingsSectionEyebrows[2].textContent = t("settingsPlatformEyebrow");
    }
    if (el.settingsSectionTitles[2]) {
      el.settingsSectionTitles[2].textContent = t("settingsPlatformTitle");
    }
    const statLabels = document.querySelectorAll(".stat-label");
    if (statLabels[0]) {
      statLabels[0].textContent = t("scoreLabel");
    }
    if (statLabels[1]) {
      statLabels[1].textContent = t("bestLabel");
    }
    if (statLabels[2]) {
      statLabels[2].textContent = t("comboLabel");
    }
    const resultLabels = document.querySelectorAll(".result-inline span");
    if (resultLabels[0] && resultLabels[0].firstChild) {
      resultLabels[0].firstChild.textContent = `${t("resultLabel")} `;
    }
    if (resultLabels[1] && resultLabels[1].firstChild) {
      resultLabels[1].firstChild.textContent = `${t("bestLabel")} `;
    }
    const menuEyebrows = document.querySelectorAll(".menu-ranking .card-head .eyebrow");
    if (menuEyebrows[0]) {
      menuEyebrows[0].textContent = t("topPlayers");
    }
    if (el.rankingList) {
      updateRanking(state.rankingMode === "remote" ? "remote" : "local");
    }
    const settingsSliderLabel = document.querySelector(".settings-slider-head span");
    if (settingsSliderLabel) {
      settingsSliderLabel.textContent = t("volume");
    }
    const statusEyebrow = document.querySelector(".status-chip .eyebrow");
    if (statusEyebrow) {
      statusEyebrow.textContent = t("statusTitle");
    }
  }

  function updateUiState() {
    document.body.classList.toggle("is-playing", state.mode === "playing");
    document.body.classList.toggle("is-idle", state.mode === "idle");
    document.body.classList.toggle("is-gameover", state.mode === "gameover");
  }

  function showCenterMessage(text, duration) {
    el.centerMessageText.textContent = text;
    el.centerMessage.classList.remove("hidden");
    state.messageTimer = duration;
  }

  function hideCenterMessage() {
    el.centerMessage.classList.add("hidden");
    state.messageTimer = 0;
  }

  function spawnParticles(x, y, z, amount, hueShift) {
    const finalAmount = state.isMobile ? Math.max(4, Math.round(amount * MOBILE_PARTICLE_FACTOR)) : amount;
    for (let i = 0; i < finalAmount; i += 1) {
      const maxLife = 0.45 + Math.random() * 0.5;
      state.particles.push({
        x: x,
        y: y,
        z: z,
        vx: (Math.random() - 0.5) * 120,
        vy: (Math.random() - 0.5) * 120,
        vz: 100 + Math.random() * 180,
        life: maxLife,
        maxLife: maxLife,
        color: `hsla(${(190 + hueShift + Math.random() * 28) % 360} 80% 66% / 1)`
      });
    }
  }

  function addScrap(scrap) {
    if (scrap.width <= 0 || scrap.depth <= 0) {
      return;
    }

    const sizeFactor = Math.max(scrap.width, scrap.depth) / START_SIZE;
    const axisPush = 120 + sizeFactor * 48;
    const xDirection = Math.sign(scrap.x - scrap.referenceX) || 0;
    const yDirection = Math.sign(scrap.y - scrap.referenceY) || 0;
    const depthDirection = scrap.axis === "x" ? xDirection : yDirection;
    const isBehindTower = depthDirection < 0;
    const vx = scrap.axis === "x" ? xDirection * axisPush : 0;
    const vy = scrap.axis === "y"
      ? yDirection * (axisPush + 22)
      : depthDirection * (22 + sizeFactor * 10);

    state.scraps.push({
      x: scrap.x,
      y: scrap.y,
      z: scrap.z,
      width: scrap.width,
      depth: scrap.depth,
      height: scrap.height,
      colors: scrap.colors,
      axis: scrap.axis,
      referenceX: scrap.referenceX,
      referenceY: scrap.referenceY,
      vx: vx,
      vy: vy,
      vz: -30 - sizeFactor * 55,
      isBehindTower: isBehindTower,
      isCurrent: false
    });
  }

  function resetRound() {
    state.score = 0;
    state.combo = 0;
    state.cameraY = 0;
    state.blocks = [createBaseBlock()];
    state.scraps = [];
    state.particles = [];
    state.axisIndex = 0;
    state.pulse = 0;
    state.messageTimer = 0;
    state.currentBlock = null;
    createMovingBlock();
    state.mode = "playing";
    el.startPanel.classList.add("hidden");
    el.gameOverPanel.classList.add("hidden");
    hideCenterMessage();
    startGameplay();
    updateHud();
    updateUiState();
  }

  function startGame() {
    state.roundCount += 1;
    resumeMusic();
    resetRound();
  }

  function openMenu() {
    state.mode = "idle";
    state.score = 0;
    state.combo = 0;
    state.cameraY = 0;
    state.axisIndex = 0;
    state.scraps = [];
    state.particles = [];
    state.messageTimer = 0;
    state.blocks = [createBaseBlock()];
    state.currentBlock = null;
    el.settingsSheet.classList.add("hidden");
    el.gameOverPanel.classList.add("hidden");
    el.startPanel.classList.remove("hidden");
    hideCenterMessage();
    updateHud();
    updateUiState();
    stopGameplay().catch(function () {});
  }

  function placeBlock() {
    if (state.mode !== "playing" || !state.currentBlock) {
      return;
    }

    const block = state.currentBlock;
    const previous = state.blocks[state.blocks.length - 1];
    const axis = block.axis;
    const landingZ = block.landingZ || block.targetZ || block.z;
    const delta = axis === "x" ? block.x - previous.x : block.y - previous.y;
    const size = axis === "x" ? block.width : block.depth;
    const cutDirection = Math.sign(delta) || 1;
    const perfectThreshold = Math.min(PERFECT_MARGIN, Math.max(1.25, size * 0.015));
    let overlap = size - Math.abs(delta);

    const isPerfect = Math.abs(delta) <= perfectThreshold;

    if (isPerfect) {
      overlap = size;
      if (axis === "x") {
        block.x = previous.x;
      } else {
        block.y = previous.y;
      }
      state.combo += 1;
      showCenterMessage(state.combo > 1 ? t("perfectCombo", { combo: state.combo }) : t("perfect"), 0.9);
      spawnParticles(block.x, block.y, landingZ + block.height, 14, state.score * 8);
      if (navigator.vibrate) {
        navigator.vibrate(18);
      }
    } else {
      state.combo = 0;
    }

    if (overlap <= 0) {
      playFailSound();
      addScrap({
        x: block.x,
        y: block.y,
        z: landingZ,
        width: block.width,
        depth: block.depth,
        height: block.height,
        colors: block.colors,
        axis: axis,
        referenceX: previous.x,
        referenceY: previous.y
      });
      state.currentBlock = null;
      endGame();
      return;
    }

    playPlaceSound(isPerfect);

    const newBlock = {
      x: block.x,
      y: block.y,
      z: landingZ,
      width: block.width,
      depth: block.depth,
      height: block.height,
      colors: block.colors,
      isCurrent: false
    };

    if (axis === "x") {
      const cut = block.width - overlap;
      newBlock.width = overlap;
      newBlock.x = previous.x + delta * 0.5;
      addScrap({
        x: newBlock.x + cutDirection * (overlap / 2 + cut / 2),
        y: block.y,
        z: landingZ,
        width: cut,
        depth: block.depth,
        height: block.height,
        colors: block.colors,
        axis: axis,
        referenceX: newBlock.x,
        referenceY: previous.y
      });
    } else {
      const cut = block.depth - overlap;
      newBlock.depth = overlap;
      newBlock.y = previous.y + delta * 0.5;
      addScrap({
        x: block.x,
        y: newBlock.y + cutDirection * (overlap / 2 + cut / 2),
        z: landingZ,
        width: block.width,
        depth: cut,
        height: block.height,
        colors: block.colors,
        axis: axis,
        referenceX: previous.x,
        referenceY: newBlock.y
      });
    }

    state.blocks.push(newBlock);
    state.currentBlock = null;
    state.score += 1;
    state.bestScore = Math.max(state.bestScore, state.score);
    state.axisIndex += 1;
    updateHud();
    createMovingBlock();
  }

  function updateCurrentBlock(dt) {
    const block = state.currentBlock;
    if (!block) {
      return;
    }

    if (typeof block.targetZ === "number") {
      const settle = 1 - Math.exp(-BLOCK_SETTLE_SPEED * dt);
      block.z = lerp(block.z, block.targetZ, settle);
      if (Math.abs(block.z - block.targetZ) < 0.2) {
        block.z = block.targetZ;
      }
    }

    const previous = state.blocks[state.blocks.length - 1];
    if (block.axis === "x") {
      block.x += block.speed * block.direction * dt;
      const min = previous.x - block.range;
      const max = previous.x + block.range;
      if (block.x < min || block.x > max) {
        block.x = clamp(block.x, min, max);
        block.direction *= -1;
      }
    } else {
      block.y += block.speed * block.direction * dt;
      const min = previous.y - block.range;
      const max = previous.y + block.range;
      if (block.y < min || block.y > max) {
        block.y = clamp(block.y, min, max);
        block.direction *= -1;
      }
    }
  }

  function updateScraps(dt) {
    let writeIndex = 0;
    for (let i = 0; i < state.scraps.length; i += 1) {
      const scrap = state.scraps[i];
      const drag = Math.exp(-SCRAP_DRAG * dt);
      scrap.vx *= drag;
      scrap.vy *= drag;
      scrap.x += scrap.vx * dt;
      scrap.y += scrap.vy * dt;
      scrap.vz -= SCRAP_GRAVITY * dt;
      scrap.z += scrap.vz * dt;
      const screenPos = isoProject(scrap.x, scrap.y, scrap.z);
      if (screenPos.y - scrap.height < el.canvas.clientHeight + 140) {
        state.scraps[writeIndex] = scrap;
        writeIndex += 1;
      }
    }
    state.scraps.length = writeIndex;
  }

  function updateParticles(dt) {
    let writeIndex = 0;
    for (let i = 0; i < state.particles.length; i += 1) {
      const particle = state.particles[i];
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vz -= SCRAP_GRAVITY * 0.45 * dt;
      particle.z += particle.vz * dt;
      if (particle.life > 0) {
        state.particles[writeIndex] = particle;
        writeIndex += 1;
      }
    }
    state.particles.length = writeIndex;
  }

  function drawBackground() {
    const width = el.canvas.clientWidth;
    const height = el.canvas.clientHeight;

    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#f8fbff");
    sky.addColorStop(0.5, "#d7e8f7");
    sky.addColorStop(1, "#95bcd9");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const haze = ctx.createLinearGradient(0, 0, width, height * 0.8);
    haze.addColorStop(0, "rgba(126, 194, 255, 0.28)");
    haze.addColorStop(0.42, "rgba(111, 227, 214, 0.18)");
    haze.addColorStop(1, "rgba(255, 213, 152, 0.22)");
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);

    state.stars.forEach(function (star, index) {
      const x = star.x * width + Math.sin(state.pulse * 0.18 + index) * star.drift * 8;
      const y = star.y * height;
      if (state.isMobile) {
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, star.alpha * 0.92)})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, star.size * 0.9), 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      if (star.kind === "sparkle") {
        const pulse = 0.75 + Math.sin(state.pulse * 1.35 + index * 1.2) * 0.18;
        const radius = star.size * (1.9 + pulse * 0.45);
        ctx.save();
        ctx.strokeStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.lineWidth = 1.35;
        ctx.beginPath();
        ctx.moveTo(x - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.moveTo(x, y - radius);
        ctx.lineTo(x, y + radius);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, star.alpha * 1.08)})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size * 0.78, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        const glowRadius = star.size * 3.4;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        glow.addColorStop(0, `rgba(255,255,255,${Math.min(1, star.alpha * 1.1)})`);
        glow.addColorStop(0.28, `rgba(255,255,255,${star.alpha * 0.56})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    drawGridFloor();
  }

  function drawGridFloor() {
    const width = el.canvas.clientWidth;
    const height = el.canvas.clientHeight;
    const horizon = height * 0.77 + state.cameraY;
    const lines = 11;

    ctx.save();
    ctx.strokeStyle = "rgba(116, 151, 180, 0.14)";
    ctx.lineWidth = 1;

    for (let i = 0; i < lines; i += 1) {
      const t = i / (lines - 1);
      const y = lerp(horizon + 8, height + 80, t);
      ctx.beginPath();
      ctx.moveTo(width * 0.08, y);
      ctx.lineTo(width * 0.92, y);
      ctx.stroke();
    }

    for (let i = -5; i <= 5; i += 1) {
      const px = width * 0.5 + i * 58;
      ctx.beginPath();
      ctx.moveTo(px, horizon);
      ctx.lineTo(px + i * 24, height + 70);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawTowerShadow() {
    if (!state.blocks.length) {
      return;
    }

    const topBlock = state.blocks[state.blocks.length - 1];
    const topShadow = blockGroundPolygon(topBlock, 10);

    ctx.save();
    ctx.shadowColor = "rgba(115, 136, 156, 0.16)";
    ctx.shadowBlur = state.isMobile ? 0 : 20;
    ctx.fillStyle = "rgba(108, 129, 150, 0.12)";
    fillPoly(topShadow, ctx.fillStyle);

    if (state.currentBlock) {
      const movingShadow = blockGroundPolygon(state.currentBlock, 12);
      ctx.shadowBlur = state.isMobile ? 0 : 26;
      ctx.fillStyle = "rgba(108, 129, 150, 0.14)";
      fillPoly(movingShadow, ctx.fillStyle);
    }

    ctx.restore();
  }

  function drawDebugAxes() {
    if (!SHOW_DEBUG_AXES) {
      return;
    }

    const origin = isoProject(0, 0, 0);
    const axisX = isoProject(86, 0, 0);
    const axisY = isoProject(0, 86, 0);

    ctx.save();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.font = '700 14px "Space Grotesk", sans-serif';

    ctx.strokeStyle = "rgba(255, 166, 120, 0.95)";
    ctx.fillStyle = "rgba(255, 166, 120, 0.95)";
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(axisX.x, axisX.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(axisX.x, axisX.y);
    ctx.lineTo(axisX.x - 10, axisX.y - 2);
    ctx.lineTo(axisX.x - 4, axisX.y + 7);
    ctx.closePath();
    ctx.fill();
    ctx.fillText("X", axisX.x + 8, axisX.y + 2);

    ctx.strokeStyle = "rgba(122, 232, 205, 0.95)";
    ctx.fillStyle = "rgba(122, 232, 205, 0.95)";
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(axisY.x, axisY.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(axisY.x, axisY.y);
    ctx.lineTo(axisY.x + 10, axisY.y - 2);
    ctx.lineTo(axisY.x + 4, axisY.y + 7);
    ctx.closePath();
    ctx.fill();
    ctx.fillText("Y", axisY.x + 10, axisY.y + 2);

    ctx.fillStyle = "rgba(238, 246, 255, 0.92)";
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawParticles() {
    if (state.isMobile && !state.particles.length) {
      return;
    }
    state.particles.forEach(function (particle) {
      const pos = isoProject(particle.x, particle.y, particle.z);
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color.replace("/ 1)", `/ ${alpha})`);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, state.isMobile ? 1.6 + alpha * 1.2 : 2 + alpha * 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function render() {
    drawBackground();
    drawDebugAxes();
    drawTowerShadow();

    for (let i = 0; i < state.scraps.length; i += 1) {
      if (state.scraps[i].isBehindTower) {
        drawBlock(state.scraps[i]);
      }
    }

    state.blocks.forEach(drawBlock);

    for (let i = 0; i < state.scraps.length; i += 1) {
      if (!state.scraps[i].isBehindTower) {
        drawBlock(state.scraps[i]);
      }
    }

    if (state.currentBlock) {
      drawBlock(state.currentBlock);
    }

    drawParticles();
  }

  function update(dt) {
    state.pulse += dt;

    if (state.mode === "playing") {
      updateCurrentBlock(dt);
    }

    updateScraps(dt);
    updateParticles(dt);

    if (!state.blocks.length) {
      return;
    }

    const topBlock = state.blocks[state.blocks.length - 1];
    const targetCameraY = Math.max(0, topBlock.z - 140);
    const cameraFollow = 1 - Math.exp(-CAMERA_SMOOTH * dt);
    state.cameraY = lerp(state.cameraY, targetCameraY, cameraFollow);

    if (state.messageTimer > 0) {
      state.messageTimer -= dt;
      if (state.messageTimer <= 0) {
        hideCenterMessage();
      }
    }
  }

  function loop(time) {
    const seconds = time * 0.001;
    const dt = state.lastTime ? Math.min(0.033, seconds - state.lastTime) : 0.016;
    state.lastTime = seconds;
    update(dt);
    render();
    requestAnimationFrame(loop);
  }

  function createRankItem(rank, name, score, extraClass) {
    const li = document.createElement("li");
    if (extraClass) {
      li.className = extraClass;
    }
    li.innerHTML = `<span class="rank-index">#${rank}</span><span class="rank-name">${name}</span><span class="rank-score">${formatScore(score)}</span>`;
    return li;
  }

  function createRemotePlayerItem(entry) {
    const item = createRankItem(
      entry.rank,
      entry.name || t("selfName"),
      entry.score || 0,
      "ranking-self-item"
    );
    item.querySelector(".rank-name").textContent = t("ratingYou");
    return item;
  }

  function createRemotePlayerPlaceholder() {
    return createRankItem("-", t("ratingYou"), 0, "ranking-self-item");
  }

  function normalizeLeaderboardPlayerName(player) {
    return player?.publicName || player?.name || t("playerName");
  }

  function normalizeLeaderboardEntry(entry, fallbackRank) {
    if (!entry) {
      return null;
    }

    const rank = Number(
      entry.rank
      ?? entry.formattedRank
      ?? entry.position
      ?? entry.place
      ?? fallbackRank
    ) || fallbackRank;

    return {
      rank: rank,
      name: normalizeLeaderboardPlayerName(entry.player),
      score: Number(entry.score) || 0
    };
  }

  function renderRemotePlayerEntry() {
    if (!el.rankingSelf) {
      return;
    }

    el.rankingSelf.innerHTML = "";
    const shouldShowAuthButton = Boolean(
      el.rankingAuthButton &&
      state.sdkReady &&
      state.leaderboards &&
      !state.canSetLeaderboardScore &&
      state.ysdk?.auth?.openAuthDialog
    );
    if (el.rankingAuthButton) {
      el.rankingAuthButton.classList.toggle("hidden", !shouldShowAuthButton);
    }
    const showPlaceholder = state.sdkReady && state.leaderboards && !state.remotePlayerEntry;
    el.rankingSelf.classList.toggle("hidden", !showPlaceholder && !state.remotePlayerEntry);

    if (state.remotePlayerEntry) {
      el.rankingSelf.appendChild(createRemotePlayerItem(state.remotePlayerEntry));
      return;
    }

    if (showPlaceholder) {
      el.rankingSelf.appendChild(createRemotePlayerPlaceholder());
    }
  }

  function updateRanking(mode) {
    state.rankingMode = mode;
    el.rankingList.innerHTML = "";
    const useRemote = mode === "remote";
    const source = useRemote ? state.remoteScores : state.localScores;

    if (!source.length) {
      el.rankingList.appendChild(createRankItem("-", useRemote ? t("rankingEmptyGlobal") : t("rankingEmptyLocal"), 0));
    } else {
      source.slice(0, 5).forEach(function (entry, index) {
        el.rankingList.appendChild(createRankItem(entry.rank || index + 1, entry.name || t("playerName"), entry.score || 0));
      });
    }

    if (useRemote) {
      el.ratingTitle.textContent = t("ratingTitle");
      el.ratingNote.textContent = state.canSetLeaderboardScore ? t("ratingNoteGlobal") : t("ratingAuthHint");
      renderRemotePlayerEntry();
    } else {
      el.ratingTitle.textContent = t("ratingTitle");
      el.ratingNote.textContent = t("ratingNoteLocal");
      if (el.rankingSelf) {
        el.rankingSelf.innerHTML = "";
        el.rankingSelf.classList.add("hidden");
      }
      if (el.rankingAuthButton) {
        el.rankingAuthButton.classList.add("hidden");
      }
    }
  }

  function updateStatusText(status, hint) {
    el.sdkStatus.textContent = status;
    el.sdkHint.textContent = hint;
    el.settingsStatusText.textContent = `${status}. ${hint}`;
  }

  function updateMusicButtons() {
    el.musicToggleButton.classList.toggle("muted", !state.musicEnabled);
    el.musicSettingsButton.textContent = state.musicEnabled ? t("musicOn") : t("musicOff");
  }

  function loadLocalScores() {
    try {
      state.bestScore = Number(localStorage.getItem(BEST_KEY) || 0);
      state.musicEnabled = localStorage.getItem(MUSIC_KEY) !== "0";
      state.musicVolume = clamp(Number(localStorage.getItem(MUSIC_VOLUME_KEY) || 0.5), 0, 1);
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      state.localScores = Array.isArray(raw) ? raw : [];
    } catch (error) {
      state.localScores = [];
      state.bestScore = 0;
      state.musicEnabled = true;
      state.musicVolume = 0.5;
    }

    updateHud();
    updateRanking("remote");
    updateMusicButtons();
    updateMusicVolumeUi();
  }

  function normalizeSettingsSliderLocation() {
    if (!el.musicVolumeSlider) {
      return;
    }

    const musicSection = el.musicSettingsButton ? el.musicSettingsButton.closest(".settings-section") : null;
    const sliderBlock = el.musicVolumeSlider.closest(".settings-slider");
    if (musicSection && sliderBlock && sliderBlock.parentElement !== musicSection) {
      musicSection.appendChild(sliderBlock);
    }
  }

  async function persistScore() {
    const previousBest = state.bestScore;
    state.bestScore = Math.max(state.bestScore, state.score);
    localStorage.setItem(BEST_KEY, String(state.bestScore));

    if (state.score > 0) {
      const entry = {
        name: t("selfName"),
        score: state.score,
        date: Date.now()
      };
      state.localScores = [entry].concat(state.localScores)
        .sort(function (a, b) {
          return b.score - a.score || a.date - b.date;
        })
        .slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.localScores));
    }

    updateRanking(state.rankingMode === "remote" ? "remote" : "local");

    if (state.score >= previousBest) {
      await saveYandexData();
      await submitYandexLeaderboard();
      await fetchYandexLeaderboard();
    }
  }

  async function initYandexGames() {
    if (!window.YaGames) {
      for (let attempt = 0; attempt < 12 && !window.YaGames; attempt += 1) {
        await new Promise(function (resolve) {
          setTimeout(resolve, 250);
        });
      }
    }

    if (!window.YaGames) {
      updateStatusText(t("statusLocal"), t("statusSdkMissing"));
      return;
    }

    try {
      state.ysdk = await window.YaGames.init();
      state.sdkReady = true;
      if (state.ysdk.environment?.i18n?.lang) {
        setLanguage(state.ysdk.environment.i18n.lang);
      }
      await refreshYandexPlayerState();
      state.ysdk.features?.LoadingAPI?.ready();
      updateStatusText(t("statusSdkReady"), t("statusSdkReadyHint"));
      await loadYandexData();
      await fetchYandexLeaderboard();
      updateRanking("remote");
    } catch (error) {
      updateStatusText(t("statusLocal"), t("statusSdkFailed"));
      updateRanking("local");
    }
  }

  async function loadYandexData() {
    if (!state.player) {
      return;
    }

    try {
      const data = await state.player.getData(["bestScore", "localScores"]);
      if (typeof data.bestScore === "number") {
        state.bestScore = Math.max(state.bestScore, data.bestScore);
        localStorage.setItem(BEST_KEY, String(state.bestScore));
      }
      if (Array.isArray(data.localScores) && data.localScores.length) {
        const merged = state.localScores.concat(data.localScores)
          .map(function (entry) {
            return {
              name: entry.name || t("playerName"),
              score: Number(entry.score) || 0,
              date: Number(entry.date) || Date.now()
            };
          })
          .sort(function (a, b) {
            return b.score - a.score || a.date - b.date;
          })
          .slice(0, 10);
        state.localScores = merged;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
      updateHud();
      updateRanking(state.rankingMode === "remote" ? "remote" : "local");
    } catch (error) {
      console.warn("Не удалось загрузить данные игрока", error);
    }
  }

  async function saveYandexData() {
    if (!state.player) {
      return;
    }

    try {
      await state.player.setData({
        bestScore: state.bestScore,
        localScores: state.localScores.slice(0, 5)
      });
    } catch (error) {
      console.warn("Не удалось сохранить данные игрока", error);
    }
  }

  async function submitYandexLeaderboard() {
    if (!state.leaderboards || !state.canSetLeaderboardScore || state.bestScore <= 0) {
      return;
    }

    try {
      await state.leaderboards.setScore(LEADERBOARD_NAME, state.bestScore);
    } catch (error) {
      console.warn("Лидерборд не настроен или недоступен", error);
    }
  }

  async function fetchYandexPlayerEntry() {
    if (!state.leaderboards || !state.canReadPlayerEntry || typeof state.leaderboards.getPlayerEntry !== "function") {
      state.remotePlayerEntry = null;
      return;
    }

    try {
      const entry = await state.leaderboards.getPlayerEntry(LEADERBOARD_NAME);
      state.remotePlayerEntry = normalizeLeaderboardEntry(entry, null);
    } catch (error) {
      state.remotePlayerEntry = null;
    }
  }

  async function fetchYandexLeaderboard() {
    if (!state.leaderboards) {
      state.remoteScores = [];
      state.remotePlayerEntry = null;
      return;
    }

    try {
      const response = await state.leaderboards.getEntries(LEADERBOARD_NAME, {
        quantityTop: 5,
        includeUser: true
      });
      const entries = response.entries || [];
      state.remoteScores = entries.map(function (entry, index) {
        return normalizeLeaderboardEntry(entry, index + 1);
      }).filter(Boolean);

      const userRank = Number(response.userRank) || 0;
      const topPlayerEntry = state.remoteScores.find(function (entry) {
        return entry.rank === userRank;
      });

      if (topPlayerEntry) {
        state.remotePlayerEntry = {
          rank: topPlayerEntry.rank,
          name: t("selfName"),
          score: topPlayerEntry.score
        };
      } else {
        await fetchYandexPlayerEntry();
        if (state.remotePlayerEntry && userRank > 0) {
          state.remotePlayerEntry.rank = userRank;
        } else if (userRank > 0 && state.bestScore > 0) {
          state.remotePlayerEntry = {
            rank: userRank,
            name: t("selfName"),
            score: state.bestScore
          };
        }
      }

      updateRanking("remote");
    } catch (error) {
      state.remoteScores = [];
      state.remotePlayerEntry = null;
      console.warn("Не удалось получить удалённый рейтинг", error);
      updateRanking("remote");
    }
  }

  async function refreshYandexPlayerState() {
    if (!state.ysdk) {
      state.player = null;
      state.leaderboards = null;
      state.canSetLeaderboardScore = false;
      state.canReadPlayerEntry = false;
      return;
    }

    state.player = await state.ysdk.getPlayer({ scopes: false }).catch(function () {
      return null;
    });
    state.leaderboards = state.ysdk.leaderboards || null;
    const isAvailableMethod = typeof state.ysdk.isAvailableMethod === "function"
      ? state.ysdk.isAvailableMethod.bind(state.ysdk)
      : null;
    state.canSetLeaderboardScore = Boolean(
      state.leaderboards &&
      isAvailableMethod &&
      await isAvailableMethod("leaderboards.setScore").catch(function () {
        return false;
      })
    );
    state.canReadPlayerEntry = Boolean(
      state.leaderboards &&
      isAvailableMethod &&
      await isAvailableMethod("leaderboards.getPlayerEntry").catch(function () {
        return false;
      })
    );
  }

  async function authorizeForLeaderboard() {
    if (!state.ysdk?.auth?.openAuthDialog) {
      return;
    }

    try {
      await state.ysdk.auth.openAuthDialog();
      await refreshYandexPlayerState();
      await loadYandexData();
      if (state.bestScore > 0) {
        await submitYandexLeaderboard();
      }
      await fetchYandexLeaderboard();
      updateRanking("remote");
      updateStatusText(t("statusSdkReady"), t("statusSdkReadyHint"));
    } catch (error) {
      console.warn("Не удалось пройти авторизацию для рейтинга", error);
      if (el.ratingNote) {
        el.ratingNote.textContent = t("ratingAuthHint");
      }
    }
  }

  async function maybeShowAd() {
    if (!state.ysdk || Date.now() < state.adCooldownUntil || state.roundCount % 3 !== 0) {
      return;
    }

    state.adCooldownUntil = Date.now() + 30000;

    try {
      await state.ysdk.adv.showFullscreenAdv({
        callbacks: {
          onClose: function () {},
          onError: function () {}
        }
      });
    } catch (error) {
      console.warn("Не удалось показать рекламу", error);
    }
  }

  async function startGameplay() {
    if (!state.sdkReady || state.gameplayStarted) {
      return;
    }

    state.gameplayStarted = true;
    try {
      await state.ysdk.features?.GameplayAPI?.start?.();
    } catch (error) {
      console.warn("GameplayAPI start failed", error);
    }
  }

  async function stopGameplay() {
    if (!state.sdkReady || !state.gameplayStarted) {
      return;
    }

    state.gameplayStarted = false;
    try {
      await state.ysdk.features?.GameplayAPI?.stop?.();
    } catch (error) {
      console.warn("GameplayAPI stop failed", error);
    }
  }

  async function endGame() {
    if (state.mode !== "playing") {
      return;
    }

    state.mode = "gameover";
    updateUiState();
    await stopGameplay();
    await maybeShowAd();
    await persistScore();
    updateHud();

    el.finalScore.textContent = formatScore(state.score);
    el.finalBest.textContent = formatScore(state.bestScore);
    el.gameOverTitle.textContent = state.score > 0 ? t("gameOverTitleLose") : t("gameOverTitleZero");
    el.gameOverSummary.textContent = state.score >= state.bestScore
      ? t("gameOverSummaryBest")
      : t("gameOverSummaryRetry");
    el.gameOverPanel.classList.remove("hidden");
  }

  function handlePrimaryAction(event) {
    if (event) {
      const target = event.target;
      if (target && target.closest("button")) {
        return;
      }
    }

    if (state.mode === "playing") {
      placeBlock();
    }
  }

  function ensureAudioContext() {
    if (state.audioContext) {
      return state.audioContext;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      return null;
    }

    state.audioContext = new AudioContextCtor();
    return state.audioContext;
  }

  function ensureMusicTrack() {
    if (state.musicTrack) {
      return state.musicTrack;
    }

    const track = new Audio(MUSIC_SRC);
    track.loop = true;
    track.preload = "auto";
    track.volume = BASE_MUSIC_VOLUME;
    track.addEventListener("canplaythrough", function () {
      state.musicTrackReady = true;
    }, { once: true });
    track.addEventListener("error", function () {
      state.musicTrackReady = false;
    });

    state.musicTrack = track;
    return track;
  }

  function effectiveMusicVolume() {
    return clamp(BASE_MUSIC_VOLUME * (state.musicVolume / 0.5), 0, 1);
  }

  function applyMusicVolume() {
    const track = ensureMusicTrack();
    track.volume = effectiveMusicVolume();
  }

  function updateMusicVolumeUi() {
    const percent = Math.round(state.musicVolume * 100);
    if (el.musicVolumeSlider) {
      el.musicVolumeSlider.value = String(percent);
      el.musicVolumeSlider.style.setProperty("--music-volume-percent", `${percent}%`);
    }
    if (el.musicVolumeValue) {
      el.musicVolumeValue.textContent = `${percent}%`;
    }
  }

  function setMusicVolume(value) {
    state.musicVolume = clamp(value, 0, 1);
    localStorage.setItem(MUSIC_VOLUME_KEY, String(state.musicVolume));
    applyMusicVolume();
    updateMusicVolumeUi();
  }

  function playUiTone(frequency, duration, options) {
    const audioContext = ensureAudioContext();
    if (!audioContext || !state.musicEnabled) {
      return;
    }

    const settings = options || {};
    const now = audioContext.currentTime;
    const attack = settings.attack || 0.018;
    const release = settings.release || 0.06;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = settings.type || "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    if (settings.endFrequency) {
      oscillator.frequency.exponentialRampToValueAtTime(settings.endFrequency, now + duration);
    }

    filter.type = settings.filterType || "lowpass";
    filter.frequency.setValueAtTime(settings.filterFrequency || 1800, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(settings.volume || 0.05, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + release);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + release + 0.03);
  }

  function playPlaceSound(isPerfect) {
    playUiTone(isPerfect ? 520 : 360, isPerfect ? 0.24 : 0.2, {
      type: "sine",
      endFrequency: isPerfect ? 590 : 392,
      filterFrequency: isPerfect ? 1180 : 900,
      volume: isPerfect ? 0.19 : 0.13,
      attack: 0.03,
      release: 0.12
    });

    if (isPerfect) {
      playUiTone(780, 0.22, {
        type: "sine",
        endFrequency: 820,
        filterFrequency: 980,
        volume: 0.038,
        attack: 0.04,
        release: 0.18
      });
    }
  }

  function playFailSound() {
    playUiTone(210, 0.3, {
      type: "sine",
      endFrequency: 180,
      filterFrequency: 520,
      volume: 0.11,
      attack: 0.02,
      release: 0.14
    });
  }

  function resumeMusic() {
    if (!state.musicEnabled) {
      return;
    }

    const track = ensureMusicTrack();
    applyMusicVolume();
    if (state.audioContext && state.audioContext.state === "suspended") {
      state.audioContext.resume().catch(function () {});
    }
    if (track.paused) {
      track.play().catch(function () {});
    }
  }

  function suspendMusic() {
    if (state.musicTrack && !state.musicTrack.paused) {
      state.musicTrack.pause();
    }
  }

  function toggleMusic() {
    state.musicEnabled = !state.musicEnabled;
    localStorage.setItem(MUSIC_KEY, state.musicEnabled ? "1" : "0");
    updateMusicButtons();
    if (state.musicEnabled) {
      resumeMusic();
    } else {
      suspendMusic();
    }
  }

  function handleVisibilityAudio() {
    if (document.hidden) {
      suspendMusic();
      return;
    }

    if (state.musicEnabled) {
      resumeMusic();
    }
  }

  function bindUI() {
    el.startButton.addEventListener("click", startGame);
    el.restartButton.addEventListener("click", startGame);
    if (el.gameOverMenuButton) {
      const handleGameOverMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        openMenu();
      };
      el.gameOverMenuButton.addEventListener("click", handleGameOverMenu);
      el.gameOverMenuButton.addEventListener("pointerdown", handleGameOverMenu);
    }
    if (el.restartTopButton) {
      el.restartTopButton.addEventListener("click", startGame);
    }
    if (el.restartInlineButton) {
      el.restartInlineButton.addEventListener("click", startGame);
    }
    if (el.dropButton) {
      el.dropButton.addEventListener("click", placeBlock);
    }
    el.shareButton.addEventListener("click", async function () {
      await fetchYandexLeaderboard();
      updateRanking(state.leaderboards ? "remote" : "local");
    });
    if (el.rankingAuthButton) {
      el.rankingAuthButton.addEventListener("click", authorizeForLeaderboard);
    }

    el.settingsButton.addEventListener("click", function () {
      el.settingsSheet.classList.remove("hidden");
      resumeMusic();
    });
    el.closeSettingsButton.addEventListener("click", function () {
      el.settingsSheet.classList.add("hidden");
    });
    el.musicToggleButton.addEventListener("click", toggleMusic);
    el.musicSettingsButton.addEventListener("click", toggleMusic);
    if (el.musicVolumeSlider) {
      el.musicVolumeSlider.addEventListener("input", function (event) {
        setMusicVolume(Number(event.target.value) / 100);
      });
    }

    el.canvas.addEventListener("pointerdown", handlePrimaryAction);
    document.addEventListener("pointerdown", function (event) {
      const target = event.target;
      if (target && target.closest("#gameOverMenuButton")) {
        event.preventDefault();
        event.stopPropagation();
        openMenu();
      }
    });
    window.addEventListener("keydown", function (event) {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        if (state.mode === "idle") {
          startGame();
        } else {
          handlePrimaryAction();
        }
      }
      if (event.code === "Escape") {
        el.settingsSheet.classList.add("hidden");
      }
    });

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityAudio);
    window.addEventListener("blur", suspendMusic);
    window.addEventListener("focus", function () {
      if (!document.hidden && state.musicEnabled) {
        resumeMusic();
      }
    });
  }

  function boot() {
    state.isMobile = detectMobileProfile();
    resizeCanvas();
    createStars();
    state.blocks = [createBaseBlock()];
    ensureMusicTrack();
    setLanguage(document.documentElement.lang || navigator.language || "en");
    loadLocalScores();
    normalizeSettingsSliderLocation();
    applyMusicVolume();
    bindUI();
    initYandexGames();
    updateUiState();
    requestAnimationFrame(loop);
  }

  boot();
})();
