const editProfileButton = document.querySelector('.profile__info-edit-btn');
const placeAddButton = document.querySelector('.profile__add-btn');

const places = document.querySelector('.places');

const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddPlace = document.querySelector('.popup__add-place');
const btnCloseEditProfile = document.querySelector('.button_editing');
const btnCloseAddPlace = document.querySelector('.button_creating');

const formEdit = document.querySelector('.popup__form');

const nameProfile = document.querySelector('.profile__info-title');
const descriptionProfile = document.querySelector('.profile__info-subtitle');

const nameEdit = document.querySelector('.popup__form-input_type_name-on');
const descriptionEdit = document.querySelector('.popup__form-input_type_description-on');

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

// открытие-закрытие popup
function openClosePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function getPopupEditProfile() {

  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameEdit.value = nameProfile.textContent;
    descriptionEdit.value = descriptionProfile.textContent;
  }
  else {
    nameEdit.value = '';
    descriptionEdit.value = '';
  }

  openClosePopup(popupEditProfile);
}

function getPopupAddPlace() {
  openClosePopup(popupAddPlace);
}

// проверка области клика при закрытии popup
function checkCloseClickPopup(popup) {
  return function (evt) {
    if (evt.target === evt.currentTarget) {
      openClosePopup(popup);
    }
  }
}

// замена имени и описания в профиле
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameEdit.value;
  descriptionProfile.textContent = descriptionEdit.value;
  openClosePopup(popupEditProfile);
}

// добавление шаблона place
function addPlace(namePlace, linkImage) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__image').src = linkImage;
  placeElement.querySelector('.place__image').alt = 'Фото ' + namePlace;
  placeElement.querySelector('.place__title').textContent = namePlace;
  placeElement.querySelector('.place__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('place__like-btn_active');
  });

  places.append(placeElement);
}

initialCards.forEach(element => { addPlace(element.name, element.link); });

editProfileButton.addEventListener('click', () => { getPopupEditProfile(); });
placeAddButton.addEventListener('click', () => { getPopupAddPlace(); });
btnCloseEditProfile.addEventListener('click', () => { openClosePopup(popupEditProfile); });
btnCloseAddPlace.addEventListener('click', () => { openClosePopup(popupAddPlace); });
popupEditProfile.addEventListener('click', () => { checkCloseClickPopup(popupEditProfile); } );
popupEditProfile.addEventListener('click', () => { checkCloseClickPopup(popupAddPlace); } );
formEdit.addEventListener('submit', formSubmitHandler);

