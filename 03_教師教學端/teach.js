const lessons = [
  {
    id: "lesson-1",
    tag: "第 1 節",
    title: "數列概念與前幾項",
    subtitle: "p.1-p.4｜數字排隊、生活數列、代入前 5 項",
    goals: [
      "能用自己的話說出數列是一串依序排列的數。",
      "能從生活中找出有順序的例子。",
      "能把 n=1,2,3,4,5 代入一般項，寫出前 5 項。"
    ],
    timeline: [
      ["0-5", "開場與登入", "請學生選獵人身份，說明今天先測試學習方式。"],
      ["5-10", "生活中的數列", "請學生在學習單寫一個生活中的順序例子。"],
      ["10-22", "前 5 項代入", "示範一次代入流程，再讓學生挑戰網頁任務。"],
      ["22-34", "平方概念", "巡視學生是否知道平方是自己乘自己。"],
      ["34-40", "小組互助", "2 到 3 人討論卡住處，老師只給方向。"],
      ["40-45", "冷卻整理", "請學生補學習單卡關記錄。"]
    ],
    demoQuestion: "若數列的一般項是 n+3，請寫出前 5 項。",
    demoSteps: [
      "把 n 依序換成 1,2,3,4,5。",
      "n=1 時，1+3=4。",
      "n=2 時，2+3=5。",
      "所以前 5 項是 4,5,6,7,8。"
    ],
    observe: [
      "學生是否知道 n 是第幾項，不是答案本身。",
      "學生是否能先在紙本寫代入，再到網頁送答案。",
      "學生使用提示後，是否能回到學習單補過程。"
    ],
    studentTask: "學生端主要完成第 1 到第 3 題：數字排隊、2n+1 前 5 項、n 的平方前 5 項。",
    checklist: [
      "Google Sheet 的 Answers 是否有資料。",
      "戰情室是否出現參與學生與小組。",
      "最多人卡住的是概念、代入，還是答案格式。"
    ]
  },
  {
    id: "lesson-2",
    tag: "第 2 節",
    title: "級數與逐項展開",
    subtitle: "p.5-p.8｜數列與級數、下限上限、逐項展開",
    goals: [
      "能分清楚數列是排隊，級數是把各項加起來。",
      "能看懂下限與上限代表代入範圍。",
      "能把簡單級數逐項展開成加法式。"
    ],
    timeline: [
      ["0-5", "登入與回顧", "回顧第 1 節的前 5 項，提醒學生先寫紙本。"],
      ["5-12", "加法密碼", "用數列 vs 級數的差異建立語言。"],
      ["12-25", "展開 k", "先圈下限與上限，再依序寫 k=1 到 5。"],
      ["25-37", "展開 3i+1", "觀察學生是否先代入再用加號連接。"],
      ["37-43", "小組互助", "讓學生互查漏項、漏加號、漏加 1。"],
      ["43-45", "冷卻整理", "收集看不懂 k/i 的學生。"]
    ],
    demoQuestion: "請將 j=2 到 5 的 2j 逐項展開。",
    demoSteps: [
      "先看下限是 2，上限是 5。",
      "j 依序代入 2,3,4,5。",
      "2j 變成 4,6,8,10。",
      "逐項展開為 4+6+8+10。"
    ],
    observe: [
      "學生是否把級數誤認為只有一串數字。",
      "學生是否知道 k、i、j 都只是代入用的符號。",
      "學生是否忘記加號，或忘記把每一項算出來。"
    ],
    studentTask: "學生端主要完成第 4 到第 6 題：級數概念、k 的逐項展開、3i+1 的逐項展開。",
    checklist: [
      "第 4 題若錯很多，下一節先補數列與級數差異。",
      "第 5 題若卡住，多半是不懂下限與上限。",
      "第 6 題若卡住，多半是代入後計算或漏掉 +1。"
    ]
  },
  {
    id: "lesson-3",
    tag: "第 3 節",
    title: "等差數列與第 n 項",
    subtitle: "p.9-p.10｜公差、首項、公差公式、第 n 項",
    goals: [
      "能判斷相鄰兩項固定相差多少，並說出公差。",
      "能分辨 a1、d、n 在題目中代表什麼。",
      "能使用 an=a1+(n-1)d 求等差數列的指定項。"
    ],
    timeline: [
      ["0-5", "登入與暖身", "請學生選獵人身份，快速複習數列是依序排列。"],
      ["5-12", "找公差", "用 5,7,9,11 示範後項減前項，建立 d 的意義。"],
      ["12-24", "公式定位", "把 a1、d、n 放入三格表，避免學生直接亂代。"],
      ["24-34", "第 n 項示範", "示範一題與學生端不同的例題，再讓學生挑戰任務。"],
      ["34-41", "負公差提醒", "用下降數列提醒負號不能漏，請學生互查學習單。"],
      ["41-45", "冷卻整理", "請學生圈出自己最常漏掉的資訊：a1、d、n 或負號。"]
    ],
    demoQuestion: "已知等差數列首項為 6，公差為 4，求第 8 項。",
    demoSteps: [
      "先找三個資訊：a1=6，d=4，n=8。",
      "套用公式 an=a1+(n-1)d。",
      "a8=6+(8-1)×4。",
      "a8=6+28=34，所以第 8 項是 34。"
    ],
    observe: [
      "學生是否把第 n 項的 n 誤認為答案。",
      "學生是否能先寫 a1、d、n，再代入公式。",
      "遇到負公差時，學生是否能保留負號並正確計算。"
    ],
    studentTask: "學生端主要完成第 7 到第 10 題：公差追蹤、第 n 項定位、負公差、第 4 項與第 7 項反推首項。",
    checklist: [
      "第 7 題若錯很多，先補「後項減前項」。",
      "第 8 題若卡住，多半是公式欄位沒有整理清楚。",
      "第 9 題若錯很多，下一次要加強負數乘法。",
      "第 10 題屬挑戰題，允許學生先用提示或向老師提問。"
    ]
  },
  {
    id: "lesson-4",
    tag: "第 4 節",
    title: "插入項與等差應用",
    subtitle: "p.11-p.12｜等差中項、插入數、火柴與生活情境",
    goals: [
      "能把插入數問題轉成完整的等差數列項數。",
      "能從生活情境找出首項、公差與目標項。",
      "能判斷應用題是在求第幾項，或是在找超過目標的最小項數。"
    ],
    timeline: [
      ["0-5", "回顧公式", "用一題口頭快問複習 an=a1+(n-1)d。"],
      ["5-17", "插入項畫格", "示範把兩端數字與插入數畫成完整格子。"],
      ["17-28", "火柴情境", "用前 3 項找規則，讓學生看到每次多 3 根。"],
      ["28-38", "馬拉松試煉", "說明超過目標不是等於目標，適合用選項試算。"],
      ["38-43", "小組互查", "2 到 3 人互看學習單，確認是否有圈出關鍵數字。"],
      ["43-45", "冷卻整理", "請學生寫下今天最能理解的一種題型。"]
    ],
    demoQuestion: "在 2 與 22 之間插入 4 個數，使其成等差數列，求插入的第 2 個數。",
    demoSteps: [
      "插入 4 個數後，連同 2 和 22 共有 6 項。",
      "第 1 項是 2，第 6 項是 22，所以相差 5 個公差。",
      "5d=22-2=20，因此 d=4。",
      "插入的第 2 個數是整個數列第 3 項：2+2×4=10。"
    ],
    observe: [
      "學生是否知道插入 4 個數後，總項數要加上左右兩端。",
      "學生是否能把生活題拆成 a1、d、n。",
      "遇到「超過」時，學生是否能找第一個大於目標的答案。"
    ],
    studentTask: "學生端主要完成第 11 到第 13 題：插入數、火柴正方形、馬拉松超過目標。",
    checklist: [
      "第 11 題若卡住，請學生先畫格子，不急著套公式。",
      "第 12 題若錯很多，補強「每多一個正方形多幾根」。",
      "第 13 題是 Boss 題，重點是讀懂「超過」並試算選項。",
      "課後可看戰情室，決定下一節先補插入項或應用題閱讀。"
    ]
  }
];

