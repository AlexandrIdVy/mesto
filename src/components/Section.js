export default class Section {

  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //отрисовываем элементы
  render() {
    this._renderedItems.getInitialCards()
      .then(data => Array.from(data).forEach(item => {
        this._renderer(item);
      }))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
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
