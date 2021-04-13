import $ from 'jquery';
import '../../plugins/datepicker';
import '../../plugins/jquery.datepicker.extension.range.min';
import textfield from '../textfield/textfield';

function doubleDatePicker() {
  const pickers = [];

  document.querySelectorAll('.js-double-date-picker').forEach((element) => {
    const newPicker = new DoubleDatePicker(element);
    newPicker.init();
    pickers.push(newPicker);
  });

  if (pickers.length === 1) return pickers[0];
  return pickers;
}

class DoubleDatePicker {
  constructor(root) {
    this.root = root;
    this.params = {
      closeText: 'Закрыть',
      prevText: 'Предыдущий',
      nextText: 'Следующий',
      currentText: 'Сегодня',
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekHeader: 'Не',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: 'dd.mm.yy',
    };
    this.textfields = textfield({ area: root });
    this.arriveInput = this.textfields[0].input;
    this.departureInput = this.textfields[1].input;
    this.arriveArrow = this.textfields[0].arrow;
    this.departureArrow = this.textfields[1].arrow;
    this.arriveDate = root.querySelector('.js-double-date-picker__container_for_first').dataset.init;
    this.departureDate = root.querySelector('.js-double-date-picker__container_for_second').dataset.init;
  }

  init() {
    const object = this;
    const arriveInput = $(this.arriveInput);
    const departureInput = $(this.departureInput);
    const {
      arriveArrow, departureArrow, arriveDate, departureDate,
    } = this;

    $.datepicker.regional.ru = this.params;
    $.datepicker.setDefaults($.datepicker.regional.ru);

    arriveInput.datepicker({
      minDate: 0,
      range: 'period',
      onSelect(dateText, inst, extensionRange) {
        const start = extensionRange.startDateText;
        const end = extensionRange.endDateText;
        arriveInput.val(start);
        departureInput.val(end);
        object.arriveDate = extensionRange.startDate;
        object.departureDate = extensionRange.endDate;

        const select = new CustomEvent('ondateselect', { detail: extensionRange });
        arriveInput[0].dispatchEvent(select);
      },
    });

    departureInput.datepicker({
      minDate: 0,
      range: 'period',
      onSelect(dateText, inst, extensionRange) {
        const start = extensionRange.startDateText;
        const end = extensionRange.endDateText;
        arriveInput.val(start);
        departureInput.val(end);
        object.arriveDate = extensionRange.startDate;
        object.departureDate = extensionRange.endDate;

        const select = new CustomEvent('ondateselect', { detail: extensionRange });
        departureInput[0].dispatchEvent(select);
      },
    });

    if (arriveDate && departureDate) {
      arriveInput.datepicker('setDate', `+${arriveDate}d`);
      departureInput.datepicker('setDate', [`+${arriveDate}d`, `+${departureDate}d`]);
    } else if (arriveDate) {
      arriveInput.datepicker('setDate', `+${arriveDate}d`);
    } else if (departureDate) {
      departureInput.datepicker('setDate', [`+${arriveDate}d`, `+${departureDate}d`]);
    }

    document.addEventListener('calendarshowing', handlerDocShowing);
    document.addEventListener('calendarhiding', handlerDocHiding);
    arriveArrow.addEventListener('click', handlerArrowClick);
    departureArrow.addEventListener('click', handlerArrowClick);

    const picker = document.querySelector('.js-ui-datepicker');
    picker.addEventListener('click', handlerPickerClick);

    function handlerPickerClick(ev) {
      if (ev.target.closest('.ui-datepicker-button_clear')) {
        picker.querySelectorAll('.ui-state-active').forEach((item) => {
          item.classList.remove('ui-state-active');
        });

        if (picker.querySelector('.selected-start')) picker.querySelector('.selected-start').classList.remove('selected-start');
        if (picker.querySelector('.selected-end')) picker.querySelector('.selected-end').classList.remove('selected-end');

        arriveInput.val('');
        departureInput.val('');
      }
      if (ev.target.closest('.ui-datepicker-button_conf')) {
        $.datepicker._hideDatepicker();
      }
    }

    function handlerArrowClick(e) {
      const input = e.target.closest('.js-double-date-picker__container').querySelector('input');
      $.datepicker._showDatepicker(input);
    }

    function makeHandlerDocClick(arrow) {
      return function handlerDocClick() {
        const actualArrow = arrow;
        document.removeEventListener('click', handlerDocClick);
        actualArrow.addEventListener('click', handlerArrowClick);
        actualArrow.querySelector('.arrow').textContent = 'expand_more';
      };
    }

    function handlerDocShowing(e) {
      if (e.detail.input === arriveInput[0]) {
        arriveArrow.removeEventListener('click', handlerArrowClick);
        arriveArrow.querySelector('.arrow').textContent = 'expand_less';
      } else if (e.detail.input === departureInput[0]) {
        departureArrow.removeEventListener('click', handlerArrowClick);
        departureArrow.querySelector('.arrow').textContent = 'expand_less';
      }
    }

    function handlerDocHiding(e) {
      if (!e.detail.datepickerShowing) return;
      if (e.detail.input === arriveInput[0]) {
        const handlerDocClick = makeHandlerDocClick(arriveArrow);
        document.addEventListener('click', handlerDocClick);
      }
      if (e.detail.input === departureInput[0]) {
        const handlerDocClick = makeHandlerDocClick(departureArrow);
        document.addEventListener('click', handlerDocClick);
      }
    }
  }
}

export default doubleDatePicker;
