let students = Array.from({ length: 15 }, (_, index) => {
  const id = `S${String(index + 1).padStart(2, "0")}`;
  const groupNumber = Math.floor(index / 3) + 1;
  return {
    studentId: id,
    nickname: id,
    groupId: `G${String(groupNumber).padStart(2, "0")}`,
    groupName: `第${groupNumber}組`
  };
});

const questions = window.SEQUENCE_HUNTER_QUESTIONS;
const config = window.SEQUENCE_HUNTER_CONFIG || {};
const aiTutorUrl = config.aiTutorUrl || "https://gemini.google.com/gem/1nUhsjmK36eLZgPn-TbuiQVr8F9llzog8?usp=sharing";
const storageKey = "sequenceHunterAnswers";
const sessionKey = "sequenceHunterSession";

let currentStudent = null;
let currentQuestion = questions[0];
let currentMissionGroup = questions[0]?.unitName || "";
let currentChapter = "3-1";
let selectedChoice = "";
let hintLevel = 0;

const studentLoginForm = document.querySelector("#studentLoginForm");
const classInput = document.querySelector("#classInput");
const seatInput = document.querySelector("#seatInput");
const nameInput = document.querySelector("#nameInput");
const studentLoginMessage = document.querySelector("#studentLoginMessage");
const studentSummary = document.querySelector("#studentSummary");
const missionList = document.querySelector("#missionList");
const missionChapterSelect = document.querySelector("#missionChapterSelect");
const missionGroupSelect = document.querySelector("#missionGroupSelect");
const missionGroupProgress = document.querySelector("#missionGroupProgress");
const studentBadge = document.querySelector("#studentBadge");
const expBadge = document.querySelector("#expBadge");
const unitName = document.querySelector("#unitName");
const levelName = document.querySelector("#levelName");
const difficulty = document.querySelector("#difficulty");
const questionText = document.querySelector("#questionText");
const choices = document.querySelector("#choices");
const answerInput = document.querySelector("#answerInput");
const hintButton = document.querySelector("#hintButton");
const submitButton = document.querySelector("#submitButton");
const aiTutorLink = document.querySelector("#aiTutorLink");
const hintBox = document.querySelector("#hintBox");
const feedback = document.querySelector("#feedback");

function getSessionId() {
  let sessionId = localStorage.getItem(sessionKey);
  if (!sessionId) {
    sessionId = `session-${Date.now()}`;
    localStorage.setItem(sessionKey, sessionId);
  }
  return sessionId;
}

function getAnswers() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch (error) {
    localStorage.removeItem(storageKey);
    return [];
  }
}

function setAnswers(records) {
  localStorage.setItem(storageKey, JSON.stringify(records));
}

function getStudentDisplayName(student) {
  return student.nickname || student.studentName || student.studentId;
}

function normalizeStudentText(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replaceAll("袓", "祖");
}

function normalizeSeat(value) {
  const digits = String(value || "").match(/\d+/)?.[0] || "";
  return digits ? String(Number(digits)).padStart(2, "0") : "";
}

function getStudentSeat(student) {
  const nicknameSeat = String(student.nickname || "").match(/^(\d{1,2})/);
  if (nicknameSeat) return normalizeSeat(nicknameSeat[1]);
  const idSeat = String(student.studentId || "").match(/(\d{1,2})$/);
  return idSeat ? normalizeSeat(idSeat[1]) : "";
}

function getQuestionChapterId(question) {
  const levelId = String(question?.levelId || "");
  if (levelId.startsWith("3-3")) return "3-3";
  if (levelId.startsWith("3-2")) return "3-2";
  return "3-1";
}

function getChapterLabel(chapterId) {
  if (chapterId === "3-3") return "3-3 遞迴關係與數學歸納法";
  return chapterId === "3-2" ? "3-2 等比數列與等比級數" : "3-1 等差數列與等差級數";
}

function getUnitBaseName(unitName) {
  return String(unitName || "未分類任務").replace(/^3-[123]\s*/, "");
}

function getMissionGroupLabel(unitName, chapterId = currentChapter) {
  return `${chapterId} ${getUnitBaseName(unitName)}`;
}

