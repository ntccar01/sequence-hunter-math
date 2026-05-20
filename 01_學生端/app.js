const students = Array.from({ length: 15 }, (_, index) => {
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
const storageKey = "sequenceHunterAnswers";
const sessionKey = "sequenceHunterSession";

let currentStudent = null;
let currentQuestion = questions[0];
let selectedChoice = "";
let hintLevel = 0;

const studentGrid = document.querySelector("#studentGrid");
const missionList = document.querySelector("#missionList");
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
    .replace(/\bn\^2\b/g, () => stash('<span class="math"><var>n</var><sup>2</sup></span>'))
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
    button.textContent = student.studentId;
    button.className = currentStudent?.studentId === student.studentId ? "active" : "";
    button.addEventListener("click", () => {
      currentStudent = student;
      studentBadge.textContent = `獵人 ${student.studentId}｜${student.groupName}`;
      updateExp();
      renderStudents();
      renderMissions();
      renderQuestion(currentQuestion);
    });
    studentGrid.appendChild(button);
  });
}

function renderMissions() {
  missionList.innerHTML = "";
  questions.forEach((question, index) => {
    const done = currentStudent && getStudentRecords(currentStudent.studentId)
      .some((record) => record.levelId === question.levelId && record.isCorrect);
    const button = document.createElement("button");
    button.className = `mission ${currentQuestion.levelId === question.levelId ? "active" : ""}`;
    button.innerHTML = `<span>${index + 1}. ${question.levelName}</span><small>${question.unitName}${done ? "｜已通關" : ""}</small>`;
    button.addEventListener("click", () => renderQuestion(question));
    missionList.appendChild(button);
  });
}

function renderQuestion(question) {
  currentQuestion = question;
  selectedChoice = "";
  hintLevel = 0;
  unitName.textContent = question.unitName;
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
      button.textContent = `${letter}. ${choice}`;
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
      showFeedback("wrong", "請先選擇左側的獵人身份，例如 S01，再提交任務。");
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

renderStudents();
renderMissions();
renderQuestion(currentQuestion);
