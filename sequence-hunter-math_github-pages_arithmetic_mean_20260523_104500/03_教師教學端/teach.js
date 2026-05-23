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
    guideIntro: "這一節先讓學生知道「數列不是隨便一堆數字」，而是一串有順序、可觀察規則的數。",
    guideBlocks: [
      {
        title: "先看生活順序",
        example: "座號 1,2,3,4...",
        talk: "請學生說出生活中有順序的例子，例如座號、日期、樓層、排隊號碼。",
        feature: true
      },
      {
        title: "什麼是數列",
        example: "2, 4, 6, 8",
        talk: "數列是一串依序排列的數。重點不是數字很難，而是有順序。"
      },
      {
        title: "每一個數叫一項",
        example: "第 1 項、第 2 項",
        talk: "先讓學生用手指指出第一項、第二項，建立項的位置感。"
      },
      {
        title: "前 5 項的意思",
        example: "n=1,2,3,4,5",
        talk: "前 5 項不是任選 5 個數，而是從第 1 項開始依序算到第 5 項。"
      },
      {
        title: "n 代表位置",
        example: "n=3 是第 3 項",
        talk: "提醒學生 n 不是答案，是告訴我們要算第幾項。"
      },
      {
        title: "一般項是規則",
        example: "2n+1",
        talk: "一般項像一台機器，把 n 放進去，就會吐出那一項的數字。"
      },
      {
        title: "代入一格一格算",
        example: "n=1 → 2×1+1",
        talk: "建議學生在學習單畫 5 格，分別寫 n=1 到 n=5。"
      },
      {
        title: "再進示範題",
        example: "先寫 n，再算值",
        talk: "學生知道 n 是位置後，再進到下方老師示範題。"
      }
    ],
    timeline: [
      ["0-5", "開場與登入", "請學生選獵人身份，說明今天先用網頁、課本與學習單一起學。"],
      ["5-12", "生活中的順序", "請學生說或寫一個生活中有順序的例子，先建立數列感。"],
      ["12-20", "數列與項", "說明數列是一串依序排列的數，每一個數叫一項。"],
      ["20-30", "n 與前 5 項", "用 5 格學習單說明 n=1 到 n=5，n 是位置不是答案。"],
      ["30-38", "老師示範", "示範一般項 n+3 如何代入前 5 項，再投放學生端任務。"],
      ["38-40", "小組互助", "2 到 3 人討論卡住處，老師只給方向。"],
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
    guideIntro: "這一節的重點是把「數列」和「級數」分清楚，再慢慢看懂下限、上限與逐項展開。",
    guideBlocks: [
      {
        title: "先複習數列",
        example: "1, 2, 3, 4, 5",
        talk: "數列像排隊，把數字依序列出來，先不一定要加起來。",
        feature: true
      },
      {
        title: "級數是相加",
        example: "1+2+3+4+5",
        talk: "級數是把數列中的項加起來。看到級數，要先想到加號。"
      },
      {
        title: "下限是起點",
        example: "k=1",
        talk: "下限告訴我們從哪一個 k 開始代入。"
      },
      {
        title: "上限是終點",
        example: "到 5",
        talk: "上限告訴我們代入到哪裡停止，不要多算也不要少算。"
      },
      {
        title: "k 只是代號",
        example: "k、i、j 都可以",
        talk: "學生常以為換字母就不會，其實它們都只是拿來代入的符號。"
      },
      {
        title: "逐項展開",
        example: "k=1,2,3,4,5",
        talk: "先列出每一次要代入的值，再把每一項算出來。"
      },
      {
        title: "用加號連接",
        example: "1+2+3+4+5",
        talk: "級數展開後，要用加號連接，不是只寫一串逗號。"
      },
      {
        title: "再進示範題",
        example: "先圈上下限",
        talk: "請學生先圈出起點和終點，再看下方示範題。"
      }
    ],
    timeline: [
      ["0-5", "登入與回顧", "回顧第 1 節的前 5 項，提醒學生先寫紙本。"],
      ["5-13", "數列與級數", "用 1,2,3,4,5 和 1+2+3+4+5 對照，建立差異。"],
      ["13-21", "上下限", "說明下限是起點、上限是終點，請學生先圈出範圍。"],
      ["21-30", "逐項展開", "把 k=1 到 5 逐項寫出，再用加號連接。"],
      ["30-38", "老師示範", "示範 j=2 到 5 的 2j，再投放學生端任務。"],
      ["38-43", "小組互助", "讓學生互查漏項、漏加號、漏加 1。"],
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
    guideIntro: "這一節先不要急著套公式，先讓學生看懂「前項、後項、公差」如何從同一串數列中出現。",
    guideBlocks: [
      {
        title: "先看一串數列",
        example: "5, 7, 9, 11, 13",
        talk: "請學生先說：這串數有沒有順序？每次好像怎麼變化？",
        feature: true
      },
      {
        title: "前項與後項",
        example: "5 → 7",
        talk: "5 是前項，7 是後項。下一組可以看 7 → 9。"
      },
      {
        title: "公差 d",
        example: "後項 - 前項",
        talk: "公差就是相鄰兩項固定相差多少，要用後項減前項。"
      },
      {
        title: "一起算一次",
        example: "7-5=2，9-7=2",
        talk: "每次都差 2，所以這串數列的公差 d=2。"
      },
      {
        title: "首項 a1",
        example: "a1=5",
        talk: "首項就是第一項。這個符號先理解成「第一個數」。"
      },
      {
        title: "第 n 項 an",
        example: "a8 代表第 8 項",
        talk: "n 不是答案，它是在問第幾項。先把 n 找出來，再代公式。"
      },
      {
        title: "公式怎麼來",
        example: "an=a1+(n-1)d",
        talk: "從第 1 項走到第 n 項，中間一共走 n-1 步，每一步都加公差。"
      },
      {
        title: "再進示範題",
        example: "a1、d、n 先圈出",
        talk: "學生能說出三個資訊後，再進到下方老師示範題。"
      }
    ],
    timeline: [
      ["0-5", "登入與暖身", "請學生選獵人身份，口頭複習：數列是一串依序排列的數。"],
      ["5-13", "前項與後項", "投影 5,7,9,11,13，先只問 5 到 7、7 到 9 是怎麼變化。"],
      ["13-20", "建立公差", "用後項減前項算 7-5、9-7、11-9，整理出公差 d=2。"],
      ["20-27", "首項與第 n 項", "說明 a1 是第一項，an 是第 n 項，n 代表位置不是答案。"],
      ["27-35", "公式示範", "把 a1、d、n 放入三格表，再示範 an=a1+(n-1)d。"],
      ["35-41", "學生任務", "投放學生端第 7 到第 10 題，提醒先在學習單圈 a1、d、n。"],
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
    guideIntro: "這一節先把應用題拆小：看懂題目情境、畫格子、找首項、公差與目標，再決定用公式或試算。",
    guideBlocks: [
      {
        title: "先不要急著算",
        example: "圈關鍵字",
        talk: "應用題第一步先圈數字和關鍵字，例如插入、每多、超過。",
        feature: true
      },
      {
        title: "插入數要畫格",
        example: "2, _, _, _, _, 22",
        talk: "插入 4 個數時，兩端也要算進總項數，所以一共有 6 項。"
      },
      {
        title: "兩端相差幾步",
        example: "第 1 項到第 6 項",
        talk: "第 1 項到第 6 項，中間走了 5 步，也就是 5 個公差。"
      },
      {
        title: "生活題找前三項",
        example: "4, 7, 10",
        talk: "火柴題先列出前 3 項，比直接套公式更容易看出規則。"
      },
      {
        title: "找首項 a1",
        example: "第一個情況",
        talk: "生活題的首項通常是第一週、第一個圖形、第一次紀錄。"
      },
      {
        title: "找公差 d",
        example: "每次多 3",
        talk: "題目說每次多、每週增加、每層增加，通常就是公差線索。"
      },
      {
        title: "注意超過",
        example: "> 42.195",
        talk: "超過不是等於，Boss 題可以用選項試算，找第一個大於目標的。"
      },
      {
        title: "再進示範題",
        example: "先畫圖或畫格",
        talk: "學生能把情境畫出來後，再看下方插入項示範。"
      }
    ],
    timeline: [
      ["0-5", "回顧公式", "用一題口頭快問複習 an=a1+(n-1)d，提醒先找 a1、d、n。"],
      ["5-14", "應用題讀題", "先圈插入、每多、超過等關鍵字，不急著計算。"],
      ["14-25", "插入項畫格", "示範把兩端數字與插入數畫成完整格子，再求公差。"],
      ["25-34", "生活情境", "用火柴前三項找規則，讓學生看到每次多 3 根。"],
      ["34-40", "超過目標", "說明超過不是等於，馬拉松題可用選項試算。"],
      ["40-43", "小組互查", "2 到 3 人互看學習單，確認是否有圈出關鍵數字。"],
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
  },
  {
    id: "lesson-3-1-sigma-1",
    tag: "第 5 節",
    title: "級數與 Σ 符號",
    subtitle: "3-1 後段｜級數、有限級數、無窮級數、逐項展開",
    goals: [
      "能說出級數是把數列各項用加號連接起來。",
      "能辨認 Σ、下限、上限與一般項。",
      "能將簡單的 Σ 式逐項展開。",
      "能分辨有限級數與無窮級數。"
    ],
    guideIntro: "這一節先讓學生看懂符號在叫他做什麼，不急著算總和。重點是讀懂 Σ、上下限與代入順序。",
    guideBlocks: [
      {
        title: "數列變級數",
        example: "1,2,3,4,5 → 1+2+3+4+5",
        talk: "先用學生熟悉的數列開始，提醒：數列是排出來，級數是把它們加起來。",
        feature: true
      },
      {
        title: "Σ 是總和",
        example: "Σ 讀作 sigma",
        talk: "告訴學生看到 Σ 先不要怕，它只是比較短的寫法，意思是把指定範圍的項目加起來。"
      },
      {
        title: "下限是起點",
        example: "k=1",
        talk: "下方的 k=1 表示從 1 開始代入，先請學生把起點圈起來。"
      },
      {
        title: "上限是終點",
        example: "5",
        talk: "上方的 5 表示代到 5 為止，所以 k 會跑 1,2,3,4,5。"
      },
      {
        title: "一般項是代入規則",
        example: "3i+1",
        talk: "中間的式子才是每次要代入的規則，例如 i=1 時先算 3×1+1。"
      },
      {
        title: "有限與無窮",
        example: "5 vs ∞",
        talk: "有明確上限的是有限級數；上限是 ∞ 時，代表有無窮多項。"
      },
      {
        title: "常數也可以加",
        example: "Σ3 = 3+3+3+...",
        talk: "若中間只有 3，代表每一項都是 3，和變數 n 沒有關係。"
      }
    ],
    timeline: [
      ["0-5", "登入與回顧", "回顧數列是一串依序排列的數，請學生說出今天要把它們加起來。"],
      ["5-12", "數列變級數", "用 1,2,3,4,5 對照 1+2+3+4+5，建立級數感。"],
      ["12-20", "認識 Σ", "說明 Σ 讀作 sigma，是總和的簡寫，讓學生圈出 Σ。"],
      ["20-28", "上下限與代入", "用 k=1 到 5 示範：先列 k=1,2,3,4,5，再逐項代入。"],
      ["28-36", "逐項展開示範", "示範 Σ(2j+1)，j=1 到 4，讓學生在學習單畫格代入。"],
      ["36-42", "投放學生任務", "學生完成 Σ 符號章節前 6 題：讀符號、上下限、逐項展開、無窮概念。"],
      ["42-45", "冷卻整理", "請學生寫一句：Σ 的意思是從下限到上限逐項代入後相加。"]
    ],
    demoQuestion: "請將 Σ(2j+1)，j=1 到 4，逐項展開。",
    demoSteps: [
      "先看下限 j=1，上限是 4。",
      "所以 j 依序代入 1,2,3,4。",
      "j=1 時，2×1+1=3。",
      "j=2 時，2×2+1=5；j=3 時是 7；j=4 時是 9。",
      "所以展開為 3+5+7+9。"
    ],
    observe: [
      "學生是否把 Σ 誤認為乘法。",
      "學生是否只代入上下限，漏掉中間整數。",
      "學生是否知道常數級數是同一個數重複相加。",
      "學生是否能先在學習單列代入表再送答案。"
    ],
    studentTask: "學生端完成「Σ 符號」章節：Sigma 入門、上下限偵查、逐項展開、代入展開、常數級數、無窮符號。",
    checklist: [
      "若第 3、4 題錯很多，下一節先補畫格代入。",
      "若常數級數錯很多，提醒：式子裡沒有變數時，每一項都相同。",
      "戰情室確認學生是否完成 Σ 符號章節至少 4 題。"
    ]
  },
  {
    id: "lesson-3-1-sigma-2",
    tag: "第 6 節",
    title: "Σ 的運算性質",
    subtitle: "3-1 後段｜拆開、提出常數、常數級數與例題代入",
    goals: [
      "能把 Σ(a_k+b_k) 拆成兩個總和。",
      "能理解常數倍可以提出 Σ 外面。",
      "能處理 Σ1 或 Σc 這類常數級數。",
      "能依已知 Σa_k、Σb_k 代入求值。"
    ],
    guideIntro: "這一節把 Σ 當成整理工具。先用口語說成分堆，再寫公式，最後才代入數字。",
    guideBlocks: [
      {
        title: "先分成兩堆",
        example: "(a1+b1)+(a2+b2)+...",
        talk: "請學生想成把 a 的部分放一堆，b 的部分放一堆，所以加法可以拆開。",
        feature: true
      },
      {
        title: "加法可拆",
        example: "Σ(a_k+b_k)=Σa_k+Σb_k",
        talk: "先不要背公式，讓學生看到左邊每一項都有 a 和 b，拆開後仍然是總和。"
      },
      {
        title: "減法也可拆",
        example: "Σ(a_k-b_k)=Σa_k-Σb_k",
        talk: "減法同樣可以拆，但符號要保留，提醒學生不要把減號弄丟。"
      },
      {
        title: "常數倍可提出",
        example: "Σ3a_k=3Σa_k",
        talk: "每一項都有 3 倍，等於最後總和也乘 3。"
      },
      {
        title: "常數級數",
        example: "Σ1=10",
        talk: "如果 k=1 到 10，Σ1 就是 1 加 10 次，所以等於 10。"
      },
      {
        title: "先拆再代",
        example: "3Σa_k+Σb_k",
        talk: "例題的穩定流程是：先拆開，整理成已知資料，再代入數字。"
      }
    ],
    timeline: [
      ["0-5", "回顧 Σ 展開", "快速問學生：Σ 是什麼意思？上下限代表什麼？"],
      ["5-13", "分堆概念", "用 (a1+b1)+(a2+b2) 示範把 a 與 b 分成兩堆。"],
      ["13-22", "四個性質", "只講意義，不要求背熟；加、減、常數倍、常數級數各用一句話。"],
      ["22-32", "例題示範", "已知 Σa_k=15，Σb_k=23，示範 Σ(3a_k+b_k)。"],
      ["32-40", "學生任務", "學生完成 Σ 的運算章節 3 題，老師巡視是否漏掉 Σ1。"],
      ["40-45", "冷卻整理", "請學生在學習單寫：先拆開，再代入。"]
    ],
    demoQuestion: "已知 Σa_k=12，Σb_k=8，求 Σ(2a_k+b_k) 的值。",
    demoSteps: [
      "先把 Σ(2a_k+b_k) 拆成 Σ2a_k+Σb_k。",
      "常數 2 可以提出來，變成 2Σa_k+Σb_k。",
      "代入 Σa_k=12，Σb_k=8。",
      "2×12+8=24+8=32。",
      "所以答案是 32。"
    ],
    observe: [
      "學生是否把 Σ(3a_k+b_k) 直接寫成 3a_k+b_k。",
      "學生是否忘記把 3 提出後還要乘上 Σa_k 的值。",
      "學生是否漏掉 Σ1 的項數。",
      "學生是否能照學習單的拆解欄位完成。"
    ],
    studentTask: "學生端完成「Σ 的運算」章節：拆開性質、性質代入、常數補給。",
    checklist: [
      "若第 1 題錯很多，表示性質文字仍不懂，需回到分堆示範。",
      "若第 3 題錯很多，通常是漏掉 Σ1=10。",
      "戰情室確認學生是否能完成至少一題 Σ 性質代入題。"
    ]
  },
  {
    id: "lesson-3-1-arithmetic-mean",
    tag: "第 7 節",
    title: "等差中項",
    subtitle: "3-1｜前後平均、等差中項、反求未知數",
    goals: [
      "能說出等差中項是前後兩項的平均。",
      "能用 b=(a+c)/2 求兩數的等差中項。",
      "能判斷三個數是否成等差數列。",
      "能在簡單式子中由等差中項反求未知數。"
    ],
    guideIntro: "本節先用三格位置感建立等差中項：左邊、正中間、右邊。先讓學生看見中間項和前後兩項的距離一樣，再帶入平均公式。",
    guideBlocks: [
      {
        title: "先看三格",
        example: "a, b, c",
        talk: "請學生把三個數想成站在同一直線上的三個位置，b 站在 a 和 c 的正中間。",
        feature: true
      },
      {
        title: "什麼叫中項",
        example: "-12, ?, 28",
        talk: "中項不是隨便放在中間，而是要讓左邊到中間、中間到右邊的距離一樣。"
      },
      {
        title: "等差的條件",
        example: "b-a = c-b",
        talk: "如果三個數成等差數列，前後兩段公差會一樣。這是公式的來源。"
      },
      {
        title: "整理成平均",
        example: "2b = a+c",
        talk: "把 b-a=c-b 整理後會得到 2b=a+c，所以 b 是前後兩項加起來再除以 2。"
      },
      {
        title: "等差中項公式",
        example: "b=(a+c)/2",
        talk: "提醒學生：只要題目問兩數的等差中項，就是把前後兩數相加後除以 2。"
      },
      {
        title: "先圈前後兩數",
        example: "-12 與 28",
        talk: "低成就學生容易看錯資料，先在學習單圈出前後兩數，再寫公式。"
      },
      {
        title: "有未知數也一樣",
        example: "3x+1, 12, 4x-5",
        talk: "中項是 12 時，表示 12 等於前後兩項的平均。先列式，不急著心算。"
      },
      {
        title: "最後自己檢查",
        example: "左差 = 右差",
        talk: "算完後可以用公差檢查：中項減前項、後項減中項，兩個結果應該相同。"
      }
    ],
    timeline: [
      ["0-5", "回顧等差", "用 5,7,9 說明每次差一樣多，今天只看三個數的中間。"],
      ["5-12", "三格位置感", "在白板畫三格 a、b、c，讓學生說出 b 在正中間。"],
      ["12-20", "公式來源", "由 b-a=c-b 推到 2b=a+c，再得到 b=(a+c)/2。"],
      ["20-28", "老師示範", "示範求 -10 與 26 的等差中項，刻意不用學生端任務題。"],
      ["28-35", "反求未知數", "示範已知中項為 10，前後是 x+2 與 3x-6，先列平均式。"],
      ["35-42", "投放學生任務", "學生完成等差中項章節，先寫學習單再送答案。"],
      ["42-45", "冷卻整理", "請學生寫一句：等差中項就是前後兩項的平均。"]
    ],
    demoQuestion: "試求 -10 與 26 的等差中項；再說明為什麼它在正中間。",
    demoSteps: [
      "先圈出前後兩數：a=-10，c=26。",
      "使用等差中項公式：b=(a+c)/2。",
      "代入得到 b=(-10+26)/2。",
      "先算括號，再除以 2。",
      "最後用左差與右差檢查是否一樣。"
    ],
    observe: [
      "學生是否把等差中項誤解為任意中間位置。",
      "學生是否忘記除以 2，只把前後兩數相加。",
      "學生遇到負數時是否先算錯符號。",
      "學生做未知數題時是否能先列出平均式。"
    ],
    studentTask: "學生端完成「等差中項」章節：中項概念、平均公式、判斷等差、未知數反推。",
    checklist: [
      "戰情室確認等差中項任務是否完成。",
      "若錯題集中在負數相加，下節先補負數運算。",
      "若未知數題卡住，先要求學生只完成列式，不急著解完。"
    ]
  },
  {
    id: "lesson-3-2-1",
    tag: "第 1 節",
    title: "等比數列與公比",
    subtitle: "3-2 p.1-p.2｜倍數成長、公比、前 5 項、一般項",
    goals: [
      "能說出等比數列是相鄰兩項的比固定。",
      "能用後項除以前項求公比。",
      "能依首項與公比寫出前 5 項。",
      "能初步理解 an=a1×r^(n-1) 中各符號的意思。"
    ],
    guideIntro: "這一節先讓學生看懂「每次乘同一個數」的倍數成長，再建立公比，最後才導入等比數列的一般項公式。",
    guideBlocks: [
      {
        title: "生活中的倍數成長",
        example: "每次變成 2 倍",
        talk: "可以用遊戲道具升級、細胞倍增、存款成長導入，先讓學生感覺到「一直乘」。",
        feature: true
      },
      {
        title: "先看一串數列",
        example: "3, 6, 12, 24, 48",
        talk: "請學生先觀察：每一項到下一項好像怎麼變？不要急著寫公式。"
      },
      {
        title: "不是用減的",
        example: "6-3=3，12-6=6",
        talk: "提醒學生這串不是等差，因為相減的結果不一樣；等比要看倍數。"
      },
      {
        title: "前項與後項",
        example: "3 → 6",
        talk: "3 是前項，6 是後項。下一組可以看 6 → 12。"
      },
      {
        title: "公比 r",
        example: "後項 ÷ 前項",
        talk: "公比就是相鄰兩項固定的倍數，要用後項除以前項。"
      },
      {
        title: "一起算一次",
        example: "6÷3=2，12÷6=2",
        talk: "每次都除出 2，所以這串等比數列的公比 r=2。"
      },
      {
        title: "前 5 項怎麼寫",
        example: "3 → 6 → 12 → 24 → 48",
        talk: "從首項開始，每次乘公比，就可以一項一項寫出來。"
      },
      {
        title: "公式怎麼來",
        example: "an=a1×r^(n-1)",
        talk: "第 1 項不用乘，第 2 項乘 1 次，第 n 項一共乘 n-1 次。"
      }
    ],
    timeline: [
      ["0-5", "登入與回顧", "複習 3-1 的等差數列，提醒學生等差是每次加或減一樣多。"],
      ["5-13", "生活倍數導入", "用每次變成 2 倍建立等比感，不急著寫公式。"],
      ["13-22", "公比概念", "用 3,6,12,24,48 說明後項除以前項，固定得到 2。"],
      ["22-30", "前 5 項示範", "老師用白板示範首項 3、公比 2，逐項乘出前 5 項。"],
      ["30-36", "一般項公式", "說明第 1 項不用乘，第 2 項乘 1 次，第 n 項乘 n-1 次。"],
      ["36-42", "投放學生任務", "學生做 RPG 關卡：找公比、寫前 5 項、辨認公式中的 a1、r、n。"],
      ["42-45", "冷卻整理", "學生在學習單寫下：等差看差，等比看比。"]
    ],
    demoQuestion: "若等比數列首項為 3，公比為 2，請寫出前 5 項。",
    demoSteps: [
      "先找兩個資訊：首項 a1=3，公比 r=2。",
      "第 1 項是 3。",
      "第 2 項：3×2=6；第 3 項：6×2=12。",
      "繼續每次乘 2，前 5 項是 3,6,12,24,48。",
      "若寫成一般項，就是 an=3×2^(n-1)。"
    ],
    observe: [
      "學生是否仍用後項減前項找規則。",
      "學生是否知道公比要用除法。",
      "學生是否把 r 誤認為要加的數。",
      "學生是否能在學習單先列前 5 項再送答案。"
    ],
    studentTask: "學生端後續可設計 3-2 第 1 節任務：找公比、寫前 5 項、辨認公式中的 a1、r、n。",
    checklist: [
      "戰情室是否能看到學生完成找公比與前 5 項任務。",
      "錯題是否集中在用減法或不會除法。",
      "下節課是否需要先補：公比是倍數，不是差。"
    ]
  }
];

const config = window.SEQUENCE_HUNTER_CONFIG || {};
const aiTutorUrl = config.aiTutorUrl || "https://gemini.google.com/gem/1nUhsjmK36eLZgPn-TbuiQVr8F9llzog8?usp=sharing";
let activeLesson = lessons[0];

const lessonTabs = document.querySelector("#lessonTabs");
const lessonTag = document.querySelector("#lessonTag");
const lessonTitle = document.querySelector("#lessonTitle");
const guidePanel = document.querySelector("#guidePanel");
const guideIntro = document.querySelector("#guideIntro");
const guideBlocks = document.querySelector("#guideBlocks");
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

function renderGuide() {
  const blocks = activeLesson.guideBlocks || [];
  guidePanel.classList.toggle("empty", blocks.length === 0);
  if (!blocks.length) return;

  guideIntro.textContent = activeLesson.guideIntro || "先建立概念，再進入示範題。";
  guideBlocks.innerHTML = blocks.map((block) => `
    <section class="guide-card ${block.feature ? "feature" : ""}">
      <strong>${block.title}</strong>
      <span class="guide-example">${block.example}</span>
      <p>${block.talk}</p>
    </section>
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
  renderGuide();
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
