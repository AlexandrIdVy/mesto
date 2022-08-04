import '../pages/index.css';
import { nameProfile,
  descriptionProfile,
  places,
  btnEditProfile,
  btnAddPlace,
  popupEditProfile,
  formEditProfile,
  popupAddPlace,
  formAddPlace,
  btnSubmitPlace,
  popupImagePlace,
  settings,
  initialCards } from './constants.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';

// создаем экземпляр класса для добавления карточек в указанную секцию
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

// создаем экземпляр класса для изменения данных в профиле
const popupFormEdit = new PopupWithForm(popupEditProfile, {
  form: formEditProfile,
  handleSubmitForm: (formData) => {
    const profile = new UserInfo(formData);
    profile.setUserInfo();
    popupFormEdit.close();
  }
});

// создаем экземпляр класса для добавления карточки
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

// открытие popup-edit-profile
function getPopupEditProfile() {
  const data = {
    name: nameProfile.textContent,
    description: descriptionProfile.textContent
  };
  const profile = new UserInfo(data);
  profile.getUserInfo();
  checkEditProfile.cleanValidationError();
  popupFormEdit.setEventListeners();
  openPopup(popupEditProfile);
}

// открытие popup-add-place
function getPopupAddPlace() {
  popupFormPlace.setEventListeners();
  checkAddPlace.cleanValidationError();
  openPopup(popupAddPlace);
}

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

// добавляем карточки на страницу
placesList.render();

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

// включаем валидацию
checkEditProfile.enableValidation();
checkAddPlace.enableValidation();
