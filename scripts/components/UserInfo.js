import { nameProfile,
  descriptionProfile,
  formEditProfile,
  nameEdit,
  descriptionEdit } from '../constants.js';

export default class UserInfo {

  constructor(formData) {
    this._name = formData.name;
    this._description = formData.description;
  }

  getUserInfo() {
    this._inputList = formEditProfile.querySelectorAll('.popup__form-input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  setUserInfo() {
    nameProfile.textContent = this._name;
    descriptionProfile.textContent = this._description;
  }
}
