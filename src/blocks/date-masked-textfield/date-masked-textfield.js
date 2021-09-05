import textfield from '../textfield';

import 'jquery';
import '../../plugins/jquery.maskinput.min';

class DateMaskedTextfield {
  constructor({ root }) {
    this.textfield = textfield({ root: root.querySelector('.js-textfield') });
    this.input = this.textfield.getInput();
    this.#init();
  }

  #init = () => {
    $(this.input).mask('99.99.9999');
  }

  setValue = (value) => {
    this.textfield.setValue(value);
  }
}

export default DateMaskedTextfield;
