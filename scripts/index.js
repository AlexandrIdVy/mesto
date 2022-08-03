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
  //imagePlace,
  //imagePlaceCaption,
  settings,
  initialCards } from './constants.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';

// создаем экземпляр класса для добавления карточки в указанную секцию
const placesList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card('#place-template', item, {
      handleCardClick: (name, link) => {
        const popupElement = new PopupWithImage(popupImagePlace, name, link);
        popupElement.open();
        popupElement.setEventListeners();
      }
    });
    const cardPlace = card.generateCard();

    placesList.addItem(cardPlace);
  },
},
places);

//создаем экземпляр класса для валидации формы профиля
const checkEditProfile = new FormValidator(settings, popupEditProfile);

// создаем экземпляр класса для валидации формы добавления карточки
const checkAddPlace = new FormValidator(settings, popupAddPlace);

const popupFormEdit = new PopupWithForm(popupEditProfile, {
  form: formEditProfile,
  handleSubmitForm: (formData) => {
    const profile = new UserInfo(formData);
    profile.setUserInfo();
    popupFormEdit.close();
  }
});

const popupFormPlace = new PopupWithForm(popupAddPlace, {
  form: formAddPlace,
  handleSubmitForm: (formData) => {
    placesList.addItem(createCard(formData));
    btnSubmitPlace.disabled = true;
    popupFormPlace.close();
  }
});

// открытие popup
function openPopup(popup) {
  const popupElement = new Popup(popup);
  popupElement.open();
}

// закрытие popup
/* function closePopup(popup) {
  const popupElement = new Popup(popup);
  popupElement.close();
}
 */

// открытие popup-edit-profile
function getPopupEditProfile() {
  const prof = {
    name: nameProfile.textContent,
    description: descriptionProfile.textContent
  };
  const profile = new UserInfo(prof);
  profile.getUserInfo();
  checkEditProfile.cleanValidationError();
  popupFormEdit.setEventListeners();
  openPopup(popupEditProfile);
}

// открытие popup-add-place
function getPopupAddPlace() {
  //formAddPlace.reset();
  popupFormPlace.setEventListeners();
  checkAddPlace.cleanValidationError();
  openPopup(popupAddPlace);
}

// замена имени и описания в профиле
/* function editProfileHandler(evt) {
  evt.preventDefault();
  const profile = new UserInfo(nameEdit.value, descriptionEdit.value);
  profile.setUserInfo();
  closePopup(popupEditProfile);
} */

// добавление карточки в places
/* function addPlaceHandler(evt) {
  evt.preventDefault();
  const card = {
    name: namePlace.value,
    link: linkForPlace.value
  };
  placesList.addItem(createCard(card));
  closePopup(popupAddPlace);
  btnSubmitPlace.disabled = true;
} */

// создание карточки
function createCard(cardElement) {
  const card = new Card('#place-template', cardElement, {
    handleCardClick: (name, link) => {
      const popupElement = new PopupWithImage(popupImagePlace, name, link);
      popupElement.open();
      popupElement.setEventListeners();
    }
  });
  const cardPlace = card.generateCard();

  return cardPlace;
}

placesList.render();

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

//formEditProfile.addEventListener('submit', editProfileHandler);
//formAddPlace.addEventListener('submit', addPlaceHandler);

checkEditProfile.enableValidation();
checkAddPlace.enableValidation();
