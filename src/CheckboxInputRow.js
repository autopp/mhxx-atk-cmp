import InputRow from './InputRow';
import CheckboxInput from './CheckboxInput';

class CheckboxInputRow extends InputRow {
  getInputClass() {
    return CheckboxInput;
  }
}

export default CheckboxInputRow;
