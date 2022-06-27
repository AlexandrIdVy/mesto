/// ВАЛИДАЦИЯ

// показываем ошибку валидации инпута
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector('.popup__form-input-error');
  inputElement.classList.add('popup__form-input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-input-error_visible');
};

// скрываем ошибку валидации инпута
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector('.popup__form-input-error');
  inputElement.classList.remove('popup__form-input_type_error');
  errorElement.classList.remove('popup__form-input-error_visible');
  errorElement.textContent = '';
};

// проверяем валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// проверяем есть ли хоть одно поле НЕ прошедшее валидацю
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {return !inputElement.validity.valid;});
};

// блокируем кнопку отправки формы
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__form-save-btn_type_no-active');
    buttonElement.disabled = true;

  }
  else {
    buttonElement.classList.remove('popup__form-save-btn_type_no-active');
    buttonElement.disabled = false;
  }
};

// устанавливаем слушателей событий
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement = formElement.querySelector('.popup__form-save-btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// включаем валидацию на полученной форме и филдсете
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
    fieldsetList.forEach(fieldset => setEventListeners(fieldset));
  });

};

enableValidation();
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: 'popup__form-input',
//   submitButtonSelector: '.popup__form-save-btn',
//   inactiveButtonClass: 'button_type_no-active',
//   inputErrorClass: 'popup__form-input_type_error',
//   errorClass: 'popup__form-input-error_visible'
// });
