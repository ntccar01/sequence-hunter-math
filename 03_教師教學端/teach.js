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
  }
];

let activeLesson = lessons[0];

const lessonTabs = document.querySelector("#lessonTabs");
const lessonTag = document.querySelector("#lessonTag");
const lessonTitle = document.querySelector("#lessonTitle");
const goals = document.querySelector("#goals");
const timeline = document.querySelector("#timeline");
const demoQuestion = document.querySelector("#demoQuestion");
const demoSteps = document.querySelector("#demoSteps");
const observe = document.querySelector("#observe");
const studentTask = document.querySelector("#studentTask");
const checklist = document.querySelector("#checklist");
const studentUrl = document.querySelector("#studentUrl");
const qrImage = document.querySelector("#qrImage");
const launchButton = document.querySelector("#launchButton");
const copyButton = document.querySelector("#copyButton");

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
  renderTimeline(activeLesson.timeline);
  demoQuestion.textContent = activeLesson.demoQuestion;
  demoSteps.innerHTML = activeLesson.demoSteps.map((step, index) => `<div>${index + 1}. ${step}</div>`).join("");
  renderList(observe, activeLesson.observe);
  studentTask.textContent = activeLesson.studentTask;
  renderList(checklist, activeLesson.checklist);
  studentUrl.textContent = url;
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;
  renderTabs();
}

launchButton.addEventListener("click", () => {
  window.open(getStudentUrl(), "_blank", "noopener,noreferrer");
});

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