function getChapters() {
  return [...new Set(questions.map(getQuestionChapterId))];
}

function getQuestionsInCurrentChapter() {
  return questions.filter((question) => getQuestionChapterId(question) === currentChapter);
}

function findStudentByLogin(seat, name) {
  const targetSeat = normalizeSeat(seat);
  const targetName = normalizeStudentText(name);
  return students.find((student) => {
    if (getStudentSeat(student) !== targetSeat) return false;
    if (!targetName) return true;

    const studentName = normalizeStudentText(student.studentName);
    const nickname = normalizeStudentText(student.nickname);
    return studentName === targetName || nickname.includes(targetName[0] || "");
  });
}

function getOverallProgress(studentId) {
  const completed = getCompletedCount(studentId);
  return {
    completed,
    total: questions.length,
    remaining: Math.max(questions.length - completed, 0),
    exp: getExp(studentId)
  };
}

function getEncouragement(progress) {
  if (!currentStudent) return "輸入資料登入後，就能接續你的任務進度。";
  if (progress.completed >= progress.total) return "太好了，你已經把目前任務都完成了，可以挑戰下一段學習。";
  if (progress.completed >= Math.ceil(progress.total * 0.7)) return "你已經完成大部分任務了，再補上未通關關卡就很完整。";
  if (progress.completed > 0) return "已經有進度了，照著關卡一步一步推進就可以。";
  return "先從第一個任務開始，遇到卡關可以用提示或詢問老師。";
}

function renderStudentSummary() {
  if (!studentSummary) return;
  if (!currentStudent) {
    studentSummary.hidden = true;
    return;
  }

  const progress = getOverallProgress(currentStudent.studentId);
  const groupProgress = getGroupProgress(currentMissionGroup);
  studentSummary.hidden = false;
  studentSummary.innerHTML = `
    <div class="welcome-card">
      <p class="welcome-kicker">歡迎登入</p>
      <h3>${escapeHtml(getStudentDisplayName(currentStudent))}</h3>
      <p>${escapeHtml(currentStudent.groupName || "")}｜${escapeHtml(classInput?.value || "汽車一")}</p>
    </div>
    <div class="progress-grid">
      <div><strong>${progress.completed}</strong><span>已完成</span></div>
      <div><strong>${progress.remaining}</strong><span>未完成</span></div>
      <div><strong>${progress.exp}</strong><span>EXP</span></div>
    </div>
    <p class="chapter-progress">目前章節：${groupProgress.completed}/${groupProgress.total} 題已通關</p>
    <p class="encouragement">${getEncouragement(progress)}</p>
    <button type="button" class="switch-student" id="switchStudentButton">重新登入</button>
  `;

  document.querySelector("#switchStudentButton")?.addEventListener("click", () => {
    currentStudent = null;
    studentBadge.textContent = "尚未登入";
    updateExp();
    renderLoginPanel();
    renderMissionGroups();
  });
}

function renderLoginPanel() {
  if (!studentLoginForm || !studentSummary) return;
  studentLoginForm.hidden = Boolean(currentStudent);
  if (studentLoginMessage) {
    studentLoginMessage.textContent = "";
    studentLoginMessage.className = "student-login-message";
  }
  renderStudentSummary();
}

function getMissionGroups() {
  return [...new Set(getQuestionsInCurrentChapter().map((question) => question.unitName || "未分類任務"))];
}

function getQuestionsInCurrentGroup() {
  return getQuestionsInCurrentChapter()
    .filter((question) => (question.unitName || "未分類任務") === currentMissionGroup);
}

function getGroupProgress(unitName) {
  const groupQuestions = getQuestionsInCurrentChapter()
    .filter((question) => (question.unitName || "未分類任務") === unitName);
  const completed = currentStudent
    ? groupQuestions.filter((question) => getStudentRecords(currentStudent.studentId)
      .some((record) => record.levelId === question.levelId && record.isCorrect)).length
    : 0;
  return {
    completed,
    total: groupQuestions.length
  };
}

