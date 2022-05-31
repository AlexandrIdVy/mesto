const editButton = document.querySelector('.profile__info-edit-btn');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.edit__close-btn');

const formEdit = document.querySelector('.edit');

const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const nameEdit = document.querySelector('.edit__input_name');
const descriptionEdit = document.querySelector('.edit__input_description');

// открытие окна
function popupOpen() {
  popup.classList.add('popup_opened');
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
  document.addEventListener('keypress', editProfileKey);
}

// закрытие окна
function popupClose() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keypress', editProfileKey);
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
  nameEdit.value = '';
  descriptionEdit.value = '';
}

// замена имени и описания в профиле по нажатию enter
function editProfileKey(e) {
  if (e.code === 'Enter') {
    formSubmitHandler(e);
  }
}

editButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseAll);
formEdit.addEventListener('submit', formSubmitHandler);