const config = window.SEQUENCE_HUNTER_CONFIG || {};
const aiTutorUrl = config.aiTutorUrl || "https://gemini.google.com/gem/1nUhsjmK36eLZgPn-TbuiQVr8F9llzog8?usp=sharing";
let activeLesson = lessons[0];

const lessonTabs = document.querySelector("#lessonTabs");
const lessonTag = document.querySelector("#lessonTag");
const lessonTitle = document.querySelector("#lessonTitle");
const goals = document.querySelector("#goals");
const flowPanel = document.querySelector("#flowPanel");
const flowSummary = document.querySelector("#flowSummary");
const flowToggle = document.querySelector("#flowToggle");
const timeline = document.querySelector("#timeline");
const demoQuestion = document.querySelector("#demoQuestion");
const demoSteps = document.querySelector("#demoSteps");
const observe = document.querySelector("#observe");
const studentTask = document.querySelector("#studentTask");
const checklist = document.querySelector("#checklist");
const studentUrl = document.querySelector("#studentUrl");
const qrImage = document.querySelector("#qrImage");
const aiTutorQrImage = document.querySelector("#aiTutorQrImage");
const aiTutorTeacherLink = document.querySelector("#aiTutorTeacherLink");
const launchButton = document.querySelector("#launchButton");
const copyButton = document.querySelector("#copyButton");
const whiteboard = document.querySelector("#whiteboard");
const clearBoardButton = document.querySelector("#clearBoardButton");
const brushSize = document.querySelector("#brushSize");
const eraserSize = document.querySelector("#eraserSize");
const toolButtons = document.querySelectorAll(".tool");
let isFlowOpen = false;
let whiteboardContext = null;
let isDrawing = false;
let boardTool = "pen";
let boardColor = "#111827";
let boardSize = Number(brushSize.value);
let boardEraserSize = Number(eraserSize.value);
let lastPoint = null;

