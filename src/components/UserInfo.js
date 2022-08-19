export default class UserInfo {

  constructor(formData, api) {
    this._name = document.querySelector(formData.name);
    this._about = document.querySelector(formData.about);
    this._api = api;
  }
  // отправляем данные пользователя на сервер
  sendUserInfo(dataUser) {
    this._api.sendDataUserMe(dataUser)
      .then(data => this.setUserInfo(data))
      .catch(err => console.log(err));
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
