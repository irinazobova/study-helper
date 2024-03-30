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
  else if (value[i-2][0] == 'Философия'){
    range1.setBackground('#FF6633');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Т/д и статы'){
    range1.setBackground('#00ccff');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Плазма'){
    range1.setBackground('#99CCFF');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'Вычфизика'){
    range1.setBackground('#6666cc');
    range2.setBackground('#FFFFFF');
  }
    else if (value[i-2][0] == 'Приборы'){
    range1.setBackground('#99CC99');
    range2.setBackground('#FFFFFF');
  }
    else if (value[i-2][0] == 'Астрофиз'){
    range1.setBackground('#99FFCC');
    range2.setBackground('#FFFFFF');
  }
  else if (value[i-2][0] == 'ML'){
    range1.setBackground('#FFFF70');
    range2.setBackground('#FFFFFF');
  }
    else if (value[i-2][0] == 'Научка'){
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
  else if (value[i-2][0] == 'Работа'){
    range1.setBackground('#FF3333');
    range2.setBackground('#F5B7B3');
  }
  else {
    range1.setBackground('#FFFFFF');
    range2.setBackground('#FFFFFF');
    }
  }
};

// если дедлайн прошел, а задача еще не выполнена, дата дедлайна устанавливается на текущий день и задание выделяется жирным текстом
function SetDeadline() {
  Utilities.sleep(500);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Задачи");
  for (i = 2; i<= 10; i++) {
    var task = spreadsheet.getRange(i,4);
    var deadline = spreadsheet.getRange(i,5).getValue().toString();
    var deadline = Utilities.formatDate(new Date(deadline), "GMT+3", "dd.MM.yyyy").toString();
    var nowdate = Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy").toString();
    if (deadline <= nowdate){
	    spreadsheet.getRange(i,5).setValue(nowdate);
      spreadsheet.getRange(i,4).setFontWeight('bold');
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

// еженедельное обновление счетчика недель. требует единоразовой настройки на "1" в начале семестра
function WeekCounter() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Расписание");
    var range = sheet.getRange("B2").getValue();
    var i = range + 1;
    sheet.getRange("B2").setValue(i);
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
