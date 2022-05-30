const editButton = document.querySelector('.profile__info-edit-btn');

const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.edit__close-btn');

const formEdit = document.querySelector('.edit');

let nameProfile = document.querySelector('.profile__info-title');
let descriptionProfile = document.querySelector('.profile__info-subtitle');

let nameEdit = document.querySelector('.edit__name');
let descriptionEdit = document.querySelector('.edit__description');

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseAll);
formEdit.addEventListener('submit', formSubmitHandler);

// открытие окна
function popupOpen() {
  popup.classList.remove('popup_hidden');
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = descriptionProfile.textContent;
}

// закрытие окна
function popupClose() {
  popup.classList.add('popup_hidden');
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
