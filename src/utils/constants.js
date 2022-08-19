export const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    'content-type': 'application/json',
    'authorization': '15345f7b-4bd0-44fb-9b1a-bd66919c1258'
  }
}

export const places = '.places';

export const btnEditProfile = document.querySelector('.profile__info-edit-btn');
export const btnAddPlace = document.querySelector('.profile__add-btn');

export const popupEditProfile = '.popup_type_edit-profile';
export const formEditProfile = document.forms.formEditProfile;
export const nameEdit = formEditProfile.elements.name;
export const descriptionEdit = formEditProfile.elements.about;

export const popupAddPlace = '.popup_type_add-place';
export const formAddPlace = document.forms.formAddPlace;
export const namePlace = formAddPlace.elements.name;
export const linkForPlace = formAddPlace.elements.link;

export const popupImagePlace = '.popup_type_image-place';

export const userProfile = {
  name: '.profile__info-title',
  about: '.profile__info-subtitle'
}
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-save-btn',
  inactiveButtonClass: 'popup__form-save-btn_type_no-active',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_visible'
};
