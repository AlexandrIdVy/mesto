/* import './index.css'; */
import { config,
  userProfile,
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
//import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//создаем экземпляр класса для Api
const api = new Api(config);

//создаем экземпляр класса для валидации формы профиля
const checkEditProfile = new FormValidator(settings, popupEditProfile);

// создаем экземпляр класса для валидации формы добавления карточки
const checkAddPlace = new FormValidator(settings, popupAddPlace);

// создаем экземпляр класса для профиля
const profile = new UserInfo(userProfile);

// создаем экземпляр класса для попапа с картинкой
const popupImage = new PopupWithImage(popupImagePlace);

// получаем карточки по api
api.getInitialCards()
  .then((result) => {
    // создаем экземпляр класса для добавления карточек в указанную секцию
    const placesList = new Section({
      items: result,
      renderer: (item) => {
        placesList.addItem(createCard(item));
      },
    },
    places);

    // добавляем карточки на страницу
    placesList.render();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

  api.getUserMe()
  .then((result) => {
    // получаем данные пользователя
    profile.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


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
  const dataProfile = profile.getUserInfo();
  nameEdit.value = dataProfile.name;
  descriptionEdit.value = dataProfile.about;
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
    }
  });

  return card.generateCard();
}

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

// добавляем обработчики submit
popupFormEdit.setEventListeners();
popupFormPlace.setEventListeners();
popupImage.setEventListeners();

// включаем валидацию
checkEditProfile.enableValidation();
checkAddPlace.enableValidation();