function getStudentUrl() {
  const path = window.location.pathname;
  const base = path.includes("/03_%E6%95%99%E5%B8%AB%E6%95%99%E5%AD%B8%E7%AB%AF/")
    ? "../student/"
    : "./student/";
  return new URL(base, window.location.href).href;
}

function renderList(target, items) {
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderTimeline(items) {
  timeline.innerHTML = items.map(([time, title, note]) => `
    <div class="time-row">
      <strong>${time} 分</strong>
      <div>
        <span>${title}</span>
        <small>${note}</small>
      </div>
    </div>
  `).join("");
}

function updateFlowPanel() {
  flowPanel.classList.toggle("collapsed", !isFlowOpen);
  flowToggle.textContent = isFlowOpen ? "收合" : "展開";
  flowToggle.setAttribute("aria-expanded", String(isFlowOpen));
}

function renderTabs() {
  lessonTabs.innerHTML = lessons.map((lesson) => `
    <button class="lesson-tab ${lesson.id === activeLesson.id ? "active" : ""}" type="button" data-lesson="${lesson.id}">
      <span>${lesson.tag}｜${lesson.title}</span>
      <small>${lesson.subtitle}</small>
    </button>
  `).join("");

  lessonTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeLesson = lessons.find((lesson) => lesson.id === button.dataset.lesson) || lessons[0];
      render();
    });
  });
}

