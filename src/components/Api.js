export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  // получаем данные пользователя
  getUserMe() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // отклоняем промис в случае ошибки
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  // получаем карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // отклоняем промис в случае ошибки
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}
