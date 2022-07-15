const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const places = document.querySelector('.places');

const btnEditProfile = document.querySelector('.profile__info-edit-btn');
const btnAddPlace = document.querySelector('.profile__add-btn');

const placeTemplate = document.querySelector('#place-template').content;

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms.formEditProfile;
const nameEdit = formEditProfile.elements.profileName;
const descriptionEdit = formEditProfile.elements.profileDescription;
const btnSubmitProfile = formEditProfile.querySelector('.popup__form-save-btn');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const formAddPlace = document.forms.formAddPlace;
const namePlace = formAddPlace.elements.placeName;
const linkForPlace = formAddPlace.elements.placeLink;
const btnSubmitPlace = formAddPlace.querySelector('.popup__form-save-btn');

const popupImagePlace = document.querySelector('.popup_type_image-place');
const imagePlace = document.querySelector('.popup__image');
const imagePlaceCaption = document.querySelector('.popup__image-caption');

// открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', checkCloseKeyPopup);
  popup.addEventListener('mousedown', checkCloseClickPopup);
  popup.addEventListener('mousedown', checkCloseBtnPopup);
}

// закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkCloseKeyPopup);
  popup.removeEventListener('mousedown', checkCloseClickPopup);
  popup.removeEventListener('mousedown', checkCloseBtnPopup);
}

// открытие popup-edit-profile
function getPopupEditProfile() {
  cleanValidationError(popupEditProfile);
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
  btnSubmitProfile.disabled = false;
  openPopup(popupEditProfile);
}

// открытие popup-add-place
function getPopupAddPlace() {
  formAddPlace.reset();
  cleanValidationError(popupAddPlace);
  openPopup(popupAddPlace);
}

// проверка области клика при закрытии popup
function checkCloseClickPopup(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// проверка клавиши при закрытии popup
function checkCloseKeyPopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// проверка кнопки закрытия popup
function checkCloseBtnPopup(evt) {
  if (evt.target === evt.target.closest('.popup__close-btn')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// замена имени и описания в профиле
function editProfileHandler(evt) {
  nameProfile.textContent = nameEdit.value;
  descriptionProfile.textContent = descriptionEdit.value;
  closePopup(popupEditProfile);
}

// добавление карточки в places
function addPlaceHandler(evt) {
  const card = {
    name: namePlace.value,
    link: linkForPlace.value
  };
  renderCard(places, card);
  closePopup(popupAddPlace);
  formAddPlace.reset();
  btnSubmitPlace.disabled = true;
}

/// Класс ///

class Card {

  constructor(cardSelector, data) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const placeElement = placeTemplate.querySelector(this._cardSelector).cloneNode(true);

    return placeElement;
  }

  _setEventListener() {
    this._element.querySelector('.place__like-btn').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.place__trash-btn').addEventListener('click', () => this._handleTrashClick());
    this._element.querySelector('.place__image').addEventListener('click', () => this._handleImageClick());
  }

  _handleLikeClick() {
    this._element.querySelector('.place__like-btn').classList.toggle('place__like-btn_active');
  }

  _handleTrashClick() {
    this._element.querySelector('.place__trash-btn').closest(this._cardSelector).remove();
  }

  _handleImageClick() {
    imagePlace.src = this._image;
    imagePlace.alt = this._title;
    imagePlaceCaption.textContent = this._title;
    openPopup(popupImagePlace);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector('.place__title').textContent = this._title;
    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = 'Фото ' + this._image;

    return this._element;
  }

}

/// Класс ///

// добавление карточки в контейнер
function renderCard(container, cardElement) {
  const card = new Card('.place', cardElement);
  const cardPlace = card.generateCard();

  container.prepend(cardPlace);
}

initialCards.forEach(element => renderCard(places, element));

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

formEditProfile.addEventListener('submit', editProfileHandler);
formAddPlace.addEventListener('submit', addPlaceHandler);
