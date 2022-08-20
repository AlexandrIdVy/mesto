//класс для добавления карточек на страницу
export default class Card {

  constructor(cardSelector, data, api, { handleCardClick, handleTrashClick }) {
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._image = data.link;
    this._like = data.likes;
    this._owner = data.owner._id;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
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
    this._trashBtn = this._element.querySelector('.place__trash-btn');
    this._likeBtn.addEventListener('click', () => this._handleLikeClick());
    this._addListenerTrashBtn();
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));
  }
  // меняем состояние лайка
  _handleLikeClick() {
    this._likeBtn.classList.toggle('place__like-btn_active');
  }
  // удаляем карточку
  _removeCard() {
    this._element.remove();
    this._element = null;
  }
  // добавляем счетчик лайков
  _addLikeValue() {
    if (this._like.length > 0) {
      this._likeContainer = this._element.querySelector('.place__like-value');
      this._likeContainer.textContent = this._like.length;
      this._likeContainer.classList.add('place__like-value_type_on');
    }
  }
  // добавляем обработчик кнопки удаления карчточки
  _addListenerTrashBtn() {
    if (this._owner !== 'c1f67b72925e91ec75ff78f4') {
      this._trashBtn.disabled = true;
    }
    else {
      this._trashBtn.addEventListener('click', () => this._handleTrashClick());
    }
  }
  // создаем карточку
  generateCard() {
    this._element = this._getTemplate().querySelector('.place').cloneNode(true);
    this._setEventListener();

    this._cardImage.src = this._image;
    this._cardImage.alt = 'Фото ' + this._image;
    this._element.querySelector('.place__title').textContent = this._title;
    this._addLikeValue();

    return this._element;
  }

}
