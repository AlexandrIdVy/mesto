import { openPopup } from './index.js';

const placeTemplate = document.querySelector('#place-template').content;

const popupImagePlace = document.querySelector('.popup_type_image-place');
const imagePlace = document.querySelector('.popup__image');
const imagePlaceCaption = document.querySelector('.popup__image-caption');

//класс для добавления карточек на страницу
export default class Card {

  constructor(cardSelector, data) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }
  // получаем шаблон карточки
  _getTemplate() {
    const placeElement = placeTemplate.querySelector(this._cardSelector).cloneNode(true);

    return placeElement;
  }
  // устанавливаем слушателей
  _setEventListener() {
    this._element.querySelector('.place__like-btn').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.place__trash-btn').addEventListener('click', () => this._handleTrashClick());
    this._element.querySelector('.place__image').addEventListener('click', () => this._handleImageClick());
  }
  // меняем состояние лайка
  _handleLikeClick() {
    this._element.querySelector('.place__like-btn').classList.toggle('place__like-btn_active');
  }
  // удаляем карточку
  _handleTrashClick() {
    this._element.querySelector('.place__trash-btn').closest(this._cardSelector).remove();
  }
  // открываем карточку
  _handleImageClick() {
    imagePlace.src = this._image;
    imagePlace.alt = this._title;
    imagePlaceCaption.textContent = this._title;
    openPopup(popupImagePlace);
  }
  // создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector('.place__title').textContent = this._title;
    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = 'Фото ' + this._image;

    return this._element;
  }

}
