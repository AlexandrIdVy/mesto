const editButton = document.querySelector('.profile__info-edit-btn');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');

const formEdit = document.querySelector('.popup__form');

const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const nameEdit = document.querySelector('.popup__form-input_type_name-on');
const descriptionEdit = document.querySelector('.popup__form-input_type_description-on');

// открытие окна
function popupOpen() {
  popup.classList.add('popup_opened');
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
}

// закрытие окна
function popupClose() {
  popup.classList.remove('popup_opened');
  nameEdit.value = '';
  descriptionEdit.value = '';
}

// проверка области клика при закрытии окна
function popupCloseAll(e) {
  if (e.target === e.currentTarget) {
    popupClose();
  }
}

// замена имени и описания в профиле
function formSubmitHandler (e) {
  e.preventDefault();
  nameProfile.textContent = nameEdit.value;
  descriptionProfile.textContent = descriptionEdit.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseAll);
formEdit.addEventListener('submit', formSubmitHandler);
