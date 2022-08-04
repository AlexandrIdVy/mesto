//класс для добавления карточек на страницу
export default class Card {

  constructor(cardSelector, data, { handleCardClick }) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  // получаем шаблон карточки
  _getTemplate() {
    const placeElement = document.querySelector(this._cardSelector).content;

    return placeElement;
  }
  // устанавливаем слушателей
  _setEventListener() {
    this._likeBtn = this._element.querySelector('.place__like-btn');
    this._cardImage = this._element.querySelector('.place__image');
    this._likeBtn.addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.place__trash-btn').addEventListener('click', () => this._handleTrashClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));
  }
  // меняем состояние лайка
  _handleLikeClick() {
    this._likeBtn.classList.toggle('place__like-btn_active');
  }
  // удаляем карточку
  _handleTrashClick() {
    this._element.remove();
    this._element = null;
  }
  // создаем карточку
  generateCard() {
    this._element = this._getTemplate().querySelector('.place').cloneNode(true);
    this._setEventListener();

    this._element.querySelector('.place__title').textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = 'Фото ' + this._image;

    return this._element;
  }

}
