export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  // обработчик промисов
  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }
    // отклоняем промис в случае ошибки
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // получаем данные пользователя
  getUserMe() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._handlePromise(res));
  }
  // отправляем данные пользователя на сервер
  sendDataUserMe(dataUser) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.about
      })
    })
      .then(res => this._handlePromise(res));
  }
  // получаем карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._handlePromise(res));
  }
  // добавляем карточку на сервер
  sendCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => this._handlePromise(res));
  }

}
