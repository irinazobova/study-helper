//сортировка списка задач по статусу (выполненные - внизу листа), дедлайну (более близкие - выше), названию предмета (по алфавиту)
function SortRange() {
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active.getSheetName() === "Задачи") {
  var range = active.getActiveRange();
  var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection();
  var currentCell = selection.getCurrentCell();

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Задачи");
  spreadsheet.getRange('B2:E500').activate()
  .sort([{column: 2, ascending: true}, {column: 5, ascending: true}, {column: 3, ascending: true}]);
  
  spreadsheet.setActiveRange(range);
  spreadsheet.setCurrentCell(currentCell);
  }
  else if (active.getSheetName() === "Расписание") {}
};

//в расписании студента создаются строки для четных и нечетных недель, в зависимости от недели скрываются нужные строки. требует ручного внимательного создания расписания
function AutoHide() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Расписание");
  var range = sheet.getRange("C2");
  var value = range.getValue();
  
  if (value === "нечетная" ) {
    sheet.showRows(21);
    sheet.hideRows(18);
    sheet.hideRows(22);
  }
  else if (value === "четная" ) {
    sheet.hideRows(21);
    sheet.showRows(18);
    sheet.showRows(22);
  }
};

// еженедельное обновление счетчика недель. требует единоразовой настройки на "1" в начале семестра
function WeekCounter() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Расписание");
    var range = sheet.getRange("B2").getValue();
    var i = range + 1;
    sheet.getRange("B2").setValue(i);
};

// раскраска предметов по цветам, палитра подбирается вручную. требует единоразовой правки в названиях предметов в начале семестра
function AutoColor() {
  Utilities.sleep(1000);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Задачи");
  var range = spreadsheet.getRange(2,3,500);
  var value = range.getValues();
  for (i = 2; i <= 500; i++) {
    var range1 = spreadsheet.getRange(i,3);
    var range2 = spreadsheet.getRange(i,5);
  if (value[i-2][0] == 'Английский'){
    range1.setBackground('#F5B7B3');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Кванты'){
    range1.setBackground('#FF6633');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Т/д и статы'){
    range1.setBackground('#00ccff');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'КЭД'){
    range1.setBackground('#99CCFF');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Матстат'){
    range1.setBackground('#6666cc');
    range2.setBackground('#FFFFFF');
  }
    else if (value[i-2][0] == 'Ядэл'){
    range1.setBackground('#99CC99');
    range2.setBackground('#FFFFFF');
  }
    else if (value[i-2][0] == 'Гелиофиз'){
    range1.setBackground('#99FFCC');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Обрез'){
    range1.setBackground('#FFFF70');
    range2.setBackground('#FFFFFF');
  }
    else if (value[i-2][0] == 'Спецпрак'){
    range1.setBackground('#FFCC66');
    range2.setBackground('#FFFFFF');
  }
    else if (value[i-2][0] == 'Другое'){
    range1.setBackground('#b7b7b7');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'ВШБ'){
    range1.setBackground('#cc99cc');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Встречи'){
    range1.setBackground('#FF3333');
    range2.setBackground('#F5B7B3');
  }
  else {
    range1.setBackground('#FFFFFF');
    range2.setBackground('#FFFFFF');
    }
  }
};

// крайний правый столбец, начиная с первой строки, содержит формулу, показывающую день недели дедлайна. функция автоматически при изменениях копирует формулу на весь столбец
function AutoFill() {
  var spreadsheet = SpreadsheetApp.getActive();
  var range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection();
  spreadsheet.getRange('F2').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getRange('F2').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  spreadsheet.getRange('B2:E500').activate();
  spreadsheet.setActiveRange(range);
  spreadsheet.setCurrentCell(currentCell);
};
