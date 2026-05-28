# Google Sheet 貼上操作說明

## 一、建立 Google Sheet

請新增一份 Google Sheet，名稱建議：

```text
數學_3-1_數列獵人_題庫與學習紀錄
```

## 二、建立 6 個工作表

請在同一份 Google Sheet 內建立以下分頁，名稱要完全一致：

```text
Questions
Students
Answers
Dashboard
Settings
Backup
```

## 三、貼上資料

請依照下表，把對應的 TSV 檔內容貼到各工作表的 A1 儲存格。

| Google Sheet 分頁 | 貼上的檔案 |
|---|---|
| `Questions` | `Questions_3-1_p1-p12.tsv` |
| `Students` | `Students_S01-S15_三人一組.tsv` |
| `Answers` | `Answers_欄位.tsv` |
| `Dashboard` | `Dashboard_欄位.tsv` |
| `Settings` | `Settings_第一版.tsv` |
| `Backup` | `Backup_欄位.tsv` |

## 四、貼上方式

1. 開啟對應的 `.tsv` 檔。
2. 全選內容。
3. 複製。
4. 回到 Google Sheet 對應分頁。
5. 點選 A1。
6. 貼上。

TSV 是用定位點分欄，因此貼到 Google Sheet 後會自動分成多欄。

## 五、自由編組方式

目前 `Students` 預設為 5 組，每組 3 人。

若要改組，只要修改：

- `groupId`
- `groupName`

範例：

```text
S01  G01  第1組
S04  G01  第1組
S08  G01  第1組
```

代表 `S01`、`S04`、`S08` 都是同一組。

若某組只有 2 人或 4 人也可以，系統之後會依照相同 `groupId` 判定小組。

## 六、完成後

完成後，請回來告訴我：

```text
Google Sheet 已建立完成
```

如果你願意，也可以貼上 Google Sheet 連結或截圖欄位狀態，我再協助你檢查。

