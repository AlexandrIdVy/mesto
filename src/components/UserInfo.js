export default class UserInfo {

  constructor(formData, api, showError) {
    this._name = document.querySelector(formData.name);
    this._about = document.querySelector(formData.about);
    this._avatar = document.querySelector(formData.avatar);
    this._api = api;
    this._showError = showError;
  }
  // отправляем данные пользователя на сервер
  sendUserInfo(dataUser) {
    this._api.sendDataUserMe(dataUser)
      .then(data => {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
      })
      .catch(err => this._showError(err));
  }
  // отправляем данные аватар пользователя на сервер
  sendUserAvatar(dataUser) {
    this._api.editAvatar(dataUser)
      .then(data => this._avatar.src = data.avatar)
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
    this._avatar.src = dataUser.avatar;
  }
}
