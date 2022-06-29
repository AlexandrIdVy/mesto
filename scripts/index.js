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
  formAddPlace.reset();
  cleanValidationError(popup);
}

// открытие popup-edit-profile
function getPopupEditProfile() {
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
  btnSubmitProfile.disabled = false;
  openPopup(popupEditProfile);
}

// открытие popup-add-place
function getPopupAddPlace() {
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
  evt.preventDefault();
  nameProfile.textContent = nameEdit.value;
  descriptionProfile.textContent = descriptionEdit.value;
  closePopup(popupEditProfile);
}

// добавление карточки в places
function addPlaceHandler(evt) {
  evt.preventDefault();
  renderCard(places, createCard(namePlace.value, linkForPlace.value));
  closePopup(popupAddPlace);
  formAddPlace.reset();
  btnSubmitPlace.disabled = true;
}

// просмотр изображения карточки
function openImage(linkImage, namePlace) {
  imagePlace.src = linkImage;
  imagePlace.alt = namePlace;
  imagePlaceCaption.textContent = namePlace;
  openPopup(popupImagePlace);
}

// создание карточки
function createCard(namePlace, linkImage) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  const image = placeElement.querySelector('.place__image');

  image.src = linkImage;
  image.alt = 'Фото ' + namePlace;
  placeElement.querySelector('.place__title').textContent = namePlace;
  image.addEventListener('click', () => {
    openImage(linkImage, namePlace);
  });
  placeElement.querySelector('.place__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like-btn_active');
  });
  placeElement.querySelector('.place__trash-btn').addEventListener('click', () => {
    placeElement.querySelector('.place__trash-btn').closest('.place').remove();
  });

  return placeElement;
}

// добавление карточки в контейнер
function renderCard(container, cardElement) {
  container.prepend(cardElement);
}

initialCards.forEach(element => renderCard(places, createCard(element.name, element.link)));

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

formEditProfile.addEventListener('submit', editProfileHandler);
formAddPlace.addEventListener('submit', addPlaceHandler);
