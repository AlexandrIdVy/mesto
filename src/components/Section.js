export default class Section {

  constructor({items, renderer}, containerSelector, showError) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._showError = showError;
  }
  //отрисовываем элементы
  render() {
    this._renderedItems.getInitialCards()
      .then(data => data.forEach(item => this._renderer(item)))
      .catch(err => this._showError(err));
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
