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
  popupComfirmation,
  settings } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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
const profile = new UserInfo(userProfile, api);

// получаем данные пользователя с сервера
api.getUserMe()
  .then(res => profile.setUserInfo(res))
  .catch(err => showError(err));

// получаем карточки с сервера
const placesList = new Section({
  items: api,
  renderer: (item) => {
    placesList.addItemAppend(createCard(item));
  },
},
places, showError);

// создаем экземпляр класса для попапа с картинкой
const popupImage = new PopupWithImage(popupImagePlace);

// создаем экземпляр класса для попапа с подтверждением
const popupConfirm = new PopupWithConfirmation(popupComfirmation);

// создаем экземпляр класса для изменения данных в профиле
const popupFormEdit = new PopupWithForm(popupEditProfile, {
  form: formEditProfile,
  handleSubmitForm: (dataUser) => {
    profile.sendUserInfo(dataUser);
    popupFormEdit.close();
  }
});

// создаем экземпляр класса для добавления карточки
const popupFormPlace = new PopupWithForm(popupAddPlace, {
  form: formAddPlace,
  handleSubmitForm: (formData) => {
    // отправляем карточку на сервер
    api.sendCard(formData)
      .then(res => placesList.addItemPrepend(createCard(res)))
      .catch(err => showError(err));
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
  const card = new Card('#place-template', cardElement, api, {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleTrashClick: () => {
      popupConfirm.open();
    }
  });

  return card.generateCard();
}

// вывод ошибки запроса
function showError(err) {
  console.log(err);
}

// добавляем карточки на страницу
placesList.render();

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

// добавляем обработчики submit
popupFormEdit.setEventListeners();
popupFormPlace.setEventListeners();
popupImage.setEventListeners();
popupConfirm.setEventListeners();

// включаем валидацию
checkEditProfile.enableValidation();
checkAddPlace.enableValidation();


