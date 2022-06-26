const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const places = document.querySelector('.places');

const btnEditProfile = document.querySelector('.profile__info-edit-btn');
const btnAddPlace = document.querySelector('.profile__add-btn');
const btnCloseEditProfile = document.querySelector('.button_type_close-editing');
const btnCloseAddPlace = document.querySelector('.button_type_close-creating');
const btnCloseImagePlace = document.querySelector('.button_type_close-viewing');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms.formEditProfile;
const nameEdit = formEditProfile.elements.profileName;
const descriptionEdit = formEditProfile.elements.profileDescription;

const popupAddPlace = document.querySelector('.popup_type_add-place');
const formAddPlace = document.forms.formAddPlace;
const namePlace = formAddPlace.elements.placeName;
const linkForPlace = formAddPlace.elements.placeLink;

const popupImagePlace = document.querySelector('.popup_type_image-place');
const imagePlace = document.querySelector('.popup__image');
const imagePlaceCaption = document.querySelector('.popup__image-caption');

// открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  checkClosePopup(popup);
}

// закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// открытие popup-edit-profile
function getPopupEditProfile() {
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
  openPopup(popupEditProfile);
}

// открытие popup-add-place
function getPopupAddPlace() {
  formAddPlace.reset();
  openPopup(popupAddPlace);
}

// проверка закрытия popup
function checkClosePopup (popup) {
  window.addEventListener('keydown', getKey);
  popup.addEventListener('click', getKey);
  function getKey(evt) {
    if (evt.key === 'Escape' || evt.target === evt.currentTarget) {
      console.log(evt);
      window.removeEventListener('keydown', getKey);
      popup.removeEventListener('click', getKey);
      closePopup(popup);
    }
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
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__image').src = linkImage;
  placeElement.querySelector('.place__image').alt = 'Фото ' + namePlace;
  placeElement.querySelector('.place__title').textContent = namePlace;
  placeElement.querySelector('.place__image').addEventListener('click', () => {
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
btnCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
btnCloseAddPlace.addEventListener('click', () => closePopup(popupAddPlace));
btnCloseImagePlace.addEventListener('click', () => closePopup(popupImagePlace));

formEditProfile.addEventListener('submit', editProfileHandler);
formAddPlace.addEventListener('submit', addPlaceHandler);
