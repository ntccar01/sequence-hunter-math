const SPREADSHEET_ID = '1Q5WsqaHU9xywe9nLWnDNeK-k7-x6YxTRnDLO3lsCgeI';

const SHEETS = {
  questions: 'Questions',
  students: 'Students',
  answers: 'Answers',
  settings: 'Settings',
  backup: 'Backup'
};

function doGet(e) {
  const action = e.parameter.action || 'dashboard';
  let data;
  if (action === 'questions') data = getQuestions();
  else if (action === 'students') data = getStudents();
  else if (action === 'studentProgress') data = getStudentProgress(e.parameter.studentId || '');
  else if (action === 'dashboard') data = getDashboard();
  else data = { ok: false, error: 'Unknown action' };

  if (e.parameter.callback) {
    return jsonpResponse(e.parameter.callback, data);
  }
  return jsonResponse(data);
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  const action = body.action;
  if (action === 'saveAnswer') return jsonResponse(saveAnswer(body.payload));
  if (action === 'backupAndClear') return jsonResponse(backupAndClear());
  return jsonResponse({ ok: false, error: 'Unknown action' });
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheetValues(sheetName) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).filter(row => row.some(cell => cell !== '')).map(row => {
    const item = {};
    headers.forEach((header, index) => item[header] = row[index]);
    return item;
  });
}

function getQuestions() {
  return {
    ok: true,
    questions: getSheetValues(SHEETS.questions)
  };
}

function getStudents() {
  return {
    ok: true,
    students: getSheetValues(SHEETS.students).filter(student => String(student.isActive).toUpperCase() !== 'FALSE')
  };
}

function getStudentProgress(studentId) {
  const targetStudentId = String(studentId || '').trim();
  if (!targetStudentId) {
    return { ok: false, error: 'Missing studentId' };
  }

  const answers = getSheetValues(SHEETS.answers)
    .filter(answer => String(answer.studentId || '').trim() === targetStudentId);

  return {
    ok: true,
    studentId: targetStudentId,
    answers
  };
}

function saveAnswer(payload) {
  const sheet = getSpreadsheet().getSheetByName(SHEETS.answers);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const record = {
    timestamp: new Date(),
    sessionId: payload.sessionId || '',
    studentId: payload.studentId || '',
    groupId: payload.groupId || '',
    levelId: payload.levelId || '',
    unitName: payload.unitName || '',
    questionType: payload.questionType || '',
    answerSubmitted: payload.answerSubmitted || '',
    isCorrect: payload.isCorrect === true,
    attemptNumber: payload.attemptNumber || 1,
    hintUsed: payload.hintUsed === true,
    hintLevel: payload.hintLevel || 0,
    expEarned: payload.expEarned || 0,
    badgeEarned: payload.badgeEarned || '',
    timeSpentSec: payload.timeSpentSec || '',
    deviceNote: payload.deviceNote || ''
  };
  sheet.appendRow(headers.map(header => record[header] ?? ''));
  return { ok: true };
}

function getDashboard() {
  const questions = getSheetValues(SHEETS.questions);
  const students = getSheetValues(SHEETS.students).filter(student => String(student.isActive).toUpperCase() !== 'FALSE');
  const answers = getSheetValues(SHEETS.answers);
  return {
    ok: true,
    questions,
    students,
    answers
  };
}

function backupAndClear() {
  const ss = getSpreadsheet();
  const answersSheet = ss.getSheetByName(SHEETS.answers);
  const backupSheet = ss.getSheetByName(SHEETS.backup);
  const values = answersSheet.getDataRange().getValues();
  if (values.length <= 1) return { ok: true, message: 'No answers to backup' };

  const backupId = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const backupRows = values.slice(1).map(row => [new Date(), backupId, SHEETS.answers, ...row]);
  backupSheet.getRange(backupSheet.getLastRow() + 1, 1, backupRows.length, backupRows[0].length).setValues(backupRows);
  answersSheet.getRange(2, 1, answersSheet.getLastRow() - 1, answersSheet.getLastColumn()).clearContent();
  return { ok: true, backupId };
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonpResponse(callback, data) {
  const safeCallback = String(callback).replace(/[^\w$.]/g, '');
  return ContentService
    .createTextOutput(`${safeCallback}(${JSON.stringify(data)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
