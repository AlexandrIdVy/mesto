const editButton = document.querySelector('.profile__info-edit-btn');

const places = document.querySelector('.places');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');

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
function openClosePopup() {

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

// проверка области клика при закрытии popup
function checkCloseClickPopup(evt) {
  if (evt.target === evt.currentTarget) {
    openClosePopup();
  }
}

// замена имени и описания в профиле
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameEdit.value;
  descriptionProfile.textContent = descriptionEdit.value;
  openClosePopup();
}

// доюавление шаблона place
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

initialCards.forEach(element => {
  addPlace(element.name, element.link);
});

editButton.addEventListener('click', openClosePopup);
popupCloseButton.addEventListener('click', openClosePopup);
popup.addEventListener('click', checkCloseClickPopup);
formEdit.addEventListener('submit', formSubmitHandler);