function renderMissionGroups() {
  if (!missionGroupSelect) return;

  if (missionChapterSelect) {
    const chapters = getChapters();
    if (!chapters.includes(currentChapter)) currentChapter = chapters[0] || "3-1";
    missionChapterSelect.innerHTML = "";
    chapters.forEach((chapter) => {
      const option = document.createElement("option");
      option.value = chapter;
      option.textContent = getChapterLabel(chapter);
      option.selected = chapter === currentChapter;
      missionChapterSelect.appendChild(option);
    });
  }

  const groups = getMissionGroups();
  if (!groups.includes(currentMissionGroup)) {
    currentMissionGroup = groups[0] || "";
  }

  missionGroupSelect.innerHTML = "";
  groups.forEach((group) => {
    const option = document.createElement("option");
    const progress = getGroupProgress(group);
    option.value = group;
    option.textContent = `${getMissionGroupLabel(group)} (${progress.completed}/${progress.total})`;
    option.selected = group === currentMissionGroup;
    missionGroupSelect.appendChild(option);
  });

  const currentProgress = getGroupProgress(currentMissionGroup);
  missionGroupProgress.textContent = currentStudent
    ? `本章節進度：${currentProgress.completed}/${currentProgress.total} 題已通關`
    : `本章節共有 ${currentProgress.total} 題，選擇獵人身份後會顯示進度。`;
}

