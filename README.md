# study-helper
Персонализированный календарь и трекер задач в Google таблицах с использованием Google Apps Script. Состоит из листа Задачи и листа Расписание.
Лист Задачи выполняет роль таск-трекера и сортирует задачи по статусу, дедлайну, предмету, автоматически указывает день недели по дате дедлайна, раскрашивает задачи в соответствии с выбранной палитрой, автоматически сдвигает прошедшие даты дедлайна на текущую дату:
![image](https://github.com/irinazobova/study-helper/assets/141981835/fd3569fa-1b6d-45b1-afb2-2c85bbcfb79c)

Лист Расписание выполняет все функции обычного университетского расписания с тем преимуществом, что автоматически скрывает "мигающие" пары (повторяющиеся только по четным или нечетным неделям), позволяет отмечать свое присутствие на занятиях и готовность домашних заданий, добавлять ссылки на интернет-ресурсы по предметам:
![image](https://github.com/irinazobova/study-helper/assets/141981835/8685e244-252f-49ee-b68c-a9b71f6f3a2f)

Необходимо создание пяти триггеров к каждой функции файла:
*  function SortRange()
развертывается при изменениях
*  function AutoColor()
развертывается при изменениях
*  function AutoFill()
развертывается при изменениях
*  function SetDeadline()
развертывается при изменениях
*  function WeekCounter()
развертывается по времени каждый понедельник с 0:00 до 1:00
*  function AutoHide()
развертывается по времени каждый понедельник с 1:00 до 2:00
