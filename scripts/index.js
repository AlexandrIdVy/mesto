const editButton = document.querySelector('.profile__info-edit-btn');

const places = document.querySelector('.places');
const likeButton = document.querySelectorAll('.place__like-btn');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');

const formEdit = document.querySelector('.popup__form');

const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const nameEdit = document.querySelector('.popup__form-input_type_name-on');
const descriptionEdit = document.querySelector('.popup__form-input_type_description-on');

// открытие-закрытие popup
function popupOpenClose() {

  if (!popup.classList.contains('popup_opened')) {
    nameEdit.value = nameProfile.textContent;
    descriptionEdit.value = descriptionProfile.textContent;
  }
  else {
    nameEdit.value = '';
    descriptionEdit.value = '';
  }

  popup.classList.toggle('popup_opened');
}

// проверка области клика при закрытии окна
function popupCloseClick(e) {
  if (e.target === e.currentTarget) {
    popupOpenClose();
  }
}

// замена имени и описания в профиле
function formSubmitHandler (e) {
  e.preventDefault();
  nameProfile.textContent = nameEdit.value;
  descriptionProfile.textContent = descriptionEdit.value;
  popupOpenClose();
}

// добавление лайка
function addLike(e) {
  for (let i = 0; i < likeButton.length; i++) {
    if (e.target.contains(likeButton[i])) {
      e.target.classList.toggle('place__like-btn_active');
    }
  }
}

editButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);
popup.addEventListener('click', popupCloseClick);
formEdit.addEventListener('submit', formSubmitHandler);
places.addEventListener('click', addLike);
