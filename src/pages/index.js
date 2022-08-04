import './index.css';
import { userProfile,
  nameEdit,
  descriptionEdit,
  places,
  btnEditProfile,
  btnAddPlace,
  popupEditProfile,
  formEditProfile,
  popupAddPlace,
  formAddPlace,
  popupImagePlace,
  settings,
  initialCards } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

//создаем экземпляр класса для валидации формы профиля
const checkEditProfile = new FormValidator(settings, popupEditProfile);

// создаем экземпляр класса для валидации формы добавления карточки
const checkAddPlace = new FormValidator(settings, popupAddPlace);

// создаем экземпляр класса для профиля
const profile = new UserInfo(userProfile);

// создаем экземпляр класса для попапа с картинкой
const popupImage = new PopupWithImage(popupImagePlace);

// создаем экземпляр класса для добавления карточек в указанную секцию
const placesList = new Section({
  items: initialCards,
  renderer: (item) => {
    placesList.addItem(createCard(item));
  },
},
places);

// создаем экземпляр класса для изменения данных в профиле
const popupFormEdit = new PopupWithForm(popupEditProfile, {
  form: formEditProfile,
  handleSubmitForm: (dataUser) => {
    profile.setUserInfo(dataUser);
    popupFormEdit.close();
  }
});

// создаем экземпляр класса для добавления карточки
const popupFormPlace = new PopupWithForm(popupAddPlace, {
  form: formAddPlace,
  handleSubmitForm: (formData) => {
    placesList.addItem(createCard(formData));
    popupFormPlace.close();
  }
});

// открытие popup-edit-profile
function getPopupEditProfile() {
  nameEdit.value = profile.getUserInfo().name;
  descriptionEdit.value = profile.getUserInfo().description;
  checkEditProfile.cleanValidationError();
  popupFormEdit.open();
}

// открытие popup-add-place
function getPopupAddPlace() {
  checkAddPlace.cleanValidationError();
  popupFormPlace.open();
}

// создание карточки
function createCard(cardElement) {
  const card = new Card('#place-template', cardElement, {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
      popupImage.setEventListeners();
    }
  });
  const cardPlace = card.generateCard();

  return cardPlace;
}

// добавляем карточки на страницу
placesList.render();

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

// добавляем обработчики submit
popupFormEdit.setEventListeners();
popupFormPlace.setEventListeners();

// включаем валидацию
checkEditProfile.enableValidation();
checkAddPlace.enableValidation();
