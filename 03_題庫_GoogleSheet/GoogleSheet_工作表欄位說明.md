# Google Sheet 工作表欄位說明

本專案第一版建議建立一份 Google Sheet，包含以下工作表：

1. `Questions`
2. `Students`
3. `Answers`
4. `Dashboard`
5. `Settings`
6. `Backup`

## Questions

題庫工作表。每一列是一題，學生端網頁會從這裡讀題目、選項、答案、提示與關卡資訊。

來源檔：

`Questions_3-1_p1-p12.tsv`

## Students

學生名單與小組設定。第一版先使用 `S01` 到 `S15`，預設 5 組、每組 3 人。

後續老師可以直接在 Google Sheet 修改：

- `groupId`：小組編號。
- `groupName`：小組名稱。
- `isActive`：是否啟用該學生。

只要同一組學生填相同 `groupId`，網頁就可視為同一組。因此未來可自由調整為 2 人一組、3 人一組，或不固定人數。

來源檔：

`Students_S01-S15_三人一組.tsv`

## Answers

學生作答紀錄。第一版可先只放欄位列，資料由網頁送出後新增。

來源檔：

`Answers_欄位.tsv`

## Dashboard

教師戰情室統計用。第一版可先放欄位列，之後由 GAS 或公式整理完成率、錯題、提示使用情況。

來源檔：

`Dashboard_欄位.tsv`

## Settings

課程與遊戲設定，例如每題 EXP、是否顯示排行榜、是否允許重複作答。

來源檔：

`Settings_第一版.tsv`

## Backup

備份用工作表。未來使用「備份並清空」功能時，可將 Answers 的資料複製到這裡。

來源檔：

`Backup_欄位.tsv`

