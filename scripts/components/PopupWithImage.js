import Popup from './Popup.js';
import { imagePlace, imagePlaceCaption } from '../constants.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }

  open() {
    super.open();
    imagePlace.src = this._link;
    imagePlace.alt = this._name;
    imagePlaceCaption.textContent = this._name;
  }
}