function render() {
  const url = getStudentUrl();
  lessonTag.textContent = activeLesson.tag;
  lessonTitle.textContent = activeLesson.title;
  renderList(goals, activeLesson.goals);
  flowSummary.textContent = `${activeLesson.timeline.length} 個段落；需要看老師流程時再展開。`;
  renderTimeline(activeLesson.timeline);
  updateFlowPanel();
  demoQuestion.textContent = activeLesson.demoQuestion;
  demoSteps.innerHTML = activeLesson.demoSteps.map((step, index) => `<div>${index + 1}. ${step}</div>`).join("");
  renderList(observe, activeLesson.observe);
  studentTask.textContent = activeLesson.studentTask;
  renderList(checklist, activeLesson.checklist);
  studentUrl.textContent = url;
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;
  aiTutorQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(aiTutorUrl)}`;
  aiTutorTeacherLink.href = aiTutorUrl;
  renderTabs();
  requestAnimationFrame(() => resizeWhiteboard(true));
}

launchButton.addEventListener("click", () => {
  window.open(getStudentUrl(), "_blank", "noopener,noreferrer");
});

flowToggle.addEventListener("click", () => {
  isFlowOpen = !isFlowOpen;
  updateFlowPanel();
});

function resizeWhiteboard(shouldClear = false) {
  const rect = whiteboard.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const snapshot = !shouldClear && whiteboard.width ? whiteboard.toDataURL() : null;

  whiteboard.width = Math.floor(width * ratio);
  whiteboard.height = Math.floor(height * ratio);
  whiteboard.style.width = `${width}px`;
  whiteboard.style.height = `${height}px`;

  whiteboardContext = whiteboard.getContext("2d");
  whiteboardContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  whiteboardContext.lineCap = "round";
  whiteboardContext.lineJoin = "round";

  if (snapshot) {
    const image = new Image();
    image.onload = () => whiteboardContext.drawImage(image, 0, 0, width, height);
    image.src = snapshot;
  } else {
    clearWhiteboard();
  }
}

function clearWhiteboard() {
  if (!whiteboardContext) return;
  const rect = whiteboard.getBoundingClientRect();
  whiteboardContext.clearRect(0, 0, rect.width, rect.height);
}

function getBoardPoint(event) {
  const rect = whiteboard.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function drawLine(point) {
  if (!whiteboardContext || !lastPoint) return;
  whiteboardContext.globalCompositeOperation = boardTool === "eraser" ? "destination-out" : "source-over";
  whiteboardContext.strokeStyle = boardColor;
  whiteboardContext.lineWidth = boardTool === "eraser" ? boardEraserSize : boardSize;
  whiteboardContext.beginPath();
  whiteboardContext.moveTo(lastPoint.x, lastPoint.y);
  whiteboardContext.lineTo(point.x, point.y);
  whiteboardContext.stroke();
  lastPoint = point;
}

function beginDrawing(event) {
  event.preventDefault();
  isDrawing = true;
  whiteboard.setPointerCapture(event.pointerId);
  lastPoint = getBoardPoint(event);
}

function continueDrawing(event) {
  if (!isDrawing) return;
  event.preventDefault();
  drawLine(getBoardPoint(event));
}

function endDrawing(event) {
  if (!isDrawing) return;
  isDrawing = false;
  lastPoint = null;
  if (whiteboard.hasPointerCapture(event.pointerId)) {
    whiteboard.releasePointerCapture(event.pointerId);
  }
}

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    boardTool = button.dataset.tool || "pen";
    if (button.dataset.color) boardColor = button.dataset.color;
    toolButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

brushSize.addEventListener("input", () => {
  boardSize = Number(brushSize.value);
});

eraserSize.addEventListener("input", () => {
  boardEraserSize = Number(eraserSize.value);
});

clearBoardButton.addEventListener("click", clearWhiteboard);
whiteboard.addEventListener("pointerdown", beginDrawing);
whiteboard.addEventListener("pointermove", continueDrawing);
whiteboard.addEventListener("pointerup", endDrawing);
whiteboard.addEventListener("pointercancel", endDrawing);
whiteboard.addEventListener("pointerleave", endDrawing);
window.addEventListener("resize", () => resizeWhiteboard(false));

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(getStudentUrl());
    copyButton.textContent = "已複製";
    window.setTimeout(() => {
      copyButton.textContent = "複製連結";
    }, 1400);
  } catch (error) {
    window.prompt("請複製學生端連結：", getStudentUrl());
  }
});

render();
