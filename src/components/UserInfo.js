export default class UserInfo {

  constructor(formData, api, showError) {
    this._name = document.querySelector(formData.name);
    this._about = document.querySelector(formData.about);
    this._api = api;
    this._showError = showError;
  }
  // отправляем данные пользователя на сервер
  sendUserInfo(dataUser) {
    this._api.sendDataUserMe(dataUser)
      .then(data => this.setUserInfo(data))
      .catch(err => this._showError(err));
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
