export default class Section {

  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //отрисовываем элементы
  render(items) {
    items.forEach(item => this._renderer(item));
  }
  //принимаем DOM-элемент и добавляем его в начало контейнера
  addItemPrepend(cardElement) {
    this._container.prepend(cardElement);
  }
  //принимаем DOM-элемент и добавляем его в конец контейнера
  addItemAppend(cardElement) {
    this._container.append(cardElement);
  }
}
