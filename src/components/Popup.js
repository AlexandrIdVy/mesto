export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

  }
  // закрытие попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  // закрытие попапа по иконке
  _handleBtnClose = (evt) => {
    if (evt.target === evt.target.closest('.popup__close-btn')) {
      this.close();
    }
  }
  // закрытие попапа кликом на затемнённую область
  _handleClickClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  // открытие попап
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  // закрытие попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  // установка слушателей событий клика по иконке закрытия попапа, на затемнённую область вокруг формы
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleBtnClose);
    this._popup.addEventListener('click', this._handleClickClose);
  }
}