function loadCloudStudents() {
  if (!config.useGoogleSheet || !config.apiUrl) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const callbackName = `sequenceHunterStudents_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const separator = config.apiUrl.includes("?") ? "&" : "?";
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("students timeout"));
    }, 20000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("students load failed"));
    };

    script.src = `${config.apiUrl}${separator}action=students&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

function loadCloudProgress(studentId) {
  if (!config.useGoogleSheet || !config.apiUrl || !studentId) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const callbackName = `sequenceHunterProgress_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const separator = config.apiUrl.includes("?") ? "&" : "?";
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("student progress timeout"));
    }, 20000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("student progress load failed"));
    };

    script.src = `${config.apiUrl}${separator}action=studentProgress&studentId=${encodeURIComponent(studentId)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

function normalizeBoolean(value) {
  return value === true || String(value).toUpperCase() === "TRUE";
}

function normalizeNumber(value, fallback = 0) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function normalizeTimestamp(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function normalizeCloudAnswer(record) {
  return {
    ...record,
    timestamp: normalizeTimestamp(record.timestamp),
    isCorrect: normalizeBoolean(record.isCorrect),
    attemptNumber: normalizeNumber(record.attemptNumber, 1),
    hintUsed: normalizeBoolean(record.hintUsed),
    hintLevel: normalizeNumber(record.hintLevel, 0),
    expEarned: normalizeNumber(record.expEarned, 0),
    deviceNote: record.deviceNote || "cloud-sync"
  };
}

function getAnswerKey(record) {
  return [
    record.timestamp || "",
    record.studentId || "",
    record.levelId || "",
    record.answerSubmitted || "",
    record.attemptNumber || ""
  ].join("|");
}

function mergeCloudAnswers(records) {
  if (!Array.isArray(records) || !records.length) return 0;

  const current = getAnswers();
  const seen = new Set(current.map(getAnswerKey));
  const additions = records
    .map(normalizeCloudAnswer)
    .filter((record) => {
      const key = getAnswerKey(record);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  if (additions.length) {
    setAnswers([...current, ...additions]);
  }
  return additions.length;
}

function getCompletedCount(studentId) {
  return new Set(
    getStudentRecords(studentId)
      .filter((record) => record.isCorrect)
      .map((record) => record.levelId)
  ).size;
}

async function syncStudentProgress(student) {
  if (!student) return;

  showFeedback("correct", "正在同步雲端進度，稍等一下。");
  const progress = await loadCloudProgress(student.studentId);
  if (!progress?.ok || !Array.isArray(progress.answers)) {
    showFeedback("wrong", "目前讀不到雲端進度，先使用這台裝置的紀錄。");
    return;
  }

  mergeCloudAnswers(progress.answers);
  updateExp();
  renderMissions();
  renderQuestion(currentQuestion);

  const completedCount = getCompletedCount(student.studentId);
  const exp = getExp(student.studentId);
  showFeedback("correct", `已同步雲端進度：已通關 ${completedCount} 題，累積 ${exp} EXP。`);
}

async function saveAnswerToCloud(record) {
  if (!config.useGoogleSheet || !config.apiUrl) {
    return { ok: false, skipped: true };
  }

  const response = await fetch(config.apiUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      action: "saveAnswer",
      payload: record
    })
  });

  return { ok: true, response };
}

function normalize(value) {
  return String(value || "")
    .trim()
    .replaceAll("，", ",")
    .replace(/\s+/g, "")
    .toUpperCase();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMathText(value) {
  const tokens = [];
  const stash = (html) => {
    const key = `@@MATH_${tokens.length}@@`;
    tokens.push([key, html]);
    return key;
  };

  let text = escapeHtml(value)
    .replace(/\br\^\(n-1\)/g, () => stash('<span class="math"><var>r</var><sup>n-1</sup></span>'))
    .replace(/\b(\d+)\^\(n-1\)/g, (_, base) => stash(`<span class="math">${base}<sup>n-1</sup></span>`))
    .replace(/\b([a-zA-Z])\^\((\d+-1)\)/g, (_, base, exponent) => stash(`<span class="math"><var>${base}</var><sup>${exponent}</sup></span>`))
    .replace(/\b(\d+)\^\((\d+-1)\)/g, (_, base, exponent) => stash(`<span class="math">${base}<sup>${exponent}</sup></span>`))
    .replace(/\bn\^2\b/g, () => stash('<span class="math"><var>n</var><sup>2</sup></span>'))
    .replace(/\b([a-zA-Z])\^(\d+)\b/g, (_, base, exponent) => stash(`<span class="math"><var>${base}</var><sup>${exponent}</sup></span>`))
    .replace(/\b(\d+)\^(\d+)\b/g, (_, base, exponent) => stash(`<span class="math">${base}<sup>${exponent}</sup></span>`))
    .replace(/\ba(\d+)\b/g, (_, subscript) => stash(`<span class="math"><var>a</var><sub>${subscript}</sub></span>`))
    .replace(/\ban\b/g, () => stash('<span class="math"><var>a</var><sub>n</sub></span>'))
    .replace(/\bd\b/g, () => stash('<span class="math"><var>d</var></span>'))
    .replace(/\bn\b/g, () => stash('<span class="math"><var>n</var></span>'))
    .replace(/\bk\b/g, () => stash('<span class="math"><var>k</var></span>'))
    .replace(/\bi\b/g, () => stash('<span class="math"><var>i</var></span>'));

  tokens.forEach(([key, html]) => {
    text = text.replaceAll(key, html);
  });
  return text;
}

function isCorrectAnswer(question, submitted) {
  const accepted = [question.answer, ...(question.aliases || [])].map(normalize);
  return accepted.includes(normalize(submitted));
}

function getStudentRecords(studentId) {
  return getAnswers().filter((record) => record.studentId === studentId);
}

function getExp(studentId) {
  return getStudentRecords(studentId)
    .filter((record) => record.isCorrect)
    .reduce((sum, record) => sum + Number(record.expEarned || 0), 0);
}

function getAttemptNumber(studentId, levelId) {
  return getStudentRecords(studentId).filter((record) => record.levelId === levelId).length + 1;
}

function renderStudents() {
  studentGrid.innerHTML = "";
  students.forEach((student) => {
    const button = document.createElement("button");
    button.textContent = getStudentDisplayName(student);
    button.className = currentStudent?.studentId === student.studentId ? "active" : "";
    button.addEventListener("click", () => {
      currentStudent = student;
      studentBadge.textContent = `獵人 ${getStudentDisplayName(student)}｜${student.groupName}`;
      updateExp();
      renderStudents();
      renderMissions();
      renderQuestion(currentQuestion);
      syncStudentProgress(student).catch((error) => {
        console.warn("Cloud progress unavailable; using local records.", error);
        showFeedback("wrong", "目前讀不到雲端進度，先使用這台裝置的紀錄。");
      });
    });
    studentGrid.appendChild(button);
  });
}

function renderMissions() {
  renderMissionGroups();
  missionList.innerHTML = "";
  const visibleQuestions = getQuestionsInCurrentGroup();
  visibleQuestions.forEach((question, index) => {
    const done = currentStudent && getStudentRecords(currentStudent.studentId)
      .some((record) => record.levelId === question.levelId && record.isCorrect);
    const button = document.createElement("button");
    button.className = `mission ${currentQuestion.levelId === question.levelId ? "active" : ""}`;
    button.innerHTML = `<span>${index + 1}. ${question.levelName}</span><small>${getMissionGroupLabel(question.unitName, getQuestionChapterId(question))}${done ? "｜已通關" : ""}</small>`;
    button.addEventListener("click", () => renderQuestion(question));
    missionList.appendChild(button);
  });
  renderStudentSummary();
}

function renderQuestion(question) {
  currentQuestion = question;
  currentChapter = getQuestionChapterId(question);
  currentMissionGroup = question.unitName || "未分類任務";
  selectedChoice = "";
  hintLevel = 0;
  unitName.textContent = getMissionGroupLabel(question.unitName, currentChapter);
  levelName.textContent = question.levelName;
  difficulty.textContent = question.difficulty;
  questionText.innerHTML = formatMathText(question.question);
  answerInput.value = "";
  answerInput.style.display = question.questionType === "shortAnswer" ? "block" : "none";
  hintBox.style.display = "none";
  hintBox.textContent = "";
  feedback.className = "feedback";
  feedback.textContent = "";
  choices.innerHTML = "";

  if (question.questionType === "singleChoice") {
    question.choices.forEach((choice, index) => {
      const letter = String.fromCharCode(65 + index);
      const button = document.createElement("button");
      button.className = "choice";
      button.innerHTML = `${letter}. ${formatMathText(choice)}`;
      button.addEventListener("click", () => {
        selectedChoice = letter;
        document.querySelectorAll(".choice").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
      choices.appendChild(button);
    });
  }

  renderMissions();
}

function updateExp() {
  expBadge.textContent = `${currentStudent ? getExp(currentStudent.studentId) : 0} EXP`;
}

function showHint() {
  if (!currentQuestion) return;
  hintLevel = Math.min(hintLevel + 1, currentQuestion.hints.length);
  const hints = currentQuestion.hints.slice(0, hintLevel);
  hintBox.style.display = "block";
  const rescue = hintLevel >= currentQuestion.hints.length && currentQuestion.rescue
    ? `<div class="rescue"><strong>仍然卡住時：</strong>${currentQuestion.rescue.map((step) => `<div>${formatMathText(step)}</div>`).join("")}<div>也可以先跳下一題，等老師巡迴時再回來處理。</div></div>`
    : "";
  hintBox.innerHTML = hints.map((hint, index) => `<div>${index + 1}. ${formatMathText(hint)}</div>`).join("") + rescue;
}

function showFeedback(type, message) {
  feedback.className = `feedback ${type}`;
  feedback.textContent = message;
  feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function submitAnswer() {
  try {
    if (!currentStudent) {
      showFeedback("wrong", "請先選擇左側的獵人身份，再提交任務。");
      return;
    }

    const submitted = currentQuestion.questionType === "singleChoice" ? selectedChoice : answerInput.value;
    if (!submitted) {
      showFeedback("wrong", "請先選擇或輸入答案，再提交任務。");
      return;
    }

    const correct = isCorrectAnswer(currentQuestion, submitted);
    const noHintBonus = correct && hintLevel === 0 ? 5 : 0;
    const expEarned = correct ? currentQuestion.exp + noHintBonus : 0;
    const records = getAnswers();
    const record = {
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      studentId: currentStudent.studentId,
      groupId: currentStudent.groupId,
      levelId: currentQuestion.levelId,
      unitName: currentQuestion.unitName,
      questionType: currentQuestion.questionType,
      answerSubmitted: submitted,
      isCorrect: correct,
      attemptNumber: getAttemptNumber(currentStudent.studentId, currentQuestion.levelId),
      hintUsed: hintLevel > 0,
      hintLevel,
      expEarned,
      badgeEarned: currentQuestion.gameMode === "boss" && correct ? "公差追蹤者" : "",
      timeSpentSec: "",
      deviceNote: config.useGoogleSheet ? "gas-connected" : "local-mvp"
    };

    records.push(record);
    setAnswers(records);
    saveAnswerToCloud(record).catch((error) => {
      console.warn("Cloud save failed; local record kept.", error);
    });
    updateExp();
    renderMissions();

    showFeedback(
      correct ? "correct" : "wrong",
      correct
        ? `任務通關，獲得 ${expEarned} EXP，紀錄已送出。${currentQuestion.worksheetHint}`
        : "任務尚未通關，先回到學習單檢查計算，再使用支援提示重新挑戰。"
    );
  } catch (error) {
    showFeedback("wrong", "送出時發生暫存錯誤，請重新整理頁面後再試一次。");
    console.error(error);
  }
}

hintButton.addEventListener("click", showHint);
submitButton.addEventListener("click", submitAnswer);
function renderStudents() {
  renderLoginPanel();
}

async function loginStudent(event) {
  event.preventDefault();
  const seat = seatInput?.value || "";
  const name = nameInput?.value || "";
  const student = findStudentByLogin(seat, name);

  if (!normalizeSeat(seat) || !normalizeStudentText(name)) {
    studentLoginMessage.textContent = "請輸入座號與姓名，例如：座號 02，姓名 林小明。";
    studentLoginMessage.className = "student-login-message wrong";
    return;
  }

  if (!student) {
    studentLoginMessage.textContent = "找不到這位學生，請確認座號是否正確，或請老師協助。";
    studentLoginMessage.className = "student-login-message wrong";
    return;
  }

  currentStudent = student;
  studentBadge.textContent = `獵人 ${getStudentDisplayName(student)}｜${student.groupName}`;
  studentLoginMessage.textContent = "登入成功，正在同步雲端進度。";
  studentLoginMessage.className = "student-login-message correct";
  updateExp();
  renderStudents();
  renderMissions();
  renderQuestion(currentQuestion);

  try {
    await syncStudentProgress(student);
    renderStudentSummary();
  } catch (error) {
    console.warn("Cloud progress unavailable; using local records.", error);
    showFeedback("wrong", "目前讀不到雲端進度，先使用這台裝置的紀錄。");
    renderStudentSummary();
  }
}

studentLoginForm?.addEventListener("submit", loginStudent);
missionChapterSelect?.addEventListener("change", () => {
  currentChapter = missionChapterSelect.value;
  currentMissionGroup = getMissionGroups()[0] || "";
  const firstQuestion = getQuestionsInCurrentGroup()[0];
  if (firstQuestion) {
    renderQuestion(firstQuestion);
  } else {
    renderMissions();
  }
});
missionGroupSelect.addEventListener("change", () => {
  currentMissionGroup = missionGroupSelect.value;
  const firstQuestion = getQuestionsInCurrentGroup()[0];
  if (firstQuestion) {
    renderQuestion(firstQuestion);
  } else {
    renderMissions();
  }
});
aiTutorLink.href = aiTutorUrl;

async function init() {
  renderStudents();
  renderMissions();
  renderQuestion(currentQuestion);

  try {
    const cloudData = await loadCloudStudents();
    if (cloudData?.ok && Array.isArray(cloudData.students) && cloudData.students.length) {
      students = cloudData.students.map((student) => ({
        studentId: student.studentId,
        studentName: student.studentName,
        nickname: student.nickname || student.studentName || student.studentId,
        groupId: student.groupId,
        groupName: student.groupName || student.groupId
      }));
      if (currentStudent) {
        currentStudent = students.find((student) => student.studentId === currentStudent.studentId) || currentStudent;
        studentBadge.textContent = `獵人 ${getStudentDisplayName(currentStudent)}｜${currentStudent.groupName}`;
      }
      renderStudents();
      renderMissions();
    }
  } catch (error) {
    console.warn("Cloud students unavailable; using default student list.", error);
  }
}

init();
