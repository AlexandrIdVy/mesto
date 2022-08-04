import { nameProfile,
  descriptionProfile,
  nameEdit,
  descriptionEdit } from '../constants.js';

export default class UserInfo {

  constructor(formData) {
    this._name = formData.name;
    this._description = formData.description;
  }
  // записываем данные в форму попапа редактирования профиля
  getUserInfo() {
    nameEdit.value = this._name;
    descriptionEdit.value = this._description;
  }
  // записываем данные в профиль
  setUserInfo() {
    nameProfile.textContent = this._name;
    descriptionProfile.textContent = this._description;
  }
}
