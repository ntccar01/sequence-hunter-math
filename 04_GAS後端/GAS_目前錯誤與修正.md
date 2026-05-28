# GAS 目前錯誤與修正

## 目前測到的錯誤

開啟 Web App URL 時，目前回傳：

```text
找不到以下指令碼函式：doGet
```

這代表目前部署出去的 Apps Script 版本，不是本資料夾提供的 `Code.gs`，或修改後沒有重新部署成新版本。

## 修正方式

1. 打開 Google Sheet。
2. 進入 `擴充功能 → Apps Script`。
3. 刪除編輯器裡原本的內容。
4. 將本資料夾的 `Code.gs` 全部內容貼上。
5. 確認第一行附近是：

```javascript
const SPREADSHEET_ID = '1Q5WsqaHU9xywe9nLWnDNeK-k7-x6YxTRnDLO3lsCgeI';
```

6. 按儲存。
7. 到 `部署 → 管理部署作業`。
8. 點鉛筆編輯。
9. 版本選擇 `新增版本`。
10. 按部署。

完成後，原本的 Web App URL 通常可以沿用。

## 測試方式

更新部署後，開啟：

```text
https://script.google.com/macros/s/AKfycbwd3M9TVt_QlSOH2FJs200XaQQO4BpXfqF4ZOy2fNYOsYMDXv_1-cn7Jly6VikP_6klGg/exec?action=dashboard
```

如果成功，畫面會看到 JSON 文字，而不是錯誤頁。

