const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const places = document.querySelector('.places');

const btnEditProfile = document.querySelector('.profile__info-edit-btn');
const btnAddPlace = document.querySelector('.profile__add-btn');
const btnCloseEditProfile = document.querySelector('.button_type_close-editing');
const btnCloseAddPlace = document.querySelector('.button_type_close-creating');
const btnCloseImagePlace = document.querySelector('.button_type_close-viewing');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupImagePlace = document.querySelector('.popup_type_image-place');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddPlace = document.querySelector('.popup__form_type_add-place');

const nameEdit = document.querySelector('.popup__form-input_type_name-on');
const descriptionEdit = document.querySelector('.popup__form-input_type_description-on');
const namePlace = document.querySelector('.popup__form-input_type_place-on');
const linkForPlace = document.querySelector('.popup__form-input_type_link-on');
const imagePlace = document.querySelector('.popup__image');
const imagePlaceCaption = document.querySelector('.popup__image-caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
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

// проверка области клика при закрытии popup
const checkCloseClickPopup = (evt, popup) => {
    if (evt.target === evt.currentTarget) {
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

btnEditProfile.addEventListener('click', () => getPopupEditProfile());
btnAddPlace.addEventListener('click', () => getPopupAddPlace());
btnCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
btnCloseAddPlace.addEventListener('click', () => closePopup(popupAddPlace));
btnCloseImagePlace.addEventListener('click', () => closePopup(popupImagePlace));

popupEditProfile.addEventListener('click', (evt) => checkCloseClickPopup(evt, popupEditProfile));
popupAddPlace.addEventListener('click', (evt) => checkCloseClickPopup(evt, popupAddPlace));
popupImagePlace.addEventListener('click', (evt) => checkCloseClickPopup(evt, popupImagePlace));

formEditProfile.addEventListener('submit', editProfileHandler);
formAddPlace.addEventListener('submit', addPlaceHandler);

