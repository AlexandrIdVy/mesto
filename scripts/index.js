import {  nameProfile,
  descriptionProfile,
  places,
  btnEditProfile,
  btnAddPlace,
  popupEditProfile,
  formEditProfile,
  nameEdit,
  descriptionEdit,
  popupAddPlace,
  formAddPlace,
  namePlace,
  linkForPlace,
  btnSubmitPlace,
  popupImagePlace,
  imagePlace,
  imagePlaceCaption,
  settings,
  initialCards } from './constants.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';

const placesList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card('#place-template', item, getPopupImage);
    const cardPlace = card.generateCard();

    placesList.addItem(cardPlace);
  },
},
places);

const checkEditProfile = new FormValidator(settings, popupEditProfile);
const checkAddPlace = new FormValidator(settings, popupAddPlace);



// открытие popup
function openPopup(popup) {
  const popupElement = new Popup(popup);
  popupElement.open();
  popupElement.setEventListeners();
  /* popup.classList.add('popup_opened');
  document.addEventListener('keydown', checkCloseKeyPopup);
  popup.addEventListener('mousedown', checkCloseClickPopup);
  popup.addEventListener('click', checkCloseBtnPopup); */
}

// закрытие popup
function closePopup(popup) {
  const popupElement = new Popup(popup);
  popupElement.close();
  popupElement.removeEventListeners();
  /* popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkCloseKeyPopup);
  popup.removeEventListener('mousedown', checkCloseClickPopup);
  popup.removeEventListener('click', checkCloseBtnPopup); */
}

// открытие popup-edit-profile
function getPopupEditProfile() {
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
  checkEditProfile.cleanValidationError();
  openPopup(popupEditProfile);
}

// открытие popup-add-place
function getPopupAddPlace() {
  formAddPlace.reset();
  checkAddPlace.cleanValidationError();
  openPopup(popupAddPlace);
}

// открытие попапа с картинкой
function getPopupImage(name, link) {
  imagePlace.src = link;
  imagePlace.alt = name;
  imagePlaceCaption.textContent = name;
  openPopup(popupImagePlace);
}

// проверка области клика при закрытии popup
/* function checkCloseClickPopup(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = evt.currentTarget;
    closePopup(popup);
  }
} */

// проверка клавиши при закрытии popup
/* function checkCloseKeyPopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
} */

// проверка кнопки закрытия popup
/* function checkCloseBtnPopup(evt) {
  if (evt.target === evt.target.closest('.popup__close-btn')) {
    const popup = evt.currentTarget;
    closePopup(popup);
  }
} */

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
  const card = {
    name: namePlace.value,
    link: linkForPlace.value
  };
  //renderCard(places, card);
  placesList.addItem(createCard(card));
  closePopup(popupAddPlace);
  btnSubmitPlace.disabled = true;
}

// добавление карточки в контейнер
/* function renderCard(container, cardElement) {
  container.prepend(createCard(cardElement));
} */

// создание карточки
function createCard(cardElement) {
  const card = new Card('#place-template', cardElement, getPopupImage);
  const cardPlace = card.generateCard();

  return cardPlace;
}

//initialCards.forEach(element => renderCard(places, element));
placesList.render();

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

formEditProfile.addEventListener('submit', editProfileHandler);
formAddPlace.addEventListener('submit', addPlaceHandler);

checkEditProfile.enableValidation();
checkAddPlace.enableValidation();
