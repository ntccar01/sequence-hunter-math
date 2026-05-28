# Google Apps Script 部署說明

## 目前狀態

已提供第一版 `Code.gs` 後端範本，可支援：

- 讀取 `Questions`
- 讀取 `Students`
- 儲存學生作答到 `Answers`
- 回傳教師戰情室資料
- 備份並清空作答紀錄

## 老師需要操作

### 1. 取得 Google Sheet ID

Google Sheet 網址通常長這樣：

```text
https://docs.google.com/spreadsheets/d/這一段就是SheetID/edit
```

請複製 `/d/` 和 `/edit` 中間那一段。

### 2. 開啟 Apps Script

在 Google Sheet 中：

```text
擴充功能 → Apps Script
```

### 3. 貼上 Code.gs

把本資料夾中的 `Code.gs` 內容貼到 Apps Script。

### 4. 修改 SPREADSHEET_ID

將：

```javascript
const SPREADSHEET_ID = '請貼上你的 Google Sheet ID';
```

改成你的 Sheet ID。

### 5. 部署為網頁應用程式

建議設定：

```text
執行身分：我
誰可以存取：任何知道連結的人
```

部署後會得到一個 Web App URL。

## 下一步

部署完成後，請把 Web App URL 提供給我。我會把學生端和教師戰情室改成連接 GAS，而不是只使用本機測試資料。

## 更新既有部署

如果之後修改了 `Code.gs`，請在 Apps Script 中：

```text
部署 → 管理部署作業 → 編輯 → 版本選「新增版本」→ 部署
```

否則舊的 Web App URL 可能仍然跑舊版程式。
