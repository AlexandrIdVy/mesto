export default class UserInfo {

  constructor(formData) {
    this._name = document.querySelector(formData.name);
    this._description = document.querySelector(formData.description);
  }
  // записываем данные в форму попапа редактирования профиля
  getUserInfo() {
    this._formValues = {
      name: this._name.textContent,
      description: this._description.textContent
    };

    return this._formValues;
  }
  // записываем данные в профиль
  setUserInfo(dataUser) {
    this._name.textContent = dataUser.name;
    this._description.textContent = dataUser.description;
  }
}
