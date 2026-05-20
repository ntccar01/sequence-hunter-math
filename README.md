# 數列獵人｜互動式教學網頁

本資料夾可發布到 GitHub Pages。

## 入口

- `index.html`：總入口
- `student/`：學生端短路徑
- `dashboard/`：教師戰情室短路徑
- `01_學生端/`：學生端原始頁面
- `02_教師戰情室/`：教師戰情室原始頁面

## 資料串接

`config.js` 內設定 Google Apps Script Web App URL。

目前學生端提交任務會寫入 Google Sheet，教師戰情室會讀取 Google Sheet 資料。

