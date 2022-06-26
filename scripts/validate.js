/// ВАЛИДАЦИЯ

// показываем ошибку валидации инпута
const showInputError = (formSelector,
                        inputSelector,
                        inputErrorClass,
                        errorClass,
                        errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector}-error`)
  inputSelector.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// скрываем ошибку валидации инпута
const hideInputError = (formSelector,
                        inputSelector,
                        inputErrorClass,
                        errorClass) => {
const errorElement = formSelector.querySelector(`.${inputSelector}-error`)
inputSelector.classList.remove(inputErrorClass);
errorElement.classList.remove(errorClass);
errorElement.textContent = '';
};

// проверяем валидность поля
const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector,
                  inputSelector,
                  inputErrorClass,
                  errorClass,
                  inputSelector.validationMessage);
  } else {
    hideInputError(formSelector,
                  inputSelector,
                  inputErrorClass,
                  errorClass);
  }
};

// устанавливаем слушателей событий
const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__form-input'));
  const buttonElement = formSelector.querySelector('.popup__form-save-btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(settings.formSelector, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// включаем валидацию на полученной форме и филдсете
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());

    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
    fieldsetList.forEach(fieldset => setEventListeners(fieldset));
  });

};

// проверяем есть ли хоть одно поле НЕ прошедшее валидацю
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {return !inputElement.validity.valid;});
};

// блокировка кнопки отправки формы
const toggleButtonState = (inputList, submitButtonSelector, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(inactiveButtonClass);
  }
  else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
  }
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
