import Card from './card.js';
import FormValidator from './FormValidator.js';

const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const places = document.querySelector('.places');

const btnEditProfile = document.querySelector('.profile__info-edit-btn');
const btnAddPlace = document.querySelector('.profile__add-btn');

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

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-save-btn',
  inactiveButtonClass: 'popup__form-save-btn_type_no-active',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_visible'
};

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
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
  const check = new FormValidator(settings, popupEditProfile);
  check.cleanValidationError();
  openPopup(popupEditProfile);
}

// открытие popup-add-place
function getPopupAddPlace() {
  formAddPlace.reset();
  const check = new FormValidator(settings, popupAddPlace);
  check.cleanValidationError();
  openPopup(popupAddPlace);
}

// проверка области клика при закрытии popup
function checkCloseClickPopup(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = evt.currentTarget;
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
    const popup = evt.currentTarget;
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
  btnSubmitPlace.disabled = true;
}

// добавление карточки в контейнер
function renderCard(container, cardElement) {
  container.prepend(createCard(cardElement));
}

// создаем карточку
function createCard(cardElement) {
  const card = new Card('.place', cardElement);
  const cardPlace = card.generateCard();
  return cardPlace;
}

// включение валидации
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const check = new FormValidator(settings, formElement);
    check.enableValidation();
  });

};

initialCards.forEach(element => renderCard(places, element));

btnEditProfile.addEventListener('click', getPopupEditProfile);
btnAddPlace.addEventListener('click', getPopupAddPlace);

formEditProfile.addEventListener('submit', editProfileHandler);
formAddPlace.addEventListener('submit', addPlaceHandler);

enableValidation(settings);

export { openPopup, settings };
