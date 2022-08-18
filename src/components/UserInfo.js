export default class UserInfo {

  constructor(formData) {
    this._name = document.querySelector(formData.name);
    this._about = document.querySelector(formData.about);
  }
  // записываем данные в форму попапа редактирования профиля
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }
  // записываем данные в профиль
  setUserInfo(dataUser) {
    this._name.textContent = dataUser.name;
    this._about.textContent = dataUser.about;
  }
}
