import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  constructor(popupSelector, api, showError) {
    super(popupSelector);
    this._confirmBtn = document.querySelector('#confirmation');
    this._api = api;
    this._showError = showError;
  }

  _handleClick = (cardId, element) => {
    this._api.deleteCard(cardId)
      .then(() => {
        element.remove();
        element = null;
        this.close();
      })
      .catch(err => this._showError(err));
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmBtn.addEventListener('click', () => this._handleClick(this._cardId, this._element));
  }

  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
  }

}
