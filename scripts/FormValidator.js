/// ВАЛИДАЦИЯ
import { settings } from './index.js';

export default class FormValidator {

  constructor(settings, element) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._element = element;
  }
  // показываем ошибку валидации инпута
  _showInputError() {
    const errorElement = this._element.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }
  // скрываем ошибку валидации инпута
  _hideInputError() {
    const errorElement = this._element.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  // проверяем валидность поля
  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }
  // проверяем есть ли хоть одно поле НЕ прошедшее валидацю
  _hasInvalidInput() {
    return this._findInputList().some(inputElement => {return !inputElement.validity.valid;});
  }
  // блокируем кнопку отправки формы
  _toggleButtonState() {
    this._buttonElement = this._element.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  // находим все инпуты в форме
  _findInputList() {
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));

    return inputList;
  }
  // устанавливаем слушателей событий
  _setEventListeners() {
    this._findInputList().forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }
  // удаляем ошибки при закрытии попапа без сохранения
  cleanValidationError() {
    this._findInputList().forEach(inputElement => {
        this._inputElement = inputElement;
        this._hideInputError();
        this._toggleButtonState();
    });
  }
  // включаем валидацию
  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }

}

