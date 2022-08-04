export default class Popup {

  constructor(popupSelector) {
    this._popup = popupSelector;

    this._checkEscClose = (evt) => this._handleEscClose(evt);
    this._checkBtnClose = (evt) => this._handleBtnClose(evt);
    this._checkClickClose = (evt) => this._handleClickClose(evt);
  }
  // закрытие попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  // закрытие попапа по иконке
  _handleBtnClose(evt) {
    if (evt.target === evt.target.closest('.popup__close-btn')) {
      this.close();
    }
  }
  // закрытие попапа кликом на затемнённую область
  _handleClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  // открытие попап
  open() {
    this._popup.classList.add('popup_opened');
  }
  // закрытие попап
  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }
  // установка слушателей событий клика по иконке закрытия попапа, на затемнённую область вокруг формы
  setEventListeners() {
    document.addEventListener('keydown', this._checkEscClose);
    this._popup.addEventListener('mousedown', this._checkBtnClose);
    this._popup.addEventListener('click', this._checkClickClose);
  }
  // удаление слушателей
  removeEventListeners() {
    document.removeEventListener('keydown', this._checkEscClose);
    this._popup.removeEventListener('mousedown', this._checkBtnClose);
    this._popup.removeEventListener('click', this._checkClickClose);
  }
}
