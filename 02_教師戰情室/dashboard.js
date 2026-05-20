const students = Array.from({ length: 15 }, (_, index) => {
  const id = `S${String(index + 1).padStart(2, "0")}`;
  const groupNumber = Math.floor(index / 3) + 1;
  return {
    studentId: id,
    groupId: `G${String(groupNumber).padStart(2, "0")}`,
    groupName: `第${groupNumber}組`
  };
});

const questions = window.SEQUENCE_HUNTER_QUESTIONS;
const config = window.SEQUENCE_HUNTER_CONFIG || {};
const storageKey = "sequenceHunterAnswers";
let latestCloudData = null;

function getAnswers() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch (error) {
    localStorage.removeItem(storageKey);
    return [];
  }
}

function uniqueCorrect(records) {
  return new Set(records.filter((record) => record.isCorrect).map((record) => record.levelId));
}

function getQuestion(levelId) {
  return questions.find((question) => question.levelId === levelId);
}

function normalizeBoolean(value) {
  return value === true || String(value).toUpperCase() === "TRUE";
}

function normalizeAnswers(records) {
  return records.map((record) => ({
    ...record,
    isCorrect: normalizeBoolean(record.isCorrect),
    hintUsed: normalizeBoolean(record.hintUsed),
    expEarned: Number(record.expEarned || 0)
  }));
}

