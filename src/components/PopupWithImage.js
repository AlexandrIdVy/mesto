import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._imagePlace = document.querySelector('.popup__image');
    this._imagePlaceCaption = document.querySelector('.popup__image-caption');
  }

  open(name, link) {
    super.open();
    this._imagePlace.src = link;
    this._imagePlace.alt = name;
    this._imagePlaceCaption.textContent = name;
  }
}
