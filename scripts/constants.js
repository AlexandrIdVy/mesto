export const nameProfile = document.querySelector('.profile__info-title');
export const descriptionProfile = document.querySelector('.profile__info-subtitle');

//export const places = document.querySelector('.places');
export const places = '.places';

export const btnEditProfile = document.querySelector('.profile__info-edit-btn');
export const btnAddPlace = document.querySelector('.profile__add-btn');

export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const formEditProfile = document.forms.formEditProfile;
export const nameEdit = formEditProfile.elements.profileName;
export const descriptionEdit = formEditProfile.elements.profileDescription;

export const popupAddPlace = document.querySelector('.popup_type_add-place');
export const formAddPlace = document.forms.formAddPlace;
export const namePlace = formAddPlace.elements.placeName;
export const linkForPlace = formAddPlace.elements.placeLink;
export const btnSubmitPlace = formAddPlace.querySelector('.popup__form-save-btn');

export const popupImagePlace = document.querySelector('.popup_type_image-place');
export const imagePlace = document.querySelector('.popup__image');
export const imagePlaceCaption = document.querySelector('.popup__image-caption');

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-save-btn',
  inactiveButtonClass: 'popup__form-save-btn_type_no-active',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_visible'
};

export const initialCards = [
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
