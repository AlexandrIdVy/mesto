import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, { form, handleSubmitForm }) {
    super(popupSelector);
    this._form = form;
    this._handleSubmitForm = handleSubmitForm;

    this._handleSubmit = (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    }
  }
  // получаем данные инпутов из формы
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__form-input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
  // устанавливаем обработчик submit
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._handleSubmit);
  }
  // сбрасываем данные в форме и удаляем обработчик
  close() {
    super.close();
    this._form.removeEventListener('submit', this._handleSubmit);
    this._form.reset();
  }
}