function loadCloudDashboard() {
  if (!config.useGoogleSheet || !config.apiUrl) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const callbackName = `sequenceHunterDashboard_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const separator = config.apiUrl.includes("?") ? "&" : "?";
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("dashboard timeout"));
    }, 8000);

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
      reject(new Error("dashboard load failed"));
    };

    script.src = `${config.apiUrl}${separator}action=dashboard&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

function getStudentStats(answers) {
  return students.map((student) => {
    const records = answers.filter((record) => record.studentId === student.studentId);
    const passed = uniqueCorrect(records).size;
    const exp = records.filter((record) => record.isCorrect)
      .reduce((sum, record) => sum + Number(record.expEarned || 0), 0);
    const hints = records.filter((record) => record.hintUsed).length;
    return { ...student, passed, exp, hints, attempts: records.length };
  });
}

async function render() {
  let activeStudentsList = students;
  let answers = getAnswers();
  let dataSource = "本機測試紀錄";

  try {
    const cloudData = await loadCloudDashboard();
    if (cloudData?.ok) {
      latestCloudData = cloudData;
      answers = normalizeAnswers(cloudData.answers || []);
      if (Array.isArray(cloudData.students) && cloudData.students.length) {
        activeStudentsList = cloudData.students.map((student) => ({
          studentId: student.studentId,
          groupId: student.groupId,
          groupName: student.groupName || student.groupId
        }));
      }
      dataSource = "Google Sheet";
    }
  } catch (error) {
    console.warn("Cloud dashboard unavailable; using local data.", error);
  }

  renderWithData(answers, activeStudentsList, dataSource);
}

function renderWithData(answers, studentList, dataSource) {
  const studentStats = getStudentStatsForList(answers, studentList);
  const totalPossible = studentList.length * questions.length;
  const totalCorrect = studentStats.reduce((sum, student) => sum + student.passed, 0);
  const activeStudents = studentStats.filter((student) => student.attempts > 0);
  const activeGroups = new Set(activeStudents.map((student) => student.groupId));
  const completion = totalPossible ? Math.round((totalCorrect / totalPossible) * 100) : 0;

  document.querySelector("#completionRate").textContent = `${completion}%`;
  document.querySelector("#completionBar").style.width = `${completion}%`;
  document.querySelector("#totalAttempts").textContent = answers.length;
  document.querySelector("#activeCount").textContent = activeStudents.length;
  document.querySelector("#activeGroupCount").textContent = activeGroups.size;
  document.querySelector("#updatedAt").textContent = `更新時間：${new Date().toLocaleTimeString("zh-TW", { hour12: false })}｜${dataSource}`;

  renderStudents(studentStats);
  renderGroups(studentStats);
  renderHotQuestions(answers);
  renderActivity(answers);
}

function getStudentStatsForList(answers, studentList) {
  return studentList.map((student) => {
    const records = answers.filter((record) => record.studentId === student.studentId);
    const passed = uniqueCorrect(records).size;
    const exp = records.filter((record) => record.isCorrect)
      .reduce((sum, record) => sum + Number(record.expEarned || 0), 0);
    const hints = records.filter((record) => record.hintUsed).length;
    return { ...student, passed, exp, hints, attempts: records.length };
  });
}

function renderStudents(studentStats) {
  const rows = [...studentStats]
    .sort((a, b) => b.exp - a.exp || b.passed - a.passed || a.studentId.localeCompare(b.studentId))
    .slice(0, 10);

  document.querySelector("#studentRows").innerHTML = rows.length
    ? rows.map((row, index) => `
      <div class="rank-row">
        <span class="rank">${index + 1}</span>
        <div class="name">${row.studentId}<span class="sub">${row.groupName}｜提示 ${row.hints} 次</span></div>
        <div class="small-value">${row.passed}/${questions.length} 題</div>
        <div class="value">${row.exp} EXP</div>
      </div>
    `).join("")
    : `<div class="empty">讀取中...</div>`;
}

function renderGroups(studentStats) {
  const groupMap = new Map();
  studentStats.forEach((student) => {
    if (!groupMap.has(student.groupId)) {
      groupMap.set(student.groupId, { groupId: student.groupId, groupName: student.groupName, passed: 0, exp: 0, members: 0 });
    }
    const group = groupMap.get(student.groupId);
    group.passed += student.passed;
    group.exp += student.exp;
    group.members += 1;
  });

  const rows = Array.from(groupMap.values()).sort((a, b) => b.exp - a.exp || b.passed - a.passed);
  document.querySelector("#groupRows").innerHTML = rows.length
    ? rows.map((row, index) => `
      <div class="rank-row">
        <span class="rank">${index + 1}</span>
        <div class="name">${row.groupName}<span class="sub">${row.members} 人｜平均 ${Math.round(row.exp / row.members)} EXP</span></div>
        <div class="small-value">${row.passed} 題</div>
        <div class="value">${row.exp} EXP</div>
      </div>
    `).join("")
    : `<div class="empty">讀取中...</div>`;
}

function renderHotQuestions(answers) {
  const rows = questions.map((question) => {
    const records = answers.filter((record) => record.levelId === question.levelId);
    return {
      levelName: question.levelName,
      unitName: question.unitName,
      wrong: records.filter((record) => !record.isCorrect).length,
      hints: records.filter((record) => record.hintUsed).length
    };
  }).sort((a, b) => b.wrong - a.wrong || b.hints - a.hints).slice(0, 8);

  document.querySelector("#hotRows").innerHTML = rows.length
    ? rows.map((row) => `
      <div class="hot-row">
        <div class="name">${row.levelName}<span class="sub">${row.unitName}</span></div>
        <div class="small-value">錯誤 ${row.wrong}</div>
        <div class="small-value">提示 ${row.hints}</div>
      </div>
    `).join("")
    : `<div class="empty">讀取中...</div>`;
}

function renderActivity(answers) {
  const rows = answers.slice(-8).reverse();
  document.querySelector("#activityLog").innerHTML = rows.length
    ? rows.map((record) => {
      const question = getQuestion(record.levelId);
      const status = record.isCorrect ? "通過" : "再挑戰";
      const statusClass = record.isCorrect ? "pass" : "fail";
      return `<div class="log-item"><span class="${statusClass}">${status}</span>｜${record.studentId}｜${question?.levelName || record.levelId}｜${record.answerSubmitted}</div>`;
    }).join("")
    : `<div class="empty">目前尚無作答紀錄。請先到學生端測試送出答案。</div>`;
}

function clearLocalRecords() {
  const ok = window.confirm("確定要清空本機測試作答紀錄嗎？這不會影響題庫。");
  if (!ok) return;
  localStorage.removeItem(storageKey);
  render();
}

document.querySelector("#refreshButton").addEventListener("click", render);
document.querySelector("#clearButton").addEventListener("click", clearLocalRecords);
render();
setInterval(render, 5000);
