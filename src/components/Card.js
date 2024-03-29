//класс для добавления карточек на страницу
export default class Card {

  constructor(cardSelector, data, api, showError, userId, { handleCardClick, handleTrashClick }) {
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._cardId = data._id;
    this._api = api;
    this._showError = showError;
    this._userId = userId;
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
    this._likeContainer = this._element.querySelector('.place__like-value');
    this._likeBtn = this._element.querySelector('.place__like-btn');
    this._cardImage = this._element.querySelector('.place__image');
    this._trashBtn = this._element.querySelector('.place__trash-btn');

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));

    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('place__like-btn_active')) {
        this._removeLikeCard();
      }
      else {
        this._addLikeCard();
      }
    });

    if (this._owner !== this._userId) {
      this._trashBtn.disabled = true;
    }
    else {
      this._trashBtn.addEventListener('click', () => this._handleTrashClick(this._cardId, this._element));
    }
  }
  // добавляем лайк
  _addLikeCard() {
    this._api.addLike(this._cardId)
    .then((card) => {
      this._likeBtn.classList.add('place__like-btn_active');

      if (this._likeContainer.classList.contains('place__like-value_type_on')) {
        this._likeContainer.textContent = card.likes.length;
      }
      else {
        this._likeContainer.textContent = card.likes.length;
        this._likeContainer.classList.add('place__like-value_type_on');
      }
    })
    .catch(err => this._showError(err));
  }
  // удаляем лайк
  _removeLikeCard() {
    this._api.removeLike(this._cardId)
    .then((card) => {
      this._likeBtn.classList.remove('place__like-btn_active');

      if (card.likes.length > 0) {
        this._likeContainer.textContent = this._like.length;
      }
      else {
        this._likeContainer.classList.remove('place__like-value_type_on');
        this._likeContainer.textContent = '';
      }
    })
    .catch(err => this._showError(err));
  }
  // добавляем счетчик лайков
  _addLikeValue() {
    if (this._likes.length > 0) {
      this._likeContainer.textContent = this._likes.length;
      this._likeContainer.classList.add('place__like-value_type_on');
      this._likes.forEach(element => {
        if (element._id === this._userId) {
          this._likeBtn.classList.add('place__like-btn_active');
        }
      });
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
